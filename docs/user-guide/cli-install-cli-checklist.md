# Zowe CLI installation checklist

This checklist outlines the required steps for a first-time installation of Zowe CLI.

The checklist includes a brief description of the steps, with links to more comprehensive information required for the installation. The checklist also identifies the roles that are typically required to complete the step, which enables the pre-installation planning team to focus on the tasks for which they are responsible.

For a printable version of this checklist, <a href="/stable/Zowe_CLI_Installation_Checklist.xlsx" target="_blank">click here</a>.

## Preparing for installation

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| [Addressing software requirements for Zowe CLI and Zowe CLI plug-ins](../user-guide/systemrequirements-cli.md) | Check the following items: <ul><li>Node.js</li><li>Node Package Manager (npm)</li><li>Disk space</li></ul> | systems administrator | 15 min. |
| Downloading products from BBBB | Log in to BBBB to download a self-contained package of Zowe CLI components | systems administrator and <br/> DevOps architect | 10 min. |
| Configuring WHAT to install from an online registry by proxy | Configure log-in credential requirements in the NPM configuration file to use a proxy server to download Zowe CLI.| systems administrator | 15 min. |
| Configuring z/OSMF | Confirm that z/OS components, region sizes, and user IDs meet Zowe CLI requirements | systems programmer | 40 min. |
| Configuring z/OSMF security | Configure security for: <ul><li>SAF access to REST endpoints</li><li>z/OS console REST interface</li><li>z/OS data set and file REST services</li></ul>| security administrator| 50 min.|

## Installing Zowe CLI

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| [Installing Zowe CLI from a local package](../user-guide/cli-installcli.md#install-zowe-cli-from-a-local-package) or <br/>[Install Zowe CLI from an NPM public online registry](../user-guide/cli-installcli.md#install-zowe-cli-from-npm) | Install Zowe CLI from an online registry or a local package.| systems administrator | 30 min. |
| [Updating Zowe CLI and Zowe CLI plug-ins](../user-guide/cli-updatingcli.md) | Identify the currently installed version of Zowe CLI and update to the most recent version. Or, revert to a specific previous release of Zowe CLI. | systems administrator | 30 min. |

## Configuring Zowe CLI

| Step        | Description | Role       | Time Estimate |
| ----------- | ----------- | ---------- | ------------- |
| [Configuring environment variables](../user-guide/cli-configuringcli-ev.md) | Set the location of the CLI home directory to contain log files, profiles, and other files.<br/><br/>Set log levels to adjust the detail included in log files.<br/><br/>Set CLI daemon mode properties. | security administrator and/or DevOps architect | 15 min. |
| [Configuring Zowe profiles](../user-guide/cli-using-initializing-team-configuration.md) | Create team profiles to streamline profile management in one location:<br/><br/><ul><li>Create service profiles to store connection information for a specific mainframe service.</li><li>Create base profiles to store connection information used with one or more services. </li></ul> | security administrator and/or DevOps architect | 15 min. |
| [Configuring daemon mode](../user-guide/cli-using-using-daemon-mode.md) | Enable daemon mode and configure daemon mode properties to run Zowe CLI commands significantly faster. | security administrator and/or DevOps architect | 15 min |
| [Verifying your Zowe CLI installation](../user-guide/cli-install-verify-your-installation) | Confirm the connection to z/OSMF.<br/><br/>Access the product help. | systems administrator and/or DevOps architect| 15 min. |




| 2. [Configuring Zowe profiles](../user-guide/cli-using-initializing-team-configuration.md) | <ul><li>Create team profiles to streamline profile management in one location.</li><li>Create service profiles to store connection information for a specific mainframe service.</li><li>Create base profiles to store connection information used with one or more services.</li></ul> | security administrator and/or DevOps architect | 15 min. |

pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp


| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Review the Zowe CLI information roadmap](../user-guide/user-roadmap-zowe-cli.md) <br/> - [ ] Write the press release | Learn about various Zowe CLI topics | Systems administrator, application developer, systems programmer, DevOps architect  | **.25** hrs |  |
| [Review the release notes](../whats-new/release-notes/release-notes-overview.md) | Read about new features and enhancements included with this release of Zowe CLI | Systems administrator, DevOps architect |  **.25** hours |  || Review the Zowe CLI installation methods | [Determine the installation package to use to install CLI](cli-installcli.md) | Systems administrator |  **.25**hrs |  |
| [Address the requirements](../user-guide/systemrequirements-cli.md) | Install the client-side and host-side software, and ensure that there is sufficient free disk space | Systems administrator | **See Note-1** |  |
| [(Optional) Install API Mediation Layer](../user-guide/install-zos.md) | Install the Zowe Runtime, which includes API Mediation Layer | Systems administrator | **8** hrs |  |
| [Install z/OSMF](https://www.ibm.com/docs/en/zos/2.3.0?topic=configuration-setting-up-zosmf-first-time) | Follow the steps to install z/OSMF | Systems administrator  | **See Note-2** |  |
| [Determine the profile types that you want to use](../user-guide/cli-using-using-team-profiles) | Learn about configuration and how to use team profiles | Systems administrator, DevOps architect | **.25** hrs |  |

**Note-1:** Allow **.25** hours to install the client-side software. The amount of time to install the host-side software depends upon your site's implementation. For example, do you require z/OSMF, REST APIs, or both, to support the Mediation Layer? See the information for the specific server-side software that you require to determine how much time to allow for complete server-side installation and configuration.

**Note-2:** Allow **15** to **25** hours to install and configure z/OSMF. The length of time varies depending on the External Security Manager (ESM) that you are running in your site.

You are now ready to install Zowe CLI!
## Installing Zowe CLI

To install Zowe CLI, review the following checklist.

| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Install Zowe CLI](../user-guide/cli-installcli.md) | Install Zowe CLI from an online registry or a local package | Systems administrator |  **.5** hrs |  |
| [Install Zowe CLI (quick start)](../getting-started/cli-getting-started.md) | Use the Quick Start method if you possess prerequisite knowledge of command line tools and writing scripts, and you want to get started with Zowe CLI quickly and easily. | Systems administrator |  **.25** hrs |  |
| [(Optional) Install Zowe CLI plug-ins](../user-guide/cli-installplugins.md) | Install Zowe CLI plug-ins from an online registry or a local package. | Systems administrator |  **.25** hrs |  |

You are now ready to configure Zowe CLI!
## Configuring Zowe CLI

To configure Zowe CLI, review the following checklist.

| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Configure environment variables](../user-guide/cli-configuringcli-ev.md) | Learn how to store configuration options that are common to your environment.  | Systems administrator, DevOps architect, application developer | **.25** hrs |  |
| [Configure Zowe profiles](../user-guide/cli-using-initializing-team-configuration.md) | Learn how to configure Zowe team profiles and  user profiles. | Systems administrator, DevOps architect, application developer | **.25** hrs |  |
| [Configure daemon mode](../user-guide/cli-using-using-daemon-mode.md) | Learn how to configure Zowe CLI to run as persistent background process (daemon). | Systems administrator, DevOps architect, application developer | **.25** hrs |  |
