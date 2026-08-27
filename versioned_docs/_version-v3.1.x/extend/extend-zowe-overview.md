# Extending Zowe

Zowe is designed as an extensible tools platform. One of the Zowe architecture goals is to provide consistent interoperability between all Zowe components including extensions. The Zowe Conformance Program defines the criteria to help accomplish the aforementioned goal. By satisfying the Zowe Conformance Program criteria, extension providers are assured that their software remains functional throughout the Zowe release cycle. For more information, see the [Zowe Conformance Program](zowe-conformance-program.md).

Zowe can be extended in the following ways:

**[Extending the server side](#extending-the-server-side)**

- [Extending Zowe API Mediation Layer](#extending-zowe-api-mediation-layer)
- [Developing for Zowe Application Framework](#developing-for-zowe-application-framework)

**[Extending the client side](#extending-the-client-side)**

- [Extend Zowe CLI](#extend-zowe-cli)
- [Extend Zowe Explorer](#extend-zowe-explorer)
- [Add a plug-in to the Zowe Desktop](#add-a-plug-in-to-the-zowe-desktop)

To assist with extension development, see the following [Sample extensions](#sample-extensions):

- [Sample Zowe API and API Catalog onboarded service](#sample-zowe-api-and-api-catalog-onboarded-service)
- [Sample Zowe Desktop extension](#sample-zowe-desktop-extension)

## Extending the server side

### Extending Zowe API Mediation Layer 

The API Mediation Layer extension primarily focuses on extending via onboarding services running as standalone services. These services are subsequently available in the API Catalog and can be accessed through the API Gateway. For more information about onboarding a service to the API Mediation Layer, see the [Onboarding Overview](./extend-apiml/onboard-overview.md). The API Mediation Layer squad also provides libraries to simplify the integration for multiple programming languages and different frameworks.

### Developing for Zowe Application Framework

You can create application plug-ins to extend the capabilities of the Zowe™ Application Framework. An application plug-in is an installable set of files that present resources in a web-based user interface, as a set of RESTful services, or in a web-based user interface and as a set of RESTful services.

For more information about developing for Zowe Application Framework, see [Zowe Application Framework overview](./extend-desktop/mvd-extendingzlux.md).

## Extending the client side

### Extend Zowe CLI

Zowe CLI extenders can build plug-ins that provide new commands. Zowe CLI is built using Node.js and is typically run on a machine other than a mainframe, such as a PC, where the CLI can be driven through a terminal or command prompt, or on an automation machine such as a DevOps pipeline orchestrator.

For more information about extending the Zowe CLI, see [Developing a new plug-in](extend-cli/cli-developing-a-plugin.md). This article includes a sample plug-in that is provided with the tutorial; see [Installing the sample plug-in](extend-cli/cli-installing-sample-plugin.md).

### Extend Zowe Explorer

Zowe Explorer provides extension APIs that assist third party extenders to create extensions that access Zowe Explorer resource entities to enrich the user experience. There are many ways Zowe Explorer can be extended to support many different use cases. 

For the kinds of extensions that are supported and how to get started with extending Zowe Explorer, see [Extensions for Zowe Explorer](https://github.com/zowe/zowe-explorer-vscode/wiki/Extending-Zowe-Explorer).

### Add a plug-in to the Zowe Desktop

The Zowe Desktop allows a user to interact with z/OS applications through a web browser. The Desktop is served by the Zowe Application Framework Server on z/OS, also known as Z Lightweight User Experience (ZLUX). The Zowe desktop comes with a set of default applications. You can extend it to add new applications. For more information, see [Developing for Zowe Application Framework](extend-desktop/mvd-extendingzlux.md).

The Zowe Desktop is an angular application that allows native plug-ins to be built that provide for a high level of interoperability with other desktop components.  The React JavaScript toolkit is also supported. Additionally, you can include an existing web application in the Zowe Desktop using an iframe.

**Notes:** For more information, see the following samples:

- [Sample iframe App](extend-desktop/mvd-extendingzlux.md#sample-iframe-app).
- [Sample Angular App](extend-desktop/mvd-extendingzlux.md#sample-angular-app).
- [Sample React App](extend-desktop/mvd-extendingzlux.md#sample-react-app).

## Sample extensions

To help Zowe extenders better understand how extensions are developed and deployed,
we provide a set of sample. These sample extensions contain the necessary boilerplate project setup, application code, and installation scripts to jumpstart the extension development and deployment to Zowe.

**Note:** For more information on the architecture of Zowe, see [Zowe Architecture](../getting-started/zowe-architecture.md).

### Sample Zowe API and API Catalog onboarded service

The service [Discoverable Client](https://github.com/zowe/api-layer/tree/v3.x.x/discoverable-client) within API Mediation Layer repository contains a sample Zowe onboarded service with a Spring Boot server providing sample Helo world APIs. For more information, see [discoverable-client](https://github.com/zowe/api-layer/blob/v3.x.x/discoverable-client/README.md).  

### Sample Zowe Desktop extension

The repository [https://github.com/zowe/sample-trial-app](https://github.com/zowe/sample-trial-app) contains a sample Zowe extension with a node server providing a web page that gives a user interface to the APIs included with the API sample above.  
