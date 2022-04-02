# Installation checklist

The following checklists summarize the required steps for a base installation (_first-time installation_) in the order you should perform them. The checklist includes a brief description of the steps, with links to the comprehensive information required for the installation. The checklist also identifies the roles that are typically required to complete the step, which enables the pre-installation planning team (systems administrator, DevOps architect, application developer, and so on) to focus on the tasks for which they are responsible.

## Address the prerequisites

To plan your Zowe CLI installation, review the following checklist.

| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Review the Zowe CLI information roadmap](../getting-started/user-roadmap-zowe-cli.md) | Learn about how Zowe interacts with other Zowe components | Systems administrator, application developer, systems programmer, DevOps architect  | #hrs | Complete, TBD, NA |
| [Review the release notes](../getting-started/rlease-notes/v1.27.md) | Read about new features and enhancements included with this release of Zowe CLI | Systems administrator, DevOps architect |  #hrs |Complete, TBD, NA || Review the Zowe CLI installation methods | [Determine the installation package to use to install CLI](cli-installcli.md) | Systems administrator |  #hrs | Complete, TBD, NA |
| [Address the requirements](../user-guide/systemrequirements-cli.md) | Install the client-side and host-side software, and ensure that there is sufficient free disk space | Systems administrator | #hrs | Complete, TBD, NA |
| [(Optional) Install API Mediation Layer](../user-guide/install-zos.md) | Install the Zowe Runtime, which includes API Mediation Layer] | Systems administrator | #hrs | Complete, TBD, NA |
| [Install z/OSMF](https://www.ibm.com/docs/en/zos/2.3.0?topic=configuration-setting-up-zosmf-first-time) | Follow the steps to install z/OSMF | Systems administrator  | #hrs | Complete, TBD, NA |
| [Determine the profile types that you want to use](../user-guide/cli-using-using-profiles.md) | Learn about how to use team profiles | Systems administrator, DevOps architect | #hrs | Complete, TBD, NA |

You are now ready to install Zowe CLI!
## Install Zowe CLI

To install Zowe CLI, review the following checklist.

| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Install Zowe CLI](../user-guide/cli-installcli.md) | Install Zowe CLI from an online registry or a local package | Systems administrator |  #hrs | Complete, TBD, NA |
| [Install Zowe CLI (quick start)](../getting-started/cli-getting-started.md) | Use the Quick Start method if you possess prerequisite knowledge of command line tools and writing scripts, and you want to get started with Zowe CLI quickly and easily. | Systems administrator |  #hrs | Complete, TBD, NA |
| [(Optional) Install Zowe CLI plug-ins](../user-guide/cli-installplugins.md) | Install Zowe CLI plug-ins from an online registry or a local package. | Systems administrator |  #hrs | Complete, TBD, NA |

You are now ready to configure Zowe CLI!
## Configure Zowe CLI

To configure Zowe CLI, review the following checklist.

| Step        | Description | Role       | Time Estimate | Status     |
| ----------- | ----------- | ---------- | ------------- | ---------- |
| [Configure environment variables](../user-guide/cli-configuringcli-ev.md) | Learn how to store configuration options that are common to your environment.  | Systems administrator, DevOps architect, application developer | #hrs | Complete, TBD, NA |
| [Configure Zowe profiles](../user-guide/cli-using-using-profiles.md) | Learn how to configure Zowe team profiles and  user profiles. | Systems administrator, DevOps architect, application developer | #hrs | Complete, TBD, NA |
| [Configure daemon mode](../user-guide/cli-using-using-daemon-mode.md) | Learn how to configure Zowe CLI to run as persistent background process (daemon). | Systems administrator, DevOps architect, application developer | #hrs | Complete, TBD, NA |