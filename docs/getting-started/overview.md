---
meta:
  - name: description
    content: Zowe is an open source project within the Open Mainframe Project that is part of The Linux Foundation. Zowe is an extensible framework that simplifies and speeds application development, deployment, and operations on z/OS, and provides the ability for extension through CLI plug-ins, new applications to be added to the web desktop, and onboarding of REST APIs to the API Mediation Layer. It narrows the skills gap between new and legacy z/OS developers by offering the choice to work with z/OS either through a Command Line Interface, a Zowe Explorer Visual Studio extension, a web browser served from the Zowe Application Framework, or through REST APIs and web sockets served through the API Mediation Layer.
---

# Zowe overview

Zowe&trade; is an open source software which provides both an extensible framework, and a set of tools that allow mainframe development and operation teams to securely manage, develop, and automate resources and services on z/OS family mainframes.
Zowe offers modern interfaces to interact with z/OS and allows users to interact with the mainframe system in a way that is similar to what they experience on cloud platforms today.
Users can work with these interfaces as delivered or through plug-ins and extensions created by customers or third-party vendors.
All members of the IBM Z platform community, including Independent Software Vendors (ISVs), System Integrators, and z/OS consumers, benefit from the modern and open approach to mainframe computing delivered by Zowe.

Zowe is a member of the Open Mainframe Project governed by Linux Foundation&trade;.

## Zowe demo video

Watch this [video](https://www.youtube.com/embed/NX20ZMRoTtk) to see a quick demo of Zowe. 

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe overview demo" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/7XpOjREP8JU" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"> </iframe>

[Download the deck for this video](/Zowe_introduction_video_deck.pptx) | [Download the script](/Zowe_introduction_video_script.txt)
## Zowe component overview

Zowe is comprised of the following server-side and client-side components:

### Zowe API Mediation Layer (API ML)

Zowe API Mediation Layer (API ML) is a Zowe server-side component which provides a secure, single point of access for mainframe infrastructure REST APIs (such as MVS Data Sets, JES, and z/OSMF). Acting as a reverse proxy, API ML bridges the gap between client applications and backend mainframe microservices by securely routing incoming requests to the appropriate underlying service.

To facilitate communication between these loosely coupled clients and services, API ML supports a variety of API protocols, including REST, GraphQL, and WebSocket.
  
API ML consists of the following core components: 

* **API Gateway**  
The API Gateway provides secure routing of API requests from clients to registered API services.
* **Discovery Service**  
The Discovery Service allows dynamic registration of microservices and enables their discoverability and status updates.
* **API Catalog**  
The API Catalog provides a user-friendly interface to view and try out all registered services, read their associated APIs documentation in OpenAPI/Swagger format.
* **Caching Service**  
The Caching Service allows components to store, search and retrieve their state. The Caching service can be configured to store the cached data using various backends, although the recommended storage system is Infinispan. 
* **Zowe Authorization and Authentication Service (ZAAS)**  
ZAAS is the core security component responsible for handling user authentication and enabling Single Sign-On (SSO) across the mainframe services registered with Zowe API ML. 

<details>
<summary>Click here for more information about Zowe API Mediation Layer.</summary>

#### Key features
* **Consistent Access:**  
API routing and standardization of API service URLs through the Gateway component provides users with a consistent way to access mainframe infrastructure REST APIs at a predefined address.
* **Dynamic Discovery:**  
The Discovery Service automatically determines the location and status of API services.
* **High-Availability:**  
API Mediation Layer is designed with high-availability of services and scalability in mind.
* **Caching Service:**  
This feature is designed for Zowe components in a high availability configuration, and supports high availability of all components within Zowe. As such, components can remain stateless whereby the state of the component is offloaded to a location accessible by all instances of the service, including those which just started.
* **Redundancy and Scalability:**  
API service throughput is easily increased by starting multiple API service instances without the need to change configuration.
* **Presentation of Services:**  
The API Catalog component provides easy access to discovered API services and their associated documentation in a user-friendly manner. 
* **Encrypted Communication:**  
API ML facilitates secure and trusted communication across both internal components and discovered API services.

#### API Mediation Layer structural architecture
The following diagram illustrates the single point of access through the API Gateway, and the interactions between API ML components and services:

![API Mediation Layer Architecture diagram](../images/api-mediation/api-ml-architecture1.png)

#### API Mediation Layer Components
The API ML consists of the following key components:

**API Gateway**  
Services that comprise the API ML service ecosystem are located behind a gateway (reverse proxy). All end users and API 
client applications interact through the API Gateway. Each service is assigned a unique service ID that is used in the access URL. 
Based on the service ID, the Gateway forwards incoming API requests to the appropriate service. Multiple Gateway instances 
can be started to achieve high-availability. The Gateway access URL remains unchanged. The API Gateway is built on Spring
Cloud Gateway and Spring Boot technology.

**Discovery Service**  
The Discovery Service is the central repository of active services in the API ML ecosystem. The Discovery Service 
continuously collects and aggregates service information and serves as a repository of active services. When a service is 
started, the service sends its metadata, such as the original URL, assigned serviceId, and status information to the Discovery Service. 
Back-end microservices register with the Discovery Service either directly or by using a Eureka client. Multiple enablers are 
available to help with service on-boarding of various application architectures including plain Java applications and 
Java applications that use the Spring Boot framework. The Discovery Service is built on Eureka and Spring Boot technology.

**API Catalog**  
The API Catalog is the catalog of published API services and their associated documentation. The API Catalog provides both 
the REST APIs and a web user interface (UI) to access these services. The web UI follows the industry standard Swagger UI component 
to visualize API documentation in OpenAPI JSON format for each service. A service can be implemented by one or more service 
instances, which provide exactly the same service for high-availability or scalability. API Catalog requires authentication
from the accessing user. 

**Caching Service**  
The Caching Service provides a centralized, in-memory key-value store API that offers the possibility to store, retrieve, and delete data associated with keys. The Caching Service enables state sharing across API ML, which is essential for running API ML in high-availability (HA) mode. Because components like the API Gateway and Discovery Service are designed to be stateless, these services rely on the Caching Service to share critical, time-sensitive data, such as user authentication sessions, JWTs, and routing information, across multiple instances. By decoupling state from the individual service instances, the Caching Service ensures that if one instance of a component goes down, other instances can seamlessly pick up the context without disrupting the end-user experience or requiring the user to re-authenticate. The Caching Service is built on Spring Boot technology.

**Zowe Authentication and Authorization Service (ZAAS)**  
ZAAS is the centralized security and identity provider for Zowe API ML. ZAAS handles user authentication by securely validating mainframe credentials and Multi-Factor Authentication (MFA) against underlying z/OS security managers (such as RACF, ACF2, or Top Secret). Upon successful authentication, ZAAS issues a JSON Web Token (JWT) that enables Single Sign-On (SSO), allowing end users to access all registered REST APIs without having to repeatedly provide credentials. To support integration with legacy mainframe back-end services that do not natively support JWTs, ZAAS can also dynamically generate PassTickets. ZAAS accommodates complex integration scenarios through SAF identity mapping, which translates external credentials like x509 client certificates or OAuth tokens into valid mainframe identities. ZAAS features Personal Access Token (PAT) management, empowering users to generate scoped, long-lived credentials for automated scripts and CI/CD pipelines without requiring interactive login. ZAAS is built on Spring Boot technology and integrates closely with the API Gateway to secure incoming requests.

#### Onboarding APIs
Essential to the API Mediation Layer ecosystem is the API services that expose their useful APIs. Use the following topics 
to learn more about adding new APIs to the API Mediation Layer and using the API Catalog:

* [Onboarding Overview](../extend/extend-apiml/onboard-overview.md)
* [Onboarding a Spring Boot based REST API service](../extend/extend-apiml/onboard-spring-boot-enabler.md)
* [Onboarding a Micronaut based REST API service](../extend/extend-apiml/onboard-micronaut-enabler.md)
* [Onboard an existing Node.js based REST API service](../extend/extend-apiml/onboard-nodejs-enabler.md)
* [Onboard an existing Python based REST API service](../extend/extend-apiml/onboard-python-enabler.md)
* [Onboarding a REST of GraphQL API without code changes required](../extend/extend-apiml/onboard-static-definition.md)
* [Using API Mediation Layer](../user-guide/api-mediation/using-api-mediation-layer.md)

To learn more about the architecture of Zowe, see [Zowe architecture](zowe-architecture.md).

</details>
<br />

### Zowe Application Framework

A web user interface (UI) that provides a virtual desktop containing a number of apps allowing access to z/OS function.  Base Zowe includes apps for traditional access such as a 3270 terminal and a VT Terminal, as well as an editor and explorers for working with JES, MVS Data Sets and Unix System Services.

<details>
<summary>Click here for more information about Zowe Application Framework.</summary>

The Zowe Application Framework modernizes and simplifies working on the mainframe. With the Zowe Application Framework, you can create applications to suit your specific needs. The Zowe Application Framework contains a web UI that has the following features:

- The web UI works with the underlying REST APIs for data, jobs, and subsystem, but presents the information in a full screen mode as compared to the command line interface.
- The web UI makes use of leading-edge web presentation technology and is also extensible through web UI plug-ins to capture and present a wide variety of information.
- The web UI facilitates common z/OS developer or system programmer tasks by providing an editor for common text-based files like REXX or JCL along with general purpose data set actions for both Unix System Services (USS) and Partitioned Data Sets (PDS) plus Job Entry System (JES) logs.

The Zowe Application Framework consists of the following components:

* **Zowe Desktop**  
The desktop, accessed through a browser.  The desktop contains a number of applications, including a TN3270 emulator for traditional Telnet or TLS terminal access to z/OS, a VT Terminal for SSH commands, as well as rich web GUI applications including a JES Explorer for working with jobs and spool output, a File Editor for working with USS directories and files and MVS data sets and members.   The Zowe desktop is extensible and allows vendors to provide their own applications to run within the desktop. See [Extending the Zowe Desktop](../extend/extend-desktop/mvd-extendingzlux.md).  The following screen capture of a Zowe desktop shows some of its composition as well as the TN3270 app, the JES Explorer, and the File Editor open and in use.

![Zowe Desktop Screen Capture](./diagrams/zowe-desktop-sample.png)

* **Zowe Application Server**  
The Zowe Application Server runs the Zowe Application Framework. It consists of the Node.js server plus the Express.js as a webservices framework, and the proxy applications that communicate with the z/OS services and components.

* **ZSS Server**  
The ZSS Server provides secure REST services to support the Zowe Application Server.  For services that need to run as APF authorized code, Zowe uses an angel process that the ZSS Server calls using cross memory communication.  During installation and configuration of Zowe, you will see the steps needed to configure and launch the cross memory server.

* **Application plug-ins**  
Several application-type plug-ins are provided. For more information, see [Using the Zowe Application Framework application plug-ins](../user-guide/mvd-using.md#zowe-desktop-application-plugins).

</details>
<br />

:::tip
Use the Zowe Launcher to launch Zowe z/OS server components in a high availability configuration. ZOwe Launcher performs the following operations:

- Start all Zowe server components using the `START` (or `S`) operator command.
- Stop Zowe server components using the `STOP` (or `P`) operator command.
- Stop and start specific server components without restarting the entire Zowe instance using `MODIFY` (or `F`) operator command.
:::
<br />

### Zowe CLI
Zowe CLI is a command-line interface that lets you interact with the mainframe in a familiar, off-platform format. Zowe CLI helps to increase overall productivity, reduce the learning curve for developing mainframe applications, and exploit the ease-of-use of off-platform tools. Zowe CLI lets you use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. Though its ecosystem of plug-ins, you can automate actions on systems such as IBM Db2, IBM CICS, and more. It  provides a set of utilities and services for users that want to become efficient in supporting and building z/OS applications quickly.

<details>
<summary>Click here for more information about Zowe CLI.</summary>

Zowe CLI provides the following benefits:

- Enables and encourages developers with limited z/OS expertise to build, modify, and debug z/OS applications.
- Fosters the development of new and innovative tools from a computer that can interact with z/OS. Some Zowe extensions are powered by Zowe CLI, for example the [Visual Studio Code Extension for Zowe](../user-guide/ze-install.md).
- Ensure that business critical applications running on z/OS can be maintained and supported by existing and generally available software development resources.
- Provides a more streamlined way to build software that integrates with z/OS.

**Note:** For information about software requirements, installing, and upgrading Zowe CLI, see
[Installing Zowe](../user-guide/installandconfig.md).

#### Zowe CLI capabilities

With Zowe CLI, you can interact with z/OS remotely in the following ways:

- **Interact with mainframe files**  
    Create, edit, download, and upload mainframe files (data sets) directly from Zowe CLI.
- **Submit jobs**  
    Submit JCL from data sets or local storage, monitor the status, and view and download the output automatically.
- **Issue TSO and z/OS console commands**  
    Issue TSO and console commands to the mainframe directly from Zowe CLI.
- **Integrate z/OS actions into scripts**  
    Build local scripts that accomplish both mainframe and local tasks.
- **Produce responses as JSON documents**  
    Return data in JSON format on request for consumption in other programming languages.

For detailed information about the available functionality in Zowe CLI, see [Zowe CLI Command Groups](../user-guide/cli-using-understanding-core-command-groups.md).

For information about extending the functionality of Zowe CLI by installing plug-ins, see [Extending Zowe CLI](../user-guide/cli-extending.md).

**More Information about Zowe CLI:**

- [System requirements for Zowe CLI](../user-guide/systemrequirements-cli.md)
- [Installing Zowe CLI](../user-guide/cli-installcli.md)

</details>
<br />

### Zowe Explorer

Zowe Explorer is a Visual Studio Code extension that modernizes the way developers and system administrators interact with z/OS mainframes. Zowe Explorer lets you interact with data sets, USS files, and jobs that are stored on z/OS. The extension complements your Zowe CLI experience and lets you use authentication services like API Mediation Layer. 

<details>
<summary>Click here for more information about Zowe Explorer.</summary>

Zowe Explorer provides the following benefits:

- Enables you to create, modify, rename, copy, and upload data sets directly to a z/OS mainframe.
- Enables you to create, modify, rename, and upload USS files directly to a z/OS mainframe.
- Provides a more streamlined way to access data sets, uss files, and jobs.
- Lets you create, edit, and delete Zowe CLI `zosmf` compatible profiles.
- Lets you use the Secure Credential Store plug-in to store your credentials securely in the settings.
- Lets you leverage the API Mediation Layer token-based authentication to access z/OSMF.

For more information about Zowe Explorer, see [Information roadmap for Zowe Explorer](user-roadmap-zowe-explorer.md).

</details>
<br />

### Zowe Client Software Development Kits (SDKs)

The Zowe Client SDKs consist of programmatic APIs that you can use to build client applications or scripts that interact with z/OS. The following SDKs are available:

- Zowe Node.js Client SDK
- Zowe Java Client SDK
- Zowe Kotlin Client SDK
- Zowe Python Client SDK

For more information, see [Using the Zowe SDKs](../user-guide/sdks-using.md).

### ZEBRA (Zowe Embedded Browser for RMF/SMF and APIs) - Incubator 

ZEBRA Provides re-usable and industry compliant JSON formatted RMF/SMF data records, so that many other ISV SW and users can exploit them using open-source SW for many ways.

For more information, see the [ZEBRA documentation](https://github.com/zowe/zebra/tree/main/Documentation).

### Zowe Explorer plug-in for IntelliJ IDEA

Zowe Explorer plug-in for IntelliJ IDEA is a smart and interactive mainframe code editing tool that allows you to browse, edit, and create data on z/OS via z/OSMF REST API. 

The plug-in helps to: 
- Start working with z/OS easily with no complex configurations
- Organize data sets on z/OS, files on USS into working sets
- Allocate data sets, create members, files and directories with different permissions
- Perform operations like renaming, copying and moving data in a modern way
- Edit data sets, files and members. Smart auto-save keeps your content both in the editor and on the mainframe in sync
- Create multiple connections to different z/OS systems
- Perform all available operations with jobs
- Work with TSO Console directly in the IDE

To learn more about the plug-in, you can start with [Zowe Explorer plug-in for IntelliJ IDEA use cases](../user-guide/intellij-use-cases.md).

## Zowe Bill of Materials

<!-- 

<Tpsr /> is a React component which will create a dynamic link to latest versioned tpsr file
tpsrLatestLink = "https://github.com/zowe/docs-site/tree/master/src/tpsr/tpsr-" + latestVersion + ".md";
This returns <a href={tpsrLatestLink}>Third-Party Software Requirements (TPSR)</a>

-->

For information about the [Zowe Bill of Materials (BOM)](../appendix/bill-of-materials.md), see this link to the appendix.
