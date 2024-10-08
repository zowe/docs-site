# Zowe glossary

This glossary is part of a growing list of terms and concepts used throughout the spectrum of Zowe  projects, which includes both technical as well as organizational terms that are specific to Zowe.

If there is a term you are looking for that is not included in this glossary that you think should be included, please send a message to the Zowe Docs squad in the [#zowe-doc](https://openmainframeproject.slack.com/archives/CC961JYMQ) Slack channel to discuss updating this glossary.

:::note
Security is central to a wide range of functionalities in Zowe and includes numerous terms and concepts specific to security. As such, a separate glossary of Zowe Security terminology is available in the _Overview_ section under _Zowe security_. For more information, see the [**Glossary of Zowe Security teminology**](./zowe-security-glossary).

For an overview of security in Zowe, see [the Zowe Security policy](https://www.zowe.org/security) on zowe.org.
:::

## All Core Zowe Projects

### Zowe API Mediation Layer (API ML)

Provides a reverse proxy and enables REST APIs by providing a single point of access for mainframe service REST APIs like MVS Data Sets, JES, as well as working with z/OSMF. API ML has dynamic discovery capability for these services and Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.

<details>
<summary>
Click here for descriptions of the various components that form the API Mediation Layer. 
</summary>

#### API Catalog  
Displays API services that have been discovered by the [API Mediation Layer](#zowe-api-mediation-layer-api-ml).

#### API Discovery Service  
As the central repository of active services in the [API Mediation Layer](#zowe-api-mediation-layer-api-ml) ecosystem, the API Discovery Service continuously collects and aggregates service information to provide status updates. This enables the discoverability of services.

#### API Gateway    
A proxy server that routes requests from clients on its northbound edge (such as web browsers or [Zowe CLI](#zowe-cli)) to servers on its southbound edge that are able to provide data to serve the request.
  
Also responsible for generating the authentication token used to provide single sign-on (SSO) functionality.

#### Caching Service  
Designed for Zowe components in a high availability (HA) configuration. The caching service supports the HA of all components within Zowe, allowing components to be stateless by providing a mechanism to offload their state to a location accessible by all instances of the service, including those which just started.

</details>

### Zowe Application Framework

Modernizes and simplifies working on the mainframe via a web visual interface. Functionality is provided through apps and a desktop user experience called the [Zowe Desktop](#zowe-desktop). Base functionality includes apps to work with JES, MVS Data Sets, Unix System Services, as well as a [3270 Terminal](#3270-terminal), [Virtual Terminal](#virtual-vt-terminal), and an [Editor](#zowe-editor).

### Zowe CLI

Provides a command-line interface that lets you interact with the mainframe remotely and use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. The core set of commands includes working with data sets, USS, JES, as well as issuing TSO and console commands. The Zowe CLI is incredibly popular in modern mainframe education.

### Zowe client projects

Includes all the Zowe projects, or components, that are installed on the user's PC. Also known as *Zowe client-side projects* or *Zowe client-side components*.

Examples include Zowe CLI, Zowe Explorer for Visual Studio Code, Zowe Explorer for IntelliJ IDEA, and Zowe Client SDKs.

### Zowe Client SDKs

Allow extenders to build applications on top of existing programmatic APIs such as z/OSMF. Currently supported client SDKs include Node.js (core), Kotlin, Python, Swift, and Java.

### Zowe Explorer

A Visual Studio Code extension that modernizes the way developers and system administrators interact with z/OS mainframes. Zowe Explorer lets you interact with data sets, USS files, and jobs that are stored on z/OS. Zowe Explorer is incredibly popular in modern mainframe education.

### Zowe server components

Includes all the Zowe components that are installed on z/OS. Also known as *Zowe z/OS components* or *Zowe server-side components*.

#### Zowe Systems Services Server (ZSS)

Working closely with ZIS, ZSS serves as one of the primary, authenticated back-ends that communicates with z/OS and provides Zowe with a number of APIs: z/OS Unix files and data sets, control of the plug-ins and services lifecycle, security management, etc. The [Zowe Desktop](#zowe-desktop) especially delegates a number of its services to ZSS which it accesses through the default http port `7557`.

ZSS is written in C and uses native calls to z/OS to provide its services.

## Architecture and other components

#### Configuration Manager

Works closely with the [Zowe Launcher](#zowe-launcher) to manage the configuration of Zowe across its lifecycle. Interacted with primarily via `zwe` command

#### Core component

The definition of a core component is governed by the Technical Steering Committee (TSC). Typically a core component is a packaged, foundational piece that is part of base Zowe.

From the perspective of a conformant support provider, providing support for Zowe refers to providing support for each core component of Zowe (although providers may place their own limitations on what they support).

A core component is usually actively maintained by one or more squads. A component has a [component manifest file](https://docs.zowe.org/stable/appendix/server-component-manifest/) that helps identify it with the rest of Zowe. 

#### Explorer

When used by itself, **_Explorer_** often refers to the core Zowe component for Visual Studio Code,[ Zowe Explorer](#zowe-explorer). However, the term "Explorer" is often also a part of multiple titles across Zowe.

#### Extension

Generally used to describe additional, non-default Zowe plug-ins or components. See [plug-in](#plug-in) for additional context.

#### Imperative CLI Framework

Also known as Imperative, the code framework that is used to build plug-ins for [Zowe CLI](#zowe-cli).

#### Plug-in

A more general term used to describe a modular piece of some component. Depending on the component or squad context, a plug-in is sometimes referred to as an *app*, *extension*, *plug-in*, etc.

A component may have multiple plug-ins, sometimes working together to form a single purpose or user experience, but an individual plug-in belongs to a single component. See [extension](#extension) for additional context.

#### Secure credential store

Secret storage functionality embedded in core Zowe CLI and Zowe Explorer starting from Zowe V2.

The secure credential store securely stores configured private credentials in the secure vault available on your client operating system. Examples of such vaults include the Windows Credential Manager on Microsoft Windows, and Passwords and Keys on Ubuntu Linux.

Secure credential store can also refer to a separate plug-in of the same name used in Zowe V1 CLI.

#### Service

A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term *service name* can be used to mean *service ID*.

The default service ID is provided by the service developer in the service configuration file. A system administrator can replace the service ID with the specific name of a deployment environment through the use of additional configuration that is external to the service deployment unit. Most often, this is configured in a JAR or WAR file.

Services are deployed using one or more service instances, which share the same service ID and implementation.

#### Team configuration

A method of storing and managing Zowe CLI and Zowe Explorer *team* and *user* profiles introduced in Zowe Version 2.

This method saves team-specific profiles in the `zowe.config.json` configuration file and user-specific profiles in the `zowe.config.user.json` configuration file. The location of the configuration file determines whether these profiles are applied *globally* or *per project*.

#### Web Explorers

A suite of web apps on the [Zowe Desktop](#zowe-desktop) that are part of the [Zowe Application Framework](#zowe-application-framework) and the core Zowe server installation. They include [JES](#jes-explorer), [MVS](#mvs-multiple-virtual-storage-explorer), [USS](#uss-explorer), and IP Explorers. Not related to [Zowe Explorer](#zowe-explorer).

#### Versions

Zowe is a collection of projects that, together, are released in iterative versions. While each Zowe project is developed for a particular version of Zowe (e.g. API ML V1 or API ML V2), each project can also have its own particular version series. For example, Zowe CLI v7.24.1 is part of Zowe v2.16.

The Zowe V1 suite of components is in maintenance state. The Zowe V2 suite of components is in active state, whereby new features are being actively added in every minor V2 release. Zowe V3 is scheduled for release on Sept. 30, 2024, at which time Zowe V1 reaches its End of Support phase.

To learn more about how versioning is applied in Zowe, see [Understanding Zowe release versions](../troubleshoot/troubleshoot-zowe-release.md).

#### ZIS (Zowe Interprocess Services)

An APF-authorized server application that provides privileged services to Zowe in a secure manner. For security reasons, it is not an HTTP server. Instead, this server has a trust relationship with ZSS.
  
Other Zowe components can work through ZSS in order to handle z/OS data that would otherwise be unavailable or insecure to access from higher-level languages and software.

#### zLUX (V1 only)  

This is an older, no-longer-used name for the [Zowe Application Framework](#zowe-application-framework). Note that unreasonable-to-change references still exist (such as GitHub repository names). Other synonyms/similar names include *MVD* (Mainframe Virtual Desktop) and *zlux*.

#### Zowe App Server

Refers to the Node.js-powered Application Server and is part of the [Zowe Application Framework](#zowe-application-framework) core project. The Zowe App Server hosts the web content of the Application Framework and provides the [Zowe Desktop](#zowe-desktop), which is accessible through a web browser.

#### Zowe Chat

An incubator focused on working with the mainframe from popular chat clients such as Mattermost®, Microsoft Teams®, and Slack®.

#### Zowe Component

Zowe is a collection of both *client* and *server* code. You can install only some of Zowe, or all of it, depending on your needs. Zowe splits the major sections of the code into *components*, with each serving an important purpose.
  
Server components are packaged in a standardized way to include all services and plug-ins in one deliverable. Extensions to Zowe can also be delivered as third-party server components. For more information about how these extensions can use a manifest file, see [Zowe component manifest](https://docs.Zowe.org/stable/extend/packaging-zos-extensions/#zowe-component-manifest).

#### Zowe Desktop

Refers to the desktop UI that is part of the [Zowe Application Framework](#zowe-application-framework) core component. The Zowe Desktop includes a number of apps that run inside the App Framework, such as [JES](#jes-explorer), [MVS](#mvs-multiple-virtual-storage-explorer), and [USS](#uss-explorer) Explorers, as well as a [3270 Terminal](#3270-terminal), [Virtual Terminal](#virtual-vt-terminal), and an [Editor](#zowe-editor).

#### Zowe Embedded Browser for RMF/SMF and APIs (ZEBRA)

Provides re-usable and industry-compliant JSON-formatted RMF/SMF data records so that other ISV SW and users can exploit them using open-source SW for many ways. For more information, see the [ZEBRA documentation](https://github.com/zowe/zebra/tree/main/Documentation) or visit [Real ZEBRA Use Cases in Large Production Systems](https://openmainframeproject.org/blog/real-zebra-use-cases-in-large-production-systems-video/) in the Open Mainframe Project website. 

#### Zowe install packaging  

The set of programs (for example, `zwe` command) and utilities (for example, JCL, scripts) which manage the Zowe server configuration and components. The infrastructure standardizes the packaging of components and controls how they are started, stopped, and how configuration is provided to them.

#### Zowe Explorer plug-in for IntelliJ IDEA

Uses the IntelliJ IDEA platform IDEs to provide the ability to work with z/OS data sets, USS files, to explore and manage JES jobs and to work with TSO Console.

#### Zowe Launcher

A server-side program necessary for high availability/fault tolerance (HA/FT). It starts the Zowe server components and monitors their processes so that if a component fails to start or crashes, the launcher restarts the component. Component restart has limits to prevent loops in the event that a component that has uncorrectable problems.

## Community

#### Open Mainframe Project (OMP)
  
An organization which hosts and promotes development of open source software for the benefit of the IBM z mainframe community, including but not limited to z/OS. Zowe(.org) is one of several programs in this project. See the [Open Mainframe Project website](https://www.openmainframeproject.org/) for more information.

#### Squad
  
A group of people contributing and participating in the Zowe project. Such a group owns one or more projects. 

Every squad is required to have a representative on the [Technical Steering Committee](#technical-steering-committee-tsc) (TSC), and participate in relevant working groups. For more information about active Zowe squads, see [Current squads](https://github.com/Zowe/community/blob/master/Technical-Steering-Committee/squads.md#current-squads).

#### Technical Steering Committee (TSC)

The governing body that is responsible for the overall planning, development, and technical feedback assessment of Zowe. The TSC meets every Thursday to go over squad updates and discuss issues regarding the Zowe initiative. To receive notifications of upcoming meetings and agendas, join the [TSC Slack channel](https://openmainframeproject.slack.com/archives/C01H6CY0ZD1).

#### Zowe Conformance Program

The Zowe Support Provider Conformance Program gives vendors the ability to showcase their Zowe support competencies via well-defined criteria. It is administered by the Linux Foundation and Open Mainframe Project.

##  Installation and configuration

#### Base profile

An object in a team configuration file that stores connection information for use with one or more services. Depending on your configuration file type, the base profile can be either a `global_base` or `project_base` profile. Your service profiles can pull information from base profiles as needed, to specify a common username and password only once, for example.

The base profile can optionally store tokens to connect to Zowe API Mediation Layer, which improves security by enabling Multi-Factor Authentication (MFA) and Single Sign-on (SSO).

#### Convenience build

The Zowe installation file for Zowe z/OS components that is distributed as a PAX file in z/OS Unix and contains the runtimes and scripts to install and launch the z/OS runtime. It is the most common method to install Zowe.

#### Extension directory

The standard z/OS Unix directory where Zowe extensions, or additional components, plug-ins, etc., outside the default install are stored. It is specified in the Zowe configuration file via `zowe.extensionDirectory`.

#### Instance.env (V1 only)

The Zowe instance directory contains a `instance.env` file that stores Zowe configuration data. These data are read each time Zowe is started. You can modify `instance.env` to configure the [Zowe runtime](#zowe-runtime). For more information about updating this configuration data, see [Updating the instance.env configuration file](https://docs.Zowe.org/V1.28.x/user-guide/configure-instance-directory#updating-the-instanceenv-configuration-file).

#### Log directory

The standard z/OS Unix directory where Zowe logs are stored. It is specified in the Zowe configuration file via `zowe.logDirectory`.

#### OMVS

Use of z/OS UNIX services requires a z/OS UNIX security context, referred to as an OMVS segment, for the user ID associated with any unit of work requesting these services. To learn more consult [IBM Documentation](https://www.ibm.com/docs/en/zos/2.5.0?topic=profiles-omvs-segment-in-user).

#### Parent profile

An object in a team configuration file that groups service profiles together that share the same properties and values (for example, hostname or credentials). A parent profile makes it possible to define properties for its group of service profiles in one place rather than duplicating values throughout a configuration.

#### Runtime directory

The z/OS Unix directory for the [Zowe runtime](#zowe-runtime), specified in the Zowe configuration file via `zowe.runtimeDirectory`. Also the parent directory of the `zwe` command.

#### Service profile

An object in a team configuration file that stores connection information for a specific mainframe service, such as IBM z/OSMF. Plug-ins can introduce other service profile types, such as the CICS profile to connect to IBM CICS.

#### SMP/E

The Zowe installation for Zowe z/OS components that is distributed as an SMP/E package, identified by FMID, and contains the runtimes and the scripts to install and launch the z/OS runtime. First the initial package is installed, and then a PTF is applied. SMP/E is the second most common method to install Zowe.

#### SMP/E with z/OSMF workflow

A similar process as [SMP/E](zowe-glossary.md#smpe), except this installation method is performed through the z/OSMF web interface as a Zowe SMP/E workflow. SMP/E with z/OSMF workflow is the third most common way to install Zowe.

#### Started task (STC)

A type of runnable/running program on z/OS and the primary way to run Zowe. For more information about when to use started tasks, see [Determining whether to use a started task](https://www.ibm.com/docs/en/zos/2.1.0?topic=tasks-determining-whether-use-started-task).

Zowe V2 has two started tasks:
- ZWESLSTC: The primary Zowe STC. In Zowe V1, it was just the HA/FT primary STC.
- ZWESISTC: The STC for the Zowe cross memory server (referred to as ZIS, formally XMEM)
- ZWESVSTC (outdated): V1 only

#### Workspace directory

The standard z/OS Unix directory where Zowe server component and extension configuration is stored. In V1, this directory was located within the instance directory. In V2 it is specified in the Zowe configuration file via `zowe.workspaceDirectory`.

#### Zowe configuration file

The Zowe V2 replacement for `instance.env` in V1. The Zowe configuration file is a YAML file that is required to configure the [Zowe runtime](#zowe-runtime). The zowe YAML file is used across every step in Zowe, from configuration to install to start.
  
Sometimes this configuration file is referred to as the *Zowe.yaml file*. For more information on various attributes, see [Zowe YAML configuration file reference](https://docs.Zowe.org/stable/appendix/Zowe-yaml-configuration/).

#### Zowe instance directory (V1 only)

Also known as `<INSTANCE_DIR>`, this directory contains information that is specific to a launch of Zowe. It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.
  
The instance directory also contains a log directory where different microservices write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.

#### Zowe runtime

Refers to the full, unarchived set of binaries, executable files, scripts, and other elements that are run when Zowe is started.
 
#### Sample library

The cross memory server runtime artifacts, the JCL for the started tasks, the parmlib, and members containing sample configuration commands are found in the SZWESAMP PDS sample library. For more information, see [PDS sample library and PDSE load library](https://docs.zowe.org/stable/user-guide/configure-xmem-server/#pds-sample-library-and-pdse-load-library).

#### ZWEADMIN

A user group on the system that [ZWESVUSR](#zwesiusr) and [ZWESIUSR](#zwesvusr) should belong to. This user group requires a valid [OMVS](#omvs) segment. 

#### ZWESIUSR

A started task ID used to run the PROCLIB ZWESISTC that launches the cross memory server (also known as ZIS). It must have a valid [OMVS](#omvs) segment. For more information, see [ZWESIUSR requirements](../user-guide/assign-security-permissions-to-users.md).

#### ZWESVUSR

A started task ID used to run the PROCLIB ZWESLSTC. The task starts a USS environment using BPXBATSL that executes server components such as the Application Framework, the API ML, and ZSS. To work with USS, the user ID ZWESVUSR must have a valid OMVS segment. For more information, see [ZWESVUSR requirements](../user-guide/assign-security-permissions-to-users.md).

## Plug-ins and extensions

### API Mediation Layer

#### API Catalog

Displays API services that have been discovered by the [API Mediation Layer](#zowe-api-mediation-layer-api-ml).

### Zowe Application Framework

#### 3270 Terminal

An applicationin the [Zowe Desktop](#zowe-desktop) that provides a user interface that emulates the basic functions of IBM 3270 family terminals.

#### File Tree

Formally known as the *File Explorer*, the FT refers to a re-usable widget existing in multiple apps across the [Zowe Desktop](#zowe-desktop) to display z/OS Unix files and data sets.

#### IP Explorer

An application in the [Zowe Desktop](#zowe-desktop) you can use to monitor the TCP/IP stacks, and view active connections and reserved ports.

#### JES Explorer

An application in the [Zowe Desktop](#zowe-desktop) to interact with z/OS UNIX files.

#### MVS (Multiple Virtual Storage) Explorer

An application in the [Zowe Desktop](#zowe-desktop) to interact with z/OS data sets. Though still supported, active development has been moved to the [Zowe Editor](#zowe-editor).

#### USS Explorer

An application in the [Zowe Desktop](#zowe-desktop) to interact with z/OS UNIX files. Though still supported, active development has been moved to the [Zowe Editor](#zowe-editor).

#### Virtual (VT) Terminal

An application in the [Zowe Desktop](#zowe-desktop) that provides a user interface that emulates the basic functions of DEC VT family terminals.

#### Zowe Editor

An application in the [Zowe Desktop](#zowe-desktop) to interact with z/OS data sets and Unix files. It uses the [File Tree](#file-tree).

### Zowe CLI Extensions

#### IBM® CICS® Plug-in for Zowe CLI

Extends the Zowe CLI to interact with CICS programs and transactions.

#### IBM® Db2® Plug-in for Zowe CLI

Enables interaction with Db2 for z/OS to perform tasks through Zowe CLI and integrate with modern development tools.
    
## Use and development

### API Mediation Layer

#### Micronaut Enabler

A guide which helps to simplify the process of onboarding a REST service with the API ML, using [Micronaut](https://micronaut.io/) and [Gradle](https://gradle.org/).

#### Node.js Enabler

An NPM package which helps to simplify the process of onboarding a REST service written in Node.js with the API ML.

#### Plain Java Enabler (PJE)

A library which helps to simplify the process of onboarding a REST service with the API ML, serving the needs of Java developers who are not using either Spring Boot, Spring Framework, or Spring Cloud Netflix.

#### Sprint Boot Enablers

A collection of enablers which help to simplify the process of onboarding a REST service with the API ML using various versions of Spring framework.

### Zowe Application Framework

#### Accessing the Desktop

The [Zowe Desktop](#zowe-desktop) is accessed through the [API ML](#zowe-api-mediation-layer-api-ml). The Desktop URL uses the following format:
```
https://${zowe.externalDomains[0]}:{zowe.externalPort}/zlux/ui/v1
```

#### App2App

A feature of the Zowe environment where one application plug-in can communicate with another. The [Zowe Application Framework](#zowe-application-framework) provides constructs that facilitate this ability. For more information, see [Application-to-application communication](../extend/extend-desktop/mvd-apptoappcommunication).

#### Config Service

A part of the Application Framework which allows plug-ins and the Framework itself to store user configuration as JSON or binary formats. The configuration is stored in a hierarchy in which company-wide and system-wide defaults can exist for all users. Users may override the defaults if policy allows it. What can be stored and what can be overridden depends on plug-in definition and administrative configuration.
