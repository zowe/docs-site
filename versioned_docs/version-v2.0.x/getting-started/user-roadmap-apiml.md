# Information roadmap for Zowe API Mediation Layer

This roadmap outlines information resources that are applicable to the various user roles who are interested in Zowe API Mediation Layer. These resources provide information about various subject areas, such as learning basic skills, installation, developing, and troubleshooting for Zowe API Mediation Layer.

The following definition of skill levels about Zowe assist you with gathering the most relevant resources for you. 

* Beginner: You're starting out and want to learn the fundamentals.
* Intermediate: You have some experience but want to learn more in-depth skills. 
* Advanced: You have lots of experience and are looking to learn about specialized topics.

## Fundamentals

> Zowe skill level: Beginner

- [**Zowe API Mediation Layer overview**](overview.md#api-mediation-layer)

   New to API Mediation Layer? This overview topic introduces the key features, main components, benefits, and architecture of the API Mediation Layer.

- [**Architecture**](zowe-architecture.md#zowe-architecture)

   Review the Zowe architecture to understand how the API Mediation Layer works in the Zowe framework.

## Installing

> Zowe skill level: Beginner

- [**System requirements**](../user-guide/systemrequirements-zos.md)

   Review this topic to ensure that your system meets the requirements for installing the API Mediation Layer. The API Mediation Layer is one of the server-side components. 

- [**Planning**](../user-guide/installandconfig.md#planning-the-installation-of-zowe-server-components)

  This article includes details about planning for installation, the Zowe z/OS launch process, and information about the Zowe runtime directory and keystore directory.

- [**Installing API Mediation Layer**](../user-guide/install-zos.md#z-os-installation-roadmap)

   This article provides an overview of the essential steps involved in installing the API Mediation Layer.

## Configuring and updating

> Zowe skill level: Intermediate

- **Configuring API Mediation Layer**

   - [API Gateway configuration parameters](../user-guide/api-mediation/api-mediation-internal-configuration.md)
     
      This article introduces the default configuration of the API Mediation Layer and how to change the parameters to meet your needs. 

   - [Configuring the Zowe APIs](../user-guide/configure-data-sets-jobs-api.md) 

      This article explains how to configure security for the Zowe API Mediation Layer. 

   - [Advanced Gateway features configuration](../user-guide/api-mediation/api-gateway-configuration.md)
      
      This article is for system programmers who want to configure advanced Gateway features of the API Mediation Layer, such as the Gateway retry policy, connection limits, Gateway timeouts, and other advanced Gateway features.

## Using Zowe API Mediation Layer

> Zowe skill level: Intermediate

- [**Using API Catalog**](../user-guide/api-mediation-api-catalog.md)

   Learn how to use the API Catalog to view what services are running in the API Mediation Layer. Through the API Catalog, you can also view associated API documentation corresponding to a service, descriptive information about the service, and the current state of the service. 

- [**Blog: Introducing “Try it out” functionality in the Zowe API Mediation Layer**](https://medium.com/zowe/introducing-try-it-out-functionality-in-the-zowe-api-mediation-layer-930aa9e947bd) 

   This blog describes one key functionality of the Zowe API Mediation Layer to validate that services are returning the expected responses. 

- [**Docs: Zowe API reference guide**](../appendix/zowe-api-reference.md)

   Discover and learn about Zowe APIs that you can use.

## Onboarding APIs

> Zowe skill level: Advanced

- [**Extend Zowe API Mediation Layer**](../extend/extend-zowe-overview.md#extend-zowe-api-mediation-layer) 

   Learn how you can extend the Zowe API Mediation Layer. Extenders make it possible to build and onboard additional API services to the API ML microservices ecosystem. REST APIs can register to the API Mediation Layer, which makes them available in the API Catalog, and for routing through the API Gateway.

- [**Onboarding overview**](../extend/extend-apiml/onboard-overview.md#prerequisites)

   This article provides details about onboarding a REST API service to the Zowe API Mediation Layer. 

- [**Zowe API ML repository**](https://github.com/zowe/zowe-api)

   To start working with the code immediately, check out this code repository. 

## Security

> Zowe skill level: Advanced

- [**API Mediation Layer Security**](../extend/extend-apiml/api-mediation-security.md)

   This article describes how API ML uses Transport Layer Security (TLS). Use this guide to familiarize yourself with the API ML security concepts.

- [**Zowe API Mediation Layer Single-Sign-On Overview**](../extend/extend-apiml/api-mediation-sso.md)

   This article provides an overview of the API ML single-sign-on feature, the principle participants in the SSO process, and links to detailed Zowe SSO documentation.

- [**Blog: The ZAAS Client: a library for the API Mediation Layer**](https://medium.com/zowe/the-zaas-client-a-library-for-the-api-mediation-layer-822ea2994388)

   This blog introduces you to Zowe Authentication and Authorization Service (ZAAS) Client — a library that contains methods for retrieval of JWT tokens, PassTickets, as well as verifying JTW token information.

- [**Blog: Single-Sign-On to z/OS REST APIs with Zowe**](https://medium.com/zowe/single-sign-on-to-z-os-rest-apis-with-zowe-6e35fd022a95)

   This blog takes a deeper dive into the SSO feature of API ML.
   
- [**Blog: Zowe client certificate authentication**](https://medium.com/zowe/zowe-client-certificate-authentication-5f1c7d4d579)   

## Contributing to Zowe API Mediation Layer

> Zowe skill level: Advanced

- [**Contributing guidelines**](https://github.com/zowe/api-layer/blob/master/CONTRIBUTING.md)

   This document is a summary of conventions and best practices for development within Zowe API Mediation Layer.

- [**Conformance Program**](../extend/zowe-conformance-program.md)
   
  This topic introduces the Zowe Conformance Program. Conformance provides Independent Software Vendors (ISVs), System Integrators (SIs), and end users greater confidence that their software will behave as expected. As vendors, you are invited to submit conformance testing results for review and approval by the Open Mainframe Project. If your company provides software based on Zowe CLI, you are encouraged to get certified today.

- [**Blog: Zowe Conformance Program Explained**](https://medium.com/zowe/zowe-conformance-program-7f1574ade8ea)

   This blog describes the Conformance Program in more details.

## Troubleshooting and support

- [**Troubleshooting API ML**](../troubleshoot/troubleshoot-apiml.md)

   Learn about the tools and techniques that are available to help you troubleshoot and resolve problems. You can also find a list of common issues about Zowe API ML. 

- [**Error Message Codes**](../troubleshoot/troubleshoot-apiml-error-codes.md) 

   Use the message code references and the corresponding reasons and actions to help troubleshoot issues.

- [**Sumit an issue**](https://github.com/zowe/api-layer/issues)

   If you have an issue that is specific to Zowe API Mediation Layer, you can submit an issue against the `api-layer` repo.

## Community resources 

- [**Slack channel**](https://openmainframeproject.slack.com/)
   
   Join the #zowe-api Slack channel to ask questions about Zowe API ML, propose new ideas, and interact with the Zowe community. 

- [**Zowe API ML squad meetings**](https://lists.openmainframeproject.org/g/zowe-dev/calendar)

   You can join one of the Zowe API ML squad meetings to get involved.

- [**Zowe Blogs on Medium**](https://medium.com/zowe) 

   Read a series of blogs about Zowe on Medium to explore use cases, best practices, and more. 

- **Community Forums**

   Look for discussion on Zowe topics on the [Open Mainframe Project Community Forums](https://community.openmainframeproject.org/c/zowe).






