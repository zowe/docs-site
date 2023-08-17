This is a list of core loggers (and descriptions of each) that you can enable and increase verbosity on within the logging framework. See [the logging utility](mvd-logutility.md) for more info.

# Loggers for Zowe Application Server Core
The log prefix for the Zowe Application Server is _zsf, which is used by the server framework. (Applications and plug-ins that are attached to the server do not use the _zsf prefix.)
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
The log prefix for ZSS is _zss. The following are the logger names that you can specify:
* **_zss.traceLevel**: Controls general server logging verbosity.
* **_zss.fileTrace**: Logs file serving behavior (if file serving is enabled).
* **_zss.socketTrace**: Logs general TCP Socket behavior.
* **_zss.httpParseTrace**: Logs parsing of HTTP messages.
* **_zss.httpDispatchTrace**: Logs dispatching of HTTP messages to dataservices.
* **_zss.httpHeadersTrace**: Logs parsing and setting of HTTP headers.
* **_zss.httpSocketTrace**: Logs TCP socket behavior for HTTP.
* **_zss.httpCloseConversationTrace**: Logs HTTP behavior for when an HTTP conversation ends.
* **_zss.httpAuthTrace**: Logs behavior for session security.
* **_zss.mvdserver**: Generic logging for ZSS items not covered by other loggers.
* **_zss.ctds**: Controls logging of the built-in CTDS service.
* **_zss.security**: Controls logging of the built-in security service.
* **_zss.unixfile**: Controls logging of the built-in unixfile service.
* **_zss.dataservice**: Controls logging of generic dataservice tasks.
* **_zss.apimlstorage**: Controls logging of the dataservice storage API.
* **_zss.jwk**: Controls logging of JWK use for SSO.
* **_zss.alloc**: Controls logging alloc library functions.
* **_zss.utils**: Controls logging of util library functions.
* **_zss.collections**: Controls logging of collection structure library functions.
* **_zss.serialization**: Controls logging of serialiation library functions.
* **_zss.zlparser**: Controls logging of zlparser library functions.
* **_zss.zlcompiler**: Controls logging of zlcompiler library functions.
* **_zss.zlruntime**: Controls logging of zlruntime library functions.
* **_zss.stcbase**: Controls logging of STC Base functions.
* **_zss.httpserver**: Controls logging of the http server base.
* **_zss.discovery**: Controls logging of discovery tools.
* **_zss.cms**: Controls logging of cms library functions.
* **_zss.lpa**: Controls logging of lpa library functions.
* **_zss.restdataset**: Controls logging of restdataset functions.
* **_zss.restfile**: Controls logging of the REST api for files.
* **_zss.zos**: Controls logging of zos utility library functions.
* **_zss.httpclient**: Controls logging of http client calls.
* **_zss.jwt**: Controls logging of JWT library functions.
