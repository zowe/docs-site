# Installation checklist

The following checklists summarize the required steps for a base installation (_first-time installation_) in the order you should perform them. 

The checklist includes a brief description of the steps, with links to the comprehensive information required for the installation. The checklist also identifies the roles that are typically required to complete the step, which enables the pre-installation planning team (systems administrator, DevOps architect, application developer, and so on) to focus on the tasks for which they are responsible. 

Use the Status column to track your progress.

For a printable version of this checklist, <a href="/stable/Zowe_CLI_Installation_Checklist.xlsx" target="_blank">click here</a>.

## Addressing the prerequisites

To plan your Zowe CLI installation, review the following checklist.

| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Review the Zowe CLI information roadmap](../user-guide/user-roadmap-zowe-cli.md) | Learn about various Zowe CLI topics | Systems administrator, application developer, systems programmer, DevOps architect  | **.25** hrs |  |
| [Review the release notes](../getting-started/overview.md) | Read about new features and enhancements included with this release of Zowe CLI | Systems administrator, DevOps architect |  **.25** hours |  || Review the Zowe CLI installation methods | [Determine the installation package to use to install CLI](cli-installcli.md) | Systems administrator |  **.25**hrs |  |
| [Address the requirements](../user-guide/systemrequirements-cli.md) | Install the client-side and host-side software, and ensure that there is sufficient free disk space | Systems administrator | **See Note-1** |  |
| [(Optional) Install API Mediation Layer](../user-guide/install-zos.md) | Install the Zowe Runtime, which includes API Mediation Layer | Systems administrator | **8** hrs |  |
| [Install z/OSMF](https://www.ibm.com/docs/en/zos/2.3.0?topic=configuration-setting-up-zosmf-first-time) | Follow the steps to install z/OSMF | Systems administrator  | **See Note-2** |  |
| [Determine the profile types that you want to use](../user-guide/cli-using-using-profiles.md) | Learn about configuration and how to use team profiles | Systems administrator, DevOps architect | **.25** hrs |  |

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
| [Configure Zowe profiles](../user-guide/cli-using-using-profiles.md) | Learn how to configure Zowe team profiles and  user profiles. | Systems administrator, DevOps architect, application developer | **.25** hrs |  |
| [Configure daemon mode](../user-guide/cli-using-using-daemon-mode.md) | Learn how to configure Zowe CLI to run as persistent background process (daemon). | Systems administrator, DevOps architect, application developer | **.25** hrs |  |
