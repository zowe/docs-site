# Release notes - Zowe Active Development

Welcome to Zowe Active Development documentation.

[[toc]]

## What is Active Development?

- Active Development is a forward branch that includes features that are not yet included in the Zowe Stable version. 
- You can switch between Stable and Active Development documentation using the **Versions** drop-down in the navigation bar.
- The version is equivalent to the `@latest` version of Zowe CLI.
- When migrating from one CLI version to the other, you might need to edit user your profiles and reinstall plug-ins due to differences between versions. 

## Active Development highlights

**New compatible plug-ins:**

In addition to the CICS and Db2 Zowe CLI plug-ins, the following plug-ins are available for Active Development:

- The [IBM IMS Plug-in for Zowe CLI](../user-guide/cli-imsplugin.md).
- The [IBM MQ Plug-in for Zowe CLI](../user-guide/cli-mqplugin.md).

**Features and enhancements:**

- Zowe CLI now exploits Node.js stream APIs for download and upload of spool files, data sets, and USS files. [(#331)](https://github.com/zowe/zowe-cli/pull/331)
- You can issue a command to launch interactive command help in your Web browser. For more information, see [Interactive Web Help](../user-guide/cli-usingcli.md#interactive-web-help). [(#238)](https://github.com/zowe/imperative/issues/238)

## Installing Active Development CLI

### First-time install:

If you *do not* have Zowe CLI installed on your computer, refer to [Installing Zowe CLI](../user-guide/cli-installcli.md) to install this version of CLI and plug-ins. 

### Updating from @lts-incremental

Follow these steps to convert an existing `lts-incremental` (Stable) CLI version to `latest` (Active Development) version:

1. If you have plug-in profiles that you want to preseve, copy them from the Zowe home directory to another directory on your computer. The default home directory is `C:\Users\\<username\>\\.zowe`.

2.  Uninstall currently installed plug-ins, if any. For more information, see [Uninstall plug-ins](../user-guide/cli-installplugins.md#uninstall-plug-ins).
   

3. Use one of the following methods to reinstall the `@latest` version of CLI and plug-ins. 

    - [Download the Zowe CLI Pre-Release package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install the CLI from an online registry](../user-guide/cli-installcli.md#installing-zowe-cli-from-an-online-registry).

4. Try issuing familiar commands and running any scripts to ensure that your user profiles are compatible. If you encounter errors, review the [Breaking Changes](#breaking-changes) and take corrective action if the changes affected your profiles or scripts.  

You installed the `@latest` Zowe CLI! 

**Migrating back to Stable CLI**

Follow a similar procedure to migrate from Active Development back to Stable. Uninstall your plug-ins, then follow the [Stable CLI installation instructions](). 

After migrating, always verify that your scripts and profiles are still functional. 

## Breaking changes
If your existing scripts or profiles return warnings/errors after a migration, you might need to account for breaking changes that occured between major versions.

Take corrective action if any of the following changes apply to your profiles or scripts:

- https://github.com/zowe/zowe-cli/pull/331 

- The `--pass` command option is changed to `--password` for all core CA Brightside CLI commands for clarity and to be consistent with plug-ins. You must recreate existing zosmf profiles to use the --password option. The aliases --pw and --pass still function when you issue commands as they did prior to this breaking change. You do not need to modify scripts that use  --pass.  RECREATE

Issue this command w/ all options: 
`zowe zosmf create profile <name> --password myPassword etc etc --ow`

- To install the core CLI, you no longer assign the @brightside scope to the online registry. Instead, you set the @zowe scope. 
To install the CICS or Db2 plug-ins, you no longer assign the @brightside scope to the online registry. Instead, you set the @zowe scope. You must uninstall the old versions before you install the core CLI under the @zowe scope. To install all other plug-ins, the @brightside scope is still valid.   

- Interactive Prompt Feature Introduced
The prompt feature lets you use a value of PROMPT* to enable interactive prompting for any command-line option. If you created scripts where any option has a value of PROMPT*, the script will not function properly with the @latest version of the CLI. 

For more information about the feature, see Use the Interactive Prompt for Command Options. 

- The NPM tag that you use to install the product from an online registry is changed from @next to @latest. For more information, see Install CA Brightside from Online Registry.   REWRITE SCRIPT

## Understanding CLI version tags

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The downloadable packages that you install are associated with a specific tag. You can also use tags in command syntax to install or update the product to a specific version. 

- `npm install -g @brightside/core@lts-incremental` 
        
    Installs the `@lts-incremental` (Stable) version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes. 

- `npm install -g @zowe/cli@latest` 
    
    The `@latest` (Active Development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, you might have to take corrective action when breaking changes are introduced. 

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
