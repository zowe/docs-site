# Release notes - Zowe Active Development

Welcome to Zowe Active Development documentation.

[[toc]]

## What is Active Development?

- Active Development is a forward branch that includes features that are not yet included in the Zowe Stable version. 
- You can switch between Stable and Active Development documentation using the **Version** drop-down in the navigation bar.
- The version is equivalent to the `@latest` version of Zowe CLI.
- When migrating from one CLI version to the other, you might need to edit user your profiles and reinstall plug-ins due to differences between versions. 

## Active Development Version highlights

**New compatible plug-ins:**

In addition to the CICS and Db2 Zowe CLI plug-ins, the following plug-ins are available for Active Development:

- The [IBM IMS Plug-in for Zowe CLI](../user-guide/cli-imsplugin.md).
- The [IBM MQ Plug-in for Zowe CLI](../user-guide/cli-mqplugin.md).

**Features and enhancements:**

- Zowe CLI now exploits Node.js stream APIs for download and upload of spool files, data sets, and USS files. [(#331)](https://github.com/zowe/zowe-cli/pull/331)
- You can issue a command to launch interactive command help in your Web browser. For more information, see [Interactive Web Help](../user-guide/cli-usingcli.md#interactive-web-help). [(#238)](https://github.com/zowe/imperative/issues/238)

## Installing Active Development CLI

**First-time install:**

If you *do not* have Zowe CLI installed on your computer, refer to [Installing Zowe CLI](../user-guide/cli-installcli.md) to install this version of CLI and plug-ins. 

**Updating from @lts-incremental:**

If you *currently have the Stable `lts-incremental` CLI version installed, follow these steps to convert to Active Development:

1. (Optional) To preserve your existing profiles, save the contents of the `profiles` folder in your Zowe home directory to another location on your computer. For more information about the home directory, see [Configuring CLI](../user-guide/cli-configuringcli.md#setting-the-zowe-cli-home-directory).

2. Use one of the following methods to reinstall the `@latest` version of CLI and plug-ins. 

    - [Download the Zowe CLI Pre-Release package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install the CLI from an online registry](../user-guide/cli-installcli.md).

3. Due to differences in the versions, you might need to make changes to your existing profiles and scripts. Review the [Breaking Changes](#breaking-changes) in the following section, then take corrective action if the changes affects you. 

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

## Understanding CLI version tags

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The downloadable packages that you install are associated with a specific tag. You can also use tags in command syntax to install or update the product to a specific version. 

- `npm install -g @brightside/core@lts-incremental` 
        
    Installs the `@lts-incremental` (Stable) version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes. 

- `npm install -g @zowe/cli@latest` 
    
    The `@latest` (Active Development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, you might have to take corrective action when breaking changes are introduced. 

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
