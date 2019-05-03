# Release notes

Learn about what is new, changed, removed, and known issues in Zowe. 

Zowe Version 1.2.0 and later releases include the following enhancements, release by release.

- [Version 1.2.0 (May 2019)](#version-1-2-0-may-2019)

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
