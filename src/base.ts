import Command, {flags} from '@oclif/command'
import axios from "axios"
import {BASE_API_URL, GLOBAL_CONF_PATH} from "./constants";
import {get_all_services, isEmptyObject, read_config_file} from "./helper";
import HttpsProxyAgent from "https-proxy-agent/dist/agent";
import * as fs from "fs";

export default abstract class extends Command {
  static flags = {
    help: flags.help({char: 'h'}),
  };

  axiosConfig = {
    ...axios.defaults
  };

  read_config() {
    return read_config_file();
  }

  write_config(object: any) {
    fs.writeFileSync(GLOBAL_CONF_PATH, JSON.stringify(object));
  }

  async get_services(filter = {}) {
    return await get_all_services(filter, this.axiosConfig);
  }

  init_run(): void {
    this.axiosConfig.baseURL = BASE_API_URL;
    const proxy = process.env.http_proxy || process.env.https_proxy;
    if (proxy) {
      this.log(`Using proxy server ${proxy}`);
      // @ts-ignore
      this.axiosConfig.httpsAgent = new HttpsProxyAgent(proxy);
      this.axiosConfig.proxy = false;
    }
    const config_json = read_config_file();
    if (isEmptyObject(config_json) || isEmptyObject(config_json.users)) {
      return;
    }

    // @ts-ignore
    const token = config_json.users[config_json.default_user]["token"] || null;
    if (token) {
      this.axiosConfig.headers.Authorization = `Token ${token}`;
    }

  }
}
