import {Command, flags} from '@oclif/command'
import {isEmptyObject, isObject, read_config_file} from "../helper";
import * as inquirer from 'inquirer'
import chalk from "chalk";
import * as fs from "fs";
import {GLOBAL_CONF_PATH} from "../constants";

export default class ChangeUser extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({char: 'h'}),
    user: flags.string({char: 'u', description: 'default user'}),
  };

  async run() {
    const cli = this;
    const {args, flags} = this.parse(ChangeUser);
    const config_json = read_config_file();
    let default_user = flags.user;

    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red('[Error]')} first you should login!`);
      return;
    }

    if (!flags.user) {
      let {user} = await inquirer.prompt({
        type: 'list',
        message: 'Please select a user:',
        name: 'user',
        choices: Object.keys(config_json.users)
      });
      default_user = user
    }

    if (default_user in config_json.users) {
      config_json.default_user = default_user;
      fs.writeFileSync(GLOBAL_CONF_PATH, JSON.stringify(config_json));
      cli.log(`${chalk.green('[Success]')} user changed successfully.`)
    } else {
      cli.log(`${chalk.red('[Error]')} selected user not exist!`)
    }

  }
}

