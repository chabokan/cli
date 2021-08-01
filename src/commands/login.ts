import {flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import axios from "axios";
import chalk from "chalk";
import {isObject} from "../helper";
import Command from "../base"

export default class Login extends Command {
  static description = 'describe the command here';

  static flags = {
    ...Command.flags,
    username: flags.string({char: 'u', description: 'your username'}),
    password: flags.string({char: 'p', description: 'your password'}),
    token: flags.string({char: 't', description: 'login with api token'}),
  };

  async run() {
    const {args, flags} = this.parse(Login);
    const cli = this;
    this.init_run();
    const config_json = this.read_config();
    const body: any = {username: flags.username, password: flags.password};
    if (!flags.token) {
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
      const {data} = await axios.post("accounts/login/", body, this.axiosConfig);
      if (data.success) {
        if (!isObject(config_json.users)) {
          config_json.users = {};
        }
        // @ts-ignore
        config_json.users[body.username] = {
          "token": data.token
        };
        config_json["default_user"] = <string>body.username;
        this.write_config(config_json);
        cli.log(`${chalk.green('[Success]')} you are logged in successfully.`)
      } else {
        cli.log(`${chalk.red('[Error]')} your username or password is wrong!`)
      }
    } else {
      try {
        this.axiosConfig.headers.Authorization = `Token ${flags.token}`;
        const {data} = await axios.get("accounts/info/", this.axiosConfig);

        if (!isObject(config_json.users)) {
          config_json.users = {};
        }
        // @ts-ignore
        config_json.users[data.user.email] = {
          "token": flags.token
        };
        config_json["default_user"] = <string>data.user.email;
        this.write_config(config_json);
        cli.log(`${chalk.green('[Success]')} you are logged in successfully.`)
      } catch (e) {
        cli.log(`${chalk.red('[Error]')} your token is wrong!`)
      }
    }

  }
}
