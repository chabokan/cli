import { Flags } from "@oclif/core";
import inquirer from "inquirer";
import chalk from "chalk";
import Command from "../base.js";
import { addIgnorePatterns, isEmptyObject } from "../helper.js";
import ProgressBar from "progress";
import FormData from "form-data";
import ignore from "ignore";
import { dirname } from "path";
import * as path from "path";
import * as os from "os";
import fs from "fs-extra";
import * as tar from 'tar'
import { GLOBAL_CONF_PATH } from "../constants.js";

const MAX_SOURCE_SIZE = 100 * 1024 * 1024; // 100 MB

export default class Deploy extends Command {
  static description =
    "this command help you build and deploy your service to chabokan in easy way.";

  static flags = {
    ...Command.flags,
    path: Flags.string({
      char: "p",
      description: "service path in your computer",
    }),
    service: Flags.string({ char: "s", description: "service name" }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Deploy);
    const cli = this;
    await this.init_run();
    const config_json = await this.read_config();
    let selected_service = flags.service;
    let project_path = flags.path ? flags.path : process.cwd();
    let chabok_file = { service: "" };
    try {
      chabok_file =
        JSON.parse(
          fs
            .readFileSync(path.join(project_path, "chabok.json"))
            .toString("utf-8")
        ) || {};
      cli.log("Reading Config from chabok.json ...");
    } catch {}

    if (chabok_file.service) {
      selected_service = chabok_file.service;
    }
    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red("[Error]")} first you should login!`);
      return;
    }
    if (!selected_service) {
      let all_services: any = await this.get_services({
        has_deploy: "true",
        status: "on",
      });
      if (all_services.length > 0) {
        let { service } = await inquirer.prompt({
          type: "list",
          message: "Please select a service:",
          name: "service",
          choices: all_services,
        });
        selected_service = service;
      } else {
        cli.log("first you should create service");
        return;
      }
    }

    let archive_path = await this.prepare_archive(project_path);
    let upload_response: any = await this.upload(
      archive_path,
      selected_service,
      cli,
      chabok_file
    );
    if (upload_response.success) {
      cli.log(chalk.green(upload_response.message));
    } else {
      cli.log(chalk.red("[Error] " + upload_response.message));
    }
  }

  async prepare_archive(project_path: any) {
    const defaultIgnores: string[] = [
      ".npm",
      ".git",
      ".idea",
      ".DS_Store",
      ".vscode",
      "__pycache__",
      ".next",
      ".nuxt",
      "*.*~",
      "node_modules",
      "bower_components",
      "venv",
      "/vendor",
      "*.log",
    ];
    const ignoreCache: any = {};
    const ignoreInstance = ignore.default({ ignorecase: false });
    ignoreInstance.add(defaultIgnores);
    const ignoreFN = (f: string) => {
      const dir = dirname(f);
      if (!ignoreCache[dir]) {
        addIgnorePatterns(ignoreInstance, project_path, dir);
        ignoreCache[dir] = true;
      }
      if (!ignoreInstance.ignores(f)) {
        return true;
      }
      console.log(`ignoring ${f}`);
      return false;
    };
    const tmpDir = path.join(os.tmpdir(), "/chabok-cli");
    const archivePath = path.join(tmpDir, `${Date.now()}.tar.gz`);
    fs.ensureDirSync(tmpDir);

    const fileList: string[] = fs.readdirSync(project_path).filter(ignoreFN);
    tar.c(
      {
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

    return archivePath;
  }

  async upload(
    archive_path: any,
    selected_service: any,
    cli: any,
    chabok_file: any
  ) {
    let upload_response = {
      success: false,
      message: "some problem",
    };
    const body = new FormData();
    // @ts-ignore
    body.append("file", fs.createReadStream(archive_path));
    body.append("options", JSON.stringify(chabok_file));
    const { size: sourceSize } = fs.statSync(archive_path);
    if (sourceSize > MAX_SOURCE_SIZE) {
      upload_response.message = "Source is too large. (max: 100MB)";
      return upload_response;
    }
    const bar = new ProgressBar("Uploading [:bar] :percent :etas", {
      total: sourceSize,
      width: 20,
      complete: "=",
      incomplete: "",
      clear: true,
    });

    try {
      const response = await this.got
        .post(`services/${selected_service}/deploy/`, { body })
        .on("uploadProgress", (progress) => {
          bar.tick(progress.transferred - bar.curr);
        })
        .json<{ success: string }>();
      if (response.success) {
        upload_response.success = true;
        upload_response.message = "Deployment finished successfully.";
      } else {
        if (process.env.CHABOK_DEBUG == "true") {
          cli.log(response);
        }
      }
      return upload_response;
    } catch (error) {
      if (process.env.CHABOK_DEBUG == "true") {
        cli.log(error);
      }
      return upload_response;
    } finally {
      // cleanup
      fs.unlink(archive_path).catch(() => {});
    }
  }
}
