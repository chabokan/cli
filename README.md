chabok CLI
=================

The command line interface for chabokan.net

[![Version](https://img.shields.io/npm/v/@chabokan.net/cli.svg)](https://npmjs.com/package/@chabokan.net/cli)
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
$ chabok (--version|-v)
@chabokan.net/cli/0.8.4 darwin-x64 node-v14.5.0
$ chabok --help [COMMAND]
USAGE
  $ chabok COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`chabok account list`](#chabok-account-list)
* [`chabok account remove`](#chabok-account-remove)
* [`chabok account use`](#chabok-account-use)
* [`chabok autocomplete [SHELL]`](#chabok-autocomplete-shell)
* [`chabok deploy`](#chabok-deploy)
* [`chabok help [COMMAND]`](#chabok-help-command)
* [`chabok login`](#chabok-login)
* [`chabok service list`](#chabok-service-list)
* [`chabok service logs`](#chabok-service-logs)
* [`chabok service resize`](#chabok-service-resize)
* [`chabok service restart`](#chabok-service-restart)
* [`chabok service start`](#chabok-service-start)
* [`chabok service stop`](#chabok-service-stop)
* [`chabok version`](#chabok-version)

## `chabok account list`

show accounts list

```
USAGE
  $ chabok account list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  show accounts list
```

## `chabok account remove`

remove account from list

```
USAGE
  $ chabok account remove [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  remove account from list
```

## `chabok account use`

switch your default user between logged in users

```
USAGE
  $ chabok account use [-h] [-u <value>]

FLAGS
  -h, --help          Show CLI help.
  -u, --user=<value>  default user

DESCRIPTION
  switch your default user between logged in users
```

## `chabok autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ chabok autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ chabok autocomplete

  $ chabok autocomplete bash

  $ chabok autocomplete zsh

  $ chabok autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.3/src/commands/autocomplete/index.ts)_

## `chabok deploy`

this command help you build and deploy your service to chabokan in easy way.

```
USAGE
  $ chabok deploy [-h] [-p <value>] [-s <value>]

FLAGS
  -h, --help             Show CLI help.
  -p, --path=<value>     service path in your computer
  -s, --service=<value>  service name

DESCRIPTION
  this command help you build and deploy your service to chabokan in easy way.
```

_See code: [src/commands/deploy.ts](https://github.com/chabokan/cli/blob/v0.8.4/src/commands/deploy.ts)_

## `chabok help [COMMAND]`

Display help for chabok.

```
USAGE
  $ chabok help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for chabok.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.15/src/commands/help.ts)_

## `chabok login`

login to hub.chabokan.net account

```
USAGE
  $ chabok login [-h] [-u <value>] [-p <value>] [-t <value>]

FLAGS
  -h, --help              Show CLI help.
  -p, --password=<value>  your password
  -t, --token=<value>     login with api token
  -u, --username=<value>  your username

DESCRIPTION
  login to hub.chabokan.net account
```

_See code: [src/commands/login.ts](https://github.com/chabokan/cli/blob/v0.8.4/src/commands/login.ts)_

## `chabok service list`

show account services list

```
USAGE
  $ chabok service list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  show account services list
```

## `chabok service logs`

read latest logs from service

```
USAGE
  $ chabok service logs [-h] [-s <value>]

FLAGS
  -h, --help             Show CLI help.
  -s, --service=<value>  service name

DESCRIPTION
  read latest logs from service
```

## `chabok service resize`

resize a service

```
USAGE
  $ chabok service resize [-h] [-s <value>] [-r <value>] [-c <value>] [-d <value>]

FLAGS
  -c, --cpu=<value>      CPU
  -d, --disk=<value>     DISK
  -h, --help             Show CLI help.
  -r, --ram=<value>      RAM
  -s, --service=<value>  service name

DESCRIPTION
  resize a service
```

## `chabok service restart`

restart a service

```
USAGE
  $ chabok service restart [-h] [-s <value>]

FLAGS
  -h, --help             Show CLI help.
  -s, --service=<value>  service name

DESCRIPTION
  restart a service
```

## `chabok service start`

start a service

```
USAGE
  $ chabok service start [-h] [-s <value>]

FLAGS
  -h, --help             Show CLI help.
  -s, --service=<value>  service name

DESCRIPTION
  start a service
```

## `chabok service stop`

stop a service

```
USAGE
  $ chabok service stop [-h] [-s <value>]

FLAGS
  -h, --help             Show CLI help.
  -s, --service=<value>  service name

DESCRIPTION
  stop a service
```

## `chabok version`

```
USAGE
  $ chabok version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v1.1.3/src/commands/version.ts)_
<!-- commandsstop -->
