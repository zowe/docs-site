# Extending Zowe

Zowe is designed as an extensible tools platform. One of the Zowe architecture goals is to provide consistent interoperability between all Zowe components including extensions. The Zowe Conformance Program defines the criteria to help accomplish the aforementioned goal. By satisfying the Zowe Conformance Program criteria, extension providers are assured that their software remains functional throughout the Zowe release cycle. For more information, see the [Zowe Conformance Program](zowe-conformance-program.md).

Zowe can be extended in the following ways:

- [Extend Zowe CLI](#extend-zowe-cli)
- [Extend Zowe API Mediation Layer](#extend-zowe-api-mediation-layer)
  - [Dynamic API registration](#dynamic-api-registration)
  - [Static API registration](#static-api-registration)
- [Add a plug-in to the Zowe Desktop](#add-a-plug-in-to-the-zowe-desktop)
- [Extend Zowe Explorer](#extend-zowe-explorer)

To help Zowe extenders better understand how extensions are developed and deployed,
we provide a set of [sample extensions](#sample-extensions). These sample extensions contain the necessary boilerplate project setup, application code, and installation scripts to jumpstart the extension development and deployment to Zowe.

**Note:** For more information on the architecture of Zowe, see [Zowe Architecture](../getting-started/zowe-architecture.md).

## Extend Zowe CLI

Zowe CLI extenders can build plug-ins that provide new commands. Zowe CLI is built using Node.js and is typically run on a machine other than z/OS, such as a PC, where the CLI can be driven through a terminal or command prompt, or on an automation machine such as a DevOps pipeline orchestrator.

For more information about extending the Zowe CLI, see [Developing a new plug-in](extend-cli/cli-developing-a-plugin.md). This article includes a sample plug-in that is provided with the tutorial; see [Installing the sample plug-in](extend-cli/cli-installing-sample-plugin.md).

## Extend Zowe API Mediation Layer 

Zowe API Mediation Layer extenders can build and onboard additional API services to the API ML microservices ecosystem. REST APIs can register with the API Mediation Layer, which makes them available in the API Catalog and for routing through the API Gateway.  

To register a z/OS service with the API Mediation Layer, there are two approaches:
- [Dynamic API registration](#dynamic-api-registration)
- [Static API registration](#static-api-registration)

For information about how to onboard REST APIs, see the [Onboarding Overview](extend-apiml/onboard-overview.md).

To streamline the process of onboarding new REST API services to the API Mediation Layer, see [Onboarding a REST API service with the YAML Wizard](../user-guide/onboard-wizard.md).

### Dynamic API registration

Registration of a REST API service to the API ML is performed through a call to the Discovery Service by sending registration data and metadata for the service being registered. Registration requires that the z/OS service must know the web address of the API ML Discovery Service. When Dynamic registration is performed, the service that performs the registration must periodically send heartbeat requests to the Discovery Service for each registered service instance. These heartbeat requests serve to renew the corresponding service instance registration with API ML. These requests enable the Discovery Service to monitor the availability of registered service instances. Services that are registered dynamically display the status of the service in the API Catalog after initial service registration.

For more information about how to build a service which is able to register, see the [Onboarding Overview](extend-apiml/onboard-overview.md).  

### Static API registration

For services that cannot be modified to be dynamically discoverable, it is possible onboard them to the API ML by providing the API ML a static definition file with API service details. This registration method does not require modifications to the existing API service code. For more information, see [Onboard a REST API without code changes required](extend-apiml/onboard-static-definition.md). Unlike services that use Dynamic API registration, the status of services onboarded through Static API registration is not displayed in the API Catalog.

## Add a plug-in to the Zowe Desktop

The Zowe Desktop allows a user to interact with z/OS applications through a web browser. The Desktop is served by the Zowe Application Framework Server on z/OS, also known as Z Lightweight User Experience (ZLUX). The Zowe desktop comes with a set of default applications. You can extend it to add new applications. For more information, see [Developing for Zowe Application Framework](extend-desktop/mvd-extendingzlux.md).

The Zowe Desktop is an angular application that allows native plug-ins to be built that provide for a high level of interoperability with other desktop components.  The React JavaScript toolkit is also supported. Additionally, you can include an existing web application in the Zowe Desktop using an iframe.

**Notes:** For more information, see the following samples:

- [Sample iframe App](extend-desktop/mvd-extendingzlux.md#sample-iframe-app).
- [Sample Angular App](extend-desktop/mvd-extendingzlux.md#sample-angular-app).
- [Sample React App](extend-desktop/mvd-extendingzlux.md#sample-react-app).

## Extend Zowe Explorer

Zowe Explorer provides extension APIs that assist third party extenders to create extensions that access Zowe Explorer resource entities to enrich the user experience. There are many ways Zowe Explorer can be extended to support many different use cases. 

For the kinds of extensions that are supported and how to get started with extending Zowe Explorer, see [Extensions for Zowe Explorer](https://github.com/zowe/vscode-extension-for-zowe/blob/master/docs/README-Extending.md).

## Sample extensions

### Sample Zowe API and API Catalog extension

The repository [https://github.com/zowe/sample-node-api](https://github.com/zowe/sample-node-api) contains a sample Zowe extension with a node server providing sample APIs for looking at cars in a dealership. For more information, see [sample-node-api](https://github.com/zowe/sample-node-api/blob/master/README.md).  

### Sample Zowe Desktop extension

The repository [https://github.com/zowe/sample-trial-app](https://github.com/zowe/sample-trial-app) contains a sample Zowe extension with a node server providing a web page that gives a user interface to the APIs included with the API sample above.  
