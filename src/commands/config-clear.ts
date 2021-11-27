import {flags} from '@oclif/command'
import chalk from "chalk";
import Command from "../base"

export default class ConfigClear extends Command {
  static description = 'clear config file, data such as auth will be removed.';

  static flags = {
    ...Command.flags,
  };

  async run() {
    const {args, flags} = this.parse(ConfigClear);
    const cli = this;
    this.init_run();
    this.write_config({});

    cli.log(`${chalk.green('[Success]')} config file cleared.`)


  }
}
