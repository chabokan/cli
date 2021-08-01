import * as fs from "fs";
import {GLOBAL_CONF_PATH} from "./constants";

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
    config_json = config_json
  }

  return config_json
}
