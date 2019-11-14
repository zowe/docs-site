# _API Mediation Layer_ - service on-boarding with enabler - externalized configuration

## Introduction
ZOWE API ML on-boarding enablers are libraries used to simplify the process of user REST services registration with API ML Discovery services.

An API ML (on-boarding) enablers provide functionality for building service on-boarding configuration and for registering/unregistering with API ML Discovery service by calling the respective end points.

The enablers are distributed as a _JAR_ binary file from the ZOWE artifactory [GIZA](https://gizaartifactory.jfrog.io).

Currently API ML provides several on-boarding enablers written in Java programming language. It is possible to provide enablers for other programming languages, should a sufficient demand for this is identified.

Read the following chapters to learn how to externalize your service configuration depending on the API ML on-boarding enabler and used.  

## _Plain Java Enabler_

The most universal JAVA enabler is our Plain Java Enabler (_PJE_ from now on) written only with JAVA without advanced IoC/DI dependencies.
   
The _PJE_ can be used by any REST service implemented in JAVA avoiding unnecessary dependencies, versions collisions and superfluously large size of the service executable.

Typically the API ML Discovery service, GW and user service endpoints addresses are not known at the time of building the service executables. 
Also any security material like certificates, private/public keys and corresponding passwords depends on the concrete deployment environment and shouldn't be disclosed to everyone.
To provide higher level of flexibility, the _PJE_ implements routines for building service on-boarding configuration by locating and loading two file sources:

* internal _service-configuration.yml_ - a file, which is loaded by the enabler as a _JAVA_ resource, those it must be stored on the _classpath_ of the user service application. 
It is usually placed in the WEB_INF/resources folder of the service _JAR_/_WAR_.
The configuration contained in this file is provided by the service developer/builder hence it can't match every possible production environment and requirements.
* external-service-configuration.yml - a file which can be stored anywhere on the local file system. It is provided by the service deployer/system administrator and contains the correct values for the given production environment and requirements.    
 
Additionally parameters values in both files can be rewritten/patched by _JAVA_ system properties defined at service installation/configuration or start-up time. 
In the YAML file you can use standard rewriting placeholders for the parameters values, e.g ${parameter.key}. 
The actual values are taken as [key, value] pairs from Java System properties. They can be provided directly on command line or set in Java Servlet context. The concrete approach how to provide Servlet context configuration to the user service application depends on 
the application loading mechanism and concrete Java servlet container environment. For example if the user service is deployed in Tomcat servlet container, we can configure the context by placing a _xml_ file 
named the same as the application deployment directory into the _$CATALINA_BASE/conf/[enginename]/[hostname]/_. Other containers provide different mechanisms for the same purpose.        

### Loading and merging on-boarding configuration from _YAML_ files
  
  Use  
  
The process of loading the configuration consists of the following steps:
  
  * [Reading servlet application context parameters](#reading_servletapplication_context_parameters)
  * [Determining configuration file/s location](#determining_configuration_file-s_location)
  * [Setting System properties](#setting_system_properties)
  * [Loading the configuration file/s](#loading_the_configuration_file-s) 


#### Reading servlet application context parameters


   
#### Determining configuration file/s location
#### Setting System properties 
#### Loading the configuration file/s 

As described in 
In your service application code you need to 


 
            
## Spring boot enabler 
