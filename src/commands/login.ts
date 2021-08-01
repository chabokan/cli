import {Command, flags} from '@oclif/command'
import {BASE_API_URL, GLOBAL_CONF_PATH} from "../constants";
import * as inquirer from 'inquirer'
import axios from "axios";
import chalk from "chalk";
import {isObject, read_config_file} from "../helper";
import * as fs from "fs";

export default class Login extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({char: 'h'}),
    username: flags.string({char: 'u', description: 'your username'}),
    password: flags.string({char: 'p', description: 'your password'}),
    token: flags.string({char: 't', description: 'login with api token'}),
  };

  async run() {
    const cli = this;
    const {args, flags} = this.parse(Login);
    const body:any  = {username: flags.username, password: flags.password};
    const config_json = read_config_file();
    if (!flags.username) {
      let {username} = await inquirer.prompt({
        type: 'input',
        message: 'Enter your username:',
        name: 'username',
        validate(input) {
          if (input.length === 0) {
            return false
          }
          return true
        }
      });
      body.username = username
    }

    if (!flags.password) {
      let {password} = await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        validate(input) {
          if (input.length === 0) {
            return false
          }
          return true
        }
      });
      body.password = password
    }

    if (!flags.token) {
      axios.post(BASE_API_URL + "accounts/login/", body)
        .then(function (response) {
          if (response.data.success) {
            if (!isObject(config_json.users)) {
              config_json.users = {};
            }
            // @ts-ignore
            config_json.users[body.username] = {
              "token": response.data.token
            };
            config_json["default_user"] = <string>body.username;
            fs.writeFileSync(GLOBAL_CONF_PATH, JSON.stringify(config_json));
            cli.log(`${chalk.green('[Success]')}`)
          } else {
            cli.log(`${chalk.red('[Error]')} your username or password is wrong!`)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }
}
