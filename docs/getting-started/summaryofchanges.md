# Release notes

Learn about what is new, changed, removed, and known issues in Zowe.

## Version 1.0.0 (January 2019)

Version 1.0.0 contains the following changes since the Open Beta release.

### What's new in API Mediation Layer

### What's new in Zowe CLI

-  **Breaking change to Zowe CLI**: The `--pass` command option is changed to `--password` for all core Zowe CLI commands for clarity and to be consistent with plug-ins. If you have zosmf profiles that you created prior to January 11, 2019, you must recreate them to use the `--password` option. The aliases `--pw` and `--pass` still function when you issue commands as they did prior to this breaking change. You do not need to modify scripts that use  `--pass`.

- The `@next` npm tag used to install Zowe CLI is deprecated. Use the `@latest` npm tag to install the product with the online registry method. 

### What's new in the Zowe Desktop

You can now obtain information about an application by right-clicking on an application icon and then clicking **Properties**.

To view version information for the desktop, click the avatar in the lower right corner of the desktop.

### What's changed
 
- Previously,  APIs for z/OS Jobs services and z/OS Data Set services are provided through the Liberty web application server. In this release, they are provided through the Tomcat web application server. You can view the associated API documentation corresponding to the z/OS services through the API Catalog.
