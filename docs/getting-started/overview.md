# Zowe overview

Zowe offers modern interfaces to interact with z/OS and allows you to work with z/OS in a way that is similar to what you experience on cloud platforms today. You can use these interfaces as delivered or through plug-ins and extensions that are created by clients or third-party vendors.

Zowe consists of the following main components. For details of each component, see the corresponding section.

- [**Zowe Application Framework**](#zowe-application-framework): Contains a Web user interface (UI) that provides a full screen interactive experience. The Web UI includes many interactions that exist in 3270 terminals and web interfaces such as IBM z/OSMF.

- [**Explorer server**](#explorer-server): Provides a range of APIs for the management of jobs, data sets and z/OS UNIX System Services files.

- [**API Mediation Layer**](#api-mediation-layer): Provides an API abstraction layer through which APIs can be discovered, catalogued, and presented uniformly.

- [**Zowe CLI**](#zowe-cli): Provides a command-line interface that lets you interact with the mainframe remotely and use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. It provides a set of utilities and services for application developers that want to become efficient in supporting and building z/OS applications quickly. Some Zowe extensions are powered by Zowe CLI, for example the [Visual Studio Code Extension for Zowe](../user-guide/cli-vscodeplugin.md).

Check out the video below for a demo of the modern interfaces that Zowe provides.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe overview demo" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/NX20ZMRoTtk" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>

## Zowe Application Framework

The Zowe Application Framework modernizes and simplifies working on the mainframe. With the Zowe Application Framework, you can create applications to suit your specific needs. The Zowe Application Framework contains a web UI that has the following features:

- The web UI works with the underlying REST APIs for data, jobs, and subsystem, but presents the information in a full screen mode as compared to the command line interface.
- The web UI makes use of leading-edge web presentation technology and is also extensible through web UI plug-ins to capture and present a wide variety of information.
- The web UI facilitates common z/OS developer or system programmer tasks by providing an editor for common text-based files like REXX or JCL along with general purpose data set actions for both Unix System Services (USS) and Partitioned Data Sets (PDS) plus Job Entry System (JES) logs.

The Zowe Application Framework consists of the following components:

- **Zowe Desktop**

    The desktop, accessed through a browser.

- **Zowe Application Server**

    The Zowe Application Server runs the Zowe Application Framework. It consists of the Node.js server plus the Express.js as a webservices framework, and the proxy applications that communicate with the z/OS services and components.

- **ZSS Server**

    The ZSS Server provides secure REST services to support the Zowe Application Server.

- **Application plug-ins**

    Several application-type plug-ins are provided. For more information, see [Using the Zowe Application Framework application plug-ins](../user-guide/mvd-using.html#using-zowe-framework-application-plug-ins).

## Explorer server

The explorer server is a z/OS® RESTful web service and deployment architecture for z/OS microservices. The server is implemented as a Liberty Profile web application that uses z/OSMF services to provide a range of APIs for the management of jobs, data sets and z/OS UNIX™ System Services (USS) files.

These APIs have the following features:

- These APIs are described by the Open API Specification allowing them to be incorporated to any standard-based REST API developer tool or API management process.
- These APIs can be exploited by off-platform applications with proper security controls.

Any client application that calls RESTful APIs directly can use the explorer server.

As a deployment architecture, the explorer server accommodates the installation of other z/Tool microservices into its Liberty instance. These microservices can be used by explorer server APIs and client applications.

## Zowe CLI
Zowe CLI is a command-line interface that lets application developers interact with the mainframe in a familiar format. Zowe CLI helps to increase overall productivity, reduce the learning curve for developing mainframe applications, and exploit the ease-of-use of off-platform tools. Zowe CLI lets application developers use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. It provides a set of utilities and services for application developers that want to become efficient in supporting and building z/OS applications quickly.

Zowe CLI provides the following benefits:

  - Enables and encourages developers with limited z/OS expertise to build, modify, and debug z/OS applications.
  - Fosters the development of new and innovative tools from a computer that can interact with z/OS.
  - Ensure that business critical applications running on z/OS can be maintained and supported by existing and generally available software development resources.
  - Provides a more streamlined way to build software that integrates with z/OS. 

**Note:** For information about prerequisites, software requirements, installing and upgrading Zowe CLI, see
[Installing Zowe](../user-guide/installandconfig.md).

### Zowe CLI capabilities

With Zowe CLI, you can interact with z/OS remotely in the following ways:

  - **Interact with mainframe files:**   
    Create, edit, download, and
    upload mainframe files (data sets) directly from Zowe CLI. 
  - **Submit jobs:**    
    Submit JCL from data sets or local storage, monitor the status, and view and download the output automatically.
  - **Issue TSO and z/OS console commands:**    
    Issue TSO and console commands to the mainframe directly from Zowe CLI.
  - **Integrate z/OS actions into scripts:**    
    Build local scripts that accomplish both mainframe and local tasks. 
  - **Produce responses as JSON documents:**    
    Return data in JSON format on request for consumption in other programming languages.

For detailed information about the available functionality in Zowe CLI, see [Zowe CLI Command Groups](../user-guide/cli-usingcli.html#zowe-cli-command-groups).

For information about extending the functionality of Zowe CLI by installing plug-ins, see [Extending Zowe CLI](../user-guide/cli-extending.md).

### Zowe CLI Third-Party software agreements

Zowe CLI uses the following third-party software:

| Component | Third-party Software | Version | File name |
| ----------| -------------------- | --------| --------- |
| Zowe CLI  | Eclipse Public License | 2.0 | Legal_Doc_00002579_4.pdf |
| Imperative CLI Framework | Eclipse Public License | 2.0 | Legal_Doc_00002579_5.pdf |
| Zowe CLI Plug-in for IBM CICS | xml2js | 0.4.19 | Legal_Doc_00002310_41.pdf |
| Zowe CLI plug-in for IBM Db2 Database | ibm_db | 2.3.0 | Legal_Doc_00002310_38.pdf | 

**Note:** All trademarks, trade names, service marks, and logos referenced herein belong to their respective companies.

[Click here](https://github.com/zowe/docs-site/blob/TPSR-link/docs/.vuepress/public/zowe_cli_tpsrs.zip) to download and read each complete license. The .zip file contains the licenses for all of the third-party components that Zowe CLI uses.

**More Information:**

  - [System requirements for Zowe CLI](../user-guide/systemrequirements.md)
  - [Installing Zowe CLI](../user-guide/cli-installcli.html)

## API Mediation Layer

The API Mediation Layer provides a single point of access for mainframe service REST APIs. The layer offers enterprise, cloud-like features such as high-availability, scalability, dynamic API discovery, consistent security, a single sign-on experience, and documentation. The API Mediation Layer facilitates secure communication across loosely coupled microservices through the API Gateway. The API Mediation Layer includes an API Catalog that provides an interface to view all discovered microservices, their associated APIs, and Swagger documentation in a user-friendly manner. The Discovery Service makes it possible to determine the location and status of microservice instances running inside the ecosystem.  

**More Information:**
- [Onboard an existing Spring Boot REST API service using Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service.md)
- [Using API Catalog](../user-guide/api-mediation-api-catalog.md)

### Key features  
* High availability of services in which application instances on a failing node are distributed among surviving nodes
* Microservice UIs available through the API Gateway and API Catalog by means of reverse proxying
* Support for standardization and normalization of microservice URLs and routing to provide API Mediation Layer users with a consistent way of accessing microservices.
* Minimal effort to register a microservice with the gateway (configuration over code)
* Runs on Windows, Linux, and z/OS (target platform)
* Written in Java utilizing Spring Boot (2.x), Angular 5, and the Netflix CloudStack
* Supports multiple client types for discovery (including Spring Boot, Java, and NodeJS)
* Contains enablers that allow for easy discovery and exposure of REST APIs and Swagger documentation for each microservice

### API Mediation Layer architecture
The following diagram illustrates the single point of access with the API Gateway and the interactions between the API Gateway, API Catalog, and the Discovery Service:   

![API Mediation Layer Architecture diagram](../images/api-mediation/apiml-architecture.png)

### Components
The API Layer consists of the following key components:

#### API Gateway
The microservices that are contained within the ecosystem are located behind a reverse proxy. Clients interact with the gateway layer (reverse proxy). This layer forwards API requests to the appropriate corresponding service through the microservice endpoint UI. The gateway is built using Netflix Zuul and Spring Boot technology.

#### Discovery Service
The Discovery service is the central point in the API Gateway infrastructure that accepts "announcements of REST services" and serves as a repository of active services. Back-end microservices register with this service either directly by using a Eureka client. Non-Spring Boot applications register with the Discover Service indirectly through a Sidecar. The Discovery Service is built on Eureka and Spring Boot technology.

#### API Catalog
The API Catalog is the catalog of published APIs and their associated documentation that are discoverable or can be available if provisioned from the service catalog. The API documentation is visualized using the Swagger UI. The API Catalog contains APIs of services available as product versions. A service can be implemented by one or more service instances, which provide exactly the same service for high-availability or scalability.


**More Information:**
- [Onboard an existing Spring Boot REST API service using Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service.md)
- [Using API Catalog](../user-guide/api-mediation-api-catalog.md)


### Zowe API Mediation Layer Third-Party software agreements

Zowe API Mediation Layer uses the following third-party software:

| Component | Third-party Software | Version | File name |
| ----------| -------------------- | --------| --------- |
| Zowe API Mediation Layer | Eclipse Public License | 2.0 | Legal_Doc_00002599_81.pdf |


**Note:** All trademarks, trade names, service marks, and logos referenced herein belong to their respective companies.

[Click here](https://github.com/zowe/docs-site/blob/TPSR-link/docs/.vuepress/public/zowe_apiml_tpsrs.zip) to download and read each complete license. The .zip file contains the licenses for all of the third-party components that Zowe API Mediation Layer uses.