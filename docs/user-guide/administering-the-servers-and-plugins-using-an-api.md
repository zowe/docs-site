# Administering the servers and plugins using an API
The App Server has a REST API to retrieve and edit both the App Server and ZSS server configuration values, and list, add, update, and delete plugins. Most of the features require RBAC to be enabled and for your user to have RBAC access to utilize these endpoints. For more information see documentation on how to  [use RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#controlling-access-to-dataservices)

The API returns the following information in a JSON response: 

| API                                                       | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| /server (GET)                                             | Returns a list of accessible server endpoints for the Zowe App Server. |
| /server/config (GET)                                      | Returns the Zowe App Server configuration which follows [this specification](https://github.com/zowe/zlux-app-server/blob/v3.x/master/schemas/app-server-config.json). |
| /server/log (GET)                                         | Returns the contents of the Zowe App Server log file. |
| /server/loglevels (GET)                                   | Returns the verbosity levels set in the Zowe App Server logger. |
| /server/environment (GET)                                 | Returns Zowe App Server environment information, such as the operating system version, node server version, and process ID. |
| /server/reload (GET)                                      | Reloads the Zowe App Server. Only available in cluster mode. |
| /server/agent (GET)                                       | Returns a list of accessible server endpoints for the ZSS server. |
| /server/agent/config (GET)                                | Returns the ZSS server configuration which follows [this specification](https://github.com/zowe/zss/blob/v3.x/staging/schemas/zss-config.json). |
| /server/agent/log (GET)                                   | Returns the contents of the ZSS log file.                    |
| /server/agent/loglevels (GET)                             | Returns the verbosity levels of the ZSS logger.              |
| /server/agent/environment (GET)                           | Returns ZSS environment information.                         |
| /server/logLevels/name/:componentName/level/:level (POST) | Specify the logger that you are using and a verbosity level. |
| /plugins (GET)                                            | Returns a list of all plugins and their dataservices.        |
| /plugins (PUT)                                            | Adds a new plugin or upgrades an existing plugin. Only available in cluster mode (default). |
| /plugins/:id (DELETE)                                     | Deletes a plugin. Only available in cluster mode (default).  |

Swagger API documentation is provided in the `<zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/doc/swagger/server-plugins-api.yaml` file. To see it in HTML format, you can paste the contents into the Swagger editor at https://editor.swagger.io/.

**Note:** The "agent" end points interact with the agent specified in the zowe configuration file. By default this is ZSS.


