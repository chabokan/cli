import {Flags} from '@oclif/core'
import Command from "../../base.js"
import {isEmptyObject} from "../../helper.js";
import chalk from "chalk";
import inquirer from 'inquirer';
import axios from "axios";

export default class ServiceResize extends Command {
  static description = 'resize a service';

  static flags = {
    ...Command.flags,
    service: Flags.string({char: 's', description: 'service name'}),
    ram: Flags.string({char: 'r', description: 'RAM'}),
    cpu: Flags.string({char: 'c', description: 'CPU'}),
    disk: Flags.string({char: 'd', description: 'DISK'}),
  };

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(ServiceResize);
    const cli = this;
    await this.init_run();
    const config_json = await this.read_config();
    let selected_service = flags.service;
    let selected_ram: any = flags.ram;
    let selected_cpu: any = flags.cpu;
    let selected_disk: any = flags.disk;

    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red('[Error]')} first you should login!`);
      return;
    }

    if (!selected_service) {
      let all_services: any = await this.get_services({'not_status': 'pending', 'has_custom_plan': 'true'});
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
    if (!selected_ram) {
      let {ram} = await inquirer.prompt({
        type: 'list',
        message: 'Please select service ram:',
        name: 'ram',
        choices: [
          {value: "0.5", name: "0.5G"},
          {value: "1", name: "1G"},
          {value: "2", name: "2G"},
          {value: "4", name: "4G"},
          {value: "6", name: "6G"},
          {value: "8", name: "8G"},
        ]
      });
      selected_ram = ram

    }
    if (!selected_cpu) {
      let {cpu} = await inquirer.prompt({
        type: 'list',
        message: 'Please select service cpu:',
        name: 'cpu',
        choices: [
          {value: "0.5", name: "0.5 Core"},
          {value: "1", name: "1 Core"},
          {value: "2", name: "2 Core"},
          {value: "3", name: "3 Core"},
          {value: "4", name: "4 Core"},
        ]
      });
      selected_cpu = cpu

    }
    if (!selected_disk) {
      let {disk} = await inquirer.prompt({
        type: 'list',
        message: 'Please select service disk:',
        name: 'disk',
        choices: [
          {value: "5", name: "5G"},
          {value: "10", name: "10G"},
          {value: "15", name: "15G"},
          {value: "30", name: "30G"},
          {value: "40", name: "40G"},
          {value: "50", name: "50G"},
        ]
      });
      selected_disk = disk
    }
    let wrong_value = false;
    if (selected_ram % 0.5 != 0) {
      cli.log(`${chalk.red('[Error]')} ram amount should coefficient of 0.5`);
      wrong_value = true
    }
    if (selected_cpu % 0.5 != 0) {
      cli.log(`${chalk.red('[Error]')} cpu amount should coefficient of 0.5`);
      wrong_value = true

    }
    if (selected_disk % 5 != 0) {
      cli.log(`${chalk.red('[Error]')} disk amount should coefficient of 5`);
      wrong_value = true

    }

    if (selected_service && selected_ram && selected_cpu && selected_disk && !wrong_value) {
      await this.send_request(cli, selected_service, selected_ram, selected_cpu, selected_disk)
    }
  }

  async send_request(cli: any, selected_service: any, ram: any, cpu: any, disk: any) {
    try {
      if (selected_service) {
        const {data} = await axios.post("services/" + selected_service + "/resize/",
          {
            "ram": ram,
            "cpu": cpu,
            "disk": disk,
          }
          , this.axiosConfig);
        if (data.success) {
          cli.log(`${chalk.green('[Success]')} service resized successfully.`)
        } else {
          cli.log(`${chalk.red('[Error]')} some problem in resize.`)

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
