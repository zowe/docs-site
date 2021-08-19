# Overview

The installation of Zowe&trade; consists of two independent processes: installing the Zowe server components either entirely on z/OS or a combination of z/OS and Docker, and then installing Zowe CLI on a desktop computer.

The Zowe server components provide a web desktop that runs in a web browser providing a number of applications for z/OS users, together with an API mediation layer provides single-sign on (SSO), organization of the multiple zowe servers under a single website, and other capabilities useful for z/OS developers. 

Because Zowe is a set of components, before installing Zowe, first determine which components you want to install and where you want to install them. This guide provides documentation for all of the components and it is split into sections so you can install as much as you need.

Here are some scenarios to consider:

- If you will only be using the Zowe CLI on PCs, depending on the plugins being used, you may not need to install the Zowe server components. If you are just using core Zowe CLI groups from your PC, the z/OS you connect to does not required any components of Zowe to be installed on z/OS, unless you want to take advantage of advanced authentication methods such as single sign-on or multi-factor authentication.
- If you are using the Docker technical preview to run the linux parts of Zowe in a container, then you only need to configure Zowe's z/OS component to start the ZSS server.





