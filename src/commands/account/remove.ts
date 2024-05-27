import inquirer from "inquirer";
import chalk from "chalk";
import { isEmptyObject, read_config_file } from "../../helper.js";
import Command from "../../base.js";
import { GLOBAL_CONF_PATH } from "../../constants.js";
import fs from "fs";

export default class AccountRemove extends Command {
  static description = "remove account from list";

  static flags = {
    ...Command.flags,
  };

  public async run(): Promise<void> {
    const cli = this;
    const { args, flags } = await this.parse(AccountRemove);
    const config_json = read_config_file();

    if (isEmptyObject(config_json.users)) {
      cli.log(`${chalk.red("[Error]")} first you should login!`);
      return;
    }

    let { user } = await inquirer.prompt({
      type: "list",
      message: "Please select a user:",
      name: "user",
      choices: Object.keys(config_json.users),
    });

    // @ts-ignore
    delete config_json.users[user];
    if (config_json["default_user"] == <string>user) {
      config_json["default_user"] = "";
    }
    fs.writeFileSync(GLOBAL_CONF_PATH, JSON.stringify(config_json));
    cli.log(`${chalk.green("[Success]")} user deleted successfully.`);
  }
}
