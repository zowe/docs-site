# Planning and preparing the installation

The installation of Zowe&trade; consists of two independent processes: installing the Zowe runtime on z/OS and installing Zowe CLI on a desktop computer.  

The Zowe z/OS runtime provides a web desktop that runs in a web browser providing a number of applications for z/OS users, together with an API mediation layer that provides capabilities useful for z/OS developers. 

Zowe CLI can connect to z/OS servers and allows tasks to be performed through a command line interface. 

- A desktop computer that accesses the Zowe z/OS runtime through a web browser or REST API client does not need to have Zowe CLI installed.
- The z/OS servers that Zowe CLI connects to does not require the Zowe z/OS components to be installed on those servers. 
- A desktop computer that uses Zowe CLI does not require the Zowe z/OS runtime to be installed on the z/OS server.

## Planning the installation of Zowe z/OS components

The following information is required during the installation process of the Zowe z/OS components.

- The zFS directory where you will install the Zowe runtime files and folders.

- An HLQ that the install can create a load library and samplib containing load modules and JCL samples required to run Zowe.

- Multiple instances of Zowe can be started from the same Zowe z/OS runtime.  Each launch of Zowe has its own zFS directory that is known as an instance directory.  

- Zowe uses a zFS directory to contain its northbound certificate keys as well as a trust store for its southbound keys.  Northbound keys are one presented to clients of the Zowe desktop or Zowe API Gateway, and southbound keys are for servers that the Zowe API gateway connects to.  The certificate directory is not part of the Zowe runtime so that it can be shared between multiple Zowe runtimes and have its permissions secured independently. 

- Zowe has two started tasks. 
   - `ZWESVSVR` brings up the Zowe runtime containing the Zowe desktop, the API mediation layer and a number of Zowe applications.
   - `ZWESISTC` is a cross memory server that the Zowe desktop uses to perform APF authorized code. More details on the cross memory server are described in [Zowe Cross Memory Server](configure-zowe-runtime.html#the-zowe-cross-memory-server). 
   
     In order for the two started tasks to run correctly, security manager configuration needs to be performed.  This is documented in <JRW TO DO> and a sample JCL member `ZWESECUR` is shipped with Zowe that contains commands for RACF, TopSecret, and ACF2 security managers.  

