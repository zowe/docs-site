# Glossary

**plug-in** 
   The fundamental element of extensibility of the Zowe Application Framework is a plug-in. << user-guide\mvd-configdataservice.md
   A plug-in is the unit of extensibility for the server, where an application is a plug-in of the type Application, the most common and visible plug-in type. << user-guide\mvd-zluxappfilesystem.md
   Application plug-ins are plug-ins of the type "application", and therefore the Zowe Desktop operates around a collection of plug-ins. << user-guide\mvd-desktopandwindowmgt.md

**application plug-in** 
   For example, in the Workflow application plug-in under `\zlux-workflow\src\app\app\zosmf-server-config.component.ts` is a `ZosmfServerConfigComponent` class with the pop-up manager service variable. << user-guide\mvd-errorreportingui.md
   Application plug-ins are a subcategory of the unit of extensibility in the server called a *plug-in*. << user-guide\mvd-zluxplugindefandstruct.md
   An application plug-in is a plug-in of the type "Application", the most common and visible type of plug-in). << user-guide\mvd-zluxplugindefandstruct.md

**data set**
   Submit data sets that contain JCL to Job Entry Subsystem (JES). << user-guide\usingzlux.md
   Create partitioned data sets (PDS) with members, physical sequential data sets (PS), and other types of data sets from templates. << user-guide\cli-usingcli.md
   You can specify options to customize the data sets you create. << user-guide\cli-usingcli.md

**explorer server** 
   

**Window Manager** 
   Application management Application plug-ins within a Window Manager are created and acted upon in part by an Application Manager. << user-guide\mvd-desktopandwindowmgt.md
   The Application Manager is not normally directly accessible by application plug-ins, instead used by the Window Manager. << user-guide\mvd-desktopandwindowmgt.md
   Application management Applications within a Window Manager are created and acted upon in part by an Application Manager. << user-guide\mvd-mvdandwindowmgt.md

**Zowe runtime**
   You install API Mediation Layer when you install the Zowe runtime on z/OS. << user-guide\summaryofchanges.md
   After you obtain the PAX file, verify the PAX file and prepare it to install the Zowe runtime. << user-guide\gettingstarted.md

**environment variable**
   When you set the *ZLUX_NODE_LOG_FILE* or *ZSS_LOG_FILE* environment variables, The Zowe Application Framework will not override the log names, set a timestamp, or delete the logs. << user-guide\mvd-zluxconfiguration.md
   From the command line window, set the `IBM_DB_INSTALLER_URL` environment variable by issuing the following command: << user-guide\cli-db2plugin.md
   Before you build a Zowe Application Framework application plug-in, you must set the UNIX environment variables that support the plug-in environment. << user-guide\mvd-creatingzluxappplugins.md

**Mediation Layer**
   The API Mediation Layer includes an API Catalog that provides an interface to view all discovered microservices, their associated APIs, and Swagger documentation in a user-friendly manner. << user-guide\overview.md
   You install API Mediation Layer when you install the Zowe runtime on z/OS. << user-guide\summaryofchanges.md
   Using API Catalog As an application developer, use the API Catalog to view what services are running in the API Mediation Layer. << user-guide\api-mediation-api-catalog.md

**application instance** 
   any` If present, this variable requests the application instance to initialize with some context, rather than the default view. << user-guide\mvd-mvdandwindowmgt.md
   void - Closes the Window of the application instance. << user-guide\mvd-mvdandwindowmgt.md
   void - Maximizes the Window of the application instance. << user-guide\mvd-mvdandwindowmgt.md

**web content** 
   The web content can be written using any framework, but is included through an iframe tag. << user-guide\mvd-desktopandwindowmgt.md
   When the Window is created, the application plug-in's web content is encapsulated dependent upon its framework type. << user-guide\mvd-desktopandwindowmgt.md
   When the Window is created, the application's web content is encapsulated dependant upon its framework type. << user-guide\mvd-mvdandwindowmgt.md

**Proxy Server** 
   ZSS reads this file directly as a startup argument, while the Zowe Application Framework Proxy Server as defined in the `zlux-proxy-server` repository accepts several parameters, which are intended to be read from a JSON file through an implementer of the server, such as the example in the `zlux-example-server` repository, the `js/zluxServer.js` file. << user-guide\mvd-zluxconfiguration.md
   For convenience, the Zowe Application Framework Proxy Server and ZSS read from a JSON file with a common structure. << user-guide\mvd-zluxconfiguration.md
   ZSS configuration Running ZSS requires a JSON configuration file that is similar or the same as the one used for the Zowe Application Framework Proxy Server. << user-guide\mvd-zluxconfiguration.md

**command group** 
   Zowe CLI contains the following command groups: << user-guide\cli-usingcli.md
   Plug-ins add functionality to the product in the form of new command groups, actions, objects, and options. << user-guide\cli-extending.md
   The tests confirm that the plug-in does not conflict with existing command groups in the base application. << user-guide\cli-installplugins.md

**Application Manager** 
   The Application Manager is not normally directly accessible by application plug-ins, instead used by the Window Manager. << user-guide\mvd-desktopandwindowmgt.md
   The Application Manager is not normally accessible directly by applications, instead used by the Window Manager. << user-guide\mvd-mvdandwindowmgt.md
   Application management Application plug-ins within a Window Manager are created and acted upon in part by an Application Manager. << user-guide\mvd-desktopandwindowmgt.md

**component logger** 
   Objects that are called when a component logger requests a message to be logged. << user-guide\mvd-logutility.md
   An application plug-in's component logger is presented to dataservices or web content as follows. << user-guide\mvd-logutility.md
   Logger IDs Because Zowe application plug-ins have unique identifiers, both dataservices and an application plug-in's web content are provided with a component logger that knows this unique ID such that messages that are logged can be prefixed with the ID. << user-guide\mvd-logutility.md

**experimental command** 
   Enabling and disabling experimental Commands Zowe CLI includes experimental commands, which are currently in development and are not ready for general availability. << user-guide\cli-enabledisablexperimentalcommands.md
   Enable experimental commands To enable the experimental commands, issue the following command: << user-guide\cli-enabledisablexperimentalcommands.md

**Zowe Node Server**
   - _myHost_ is the host on which you installed the Zowe Node Server. << user-guide\install-zos.md
   - *myHost* is the host on which you are running the Zowe Node Server. << user-guide\usingzlux.md

**Viewport Manager** 
   Actions performed against viewports should be performed through the Viewport Manager. << user-guide\mvd-desktopandwindowmgt.md
   The following are functions of the Viewport Manager: << user-guide\mvd-desktopandwindowmgt.md
   Viewport Manager Viewports encapsulate an instance of an application plug-in's web content, but otherwise do not add to the UI (they do not present Chrome as a Window does). << user-guide\mvd-desktopandwindowmgt.md

**application developer**
   Zowe CLI Zowe CLI is a command-line interface that lets application developers interact with the mainframe in a familiar format. << user-guide\overview.md
   Zowe CLI lets application developers use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. << user-guide\overview.md
   Using API Catalog As an application developer, use the API Catalog to view what services are running in the API Mediation Layer. << user-guide\api-mediation-api-catalog.md

**configuration file**
   ZSS configuration Running ZSS requires a JSON configuration file that is similar or the same as the one used for the Zowe Application Framework Proxy Server. << user-guide\mvd-zluxconfiguration.md
   Yet, to separate configuration files from runtime files, the `zlux-example-server` repository copies the contents of this folder into `/deploy/instance/ZLUX/plugins`. << user-guide\mvd-zluxconfiguration.md
   The following attributes are to be defined in the server's JSON configuration file. << user-guide\mvd-zluxconfiguration.md

**third-party plug-in**
   plugins The plugins command group lets you install and manage third-party plug-ins for the product. << user-guide\cli-usingcli.md
   We make no warranties regarding the use of third-party plug-ins. << user-guide\cli-extending.md
   Install third-party plug-ins at your own risk. << user-guide\cli-extending.md

**application framework**
   The application framework provides constructs that facilitate this ability. << user-guide\mvd-apptoappcommunication.md
   The application framework attempts to solve this problem by creating structured messages that can be sent from one application plug-in to another. << user-guide\mvd-apptoappcommunication.md
   In the application framework, the unit of application-to-application communication is an Action. << user-guide\mvd-apptoappcommunication.md

**persistent repository**
   Persistent Data APIs Use Persistent Data APIs to create, read, update, delete metadata from persistent repository. << user-guide\usingapis.md
   Update metadata in persistent repository for a given resource and attribute name. << user-guide\usingapis.md
   Create metadata in persistent repository for one or more resource/attribute elements. << user-guide\usingapis.md

**started task** 
   The Zowe Application Framework server (`zlux-server`) runs under the ZOWESVR started task, so it should terminate when ZOWESVR is stopped. << user-guide\uninstall.md
   The ZOWESVR started task should be running. << user-guide\troubleshootinstall.md
   If the started task is not running, ensure that your ZOWESVR procedure resides in a valid PROCLIB data set, and check the task s job output for errors. << user-guide\troubleshootinstall.md

**Zowe Application Framework Application Server**
   (A plug-in is the unit of extensibility for the Zowe Application Framework Application Server. << user-guide\mvd-zluxplugindefandstruct.md
  nodeServer When an application has Dataservices of the type "router", they are interpreted by the Zowe Application Framework Application Server by attaching them as ExpressJS routers. << user-guide\mvd-zluxappfilesystem.md
   nodeServer When an application plug-in has router-type dataservices, they are interpreted by the Zowe Application Framework Application Server by attaching them as ExpressJS routers. << user-guide\mvd-zluxplugindefandstruct.md

**Zowe Desktop**
   The Zowe Desktop presents a taskbar at the bottom of the page, where it presents each applications as an icon with a description. << user-guide\mvd-mvdandwindowmgt.md
   Applications that have web content are presented in the Zowe Desktop UI. << user-guide\mvd-mvdandwindowmgt.md
   In the case of the Zowe Desktop, this framework-specific wrapping is handled by the Plug-in Manager. << user-guide\mvd-mvdandwindowmgt.md

**partitioned data set member** 
   Use this API to read the content of a sequential data set or partitioned data set member. << user-guide\usingapis.md
   Use this API to write content to a sequential data set or partitioned data set member. << user-guide\usingapis.md
   Use this API to submit a partitioned data set member or UNIX file. << user-guide\usingapis.md

