import Command from "../../base.js";
import { ux } from "@oclif/core";

export default class AccountList extends Command {
  static description = "show accounts list";

  static flags = {
    ...Command.flags,
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(AccountList);
    const cli = this;
    await this.init_run();
    const config_json = await this.read_config();
    if (Object.keys(config_json.users).length > 0) {
      const accounts_data = Object.keys(config_json.users).map(
        (account: any) => {
          return {
            Name: account,
          };
        }
      );
      ux.table(
        accounts_data,
        {
          Name: {},
        },
        flags
      );
    } else {
      cli.log("first you should login");
      return;
    }
  }
}
