# Using Zowe Explorer

Familiarize yourself with Zowe Explorer and make the best use of its available options and features.

## Using Zowe Explorer in remote environments

As of Zowe Version 2.11, Zowe Explorer and the Zowe Explorer API no longer use `node-keytar`, which was used to manage mainframe credentials. This change might cause issues for some users when trying to interact with remote environments.

See [Usage in Remote Environments](https://github.com/zowe/zowe-explorer-vscode/wiki/Usage-in-Remote-Environments) to learn more about how to resolve credential errors.

## Credentials in Zowe Explorer

When working in remote or virtualized environments &mdash; such as Eclipse Che, GitHub Codespaces, CodeReady Workspaces &mdash; administrators may find the configuration process for storing credentials securely too cumbersome. Instead, they might prefer to rely on the security tools integrated with these environments, such as file access permissions. To do so, administrators need to disable Zowe Explorer's credential management functionality.

:::note

Consider other options. Use the [Kubernetes Secrets plug-in for Zowe CLI and Zowe Explorer](https://github.com/zowe/zowe-cli-secrets-for-kubernetes/blob/main/README.md) as an option for storing credentials in a Kubernetes containerized environment, or create your own [Custom Credential Managers in Zowe Explorer and Zowe CLI](https://medium.com/zowe/custom-credential-managers-in-zowe-explorer-b37faeee4c29). 

:::

### Preventing Zowe Explorer from storing credentials

1. Open the `zowe.config.json` file in Visual Studio Code.

2. Find the `autoStore` property.
3. Set the `autoStore` property to `false`.

   Credentials are stored on a per profile/per panel basis until one of the following takes place:

   - **Data Sets**/**USS**/**Jobs** tree refresh caused by an update to the `zowe.config.json` file
   - Zowe Explorer refresh in the **Command Palette**
   - Reload of the Visual Studio Code window
   - Closing and reopening the VS Code window

### Disabling Secure Credential Storage of credentials

#### Zowe Explorer V2 and V3

1. Navigate to **Settings** in VS Code.

2. In Zowe Explorer Settings, uncheck the **Zowe Security: Secure Credentials Enabled** checkbox.

   When disabled and `autoStore` is set to True in `zowe.config.json`, z/OS credentials are stored as plain text in the configuration file.
