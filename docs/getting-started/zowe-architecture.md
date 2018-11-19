# Zowe architecture (To be updated)

Zowe is a collection of components that together form a framework that allows Z based functionality to be accessible across an organization. This includes exposing Z based components such as z/OSMF and zSS, as RestAPI's but critically the framework provides an environment into which any other components can be included and exposed to a broader non-Z based audience.

The following diagram depicts the high level Zowe architecture.

![](../images/common/zowe-architecture-highlevel.png)

The following diagram depicts a more comprehensive Zowe architecture.

![](../images/common/zowe-architecture-comprehensive.gif)


## API Mediation Layer
Starting in the middle.... The API Mediation Layer or Zowe Gateway provides several functions but is primarily the single central location at which all your API's converge. This means that instead of your Z system users having to configure access to multiple services and port numbers, they can just plug into one. In an organization with several services potentially some of which are legacy or in cases where services are constantly being redeveloped, the gateway insulates your Z system users from services by using version control for example.

## Explorer Server
The Explorer Server is one of several components that provides important Z functionality related to jobs, files and data sets. It also includes a comprehensive ReactJS based web UI that presents jobs, files and data sets in a navigator UI. The component is written in Java and based around a JEE server and also serves as a template for developing similar applications.

## Zowe Desktop (Zowe Application Server)
The Zowe desktop provides a revolutionary "Operating System" like view of Z providing a single user interface that contains windows and widgets that integrate together "on the glass". The Node based zLUX server supporting the Desktop provides the framework which allows more windows and widgets to be added.

## z/OSMF and zSS services
If present, these functions integrate with the Explorer Server and Zowe Application Server.

## Zowe CLI
The Zowe CLI is not built on but instead runs under Windows, Linux, OSx and so on. Using API's from Zowe, the CLI uses plug-ins that wraps functionality of particular systems such as Z or applications running under Z such as CICS or IMS. This allow users to use specific commands to compete tasks and is particularly applicable when considering automated DevOps processes.
