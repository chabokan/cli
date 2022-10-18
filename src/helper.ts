import * as fs from "fs";
import {GLOBAL_CONF_PATH} from "./constants";
import axios from "axios";
import {dirname, join, relative} from "path";
import ignore, {Ignore} from 'ignore';

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
      all_services.push({"value": item.main_name, "name": `${item.main_name} (${item.platform.name})`})
    });

  } catch (e: any) {
    console.log(e.response.data)
  }

  return all_services
}


export function trimLines(lines: string[]): string[] {
  return lines.reduce((prev, line) => {
    if (!line.trim() || line.startsWith('#')) {
      return prev
    }
    return [...prev, line]
  }, [] as string[])
}

export const loadIgnoreFile = (ignoreInstance: Ignore, ignoreFilePath: string, projectPath: string) => {
  const patterns: string[] = trimLines(
    fs.readFileSync(ignoreFilePath).toString().split('\n')
  )

  const relativeToProjectPath = patterns.map((pattern: string) => {
    const dir = dirname(ignoreFilePath)
    if (pattern.startsWith('!')) {
      const absolutePrefix = pattern.substr(1).startsWith('/') ? '/' : ''
      return '!' + absolutePrefix + relative(projectPath, join(dir, pattern.substr(1)))
    }
    const absolutePrefix = pattern.startsWith('/') ? '/' : ''
    return absolutePrefix + relative(projectPath, join(dir, pattern))
  })

  const linuxify = relativeToProjectPath.map(p => p.replace(/\\/g, '/'))

  ignoreInstance.add(linuxify)
}

export function addIgnorePatterns(ignoreInstance: Ignore, projectPath: string, dir: string) {
  const liaraignorePath = join(projectPath, dir, '.chabokignore')
  const dockerignorePath = join(projectPath, dir, '.dockerignore')
  const gitignorePath = join(projectPath, dir, '.gitignore')

  if (fs.existsSync(liaraignorePath)) {
    loadIgnoreFile(ignoreInstance, liaraignorePath, projectPath)
  } else if (fs.existsSync(dockerignorePath)) {
    loadIgnoreFile(ignoreInstance, dockerignorePath, projectPath)
  } else if (fs.existsSync(gitignorePath)) {
    loadIgnoreFile(ignoreInstance, gitignorePath, projectPath)
  }
}
