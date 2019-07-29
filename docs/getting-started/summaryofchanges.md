# Release notes - Zowe Active Development Version

Learn about what is new or changed in the **Zowe Active Development Version**. Zowe Active Development contains additional features and enhancements that are not yet included in the current Zowe LTS version. 

**Note:** At this time, Active Development Version is equivalent to the `@latest` version of the CLI component.

## Active Development Version highlights

**Features and enhancements:**

- The CLI now exploits Node.js stream APIs for download and upload of spool files, data sets, and USS files. [(#331)](https://github.com/zowe/zowe-cli/pull/331)

**New compatible plug-ins:**

- The [Zowe CLI Plug-in for IBM IMS](../user-guide/cli-imsplugin.md) is now available. 
- The [Zowe CLI Plug-in for IBM MQ](https://github.com/zowe/zowe-cli-mq-plugin#zowe-mq-plug-in) is now available.

## Installing Active Development CLI

**First-time install:**

If you **do not** have Zowe CLI installed on your computer, see [Installing Zowe CLI](../user-guide/cli-installcli.md) to install this version of CLI and plug-ins. 

**Updating from @lts-incremental:**

If you currently have the `@lts-incremetal` CLI version installed, follow these steps to convert to `@latest`:

1. (Optional) If you want to preserve your existing profiles, save the contents of the `profiles` folder in your Zowe home directory to another location on your computer. For more information about the home directory, see [Configuring CLI](../user-guide/cli-configuringcli.md#setting-the-zowe-cli-home-directory).

2. Use one of the following methods to reinstall the `@latest` version of CLI and plug-ins. 

    - [Download the Zowe CLI Pre-Release package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install the CLI from an online registry](../user-guide/cli-installcli.md). 

3. Review the [Breaking Changes](#breaking-changes) in the following section, then take corrective action if the changes apply to you. This ensures that your user profiles and dependent scripts continue to function.

You installed the `@latest` Zowe CLI! Remember to adjust your profiles and scripts accordingly if you switch back to `@lts-incremental`.

## Breaking changes


take corrective action if the changes apply to you. This ensures that your user profiles and dependent scripts continue to function.
A breaking change can cause problems with existing functionality when you upgrade to the @next (the latest Community Edition) version of Zowe CLI. For example, scripts that you wrote previously might fail, user profiles might become invalid, and the product might not integrate with plug-ins properly. We recommend that you take corrective action for the following issues when you upgrade:

- https://github.com/zowe/zowe-cli/pull/331 

- The `--pass` command option is changed to `--password` for all core CA Brightside CLI commands for clarity and to be consistent with plug-ins. You must recreate existing zosmf profiles to use the --password option. The aliases --pw and --pass still function when you issue commands as they did prior to this breaking change. You do not need to modify scripts that use  --pass.  RECREATE

Issue this command w/ all options: 
`zowe zosmf create profile <name> --password myPassword etc etc --ow`

To install the core CLI, you no longer assign the @brightside scope to the online registry. Instead, you set the @zowe scope. 
To install the CICS or Db2 plug-ins, you no longer assign the @brightside scope to the online registry. Instead, you set the @zowe scope. You must uninstall the old versions before you install the core CLI under the @zowe scope. To install all other plug-ins, the @brightside scope is still valid.   

Interactive Prompt Feature Introduced
The prompt feature lets you use a value of PROMPT* to enable interactive prompting for any command-line option. If you created scripts where any option has a value of PROMPT*, the script will not function properly with the @latest version of the CLI. 

For more information about the feature, see Use the Interactive Prompt for Command Options. 

The NPM tag that you use to install the product from an online registry is changed from @next to @latest. For more information, see Install CA Brightside from Online Registry.   REWRITE SCRIPT

## Understanding CLI versions

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The downloadable packages that you install are associated with a specific tag. You can also use tags in command syntax to install or update the product to a specific version. 

- `npm install -g @brightside/core@lts-incremental` 
        
    Installs the LTS version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes. 

- `npm install -g @zowe/cli@latest` 
    
    The Pre-Release (or forward-development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, you might have to take corrective action when breaking changes are introduced. 

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
