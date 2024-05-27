chabok
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/chabok.svg)](https://npmjs.org/package/chabok)
[![Downloads/week](https://img.shields.io/npm/dw/chabok.svg)](https://npmjs.org/package/chabok)


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
@chabokan.net/cli/0.8.8 darwin-arm64 node-v20.13.1
$ chabok --help [COMMAND]
USAGE
  $ chabok COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`chabok autocomplete [SHELL]`](#chabok-autocomplete-shell)
* [`chabok help [COMMAND]`](#chabok-help-command)
* [`chabok plugins`](#chabok-plugins)
* [`chabok plugins add PLUGIN`](#chabok-plugins-add-plugin)
* [`chabok plugins:inspect PLUGIN...`](#chabok-pluginsinspect-plugin)
* [`chabok plugins install PLUGIN`](#chabok-plugins-install-plugin)
* [`chabok plugins link PATH`](#chabok-plugins-link-path)
* [`chabok plugins remove [PLUGIN]`](#chabok-plugins-remove-plugin)
* [`chabok plugins reset`](#chabok-plugins-reset)
* [`chabok plugins uninstall [PLUGIN]`](#chabok-plugins-uninstall-plugin)
* [`chabok plugins unlink [PLUGIN]`](#chabok-plugins-unlink-plugin)
* [`chabok plugins update`](#chabok-plugins-update)
* [`chabok version`](#chabok-version)

## `chabok autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ chabok autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ chabok autocomplete

  $ chabok autocomplete bash

  $ chabok autocomplete zsh

  $ chabok autocomplete powershell

  $ chabok autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.0.18/src/commands/autocomplete/index.ts)_

## `chabok help [COMMAND]`

Display help for chabok.

```
USAGE
  $ chabok help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for chabok.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.22/src/commands/help.ts)_

## `chabok plugins`

List installed plugins.

```
USAGE
  $ chabok plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ chabok plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/index.ts)_

## `chabok plugins add PLUGIN`

Installs a plugin into chabok.

```
USAGE
  $ chabok plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into chabok.

  Uses bundled npm executable to install plugins into /Users/mohammad/.local/share/@chabokan.net/cli

  Installation of a user-installed plugin will override a core plugin.

  Use the CHABOK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CHABOK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ chabok plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ chabok plugins add myplugin

  Install a plugin from a github url.

    $ chabok plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ chabok plugins add someuser/someplugin
```

## `chabok plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ chabok plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ chabok plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/inspect.ts)_

## `chabok plugins install PLUGIN`

Installs a plugin into chabok.

```
USAGE
  $ chabok plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into chabok.

  Uses bundled npm executable to install plugins into /Users/mohammad/.local/share/@chabokan.net/cli

  Installation of a user-installed plugin will override a core plugin.

  Use the CHABOK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CHABOK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ chabok plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ chabok plugins install myplugin

  Install a plugin from a github url.

    $ chabok plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ chabok plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/install.ts)_

## `chabok plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ chabok plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ chabok plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/link.ts)_

## `chabok plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ chabok plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ chabok plugins unlink
  $ chabok plugins remove

EXAMPLES
  $ chabok plugins remove myplugin
```

## `chabok plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ chabok plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/reset.ts)_

## `chabok plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ chabok plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ chabok plugins unlink
  $ chabok plugins remove

EXAMPLES
  $ chabok plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/uninstall.ts)_

## `chabok plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ chabok plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ chabok plugins unlink
  $ chabok plugins remove

EXAMPLES
  $ chabok plugins unlink myplugin
```

## `chabok plugins update`

Update installed plugins.

```
USAGE
  $ chabok plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.1.3/src/commands/plugins/update.ts)_

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

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v2.1.2/src/commands/version.ts)_
<!-- commandsstop -->
