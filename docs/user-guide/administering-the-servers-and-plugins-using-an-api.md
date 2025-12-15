# Administering the servers and plug-ins using an API
The App Server has a REST API to retrieve and edit both the App Server and ZSS server configuration values, and list, add, update, and delete plug-ins. Most of the features require RBAC to be enabled and for your user to have RBAC access to utilize these endpoints. For more information, see the documentation on how to  [use RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#controlling-access-to-dataservices)

The API returns the following information in a JSON response: 

| API                                                       | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| /server (GET)                                             | A list of accessible server endpoints for the Zowe App Server. |
| /server/config (GET)                                      | The Zowe App Server configuration which follows [this specification](https://github.com/zowe/zlux-app-server/blob/v3.x/master/schemas/app-server-config.json). |
| /server/log (GET)                                         | The contents of the Zowe App Server log file. |
| /server/loglevels (GET)                                   | The verbosity levels set in the Zowe App Server logger. |
| /server/environment (GET)                                 | The Zowe App Server environment information, such as the operating system version, node server version, and process ID. |
| /server/reload (GET)                                      | Reloads the Zowe App Server. Only available in cluster mode. |
| /server/agent (GET)                                       | A list of accessible server endpoints for the ZSS server. |
| /server/agent/config (GET)                                | The ZSS server configuration which follows [this specification](https://github.com/zowe/zss/blob/v3.x/staging/schemas/zss-config.json). |
| /server/agent/log (GET)                                   | The contents of the ZSS log file.                    |
| /server/agent/loglevels (GET)                             | The verbosity levels of the ZSS logger.              |
| /server/agent/environment (GET)                           | The ZSS environment information.                         |
| /server/logLevels/name/:componentName/level/:level (POST) | The logger that you are using and a verbosity level. |
| /plugins (GET)                                            | A list of all plug-ins and their dataservices.        |
| /plugins (PUT)                                            | Adds a new plug-in or upgrades an existing plug-in. Only available in cluster mode (default). |
| /plugins/:id (DELETE)                                     | Deletes a plug-in. Only available in cluster mode (default).  |

Swagger API documentation is provided in the `<zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/doc/swagger/server-plugins-api.yaml` file. To see it in HTML format, you can paste the contents into the Swagger editor at https://editor.swagger.io/.

**Note:** The "agent" end points interact with the agent specified in the zowe configuration file. By default this is ZSS.


