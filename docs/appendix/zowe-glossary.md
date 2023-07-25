# Glossary

This glossary is part of a growing list of Zowe terminology.

## Community

* **Open Mainframe Project (OMP)**
  
  It is an organization which hosts and promotes development of open source software for the benefit of the IBM z mainframe community, including but not limited to z/OS. Zowe(.org) is one of several programs in this project. See [Open Mainframe Project website](https://www.openmainframeproject.org/) for more information.

* **Zowe Conformance Program** 

  The Zowe Support Provider Conformance Program gives vendors the ability to showcase their Zowe support competencies via well defined criteria. It is administered by the Linux Foundation and Open Mainframe Project.
 
* **Squad** 
  
  A squad is a group of people contributing and participating in the Zowe project. Such a group owns one or more projects. Every squad is required to have a representative on the Technical Steering Committee (TSC), and participate in relevant working groups. See [Squads](https://github.com/Zowe/community/blob/master/Technical-Steering-Committee/squads.md) for more information.

* **Zowe Component**
 
  Zowe is a collection of both client and server code. You can install just some of Zowe, or all of it, depending on your needs. Zowe splits the major sections of the code into "Components" where each serve an important purpose. Server Components are packaged in a standardized way to include all services and plugins in one deliverable. Extensions to Zowe can also be delivered as third party Server Components. See: https://docs.Zowe.org/stable/extend/packaging-zos-extensions/#Zowe-component-manifest

* **Plugin**

  A more general term used to describe a modular piece of some component. Depending on component or squad context, a plugin is sometimes referred to as an "app", "extension", "plug-in" etc. A component may have multiple plugins, sometimes working together to form a single purpose or user experience, but an individual plugin belongs to a single component.

* **Extension**

  An extension is generally used to describe additional, non-default Zowe plugins or components.

* **Core components**

  The definition of a core component is governed by the TSC but a core component usually means a packaged, foundational piece as part of base Zowe. From the perspective of a conformant support provider, providing support for Zowe refers to providing support for each core component of Zowe though a provider may put their own limitations on what they support. A core component is usually actively maintained by one or more squads. A component has a component manifest file, that helps identify it with the rest of Zowe. See: https://docs.zowe.org/stable/appendix/server-component-manifest/

## Core

* **Zowe server components**

  Also known as "Zowe z/OS components" or "Zowe server-side components". Includes all the Zowe components that are installed on z/OS. 

* **Zowe client components**
 
  Also known as "Zowe client-side components". Includes all the Zowe components that are installed on the users' PC. 

* **API Mediation Layer (API ML)**

  A core Zowe component that provides a reverse proxy and enables REST APIs by providing a single point of access for mainframe service REST APIs like MVS Data Sets, JES, as well as working with z/OSMF. It has dynamic discovery capability for these services and Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.

* **Zowe Application Framework**

  A core Zowe component that modernizes and simplifies working on the mainframe via a web visual interface. Functionality is provided through apps and a desktop user experience called the Zowe Desktop. Base functionality includes apps to work with JES, MVS Data Sets, Unix System Services, as well as a 3270 Terminal, Virtual Terminal, and an Editor.

* **Zowe CLI**

  A core Zowe component that provides a command-line interface that lets you interact with the mainframe remotely and use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. The core set of commands includes working with data sets, USS, JES, as well as issuing TSO and console commands. The Zowe CLI is incredibly popular in modern mainframe education.

* **Zowe Explorer** 

  A core Zowe component that is a Visual Studio Code extension that modernizes the way developers and system administrators interact with z/OS mainframes. The Zowe Explorer lets you interact with data sets, USS files, and jobs that are stored on z/OS. The Zowe Explorer is incredibly popular in modern mainframe education.

* **Zowe Client SDKs** 

  Client SDK's allow extenders to build applications on top of existing programmatic APIs such as z/OSMF. Currently supported client SDK's include Node.js (core), Kotlin/z/OSMF, Python, Swift, and Java. 

* **Zowe Systems Services Server (ZSS)** 

  Working closely with ZIS, ZSS serves as one of the primary, authenticated back-ends that communicates with z/OS and provides Zowe with a number of APIs: z/OS Unix files and datasets, control of the plugins and services lifecycle, security management etc. The Zowe Desktop especially delegates a number of its services to ZSS which it accesses through the default http port 7557. ZSS is written in C and uses native calls to z/OS to provide its services.

## Architecture & other components

* **Zowe IntelliJ Plugin** 

  Through the IntelliJ IDE, this plugin provides abilities to work with z/OS datasets, USS files, and exploring and managing JES Jobs.

* **Zowe Chat** 

  An incubator focused on working with the mainframe from popular chat clients such as Slack®, Microsoft Teams®, and Mattermost®.

* **Zowe Embedded Browser for RMF/SMF and APIs (ZEBRA)** 

  Provides re-usable and industry compliant JSON formatted RMF/SMF data records, so that many other ISV SW and users can exploit them using open-source SW for many ways. For more information, see the ZEBRA documentation or visit the ZEBRA test/trial site. 

* **Imperative** 

  It's the code framework that is used to build plugins for Zowe CLI.

* **Explorer** 

  The term "Explorer" is a part of multiple titles across Zowe, though generally the Explorer when referred to by itself, is the core Zowe component for VSCode.

* **Zowe Launcher**

  A server-side program necessary for high availability / fault tolerance (HA/FT). It starts the Zowe server components and monitors their processes so that if a component fails to start or crashes, the launcher will restart it. The restarting of a component has limits to prevent loops in case of a component that has uncorrectable problems.

* **Configuration Manager**

  Works closely with the Zowe Launcher to manage the configuration of Zowe across its lifecycle. Interacted with primarily via `zwe` command

* **Web Explorers**

  It's a suite of web apps on the Zowe Desktop, which in and of itself is part of the App Framework & the core Zowe server installation. It includes the JES, MVS, USS, and IP Explorers. It's not related to the "Explorer".

* **Zowe Desktop**

  Refers to the Desktop UI, as part of the Application Framework core component. The Zowe Desktop includes a number of apps that run inside the App Framework such as JES, MVS, and USS Explorers, as well as a 3270 Terminal, Virtual Terminal, and an Editor to name a few. 

* **Zowe App Server**

  Refers to the Node.js-powered Application Server, as part of the Application Framework core component. It hosts the web content of the App Framework, and provides the Zowe Desktop, which is accessible through a web browser. 
      
* **ZIS (Zowe Interprocess Services)**

  An APF authorized server application that provides privileged services to Zowe in a secure manner. For security reasons, it is not an HTTP server. Instead, this server has a trust relationship with ZSS. Other Zowe components can work through ZSS in order to handle z/OS data that would otherwise be unavailable or insecure to access from higher-level languages and software. 

* **zLUX (V1 only)**  

  This is an older, no longer used name for the Zowe Application Framework however unreasonable-to-change references still exist (i.e. GitHub repository names). Other synonyms/similar names include "MVD" (Mainframe Virtual Desktop) and "zlux".

* **Service**

  A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term "service name" is used to mean service ID.The default service ID is provided by the service developer in the service configuration file.A system administrator can replace the service ID with a deployment environment specific name using additional configuration that is external to the service deployment unit. Most often, this is configured in a JAR or WAR file.Services are deployed using one or more service instances, which share the same service ID and implementation.

* **API Gateway**  

  The API Gateway is a proxy server that routes requests from clients on its northbound edge, such as web browsers or the Zowe CLI, to servers on its southbound edge that are able to provide data to serve the request. The API Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality. See https://docs.Zowe.org/stable/getting-started/Zowe-architecture/#api-gateway

* **API Catalog** 

  The API Catalog is a component that provides a list of the API services that have registered themselves as catalog tiles and renders those services' Swagger documents. There is also a plugin for it.

* **API Discovery** 

  A component that enables API Services to be onboarded to the API ML.

* **Caching Service** 

  This service is designed for Zowe components in a high availability configuration. It supports the HA of all components within Zowe, allowing components to be stateless by providing a mechanism to offload their state to a location accessible by all instances of the service, including those which just started.

* **Zowe install packaging**  

  The set of programs (ex: `zwe` command) and utilities (ex: JCL, scripts) which manage the Zowe server configuration and components. The infrastructure standardizes the packaging of components and controls how they are started, stopped, and how configuration is provided to them. 

##  Installation & Configuration

* **Convenience build**

  The Zowe installation file for Zowe z/OS components that is distributed as a PAX file in z/OS Unix and contains the runtimes and the scripts to install and launch the z/OS runtime. It is the first of primary ways to install Zowe.

* **SMP/E**

  The Zowe installation for Zowe z/OS components that is distributed as an SMP/E package, identified by FMID, and contains the runtimes and the scripts to install and launch the z/OS runtime. The initial package is installed and then a PTF is applied. It is the second of primary ways to install Zowe.

* **SMP/E with z/OSMF workflow**

  A similar process as the above, except done through the z/OSMF web interface as a Zowe SMP/E workflow. It is the third of primary ways to install Zowe.

* **Zowe configuration file**

  The replacement for instance.env in V1, the Zowe configuration file is a YAML file that is required to configure the Zowe runtime. It is used across every step in Zowe, from configuration to install to start. It is sometimes referred to as the "Zowe.yaml file". For more detailed information on various attributes, see https://docs.Zowe.org/stable/appendix/Zowe-yaml-configuration/

* **Zowe runtime**

  Refers to the full, unarchived set of binaries, executable files, scripts, and other elements that are run when Zowe is started.
 
* **Started task** 

  A started task (STC) is a type of runnable/running program on z/OS and is the primary way of running Zowe. https://www.ibm.com/docs/en/zos/2.1.0?topic=tasks-determining-whether-use-started-task

  Zowe has 2:
  - ZWESLSTC: The primary Zowe STC. In Zowe V1, it was just the HA/FT primary STC.
  - ZWESISTC: The STC for the Zowe cross memory server (referred to as ZIS, formally XMEM)
  - ZWESVSTC (outdated): V1 only

* **Runtime directory**

  Refers to the z/OS Unix directory for the Zowe runtime, specified in the Zowe configuration file via `zowe.runtimeDirectory`. It is also the parent directory of the `zwe` command.
  
* **Workspace directory**

  The standard z/OS Unix directory where Zowe server component and extension configuration is stored. In V1, this was located within the instance directory, but in V2 it is specified in the Zowe configuration file via `zowe.workspaceDirectory`.

* **Log directory**

  The standard z/OS Unix directory where Zowe logs are stored. It is specified in the Zowe configuration file via `zowe.logDirectory`.

* **Extension directory**

  The standard z/OS Unix directory where Zowe extensions, or additional components, plugins etc. outside the default install are stored. It is specified in the Zowe configuration file via `zowe.extensionDirectory`.

* **Instance.env (V1 only)**

  The Zowe instance directory contains a file instance.env that stores the Zowe configuration data. The data is read each time Zowe is started. You can modify instance.env to configure the Zowe runtime. See https://docs.Zowe.org/V1.28.x/user-guide/configure-instance-directory#updating-the-instanceenv-configuration-file

* **Zowe instance directory (V1 only)** 

  Also known as <INSTANCE_DIR>. It contains information that is specific to a launch of Zowe. It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.

##  Security (Installation & Configuration)

* **Sample library**

  The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are found in the SZWESAMP PDS sample library. For more information: https://docs.zowe.org/stable/user-guide/configure-xmem-server/#pds-sample-library-and-pdse-load-library

* **ZWESVUSR** 

  This is a started task ID used to run the PROCLIB ZWESVSTC. The task starts a USS environment using BPXBATSL that executes server components such as the Application Framework, the API ML, and ZSS. To work with USS, the user ID ZWESVUSR must have a valid OMVS segment. For more information, see [System requirements](systemrequirements-zos#zwesvusr).

* **ZWESIUSR** 

  This is a started task ID used to run the PROCLIB ZWESISTC that launches the cross memory server (also known as ZIS). It must have a valid OMVS segment. For more information, see [System requirements](systemrequirements-zos#zwesvusr).

* **ZWEADMIN** 

  This is a group that ZWESVUSR and ZWESIUSR should belong to. It must have a valid OMVS segment.
    
## Use & development

### Zowe Application Framework

* **Accessing the Desktop**

  The Zowe Desktop is accessed through the API ML. The URL would be https://${zowe.externalDomains[0]}:{zowe.externalPort}/zlux/ui/v1

* **App2App**

  It is a unique feature to Zowe environment where one application plugin can communicate with another and it is applicable to multiple application plugins. The application framework provides constructs that facilitate this ability. See [Application-to-application communication](../extend/extend-desktop/mvd-apptoappcommunication) for more information.

* **Config Service**

  The Config(uration) Service is a part of the Application Framework which allows plugins and the framework itself to store user configuration as JSON or binary formats. The configuration is stored in a hierarchy in which company-wide and system-wide defaults can exist for all users, and users may override the defaults if policy allows it. What can be stored and what can be overridden is according to plugin definition and administrative configuration.

### API ML

* **Plain Java Enabler (PJE)**

  This is a library which helps to simplify the process of onboarding a REST service with the API ML, serving the needs of Java developers who are not using either Spring Boot, Spring Framework, or Spring Cloud Netflix.

* **Sprint Boot Enablers**

  This is a collection of enablers which help to simplify the process of onboarding a REST service with the API ML using various Spring frameworks.

* **Micronaut**

  This is a guide which helps to simplify the process of onboarding a REST service with the API ML, using Micronaut and Gradle.

* **Node.js Enabler**

  The the API ML onboarding Node.js enabler is an NPM package which helps to simplify the process of onboarding a REST service written in Node.js with the API ML.

## Plugins/Extensions

### Zowe Application Framework

* **Zowe Editor** 

  An app in the Zowe Desktop to interact with z/OS data sets & Unix files. It uses the File Tree.

* **File Tree**

  Formally known as the "File Explorer", the FT refers to a re-usable widget existing in multiple apps across the Zowe Desktop to display z/OS Unix files and datasets.

* **JES Explorer** 

  An app in the Zowe Desktop to interact with z/OS UNIX files.

* **IP Explorer** 

  An app in the Zowe Desktop you can use to monitor the TCP/IP stacks, and view active connections and reserved ports.

* **3270 Terminal** 

  An app in the Zowe Desktop that provides a user interface that emulates the basic functions of IBM 3270 family terminals.

* **VT Terminal** 

  An app in the Zowe Desktop that provides a user interface that emulates the basic functions of DEC VT family terminals.

* **MVS (multiple virtual storage) Explorer** 

  An app in the Zowe Desktop to interact with z/OS data sets. Though still supported, active development has been moved to the Editor.

* **USS Explorer** 

  An app in the Zowe Desktop to interact with z/OS UNIX files. Though still supported, active development has been moved to the Editor.

### API ML

* **API Catalog** 

  The API Catalog plugin lets you view API services that have been discovered by the API Mediation Layer.

### CLI

* **IBM® CICS® Plug-in for Zowe CLI** 

  Allows you to extend the Zowe CLI to interact with CICS programs and transactions.

* **IBM® Db2® Plug-in for Zowe CLI** 

  Lets you interact with Db2 for z/OS to perform tasks through Zowe CLI and integrate with modern development tools.
