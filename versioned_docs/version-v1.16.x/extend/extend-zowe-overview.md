# Extending Zowe

Zowe was designed to be an extensible tools platform. You can extend it in several ways to meet your needs or distribute the plug-ins to users who have already installed Zowe and want to introduce new functionality to it. 

One of the goals of Zowe is to give users a consistent user experience, common functionality, and interoperability when using Zowe that includes the base set of Zowe core functions and plug-ins that are built outside the Zowe community. The Zowe Conformance Program provides a set of criteria to help with this. When followed, it also gives plug-in providers confidence that their software remains functional through Zowe releases. For more information, see [Zowe Conformance Program](zowe-conformance-program.md).

You can extend Zowe in the following ways:

- Extending the Zowe Command Line Interface.
- Adding a REST API service to the API Mediation Layer. 
- Adding a plug-in to the Zowe Desktop.

## Extending the Zowe Command Line Interface

Command Line Interface extensions are able to provide new commands through their own plug-in, see [Developing a new plug-in](extend-cli/cli-developing-a-plugin.md).  There is a sample extension plug-in that is provided together with a tutorial, see [Installing the sample plug-in](extend-cli/cli-installing-sample-plugin.md).  

The command line interface is built using Node.js and is typically run on a machine other than z/OS, such as a PC where it can be driven through a Terminal or command prompt, or on an automation machine such as a DevOps pipeline orchestrator. The API Mediation Layer and Zowe Desktop run on z/OS.  Support for running the API Mediation Layer and Zowe Desktop off platform might come in a future release of Zowe. To understand the architecture of Zowe, see [Zowe Architecture](../getting-started/zowe-architecture.md). 

## Adding a REST API service to the API Mediation Layer

The API Mediation Layer includes an API gateway that acts as a reverse proxy server through which API requests can be routed from clients on its northbound edge to z/OS servers on its southbound edge. The API gateway is extensible so you can add REST APIs for z/OS servers to its list of services. For information about how to onboard REST APIs, see [Onboarding Overview](extend-apiml/onboard-overview.md).  

To register a z/OS server with the API Mediation layer, there are two techniques:
- [dynamic](#dynamic-api-registration)
- [static](#static-api-registration)

### Dynamic API registration

The API Gateway can be called by the server that wants to register their REST APIs through a set of API calls to the API Gateway itself.  To do this, the z/OS server needs to know where the API Gateway is and make the API calls to register or unregister itself.  This knowledge can either be within the z/OS server itself, or more typically is done by introducing a micro service whose task is to register to the API Mediation Layer on behalf of an existing z/OS Service and act as a registration broker.  The coding pattern for the micro service is to create a Java Spring Boot server. For more information, see [Onboarding a Spring Boot based REST API Service](extend-apiml/onboard-spring-boot-enabler.md).  This is a bottom up registration, where the z/OS service beneath the API Mediation Layer is calling up into it to say it is ready to receive API requests as well as information for how it should be rendered on the API catalog.  

The Zowe z/OS started task `ZWESVSTC` that launches the Zowe address spaces allows for extra USS 'microservices' to be lifecycled with it, so that they are started together with Zowe and ended when Zowe started task is stopped. For more information, see [Lifecycling with Zowe](lifecycling-with-zwesvstc.md).  This can be used, for example, to start and stop a dynamic APIML Spring Boot micro service that provides its own APIs or acts as a broker to register APIs on behalf of an existing z/OS server.   

### Static API registration

Instead of having the API service calling up to the API Mediation Layer, it is possible to tell the API Mediation Layer about an API service by giving it a static file with details of the z/OS API service.  This is referred to in the documentation as being able to onboard without code changes, because there is no need to modify the existing API service to have it call up to the API Mediation Layer, or introduce a Spring Boot micro service to do this on its behalf. For more information, see [Onboard a REST API without code changes required](extend-apiml/onboard-static-definition.md).

## Adding a plug-in to the Zowe Desktop

The Zowe Desktop allows a user to interact with z/OS applications through a web browser.  It is served by the Zowe Application Framework Server on z/OS, also known as Z Lightweight User Experience (ZLUX).  The Zowe desktop comes with a set of default applications. You can extend it to add new applications. For more information, see [Developing for Zowe Application Framework](extend-desktop/mvd-extendingzlux.md).  

The Zowe Desktop is an angular application that allows native plug-ins to be built that enjoy a high level of interoperability with other desktop components.  The React JavaScript toolkit is also supported.  In addition, an existing web application can be included in the Zowe Desktop using an iframe.  

- iframe
   
   See [Sample iframe App](extend-desktop/mvd-extendingzlux.md#sample-iframe-app).
- Angular App
   
   See [Sample Angular App](extend-desktop/mvd-extendingzlux.md#sample-angular-app).
- React App

   See [Sample React App](extend-desktop/mvd-extendingzlux.md#sample-react-app).

## Lifecycling extensions as Zowe address spaces

Zowe is run under the started task `ZWESVSTC` that brings up its address spaces.  It is possible to introduce a new micro service to be started and stopped with the Zowe stated task. For more information, see [Lifecycling with Zowe](lifecycling-with-zwesvstc.md).

