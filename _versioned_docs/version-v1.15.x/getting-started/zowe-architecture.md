# Zowe architecture

Zowe&trade; is a collection of components that together form a framework that allows Z-based functionality to be accessible across an organization. This includes exposing Z-based components such as z/OSMF as Rest APIs. The framework provides an environment where other components can be included and exposed to a broader non-Z based audience.

The following diagram depicts the high-level Zowe architecture.

<img src={require("../images/common/zowe-architecture.png").default} alt="Zowe Architecture Diagram" width="700px"/> 

The diagram shows the default port numbers that are used by Zowe.  These are dependent on each instance of Zowe and are held in the Zowe instance directory configuration file `instance.env`. For more information, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md).  

A number of servers run under Unix System Services (USS) on z/OS.  These run under the Zowe started task `ZWESVSTC` that has its own user ID `ZWESVUSR` and include a number of servers each with their own address space.  The `ZWESVSTC` started task has a `STDOUT` file that includes log and trace information for its servers.  Sever error messages are written to `STDERR` and for problem determination. See [Troubleshooting](../troubleshoot/troubleshooting.md).

## ZLUX

The ZLUX Node.js server is also known as the Zowe Application Framework. It provides the Zowe desktop that you can access through a web browser via port 8544. The Zowe desktop includes a number of applications that run inside the ZLUX Zowe Application Framework including a 3270 emulator and a File Editor. 

<img src={require("../images/mvd/zowe-desktop.png").default} alt="Zowe Desktop Diagram" width="600px"/> 

The ZLUX server logs are written to `<INSTANCE_DIR>/logs/appServer-yyyy-mm-dd-hh-mm.log`.  The Zowe Application Framework provides REST APIs for its services that are included on the API catalog tile `Zowe Application Framework` that can be viewed at `https://<ZOWE_HOST_IP>:7554/ui/v1/apicatalog/#/tile/ZLUX/zlux`.

## zssServer

The Zowe desktop delegates a number of its services to the zssServer which it accesses through the http port 8542.  The zssServer is written in metalC and has native calls to z/OS to provide its services.  The zssServer logs are written to `<INSTANCE_DIR>/logs/zssServer-yyyy-mm-dd-hh-mm.log`.  

## API Gateway

The API Gateway is a proxy server that routes requests from clients on its northbound edge, such as web browsers or the Zowe command line interface, to servers on its southbound edge that are able to provide data to serve the request.  It is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.  The API Gateway homepage is `https://<ZOWE_HOST_IP>:7554`, that after authentication allows you to navigate to the API Catalog. 

<img src={require("../images/api-mediation/api-mediationlayer.png").default} alt="Zowe API Mediation Layer" width="600px"/> 

## API Catalog

The API Catalog provides a list of the API services that have registered themselves as catalog tiles.  These allow you to view the available APIs from Zowe's southbound servers as well as test REST API calls.  

<img src={require("../images/api-mediation/api-catalog.png").default} alt="Zowe API Catalog" width="600px"/> 

## API Discovery

The API Discovery server acts as the registration service broker between the API Gateway and its southbound servers.  It can be accessed through the URL `https://<ZOWE_HOST_IP>:7552`.  You can view a list of registered API services on the API discovery homepage. 

<img src={require("../images/api-mediation/api-discovery.png").default} alt="Zowe API Discovery" width="600px"/> 

## MVS, JES, and USS UI

Zowe provides a number of rich GUI web applications for working with z/OS.  This includes the MVS Explorer for data sets, the JES Explorer for jobs, and the USS Explorer for the Unix File System. You can access them through the Zowe desktop.

<img src={require("../images/mvd/desktop-explorers.png").default} alt="Zowe Desktop Explorers" width="600px"/> 

### File API and JES API

The File API server provides a set of REST APIs for working with z/OS data sets and Unix files.  These APIs are used by the MVS and USS Explorer apps.  

The JES API server provides a set of REST APIs for working with JES.  These APIs are used by the JES Explorer application.

Both the File API and JES API servers are registered as tiles on the API catalog, so you can view the Swagger definition and test API requests and responses.

## Cross memory server

Unlike all of the servers described above which run under the `ZWESVSTC` started task as address spaces for USS processes, the cross memory server has its own separate started task `ZWESISTC` and its own user ID `ZWESIUSR` that runs the program `ZWESIS01`.  