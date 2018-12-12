# Release notes for Open Beta

Learn about what is new, changed, removed, and known issues in Open Beta for Zowe.

Zowe Open Beta includes the following releases:

- [Version 0.9.4 (November 2018)](#version-0-9-4-november-2018)
- [Version 0.9.3 (November 2018)](#version-0-9-3-november-2018)
- [Version 0.9.2 (October 2018)](#version-0-9-2-october-2018)
- [Version 0.9.1 (October 2018)](#version-0-9-1-october-2018)
- [Version 0.9.0 (August 2018)](#version-0-9-0-august-2018)

## Version 0.9.4 (November 2018)

Version 0.9.4 contains the following changes since the last version.

### What's new in Zowe Application Framework

-  **Accessing the Zowe Desktop**

    The URL to access the Zowe Desktop is changed to `https://myhost:httpsPort/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`. Previously, the URL is `https://myhost:httpsPort/ZLUX/plugins/com.rs.mvd/web/index.html`.

    See [Using the Zowe Desktop](../user-guide/mvd-using.md) for more information.

### What's new in Zowe CLI

- **Integrate Zowe CLI with API Mediation Layer**

    Zowe CLI now integrates with the API Mediation Layer. You can now easily interact with services that have been surfaced through the API Mediation Layer. See [Accessing an API Mediation Layer](../user-guide/cli-usingcli.html#accessing-an-api-mediation-layer) for more information.

- **Zowe CLI standalone download available**

    Zowe CLI is now available as a standalone .tgz file download from [www.zowe.org/download](https://zowe.org/download/) to allow for easier installation. The CLI is no longer included in the primary Zowe PAX file download.

### What's new in Explorer Server
- **Enhanced JES explorer app**

    - Rewrites jobs tree to a simpler interface to make better use of available space. See [this issue](https://github.com/zowe/explorer-uss/issues/12) for details.
    - Fixes an issue that prevents the content viewer from resizing when launched in virtual desktop. See [this issue](https://github.com/zowe/explorer-jes/issues/20) for details.

- **Enhanced MVS explorer app**

    - Rewrites dataset tree to make better use of available space. See [this issue](https://github.com/zowe/explorer-mvs/issues/17) for details.
    - Fixes race condition when opening full-screen dataset causes no content to appear. See [this issue](https://github.com/zowe/explorer-mvs/issues/5) for details.

- **Enhanced USS explorer app**

    - You can now double click on directory to update path and reload tree. You can single click on directory to expand its contents.
    - Rewrites USS tree to make better use of available space. See [this issue](https://github.com/zowe/explorer-uss/issues/12) for details.

## Version 0.9.3 (November 2018)

Version 0.9.3 contains the following changes since the last version.

### What's new in Zowe CLI

Zowe CLI Version 0.9.3 now uses the following command option precedence:

- Command line options
- Environment variables
- Profiles
- Default values

With the new order of precedence, Zowe CLI now supports the following capabilities:

- **Issuing commands without a profile**

    Zowe CLI now lets you issue commands without a profile. All Zowe CLI commands now contain options that let you fully qualify your connection details without creating a profile before you issue the commands.

    For example, you can issue the following command without a profile:

    ```
    zowe zos-files download data-set "my.data.set" --user myuser --pass mypass --host mymainframe.com --port 1443
    ```

- **Specifying command options using environment variables**

    Zowe CLI now lets you specify command options by defining environment variables. You create and define environment variables by prefixing them with `ZOWE_OPT_`. For example, you can specify the `--host` option by creating an environment variable named `ZOWE_OPT_HOST` and set the environment variable to the desired value.

- **Use the credential managers that CI/CD orchestration tools provide, such as *Jenkins*, by defining sensitive information in environment variables.**

    See [Setting environment variables for command arguments and options](../user-guide/cli-usingcli.html#setting-environment-variables-for-command-arguments-and-options) for more information about this feature.

### What's changed in Zowe CLI

Zowe CLI version 0.9.3 contains the following functional changes.

- **Creating and updating zosmf profiles:**

    You must now specify `--pass` rather than `--password` when you create zosmf profiles using the `zowe profiles create zosmf` command, or update zosmf profiles using the `zowe profiles update zosmf` command.

### What's new in Zowe API Mediation Layer

Zowe API Mediation Layer Version 0.9.3 contains the following new functionality and features:

- **Creating and updating zosmf profiles:**

    You must now specify `--pass` rather than `--password` when you create zosmf profiles using the `zowe profiles create zosmf` command, or update zosmf profiles using the `zowe profiles update zosmf` command.

- **Improved API Gateway Landing Page**

    - Page was refactored into static, server rendered page 
    - Is now showing version of the build
    - Is now aligned with the design of the rest of the application using Mineral UI
    - You can invoke this page at https://hostname:port (default port 7554)

- **Enhanced process for on-boarding REST API Services without required code changes**

    - Previously we supported routing REST API Services without code changes through the Gateway.
      In this version we enhanced static on-boarding support with the ability to display such services in the API Catalog.
    - All services that are routed though the Gateway are now displayed in the Catalog (even if they do not have Open API documentation).
        - The API catalog shows the service without any documentation.
        - The API catalog shows the base URL that can access the API service.
    - An active link is displayed in the API Catalog for services in which REST API documentation is available online through a URL (e.g. DocOps URL).
    - Swagger that is provided by the API service is now displayed in the API Catalog for the following conditions:
        - When Swagger is provided by the API service (in the location specified in YAML as URL).
        - When Swagger is provided externally as a Swagger file.


## Version 0.9.2 (October 2018)

Version 0.9.2 contains the following changes since the last version.

### What's new in Zowe CLI

The Visual Studio Code (VSCode) Extension for Zowe is now available. Using the extension you can data sets, view their contents, make changes, and upload the changes to the mainframe directly from the Visual Studio Code user interface. You install the extension directly to Visual Studio Code to enable the extension within the UI. For more information, see VSCode Extension for Zowe. 


### What's changed in the Explorer Server

- The URLs to access the explorer server UI are changed.

| URL in 0.9.1 | URL in 0.9.2 |
| ------| ------|
| `https://<your.server>:<atlasport>/explorer-jes/#/` | `https://<your.server>:<atlasport>/ui/v1/jobs/#/` |
| `https://<your.server>:<atlasport>/explorer-mvs/#/` | `https://<your.server>:<atlasport>/ui/v1/datasets/#/` |
| `https://<your.server>:<atlasport>/explorer-uss/#/` | `https://<your.server>:<atlasport>/ui/v1/uss/#/` |

- All explorer server REST APIs are changed. The `/Atlas/api/` portion of an explorer server REST API is changed to `/api/v1/`. For example, `GET /Atlas/api/datasets/{filter}` is changed to `GET /api/v1/datasets/{filter}`.

  For a list of the new APIs, see [Using APIs](../user-guide/usingapis.md).

### What's Changed in the Zowe CLI

This version of Zowe CLI contains the following changes:

- Zowe CLI no longer uses keytar to store credentials securely in your operating system's credential vault. The user names and passwords that are stored in zosmf profiles and other profile types are now stored in plain text. When you update from a previous version of Zowe CLI, and your credentials are stored securely, you must update, or optionally, re-create your profiles.

**Important!** Use the following steps only if you were using a version of Zowe CLI that is older than version 0.9.2.

**Follow these steps:**

1. Issue any bright command to create the `~/.zowe` home directory.
2. After you create the directory, copy the complete contents of the `~/.brightside` directory to the newly created `~/.zowe` directory. Copying the contents of the `~/.brightside` directory to the `~/.zowe` directory restores the profiles you created previously.
3. To help ensure that your plug-ins function properly, reinstall the plug-ins that you installed with older versions of the Zowe CLI.
4. After you migrate your profiles, issue the following command to list your existing profiles:
    ```
    bright profiles list zosmf
    ```
5. Update each profile for compatibility with the credential storage changes by issuing the following command:
    ```
    bright profiles update zosmf <profilename> -u <username> -p <password>
    ```
6. (Optional) If you do not want to migrate your profiles from `~/.brightside` to `~/.zowe` you can recreate your profiles using the following command:
    ```
    bright profiles create zosmf
    ```

    **Tip:** For more information, see [Create a Zowe CLI profile](../user-guide/cli-installcli.html#creating-a-zowe-cli-profile).

    **Notes:**

    - In future versions of Zowe CLI, plug-ins will be available that let you store your user credentials securely, which is similar to the previous behavior.
    - As mentioned in the previous bullet, Zowe CLI no longer uses keytar to store credentials securely in your operating system's credential vault. As a result, Zowe CLI requires only **Node.js** and **npm** as prerequisite software. For more information, see [System Requirements for Zowe CLI](../user-guide/systemrequirements.html#system-requirements-for-zowe-cli).  

#### Bug fixes

The following bugs are fixed in this release.

- JES Explorer: [Unable to retrieve file content in full-screen job view](https://github.com/zowe/explorer-jes/issues/16)
- JES Explorer: [Full-screen job output view does not refresh when users change URL for the first time](https://github.com/zowe/explorer-jes/issues/14)
- MVS Explorer: [MVS explorer editor cannot be displayed because of "TypeError: Cannot read property 'setContents' of null"](https://github.com/zowe/explorer-mvs/issues/5)


## Version 0.9.1 (October 2018)

Version 0.9.1 contains the following changes since the last version.

### What's new in the Zowe Application Framework

- The Workflows application plug-in was added to the Zowe Application Framework.

- The API Catalog plug-in was added to the Zowe Application Framework. This plug-in lets you view API services discovered by the API Mediation Layer.

- Angular application plug-ins can be internationalized utilizing the `ngx-i18n` library.

- Node.js v6.14.4.0 and later is now required.

- The Zowe Application Framework now provides a sample react app, Angular app, and a simple editor.

- The following tutorials are now available in GitHub:

    - Sample React app: [sample-react-app](https://github.com/zowe/sample-react-app/blob/lab/step-1-hello-world/README.md)

    - Sample Angular app: [sample-angular-app](https://github.com/zowe/sample-angular-app/blob/lab/step-1-hello-world/README.md)

    - Internationalization in Angular Templates in Zowe: [sample-angular-app (Internationalization)](https://github.com/zowe/sample-angular-app/blob/lab/step-2-i18n-complete/README.md)

    - App to app communication: [sample-angular-app (App to app communication)](https://github.com/zowe/sample-angular-app/blob/lab/step-3-app2app-complete/README.md)

    - Using the Widgets Library: [sample-angular-app (Widgets)](https://github.com/zowe/sample-angular-app/blob/lab/step-4-widgets-complete/README.md)

    - Configuring user preferences (configuration dataservice): [sample-angular-app (configuration dataservice)](https://github.com/zowe/sample-angular-app/blob/lab/step-5-config-complete/README.md)

#### New in Zowe CLI

Zowe CLI contains the following new features:

- **Zowe CLI Plug-in for IBM® CICS®**

    The new plug-in lets you extend Zowe CLI to interact with CICS programs and transactions. It uses the IBM CICS Management Client Interface (CMCI) API to achieve the interaction with CICS.

    As an application developer, you can use the plug-in to perform various CICS-related tasks, such as the following:

    - Deploy code changes to CICS applications that were developed with COBOL.
    - Deploy changes to CICS regions for testing or delivery.
    - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.

    For more information, see [Zowe CLI Plug-in for IBM CICS](../user-guide/cli-cicsplugin.md).

- **`zos-jobs` and `zos-files` commands and command options**

    Zowe CLI contains the following new commands and command options:

    - `zowe zos-jobs delete job` command: Lets you cancel a job and purge its output by providing the JOB ID.
    - `zowe zos-files upload file-to-uss` command: Lets you upload a local file to a file on USS.
    - `zowe zos-files download uss-file` command: Lets you download a file on USS to a local file.
    - `zowe zos-jobs submit local-file` command: Lets you submit a job contained in a local file on your computer rather than a data set.
    - `zowe zos-jobs download output` command: Lets you download the complete spool output for a job to a local directory on your computer.
    - The `zowe zos-jobs submit data-set` command and the `zowe zos-jobs submit local-file` command now contain a `--view-all-spool-content` option. The option lets you submit a job and view its complete spool output in one command.

- **Visual Studio Code Extension for Zowe**

    The Visual Studio Code (VSCode) Extension for Zowe is now available. You can install the extension directly to Visual Studio Code to enable the extension within the UI. Using the extension you can data sets, view their contents, make changes, and upload the changes to the mainframe directly from the Visual Studio Code user interface. For more information, see [VSCode Extension for Zowe](../user-guide/cli-vscodeplugin.md).

#### New in API Mediation Layer

API Mediation Layer Version 0.9.1 contains the following new functionality and features:

- You can now view the status of API Mediation Layer from the Zowe Desktop App (zLUX plug-in).
- API Mediation Layer now lets you define single instance services and route it through a gateway without having to apply code changes to the service.
- API Catalog contains the following new functionality and features:
    - The [Mineral](https://mineral-ui.com/) user interface framework was used to design the API Catalog user interface.
    - The Swagger user interface component was implemented for more standardized look and feel.
    - The Tile view now contains a Search bar.
- API Mediation Layer documentation now contains the following tutorials:
    - [Onboard an existing Java REST API service without Spring Boot with Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md).
    - [Onboard an existing Spring Boot REST API service with Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service.md).

#### Enhanced JES Explorer

A full-screen job output view is now available. You can view a single job output file in a full-screen text area, which removes the need to navigate via the job tree. Note that this view is currently only available via direct access to the explorer. It is not accessible via the Zowe Desktop app in this release. To open a file in full screen, you can use the following URL/parameters:   
https://host:explorerSecurePort/explorer-jes/#/viewer?jobName=SAMPLEJOB&jobId=JOB12345&fileId=102

### What's changed

#### Naming

MVD is renamed to Zowe Desktop.


#### JES Explorer

Fixed an issue where text would fall out of line in the content viewer caused by special characters. This fix includes migration to the orion-editor-component as the content viewer.

#### MVS Explorer

Fixed an issue where deletion of a dataset member fails.

#### Zowe CLI

***Important!*** Zowe CLI in Version 0.9.1 contains **breaking** changes. A **breaking** change can cause problems with existing functionality when you upgrade to Zowe CLI Version 0.9.1. For example, scripts that you wrote previously might fail, user profiles might become invalid, and the product might not integrate with plug-ins properly.

You will be impacted by the following changes if you update your version of Zowe to Version 0.9.1:

- The home directory for Zowe CLI, which contains the Zowe CLI logs, profiles, and plug-ins, was changed from `~/.brightside` to `~/.zowe`. The character "`~`" denotes your home directory on your computer, which is typically `C:/Users/<yourUserId>` on Windows operating systems. When you update to Zowe CLI Version 0.9.1 and issue `zowe` commands, the profiles that you created previously will not be available.

    To correct this behavior and migrate from an older version Zowe CLI, complete the following steps:

    1. Issue any bright command to create the `~/.zowe` home directory.
    2. After you create the directory, copy the complete contents of the `~/.brightside` directory to the newly created `~/.zowe` directory. Copying the contents of the `~/.brightside` directory to the `~/.zowe` directory restores the profiles you created previously.
    3. To help ensure that your plug-ins function properly, reinstall the plug-ins that you installed with older versions of Zowe CLI.

- The environment variables that control logging and the location of your home directory were previously prefixed with `BRIGHTSIDE_`. They are now prefixed with `ZOWE_`. If you were not using the environment variables before this change, no action is required. If you were using the environment variables, update any usage of the variables.

    The following environment variables are affected:

    - `BRIGHTSIDE_CLI_HOME` changed to `ZOWE_CLI_HOME`
    - `BRIGHTSIDE_IMPERATIVE_LOG_LEVEL` changed to `ZOWE_IMPERATIVE_LOG_LEVEL`
    - `BRIGHTSIDE_APP_LOG_LEVEL` changed to `ZOWE_APP_LOG_LEVEL`

## Version 0.9.0 (August 2018)

Version 0.9.0 is the first Open Beta version for Zowe. This version contains the following changes since the last Closed Beta version.

### What's new

**New component - API Mediation Layer**

Zowe now contains a component named API Mediation Layer. You install API Mediation Layer when you install the Zowe runtime on z/OS. For more information, see [API Mediation Layer](overview.html#api-mediation-layer) and [Installing the Zowe Application Framework, explorer server, and API Mediation Layer](../user-guide/install-zos.html#installing-the-zowe-runtime-on-z-os).

### What's changed

**Naming**

- The project is now named Zowe.
- Zoe Brightside is renamed to Zowe CLI.

**Installation**

- The System Display and Search Facility (SDSF) of z/OS is no longer a prerequisite for installing explorer server.
- The name of the PROC is now ZOWESVR rather than ZOESVR.

**zLUX**

The mainframe account under which the ZSS server runs must have UPDATE permission on the `BPX.DAEMON` and `BPX.SERVER` facility class profiles.

**Explorer server**

The URL to access the explorer server UI is changed from `https://<your.server>:<atlasport>/ui/#/` to the following ones:

   - `https://<your.server>:<atlasport>/explorer-jes/#/`
   - `https://<your.server>:<atlasport>/explorer-mvs/#/`
   - `https://<your.server>:<atlasport>/explorer-uss/#/`

### What's removed

Removed all references to SYSLOG.

### Known issues

#### Security message when you open the Zowe Desktop

When you initially open the Zowe Desktop, a security message alerts you that you are attempting to open a site that has an invalid HTTPS certificate. Other applications within the Zowe Desktop might also encounter this message. To prevent this message, add the URLs that you see to your list of trusted sites.

**Note:** If you clear the browser cache, you must add the URL to your trusted sites again.

#### Message ICH408I during runtime

During runtime, the information message ICH408I may present identifying insufficient write authority to a number of resources, these resources may include:

- `zowe/explorer-server/wlp/usr/servers/.pid/Atlas.pid`
- `zowe/zlux-example-server/deploy/site/plugins/`
- `zowe/zlux-example-server/deploy/instance/plugins/`

**Note:** This should not affect the runtime operations of Zowe. This is a known issue and will be addressed in the next build.

#### Zowe Application Framework APIs
Zowe Application Framework APIs exist but are under development. Features might be reorganized if it simplifies and clarifies the API, and features might be added if applications can benefit from them.
