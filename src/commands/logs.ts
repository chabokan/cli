import {flags} from '@oclif/command'
import Command from "../base"
import {isEmptyObject} from "../helper";
import chalk from "chalk";
import * as inquirer from "inquirer";
import axios from "axios";


export default class Logs extends Command {
  static description = 'read latest logs from service';

  static flags = {
    ...Command.flags,
    service: flags.string({char: 's', description: 'service name'}),
  };

  async run() {
    const {args, flags} = this.parse(Logs);
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
    await this.send_request(cli, selected_service)
  }

  async send_request(cli: any, selected_service: any) {
    try {
      if (selected_service) {
        const {data} = await axios.get("services/" + selected_service + "/logs/", this.axiosConfig);
        if (data.success) {
          cli.log(data.logs)
        }
      }
    } catch (e) {
      if (e.response.status == 404) {
        cli.log(chalk.blue("Selected Service Not Founded."))

      } else {
        console.log(e.data)
      }
    }
  }
}
