# Release notes

Learn about what is new, changed, removed, and known issues in Zowe.

## Version 1.0.0 (February 2019)

Version 1.0.0 contains the following changes since the Open Beta release.

### What's new in API Mediation Layer

### What's new in Zowe CLI

-  **Breaking change to Zowe CLI**: The `--pass` command option is changed to `--password` for all core Zowe CLI commands for clarity and to be consistent with plug-ins. If you have zosmf profiles that you created prior to January 11, 2019, you must recreate them to use the `--password` option. The aliases `--pw` and `--pass` still function when you issue commands as they did prior to this breaking change. You do not need to modify scripts that use  `--pass`.

- The `@next` npm tag used to install Zowe CLI is deprecated. Use the `@latest` npm tag to install the product with the online registry method. 

### What's new in the Zowe Desktop

- You can now obtain information about an application by right-clicking on an application icon and then clicking **Properties**.

- To view version information for the desktop, click the avatar in the lower right corner of the desktop.

- Additional information was added for the Workflow app.

### What's changed
 
- Previously,  APIs for z/OS Jobs services and z/OS Data Set services are provided unsing an IBM WebSphere Liberty web application server. In this release, they are provided using a Tomcat web application server. You can view the associated API documentation corresponding to the z/OS services through the API Catalog.

- References to `zlux-example-server` were changed to `zlux-app-server` and references to `zlux-proxy-server` were changed to `zlux-server-framework`.

### Known issues

**Paste operations from the Zowe Desktop TN3270 and VT Terminal applications**

**TN3270 App** - If you are using Firefox, the option to use Ctrl+V to paste is not available. Instead, press Shift + right-click to access the paste option through the context menu.

Pressing Ctrl+V will perform paste for the TN3270 App on other browsers.

**VT Terminal App** - In the VT Terminal App, Ctrl+V will not perform a paste operation for any browser.

**Note:** In both terminals, press Shift + right-click to access copy and paste options through the context menu.

**z/OS Subsystems App** - is being removed temporarily in the 1.0 release.  The reason is that as the ZSS has transitioned from closed to open source some APIs needed to be re-worked and are not complete yet.  Look for the return of the App in the next update.

