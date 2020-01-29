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


The following plug-ins are compatible and available *only* with Zowe CLI Active Development version:

- [IBM® z/OS FTP Plug-in for Zowe CLI](../user-guide/cli-mqplugin.md).
- [IBM® IMS™ Plug-in for Zowe CLI](../user-guide/cli-imsplugin.md).
- [IBM® MQ Plug-in for Zowe CLI](../user-guide/cli-mqplugin.md).
- [Secure Credential Store for Zowe CLI](../user-guide/cli-mqplugin.md).

**Note:** This is not a comprehensive list of plug-ins. For a complete list of plug-ins compatible with the Active Development version, see [Extending Zowe CLI - Active Development](https://docs.zowe.org/active-development/user-guide/cli-extending.html). For a complete list of plug-ins compatible with the `@lts-incremental` version, see [Extending Zowe CLI - Stable](https://docs.zowe.org/stable/user-guide/cli-extending.html).

**Features and enhancements: December 2019**

- The Zowe CLI API now supports the following capabilities:
  - Change the name of sequential and partitioned data sets. [#571](https://github.com/zowe/zowe-cli/issues/571)
  - Migrate data sets. [#558](https://github.com/zowe/zowe-cli/issues/558)
  - Copy data sets to another data set and copy members to another member. [#578](https://github.com/zowe/zowe-cli/issues/578)

- The `zowe files copy` command was added for copying the contents of a data set or member to another data set or member. [#580](https://github.com/zowe/zowe-cli/pull/580)

- Zowe CLI now exploits Node.js stream APIs for download and upload of spool files, data sets, and USS files. [(#331)](https://github.com/zowe/zowe-cli/pull/331)
- The following new commands were added for interacting with file systems:
    - `zowe zos-files list fs` [#429](https://github.com/zowe/zowe-cli/issues/429)
    - `zowe zos-files mount fs` [#431](https://github.com/zowe/zowe-cli/issues/431)
    - `zowe zos-files unmount fs` [#432](https://github.com/zowe/zowe-cli/issues/432)
- The following new commands were added for creating USS files and directories:
    - `zowe zos-files create file` [#368](https://github.com/zowe/zowe-cli/issues/368)
    - `zowe zos-files create dir` [#368](https://github.com/zowe/zowe-cli/issues/368)

The following new functionality was added to IBM® CICS® Plug-in for Zowe&trade; CLI:

  - Define, enable, install, discard, disable, and delete URIMaps. [#53](https://github.com/zowe/zowe-cli-cics-plugin/issues/53) [#49](https://github.com/zowe/zowe-cli-cics-plugin/issues/49) [#48](https://github.com/zowe/zowe-cli-cics-plugin/issues/48) [#51](https://github.com/zowe/zowe-cli-cics-plugin/issues/51) [#50](https://github.com/zowe/zowe-cli-cics-plugin/issues/50) [#52](https://github.com/zowe/zowe-cli-cics-plugin/issues/52)
  - Define and delete web services. []()
  - Add and removing CSD Groups to/from CSD Lists []().
  - The plug-in now uses HTTPS to connect to CMCI by default. The option `--protocol http` was added to let you override the default. [#77](https://github.com/zowe/zowe-cli-cics-plugin/issues/77)

## Installing or Updating

### First-time install

If you *do not* have Zowe CLI installed on your computer, refer to [Installing Zowe CLI](../user-guide/cli-installcli.md) to install this version of CLI and plug-ins.

### Updating from @lts-incremental

Follow these steps to convert an `lts-incremental` (Stable) CLI version to a `latest` (Active Development) version:

1. (Optional) To preserve plug-in user profiles that you created (for example, cics, db2, etc..), copy the contents of `C:\Users\<username>\.zowe\profiles` to another directory on your computer using OS commands or file explorer.

2.  Uninstall plug-ins, if any. For more information, see [Uninstall plug-ins](../user-guide/cli-installplugins.md#uninstall-plug-ins).

3. Use one of the following methods to update to the `@latest` version of CLI and plug-ins.

    - [Download the Active Development package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install this version from an online registry](../user-guide/cli-installcli.md#installing-zowe-cli-from-an-online-registry).

4. (Optional) To reestablish your user profiles (if any), move the files that you saved in Step 1 back into your `C:\Users\\<username\>\\.zowe\profiles` folder.

You updated to `@latest` Zowe CLI! We recommend that you issue familiar commands and run scripts to ensure that your profiles/scripts are compatible. If the migration affected your profiles or scripts, review the [Breaking Changes](#breaking-changes) and take corrective action.

### Migrating back to Stable CLI

Follow a similar procedure as above to migrate from `latest` (Active Development) back to `lts-incremental` (Stable): Copy your plug-in profiles, uninstall plug-ins, then follow the [Stable CLI installation instructions](https://docs.zowe.org/stable/user-guide/cli-installcli.html#methods-to-install-zowe-cli) to update CLI and plug-ins.

After migrating, always verify that your scripts and profiles are still functional.

## Breaking changes

If your commands or scripts return warnings/errors after updating, account for the following breaking changes that occured during major version bumps:

- The CICS Plug-in for Zowe CLI now uses HTTPS to connect to CMCI by default. Previously, HTTP was used by default. The option `--protocol http` was added to override the default. [More information.](https://github.com/zowe/zowe-cli-cics-plugin/issues/77)

- The `zowe zos-files download ds` and `zowe zos-files download uf` commands no longer put the full content in the response format json output. [More information.](https://github.com/zowe/zowe-cli/pull/331)

- The `--pass` option is changed to `--password`  for all commands and profiles. The aliases `--pw` and `--pass` still function. To update a profile, issue the `zowe zosmf create profile` command and use the new option name `--password`.

- You can enter a value of `PROMPT*` to enable interactive prompting for any command-line option. If you created scripts where any option was defined with the actual value `PROMPT*`, the script will not function properly in this version.

- The `@next` npm tag, previously used to install the Active Development version, is deprecated
. `@latest` is the correct syntax to install this version.

## Understanding CLI version tags

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The packages that you install are associated with a specific tag or version stream. You use tags in command syntax to install or update the product to a specific version.

- `npm install -g @brightside/core@lts-incremental`

    Installs the `@lts-incremental` (Stable) version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes.

- `npm install -g @zowe/cli@latest`

    The `@latest` (Active Development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, you might have to take corrective action when breaking changes are introduced.

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
