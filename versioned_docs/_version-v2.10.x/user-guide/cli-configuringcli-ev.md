# Configuring Zowe CLI environment variables

This section explains how to configure Zowe CLI using environment variables.

By default, Zowe CLI configuration is stored on your computer in the `C:\Users\user01\.zowe` directory. The directory includes log files, profile information, and installed CLI plug-ins. When troubleshooting, refer to the logs in the `imperative` and `zowe` folders.

**Note:** For information on how to define Zowe CLI environment variables to execute commands more efficiently, see [Using environment variables](cli-using-using-environment-variables.md).

## Setting the CLI home directory

You can set the location on your computer where Zowe CLI creates the *.zowe* directory, which contains log files, profiles, and plug-ins for the product:

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE_CLI_HOME`  | Zowe CLI home directory location | Any valid path on your computer | Your computer default home directory |

## Setting a shared plug-in directory

You can set the location of a shared directory to manage plug-ins for multiple users.

A project administrator can pre-install, and update, a plug-in stored in the shared directory to make the same version of that plug-in available to all users. This avoids managing separate copies of a plug-in across a development team.

The plug-in directory must be defined before any Zowe CLI plug-ins are installed.

**Important\!** Any plug-in installed before specifying the environment variable cannot be managed with Zowe CLI. To resolve this, re-install the plug-in after the environment variable is set.

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE_CLI_PLUGINS_DIR`  | Zowe CLI plug-in directory location | Any valid path on your computer | Plug-ins folder inside the Zowe CLI home |

## Setting CLI log levels

You can set the log level to adjust the level of detail that is written to log files:

**Important\!** Setting the log level to TRACE or ALL might result in "sensitive" data being logged. For example, command line arguments will be logged when TRACE is set.

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE_APP_LOG_LEVEL`        | Zowe CLI logging level            | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | WARN |
| `ZOWE_IMPERATIVE_LOG_LEVEL` | Imperative CLI Framework logging level | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | WARN |

## Setting CLI daemon mode properties

By default, the CLI daemon mode binary creates or reuses a file in the user's home directory each time a Zowe CLI command runs. In some cases, this behavior might be undesirable. For example, the home directory resides on a network drive and has poor file performance. To change the location that the daemon uses, set the environment variables that are described in the following table:

| Platform | Environment Variable  | Description | Values | Default |
| ---------------------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| All | `ZOWE_DAEMON_DIR` | Lets you override the complete path to the directory that will hold daemon files related to this user. The directory can contain the following files:<ul><li>`daemon.lock`</li><li>`daemon.sock`</li><li>`daemon_pid.json`</li></ul> | Any valid path on your computer | `<your_home_dir>/.zowe/daemon`<p>**Examples:**</p><ul><li>**Windows:** `%HOMEPATH%\.zowe\daemon`</li><li>**Linux:** `$HOME/.zowe/daemon`</li></ul> |
| Windows (only) | `ZOWE_DAEMON_PIPE` | Lets you override the last two segments of the name of the communication pipe between the daemon executable (.exe) and the daemon. | Any valid path on your computer | `\\.\pipe\%USERNAME%\ZoweDaemon
