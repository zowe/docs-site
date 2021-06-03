# Installing Plugins
Plugins can be added or removed from the Zowe App Server, as well as upgraded. There are two ways to do these actions: By REST API or by filesystem. The instructions below assume you have administrative permissions either to access the correct REST APIs or to have the necessary permissions to update server directories & files.

*NOTE:* To successfully install, you must [pre-build](https://github.com/zowe/zlux/wiki/Building-Plugins) plugins with the correct [directory structure](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure), and meet all dependencies. If a plugin has successfully installed but does not display in the Zowe desktop, see the server log in the `<INSTANCE_DIR>/log/install-app.log` directory (for example, `~/.zowe/log/install-app.log`) to troubleshoot the problem.

## By filesystem
The App server uses directories of JSON files, described in the [wiki](https://github.com/zowe/zlux/wiki/Configuration-for-ZLUX-App-Server-&-ZSS#deploy-configuration). Defaults are located in the folder `zlux-app-server/defaults/plugins`, but the server reads the list of plugins instead from the instance directory, at `<INSTANCE_DIR>/workspace/app-server/plugins` (for example, `~/.zowe/workspace/app-server/plugins` which includes JSON files describing where to find a plugin. Adding or removing JSONs from this folder will add or remove plugins upon server restart, or you can use REST APIs and cluster mode to add or remove plugins without restarting).

### Old plugins folder
Prior to Zowe release 1.8.0, the location of the default and instance plugins directory were located within `zlux-app-server` folder unless otherwise customized. 1.8.0 has backwards compatibility for the existence of these directories, but they can and should be migrated to take advantage of future enhancements.

| Folder | New Location | Old Location | Note
|--------|--------------|--------------|-----
|Default plugins| `zlux-app-server/defaults/plugins`|`zlux-app-server/plugins`||
|Instance plugins|`<INSTANCE_DIR>/workspace/app-server/plugins`|	`zlux-app-server/instance/ZLUX/plugins`|INSTANCE_DIR is ~/.zowe if not otherwise defined|

### Adding/Installing
To add or install a plugin, run the script `zlux-app-server/bin/install-app.sh` providing the location to a plugin folder. For example:

`./install-app.sh /home/john/zowe/sample-angular-app`

This will generate a JSON file that states the plugin's ID and its location on disk. These JSON files tell the Desktop where to find apps. For example, if we were to install the sample angular-app in the folder `/home/john/zowe/sample-angular-app`, then the JSON would be:
```
{
  "identifier":"org.zowe.zlux.sample.angular", 
  "location": "/home/john/zowe/sample-angular-app"
}
```
### Removing
To remove a plugin, locate the server's instance plugin directory `<INSTANCE_DIR>/workspace/app-server/plugins` (for example, `~/.zowe/workspace/app-server/plugins`) and remove the locator JSON that is associated with that plugin. Remove the plugin's content by deleting it from the file system if applicable.

### Upgrading
Currently, only one version of a plugin can exist per server. So, to upgrade, you either upgrade the plugin within its pre-existing directory by rebuilding it (with more up to date code), or you alter the locator JSON of that app to point to the content of the upgraded version.

### Modifying without server restart (Exercise to the reader)
The server's reading of the locator JSONs and initializing of plugins only happens during bootstrapping at startup. However, in cluster mode the bootstrapping happens once per worker process. Therefore, it is possible to manage plugins without a server restart by killing & respawning all worker processes without killing the cluster master process. This is what the REST API does, internally. To do this without the REST API, it may be possible to script knowing the parent process ID, and running a kill command on all child processes of the App server cluster process.

## By REST API
The server REST APIs allow plugin management without restarting the server - you can add, remove, and upgrade plugins in real-time. However, removal or upgrade must be done carefully as it can disrupt users of those plugins.

[This swagger file documents the REST API for plugin management](https://github.com/zowe/zlux-app-server/blob/master/doc/swagger/server-plugins-api.yaml)

The API only works when RBAC is configured, and an RBAC-compatible security plugin is being used. An example of this is [zss-auth](https://github.com/zowe/zss-auth), and [use of RBAC](https://docs.zowe.org/stable/user-guide/mvd-configuration.html#enabling-rbac) is described in this documentation and in the [wiki](https://github.com/zowe/zlux/wiki/Auth-Plugin-Configuration).