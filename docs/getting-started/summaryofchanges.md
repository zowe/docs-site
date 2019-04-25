# Release notes

Learn about what is new, changed, removed, and known issues in Zowe. 

Zowe Version 1.1.0 and later releases include the following enhancements, release by release.

- [Version 1.1.1 (April 2019)](#version-1-1-1-april-2019)
- [Version 1.1.0 (April 2019)](#version-1-1-0-april-2019)

## Version 1.1.1 (April 2019)

Version 1.1.1 contains the following changes since the last version.

### What's new in the Zowe installer

- Made the following installer improvements:
  - Check whether ICSF is configured before checking Node version to avoid runaway CPU.
  - Warn if the host name that is determined by the installer is not a valid IP address.
  - Fixed a bug where a numeric value is specified in ZOWE_HOST_NAME causing errors generating the Zowe certificate. 
- Made the following improvements to the `zowe-check-prereqs.sh` script:
  - Improvements for checking and validating the telnet and ssh port required by the Zowe Desktop applications.

### What's new in API Mediation Layer
This release of Zowe API contains the following user experience improvements:
- Prevented the Swagger UI container on the service detail page from
spilling                                                                                                                             
- Added a check for the availability of the z/OSMF URL contained in the  
configuration. z/OSMF is used to verify users logging into the Catalog.  
- Made PageNotFound error visible only in the debug log level.           
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

### What's new in Zowe CLI and Plug-ins
The Zowe CLI core component contains the following improvements and fixes:

- The zowe `zos-workflows` command group now contains the following `active-workflow-details` options:

    - `--steps-summary-only | --sso (boolean)`: An optional parameter that lets you list (only) the steps summary.
    - `--skip-workflow-summary | --sws (boolean)`: An optional parameter that lets you skip the default workflow summary. 

- Zowe CLI was updated to correct an issue where the `zowe zos-workflows start` command ignored the `-- workflow-name` argument.

- Updated and clarified the description the `-- overwrite` option for the `zowe zos-workflows create workflow-from-data-set` command and the `Zowe zos-workflows create workflow-from-uss-file` command.

- You can now click the links on the Welcome to Zowe help section and open the URL in a browser window. Note that the shell application must support the capability to display and click hyperlinks.

### What's new in Zowe USS API

Made the following enhancements:
- Chtag detection and ascii/ebcdic conversion on GET & PUT requests
- New optional header on GET Unix file content request to force conversion from ebcdic to ascii
- New response header on GET Unix file content requests: E-Tag for overwrite detection and validation
- Reintroduced PUT (update) Unix file content endpoint
- Reintroduced Delete Unix file content endpoint
- Reintroduced POST (create) Unix file or directory endpoint


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
- Fixed a bug that would sometimes move application windows when you attempted to resize them.
- Fixed a bug in the "Getting started with the ZOWE WebUi" tutorial documentation.
- Fixed a bug that caused applications that made ZSS service requests to fail with an HTTP 401 error because of dropped session cookies.

### What's new in Zowe CLI and Plug-ins
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
