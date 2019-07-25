# Release notes - Pre-Release 2.0 

Learn about what is new or changed in the Zowe Pre-Release 2.0 version. **Pre-Release** means that the package contains additional features and enhancements that are not yet included in the current Zowe LTS version.  

## What's new in Zowe CLI and plug-ins

The following new commands and enhancements are added:

- The [Zowe CLI Plug-in for IBM IMS](../user-guide/cli) is now available. [(#391)](https://github.com/zowe/zowe-cli/pull/391) 

The following bugs are fixed:

- pretend that this is some bug fixed [(#391)](https://github.com/zowe/zowe-cli/pull/391)

<!-- ### What's changed -->
<!-- TODO. Fix the link once the doc is ready -->
<!-- - An update script for Zowe is introduced. Now you can update all Zowe applications with the update script. For more information, see [Zowe Update Script](../user-guide/update-zos.md). -->

## Install the Pre-Release version 

Do one of the following: 
- [Download the Zowe CLI Pre-Release package](https://zowe.org/download/) from Zowe.org.
- Follow instructions to [install the CLI from an online registry](../user-guide/cli-installcli.md).

WHAT DO WE NEED TO SAY ABOUT MIGRATING FROM OTHER VERSION?

## Understanding CLI versions

Zowe CLI is associated with version tags in a Node Package Manager (npm) registry. The download packages that you install are associated with a specific tag. You can also use tags in command syntax to install or update the product to a specific version. 

- `@lts-incremental` 
        
    The supported version of the product. Provides new features, enhancements, and bug fixes, but does **not** introduce breaking changes. 

- `@latest` 
    
    The Pre-Release (or forward-development) version of the product. Introduces new features, enhancements, bug fixes, and major breaking changes. If you use this version, y

Learn more about the Zowe CLI versioning scheme [here.](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md)

Learn more about symantic versioning [here.](https://semver.org/)
