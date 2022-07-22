# Logging utility

The `zlux-shared` repository provides a logging utility for use by dataservices and web content for an application plug-in.

1. [Logging Objects](#logging-objects)
1. [Logger IDs](#logger-ids)
1. [Accessing Logger Objects](#accessing-logger-objects)
    1. [Logger](#logger)
        1. [App Server](#app-server)
        1. [Web](#web)
    1. [Component Logger](#component-logger)
        1. [App Server](#app-server-1)
        1. [Web](#web-1)
1. [Logger API](#logger-api)
1. [Component Logger API](#component-logger-api)
1. [Log Levels](#log-levels)
1. [Logging Verbosity](#logging-verbosity)
    1. [Configuring Logging Verbosity](#configuring-logging-verbosity)
        1. [Server Startup Logging Configuration](#server-startup-logging-configuration)
1. [Using log message IDs](#using-log-message-ids)


## Logging objects

The logging utility is based on the following objects:

* **Component Loggers**: Objects that log messages for an individual component of the environment, such as a REST API for an application plug-in or to log user access.
* **Destinations**: Objects that are called when a component logger requests a message to be logged. Destinations determine how something is logged, for example, to a file or to a console, and what formatting is applied.
* **Logger**: Central logging object, which can spawn component loggers and attach destinations.

## Logger IDs

Because Zowe&trade; application plug-ins have unique identifiers, both dataservices and an application plug-in's web content are provided with a component logger that knows this unique ID such that messages that are logged can be prefixed with the ID. With the association of logging to IDs, you can control verbosity of logs by setting log verbosity by ID.

## Accessing logger objects

### Logger

The core logger object is attached as a global for low-level access.

#### App Server

NodeJS uses `global` as its global object, so the logger is attached to:
`global.COM_RS_COMMON_LOGGER`

#### Web

Browsers use `window` as the global object, so the logger is attached to:
`window.COM_RS_COMMON_LOGGER`

### Component logger

Component loggers are created from the core logger object, but when working with an application plug-in, allow the application plug-in framework to create these loggers for you. An application plug-in's component logger is presented to dataservices or web content as follows.

#### App Server

See **Router Dataservice Context** in the topic [Dataservices](mvd-dataservices.md).   


#### Web

(Angular App Instance Injectible). See **Logger** in [Zowe Desktop and window management](mvd-desktopandwindowmgt.md).  


## Logger API

The following constants and functions are available on the central logging object.

| Attribute | Type | Description | Arguments |
|-----------|------|-------------|-----------|
| `makeComponentLogger` | function | Returns an existing logger of this name, or creates a new component logger if no logger of the specified name exists - Automatically done by the application framework for dataservices and web content | `componentIDString`  |
| `setLogLevelForComponentName` | function | Sets the verbosity of an existing component logger | `componentIDString`, `logLevel`  |

## Component Logger API

The following constants and functions are available to each component logger.

| Attribute | Type | Description | Arguments
|-----------|------|-------------|----------
| `CRITICAL` | const | Is a const for `logLevel`
| `SEVERE` | const | Is a const for `logLevel`
| `WARN` | const | Is a const for `logLevel`
| `WARNING` | const | Is a const for `logLevel`
| `INFO` | const | Is a const for `logLevel`
| `DEBUG` | const | Is a const for `logLevel`
| `FINE` | const | Is a const for `logLevel`
| `FINER` | const | Is a const for `logLevel`
| `TRACE` | const | Is a const for `logLevel`
| `FINEST` | const | Is a const for `logLevel`
| `log` | function | Used to write a log, specifying the log level | `logLevel`, `messageString`
| `critical` | function | Used to write a CRITICAL log. | `messageString`
| `severe` | function | Used to write a SEVERE log. | `messageString`
| `warn` | function | Used to write a WARNING log. | `messageString`
| `info` | function | Used to write an INFO log. | `messageString`
| `debug` | function | Used to write a FINE log. | `messageString`
| `trace` | function | Used to write a TRACE log. | `messageString`
| `makeSublogger` | function | Creates a new component logger with an ID appended by the string given | `componentNameSuffix`

## Log Levels

An enum, `LogLevel`, exists for specifying the verbosity level of a logger. The mapping is:

| Level | Number
|-------|-------
| CRITICAL | 0
| WARNING | 1
| INFO | 2
| DEBUG | 3
| FINER | 4
| TRACE | 5

**Note:** The default log level for a logger is **INFO**.


## Logging verbosity

Using the component logger API, loggers can dictate at which level of verbosity a log message should be visible.
You can configure the server or client to show more or less verbose messages by using the core logger's API objects.

Example: You want to set the verbosity of the org.zowe.foo application plug-in's dataservice, bar to show debugging information.

`logger.setLogLevelForComponentName('org.zowe.foo.bar',LogLevel.DEBUG)`

### Configuring logging verbosity

The application plug-in framework provides ways to specify what component loggers you would like to set default verbosity for, such that you can easily turn logging on or off.

#### Server startup logging configuration

[The server configuration file](https://github.com/zowe/zlux/wiki/Configuration-for-zLUX-App-Server-&-ZSS) allows for specification of default log levels, as a top-level attribute `logLevel`, which takes key-value pairs where the key is a regex pattern for component IDs, and the value is an integer for the log levels.

For example:
```  
"logLevel": {
    "com.rs.configjs.data.access": 2,
    //the string given is a regex pattern string, so .* at the end here will cover that service and its subloggers.
    "com.rs.myplugin.myservice.*": 4
    //
    // '_' char reserved, and '_' at beginning reserved for server. Just as we reserve
    // '_internal' for plugin config data for config service.
    // _unp = universal node proxy core logging
    //"_unp.dsauth": 2
  },
```
For more information about the server configuration file, see [Zowe Application Framework (zLUX) configuration](../../user-guide/mvd-configuration#zowe-application-framework-configuration).

## Using log message IDs
To make technical support for your application easier, create IDs for common log messages and use substitution to generate them. When you use IDs, people fielding support calls can identify and solve problems more quickly. IDs are particularly helpful if your application is translated, because it avoids users having to explain problems using language that the tech support person might not understand.

To use log message IDs, take the following steps:

1. Depending on how your application is structured, create message files in the following locations:
   - Web log messages: `{plugin}/web/assets/i18n/log/messages_{language}.json`
   - App server log messages: `{plugin}/lib/assets/i18n/log/messages_{language}.json`

2. In the files, create ID-message pairs using the following format:

   ```
   { "id1": "value1", "id2": "value2" [...] }
   ```

   Where "id#" is the message ID and "value#" is the text. For example:

   ```
   { "A001": "Application created.", "A002": "Application deleted." [...] }
   ```

3. Reference the IDs in your code, for example:

   ```
   this.log.info("A001")
   ```

   Which compiles to:

   ```
   DATE TIME:TIME:TIME.TIME <ZWED:> username INFO (org.zowe.app.name,:) A001 - Application created.
   ```

   Or in another supported language, such as Russian:

   ```
   DATE TIME:TIME:TIME.TIME <ZWED:> username INFO (org.zowe.app.name,:) A001 - Приложение создано.
   ```
   
### Message ID logging examples

Server core: https://github.com/zowe/zlux-server-framework/blob/master/plugins/config/lib/assets/i18n/log/messages_en.json
