@chabokan.net/cli
=================

Chabokan Cli for PaaS Services

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@chabokan.net/cli.svg)](https://npmjs.org/package/@chabokan.net/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@chabokan.net/cli.svg)](https://npmjs.org/package/@chabokan.net/cli)
[![License](https://img.shields.io/npm/l/@chabokan.net/cli.svg)](https://github.com/chabokan/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @chabokan.net/cli
$ chabok COMMAND
running command...
$ chabok (-v|--version|version)
@chabokan.net/cli/0.3.0 darwin-x64 node-v12.16.1
$ chabok --help [COMMAND]
USAGE
  $ chabok COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`chabok change-user`](#chabok-change-user)
* [`chabok config-clear`](#chabok-config-clear)
* [`chabok deploy`](#chabok-deploy)
* [`chabok help [COMMAND]`](#chabok-help-command)
* [`chabok login`](#chabok-login)
* [`chabok restart`](#chabok-restart)
* [`chabok start [FILE]`](#chabok-start-file)
* [`chabok stop [FILE]`](#chabok-stop-file)

## `chabok change-user`

describe the command here

```
USAGE
  $ chabok change-user

OPTIONS
  -h, --help       show CLI help
  -u, --user=user  default user
```

_See code: [src/commands/change-user.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/change-user.ts)_

## `chabok config-clear`

describe the command here

```
USAGE
  $ chabok config-clear

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config-clear.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/config-clear.ts)_

## `chabok deploy`

describe the command here

```
USAGE
  $ chabok deploy

OPTIONS
  -h, --help             show CLI help
  -p, --path=path        service path in your computer
  -s, --service=service  service name
```

_See code: [src/commands/deploy.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/deploy.ts)_

## `chabok help [COMMAND]`

display help for chabok

```
USAGE
  $ chabok help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `chabok login`

describe the command here

```
USAGE
  $ chabok login

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  your password
  -t, --token=token        login with api token
  -u, --username=username  your username
```

_See code: [src/commands/login.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/login.ts)_

## `chabok restart`

describe the command here

```
USAGE
  $ chabok restart

OPTIONS
  -h, --help             show CLI help
  -s, --service=service  service name
```

_See code: [src/commands/restart.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/restart.ts)_

## `chabok start [FILE]`

describe the command here

```
USAGE
  $ chabok start [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/start.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/start.ts)_

## `chabok stop [FILE]`

describe the command here

```
USAGE
  $ chabok stop [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/stop.ts](https://github.com/chabokan/cli/blob/v0.3.0/src/commands/stop.ts)_
<!-- commandsstop -->
