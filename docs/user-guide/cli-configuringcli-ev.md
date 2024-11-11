# Configuring Zowe CLI environment variables

Configure Zowe CLI using environment variables to define directories, log levels, daemon mode properties, and more.

:::info Required roles: Security administrator, DevOps architect
:::

By default, Zowe CLI configuration is stored on your computer in the `C:\Users\user01\.zowe` directory. The directory includes log files, profile information, and installed Zowe CLI plug-ins. When troubleshooting, refer to the logs in the `imperative` and `zowe` folders.

:::note

For information on how to define Zowe CLI environment variables to execute commands more efficiently, see [Using environment variables](cli-using-using-environment-variables.md).

:::

## Setting the Zowe CLI home directory

You can set the location on your computer where Zowe CLI creates the `.zowe` directory, which contains log files, profiles, and plug-ins for the product.

| Environment variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE_CLI_HOME`  | Zowe CLI home directory location | Any valid path on your computer | Your computer default home directory |

## Setting a shared plug-in directory

You can set the location of a shared directory to manage Zowe CLI plug-ins for multiple users.

A project administrator can pre-install, and update, a Zowe CLI plug-in stored in the shared directory to make the same version of that plug-in available to all users. This avoids managing separate copies of a plug-in across a development team.

The plug-in directory must be defined before any Zowe CLI plug-ins are installed.

:::info Important

Any plug-in installed before specifying the environment variable cannot be managed with Zowe CLI. To resolve this, re-install the plug-in after the environment variable is set.

:::

| Environment variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE_CLI_PLUGINS_DIR`  | Zowe CLI plug-in directory location | Any valid path on your computer | Plug-ins folder inside the Zowe CLI home |

## Setting CLI log levels

You can set the log level to adjust the level of detail that is written to log files.

:::warning

Setting the log level to `TRACE` or `ALL` might result in sensitive data being logged. For example, command line arguments are logged when `TRACE` is set.

:::

| Environment variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE_APP_LOG_LEVEL`        | Zowe CLI logging level            | Log4JS log levels (`OFF`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`) | `WARN` |
| `ZOWE_IMPERATIVE_LOG_LEVEL` | Imperative CLI Framework logging level | Log4JS log levels (`OFF`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`) | `WARN` |

## Setting CLI daemon mode properties

By default, the CLI daemon mode binary creates or reuses a file in the user's home directory each time a Zowe CLI command runs. In some cases, this behavior might be undesirable. For example, when the home directory resides on a network drive and has poor file performance.

To change the location that the daemon uses, set the environment variables that are described in the following table.

| Platform | Environment variable  | Description | Values | Default |
| ---------------------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| All | `ZOWE_DAEMON_DIR` | Lets you override the complete path to the directory that will hold daemon files related to this user. The directory can contain the following files:<ul><li>`daemon.lock`</li><li>`daemon.sock`</li><li>`daemon_pid.json`</li></ul> | Any valid path on your computer | `<your_home_dir>/.zowe/daemon` <br/><br/> Examples: <br/><br/> Windows: `%HOMEPATH%\.zowe\daemon`<br/>Linux: `$HOME/.zowe/daemon` |
| Windows (only) | `ZOWE_DAEMON_PIPE` | Lets you override the last two segments of the name of the communication pipe between the daemon executable (.exe) and the daemon. | Any valid path on your computer | `\\.\pipe\%USERNAME%\ZoweDaemon`

## Showing secure values

See the secure credentials used by a command to help troubleshoot a configuration problem.

Use the `--show-inputs-only` option in a Zowe CLI command to view the property values used by the command. When the `ZOWE_SHOW_SECURE_ARGS` is set to `true`, the response also includes the secure values used and defined in the user's client configuration.

| Environment variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE_SHOW_SECURE_ARGS`        | Displays secure property values used by a Zowe CLI command            | `TRUE`, `FALSE` | `FALSE` |

## Using Zowe CLI with a proxy

If your network configuration requires communication with the mainframe to be performed through a proxy server, set environment variables to route Zowe CLI traffic through an HTTP/HTTPS proxy.

| Environment Variable         | Description   |   Example Value |
| - | - | - |
| `HTTPS_PROXY`, `https_proxy` | Use an `https` proxy to route communication to the mainframe when your proxy server supports `https`.               | If authentication required: <br/> `https://[user]:[password]@[address]:[port]` <br/> If authentication not required:<br/> `https://[address]:[port]` |
| `HTTP_PROXY`, `http_proxy`   | Use an `http` proxy to route communication to the mainframe when your proxy server does not support `https`.                                                        | If authentication required: <br/>`http://[user]:[password]@[address]:[port]` <br/> If authentication not required:<br/> `http://[address]:[port]`|
| `NO_PROXY`                   | Set a list of host addresses (separated by commas) to connect to the specified hosts without going through a proxy.| `https://[address_1],https://[address_2]`, `http://[address_1],http://[address_2]`, `*.address_1,*.address_2` |
