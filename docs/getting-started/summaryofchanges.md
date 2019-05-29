# Release notes

Learn about what is new, changed, removed, and known issues in Zowe. 

Zowe Version 1.3.0 and later releases include the following enhancements, release by release.

- [Version 1.3.0 (May 2019)](#version-1-3-0-may-2019)
- [Version 1.2.0 (May 2019)](#version-1-2-0-may-2019)
- [Version 1.1.0 (April 2019)](#version-1-1-0-april-2019)
- [Version 1.0.1 (March 2019)](#version-1-0-1-march-2019)
- [Version 1.0.0 (February 2019)](#version-1-0-0-february-2019)

## Version 1.3.0 (May 2019)

Version 1.3.0 contains the following changes since Version 1.2.0.

<!--If it's a bug fix and there is a corresponding GitHub issue, please also include the GitHub issue number. For example, "Fixed a problem with incorrect return error when the user requests to view contents of a USS folder they do not have permission to. Now it returns a 403 (Forbidden) error. For details, see  [#nnnnn](https://github.com/zowe/data-sets/issues/77)." -->

### What's new in the Zowe installer

### What's new in API Mediation Layer
<!-- TODO -->
This release of Zowe API ML contains the following user experience improvements:

- Added authentication endpoints (/login, /query) to the API Gateway 
- Added the Gateway API Swagger document ([#305](https://github.com/zowe/api-layer/pull/305))
    - Fixed the bug that causes JSON response to set incorrectly when unauthenticated 
    - Fixed error messages shown when a home page cannot be modified 
- Added a new e2e test for GW, and update the detail service tile ([#309](https://github.com/zowe/api-layer/pull/309)) 
- Removed a dependency of integration-enabler-java on the gateway-common ([#302](https://github.com/zowe/api-layer/pull/302))
- Fixed the issue with the connection logic on headers to pass in the websocket ([#275](https://github.com/zowe/api-layer/pull/275)) 
- Fixed the bug 264: Bypass the API Gateway when the server returns 302 ([#276](https://github.com/zowe/api-layer/pull/276)) 


### What's new in the Zowe App Server
Made the following fixes and enhancements:
- Added internationalization to the Angular and React sample applications. ([#133](https://github.com/zowe/zlux/issues/133))
- Made the following enhancements to the ZSS server:
  - Added support for Zowe on z/OS version 2.4. ([#15](https://github.com/zowe/zss/issues/15))
  - Updated documentation for query parameter to file API. ([#48](https://github.com/zowe/zlux-app-server/pull/48))
- Made the following enhancements to security:
  - App Server session cookie is now a browser session cookie rather than having an expiration date. Expiration is now tracked on the server side. ([#132](https://github.com/zowe/zlux/issues/132), [#97](https://github.com/zowe/zlux-server-framework/pull/97), [#81](https://github.com/zowe/zlux-server-framework/issues/81))
  - Added a "mode=base64" option to the unixfile API. ([#127](https://github.com/zowe/zlux/issues/127))
- Added a port to the cookie name to differentiate multiple servers on same domain. ([#95](https://github.com/zowe/zlux-server-framework/pull/95))
- Made the following fixes and enhancements to the Code Editor application:
  - Added a menu framework to provide options specific to the current file/data set type. ([#131](https://github.com/zowe/zlux/issues/131))
  - Added ISPF-like syntax highlighting for JCL. ([#48](https://github.com/zowe/zlux-editor/pull/48))
  - Fixed an issue by notifying users if the editor cannot open a file or data set. ([#148](https://github.com/zowe/zlux/issues/148))
  - Fixed an issue with event behavior when a tab is closed. ([#135](https://github.com/zowe/zlux/issues/135))
  - Fixed an issue with not showing the content of files in Chrome and Safari. ([#100](https://github.com/zowe/zlux/issues/100))
  - Fixed an issue with files shown without alphabetical sorting. ([#85](https://github.com/zowe/zlux/issues/85))
- Made the following fixes and enhancements to the TN3270 application ([#96](https://github.com/zowe/zlux-server-framework/pull/96)):
  - Fixed an issue where the application could not be configured to default to a TLS connection.
  - Fixed an issue where it could not handle a TN3270 connection, only TN3270E. 
    Improved preference saving. Administrators can now store default values for terminal mod type, codepage, and screen dimensions.
- Made the following fixes and enhancements for App2App for IFrames ([#24](https://github.com/zowe/zlux-platform/pull/24), [#107](https://github.com/zowe/zlux-app-manager/pull/107)):
  - Fixed an issue with an exception when handling App2App communication with IFrames.
  - Added experimental support for App2App communication with an IFrame application as destination.
- Made the following enhancements to support TopSecret:
  - Added a user-profiles endpoint. ([#113](https://github.com/zowe/zlux/issues/113))
  - Added an endpoint extraction for groups. ([#129](https://github.com/zowe/zlux/issues/129))
- Fixed an issue with app names not being internationalized when translations were present. ([#85](https://github.com/zowe/zlux-server-framework/pull/85))
- Fixed Russian language errors in translation files. ([#100](https://github.com/zowe/zlux-app-manager/pull/100))
- Fixed several issues with using the Application Server as a proxy. ([#93](https://github.com/zowe/zlux-server-framework/pull/93))
- Fixed an issue with the App Server throwing exceptions when authorization plugins were installed but not requested. ([#94](https://github.com/zowe/zlux-server-framework/pull/94))
- Fixed an issue with ZSS consuming excessive CPU during download. ([#147](https://github.com/zowe/zlux/issues/147))
- Fixed documentation issue by replacing "zLUX" with "Zowe Application Framework" and "MVD" with "Zowe Desktop." ([#214](https://github.com/zowe/docs-site/issues/214))
- Fixed an issue with an incorrect translation for word "Japanese" in Japanese. ([#108](https://github.com/zowe/zlux-app-manager/pull/108))

### What's new in Zowe CLI and Plug-ins

The following new commands and enhancements are added:

- Return a list of archived z/OSMF workflows with the `zowe zos-workflows list arw` command. [(#391)](https://github.com/zowe/zowe-cli/pull/391)

- Return a list of systems that are defined to a z/OSMF instance with the `zowe zosmf list systems` command. [(#348)](https://github.com/zowe/zowe-cli/pull/348)

- The `zowe uss issue ssh` command now returns the exit code of the shell command that you issued. [(#359)](https://github.com/zowe/zowe-cli/pull/359)

- The `zowe files upload dtu` command now supports the metadata file named `.zosattributes`. [(#366)](https://github.com/zowe/zowe-cli/pull/366)

The following bugs are fixed:

- Fixed an issue where `zowe workflow ls aw` commands with the `--wn` option failed if there was a space in the workflow name. [(#356)](https://github.com/zowe/zowe-cli/pull/356)

- Fixed an issue where `zowe zowe-files delete uss` command could fail when resource URL includes a leading forward-slash. [(#343)](https://github.com/zowe/zowe-cli/pull/343).

### What's new in Zowe API

## Version 1.2.0 (May 2019)

Version 1.2.0 contains the following changes since Version 1.1.0.

### What's new in the Zowe installer

- Made the following installer improvements:
  - Check whether ICSF is configured before checking Node version to avoid runaway CPU.
  - Warn if the host name that is determined by the installer is not a valid IP address.
  - Fixed a bug where a numeric value is specified in ZOWE_HOST_NAME causing errors generating the Zowe certificate. 
- Made the following improvements to the `zowe-check-prereqs.sh` script:
  - Improvements for checking and validating the telnet and ssh port required by the Zowe Desktop applications.

### What's new in API Mediation Layer
This release of Zowe API ML contains the following user experience improvements:
- Prevented the Swagger UI container on the service detail page from
spilling.                                                                                                                             
- Added a check for the availability of the z/OSMF URL contained in the  
configuration. z/OSMF is used to verify users logging into the Catalog.  
- Made _PageNotFound_ error visible only in the debug log level.
- Added zD&T-compatible ciphers and the TLS protocol restricted to 1.2.
- Introduced support for VSCode development.
- Introduced a common cipher configuration property.
- Fixed URL transformation defects.
- Fixed reporting that the Catalog is down when it is started before the 
Discovery Service.                                                       
- Removed the bean overriding error message from the log.                
- Fixed the state manipulation mechanism in the Catalog. As a result, no 
restoring of the application state is performed.                         
- Fixed the Catalog routing mechanism for a users who is already logged  
in so that the user is not prompted to log in again.                     
- A timeout has been set for Catalog login when z/OSMF is not responding.
- A tile change in the Catalog is now propagated to the UI.              
- Fixed a problem with an incorrect service homepage link in the Catalog.
- The Catalog Login button has been disabled when the login request is in
progress.  

### What's new in the Zowe App Server
- Improved security by adding support for RBAC (Role Based Access Control) to enable Zowe to determine whether a user is authorized to access a dataservice.
- Added Zowe Desktop settings feature for specifying the Zowe desktop language.
- Added German language files.
- Fixed a bug by adding missing language files.
- Enabled faster load times by adding support for serving the Zowe Application Framework core components, such as the Desktop, as compressed files in gzip format.
- Added support for application plug-ins to serve static content, such as HTML, JavaScript, and images, to browsers in gzip and brotli compressed files.
- Fixed a Code Editor bug by separating browsing of files and data sets.

### What's new in Zowe CLI and Plug-ins

The Zowe CLI core component contains the following improvements and fixes:

- The `zos-uss` command group is added to the core CLI. The commands let you issue Unix System Services shell commands by establishing an SSH connection to an SSH server. For more information, see [](../user-guide/cli-usingcli.md#zos-uss).

- The zowe `zos-workflows` command group now contains the following `active-workflow-details` options:

    - `--steps-summary-only | --sso (boolean)`: An optional parameter that lets you list (only) the steps summary.
    - `--skip-workflow-summary | --sws (boolean)`: An optional parameter that lets you skip the default workflow summary. 

- Zowe CLI was updated to correct an issue where the `zowe zos-workflows start` command ignored the `-- workflow-name` argument.

- Updated and clarified the description the `-- overwrite` option for the `zowe zos-workflows create workflow-from-data-set` command and the `Zowe zos-workflows create workflow-from-uss-file` command.

- The [CLI Reference Guide](https://zowe.github.io/docs-site/latest/CLIReference_Zowe.pdf) is featured on the Zowe Docs home page. The document is a comprehensive guide to commands and options in Zowe CLI. 

- You can now click the links on the Welcome to Zowe help section and open the URL in a browser window. Note that the shell application must support the capability to display and click hyperlinks.


### What's new in Zowe USS API

Made the following enhancements:
- Chtag detection and ascii/ebcdic conversion on GET & PUT requests. For details, see [this issue](https://github.com/zowe/data-sets/issues/82).
- New optional header on GET Unix file content request to force conversion from ebcdic to ascii. For details, see [this issue](https://github.com/zowe/data-sets/issues/82).
- New response header on GET Unix file content requests: E-Tag for overwrite detection and validation. For details, see [this issue](https://github.com/zowe/data-sets/issues/88).
- Reintroduced PUT (update) Unix file content endpoint. For details, see [this issue](https://github.com/zowe/data-sets/issues/83).
- Reintroduced DELETE Unix file content endpoint. For details, see [this issue](https://github.com/zowe/data-sets/issues/85).
- Reintroduced POST (create) Unix file or directory endpoint. For details, see [this issue](https://github.com/zowe/data-sets/issues/84).
- Fixed a problem with incorrect return error when the user requests to view contents of a USS folder they do not have permission to. Now it returns a 403 (Forbidden) error. For details, see  [this issue](https://github.com/zowe/data-sets/issues/77).


## Version 1.1.0 (April 2019)

Version 1.1.0 contains the following changes since the last 1.0.x version.

### What's new in Zowe system requirements
z/OSMF Lite is now available for non-production use such as development, proof-of-concept, demo and so on. It simplifies the setup of z/OSMF with only a minimal amount of z/OS customization, but provides key functions that are required. For more information, see [Configuring z/OSMF Lite (for non-production use)](../user-guide/systemrequirements-zosmf-lite.md).

### What's new in the Zowe App Server
- Made the following user experience improvements:
  - Enabled the Desktop to react to session expiration information from the Zowe Application Server. If a user is active the Desktop renews their session before it expires. If a user appears inactive they are prompted  and can click to renew the session. If they don't click, they are logged out with a session expired message.
  - Added the ability to programmatically dismiss popups created with the "zlux-widgets" popup manager.
- Made the following security improvements:
  - Encoded URIs shown in the App Server 404 handler, which prevents  some browsers from loading malicious scripts.
  - Documented and support configuring HTTPS on ZSS.
  - For ZSS API callers, added HTTP response headers to instruct clients not to cache HTTPS responses from potentially sensitive APIs.
- Improved the Zowe Editor App by adding app2app communication support that allows the application to open requested directories, dataset listings, and files.
- Improved the Zowe App API by allowing subscription to close events on viewports instead of windows, which allows applications to better support Single App Mode.
- Fixed a bug that generated an extraneous RACF audit message when you started ZSS.
- Fixed a bug that would sometimes move application windows when you attempted to resized them.
- Fixed a bug in the "Getting started with the ZOWE WebUi" tutorial documentation.
- Fixed a bug that caused applications that made ZSS service requests to fail with an HTTP 401 error because of dropped session cookies.

### What's new in the Zowe CLI and Plug-ins
This release of Zowe CLI contains the following new and improved capabilities:
- Added APIs to allow the definition of workflows
- Added the option `max-concurrent-requests` to the `zowe zos-files upload dir-to-uss` command
- Added the option `overwrite` to the `zowe zos-workflows create` commands
- Added the option `workflow-name` to the `zowe zos-workflows` commands
- Added the following commands along with their APIs:
  - `zowe zos-workflows archive active-workflow`
  - `zowe zos-workflows create workflow-from-data-set`
  - `zowe zos-workflows create workflow-from-uss-file`
  - `zowe zos-workflows delete active-workflow`
  - `zowe zos-files list uss-files`

This release of the Plug-in for IBM DB2 Database contains the following new and improved capabilities:
- Implemented command line precedence, which lets users issue commands without the need of a DB2 profile.
- The DB2 plug-in can now be influenced by the `ZOWE_OPT_` environment variables.

### What's new in API Mediation Layer
- Made the following user experience improvements:
  - Documented the procedure for changing the log level of individual code components in _Troubleshooting API ML_.
  - Documented a known issue when the API ML stops accepting connections after z/OS TCP/IP is recycled in the _Troubleshooting API ML_.

## Version 1.0.1 (March 2019)

Version 1.0.1 contains the following changes since the last version.

### What's new in Zowe installation on z/OS

During product operation of the Zowe Cross Memory Server which was introduced in V1.0.0, the z/OSMF user ID IZUSVR or its equivalent must have UPDATE access to the BPX.SERVER and BPX.DAEMON FACILITY classes. The install script will do this automatically if the installing user has enough authority, or provide the commands to be issued manually if not. For more information, see [Installing the Zowe Cross Memory Server on z/OS](../user-guide/install-zos.html#installing-the-zowe-cross-memory-server-on-z-os)

### What's new in the Zowe App Server

- Made the following improvements to security:
  - Removed the insecure SHA1 cipher from the Zowe App Server's supported ciphers list.
  - Added instructions to REST APIs to not cache potentially sensitive response contents.
  - Set secure attributes to desktop and z/OSMF session cookies.
- Fixed a bug that caused the configuration data service to mishandle PUT operations with bodies that were not JSON.
- Fixed a bug that prevented IFrame applications from being selected by clicking on their contents.
- Fixed various bugs in the File Explorer and updated it to use newer API changes.
- Fixed a bug in which App2App Communication Actions could be duplicated upon logging in a second time on the same desktop.

### What's new in Zowe CLI

- Create and Manage z/OSMF Workflows using the new `zos-workflows` command group. For more information, see [Zowe CLI command groups.](../user-guide/cli-usingcli.md#zowe-cli-command-groups)

- Use the `@lts-incremental` tag when you install and update Zowe CLI core or plug-ins. The tag ensures that you don't consume breaking changes that affect your existing scripts. Installation procedures are updated to reflect this change.

- A [CLI quick start guide](cli-getting-started.md) is now available for users who are familiar with command-line tools and want to get up and running quickly.

- Zowe CLI Plugin for IBM CICS was updated to support communication over HTTPS. Users can enable https by specifying `--protocol https` when creating a profile or issuing a command. For backwards compatibility, HTTP remains the default protocol.

### What's new in the Zowe REST APIs

Introduced new Unix files APIs that reside in the renamed API catalog tile `z/OS Datasets and Unix files service` (previously named `z/OS Datasets service`). You can use these APIs to:

- List the children of a Unix directory
- Get the contents of a Unix file

### What's changed

- **Zowe explorer apps**
   - JES Explorer: Enhanced Info/Error messages to better help users diagnose problems.
   - MVS Explorer: Fixed an issue where Info/Error messages were not displayed when loading a Dataset/Members contents.

## Version 1.0.0 (February 2019)

Version 1.0.0 contains the following changes since the Open Beta release.

### What's new in API Mediation Layer

- HTTPs is now supported on all Java enablers for onboarding API microservices with the API ML.  

- SSO authentication using z/OSMF has been implemented for the API Catalog login.  Mainframe credentials are required for access.

### What's new in Zowe CLI

-  **Breaking change to Zowe CLI**: The `--pass` command option is changed to `--password` for all core Zowe CLI commands for clarity and to be consistent with plug-ins. If you have zosmf profiles that you created prior to January 11, 2019, you must recreate them to use the `--password` option. The aliases `--pw` and `--pass` still function when you issue commands as they did prior to this breaking change. You do not need to modify scripts that use  `--pass`.

- The `@next` npm tag used to install Zowe CLI is deprecated. Use the `@latest` npm tag to install the product with the online registry method. 

### What's new in the Zowe Desktop

- You can now obtain information about an application by right-clicking on an application icon and then clicking **Properties**.

- To view version information for the desktop, click the avatar in the lower right corner of the desktop.

- Additional information was added for the Workflow application.

- The titlebar of the active window is now colored to give an at-a-glance indication of which window is in the foreground.

- Window titlebar maximize button now changes style to indicate whether a window is maximized.

- Windows now have a slight border around them to help see boundaries and determine which window is active.

- Multiple instances of the same application can be opened and tracked from the launchbar. To open multiple instances, right-click and choose **Open New**.
Once multiple instances are open, you can click the application icon to select which application to bring to the foreground. The number of orbs below the application icon relates to the number of instances of the application that is open.

- Desktop framework logging trimmed and formalized to the Zowe App Logger. For more information, see [https://github.com/zowe/zlux/wiki/Logging](https://github.com/zowe/zlux/wiki/Logging).

- The UriBroker was updated to support dataservice versioning and UNIX file API updates.

- Removed error messages about missing `components.js` by making this optional component explicitly declared within an application. By using the property "webContent.hasComponents = true/false".

- Set the maximum username and password length for login to 100 characters each.

- Applications can now list webContent.framework = "angular" as an alias for "angular2".

- Fixed a bug where the desktop might not load on high latency networks.

### What's new in the Zowe App Server

- HTTP support was disabled in favor of HTTPS-only hosting.

- The server can be configured to bind to specific IPs or to hostnames. Previously, the server would listen on all interfaces. For more information, see [https://github.com/zowe/zlux-app-server/pull/30](https://github.com/zowe/zlux-app-server/pull/30).

- The core logger prefixes for the Zowe App Server were changed from "_unp" to "_zsf".

- Dataservices are now versioned, and dataservices can depend on specific versions of other dataservices. A plug-in can include more than one version of a dataservice for compatibility. For more information, see [https://github.com/zowe/zlux/wiki/ZLUX-Dataservices](https://github.com/zowe/zlux/wiki/ZLUX-Dataservices).

- Support to communicate with the API Mediation Layer with the use of keys and certificates was added.

- Trimmed and corrected error messages regarding unconfigured proxies for clarity and understanding. For more information, see [https://github.com/zowe/zlux-server-framework/pull/33](https://github.com/zowe/zlux-server-framework/pull/33).

- Fixed the `nodeCluster.sh` script to have its logging and environment variable behavior consistent with `nodeServer.sh`.

- Removed the "swaggerui" plug-in in favor of the API Catalog.

- Bugfix for `/plugins` API to not show the installation location of the plug-in.

- Bugfix to print a warning if the server finds two plug-ins with the same name.

- Added the ability to conditionally add HTTP headers for secure services to instruct the browser not to cache the responses. For more information, see [https://github.com/zowe/zlux-server-framework/issues/36](https://github.com/zowe/zlux-server-framework/issues/36).

- Added a startup check to confirm that ZSS is running as a prerequisite of the Zowe App Server.

- Bugfix for sending HTTP 404 response when content is missing, instead of a request hanging.

- Added tracing of login, logout, and HTTP routing so that administrators can track access.

### What's changed

- Previously,  APIs for z/OS Jobs services and z/OS Data Set services are provided unsing an IBM WebSphere Liberty web application server. In this release, they are provided using a Tomcat web application server. You can view the associated API documentation corresponding to the z/OS services through the API Catalog.

- References to `zlux-example-server` were changed to `zlux-app-server` and references to `zlux-proxy-server` were changed to `zlux-server-framework`.

### Known issues

**Paste operations from the Zowe Desktop TN3270 and VT Terminal applications**

**TN3270 App** - If you are using Firefox, the option to use Ctrl+V to paste is not available. Instead, press Shift + right-click to access the paste option through the context menu.

Pressing Ctrl+V will perform paste for the TN3270 App on other browsers.

**VT Terminal App** - In the VT Terminal App, Ctrl+V will not perform a paste operation for any browser.

**Note:** In both terminals, press Shift + right-click to access copy and paste options through the context menu.

**z/OS Subsystems App** - The z/OS Subsystems application is being removed temporarily for the 1.0 release.  The reason is that as the ZSS has transitioned from closed to open source some APIs needed to be re-worked and are not complete yet.  Look for the return of the application in a future update.
