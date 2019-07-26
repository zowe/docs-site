# Release notes - Pre-Release 2.0 

Learn about what is new or changed in the Zowe Pre-Release 2.0 version. **Pre-Release** means that the package contains additional features and enhancements that are not yet included in the current Zowe LTS version. 

**Note** At this time, Pre-Release only applies to the Zowe CLI component.

## What's new in Zowe CLI and plug-ins

The following new plug-ins are available and compatible with `@latest` core CLI: 

- The [Zowe CLI Plug-in for IBM IMS](../user-guide/cli-imsplugin.md) is now available. 
- The [Zowe CLI Plug-in for IBM MQ](https://github.com/zowe/zowe-cli-mq-plugin#zowe-mq-plug-in) is now available.

The following new commands and enhancements are added: 

- Pretend that this is some feature [(#391)](https://github.com/zowe/zowe-cli/pull/391)

The following bugs are fixed:

- Pretend that this is some bug fixed [(#391)](https://github.com/zowe/zowe-cli/pull/391)

## Installing Pre-Release CLI

If you **do not** currently have Zowe CLI installed, see [Installing Zowe CLI](../user-guide/cli-installcli.md).

If you currently have the `@lts-incremetal` version installed, follow these steps to convert to `@latest`:

1. Follow the procedure to [Uninstall the CLI](../user-guide/). 
2. Use one of the following methods to install the `@latest` version.

    - [Download the Zowe CLI Pre-Release package](https://zowe.org/download/) from Zowe.org.

    - Follow instructions to [install the CLI from an online registry](../user-guide/cli-installcli.md). 

3. Issue the `zowe --help` command to initiate the CLI. This creates the `.zowe` home directory on your computer. You can then recreate CLI profiles manually, or migrate them if you saved profiles to your computer. 

3. Review the Breaking Changes in the following section, then take corrective action if the changes apply to you. 

### Breaking changes

(Review the CE breaking changes and summarize here. Need some help. )

## Understanding CLI versions

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The downloadable packages that you install are associated with a specific tag. You can also use tags in command syntax to install or update the product to a specific version. 

- `npm install -g @zowe/cli@lts-incremental` 
        
    Installs the LTS version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes. 

- `@latest` 
    
    The Pre-Release (or forward-development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, you might have to take corrective action when breaking changes are introduced. 

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
