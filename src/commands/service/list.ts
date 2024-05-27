import Command from "../../base.js";
import { ux } from "@oclif/core";

export default class ServiceList extends Command {
  static description = "show account services list";

  static flags = {
    ...Command.flags,
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(ServiceList);
    const cli = this;
    await this.init_run();
    const config_json = await this.read_config();
    let all_services: any = await this.get_services();
    if (all_services.length > 0) {
      const services_data = all_services.map((service: any) => {
        // const shamshiate = shamsi.gregorianToJalali(
        //   new Date(project.created)
        // );
        return {
          Name: service.name,
        };
      });
      ux.table(
        services_data,
        {
          Name: {},
        },
        flags
      );
    } else {
      cli.log("first you should create service");
      return;
    }
  }
}
