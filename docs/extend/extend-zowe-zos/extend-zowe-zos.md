# Extending Zowe

Zowe was designed and architected to be an extensible tools platform and provides a number of ways that it can be extended and Third Party Independent Software Vendors (ISVs), System Integrators (SIs), as well as others who wish to augment Zowe by creating plugins.  Plugins can be distibuted to customers who have Zowe already installed, and introduce new functionality to an existing Zowe distribution. 

One of the goals of Zowe is to give users a consistent user experience, common functionality and interopability when using Zowe that includes plugins built outside of the Zowe community.  The Zowe conformance program exists to help with this, by providing a set of criteria that, when followed, also provides plugin proiders confidence that their software will remain functional through Zowe releases, see [How to Participate in the Zowe Conformance Program](https://openmainframeproject.org/projects/zowe/conformance) as well as the [Zowe Conformance Criteria](https://github.com/openmainframeproject/foundation/tree/master/zowe_conformance).

Zowe plugins can be built in three main ways:

- Extending the Zowe Command Line Interface.
- Adding an API service to the API Mediation Layer. 
- Adding a plugin to the Zowe desktop.

## Extending the Zowe Command Line Interface

Command Line Interface extensions are able to provide new commands through their own plugin, see [Developing a new plug-in](../extend-cli/cli-developing-a-plugin.md).  There is a sample extension plug-in provided together with a tutorial, see [Installing the sample plug-in](../extend-cli/cli-installing-sample-plugin.md)

https://docs.zowe.org/stable/extend/extend-cli/cli-devTutorials.html

## Adding an API service to the API Mediation Layer

The API mediation layer provided with Zowe includes an API gateway that acts as a reverse proxy server through which API requests can be routed from clients on its northbound edge to z/OS servers on its southbound edge.  The API gateway is extensible so REST APIs for z/OS servers can be added to its list of services.  There are a number of ways to onboard REST APIs which are covered in [API Mediation Onboard Overview of APIs](../extend-apiml/api-mediation-onboard-overview.md#overview-of-apis).  

To register a z/OS server with the API Mediation layer there are two techniques, [dynamic](#dynamic-api-registration) or [static](#static-api-registration).

### Dynamic API Registration

The API Gateway can be called by the server that wishes to register their APIs, through a set of REST APIs calls to the API Gateway itself.  To do the he z/OS server needs to have knowledge of where the API Gateway is and make the API calls to register itself, as well as unregister.  This knowledge can either be within the z/OS server itself, or more typically is done by introducing a micro service whose task is to register to the API Mediation Layer an existing z/OS Service and act as a registration broker.  The coding pattern for the micro service is to create a Java Springboot server, see [Onboarding a Spring Boot based REST API Service](../extend-apiml/onboard-spring-boot-enabler.md).  This is a bottom up registration, where the z/OS service beneath the API mediation layer is calling up into it to say it is ready to receive API requests as well as information for how it should be rendered on the API catalog.  

The Zowe z/OS started task `ZWESVSTC` that launches the Zowe address spaces allows for additional USS micro services to be lifecycled with it, so that they are started together with Zowe and ended when Zowe started task is stopped, see [Lifecycling with Zowe](./lifecycling-with-zwesvstc.md).  This can be used, for example, to start and stop a dynamic APIML Springboot micro service that is either providing its own APIs or is acting as a broker to register APIs on behalf of an existing z/OS server.   

### Static API Registration

Instead of having the API service calling up to the API Mediation Layer it is possible to tell the API Mediation Layer about an API service by giving it a static file with details of the z/OS API service.  This is refered to in the documentation as being able to onboard without code chanages, because there is no need to modify the existing API service wanting to register have it call up to the API Mediation layer, or introduce a Springboot micro service to do this on its behalf, see [Onboard a REST API without code changes required](../extend-apiml/onboard-static-definition.md).

## Adding a plugin to the Zowe desktop

The Zowe desktop allows a user to interact with z/OS applications through a web browser.  It is served by the Zowe Application Framework Server on z/OS, also known as Z Lightweight User Experience or ZLUX.  The Zowe desktop comes with a set of default applications, and is extensible to allow new applications to be added, see [Developing for Zowe ](../extend-desktop/mvs-extendingzlux.md).  

The Zowe Desktop is an angular application that allows native plugins to be built that enjoy a high level of interopability with other desktop components.  The React JavaScript toolkit is also supported.  In addition an existing web application can be included in the Zowe Desktop using an iframe.  

- iframe, see [Sample iframe App](../extend-desktop/mvd-extendingzlux.md#sample-iframe-app).
- Angular App, see [Sample Angular App](../extend-desktop/mvd-extendingzlux.md#sample-angular-app).
- React App, see[Sample React App](../extend-desktop/mvd-extendingzlux.md#sample-react-app).

Zowe is run under the started task `ZWESVSTC` that brings up its address spaces.  It is possible to introduce a new micro service to be started and stopped with the Zowe stated task, see [Lifecycling with Zowe](./lifecycling-with-zwesvstc.md).

