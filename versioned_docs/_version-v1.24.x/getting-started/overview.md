---
meta:
  - name: description
    content: Zowe is an open source project within the Open Mainframe Project that is part of The Linux Foundation. Zowe is an extensible framework that simplifies and speeds application development, deployment, and operations on z/OS, and provides the ability for extension through CLI plug-ins, new applications to be added to the web desktop, and onboarding of REST APIs to the API Mediation Layer. It narrows the skills gap between new and legacy z/OS developers by offering the choice to work with z/OS either through a Command Line Interface, a Zowe Explorer Visual Studio extension, a web browser served from the Zowe Application Framework, or through REST APIs and web sockets served through the API Mediation Layer.
---

# Zowe overview

Zowe&trade; is an open source software framework that allows mainframe development and operation teams to securely manage, control, script, and develop on the mainframe. It was created to host technologies that benefit the IBM Z platform for all members of the Z community, including Integrated Software Vendors (ISVs), System Integrators, and z/OS consumers. Like Mac or Windows, Zowe comes with a set of APIs and OS capabilities that applications build on and also includes some applications out of the box. Zowe offers modern interfaces to interact with z/OS and allows you to work with z/OS in a way that is similar to what you experience on cloud platforms today. You can use these interfaces as delivered or through plug-ins and extensions that are created by clients or third-party vendors. Zowe is a project within the Open Mainframe Project.

## Zowe demo video

Watch this [video](https://www.youtube.com/embed/NX20ZMRoTtk) to see a quick demo of Zowe. 

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe overview demo" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/7XpOjREP8JU" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

[Download the deck for this video](/Zowe_introduction_video_deck.pptx) | [Download the script](/Zowe_introduction_video_script.txt)

## Component overview

Zowe consists of the following components:

- [Zowe Application Framework](#zowe-application-framework)
- [API Mediation Layer](#api-mediation-layer)
- [Zowe CLI](#zowe-cli)
- [Zowe Explorer](#zowe-explorer)
- [Zowe Client Software Development Kits SDKs](#zowe-client-software-development-kits-sdks)
- [Zowe Launcher](#zowe-launcher)
- [ZEBRA (Zowe Embedded Browser for RMF/SMF and APIs) - Incubator](#zebra-zowe-embedded-browser-for-rmfsmf-and-apis---incubator)

### Zowe Application Framework

A web user interface (UI) that provides a virtual desktop containing a number of apps allowing access to z/OS function.  Base Zowe includes apps for traditional access such as a 3270 terminal and a VT Terminal, as well as an editor and explorers for working with JES, MVS Data Sets and Unix System Services.

<details>
<summary> Learn more </summary>

The Zowe Application Framework modernizes and simplifies working on the mainframe. With the Zowe Application Framework, you can create applications to suit your specific needs. The Zowe Application Framework contains a web UI that has the following features:

- The web UI works with the underlying REST APIs for data, jobs, and subsystem, but presents the information in a full screen mode as compared to the command line interface.
- The web UI makes use of leading-edge web presentation technology and is also extensible through web UI plug-ins to capture and present a wide variety of information.
- The web UI facilitates common z/OS developer or system programmer tasks by providing an editor for common text-based files like REXX or JCL along with general purpose data set actions for both Unix System Services (USS) and Partitioned Data Sets (PDS) plus Job Entry System (JES) logs.

The Zowe Application Framework consists of the following components:

- **Zowe Desktop**

    The desktop, accessed through a browser.  The desktop contains a number of applications, including a TN3270 emulator for traditional Telnet or TLS terminal access to z/OS, a VT Termnial for SSH commands, as well as rich web GUI applications including a JES Explorer for working with jobs and spool output, a File Editor for working with USS directories and files and MVS data sets and members.   The Zowe desktop is extensible and allows vendors to provide their own applications to run within the desktop. See [Extending the Zowe Desktop](../extend/extend-desktop/mvd-extendingzlux.md).  The following screen capture of a Zowe desktop shows some of its composition as well as the TN3270 app, the JES Explorer, and the File Editor open and in use.

    ![Zowe Desktop Screen Capture](./diagrams/zowe-desktop-sample.png)

- **Zowe Application Server**

    The Zowe Application Server runs the Zowe Application Framework. It consists of the Node.js server plus the Express.js as a webservices framework, and the proxy applications that communicate with the z/OS services and components.

- **ZSS Server**

    The ZSS Server provides secure REST services to support the Zowe Application Server.  For services that need to run as APF authorized code, Zowe uses an angel process that the ZSS Server calls using cross memory communication.  During installation and configuration of Zowe, you will see the steps needed to configure and launch the cross memory server.

- **Application plug-ins**

    Several application-type plug-ins are provided. For more information, see [Using the Zowe Application Framework application plug-ins](../user-guide/mvd-using.md#zowe-desktop-application-plug-ins).

</details>

### API Mediation Layer

Provides a gateway that acts as a reverse proxy for z/OS services, together with a catalog of REST APIs and a dynamic discovery capability. Base Zowe provides core services for working with MVS Data Sets, JES, as well as working with z/OSMF REST APIs.  The API Mediation Layer also provides a framework for [Single Sign On (SSO)](../extend/extend-apiml/api-mediation-sso#zowe-api-mediation-layer-single-sign-on-overview).

<details>
<summary> Learn more </summary>

The API Mediation Layer provides a single point of access for mainframe service REST APIs. The layer offers enterprise, cloud-like features such as high-availability, scalability, dynamic API discovery, consistent security, a single sign-on experience, and documentation. The API Mediation Layer facilitates secure communication across loosely coupled microservices through the API Gateway. The API Mediation Layer consists of three components: the Gateway, the Discovery Service, and the Catalog. The Gateway provides secure communication across loosely coupled API services. The Discovery Service enables you to determine the location and status of service instances running inside the API ML ecosystem. The Catalog provides an easy-to-use interface to view all discovered services, their associated APIs, and Swagger documentation in a user-friendly manner.

#### Key features
* Consistent Access: API routing and standardization of API service URLs through the Gateway component provides users with a consistent way to access mainframe APIs at a predefined address.
* Dynamic Discovery: The Discovery Service automatically determines the location and status of API services.
* High-Availability: API Mediation Layer is designed with high-availability of services and scalability in mind.
* Caching Service: This feature is designed for Zowe components in a high availability configuration. It supports the High Availability of all components within Zowe, allowing components to be stateless by providing a mechanism to offload their state to a location accessible by all instances of the service, including those which just started.
* Redundancy and Scalability: API service throughput is easily increased by starting multiple API service instances without the need to change configuration.
* Presentation of Services: The API Catalog component provides easy access to discovered API services and their associated documentation in a user-friendly manner. Access to the contents of the API Catalog is controlled through a z/OS security facility.
* Encrypted Communication: API ML facilitates secure and trusted communication across both internal components and discovered API services.

#### API Mediation Layer architecture
The following diagram illustrates the single point of access through the Gateway, and the interactions between API ML components and services:

![API Mediation Layer Architecture diagram](./diagrams/apiml-architecture.png)

#### Components
The API Layer consists of the following key components:

**API Gateway**

Services that comprise the API ML service ecosystem are located behind a gateway (reverse proxy). All end users and API client applications interact through the Gateway. Each service is assigned a unique service ID that is used in the access URL. Based on the service ID, the Gateway forwards incoming API requests to the appropriate service. Multiple Gateway instances can be started to achieve high-availability. The Gateway access URL remains unchanged. The Gateway is built using Netflix Zuul and Spring Boot technologies.

**Discovery Service**

The Discovery Service is the central repository of active services in the API ML ecosystem. The Discovery Service continuously collects and aggregates service information and serves as a repository of active services. When a service is started, it sends its metadata, such as the original URL, assigned serviceId, and status information to the Discovery Service. Back-end microservices register with this service either directly or by using a Eureka client. Multiple enablers are available to help with service on-boarding of various application architectures including plain Java applications and Java applications that use the Spring Boot framework. The Discovery Service is built on Eureka and Spring Boot technology.

**Discovery Service TLS/SSL**

HTTPS protocol can be enabled during API ML configuration and is highly recommended. Beyond encrypting communication, the HTTPS configuration for the Discovery Service enables heightened security for service registration. Without HTTPS, services provide a username and password to register in the API ML ecosystem. When using HTTPS, only trusted services that provide HTTPS certificates signed by a trusted certificate authority can be registered.

**API Catalog**

The API Catalog is the catalog of published API services and their associated documentation. The Catalog provides both the REST APIs and a web user interface (UI) to access them. The web UI follows the industry standard Swagger UI component to visualize API documentation in OpenAPI JSON format for each service. A service can be implemented by one or more service instances, which provide exactly the same service for high-availability or scalability.

**Catalog Security**

Access to the API Catalog can be protected with an Enterprise z/OS Security Manager such as IBM RACF, ACF2, or Top Secret. Only users who provide proper mainframe credentials can access the Catalog. Client authentication is implemented through the z/OSMF API.

**Caching Service**

It provides an API in high-availability mode which offers the possibility to store, retrieve and delete data associated with keys. The service will be used only by internal Zowe applications and will not be exposed to the internet.

#### Onboarding APIs
Essential to the API Mediation Layer ecosystem is the API services that expose their useful APIs. Use the following topics to discover more about adding new APIs to the API Mediation Layer and using the API Catalog:

* [Onboarding Overview](../extend/extend-apiml/onboard-overview.md)
* [Onboard an existing Spring Boot REST API service using Zowe API Mediation Layer](../extend/extend-apiml/onboard-spring-boot-enabler.md)
* [Onboard an existing Node.js REST API service using Zowe API Mediation Layer](../extend/extend-apiml/onboard-nodejs-enabler.md)
* [Using API Catalog](../user-guide/api-mediation-api-catalog.md)

</details>

To learn more about the architecture of Zowe, see [Zowe architecture](zowe-architecture.md).

### Zowe CLI
Zowe CLI is a command-line interface that lets you interact with the mainframe in a familiar, off-platform format. Zowe CLI helps to increase overall productivity, reduce the learning curve for developing mainframe applications, and exploit the ease-of-use of off-platform tools. Zowe CLI lets you use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. Though its ecosystem of plug-ins, you can automate actions on systems such as IBM Db2, IBM CICS, and more. It  provides a set of utilities and services for users that want to become efficient in supporting and building z/OS applications quickly.

<details>
<summary> Learn more </summary>

Zowe CLI provides the following benefits:

- Enables and encourages developers with limited z/OS expertise to build, modify, and debug z/OS applications.
- Fosters the development of new and innovative tools from a computer that can interact with z/OS. Some Zowe extensions are powered by Zowe CLI, for example the [Visual Studio Code Extension for Zowe](../user-guide/ze-install.md).
- Ensure that business critical applications running on z/OS can be maintained and supported by existing and generally available software development resources.
- Provides a more streamlined way to build software that integrates with z/OS.

**Note:** For information about software requirements, installing, and upgrading Zowe CLI, see
[Installing Zowe](../user-guide/installandconfig.md).

#### Zowe CLI capabilities

With Zowe CLI, you can interact with z/OS remotely in the following ways:

- **Interact with mainframe files:**
    Create, edit, download, and upload mainframe files (data sets) directly from Zowe CLI.
- **Submit jobs:**
    Submit JCL from data sets or local storage, monitor the status, and view and download the output automatically.
- **Issue TSO and z/OS console commands:**
    Issue TSO and console commands to the mainframe directly from Zowe CLI.
- **Integrate z/OS actions into scripts:**
    Build local scripts that accomplish both mainframe and local tasks.
- **Produce responses as JSON documents:**
    Return data in JSON format on request for consumption in other programming languages.

For detailed information about the available functionality in Zowe CLI, see [Zowe CLI Command Groups](../user-guide/cli-usingcli#understanding-core-command-groups).

For information about extending the functionality of Zowe CLI by installing plug-ins, see [Extending Zowe CLI](../user-guide/cli-extending.md).

**More Information:**

- [System requirements for Zowe CLI](../user-guide/systemrequirements-cli.md)
- [Installing Zowe CLI](../user-guide/cli-installcli.md)

</details>

### Zowe Explorer

Zowe Explorer is a Visual Studio Code extension that modernizes the way developers and system administrators interact with z/OS mainframes. Zowe Explorer lets you interact with data sets, USS files, and jobs that are stored on z/OS. The extension complements your Zowe CLI experience and lets you use authentication services like API Mediation Layer. The extension provides the following benefits:

- Enabling you to create, modify, rename, copy, and upload data sets directly to a z/OS mainframe.
- Enabling you to create, modify, rename, and upload USS files directly to a z/OS mainframe.
- Providing a more streamlined way to access data sets, uss files, and jobs.
- Letting you create, edit, and delete Zowe CLI `zosmf` compatible profiles.
- Letting you use the Secure Credential Store plug-in to store your credentials securely in the settings.
- Letting you leverage the API Mediation Layer token-based authentication to access z/OSMF.

For more information, see [Information roadmap for Zowe Explorer](user-roadmap-zowe-explorer.md).

### Zowe Client Software Development Kits (SDKs)

The Zowe Client SDKs consist of programmatic APIs that you can use to build client applications or scripts that interact with z/OS. The following SDKs are available:

- Zowe Node.js Client SDK
- Zowe Python Client SDK

For more information, see [Using the Zowe SDKs](../user-guide/sdks-using.md).

### Zowe Launcher

Provides an advanced launcher for Zowe z/OS server components in a high availability configuration. It performs the following operations:

- Stopping the Zowe server components using the `STOP` (or `P`) operator command
- Stopping and starting specific server components without restarting the entire Zowe instance using `MODIFY` (or `F`) operator command

### ZEBRA (Zowe Embedded Browser for RMF/SMF and APIs) - Incubator 

Provides re-usable and industry compliant JSON formatted RMF/SMF data records, so that many other ISV SW and users can exploit them using open-source SW for many ways.

For more information, see the [ZEBRA documentation](https://github.com/zowe/zebra/tree/main/Documentation) or visit the [ZEBRA test/trial site](https://zebra.talktothemainframe.com/).

### Zowe Workflow wiZard - Incubator

The Workflow wiZard delivers a workflow builder which simplifies the creation of z/OSMF workflows. The workflow builder reads a library of templates along with a set of properties, determines which steps are necessary based upon rules that use property values, determines a suitable order to satisfy the workflow engine requirements, inserts variable definitions when required, and outputs workflow XML.

For more information, see the [Workflow Template Reference](https://github.com/zowe/workflow-wizard/raw/main/doc/Workflow%20Templates%20Reference.docx).

## Zowe Third-Party Software Requirements and Bill of Materials

<!-- 

<tpsr /> is a React component which will create a dynamic link to latest versioned tpsr file
tpsrLatestLink = "https://github.com/zowe/docs-site/tree/master/src/tpsr/tpsr-" + latestVersion + ".md";
This returns <a href={tpsrLatestLink}>Third-Party Software Requirements (TPSR)</a>

-->

- <tpsr />
- [Bill of Materials (BOM)](../appendix/bill-of-materials.md)
