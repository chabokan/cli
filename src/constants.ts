import * as path from 'path'
import * as os from 'os'

export const GLOBAL_CONF_PATH = path.join(os.homedir(), '.chabok.json')

export let BASE_API_URL = 'https://apihub.chabokan.net/fa/api/v1/'
if (process.env.CHABOK_API_URL) {
  BASE_API_URL = process.env.CHABOK_API_URL
}
