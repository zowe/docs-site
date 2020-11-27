# Extending Zowe

One of the goals of Zowe is to provide a consistent user experience, common functionality, and interoperability between components including extensions. The Zowe Conformance Program provides the criteria to help accomplish the aforementioned goals. By satisfying the Zowe Conformance Program criteria, extension providers are assured that their software remains functional throughout the Zowe release cycle. For more information, see [Zowe Conformance Program](zowe-conformance-program.md).

Zowe is designed as an extensible tools platform. You can extend Zowe in the following ways:

- Contribute to core functionality
- Extend the Zowe Command-Line Interface (Zowe CLI) by adding commands or building plug-ins.
- Onboard a REST API service to the Zowe API Mediation Layer.
- Add a plug-in to the Zowe Desktop (CLI, zLUX application server, or ZSS service)

**Note:** For more information on the architecture of Zowe, see [Zowe Architecture](../getting-started/zowe-architecture.md).

## Extending Zowe CLI

Zowe CLI extenders can build plug-ins that provide new commands. For more information, see [Developing a new plug-in](extend-cli/cli-developing-a-plugin.md). This article includes a sample plug-in that is provided with the tutorial; see [Installing the sample plug-in](extend-cli/cli-installing-sample-plugin.md).

The CLI is built using Node.js. It is typically run on a machine other than z/OS, such as a PC where it can be driven through a terminal or command prompt, or on an automation machine such as a DevOps pipeline orchestrator. The API Mediation Layer and Zowe Desktop run on z/OS. Support for running the API Mediation Layer and Zowe Desktop off platform might come in a future release of Zowe. 

## Onboarding a REST API service to the API Mediation Layer

REST APIs can be registered with the API Mediation Layer, which makes them available in the API Catalog and for routing through the API Gateway. For information about how to onboard REST APIs, see [Onboarding Overview](extend-apiml/onboard-overview.md). 

Link to API ML Overview

To register a z/OS service with the API Mediation Layer, there are two approaches:
- [dynamic](#dynamic-api-registration)
- [static](#static-api-registration)

### Dynamic API registration

The API Discovery Service component of the API Mediation Layer can be called by the service that wants to register a REST API providing registration data and metadata for that service. In order to register the z/OS service needs to know the web address of the API Discovery Service. 

When Dynamic registration is performed, the service that performing the registration must periodically send heartbeat requests for each registered service instance to the Discovery Service. This allows the Discovery Service to monitor the availabiity of registered service instances.

Services that are registered dynamically display the status of the service in the API catalog after initial service registration. 
Services that are registered statically also appear in the API Catalog, but the status of serivce instances is not displayed. 

For more information about how to build a service which is able to register, see the Onboarding Overview.  

### Static API registration

Instead of the API service calling up to the API Mediation Layer, it is possible to tell the API Mediation Layer about an API service by giving it a static file with details of the z/OS API service.  Zowe documentation refers to this form of registration as onboarding without code changes. In this registration method there is no need to modify the existing API service to have the service call up to the API Mediation Layer. For more information, see [Onboard a REST API without code changes required](extend-apiml/onboard-static-definition.md).

## Adding a plug-in to the Zowe Desktop

The Zowe Desktop allows a user to interact with z/OS applications through a web browser. It is served by the Zowe Application Framework Server on z/OS, also known as Z Lightweight User Experience (ZLUX). The Zowe desktop comes with a set of default applications. You can extend it to add new applications. For more information, see [Developing for Zowe Application Framework](extend-desktop/mvd-extendingzlux.md).

The Zowe Desktop is an angular application that allows native plug-ins to be built that provide for a high level of interoperability with other desktop components.  The React JavaScript toolkit is also supported. Additionally, you can include an existing web application in the Zowe Desktop using an iframe.

**Notes:** For more information, see the following samples:

- [Sample iframe App](extend-desktop/mvd-extendingzlux.md#sample-iframe-app).
- [Sample Angular App](extend-desktop/mvd-extendingzlux.md#sample-angular-app).
- [Sample React App](extend-desktop/mvd-extendingzlux.md#sample-react-app).

## Lifecycling extensions as Zowe address spaces

Zowe is run under the started task `ZWESVSTC` that brings up its address spaces. It is possible to introduce a new micro service to be started and stopped with the Zowe stated task. For more information, see [Lifecycling with Zowe](lifecycling-with-zwesvstc.md).

