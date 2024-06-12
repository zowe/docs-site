# Using Zowe Explorer

Familiarize yourself with Zowe Explorer and make the best use of its available options and features.

## Using Zowe Explorer in remote environments

As of Zowe Version 2.11, Zowe Explorer and the Zowe Explorer API no longer use `node-keytar`, which was used to manage mainframe credentials. This change might cause some users issues when trying to interact with remote environments.

See [Usage in Remote Environments](https://github.com/zowe/zowe-explorer-vscode/wiki/Usage-in-Remote-Environments) to learn more about how to resolve credential errors.

## Credentials in Zowe Explorer

**[should we add a section here about (1) creating custom cred manangers, (2) using the kubernetes secrets plug-in, or (3) both?]**

When working in remote or virtualized environments &mdash; such as Eclipse Che, GitHub Codespaces, CodeReady Workspaces &mdash; administrators may find the configuration process for storing credentials securely too cumbersome. Instead, they may prefer to rely on the security tools integrated with these environments, such as file access permissions. To do so, administrators need to disable Zowe Explorer's credential management functionality.

### Preventing Zowe Explorer from storing credentials

1. Open the `zowe.config.json` file in Visual Studio Code.

2. Find the `autoStore` property.
3. Set the `autoStore` property to `false`.

   Credentials will be stored on a per profile/per panel basis until one of the following takes place:

   - **Data Sets**/**USS**/**Jobs** tree refresh caused by an update to the `zowe.config.json` file
   - Zowe Explorer refresh in the **Command Palette**
   - Reload of the Visual Studio Code window
   - Closing and reopening the VS Code window

### Disabling Secure Credential Storage of credentials
**[should there be a V3 section here?]**
#### Zowe Explorer V2 

1. Navigate to **Settings** in VS Code.

2. In Zowe Explorer Settings, uncheck the **Zowe Security: Secure Credentials Enabled** checkbox.

   When disabled and `autoStore` is set to True in `zowe.config.json`, z/OS credentials are stored as plain text in the configuration file.

