# Release notes - Zowe Active Development

Welcome to Zowe Active Development documentation.

[[toc]]

## What is Active Development?

- Active Development is a forward-version that includes features not yet included in the Zowe Stable version. 
- You can switch between Stable and Active Development documentation using the **Versions** drop-down in the navigation bar. The Release notes, installation processes, and development tutorials are different in each version.
- The version is equivalent to the `@latest` version of Zowe CLI.
- When migrating from one CLI version to another, you might need to edit user your profiles and reinstall plug-ins due to differences between versions. 

## Version highlights

**New compatible plug-ins:**

In addition to the CICS and Db2 Zowe CLI plug-ins, the following plug-ins are available for Active Development:

- The [IBM IMS Plug-in for Zowe CLI](../user-guide/cli-imsplugin.md).
- The [IBM MQ Plug-in for Zowe CLI](../user-guide/cli-mqplugin.md).

**Features and enhancements:**

- Zowe CLI now exploits Node.js stream APIs for download and upload of spool files, data sets, and USS files. [(#331)](https://github.com/zowe/zowe-cli/pull/331)
- You can issue a command to launch interactive command help in your Web browser. For more information, see [Interactive Web Help](../user-guide/cli-usingcli.md#interactive-web-help). [(#238)](https://github.com/zowe/imperative/issues/238)

## Installing or Updating

### First-time install

If you *do not* have Zowe CLI installed on your computer, refer to [Installing Zowe CLI](../user-guide/cli-installcli.md) to install this version of CLI and plug-ins. 

### Updating from @lts-incremental

Follow these steps to convert an `lts-incremental` (Stable) CLI version to a `latest` (Active Development) version:

1. (Optional) To preserve plug-in user profiles that you created (for example, cics, db2, etc..), copy the contents of `C:\Users\<username>\.zowe\profiles` to another  directory on your computer.

2.  Uninstall plug-ins, if any. For more information, see [Uninstall plug-ins](../user-guide/cli-installplugins.md#uninstall-plug-ins).
   
3. Use one of the following methods to update to the `@latest` version of CLI and plug-ins. 

    - [Download the Active Development package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install this version from an online registry](../user-guide/cli-installcli.md#installing-zowe-cli-from-an-online-registry).

4. (Optional) Import any plug-in profiles back into your `C:\Users\\<username\>\\.zowe\profiles` folder. 

You updated to `@latest` Zowe CLI! We recommend that you issue familiar commands and run scripts to ensure that your profiles/scripts are compatible. If the migration affected your profiles or scripts, review the [Breaking Changes](#breaking-changes) and take corrective action. 

### Migrating back to Stable CLI

Follow a similar procedure as above to migrate from `latest` (Active Development) back to `lts-incremental` (Stable): Copy your plug-in profiles, uninstall plug-ins, then follow the [Stable CLI installation instructions](https://docs.zowe.org/stable/user-guide/cli-installcli.html#methods-to-install-zowe-cli) to update CLI and plug-ins.

After migrating, always verify that your scripts and profiles are still functional. 

## Breaking changes

If your commands or scripts return warnings/errors after updating, account for the following breaking changes that occured during major version bumps:

- The `zowe zos-files download ds` and `zowe zos-files download uf` commands no longer put the full content in the response format json output. [More information.](https://github.com/zowe/zowe-cli/pull/331)

- The `--pass` option is changed to `--password`  for all commands and profiles. The aliases `--pw` and `--pass` still function. To update a profile, issue the `zowe zosmf create profile` command and use the new option name `--password`. 
    
- You can enter a value of `PROMPT*` to enable interactive prompting for any command-line option. If you created scripts where any option was defined with the actual value `PROMPT*`, the script will not function properly in this version. 

- The `@next` npm tag, previously used to install the Active Development version, is depricated. `@latest` is the correct syntax to install this version. 

## Understanding CLI version tags

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The packages that you install are associated with a specific tag or version stream. You use tags in command syntax to install or update the product to a specific version. 

- `npm install -g @brightside/core@lts-incremental` 
        
    Installs the `@lts-incremental` (Stable) version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes. 

- `npm install -g @zowe/cli@latest` 
    
    The `@latest` (Active Development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, you might have to take corrective action when breaking changes are introduced. 

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
