# Overview

The installation of Zowe&trade; consists of the following processes:
- installation of the Zowe server components.

   You can install the components either on z/OS only or you can install the components both on z/OS and on Docker.
   
- installation of Zowe CLI on a desktop computer.

The Zowe server components provide a web desktop that runs a number of applications such as API Mediation Layer that includes the Single Sign-on (SSO) capability, organization of the multiple Zowe servers under a single website, and other useful features for z/OS developers. 

Because Zowe is a set of components, before installing Zowe, use this guide to determine which components you want to install and where you want to install them.

Consider the following scenarios:

- If you will only be using the Zowe CLI on PCs, depending on the plugins being used, you may not need to install the Zowe server components. If you are just using core Zowe CLI groups from your PC, the z/OS you connect to does not required any components of Zowe to be installed on z/OS, unless you want to take advantage of advanced authentication methods such as single sign-on or multi-factor authentication.
- If you are using the Docker technical preview to run the linux parts of Zowe in a container, then you only need to configure Zowe's z/OS component to start the ZSS server.





