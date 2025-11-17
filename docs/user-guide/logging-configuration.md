## Logging configuration

For more information, see [Logging Utility](../extend/extend-desktop/mvd-logutility.md).

### Enabling tracing

To obtain more information about how a server is working, you can enable tracing within the Zowe configuration file via *components.app-server.logLevels* or *components.zss.logLevels* variable. For more information on all loggers, check out the [Extended documentation](../extend/extend-desktop/mvd-core-loggers.md).

For example:

```
app-server:
    {...}
    logLevels:
      _zsf.routing: 0
      _zsf.install: 0
```

```
zss:
    {...}
    logLevels:
      _zss.traceLevel: 0
      _zss.fileTrace: 1
```

All settings are optional.

### Log files

The app-server and zss will create log files containing processing messages and statistics. The log files are generated within the log directory specified within the Zowe configuration file  (`zowe.logDirectory`). The filename patterns are:

- App Server: `<zowe.logDirectory>/appServer-yyyy-mm-dd-hh-mm.log`
- ZSS: `<zowe.logDirectory>/zssServer-yyyy-mm-dd-hh-mm.log`

#### Retaining logs

By default, the last five log files are retained. You can change this by setting environment variables within the `zowe.environments` section of the Zowe server configuration file. To specify a different number of logs to retain, set `ZWED_NODE_LOGS_TO_KEEP` for app-server logs, or *ZWES_LOGS_TO_KEEP* for zss logs. For example, if you set `ZWED_NODE_LOGS_TO_KEEP` to 10, when the eleventh log is created, the first log is deleted.

#### Controlling the logging location

At minimum, the log information for both app-server and zss are written to STDOUT such that messages are visible in the terminal that starts Zowe and when on z/OS, the STC job log.

By default, both servers additionally log to files and the location of these files can be changed or logging to them can be disabled.
The following environment variables can be used to customize the app-server and zss log locations by setting the values within the `zowe.environments` section of the Zowe configuration file.

* `ZWED_NODE_LOG_DIR`: Overrides the zowe configuration file value of `zowe.logDirectory` for app-server, but keeps the default filenames.
* `ZWES_LOG_DIR`: Overrides the zowe configuration file value of `zowe.logDirectory` for zss, but keeps the default filenames.
* `ZWED_NODE_LOG_FILE`: Specifies the full path to the file where logs will be written from app-server. This overrides both `ZWED_NODE_LOG_DIR` and `zowe.logDirectory`. If the path is `/dev/null` then no log file will be written. This option does not timestamp logs or keep multiple of them.
* `ZWES_LOG_FILE`: Specifies the full path to the file where logs will be written from zss. This overrides both `ZWES_LOG_DIR` and `zowe.logDirectory`. If the path is `/dev/null` then no log file will be written. This option does not timestamp logs or keep multiple of them.

If the directory or file specified cannot be created, the server will run (but it might not perform logging properly).


