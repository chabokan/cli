import {flags} from '@oclif/command'
import Command from "../base"
import tar from 'tar'
import {dirname} from 'path'
import {addIgnorePatterns, isEmptyObject} from "../helper";
import ignore from 'ignore'
import * as path from "path";
import * as os from "os";
import fs from 'fs-extra';
import chalk from "chalk";
import * as inquirer from "inquirer";
import ProgressBar from 'progress'
import FormData from 'form-data'


const MAX_SOURCE_SIZE = 200 * 1024 * 1024; // 200 MB

export default class Deploy extends Command {
  static description = 'this command help you build and deploy your service to chabokan in easy way.';

  static flags = {
    ...Command.flags,
    path: flags.string({char: 'p', description: 'service path in your computer'}),
    service: flags.string({char: 's', description: 'service name'}),
  };

  async run() {
    const {args, flags} = this.parse(Deploy);
    const cli = this;
    this.init_run();
    const config_json = this.read_config();
    let selected_service = flags.service;
    let project_path = flags.path ? flags.path : process.cwd();

    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red('[Error]')} first you should login!`);
      return;
    }

    if (!flags.service) {
      let all_services: any = await this.get_services({"has_deploy": "true", "status": "on"});
      if (all_services.length > 0) {
        let {service} = await inquirer.prompt({
          type: 'list',
          message: 'Please select a service:',
          name: 'service',
          choices: all_services
        });
        selected_service = service
      } else {
        cli.log("first you should create service");
        return;
      }
    }


    let archive_path = await this.prepare_archive(project_path);
    let upload_response: any = await this.upload(archive_path, selected_service, cli);
    if (upload_response.success) {
      cli.log(chalk.green(upload_response.message));
    } else {
      cli.log(chalk.red("[Error] " + upload_response.message));
    }
  }

  async prepare_archive(project_path: any) {
    const defaultIgnores: string[] = [
      '.git',
      '.idea',
      '.vscode',
      '.next',
      '.dockerignore',
      '*.*~',
      'liara.json',
      'node_modules',
      'bower_components',
    ];
    const ignoreCache: any = {};
    const ignoreInstance = ignore({ignorecase: false});
    ignoreInstance.add(defaultIgnores);
    const ignoreFN = (f: string) => {
      const dir = dirname(f);
      if (!ignoreCache[dir]) {
        addIgnorePatterns(ignoreInstance, project_path, dir);
        ignoreCache[dir] = true;
      }
      if (!ignoreInstance.ignores(f)) {
        return true
      }
      console.log(`ignoring ${f}`);
      return false
    };
    const tmpDir = path.join(os.tmpdir(), '/chabok-cli');
    const archivePath = path.join(tmpDir, `${Date.now()}.tar.gz`);
    fs.ensureDirSync(tmpDir);

    const fileList: string[] = fs.readdirSync(project_path).filter(ignoreFN);
    tar.c({
        gzip: {
          level: 9,
        },
        sync: true,
        cwd: project_path,
        filter: ignoreFN,
        file: archivePath,
      },
      fileList
    );

    return archivePath
  }

  async upload(archive_path: any, selected_service: any, cli: any) {
    let upload_response = {
      success: false,
      message: "some problem"
    };
    const body = new FormData();
    // @ts-ignore
    body.append('file', fs.createReadStream(archive_path));
    const {size: sourceSize} = fs.statSync(archive_path);
    if (sourceSize > MAX_SOURCE_SIZE) {
      upload_response.message = "Source is too large. (max: 500MB)";
      return upload_response
    }
    const bar = new ProgressBar('Uploading [:bar] :percent :etas', {
      total: sourceSize,
      width: 20,
      complete: '=',
      incomplete: '',
      clear: true,
    });

    try {
      const response = await this.got.post(`ervices/${selected_service}/deploy/`, {body})
        .on('uploadProgress', progress => {
          bar.tick(progress.transferred - bar.curr)
        }).json<{ success: string }>();
      if (response.success) {
        upload_response.success = true;
        upload_response.message = "Deployment finished successfully."
      } else {
        if (process.env.CHABOK_DEBUG == "true") {
          cli.log(response);
        }
      }
      return upload_response

    } catch (error) {
      if (process.env.CHABOK_DEBUG == "true") {
        cli.log(error);
      }
      return upload_response
    } finally {
      // cleanup
      fs.unlink(archive_path).catch(() => {
      })
    }


  }
}
