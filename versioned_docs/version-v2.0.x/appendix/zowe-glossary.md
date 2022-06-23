# Glossary

This glossary is a comprehensive list of Zowe terminology. It includes technical terms that are specific to Zowe.

## Main Components

* **Zowe Component**
 
  Zowe is a collection of both client and server code. You can install just some of Zowe, or all of it, depending on your needs. Zowe splits the major sections of the code into "Components" which each serve an important purpose. Server Components are packaged in a standardized way to include all services and plugins in one deliverable. Extensions to Zowe can also be delivered as third party Server Components. See: https://docs.zowe.org/stable/extend/packaging-zos-extensions/#zowe-component-manifest

* **Zowe server components** 

  Also known as "Zowe z/OS components" or "Zowe server-side components". Include all the Zowe components that are installed on the z/OS server. 

* **Zowe client components**
 
  Also known as "Zowe client-side components". Include all the Zowe components that are installed on the users PC. 

* **API Mediation Layer (API ML)**

  provides a single point of access for mainframe service REST APIs.

* **Zowe Application Framework**

  The Zowe Application Framework modernizes and simplifies working on the mainframe. With the Zowe Application Framework, you can create applications to suit your specific needs. It is a web user interface (UI) that provides a virtual desktop containing a number of apps allowing access to z/OS function. 

* **Zowe CLI**
* **Zowe Mobile**
* **Zowe Explorer** 
* **Zowe Client SDKs** 
* **Zowe Embedded Browser for RMF/SMF and APIs (ZEBRA)** 

  Provides re-usable and industry compliant JSON formatted RMF/SMF data records, so that many other ISV SW and users can exploit them using open-source SW for many ways. For more information, see the ZEBRA documentation or visit the ZEBRA test/trial site. 
       
* **Zowe Workflow WiZard**

* **Zowe Launcher**

## Architecture

* **Imperative** 

  It's the framework powering Zowe CLI and Zowe Explorer.

* **Explorer** 

  It's the plugin suite for popular client-side editors such as VSCode.

* **Web Explorer**

  It's a suite of websites which is part of the Zowe server installation. It includes the JES, MVS, USS, and IP Explorers. It's not related to the "Explorer" which can be confusing.

* **ZLUX**  

  This is a codename for the Zowe Application Framework, consisting of the Zowe desktop and App server. We should replace as many occurrences of "ZLUX" in our documentation with "desktop", "app framework" and "app-server" according to which part we are talking about. More mentions of ZLUX lead to more confusion. 

* **API Gateway**  

  The API Gateway is a proxy server that routes requests from clients on its northbound edge, such as web browsers or the Zowe command line interface, to servers on its southbound edge that are able to provide data to serve the request. The API Gateway is also responsible for generating the authentication token used to provide single sign-on (SSO) functionality. See https://docs.zowe.org/stable/getting-started/zowe-architecture/#api-gateway

* **API Catalog** 

  The API Catalog provides a list of the API services that have registered themselves as catalog tiles. 

* **API Discovery** 

  a service to allow RESTful services to be dynamically added to the API Catalog

* **App Server** 

  The App Server is a node.js server that is responsible for the Zowe Application Framework. This server provides the Zowe desktop, which is accessible through a web browser. The Zowe desktop includes a number of applications that run inside the Application Framework such as a 3270 emulator and a File Editor.     

* **Caching Service** 

  This feature is designed for Zowe components in a high availability configuration. It supports the High Availability of all components within Zowe, allowing components to be stateless by providing a mechanism to offload their state to a location accessible by all instances of the service, including those which just started 
       
* **Zowe Cross Memory Server (X-MEM)** - V1: 
  
  is an APF authorized server application that provides privileged services to Zowe in a secure manner. The Cross Memory server is a low-level privileged server for managing mainframe data securely. For security reasons, it is not an HTTP server. Instead, this server has a trust relationship with ZSS. Other Zowe components can work through ZSS in order to handle z/OS data that would otherwise be unavailable or insecure to access from higher-level languages and software.    

* **z/OS Explorer Services**
  
* **Zowe Systems Services Server (ZSS)** 

  The Zowe desktop delegates a number of its services to the ZSS server which it accesses through the http port 8542. ZSS is written in C and has native calls to z/OS to provide its services. For more information, see Zowe architecture | Zowe Docs
      
* **ZIS (Zowe Interprocess Services)**  - V2: 

  it is a server but not a webserver.    

* **Zowe server infrastructure**  

  The glue that binds the servers together (zowe-install-packaging)       

##  Installation & Configuration

* **Convenience build**


* **Instance.env** - V1 Only

  The Zowe instance directory contains a file instance.env that stores the Zowe configuration data. The data is read each time Zowe is started. You can modify instance.env to configure the Zowe runtime. See https://docs.zowe.org/stable/user-guide/configure-instance-directory/#updating-the-instanceenv-configuration-file 

* **Zowe runtime**
 
* **Started task** 

  a started task (STC) is a type of runnable/running program on z/os. Zowe started task (See also ZWESVSTC) – Does it need to go in Glossary? https://www.ibm.com/docs/en/zos/2.1.0?topic=tasks-determining-whether-use-started-task
  Zowe has 3 actually:
  - ZWESVSTC: v1 primary server STC
  - ZWESLSTC: v1 HA/FT primary server STC, or the primary server STC for v2 (SVSTC goes away in v2)
  - ZWESISTC: ZIS STC

* **workspace directory**

* **Zowe configuration file**

  Zowe.yaml: It is a YAML file that is required to configure Zowe runtime. It can be used as an alternative to instance.env if you have to configure Zowe in more granular level. It is also required to start Zowe in high availability mode. See https://docs.zowe.org/stable/user-guide/configure-instance-directory/#creating-the-zoweyaml-file 

* **Zowe instance**
    
* **Zowe instance directory** 

  Also known as <INSTANCE_DIR>. It contains information that is specific to a launch of Zowe. It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.

* **Zowe sample library**

  (See also SZWESAMP) – Does it need to go in Glossary?

* **ZWESVUSR** 

  This is a started task ID used to run the PROCLIB ZWESVSTC. The task starts a USS environment using BPXBATSL that executes the core Zowe Desktop (ZLUX) node.js server, the Java API Mediation Layer, and the Z Secure Services C component. To work with USS, the user ID ZWESVUSR must have a valid OMVS segment. For more information, see System requirements | Zowe Docs

* **Zowe runtime directory**

  referred to as `<RUNTIME_DIR>`. Also known as ROOT DIR is the directory where the Zowe runtime is located, also referred to as the <RUNTIME_DIR>. Defaults to the location of where zowe-configure-instance was executed. See Creating and configuring the Zowe instance directory | Zowe Docs 

## Operation

* **App2App**

  It is a unique feature to Zowe environment where one application plug-in can communicate with another and it is applicable to multiple application plug-ins. The application framework provides constructs that facilitate this ability. See Application-to-application communication | Zowe DocsConfig Service: 

* **MVS (multiple virtual storage) Explorer** 

  view z/OS data sets from the Zowe Desktop

* **USS Explorer** 

  a plug-in provided with zowe to view z/OS UNIX files from the Zowe Desktop

* **File Explorer**

  a plug-in provided with Zowe to allow users to view z/OS files and data sets using a RESTful interface. Also used by the MVS Explorer UI and USS Explorer UI

* **JES Explorer** 


## Tools & Plug-ins

* **Configuration file**
 
* **API ML Plain Java Enabler (PJE)**

  is a library which helps to simplify the process of onboarding a REST service with the API ML

* **Service**

  A service provides one or more APIs, and is identified by a service ID. Note that sometimes the term "service name" is used to mean service ID.The default service ID is provided by the service developer in the service configuration file.A system administrator can replace the service ID with a deployment environment specific name using additional configuration that is external to the service deployment unit. Most often, this is configured in a JAR or WAR file.Services are deployed using one or more service instances, which share the same service ID and implementation.

* **Extension** 

* **Plug-in** 


## Community

* **OMP/Open Mainframe Project**
  
  The organization the Zowe project is a member of

* **LF/Linux Foundation**

  The organization the OMP is a member of it.

* **Zowe Conformance Program** 
 
* **Squad** 