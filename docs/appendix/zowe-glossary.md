# Glossary

This glossary is part of a growing list of Zowe terminology # Glossary of Zowe terminology and includes both technical as well as organizational terms that are specific to Zowe.

## Main Components

* **Zowe Component**  
Zowe is a collection of both client and server code. You can install just some of Zowe, or all of it, depending on your needs. Zowe splits the major sections of the code into "Components" which each serve an important purpose. Server Components are packaged in a standardized way to include all services and plugins in one deliverable. Extensions to Zowe can also be delivered as third party Server Components. See: https://docs.zowe.org/stable/extend/packaging-zos-extensions/#zowe-component-manifest

* **Zowe server components**  
Also known as "Zowe z/OS components" or "Zowe server-side components". Include all the Zowe components that are installed on the z/OS server. 

* **Zowe client components**  
Also known as "Zowe client-side components". Include all the Zowe components that are installed on the users PC. 

* **API Mediation Layer (API ML)**  
Enables REST APIs by providing common functionality like a single point of access, Single-Sign-On, and workload balancing. API ML alos include the API Catalog. 

* **Zowe Application Framework**  
An application framework that modernizes and simplifies working on the mainframe by enabling the creation of applications to suit specific needs. It is a web user interface (UI) that provides a virtual desktop containing a number of apps allowing access to z/OS function. 

* **Zowe CLI**

* **Zowe Explorer** 

* **Zowe Client SDKs** 

* **Zowe Embedded Browser for RMF/SMF and APIs (ZEBRA)**  
Provides re-usable and industry compliant JSON formatted RMF/SMF data records, so that many other ISV SW and users can exploit them using open-source SW for many ways. For more information, see the ZEBRA documentation or visit the ZEBRA test/trial site. 
       
* **Zowe Workflow WiZard**

* **Zowe Launcher**  
A server-side program necessary for high availability / fault tolerance (HA/FT). It starts the Zowe server components and monitors their processes so that if a component fails to start or crashes, the launcher will restart it. The restarting of a component has limits to prevent loops in case of a component that has uncorrectable problems.

## Architecture

* **Imperative**  
The framework powering Zowe CLI and Zowe Explorer.

* **Explorer**  
The plugin suite for popular client-side editors such as VSCode.

* **Web Explorer**  
A suite of websites which is part of the Zowe server installation. It includes the JES, MVS, USS, and IP Explorers. It's not related to the "Explorer" which can be confusing.

* **ZLUX**  
A codename for the Zowe Application Framework, consisting of the Zowe desktop and App server.

* **API Gateway**  
A proxy server that provides a single point of access and routes requests from clients on its northbound edge, such as web browsers or the Zowe command line interface, to servers on its southbound edge that are able to provide data to serve the request. The API Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality. See https://docs.zowe.org/stable/getting-started/zowe-architecture/#api-gateway

* **API Catalog**  
The API Catalog provides a list of the API services that have registered themselves as catalog tiles and renders the Swagger documentation of those services.

* **API Discovery**  
A service that enables API services to be onboarded to the API ML.

* **App Server**  
A node.js server which is the server side of the Zowe Application framework and hosts the web content of the framework too. This server provides the Zowe desktop, which is accessible through a web browser. The Zowe desktop includes a number of applications that run inside the Application Framework such as a 3270 emulator and a File Editor.     

* **Caching Service**  
A service designed for Zowe components in a high availability configuration. The Caching service supports the High Availability of all components within Zowe, allowing components to be stateless by providing a mechanism to offload their state to a location accessible by all instances of the service, including those which just started.
       
* **z/OS Explorer Services**
  
* **Zowe Systems Services Server (ZSS)**  
The Zowe desktop delegates a number of its services to the ZSS server which it accesses through the http port 8542. ZSS is written in C and has native calls to z/OS to provide its services. For more information, see Zowe architecture | Zowe Docs
      
* **ZIS (Zowe Interprocess Services)**  
An APF authorized server application that provides privileged services to Zowe in a secure manner. For security reasons, it is not an HTTP server. Instead, this server has a trust relationship with ZSS. Other Zowe components can work through ZSS in order to handle z/OS data that would otherwise be unavailable or insecure to access from higher-level languages and software. 

* **Zowe server infrastructure**  
The set of programs (ex "zwe") and utilities (ex JCL, scripts) which manage the Zowe server configuration and components. The infrastructure standardizes the packaging of components and controls how they are started, stopped, and how configuration is provided to them. 

##  Installation & Configuration

* **Convenience build**  
Zowe z/OS binaries packaged as a PAX file which is a full product install. This PAX file is transfered to a USS directory where its contents are expanded. The zwe command zwe install is used to extract a number of PDS members which contain load modules, JCL scripts, and PARMLIB entries.


* **Instance.env** - V1 Only  
The Zowe instance directory contains a file instance.env that stores the Zowe configuration data. The data is read each time Zowe is started. You can modify instance.env to configure the Zowe runtime. See https://docs.zowe.org/stable/user-guide/configure-instance-directory/#updating-the-instanceenv-configuration-file 

* **Zowe runtime**  
The full, unarchived set of binaries, executable files, scripts, and other elements that are run when Zowe is started. Runtime installation includes the following components:

  * Zowe Application Framework
  * Zowe API Mediation Layer
  * Z Secure Services (ZSS)
 
* **Started task**  
A started task (STC) is a type of runnable/running program on z/os. Zowe started task (See also ZWESVSTC) – Does it need to go in Glossary? https://www.ibm.com/docs/en/zos/2.1.0?topic=tasks-determining-whether-use-started-task
  Zowe has 3 actually:
  - ZWESVSTC: v1 primary server STC
  - ZWESLSTC: v1 HA/FT primary server STC, or the primary server STC for v2 (SVSTC goes away in v2)
  - ZWESISTC: ZIS STC

* **workspace directory**  
The standard directory where Zowe server component and extension configuration is stored. In v1, this was located within the instance directory, but in v2 it can be any directory specified by the zowe configuration file. Refered to in code as `WORKSPACE_DIRECTORY` (v1) and `zowe.workspaceDirectory` (v2).

* **Zowe configuration file**  
Zowe.yaml: It is a YAML file that is required to configure Zowe runtime. It can be used as an alternative to instance.env if you have to configure Zowe in more granular level. It is also required to start Zowe in high availability mode. See https://docs.zowe.org/stable/user-guide/configure-instance-directory/#creating-the-zoweyaml-file 

* **Zowe instance**
    
* **Zowe instance directory**  
Also known as <INSTANCE_DIR>, the Zowe instance directory contains information that is specific to a launch of Zowe. It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.

* **ZWESVUSR**  
A started task ID used to run the PROCLIB ZWESVSTC. The task starts a USS environment using BPXBATSL that executes server components such as the Application Framework, API Mediation Layer, and Z Secure Services servers. To work with USS, the user ID ZWESVUSR must have a valid OMVS segment. For more information, see [System requirements](systemrequirements-zos#zwesvusr).

* **Zowe runtime directory**  
The USS directory where the Zowe server runtime is located. In v1, this is referred to as `<RUNTIME_DIR>` and is the location where `zowe-configure-instance` was used at install. In v2, this is referred to as `zowe.runtimeDirectory` and is the parent directory of the `zwe` command.

## Operation

### Zowe Application Framework

* **App2App**  
A unique feature to Zowe environment where one application plug-in can communicate with another and it is applicable to multiple application plug-ins. The application framework provides constructs that facilitate this ability. See [Application-to-application communication](../extend/extend-desktop/mvd-apptoappcommunication) for more information.

* **Config Service**  
The Config(uration) Service is a part of the Application Framework which allows plugins and the framework itself to store user configuration as JSON or binary formats. The configuration is stored in a hierarchy in which company-wide and system-wide defaults can exist for all users, and users may override the defaults if policy allows it. What can be stored and what can be overridden is according to plugin definition and administrative configuration.

* **MVS (multiple virtual storage) Explorer**  
View z/OS data sets from the Zowe Desktop

* **USS Explorer**  
A plug-in provided with zowe to view z/OS UNIX files from the Zowe Desktop

* **File Explorer**  
A plug-in provided with Zowe to allow users to view z/OS files and data sets using a RESTful interface. Also used by the MVS Explorer UI and USS Explorer UI

* **JES Explorer** 

### Zowe API Mediation Layer

### Zowe CLI


## Tools & Plug-ins

* **Configuration file**
 
* **API ML Plain Java Enabler (PJE)**  
A library which helps to simplify the process of onboarding a REST service with the API ML. Other enablers include Spring, micronaut, and nodejs. 

* **Service**  
A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term "service name" is used to mean service ID.The default service ID is provided by the service developer in the service configuration file.A system administrator can replace the service ID with a deployment environment specific name using additional configuration that is external to the service deployment unit. Most often, this is configured in a JAR or WAR file.Services are deployed using one or more service instances, which share the same service ID and implementation.

* **Extension** 

* **Plug-in** 


## Community

* **Open Mainframe Project (OMP)**  
An organization which hosts and promotes development of open source software for the benefit of the IBM z mainframe community, including but not limited to z/OS. Zowe is one of several programs in this project. See [Open Mainframe Project website](https://www.openmainframeproject.org/) for more information.

* **Zowe Conformance Program** 
 
* **Squad**  
A group of people contributing and participating in the Zowe project. Such a group owns one or more projects. Every squad is required to have a representative on the Technical Steering Committee (TSC), and participate in relevant working groups. See [Squads](https://github.com/zowe/community/blob/master/Technical-Steering-Committee/squads.md) for more information..

## Community

#### Open Mainframe Project (OMP)
  
An organization which hosts and promotes development of open source software for the benefit of the IBM z mainframe community, including but not limited to z/OS. Zowe(.org) is one of several programs in this project. See the [Open Mainframe Project website](https://www.openmainframeproject.org/) for more information.

#### Technical Steering Committee (TSC)

The governing body that is responsible for the overall planning, development, and technical feedback assessment of Zowe. The TSC meets weekly to go over squad updates and discuss issues regarding the zowe initiative. To get notified of upcoming meetings and agendas, join the [TSC Slack channel](https://openmainframeproject.slack.com/archives/C01H6CY0ZD1). The TSC operates by [charter](https://github.com/zowe/community/blob/master/Technical-Steering-Committee/charter.md) and [tsc governance](https://github.com/zowe/community/blob/master/Technical-Steering-Committee/tsc-governance.md)

#### Zowe Advisory Council (ZAC)

Represents the product arm of the Zowe leadership. It is formed from the people interested in the direction of the project from a non-technical point of view. The council meets once a week and provides guidance and recommendations for TSC with respect to future direction and relevant topics. 

#### Squad (Active Squad)

A group of people contributing and participating in the Zowe project. Such a group owns one or more projects. Every squad is required to have a representative on the Technical Steering Committee (TSC), and participate in relevant working groups. For more information about how a squad works, see [Squads](https://github.com/Zowe/community/blob/master/Technical-Steering-Committee/squads.md).

#### Incubation squad

A squad that has not yet matured and is under the supervision of the TSC. Usually the squad brings a new project that does not meaningfully fall under one of the existing squads. 

#### Project

The code within the Zowe is structured into projects. Some projects belong to the Core of the Zowe and projects that are Extensions of Zowe. Every project is owned by one of the squads. A squad may own more than one project. A project consists of one or more components.

#### Core projects

Core is defined as Zowe projects that are required and are foundational in order to realize the full value of Zowe for everyone including all the other extensions that may depend on them. Configuration and usage is recommended. Zowe is fully responsible for all Core projects. A non-Zowe project cannot be clasified as a Core project. Core projects must be Long Term Support. 

The [list of current core projects alongside with extension and their lifecycle stage](https://github.com/zowe/community/blob/master/PROJECTS.md) is owned by TSC. 

#### Extension projects

Zowe extension is a project within Zowe that is owned by a squad but is not part of the Core. As such it does not have to follow the version boundaries that the Zowe Core shares. 

The [list of current core projects alongside with extension and their lifecycle stage](https://github.com/zowe/community/blob/master/PROJECTS.md) is owned by TSC. 

#### Zowe Conformance Program

The Zowe Support Provider Conformance Program gives vendors the ability to showcase their Zowe support competencies via well-defined criteria. It is administered by the Linux Foundation and Open Mainframe Project.

## Architecture and other components

#### Component

Zowe is a collection of both *client* and *server* code. You can install only some of Zowe, or all of it, depending on your needs. Zowe splits the major sections of the code into *components*, with each serving an important purpose.
  
Server components are packaged in a standardized way to include all services and plug-ins in one deliverable. Extensions to Zowe can also be delivered as third-party server components. For more information about how these extensions can use a manifest file, see [Zowe component manifest](https://docs.Zowe.org/stable/extend/packaging-zos-extensions/#zowe-component-manifest).

#### Plug-in

A more general term used to describe a modular piece of some component. Depending on component or squad context, a plug-in is sometimes referred to as an *app*, *extension*, *plug-in*, etc. A component may have multiple plug-ins, sometimes working together to form a single purpose or user experience, but an individual plug-in belongs to a single component. See [extension](zowe-glossary.md#extension) for additional context.

#### Service

A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term *service name* is used to mean *service ID*.

The default service ID is provided by the service developer in the service configuration file. A system administrator can replace the service ID with a deployment environment specific name using additional configuration that is external to the service deployment unit. Most often, this is configured in a JAR or WAR file.

Services are deployed using one or more service instances, which share the same service ID and implementation.

#### Zowe client components

Includes all the Zowe components that are installed on the user's PC. Also known as *Zowe client-side components*. 

#### Zowe server components

Includes all the Zowe components that are installed on z/OS. Also known as *Zowe z/OS components* or *Zowe server-side components*.

### Lifecycle stages

#### Under Development

This stage informs developers that there is a specific task is underway and that the development community can join the effort. This stage indicates to users and extenders that such a project may become available in the future.

#### Technical Preview

The purpose of the Technical Preview stage is to gather feedback on the project from potential future users and extenders. The further minor releases to the projects in technical preview may contain breaking changes.

#### Generally Available

Projects in the Generally Available stage are ready to receive additional user feedback and improve the project before stabilizing it for Long Term Support. The project is stable, and major changes are not expected. Unlike projects in the Long Term Support stage, projects in the Generally Available stage may still require somechanges. Projects that have become Generally Available are ready for inclusion in production environments. A project in this stage may need to release major versions with breaking changes more often than the projects in Long Term Support. There should be no breaking changes in the minor releases.

#### Long Term Support (LTS)

The most stable version does not necessarily contain the latest and newest functionality, but the project is ready to be deployed to production environments. Projects in this Long Term Support stage are the most stable and longest supported versions of any specific project. No breaking changes are permitted within the major release.

#### Deprecated

Projects in this stage offer more extended support and give customers time to prepare before sunsetting of a specific project. There are no breaking changes permitted within the major release boundary.

#### Archived

Projects in the Archived stage keep the history of what was tried and what was used at some point.

### Projects

Consult the [list of current core projects alongside with extension and their lifecycle stage](https://github.com/zowe/community/blob/master/PROJECTS.md) if you want to know what projects are owned by whom and the project stage. 

#### API Mediation Layer (API ML)

Provides a reverse proxy and enables REST APIs by providing a single point of access for mainframe service REST APIs like MVS Data Sets, JES, as well as working with z/OSMF. It has dynamic discovery capability for these services and Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.

#### Zowe Application Framework

Modernizes and simplifies working on the mainframe via a web visual interface. Functionality is provided through apps and a desktop user experience called the Zowe Desktop. Base functionality includes apps to work with JES, MVS Data Sets, Unix System Services, as well as a 3270 Terminal, Virtual Terminal, and an Editor.

#### Zowe Chat

An incubator focused on working with the mainframe from popular chat clients such as Mattermost®, Microsoft Teams®, and Slack®.

#### Zowe CLI

Provides a command-line interface that lets you interact with the mainframe remotely and use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. The core set of commands includes working with data sets, USS, JES, as well as issuing TSO and console commands. The Zowe CLI is incredibly popular in modern mainframe education.

#### Zowe Embedded Browser for RMF/SMF and APIs (ZEBRA)

Provides re-usable and industry-compliant JSON-formatted RMF/SMF data records, so that many other ISV SW and users can exploit them using open-source SW for many ways. For more information, see the ZEBRA documentation or visit the ZEBRA test/trial site.

#### Zowe Explorer

A Visual Studio Code extension that modernizes the way developers and system administrators interact with z/OS mainframes. Zowe Explorer lets you interact with data sets, USS files, and jobs that are stored on z/OS. Zowe Explorer is incredibly popular in modern mainframe education.

#### Zowe IntelliJ Plug-in

Through the IntelliJ IDEs, this plug-in provides abilities to work with z/OS data sets, USS files, and exploring and managing JES jobs.

#### Zowe Java Client SDK

This SDK lets you leverage the underlying z/OSMF REST APIs on a z/OS system to build client applications and scripts that interface with your z/OS instance seamlessly.

#### Zowe Kotlin Client SDK

This SDK covert zOSMF Rest API with Kotlin object oriented code using Retrofit. Zowe client Kotlin SDK will allow you to send http requests to your zOSMF.

#### Zowe Launcher

A server-side program necessary for high availability/fault tolerance (HA/FT). It starts the Zowe server components and monitors their processes so that if a component fails to start or crashes, the launcher restarts it. The restarting of a component has limits to prevent loops in case of a component that has uncorrectable problems.

#### Zowe Node.js Client SDK

Provides access to a set of programmatic APIs that you can use to build Node.js client applications or scripts that interact with z/OS.

#### Zowe Python Client SDK

Provides access to a set of programmatic APIs that you can use to build Python applications or scripts that interact with z/OS.

#### Zowe Swift Client SDK

The Zowe Swift Client SDK is an open-source Swift package for z/OSMF REST API. It allows you to leverage mainframe capabilities from your Swift applications with minimum effort.

#### Zowe Systems Services Server (ZSS)

Working closely with ZIS, ZSS serves as one of the primary, authenticated back-ends that communicates with z/OS and provides Zowe with a number of APIs: z/OS Unix files and data sets, control of the plug-ins and services lifecycle, security management, etc. The Zowe Desktop especially delegates a number of its services to ZSS which it accesses through the default http port `7557`.

ZSS is written in C and uses native calls to z/OS to provide its services.

### Components

#### API Catalog

Provides a list of the API services that have registered themselves as catalog tiles and renders those services' Swagger documents. There is also an API Catalog plug-in.
#### Caching Service

Designed for Zowe components in a high-availability configuration. It supports the HA of all components within Zowe, allowing components to be stateless by providing a mechanism to offload their state to a location accessible by all instances of the service, including those which just started.

#### Discovery Service

Enables API Services to be onboarded to the API ML.

#### Gateway Service

A proxy server that routes requests from clients on its northbound edge (such as web browsers or Zowe CLI) to servers on its southbound edge that are able to provide data to serve the request.
  
Also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.

#### Configuration Manager

Works closely with the Zowe Launcher to manage the configuration of Zowe across its lifecycle. Interacted with primarily via `zwe` command

#### Explorer

When used by itself, the term *Explorer* often refers to the core Zowe component for Visual Studio Code, Zowe Explorer. However, the term *Explorer* is also a part of multiple titles across Zowe.

#### Imperative

The code framework that is used to build plug-ins for Zowe CLI.

#### Web Explorers

A suite of web apps on the Zowe Desktop that are part of the App Framework and the core Zowe server installation. They include the JES, MVS, USS, and IP Explorers. Not related to Zowe Explorer.

#### ZIS (Zowe Interprocess Services)

An APF-authorized server application that provides privileged services to Zowe in a secure manner. For security reasons, it is not an HTTP server. Instead, this server has a trust relationship with ZSS.
  
Other Zowe components can work through ZSS in order to handle z/OS data that would otherwise be unavailable or insecure to access from higher-level languages and software.

#### zLUX (V1 only)  

This is an older, no-longer-used name for the Zowe Application Framework. Note that unreasonable-to-change references still exist (such as GitHub repository names). Other synonyms/similar names include *MVD* (Mainframe Virtual Desktop) and *zlux*.

#### Zowe App Server

Refers to the Node.js-powered Application Server and is part of the Application Framework core component. It hosts the web content of the Application Framework, and provides the Zowe Desktop, which is accessible through a web browser.

#### Zowe Desktop

Refers to the Desktop UI that is part of the Application Framework core component. The Zowe Desktop includes a number of apps that run inside the App Framework such as JES, MVS, and USS Explorers, as well as a 3270 Terminal, Virtual Terminal, and an Editor.

#### Zowe install packaging  

The set of programs (for example, `zwe` command) and utilities (for example, JCL, scripts) which manage the Zowe server configuration and components. The infrastructure standardizes the packaging of components and controls how they are started, stopped, and how configuration is provided to them.

##  Installation and Configuration

#### Convenience build

  The Zowe installation file for Zowe z/OS components that is distributed as a PAX file in z/OS Unix and contains the runtimes and the scripts to install and launch the z/OS runtime. It is the first of primary ways to install Zowe.

#### Extension directory

The standard z/OS Unix directory where Zowe extensions, or additional components, plug-ins, etc., outside the default install are stored. It is specified in the Zowe configuration file via `zowe.extensionDirectory`.

#### Instance.env (V1 only)

The Zowe instance directory contains a `file instance.env` that stores the Zowe configuration data. The data is read each time Zowe is started. You can modify `instance.env` to configure the Zowe runtime. For more information about updating this configuration data, see [Updating the instance.env configuration file](https://docs.Zowe.org/V1.28.x/user-guide/configure-instance-directory#updating-the-instanceenv-configuration-file).

#### Log directory

The standard z/OS Unix directory where Zowe logs are stored. It is specified in the Zowe configuration file via `zowe.logDirectory`.

#### Runtime directory

Refers to the z/OS Unix directory for the Zowe runtime, specified in the Zowe configuration file via `zowe.runtimeDirectory`. Also the parent directory of the `zwe` command.

#### SMP/E

The Zowe installation for Zowe z/OS components that is distributed as an SMP/E package, identified by FMID, and contains the runtimes and the scripts to install and launch the z/OS runtime. The initial package is installed and then a PTF is applied. It is the second of primary ways to install Zowe.

#### SMP/E with z/OSMF workflow

A similar process as [SMP/E](zowe-glossary.md#smp/e), except done through the z/OSMF web interface as a Zowe SMP/E workflow. It is the third of primary ways to install Zowe.

#### Started task (STC)

A type of runnable/running program on z/OS and is the primary way of running Zowe. For more information about when to use started tasks, see [Determining whether to use a started task](https://www.ibm.com/docs/en/zos/2.1.0?topic=tasks-determining-whether-use-started-task).

Zowe has two started tasks:
- ZWESLSTC: The primary Zowe STC. In Zowe V1, it was just the HA/FT primary STC.
- ZWESISTC: The STC for the Zowe cross memory server (referred to as ZIS, formally XMEM)
- ZWESVSTC (outdated): V1 only

#### Workspace directory

The standard z/OS Unix directory where Zowe server component and extension configuration is stored. In V1, this was located within the instance directory. In V2 it is specified in the Zowe configuration file via `zowe.workspaceDirectory`.

#### Zowe configuration file

  The replacement for `instance.env` in V1. The Zowe configuration file is a YAML file that is required to configure the Zowe runtime. It is used across every step in Zowe, from configuration to install to start. It is sometimes referred to as the *Zowe.yaml file*. For more information on various attributes, see [Zowe YAML configuration file reference](https://docs.Zowe.org/stable/appendix/Zowe-yaml-configuration/).

#### Zowe instance directory (V1 only)

Also known as <INSTANCE_DIR>. Contains information that is specific to a launch of Zowe. It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.
  
The instance directory also contains a log directory where different microservices write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.

#### Zowe runtime

Refers to the full, unarchived set of binaries, executable files, scripts, and other elements that are run when Zowe is started.

### Security

For an overview of security in Zowe, see [the Zowe Security policy](https://www.zowe.org/security) on zowe.org. 

#### Sample library

The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are found in the SZWESAMP PDS sample library. For more information, see [PDS sample library and PDSE load library](https://docs.zowe.org/stable/user-guide/configure-xmem-server/#pds-sample-library-and-pdse-load-library).

#### ZWEADMIN

A group that ZWESVUSR and ZWESIUSR should belong to. It must have a valid OMVS segment.

#### ZWESIUSR

This is a started task ID used to run the PROCLIB ZWESISTC that launches the cross memory server (also known as ZIS). It must have a valid OMVS segment. For more information, see [System requirements](systemrequirements-zos#zwesvusr).

#### ZWESVUSR

This is a started task ID used to run the PROCLIB ZWESVSTC. The task starts a USS environment using BPXBATSL that executes server components such as the Application Framework, the API ML, and ZSS. To work with USS, the user ID ZWESVUSR must have a valid OMVS segment. For more information, see [System requirements](systemrequirements-zos#zwesvusr).

### Zowe Application Framework Extensions

#### 3270 Terminal

An app in the Zowe Desktop that provides a user interface that emulates the basic functions of IBM 3270 family terminals.

#### File Tree

Formally known as the *File Explorer*, the FT refers to a re-usable widget existing in multiple apps across the Zowe Desktop to display z/OS Unix files and datasets.

#### IP Explorer

An app in the Zowe Desktop you can use to monitor the TCP/IP stacks, and view active connections and reserved ports.

#### JES Explorer

An app in the Zowe Desktop to interact with z/OS UNIX files.

#### MVS (multiple virtual storage) Explorer

An app in the Zowe Desktop to interact with z/OS data sets. Though still supported, active development has been moved to the Editor.

#### USS Explorer

An app in the Zowe Desktop to interact with z/OS UNIX files. Though still supported, active development has been moved to the Editor.

#### VT Terminal

An app in the Zowe Desktop that provides a user interface that emulates the basic functions of DEC VT family terminals.

#### Zowe Editor

An app in the Zowe Desktop to interact with z/OS data sets and Unix files. It uses the File Tree.

### Zowe CLI Extensions

#### IBM® CICS® Plug-in for Zowe CLI

Extends the Zowe CLI to interact with CICS programs and transactions.

#### IBM® Db2® Plug-in for Zowe CLI

Enables interaction with Db2 for z/OS to perform tasks through Zowe CLI and integrate with modern development tools.
    
## Use and development

### API ML

#### Micronaut Enabler

A guide which helps to simplify the process of onboarding a REST service with the API ML, using Micronaut and Gradle.

#### Node.js Enabler

An NPM package which helps to simplify the process of onboarding a REST service written in Node.js with the API ML.

#### Plain Java Enabler (PJE)

A library which helps to simplify the process of onboarding a REST service with the API ML, serving the needs of Java developers who are not using either Spring Boot, Spring Framework, or Spring Cloud Netflix.

#### Sprint Boot Enablers

A collection of enablers which help to simplify the process of onboarding a REST service with the API ML using various Spring frameworks.

### Zowe Application Framework

#### Accessing the Desktop

The Zowe Desktop is accessed through the API ML. The URL would be:
```
https://${zowe.externalDomains[0]}:{zowe.externalPort}/zlux/ui/v1
```

#### App2App

It is a unique feature to Zowe environment where one application plug-in can communicate with another and it is applicable to multiple application plug-ins. The application framework provides constructs that facilitate this ability. For more information, see [Application-to-application communication](../extend/extend-desktop/mvd-apptoappcommunication).

#### Config Service

A part of the Application Framework which allows plug-ins and the framework itself to store user configuration as JSON or binary formats. The configuration is stored in a hierarchy in which company-wide and system-wide defaults can exist for all users, and users may override the defaults if policy allows it. What can be stored and what can be overridden is according to plug-in definition and administrative configuration.
