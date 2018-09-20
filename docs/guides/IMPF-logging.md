# Configuring logging

Imperative CLI Framework uses [log4js](URL) as a framework for logging. Applications that you build using the framework create an instance of log4js that you can use after you call `Imperative.init()`.

Plug-ins that use the Imperative CLI Framework and the logging API can direct their logs to be written to the same log file that is used by the Imperative CLI Framework or to a custom log file that contains information that is relevant to the plug-in and is isolated from the imperative log files. You can control the log file names to use, the level of logging, and to which log files the data is written using the logging configuration. The level of logging (for example, `TRACE`, `DEBUG`, `INFO`, and so on) are also controllable programmatically.

The initial Imperative CLI Framework configuration document, named `IImperativeConfig`, contains fields named logging of type `IImperativeLogsConfig`. `IImperativeLogsConfig` contains fields to configure `imperativeLogging`, `appLogging`, `consoleLogging`, and `additionalLogging`, that are populated by the logging configuration. When you do not specify values for `imperativeLogging`, `appLogging`, or `consoleLogging` the default values for the fields are used.

- Configure Logging
- Logging Using the Logging API
- Logging When the Logging API is Not Available


## Configuring logging
To set up Imperative CLI Framework, configure the following configuration files:

- `IImperativeLoggingConfig.ts` (Imperative CLI Framework Logging):

    The following example illustrates how to configure the `IImperativeLoggingConfig.ts` configuration file:
    
    ```typescript
    export interface IImperativeLoggingConfig {

    /**
     * Specify a log level name.  An app's logging object is accessible via the
     * Imperative.api.appLogging object.
     *
     * Default will direct log output to
     * ~/.<app-name>/logs/<app-name>.log
     *
     * <app-name> is controlled via "name" setting in IImperativeConfig.
     */
    logFile?: string;

    /**
     * Select a specific log level setting, for example, if a log setting of "fatal"
     * is used, only "fatal" level messages will appear within the log.  However,
     * if "debug" level messages are selected, "debug", "info", "warn", "error",
     * and "fatal" messages will appear within the log.
     *
     * Accepted values are:
     *  trace, debug, info, warn, error, fatal
     *
     * Default:
     *  debug
     */
    level?: string;

    /**
     * "imperative", "app", and "console" are reserved.  Use this field to
     * create additional log API entities.
     * There is no default.  This field is required when defining extra entries,
     * and its content is ignored for predefined loggers (imperative, console, and app loggers)
     */
    apiName?: string;
    ```
- `IImperativeLogsConfig.ts` (Imperative CLI Framework Logs):

    The following example illustrates how to configure the `IImperativeLogsConfig.ts` configuration file:
    
    ```typescript
    export interface IImperativeLogsConfig {

    /**
     * Use this property to configure imperative logging preferences.  Defaults are provided and this
     * property must only be supplied to override defaults.  See the IImperativeLoggingConfig document for more
     * information.
     */
    imperativeLogging?: IImperativeLoggingConfig;

    /**
     * Use this property to configure your applications logging preferences.  Defaults are provided and this
     * property must only be supplied to override defaults.  See the IImperativeLoggingConfig document for more
     * information.
     */
    appLogging?: IImperativeLoggingConfig;

    /**
     * Use this property to configure additional log files and preferences if needed.
     */
    additionalLogging?: IImperativeLoggingConfig[];

    [key: string]: any;
    }
    ```

- `IImperativeConfig.ts` (Imperative CLI Framework Command Line Application Configuration):
    The following interface illustrates how to configure your command line application to use Imperative CLI Framework, including: `IImperativeConfig.ts`


## Logging using the logging API
The following examples illustrate how to configure logging using the logging API.

### Log to an isolated application log file

Use the following syntax:

```typescript
import { Imperative } from "@brightside/imperative";
const appLogger = Imperative.api.appLogger;
appLogger.debug("My debug data");
```
### Log to an Imperative CLI Framework log file

Use the following syntax:

```typescript
import { Imperative } from "@brightside/imperative";
const imperativeLogger = Imperative.api.imperativeLogger;
imperativeLogger.debug("My debug data");
```

### Log to a console
Use the following syntax:

```typescript
import { Imperative } from "@brightside/imperative";
const consoleLogger = Imperative.api.consoleLogger;
consoleLogger.debug("My debug data");
```

**Important!:** Use console logging for only debugging purposes. You should remove console logging after you diagnose the problem. We recommend this approach because console logging can become interleaved with JSON output commands that are invoked with `--response-format-json`, which prevents the output from being parsed properly.

### Logging When the Logging API is not available

You cannot create the Imperative CLI Framework API object when `Imperative.init()` fails. As a result, you cannot use the Imperative.api logging objects. Optionally, you can use `Imperative.console` to write error messages and issue general debugging messages when `Imperative.init()` fails.

The following syntax illustrates the syntax that you can use when `Imperative.init()` fails:

```typescript
import { Imperative } from "@brightside/imperative";
Imperative.defaultConsole.debug("My debug data");
Imperative.console.debug("My debug data");
```