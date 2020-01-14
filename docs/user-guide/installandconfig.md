# Planning the installation

The installation of Zowe&trade; consists of two independent processes: installing Zowe runtime on z/OS and installing Zowe CLI on a desktop computer.  

The Zowe CLI is able to connect to z/OS servers and allow tasks to be performed through a command line interface.  The z/OS servers that the Zowe CLI connects to does not have a dependency that the Zowe z/OS component has been installed on those servers.  The Zowe z/OS runtime provides a web desktop that runs in a web browser providing a number of applications for z/OS users, together with an API mediation layer that provides capabilities useful for z/OS developers.  

A desktop computer accessing the Zowe z/OS runtime through a web browser or REST API client does not need to have the Zowe CLI installed.
A desktop computer using the Zowe CLI does not need to hvae the Zowe z/OS runtime installed on the z/OS server.

## Installation roadmap

Installing Zowe involves several steps that you must complete in the order listed. Review the following table that presents the task-flow for preparing your environment and installing and configuring Zowe before you begin the installation process.

For the Zowe z/OS components that is installed on a z/OS server you should review the [System requirements](systemrequirements.md) and follow the steps in [Installing Zowe on z/OS](install-zos.md).  To uninstall Zowe from z/OS server follow the steps in [Uninstalling Zowe from z/OS](uninstall.html#uninstalling-zowe-from-z-os).

To install the Zowe CLI on a desktop computer follow the steps in [Installing Zowe CLI](cli-installcli.md).  To uninstall Zowe CLI follow the steps in [Uninstalling Zowe CLI from the deskop](uninstall.html#uninstalling-zowe-cli-from-the-desktop).

## Planning the installation of Zowe z/OS components

The following information is required during the installation process of the z/OS components.

- The zFS directory where you will install the Zowe runtime files and folders.

- An HLQ that the install can create a load library and samplib containing load modules and JCL samples required to run Zowe.

- Multiple instances of Zowe can be started from the same Zowe z/OS runtime.  Each launch of Zowe has its own zFS directory that is known as an instance directory.  

- Zowe uses a zFS directory to contain its northbound certificate keys as well as a trust store for its southbound keys.  Northbound keys are one presented to clients of the Zowe desktop or Zowe API Gateway, and southbound keys are for servers that the Zowe API gateway connects to.  The certificate directory is not part of the Zowe runtime so that it can be shared between multiple Zowe runtimes and have its permissions secured independently. 

- Zowe has two started tasks. `ZWESVSVR` that brings up the Zowe runtime containing the desktop, the API mediation layer and a number of Zowe applications.  The second started task is `ZWESISTC` which is a cross memory server that the Zowe desktop uses to perform APF authorised code.  More details on the cross memory server are described in the [The Zowe Cross Memory Server](configure-zowe-runtime.html#the-zowe-cross-memory-server).  In order for the two started tasks to run correctly security manager configuration needs to be performed.  This is documented in <JRW TO DO> and a sample JCL member `ZWESECUR` is shipped with Zowe that contains commands for RACF, TopSecret and ACF2 security managers.  

