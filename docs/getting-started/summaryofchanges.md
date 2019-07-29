# Release notes - Pre-Release 2.0 

Learn about what is new or changed in the **Zowe Pre-Release 2.0 version**. Pre-Release means that the package contains additional features and enhancements that are not yet included in the current Zowe LTS version. 

**Note** At this time, Pre-Release only applies to the Zowe CLI component.

## @latest highlights

The following new plug-ins are available and compatible with `@latest` core CLI: 

- The [Zowe CLI Plug-in for IBM IMS](../user-guide/cli-imsplugin.md) is now available. 
- The [Zowe CLI Plug-in for IBM MQ](https://github.com/zowe/zowe-cli-mq-plugin#zowe-mq-plug-in) is now available.

The following new commands and enhancements are added: 

- Pretend that this is some feature [(#391)](https://github.com/zowe/zowe-cli/pull/391)
-`zos-workflows` group 

- 

## Installing Pre-Release CLI

If you **do not** have Zowe CLI installed on your computer, see [Installing Zowe CLI](../user-guide/cli-installcli.md) to install this version of CLI and plug-ins. 

If you currently have the `@lts-incremetal` version installed, follow these steps to convert to `@latest`:

1. Optional copy profiles into folder. 
2. Use one of the following methods to reinstall the `@latest` version of CLI and plug-ins. 

    - [Download the Zowe CLI Pre-Release package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install the CLI from an online registry](../user-guide/cli-installcli.md). 

    Note: ignore warnings

3. Review the Breaking Changes in the following section, then take corrective action if the changes apply to you. This proceess might involve editing existing scripts or recreating your profiles. 

@latest is installed!

### Breaking changes

This stuff done changed

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
