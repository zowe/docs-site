# App-server Error Message Codes

The following error message codes may appear on the app-server log. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues.

## App-server informational messages

### ZWED0020I

  Registering at _discoveryUrl_

  **Reason:**

  The app-server is registering its existence to the API ML discovery server, because `components.app-server.node.mediationLayer.enabled=true` is set in the zowe configuration.

  **Action:**

  No action required.



### ZWED0021I

  Eureka Client Registered from _ipAddress_. Available at _discoveryUrl_

  **Reason:**

  The registration attempt from ZWED0020I has succeeded. The server is known to the API ML discovery server from the address _ipAddress_

  **Action:**

  No action required.



### ZWED0022I

  Fork worker _workerId_

  **Reason:**

  A new app-server worker process is starting. Workers are redundant execution contexts of the server and increase throughput and latency of requests when the server has a lot of concurrent client requests. Workers are started and stopped according to current server load and the minimum and maximum worker limits defined in environment variables ZLUX_MIN_WORKERS and ZLUX_MAX_WORKERS.

  **Action:**

  No action required.



### ZWED0023I

  Restart worker _workerId_

  **Reason:**

  An existing app-server worker process has exited with a status code that indicates it should be restarted rather than permenantly stopped.

  **Action:**

  Review the preceeding log messages as worker restart may be due to a caught error.



### ZWED0024I

  Keys=_workerIds_

  **Reason:**

  The server lists the worker IDs right before all workers are about to be reloaded.

  **Action:**

  No action required.



### ZWED0025I

  Killing worker pid=_processId_

  **Reason:**

  The server just issued the SIGTERM unix signal to the worker with the process ID listed. This is an expected action when reloading all workers of the server.

  **Action:**

  No action required.



### ZWED0026I

  Fork _quantity_ workers.

  **Reason:**

  The server is starting up _quantity_ new workers. Workers are redundant execution contexts of the server and increase throughput and latency of requests when the server has a lot of concurrent client requests. This message happens at startup and the _quantity_ is determined by the environment variables ZLUX_MIN_WORKERS and ZLUX_MAX_WORKERS.

  **Action:**

  No action required.



### ZWED0027I

  Close worker _workerId_

  **Reason:**

  The server is removing an existing worker due to lack of recent client activity. Workers are added and removed according to average load of the server. Workers are redundant execution contexts of the server and increase throughput and latency of requests when the server has a lot of concurrent client requests. Workers may be removed down to the minimum count as defined by the environment variable ZLUX_MIN_WORKERS.

  **Action:**

  No action required.



### ZWED0028I

  Master _processId_ is running.

  **Reason:**

  The server has started up and is printing its unix process ID in case the user needs to know for analysis or troubleshooting.

  **Action:**

  No action required.



### ZWED0029I

  Worker _workerId_ pid _processId_

  **Reason:**

  A worker has started and is listing its ID and unix process ID in case the user needs to know for analysis or troubleshooting. 

  **Action:**

  No action required.



### ZWED0031I

  Server is ready at _ipAddress_, Plugins successfully loaded: _percentage_% (_successful_/_total_)

  **Reason:**

  The server is ready to accept client requests. It can be found at the _ipAddress_ listed, and you can tell if it has loaded all plugins successfully by the _percentage_ listed

  **Action:**

  If the percentage is less than expected, review the log for messages with IDs ZWED0159W or ZWED0027W. Those messages will tell you which plugins failed, and you can search for their plugin ID within the log to find out the reason they failed to load.



### ZWED0033I

  The http port given to the APIML is: _tcpPort_
  The https port given to the APIML is: _tcpPort_
  The zlux-apiml config are: _jsonConfig_

  **Reason:**

  The server lists the properties that will be used to connect to the APIML Discovery server to help with troubleshooting.

  **Action:**

  No action required.



### ZWED0036I

  Plugin _pluginId_ will serve static files from _filePath_

  **Reason:**

  The plugin _pluginId_ was loaded which has a webContent section defined in its pluginDefinition.json file. The server will serve the read-only content from the _filePath_

  **Action:**

  No action required.



### ZWED0037I

  _pluginId_: found proxied service _serviceName_

  **Reason:**

  When the server was loading the plugin _pluginId_, it found that the plugin contains a service named _serviceName_ of type "service".

  **Action:**

  No action required.



### ZWED0038I

  _pluginId_: importing service _sourceServiceName_ from _sourcePluginId_ as _serviceName_

  **Reason:**

  When the server was loading the plugin _pluginId_, it found that the plugin contains a service named _serviceName_ of type "import". It then resolved the import to the service _sourceServiceName_ from plugin _sourcePluginId_.

  **Action:**

  No action required.



### ZWED0039I

  _pluginId_: found router _serviceName_

  **Reason:**

  When the server was loading the plugin _pluginId_, it found that the plugin contains a service named _serviceName_ of type "router".

  **Action:**

  No action required.



### ZWED0040I

  _pluginId_: found legacy node service _serviceName_

  **Reason:**

  When the server was loading the plugin _pluginId_, it found that the plugin contains a service named _serviceName_ of type "nodeService".

  **Action:**

  This type of service is deprecated and may not work on a future version of Zowe, so you should consider getting an upgraded version of the plugin that instead uses a service of an undeprecated type.



### ZWED0041I

  _pluginId_: found external service _serviceName_

  **Reason:**

  When the server was loading the plugin _pluginId_, it found that the plugin contains a service named _serviceName_ of type "external".

  **Action:**

  No action required.



### ZWED0042I

  _pluginId_: found _serviceType_ service _serviceName_

  **Reason:**

  When the server was loading the plugin _pluginId_, it found that the plugin contains a service named _serviceName_ of type "_serviceType_".

  **Action:**

  No action required.



### ZWED0043I

  Plugin _pluginId_ is not requested skipping without error

  **Reason:**

  When the server was loading the "nodeAuthentication" type plugin _pluginId_, it determined that the plugin only handles security actions for a category that was not requested by the server configuration or any plugins. Because nothing needed it, the plugin was skipped instead of loaded.

  **Action:**

  No action required unless you need the plugin to be used. If you need the plugin, you can set an authentication category it implements as the default by configuration property `components.app-server.dataserviceAuthentication.defaultAuthentication`, or within a plugin's security configuration.



### ZWED0044I

  Processing plugin reference _filePath_...

  **Reason:**

  The server is checking if the plugin definition file _filePath_ exists and will attempt to load it.

  **Action:**

  No action required.



### ZWED0045I

  Reading plugins dir _pluginsDirectory_

  **Reason:**

  The server is scanning the directory _pluginsDirectory_ as specified by the server configuration property `components.app-server.pluginsDir` so that it can locate each plugin in the instance.

  **Action:**

  No action required.



### ZWED0046I

  Adding dynamic plugin %s

  **Reason:**

  The server has added the plugin with _plugin identifier_ to its bootstrapped list of plugins. It also emits a `pluginAdded` event.

  **Action:**

  No action required. If the user desires, they may check their list of plugins on the Desktop to see if the plugin was added successfully. 



### ZWED0047I

  [Path= %s stdout]: %s

  **Reason:**

  A child process from _path_ has received data of _data_ - usually done interally by ProcessManager.

  **Action:**

  No action required.



### ZWED0048I

  [Path= %s] exited, code: %s

  **Reason:**

  A process from _path_ has exited with a return _code_.

  **Action:**

  No action required.



### ZWED0049I

  Stopping managers

  **Reason:**

  Begins ending all child processes.

  **Action:**

  No action required.



### ZWED0050I

  Server shutting down, received signal=%s

  **Reason:**

  Tells server to shutdown after receiving _signal_ by ending all child processes and then performing cleanup.

  **Action:**

  No action required.



### ZWED0052I

  Deleting plugin due to request, id %s, path %s

  **Reason:**

  Notifies that the server is removing a plugin with _plugin identifier_ located in _path_.

  **Action:**

  No action required. Optionally, you could verify the deletion of the plugin in the Desktop, doing a GET call to the list of the plugins, or by viewing the status code of the REST request if plugin was deleted by network request.



### ZWED0053I

  Setting up %s proxy (%s) to destination=%s

  **Reason:**

  Making an external proxy of _type_ (HTTP or HTTPS) for _plugin identifier_:_service name_ at the _destination_.

  **Action:**

  No action required.



### ZWED0054I

  Installing root service at %s

  **Reason:**

  Attempting to install new root service at _url_.

  **Action:**

  No action required.



### ZWED0055I

  Installing root service proxy at %s

  **Reason:**

  Attempting to install new root service proxy at _url_.

  **Action:**

  No action required.



### ZWED0056I

  %s: installing websocket service

  **Reason:**

  Attempting to install new websocket service for _plugin identifier_.

  **Action:**

  No action required.



### ZWED0059I

  Found connection info for %s=%s

  **Reason:**

  Connection info for _plugin identifier_:_service_ was found as _info_.

  **Action:**

  No action required.



### ZWED0062I

  %s: installing router at %s

  **Reason:**

  For _plugin identifier_, the server is installing new router at _url_.

  **Action:**

  No action required.



### ZWED0064I

  %s: installing import %s:%s at %s

  **Reason:**

  For _plugin identifier_, the server is instaling import from _sourcePlugin_ with _name_ at _url_.

  **Action:**

  No action required.



### ZWED0066I

  %s: serving static files at %s

  **Reason:**

  For _plugin identifier_, the server is serving static files and assets at _url_.

  **Action:**

  No action required.



### ZWED0067I

  %s: serving library files at %s

  **Reason:**

  For _plugin identifier_, the server is serving libary files at _url_.

  **Action:**

  No action required.



### ZWED0070I

  User=_user_ (_pluginId_): Session _authCapability_ successful. Plugin response: _httpResponse_

  **Reason:**

  An authentication plugin has performed a successful operation and received a valid HTTP response.

  **Action:**

  No action required.



### ZWED0072I

  Using Certificate: _stringArray_

  **Reason:**

  The app server has successfully loaded a certificate and added it to the certificates array.

  **Action:**

  No action required.



### ZWED0086I

  _tomcatPID_ closed, code=_returnCode_

  **Reason:**

  A running tomcat process with PID _tomcatPID_ was cloesd.

  **Action:**

  Refer to return code.



### ZWED0087I

  _tomcatPID_ exited, code=_returnCode_

  **Reason:**

  A running tomcat process with PID _tomcatPID_ was exited.

  **Action:**

  Refer to return code.



### ZWED0090I

  _tomcatPID_ closed, code=_returnCode_

  **Reason:**

  A running tomcat process with PID _tomcatPID_ was cloesd.

  **Action:**

  Refer to return code.



### ZWED0091I
 
  _tomcatPID_ exited, code=_returnCode_

  **Reason:**

  A running tomcat process with PID _tomcatPID_ was exited.

  **Action:**

  Refer to return code.



### ZWED0092I

  Tomcat Manager ID=*_manager id_* stopping

  **Reason:**

  It specifies that Apache Tomcat Host Manager is stopping *_manager id_*.

  **Action:**

  No action required.



### ZWED0093I

  Tomcat Manager ID=*_manager id_* cleanup successful

  **Reason:**

  It specifies that Apache Tomcat Host Manager successfully cleaned up the *_manager id_*.

  **Action:**

  No action required.



### ZWED0094I

  Extracted war to *_destination path_*

  **Reason:**

  It specifies that it extracted the WAR directory successfully to the *_destination path_*.

  **Action:**

  No action required.



### ZWED0095I

  Making junction from *_extracted war_* to *_appbase_*

  **Reason:**

  A junction link is a sort of subset or a variation of a symbolic link.
  It creates a junction link between *_extracted war_* directory to *_appbase_* directory.

  **Action:**

  No action required.



### ZWED0096I

  Making symlink from *_extracted war_* to *_appbase_*

  **Reason:**

  It creates a symbolic link  between *_extracted war_* directory to *_appbase_* directory.


  **Action:**

  No action required.



### ZWED0109I

  Registering App (ID=*_plugin identifier_*) with App Server

  **Reason:**
  The registration attempt from ZWED0109I has succeeded.
  Before the server starts it registers all the *_plugin identifier_* with the App server and installs them.

  **Action:**

  No action required.


### ZWED0110I

  App *_plugin identifier_* installed to *_appdir_* and registered with App Server

  **Reason:**

  App *_plugin identifier_* installed to *_appdir_*  and registered with App Server successfully.

  **Action:**

  No action required.



### ZWED0111I

  Authentication plugin *plugin identifier* added to category *authentication category*

  **Reason:**

  Auth plugin *plugin identifier* is being registered as a part of *authentication category*.

  **Action:**

  No action required.



### ZWED0112I

  Auth enabled=false. Auth passthrough.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0114I

  Adding plugin remotely 

  **Reason:**

  A new plugin is detected and is being added.

  **Action:**

  No action required.



### ZWED0115I

  Skip child processes spawning on worker *_workerId_* *_childProcessPath_*

  **Reason:**
 The process listed as childProcessPath was not spawned under the specified worker
  because it was listed as being a process that should only be started once. 
  Some child processes should be started per-worker for redundancy, 
  while others that need exclusive access to a resource such as
  a network port are specified with the property *childProcess.once*,
  and are skipped on all but one worker. The other workers print 
  this message to indicate this behavior.

  **Action:**

  No action required.



### ZWED0116I

  The LOCATIONS are *_serverModuleLocation_* and *_clientModuleLocation_*

  **Reason:**

  The server has set the location *_serverModuleLocation_* and *_clientModuleLocation_*.

  **Action:**

  No action required.



### ZWED0117I

  The fileLocation is *_lib_*

  **Reason:**

  Location of files will be in *_lib_* directory.

  **Action:**

  No action required.



### ZWED0118I

  The NODE_PATH is *NODE_PATH* from environment variable.

  **Reason:**
  The server recognizes the location of Node as *NODE_PATH* from environment variable.

  **Action:**

  No action required.



### ZWED0119I

  Plugin *_plugin identifier_* will serve library data from directory *_dir location_*

  **Reason:**

   For plugins with type 'library', plugin *_plugin identifier_* has been registered and will be serving library data from *_dir location_*

  **Action:**

  No action required.



### ZWED0120I

  Auth plugin *_plugin identifier_*: loading auth handler module *_app server_*

  **Reason:**
  An auth category was requested as the default in the server configuration, or requested by a particular plugin, and because the auth plugin pluginId handles this category, it is being loaded by the app-server.

  **Action:**

  No action required.



### ZWED0124I

  Plugin *_plugin identifier_* at path=*_plugin location_* loaded.

  **Reason:**
  All the *_plugin identifier_* will be loaded at plugins directory at *path*. Plugins will be available in *_plugin location_*.

  **Action:**

  No action required.



### ZWED0125I

  Plugin *_plugin identifier_* not loaded

  **Reason:**
  A plugin object was not returned in the *makePlugin()* call of the app-server, and therefore the app-server did not load this plugin. The plugin will not be available in the server.

  **Action:**

  Check the log for references to *pluginId* to see other messages that indicate the cause



### ZWED0129I

  (*HTTP or HTTPS*) Listening on *ip address:port*

  **Reason:**
  *type* (HTTP or HTTPS) Listening on ip address:port.
  

  **Action:**

  No action required.



### ZWED0130I

  (*HTTP or HTTPS*) About to start listening on *app-server port*

  **Reason:**
  About to start listening on *app-server port*.

  **Action:**

  No action required.



### ZWED0154I

  Following link: _dependency_: _dependency importer_

  **Reason:**

  Following the link formed by the _dependency_ and the _dependency importer_ in the graph.

  **Action:**

  No action required.



### ZWED0158I

  *** pluginsSorted: 

  **Reason:**

  The graph with the sorted plugins.

  **Action:**

  No action required.



### ZWED0159I

  *** rejects: 

  **Reason:**

  Removing the plugins with the broken dependencies from the graph.

  **Action:**

  No action required.



### ZWED0160I

  Dep.valid: 

  **Reason:**

  Checking if the dependency is valid.

  **Action:**

  No action required.



### ZWED0205I

  User=_user_ (_pluginId_): User logout

  **Reason:**

  This message prints when the _user_ logs out of the Zowe Desktop. Logout is being handled by the _pluginId_ plugin.

  **Action:**

  If logout was intentional, message can be safely ignored. If logout was unintentional, keep in mind the Desktop logs out after inactivity. Incorrect logout behavior can be troubleshooted with
  the authentication plugin.



### ZWED0211I

  The number of processors is: _count_

  **Reason:**

  Lists the _count_ of CPU cores on the system hosting the App server.

  **Action:**

  No action required.



### ZWED0212I

  Environmental variable ZLUX_MIN_WORKERS was not a valid number therefore _count_ will be used as the minimum workers

  **Reason:**

  ZLUX_MIN_WORKERS environment variable is not valid, so the minimum number of workers as part of the cluster will be _count_

  **Action:**

  By default, the App server runs in a cluster. You can specify minimum number of cluster workers 



### ZWED0213I

  Environmental variable ZLUX_MAX_WORKERS was not a valid number therefore %s will be used as the maximum workers

  **Reason:**

  ZLUX_MAX_WORKERS environment variable is not valid, so the maximum number of workers as part of the cluster will be _count_

  **Action:**

  By default, the App server runs in a cluster. You can specify maximum number of cluster workers 



### ZWED0214I

  Read _directory_: found plugin id = _identifier_, type = _type_

  **Reason:**

  Reading in _directory_, found a plugin with _identifier_ of _type_

  **Action:**

  No action required.



### ZWED0287I

  JarMgr with id=_id_ invoked to startup with config=_object_

  **Reason:**

  JarManager _id_ has been started with the configuration _object_

  **Action:**

  No action required. 



### ZWED0290I

  Plugin (_pluginId_) loaded. Version: _pluginVersion_. Successful: _overallSuccess_% (_pluginsLoaded_/_pluginsTotal_) Attempted: _pluginsAttempted_% (_attemptedCount_/_pluginsTotal_)

  **Reason:**

  Plugin with _pluginId_ loaded, with version _pluginVersion_. The server attempted to load a total of _pluginsTotal_ with _pluginsLoaded_ plugins already successfully loaded.

  **Action:**

  No action Required.



### ZWED0292I

  Plugin _identifier_ loaded. Version: _pluginVersion_.

  **Reason:**

  Plugin _identifier_ loaded successfully and the plugin version for the same is _pluginVersion_.

  **Action:**

  No action Required.



### ZWED0294I

  Successfully loaded _recognizers length_ recognizers for _appId_ into config

  **Reason:**

  Successfully loaded _recognizers length_ for _appId_ into config at path workspace/app-server/ZLUX/pluginStorage/org.zowe.zlux.ng2desktop/.

  **Action:**

  No action Required.



### ZWED0295I

  Successfully loaded _actions length_ actions for _appId_ into config

  **Reason:**

  Successfully loaded _actions length_ for _appId_  into config at path workspace/app-server/ZLUX/pluginStorage/org.zowe.zlux.ng2desktop/.

  **Action:**

  No action required.



### ZWED0299I

  Loading remote iframe app _plugin_identifier_ located at _remoteUrl_.

  **Reason:**

  Loading remote iframe app _plugin_identifier_ which is located at _remoteUrl_.

  **Action:**

  No action Required.



### ZWED0300I

  APIML Storage configured

  **Reason:**

  caching service/APML storage is configured

  **Action:**

  No action Required.



### ZWED0301I

  Found _pre-existing recognizers_/_pre-existing actions_ in config for _appID_.

  **Reason:**

  Get _pre-existing recognizers_/_pre-existing actions_ in config, if any for _appID_.

  **Action:**

  No action Required.



### ZWED0302I

  HA mode is enabled/disabled.

  **Reason:**

  High Availability mode is enabled/disabled.

  **Action:**

  No action Required.



### ZWED0004W":"Tomcat for ID=%s not starting, no services succeeded loading

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0006W":"RBAC is disabled in the configuration. All authenticated users will have access to all services. Enable RBAC in the configuration to control users' access to individual services.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0007W":"Dataservice authentication definition is not present in server configuration file, or malformed.\nCorrect the configuration file before restarting the server.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0008W":"Error loading auth plugin %s: 

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0012W":"Implementation defaults for %s was not an object, or did not contain a plugins attribute. Other criteria for selecting authentication implementations is not yet implemented.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0013W
  
  Initializing was not complete for worker _workerId_

  **Reason:**

  A cluster mode worker exited before it fully initialized. Another worker will be started soon to attempt again.

  **Action:**

  If this continues to happen, you should contact support.



### ZWED0014W

  Error adding plugin: _error_

  **Reason:**

  A dynamic plugin, or a plugin added post-startup was unable to be added to the server. The server continues to run, but this plugin was not added.

  **Action:**

  Check the _error_ and lines above in the log to determine the reason for the failure.



### ZWED0015W

  Error reloading workers: _error_

  **Reason:**

  The server was attempting to reload all workers, probably to complete a configuration change. An error occurred instead so some of the workers may not have been reloaded and could contain the old configuration.

  **Action:**

  If you were doing a configuration change, you should try again or restart the server if the error persists. You can check the _error_ to see the reason for the issue.



### ZWED0016W

  Error setting override: _error_

  **Reason:**

  The server attempted to load a new configuration, but failed when writing the configuration update to a file.

  **Action:**

  Check the _error_ to see the possible cause for the failure. Retry this operation but if thie issue persists you should restart the server.



### ZWED0017W

  Duplicate plugin identifier _pluginId_ found.

  **Reason:**

  A plugin was trying to be added to the server but it wasn't possible because another plugin with the same ID already was running within the server.

  **Action:**

  Plugin upgrades cannot be done through the add plugin operation. Instead, the server should be stopped to perform this upgrade.



### ZWED0018W

  Could not initialize Java manager. Java services from Apps will not be able to load _stackTrace_

  **Reason:**

  The Java manager is used to run Java services bundled into plugins. It could not start, so the server cannot load any Java services. Plugins that have Java services may fail to load, but the server will still run with the remaining plugins.

  **Action:**

  Check the _stackTrace_ output to determine the reason the Java manager could not run.



### ZWED0019W

  Exception when setting log level for ID=_logId_. E: _stackTrace_

  **Reason:**

  Log levels listed in the configuration file are set during startup. For some reason, the level for _logId_ could not be set, but the server will continue to run with that logger set to default verbosity.

  **Action:**

  Check the _stackTrace_ to determine the reason why _logId_ could not be set. Potentially the log id was an invalid name, or the log level was an invalid number.



### ZWED0020W

  Could not spawn _childProcess_: _errorMessage_

  **Reason:**

  The child process that was requested to run when the server started up could not run for some reason. _childProcess_ lists the parameters requested to start the process.

  **Action:**

  Check the _errorMessage_ to determine the reason of failure, and also verify that the information in _childProcess_ is valid.



### ZWED0021W

  Missing one or more parameters required to run.
  The server requires either HTTP or HTTPS. HTTP Port given: _httpPort_. HTTPS Port given: _httpsPort_
  HTTPS requires either a PFX file or Key & Certificate files.
  Given PFX: _pfx_
  Given Key: _key_
  Given Certificate: _certificate_
  config was: _configuration_
  All but host server and config file parameters should be defined within the config file in JSON format.

  **Reason:**

  The server could not start because the configuration was not valid. When the server's HTTPS section is specified, _httpsPort_ must be a valid TCP port number and you must have a key and certificate. If the HTTPS section is not specified, the HTTP section must be specified and _httpPort_ must be a valid TCP port number.

  **Action:**

  Review the _configuration_ to see if there are corrections to be made before restarting the server.



### ZWED0027W

  Plugin (_pluginId_) loading failed. Version: _versionNumber_. Message: "_errorMessage_" Successful: _percentSuccess_% (_pluginsLoaded_/_pluginsTotal_) Attempted: _percentAttempted_% (_pluginsAttempted_/_pluginsTotal_)

  **Reason:**

  An error prevented the plugin _pluginId_ from loading. Other plugins will still be attempted to be loaded, until _percentAttempted_ reaches 100%. The server will run if all auth plugins needed have successfully loaded.

  **Action:**

  Review _errorMessage_ to see if there is something you can do to fix the error. You may need to contact the plugin developer to find a solution. If you do not need this plugin, it is OK to continue.



### ZWED0028W

  Encountered parse exception while reading _filename_

  **Reason:**

  The server cannot read the JSON file _filename_. This might be a configuration file or a plugin file. In either case, the server may not be able to run or may run with less plugins than desired.

  **Action:**

  Review the file listed in _filename_. Check if it is in the right encoding for your platform. Tagging the file according to its encoding is recommended for z/OS. Also check if the file is valid JSON. The file may have a missing or extra comma, or missing quotes or brackets.



### ZWED0029W

  Authentication plugin was found which was not requested in the server configuration file's dataserviceAuthentication object. Skipping load of this plugin

  **Reason:**

  The server will attempt to load every plugin given to it in the plugins directory. Authentication plugins are only needed if a plugin requests them or it implements the default authentication category. Because the server did not find a user of this plugin, it was not loaded.

  **Action:**

  No action is needed unless you believe that this plugin needed to be loaded. If so, check for plugins that require it to determine if there is missing or incorrect auth configuration.



### ZWED0030W

  _location_ points to an invalid plugin definition, skipping

  **Reason:**

  The file specified at _location_ is not valid according to the [pluginDefinition schema](https://github.com/zowe/zlux-app-server/blob/v2.x/staging/schemas/plugindefinition-schema.json), so it cannot be loaded. The server will still start without the plugin if possible.

  **Action:**

  Correct the pluginDefinition.json file of the plugin to load the plugin on next server restart, or remove the plugin if not needed.



### ZWED0032W

  Failed to load _filename_

  **Reason:**

  The plugin definition located at _filename_ could not be read, so the plugin that referred to this cannot be loaded. The server may still run without the plugin if possible.

  **Action:**

  Check if the file exists and is readable to the user that is running the server. Also check that the file is in the right encoding for the OS the app-server is running on. On z/OS, it is recommended to have the file encoding tagged.



### ZWED0033W

  Could not initialize plugin _pluginId_: _error_

  **Reason:**

  The plugin _pluginId_ could not be loaded. This may be due to unsatisfied imports, where an import requested a version of something that was not available, or an entire plugin was not available.  The server will still attempt to load if this plugin was not needed.

  **Action:**

  Check the _error_ message to determine the cause of error for correction.



### ZWED0034W

  Skipping install of plugin due to existing plugin with same id=_identifier_

  **Reason:**

  The plugin could not be loaded due to a plugin that is already loaded containing the same _identifier_ ID. Plugin IDs are unique, so the first plugin with that ID that is seen is the one that is loaded.

  **Action:**

  Check to see if you have 2 extensions that contain plugins with the same ID. Alternatively, an extension may have updated to have its name change without its ID changing, causing a duplicate to appear. You may need to clean up your extensions or the contents of the pluginsDir directory.



### ZWED0035W

  Error thrown when installing plugin=_identifier_: _error_ 

  **Reason:**

  The plugin with id _identifier_ could not be added to the server because of an error that occurred. The server will still attempt to run without the plugin if possible.

  **Action:**

  Check the _error_ message to see what the reason for the error could be, and correct it before restarting the server in order to try loading the plugin again.



### ZWED0036W

  Uncaught exception found. Error: _stackTrace_

  **Reason:**

  The server encountered an unexpected error. If cluster mode is running, this will result in the worker crashing but the cluster starting a new worker to replace it. The client that initiated the request will need to retry the operation though other clients should not experience disruption.
  
  If cluster mode is not running, the process will end but the launcher will restart it. In this case, state may be lost unless the caching service was also being used.

  **Action:**

  The _stackTrace_ should be sent to developers so that the issue can be fixed.



### ZWED0037W

  Ending server process due to uncaught exception.

  **Reason:**

  The server is stopping after encountering ZWED00036W.

  **Action:**

  The information within ZWED0036W should be sent to developers so that the issue can be fixed.



### ZWED0038W":"[Path=%s stderr]: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0039W":"Exception at server cleanup function:\n%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0040W":"Callservice: Service call to %s:%s%s failed. 

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0041W":"%s Exception caught. Message=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0042W":"Stack trace follows\n%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0043W":"%s proxyWS error:%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0044W":"%s WS error:%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0045W":"Failed to reach the auth services host for address %s:%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0046W":"The auth services host system was not specified at startup, and defaulted to 127.0.0.1.\nVerify that the auth services server is running, or specify at startup the remote host and port to connect to. See documentation for details.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0047W":"Swagger file for service (%s:%s) not found

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0048W":"Invalid Swagger from file for service (%s:%s)

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0049W":"%s %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0050W":"Could not read swagger doc folder %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0051W":"Failed to parse translation file %s. File skipped

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0052W":"Error when reading file=%s. Error=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0053W":"Event handler failed: 

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0054W":"Skipping invalid listener address=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0055W":"Skipping invalid listener address=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0056W":"Couldn't process %s as IP

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0057W":"Loopback calls: localhost equivalent address not found in list %s. Using first address (%s); Verify firewall will allow this.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0058W":"Log location for logger '%s:%s' is undefined

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0059W":"Failed to add the plugin: 

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0061W":"Callservice: Service call failed.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0062W":"%s Exception caught. Message=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0063W":"Stack trace follows\n%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0064W":"%s: invalid method %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0065W":"Library %s is missing libraryVersion attribute for hosting files. Skipping file hosting.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0066W":"%s: getCapabilities() is not a function

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0068W":"Failed to set proxy authorizations. Error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0069W":"Returning null for cipher array because input had non-string: 

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0070W":"Error when reading PFX. Server cannot continue. Error=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0071W":"Unexpected error on server %s:%s. E=%s. Stack trace follows.\n%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0072W":"Could not stop manager, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0073W":"No server returned for group=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0074W":"Unknown default behavior=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0075W":"Services in plugin=%s war grouping skipped. Plugin missing or already grouped

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0076W":"Skipping invalid plugin group=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0077W":"Could not extract war for service=%s, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0078W":"Could not access files to determine status for service=%s, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0079W":"Cannot add servlet for service=%s, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0080W":"Cannot add servlet for service=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0081W":"Could not start tomcat, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0082W":"%s stderr=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0083W":"Tomcat could not start. Closing. code=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0084W":"Tomcat could not start. Exiting. code=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0085W":"%s Error when stopping, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0086W":"Could not stop tomcat, error=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0087W":"%s stderr=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0146W

  Could not stat destination or temp folder _path_. Error=_ErrorMsg_

  **Reason:**

  Server was unable to use 'stat' command on folder _path_ and threw _ErrorMsg_.

  **Action:**

  No action is needed usually, but an _ErrorMsg_ may be needed for debugging.



### ZWED0148W

  App extracted but not registered to App Server due to write fail. Error=_errorMessage_

  **Reason:**

  App extracted successfully but not registered to App Server due to write fail. Error=_errorMessage_.

  **Action:**

  Go through the _errorMessage_ for context on what to debug.



### ZWED0149W

  Could not find pluginDefinition.json file in App (dir=_AppDir_). Error=_ErrorMsg_

  **Reason:**

  Throws _ErrorMsg_ when its not able to find the pluginDefinition.json file in _AppDir_ location.

  **Action:**

  Check if pluginDefinition.json exists in _AppDir_.



### ZWED0150W

   _identifier_ library path _location_ does not exist.

  **Reason:**

  Server throws warning when library plugin _identifier_ does not exist at path _location_.

  **Action:**

  Check if the library plugin exists in the path _location_.



### ZWED0151W

  unhandledRejection _error_

  **Reason:**

  When process experiences an unhandledRejection.

  **Action:**

  No action is needed usually, but an error message may be needed for debugging.



### ZWED0152W

  Error at call sessionStore. _APIMethodname_: _Error Object_

  **Reason:**

  There is a problem calling a sessionStore _APIMethodname_.

  **Action:**

  No action is needed usually, but an error message may be needed for debugging.



### ZWED0153W

  WARNING: CLI Argument missing name or has unsupported type=_type_

  **Reason:**

  The server throws a warning when the CLI argument is missing a name, or has an unsupported type (supported types: 1 - _flag_, 2 - _value_, 3 - _json_).

  **Action:**

  Check any missing argument or unsupported argument.



### ZWED0154W

  WARNING: Unrecognized command: _args_

  **Reason:**

  Throws warning when _args_ is unrecognized.

  **Action:**

  Check the command once again or check if the specified command is interpreted as intended.



### ZWED0155W

   _ErrorMsg_

  **Reason:**

  Server throws 500 code with _ErrorMsg_.

  **Action:**

  Go through the _ErrorMsg_ for context on what to debug.



### ZWED0156W

  1 function initLoggerMessages - ERROR - _Error_

  **Reason:**

  Attempt to get log message for a language a user may have specified, has failed with _Error_.

  **Action:**

  Go through the _Error_ for details on what to debug.



### ZWED0157W

  2 function initLoggerMessages - ERROR - _Error_.

  **Reason:**

  Attempt to get log message for English has failed with _Error_.

  **Action:**

  Go through the _Error_ for details on what to debug.



### ZWED0158W

   _ErrorMsg_

  **Reason:**

  Server throws 500 code with _ErrorMsg_.

  **Action:**

  Go through the _ErrorMsg_ for details on what to debug.



### ZWED0159W

  Plugin (_PluginIdentifier_) loading failed. Message: "_errorMessage_" Successful: _pluginsLoaded_% (_pluginsLoaded_/_eventCount_) Attempted: _pluginCount_% (_pluginCount_/_eventCount_)

  **Reason:**

  Plugin with _pluginId_ loaded failed with _errorMessage_. The server attempted to load a total of _pluginCount_ with _pluginsLoaded_ plugins already successfully loaded.

  **Action:**

  Review _errorMessage_ to see if there is something you can do to fix the error. You may need to contact the plugin developer to find a solution. If you do not need this plugin, it is OK to continue.



### ZWED0166W

  Error updating the storage: _Error_

  **Reason:**

  Throws warning _Error_ when it faced error while updating the storage.

  **Action:**

  Contact support if _Error_ is not clear.



### ZWED0167W

  Error adding to the storage: _errorMessage_

  **Reason:**

  Throws _errorMessage_ while adding to the storage.

  **Action:**

  If app server service is interrupted, go through the _errorMessage_ for details on what to debug or contact support if _errorMessage_ is not clear.
  


### ZWED0168W

  Unable to retrieve storage value from cluster _Error_

  **Reason:**

  Throws warning _Error_ when it is unable to retrieve storage value from cluster.

  **Action:**

  By default, the timeout for cluster method calls is 1000ms which should cause no issues. If service is interrupted, contact support and provide _Error_.



### ZWED0169W

  Error deleting the storage with id: _deleteStorageByKey_  _Error_

  **Reason:**

  when server tries deleting storage by key _deleteStorageByKey_.

  **Action:**

  Contact support if _Error_ is not clear.



### ZWED0170W

  Plugin (_PluginIdentifier_) loading failed. Version: _PluginVersion_. Message: "_Error_"

  **Reason:**

  Plugin _PluginIdentifier_ with version _PluginVersion_ has failed to load with an _Error_. 

  **Action:**

  Review _Error_ to see if there is something you can do to fix the error. You may need to contact the plugin developer to find a solution. If you do not need this plugin, it is OK to continue.



### ZWED0171W

  Rejected undefined referrer for url=_originalUrl_, ip=_ip_

  **Reason:**

  Throws 403 Forbidden when App server fails to honor a network request due to failed referrer check. 

  **Action:**

  Double check the address. A possible reason for a 403 error is a misstyped _originalUrl_ or _ip_ or because loopback routing is not configured in the App server.



### ZWED0172W":"Rejected bad referrer=%s for url=%s, ip=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0173W":"Unable to decode P12 certificate (different password than keystore?). Attempting to use empty string as password. Decode error: %s.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0174W":"%s could not verify (%s) as a supported platform to install (%s). Proceeding anyway...

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0175W":"%s could not verify (%s) as a supported architecture to install (%s). Proceeding anyway...

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0176W":"Failed to load client cert/key pair for Caching Service

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0177W":"Unable to load %s for '%s' into config

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0178W":"Skipping authentication plugin %s because it's not HA compatible

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0179W":"Unable to retrieve the list of certificate authorities from the keyring=%s owner=%s Error: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0001E":"Error: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0002E":"Could not stop language manager for types=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0003E":"Loopback configuration not valid,%s\nLoopback calls will fail!

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0004E":"Could not listen on address %s:%s. It is already in use by another process.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0005E":"Could not listen on address %s:%s. Invalid IP for this system.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0006E":"Usage: --inputApp | -i INPUTAPP --pluginsDir | -p PLUGINSDIR --zluxConfig | -c ZLUXCONFIGPATH [--verbose | -v]

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0007E":"%s invalid version %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0008E":"%s: invalid version range %s: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0009E":"${this.localName}: invalid version range %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0010E":"No file name for data service

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0011E":"Plugin %s has web content but no web directory under %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0012E":"%s::%s Required local service missing: serviceName

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0013E":"%s::%s Could not find a version to satisfy local dependency %s@%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0014E":"Plugin %s invalid

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0015E":"%s: No plugin directory found at %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0016E":"%s: No pluginDefinition.json found at %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0017E":"Identifier doesn't match one found in pluginDefinition: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0018E":"No plugin type found, skipping

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0019E":"Plugin already registered

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0020E":"%s: pluginType %s is unknown

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0021E":"%s is missing

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0022E":"Module not found %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0023E":"Method not implemented %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0024E":"Object not exported %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0025E":".authenticate() missing

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0026E":"Circular dependency: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0027E":"Circular dependency: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0028E":"Config invalid

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0029E":"JavaManager given port range beyond limits

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0030E":"JavaManager not given any ports with which to run servers

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0031E":"Unknown java war grouping default=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0032E":"Could not find port to use for configuration, at config position=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0033E":"Could not find runtime to satisfy group: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0034E":"Unknown java app server type=%s specified in config. Cannot continue with java loading

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0035E":"Java runtimes not specified, and no JAVA_HOME set

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0036E":"Java app server not defined in config

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0037E":"JavaManager not given either war or jar configuration options, nothing to do

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0038E":"JavaManager given port range beyond limits

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0039E":"JavaManager not given any ports with which to run servers

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0040E":"Unknown java war grouping default=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0041E":"Could not find port to use for configuration, at config position=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0042E":"Could not find runtime to satisfy group: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0043E":"Unknown java app server type=%s specified in config. Cannot continue with java loading

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0044E":"Java runtimes not specified, and no JAVA_HOME set

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0045E":"Java app server not defined in config

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0046E":"JavaManager not given either war or jar configuration options, nothing to do

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0047E":"Proxy (%s:%s) setup failed.\nHost & Port for proxy destination are required but were missing.\nFor information on how to configure a proxy service, see the Zowe wiki on dataservices (https://github.com/zowe/zlux/wiki/ZLUX-Dataservices)

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0049E":"Can't specify error metadata

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0050E":"Root service %s not found

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0051E":"Could not resolve service URL. Plugin=%s, service=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0052E":"Could not load service %s:%s due to unknown type=%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0053E":"Import %s:%s can't be satisfied

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0111E":"SEVERE: Exception occurred trying to generate object from input:%s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0112E":"The server found no plugin implementing the specified default authentication type of %s.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0113E":"The server found no authentication types. Verify that the server configuration file defines server authentication.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0114E":"The server found no plugin implementing the specified default authentication type of %s.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0115E":"Unable to retrieve storage object from cluster. This is probably due to a timeout.\nYou may change the default of '%s' ms by setting 'node.cluster.storageTimeout' within the config. %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0145E":"Cannot load SAF keyring content outside of z/OS

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0146E":"SAF keyring data had no attribute "%s". Attributes=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0147E":"SAF keyring data was not found for "%s"

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0148E":"Exception thrown when reading SAF keyring, e=

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0149E":"SAF keyring reference missing userId "%s", keyringName "%s", or label "%s"

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0150E":"Cannot load SAF keyring due to missing keyring_js library

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0151E":"Env var %s not found

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0152E":"Unable to locate server config instance location and INSTANCE_DIR environment variable does not exist.

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0153E":"(%s) is not a supported platform for %s. Skipping (%s)... Supported: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0154E":"(%s) is not a supported architecture for %s. Skipping (%s)... Supported: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0155E":"(%s) is not a supported endpoint for %s. Skipping (%s)... Supported: %s

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0156E":"Could not register default plugins into app-server

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0157E":"Could not register default plugin %s into app-server

  **Reason:**

  TODO

  **Action:**

  TODO



### ZWED0158E":"Could not listen on address %s:%s. Insufficient permissions to perform port bind."
