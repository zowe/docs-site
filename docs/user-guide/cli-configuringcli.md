# Configuring Zowe CLI 
After you install Zowe, you can optionally perform Zowe CLI configurations.

## Setting environment variables for Zowe CLI
You can set environment variables on your operating system to modify Zowe CLI behavior, such as the log level and the location of the *.brightside* directory, where the logs, profiles, and plug-ins are stored. Refer to your PC operating system documentation for information about how to set environmental variables.

### Setting log levels

You can set the log level to adjust the level of detail that is written to log files:

**Important\!** Setting the log level to TRACE or ALL might result in "sensitive" data being logged. For example, command line arguments will be logged when TRACE is set.

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE\_APP\_LOG\_LEVEL`        | Zowe CLI logging level            | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |
| `ZOWE\_IMPERATIVE\_LOG\_LEVEL` | Imperative CLI Framework logging level | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |

### Setting the .zowe directory
You can set the location on your PC where Zowe CLI creates the *.zowe* directory, which contains log files, profiles, and plug-ins for the product:

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE\_CLI\_HOME`  | Zowe CLI home directory location | Any valid path on your PC | Your PC default home directory |
