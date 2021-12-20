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
@chabokan.net/cli/0.7.4 darwin-x64 node-v14.17.5
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
* [`chabok logs`](#chabok-logs)
* [`chabok resize`](#chabok-resize)
* [`chabok restart`](#chabok-restart)
* [`chabok start`](#chabok-start)
* [`chabok stop`](#chabok-stop)

## `chabok change-user`

switch your default user between logged in users

```
USAGE
  $ chabok change-user

OPTIONS
  -h, --help       show CLI help
  -u, --user=user  default user
```

_See code: [src/commands/change-user.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/change-user.ts)_

## `chabok config-clear`

clear config file, data such as auth will be removed.

```
USAGE
  $ chabok config-clear

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config-clear.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/config-clear.ts)_

## `chabok deploy`

this command help you build and deploy your service to chabokan in easy way.

```
USAGE
  $ chabok deploy

OPTIONS
  -h, --help             show CLI help
  -p, --path=path        service path in your computer
  -s, --service=service  service name
```

_See code: [src/commands/deploy.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/deploy.ts)_

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

login to hub.chabokan.net account

```
USAGE
  $ chabok login

OPTIONS
  -h, --help               show CLI help
  -p, --password=password  your password
  -t, --token=token        login with api token
  -u, --username=username  your username
```

_See code: [src/commands/login.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/login.ts)_

## `chabok logs`

read latest logs from service

```
USAGE
  $ chabok logs

OPTIONS
  -h, --help             show CLI help
  -s, --service=service  service name
```

_See code: [src/commands/logs.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/logs.ts)_

## `chabok resize`

resize a service

```
USAGE
  $ chabok resize

OPTIONS
  -c, --cpu=cpu          CPU
  -d, --disk=disk        DISK
  -h, --help             show CLI help
  -r, --ram=ram          RAM
  -s, --service=service  service name
```

_See code: [src/commands/resize.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/resize.ts)_

## `chabok restart`

restart a service

```
USAGE
  $ chabok restart

OPTIONS
  -h, --help             show CLI help
  -s, --service=service  service name
```

_See code: [src/commands/restart.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/restart.ts)_

## `chabok start`

start a service

```
USAGE
  $ chabok start

OPTIONS
  -h, --help             show CLI help
  -s, --service=service  service name
```

_See code: [src/commands/start.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/start.ts)_

## `chabok stop`

stop a service

```
USAGE
  $ chabok stop

OPTIONS
  -h, --help             show CLI help
  -s, --service=service  service name
```

_See code: [src/commands/stop.ts](https://github.com/chabokan/cli/blob/v0.7.4/src/commands/stop.ts)_
<!-- commandsstop -->
