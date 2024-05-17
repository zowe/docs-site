# Zowe CLI installation checklist

This checklist outlines the required steps for a first-time installation of Zowe CLI.

:::info Required roles: systems administrator, devops architect, security administrator, systems programmer
:::

The checklist includes a brief description of the steps required for installation of Zowe CLI. The checklist also identifies the roles that are typically required to complete the step, which enables the pre-installation planning team to focus on the tasks for which they are responsible.

For a printable version of this checklist, <a href="/stable/Zowe_CLI_Installation_Checklist.xlsx" target="_blank">click here</a>.

## Preparing for installation

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| Addressing [Zowe CLI software requirements](../user-guide/systemrequirements-cli.md) and [Zowe CLI plug-ins software requirements](../user-guide/cli-swreqplugins.md) | Check the following items: <ul><li>Node.js</li><li>Node Package Manager (npm)</li><li>Disk space</li><li>Plug-in configuration</li></ul> | Systems administrator | 15 min. |
| [Configuring your PC to install from an online registry by proxy](../user-guide/cli-install-configure-install-online-registry-proxy.md) | Configure log-in credential requirements in the NPM configuration file to use a proxy server to download Zowe CLI.| Systems administrator | 15 min. |
| [Configuring z/OSMF](../user-guide/cli-install-configure-zosmf.md) | Confirm that z/OS components, region sizes, and user IDs meet Zowe CLI requirements. | Systems programmer | 40 min. |
| [Configuring z/OSMF security](../user-guide/cli-install-configure-zosmf-security.md) | Configure security for: <ul><li>SAF access to REST endpoints</li><li>z/OS console REST interface</li><li>z/OS data set and file REST services</li></ul>| Security administrator| 50 min.|

## Installing Zowe CLI and Zowe CLI plug-ins

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| Installing Zowe CLI and Zowe CLI plug-ins from [a local package](../user-guide/cli-installcli.md#installing-zowe-cli-and-zowe-cli-plug-ins-from-a-local-package) or <br/>[an NPM public online registry](../user-guide/cli-installcli.md#installing-zowe-cli-and-zowe-cli-plug-ins-from-an-npm-online-registry) | Install Zowe CLI from an online registry or a local package.| Systems administrator | 30 min. |
| [Updating Zowe CLI and Zowe CLI plug-ins](../user-guide/cli-updatingcli.md) | Identify the currently installed version of Zowe CLI and update to the most recent version. Or, revert to a specific previous release of Zowe CLI. | Systems administrator | 30 min. |

## Configuring Zowe CLI

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| [Configuring Zowe CLI environment variables](../user-guide/cli-configuringcli-ev.md) | Set the location of the CLI home directory to contain log files, profiles, and other files.<br/><br/>Set log levels to adjust the detail included in log files.<br/><br/>Set CLI daemon mode properties. | Security administrator and/or <br/>DevOps architect | 15 min. |
| [Initializing team configuration](../user-guide/cli-using-initializing-team-configuration.md) | Create team profiles to streamline profile management in one location:<br/><br/><ul><li>Create service profiles to store connection information for a specific mainframe service.</li><li>Create base profiles to store connection information used with one or more services. </li></ul> | Security administrator and/or <br/>DevOps architect | 15 min. |
| [Configuring daemon mode](../user-guide/cli-using-using-daemon-mode.md) | Enable daemon mode and configure daemon mode properties to run Zowe CLI commands significantly faster. | Security administrator and/or <br/>DevOps architect | 15 min |
| [Verifying your Zowe CLI installation](../user-guide/cli-install-verify-your-installation) | Confirm the connection to z/OSMF.<br/>Access the product help. | Systems administrator and/or <br/>DevOps architect| 15 min. |
