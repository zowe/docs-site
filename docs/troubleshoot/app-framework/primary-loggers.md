# Primary loggers

This is a list of primary loggers and their descriptions. You can enable the loggers and increase the logging verbosity within the logging framework. For more information, see [Enabling tracing](./appfw-tracing.md).

## Loggers for app-server component
The log prefix for the Zowe Application Server is `_zsf`, which is used by the server framework. (Applications and plug-ins that are attached to the server do not use the `_zsf` prefix.)
The following are the logger names that you can specify:
Logger name | Description
---|---
**_zsf.bootstrap** | Logging that pertains to the startup of the server.
**_zsf.auth** | Logging for network calls that must be checked for authentication and authorization purposes.
**_zsf.static** | Logging of the serving of static files (such as images) from an application's folder or a web folder.
**_zsf.child** | Logging of child processes, if any.
**_zsf.utils** | Logging for miscellaneous utilities that the server relies upon.
**_zsf.proxy** | Logging for proxies that are set up in the server.
**_zsf.install** | Logging for the installation of plug-ins.
**_zsf.apiml** | Logging for the communication with the API Mediation Layer.
**_zsf.routing** | Logging for dispatching network requests to plug-in dataservices.
**_zsf.network** | Logging for the HTTPS server status (connection, ports, IP, etc).


## Loggers for zss component
The log prefix for ZSS is `_zss`. 
The following are the logger names that you can specify:
Logger name | Description
---|---
**_zss.traceLevel** | Controls the logging verbosity of the server.
**_zss.fileTrace** | Logs the behavior of file serving (if file serving is enabled).
**_zss.socketTrace** | Logs the behavior of a general TCP Socket.
**_zss.httpParseTrace** | Logs the parsing of HTTP messages.
**_zss.httpDispatchTrace** | Logs the dispatching of HTTP messages to dataservices.
**_zss.httpHeadersTrace** | Logs the parsing and setting up of HTTP headers.
**_zss.httpSocketTrace** | Logs the behavior of a TCP socket for HTTP.
**_zss.httpCloseConversationTrace** | Logs the behavior of HTTP when an HTTP conversation ends.
**_zss.httpAuthTrace** | Logs the behavior of the security of a session.
**_zss.jwtTrace** | Logs the JSON Web Tokens.

## Log levels
Most loggers have levels ranging from 0 to 5, where 0 is the least verbose and 5 is the most verbose.
Log level | Verbosity
---|---|---|
0 | SEVERE | Denotes critical errors, application failure.
1 | WARNING | Denotes potential issues that need attention soon.
2 (Default) | INFO | Denotes general operational updates, normal functioning.
3 | FINE | Denotes detailed tracing information.
4 | FINER | Denotes more detailed tracing information.
5 | FINEST | Denotes extremely detailed tracing information which can be used for debugging.

