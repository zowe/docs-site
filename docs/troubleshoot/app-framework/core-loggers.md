This is a list of core loggers (and descriptions of each) that you can enable and increase verbosity on within the logging framework. See [the logging utility](mvd-logutility.md) for more info.

# Loggers for Zowe Application Server Core
The log prefix for the Zowe Application Server is `_zsf`, which is used by the server framework. (Applications and plug-ins that are attached to the server do not use the `_zsf` prefix.)
The following are the logger names that you can specify:
* **_zsf.bootstrap**: Logging that pertains to the startup of the server.
* **_zsf.auth**: Logging for network calls that must be checked for authentication and authorization purposes.
* **_zsf.static**: Logging of the serving of static files (such as images) from an application's /web folder.
* **_zsf.child**: Logging of child processes, if any.
* **_zsf.utils**: Logging for miscellaneous utilities that the server relies upon.
* **_zsf.proxy**: Logging for proxies that are set up in the server.
* **_zsf.install**: Logging for the installation of plug-ins.
* **_zsf.apiml**: Logging for communication with the api mediation layer.
* **_zsf.routing**: Logging for dispatching network requests to plug-in dataservices.
* **_zsf.network**: Logging for the HTTPS server status (connection, ports, IP, and so on).

# Zowe App Server Log levels
* 0: SEVERE
* 1: WARNING
* 2 (Default): INFO
* 3: FINE
* 4: FINER
* 5: FINEST


# Loggers for ZSS Server Core
The log prefix for ZSS is `_zss`. The following are the logger names that you can specify:
* **_zss.traceLevel**: Controls general server logging verbosity.
* **_zss.fileTrace**: Logs file serving behavior (if file serving is enabled).
* **_zss.socketTrace**: Logs general TCP Socket behavior.
* **_zss.httpParseTrace**: Logs parsing of HTTP messages.
* **_zss.httpDispatchTrace**: Logs dispatching of HTTP messages to dataservices.
* **_zss.httpHeadersTrace**: Logs parsing and setting of HTTP headers.
* **_zss.httpSocketTrace**: Logs TCP socket behavior for HTTP.
* **_zss.httpCloseConversationTrace**: Logs HTTP behavior for when an HTTP conversation ends.
* **_zss.httpAuthTrace**: Logs behavior for session security.
* **_zss.jwtTrace**: Logs the JSON Web Tokens.
