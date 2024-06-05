# Zowe Explorer installation checklist

This checklist outlines the required steps for a first-time installation of Zowe Explorer.

:::info Required roles: systems administrator, devops architect, security administrator, systems programmer
:::

The checklist includes a brief description of the steps  required for installation of Zowe Explorer. The checklist also identifies the roles that are typically required to complete the step, which enables the pre-installation planning team to focus on the tasks for which they are responsible.

For a printable version of this checklist, <a href="/stable/Zowe_CLI_Installation_Checklist.xlsx" target="_blank">click here</a>.

## Preparing for installation

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
|[Addressing Zowe Explorer system requirements](../getting-started/ZE-system-reqs.md) | Check the following items: <ul><li>your operating system</li><li>development environments</li></ul> | Systems administrator | 15 min. |
| (Optional) [Configuring z/OSMF](../user-guide/cli-install-configure-zosmf.md) | Confirm that z/OS components, region sizes, and user IDs meet Zowe Explorer requirements. <br/> Required step when using a z/OSMF profile connection. | Systems programmer | 40 min. |
| (Optional) [Configuring z/OSMF security](../user-guide/cli-install-configure-zosmf-security.md) | Configure security for: <ul><li>SAF access to REST endpoints</li><li>z/OS console REST interface</li><li>z/OS data set and file REST services</li></ul> Required step when using a z/OSMF profile connection.| Security administrator| 50 min. |
| (Optional) [Installing Zowe CLI](../user-guide/cli-install-cli-checklist) | Set up team configuration with Zowe CLI to communicate with the mainframe. | Systems administrator | 60 min. |

## Installing Zowe Explorer

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| [Installing Zowe Explorer](../user-guide/ze-install#installing-zowe-explorer) and [Zowe Explorer extensions](../user-guide/ze-install.md#installing-zowe-explorer-extensions) | Install Zowe Explorer and Zowe Explorer extensions from the Visual Studio Marketplace or with a `VSIX` file. | Systems administrator and/or developer | 10 min. |
| [Updating Zowe Explorer and Zowe Explorer extensions](../user-guide/ze-install.md#updating-zowe-explorer-and-zowe-explorer-extensions) | Updates are done automatically unless otherwise specified. | Systems administrator and/or developer | 10 min. |

## Configuring Zowe Explorer

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| [Creating Zowe Explorer profiles](../user-guide/ze-profiles.md) | Connect to the mainframe with a Zowe Explorer profile. | Systems administrator | 30 min. |
| [Configuring Zowe Explorer](../user-guide/ze-install-configuring-ze) | Save your preferences as settings. | Developer | 30 min. |
| [Verifying your Zowe Explorer installation](../user-guide/ze-install-verify-your-installation.md) | Confirm the connection to z/OSMF. | Systems administrator and/or DevOps architect | 15 min. |
