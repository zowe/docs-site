# Release notes for Open Beta

Learn about what is new, changed, removed, and known issues in Open Beta for Zowe.

Zowe Open Beta includes the following releases:

- [Version 0.9.1 (October 2018)](#version-0-9-1-october-2018)
- [Version 0.9.0 (August 2018)](#version-0-9-0-august-2018)

## Version 0.9.1 (October 2018)

Version 0.9.1 contains the following changes since the last version.

### What's new

#### New in the Zowe Application Framework

The Workflows application plug-in was added to the Zowe Application Framework (zLUX).

#### New in Zowe CLI

Zowe CLI contains the following new features:

- **Zowe CLI Plug-in for IBM® CICS®**

    The new plug-in lets you extend Zowe CLI to interact with CICS programs and transactions. It uses the IBM CICS Management Client Interface (CMCI) API to achieve the interaction with CICS.

    As an application developer, you can use the plug-in to perform various CICS-related tasks, such as the following:

    - Deploy code changes to CICS applications that were developed with COBOL.
    - Deploy changes to CICS regions for testing or delivery.
    - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.

    For more information, see [Zowe CLI Plug-in for IBM CICS](cli-cicsplugin.md).

- **`zos-jobs` and `zos-files` commands and command options**

    Zowe CLI contains the following new commands and command options:

    - `zowe zos-jobs delete job` command: Lets you cancel a job and purge its output by providing the JOB ID.
    - `zowe zos-files upload file-to-uss` command: Lets you upload a local file to a file on USS.
    - `zowe zos-files download uss-file` command: Lets you download a file on USS to a local file.
    - `zowe zos-jobs submit local-file` command: Lets you submit a job contained in a local file on your PC rather than a data set.
    - `zowe zos-jobs download output` command: Lets you download the complete spool output for a job to a local directory on your PC.
    - The `zowe zos-jobs submit data-set` command and the `zowe zos-jobs submit local-file` command now contain a `--view-all-spool-content` option. The option lets you submit a job and view its complete spool output in one command.

#### New in API Mediation Layer

You can now view the status of API Mediation Layer from the Zowe Desktop App (zLUX plug-in).

#### Enhanced JES Explorer

A full-screen job output view is now available. You can view a single job output file in a full-screen text area, which removes the need to navigate via the job tree. Note that this view is currently only available via direct access to the explorer. It is not accessible via the Zowe Desktop app in this release. To open a file in full screen, you can use the following URL/parameters:  
https://host:explorerSecurePort/explorer-jes/#/?jobName=SAMPLEJOB&jobId=JOB12345&fileId=102

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

Zowe now contains a component named API Mediation Layer. You install API Mediation Layer when you install the Zowe runtime on z/OS. For more information, see [API Mediation Layer](overview.html#api-mediation-layer) and [Installing the Zowe Application Framework, explorer server, and API Mediation Layer](install-zos.html#installing-the-zowe-runtime-on-z-os).

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
