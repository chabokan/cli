import * as fs from "fs";
import {GLOBAL_CONF_PATH} from "./constants";
import axios from "axios";

export function isObject(obj: any) {
  return obj != null && obj.constructor.name === "Object"
}

export function isEmptyObject(obj: any) {
  return obj && obj.constructor === Object && Object.keys(obj).length === 0;
}

export function read_config_file() {
  let config_json = {
    users: {},
    default_user: ""
  };
  try {
    config_json = JSON.parse(fs.readFileSync(GLOBAL_CONF_PATH).toString('utf-8')) || {};
  } catch {
  }

  return config_json
}

export async function get_all_services(filter = {}, axiosConfig: any) {
  let all_services: any = [];
  try {
    let url_filter = "";
    Object.keys(filter).forEach((item, index) => {
      let key = item;
      // @ts-ignore
      let value = filter[item];
      if (index == 0) {
        url_filter += `?${key}=${value}`
      } else {
        url_filter += `&${key}=${value}`
      }
    });

    const {data} = await axios.get("services/" + url_filter, axiosConfig);
    data.services.forEach(function (item: object) {
      // @ts-ignore
      all_services.push(item.main_name)
    });

  } catch (e) {
    console.log(e.response.data)
  }

  return all_services
}
