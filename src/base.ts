import Command, {flags} from '@oclif/command'
import axios from "axios"
import {BASE_API_URL, GLOBAL_CONF_PATH} from "./constants";
import {get_all_services, isEmptyObject, read_config_file} from "./helper";
import {getProxyHttpAgent} from 'proxy-http-agent';

import * as fs from "fs";
import got, {Options} from 'got'
import * as https from "https";

export default abstract class extends Command {
  static flags = {
    help: flags.help({char: 'h'}),
  };

  axiosConfig = {
    ...axios.defaults
  };
  got = got.extend();

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
    const main_agent = new https.Agent({
      rejectUnauthorized: false
    });
    // @ts-ignore
    const gotConfig: Options = {};
    this.axiosConfig.httpsAgent = main_agent;
    this.axiosConfig.baseURL = BASE_API_URL;
    gotConfig.prefixUrl = this.axiosConfig.baseURL;
    gotConfig.agent = {https: main_agent};
    const proxy = process.env.http_proxy || process.env.https_proxy;
    if (proxy) {
      this.log(`Using proxy server ${proxy}`);
      // @ts-ignore
      const agent = getProxyHttpAgent({
        proxy: proxy,
        rejectUnauthorized: false
      });
      this.axiosConfig.httpsAgent = agent;
      this.axiosConfig.proxy = false;
      // @ts-ignore
      gotConfig.agent = {https: agent}

    }
    const config_json = read_config_file();
    this.got = got.extend(gotConfig);
    if (isEmptyObject(config_json) || isEmptyObject(config_json.users)) {
      return;
    }

    // @ts-ignore
    const token = config_json.users[config_json.default_user]["token"] || null;

    if (token) {
      this.axiosConfig.headers.Authorization = `Token ${token}`;
      gotConfig.headers = {Authorization: `Token ${token}`};

    }
    this.got = got.extend(gotConfig)
  }
}
