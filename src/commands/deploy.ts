import {flags} from '@oclif/command'
import Command from "../base"
import tar from 'tar'
import {dirname} from 'path'
import {addIgnorePatterns} from "../helper";
import ignore from 'ignore'
import * as path from "path";
import * as os from "os";
import fs from 'fs-extra';

export default class Deploy extends Command {
  static description = 'describe the command here';

  static flags = {
    ...Command.flags,
    path: flags.string({char: 'p', description: 'service path in your computer'}),
    service: flags.string({char: 's', description: 'service name'}),
  };

  async run() {
    const {args, flags} = this.parse(Deploy);
    const cli = this;
    this.init_run();
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
    let projectPath = flags.path ? flags.path : process.cwd();
    const ignoreCache: { [dir: string]: boolean } = {};
    const ignoreInstance = ignore({ignorecase: false});
    ignoreInstance.add(defaultIgnores);

    const ignoreFN = (f: string) => {
      const dir = dirname(f);
      if (!ignoreCache[dir]) {
        addIgnorePatterns(ignoreInstance, projectPath, dir);
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

    const fileList: string[] = fs.readdirSync(projectPath).filter(ignoreFN);
    tar.c({
        gzip: {
          level: 9,
        },
        sync: true,
        cwd: projectPath,
        filter: ignoreFN,
        file: archivePath,
      },
      fileList
    )

    try {
      const response = await this.got.post(`sources`, { })
        .on('uploadProgress', progress => {
          // bar.tick(progress.transferred - bar.curr)
        })
        .json<{ sourceID: string }>()

      // this.spinner.succeed('Upload finished.')

      return response.sourceID

    } catch (error) {
      // this.spinner.fail('Upload failed.')
      throw error

    } finally {
      // cleanup
      fs.unlink(archivePath).catch(() => {})
    }


  }
}
