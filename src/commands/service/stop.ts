import {Flags} from '@oclif/core'
import Command from "../../base.js"
import {isEmptyObject} from "../../helper.js";
import chalk from "chalk";
import inquirer from 'inquirer';
import axios from "axios";


export default class ServiceStop extends Command {
  static description = 'stop a service';
  static flags = {
    ...Command.flags,
    service: Flags.string({char: 's', description: 'service name'}),
  };

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(ServiceStop);
    const cli = this;
    await this.init_run();
    const config_json = await this.read_config();
    let selected_service = flags.service;

    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red('[Error]')} first you should login!`);
      return;
    }

    if (!flags.service) {
      let all_services: any = await this.get_services({'not_status': 'pending'});
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
    await this.send_request(cli, selected_service)
  }

  async send_request(cli: any, selected_service: any) {
    try {
      if (selected_service) {
        const {data} = await axios.get("services/" + selected_service + "/stop/", this.axiosConfig);
        if (data.success) {
          cli.log(`${chalk.green('[Success]')} service stop successfully.`)
        }
      }
    } catch (e: any) {
      if (e.response.status == 404) {
        cli.log(chalk.blue("Selected Service Not Founded."))
      } else {
        console.log(e.data)
      }
    }
  }
}
