# Configuring Zowe CLI

This section explains how to configure Zowe CLI, such as changing log levels and setting the home directory location.

**Tip:** CLI configuration is stored on your computer in the directory `C:\Users\user01\.zowe` by default. The directory includes log files, profile information, and installed CLI plug-ins. When troubleshooting, refer to the logs in the `imperative` and `zowe` folders.

  - [Setting Zowe CLI log levels](#setting-cli-log-levels)
  - [Setting the Zowe CLI home directory](#setting-the-cli-home-directory)

## Setting CLI log levels

You can set the log level to adjust the level of detail that is written to log files:

**Important\!** Setting the log level to TRACE or ALL might result in "sensitive" data being logged. For example, command line arguments will be logged when TRACE is set.

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE_APP_LOG_LEVEL`        | Zowe CLI logging level            | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |
| `ZOWE_IMPERATIVE_LOG_LEVEL` | Imperative CLI Framework logging level | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |

## Setting the CLI home directory

You can set the location on your computer where Zowe CLI creates the *.zowe* directory, which contains log files, profiles, and plug-ins for the product:

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE_CLI_HOME`  | Zowe CLI home directory location | Any valid path on your computer | Your computer default home directory |
