## Controlling access to apps

You can control which apps are accessible (visible) to all Zowe desktop users, and which are accessible only to individual users. For example, you can make an app that is under development only visible to the team working on it.

You control access by editing JSON files that list the apps. One file lists the apps all users can see, and you can create a file for each user. When a user logs into the desktop, Zowe determines the apps that user can see by concatenating their list with the all users list.

You can also control access to the JSON files. The files are accessible directly on the file system, and since they are within the configuration dataservice directories, they are also accessible via REST API. We recommend that only Zowe administrators be allowed to access the file system locations, and you control that by setting the directories and their contents to have file permissions on z/OS that only allow the Zowe admin group read & write access. You control who can read and edit the JSON files through the REST API by controlling who can [access the configuration dataservice objects](mvd-configuration.md#creating-authorization-profiles) URLs that serve the JSON files.

### Enabling RBAC

By default, RBAC is disabled and all authenticated Zowe users can access all dataservices. To enable RBAC, follow these steps:

1. To enable RBAC, set the *components.zss.dataserviceAuthentication.rbac* and *components.app-server.dataserviceAuthentication.rbac* variables to `true` in the Zowe configuration file.

### Controlling app access for all users

**Note:**
- `<zowe.runtimeDirectory>` variable comes from the Zowe configuration file.

1. Enable RBAC.

2. Navigate to the following location:
   ```
   <zowe.runtimeDirectory>/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
3. Copy the `allowedPlugins.json` file and paste it in the following location:
   ```
   <zowe.workspaceDirectory>/app-server/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
4. Open the copied `allowedPlugins.json` file and perform either of the following steps:
    - To make an app unavailable, delete it from the list of objects.
    - To make an app available, copy an existing plugin object and specify the app's values in the new object. Identifier and version attributes are required.

5. [Restart the app server](start-zowe-zos.md).

### Controlling app access for individual users

1. Enable RBAC.

2. In the user's ID directory path, in the `\pluginStorage` directory, create `\org.zowe.zlux.bootstrap\plugins` directories. For example:
    ```
    <zowe.workspaceDirectory>/app-server/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
    ```

3. In the `/plugins` directory, create an `allowedPlugins.json` file. You can use the default `allowedPlugins.json` file as a template by copying it from the following location:
   ```
   <zpwe.runtimeDirectory>/components/app-server/share/zlux-app-server/defaults/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins
   ```
6. Open the `allowedPlugins.json` file and specify apps that user can access. For example:
    ```json
    {
      "allowedPlugins": [
        {
          "identifier": "org.zowe.appA",
          "versions": [
            "1.1"
          ]
        },
        {
          "identifier": "org.zowe.appB",
          "versions": [
            "*"
          ]
        },
    }
    ```

    **Notes:**
    - Identifier and version attributes are required.
    - When a user logs in to the desktop, Zowe determines which apps they can see by concatenating the list of apps available to all users with the apps available to the individual user.

6. [Restart the app server](start-zowe-zos.md).


