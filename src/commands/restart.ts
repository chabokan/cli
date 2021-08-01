import {flags} from '@oclif/command'
import * as inquirer from "inquirer";
import chalk from "chalk";
import axios from "axios";
import {isEmptyObject} from "../helper";
import Command from "../base"

export default class Restart extends Command {
  static description = 'describe the command here';

  static flags = {
    ...Command.flags,
    service: flags.string({char: 's', description: 'service name'}),
  };

  async run() {
    const {args, flags} = this.parse(Restart);
    const cli = this;
    this.init_run();
    const config_json = this.read_config();
    let selected_service = flags.service;

    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red('[Error]')} first you should login!`);
      return;
    }

    if (!flags.service) {
      let all_services: any = await this.get_services();
      if (all_services) {
        let {service} = await inquirer.prompt({
          type: 'list',
          message: 'Please select a service:',
          name: 'service',
          choices: all_services
        });
        selected_service = service
      }
    }

    if (selected_service) {
      const {data} = await axios.get("services/" + selected_service + "/restart/", this.axiosConfig);
      if (data.success) {
        cli.log(`${chalk.green('[Success]')} service restarted successfully.`)
      }
    }

  }
}
