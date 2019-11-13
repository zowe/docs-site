# API Mediation Layer onboarding enabler - externalized configuration

ZOWE API ML on-boarding enablers are libraries used to simplify the process of user REST services registration with API ML Discovery services.

API ML onboarding enablers provide functionality for building a service, onboarding configuration, and registering and unregistering with a API ML Discovery service by calling respective end points.

The enablers are distributed as a _JAR_ binary file from the ZOWE artifactory [GIZA](https://gizaartifactory.jfrog.io).

Currently, API ML provides several onboarding enablers written in Java. It is possible, however, to provide enablers for other programming languages if there is sufficient demand.  

The most universal Java enabler is our Plain Java Enabler (_PJE_) written with only Java and without advanced IoC/DI dependencies.
   
The _PJE_ can be used by any REST service implemented in Java, avoiding unnecessary dependencies, versions collisions, and unnecessarily large service executables.

Typically the API ML Discovery service, Gateway, and user service endpoint addresses are not known at the time of building the service executables. 
Additionally, security materials like certificates, private/public keys, and corresponding passwords depend on the concrete deployment environment, and are not intended to be available to everyone.
Therefore, to provide a higher level of flexibility, the _PJE_ implements routines for building service onboarding configuration by locating and loading two file sources:

* **internal _service-configuration.yml_** 

   A file which is loaded by the enabler as a Java resource. This file must be stored on the _classpath_ of the user service application. It is usually placed in the `WEB_INF/resources` folder of the `service _JAR_/_WAR_`.
The configuration contained in this file is provided by the service developer/builder. As such, it will not match every possible production environment and its corresponding requirements.
* **external _service-configuration.yml_**

   A file which can be stored anywhere on the local file system. It is provided by the service deployer/system administrator and contains the correct values for the given production environment and corresponding requirements.    
 
Additionally, the values of parameters in both files can be rewritten and patched by Java system properties defined during service installation/configuration, or at start-up time. 
In the _YAML_ file, we use standard rewriting placeholders for the values of parameters in the following format:

`${parameter.key}`

The actual values are taken as [key, value] pairs from Java System properties. They can be provided directly on a command line or set in the Java Servlet context. The concrete approach of how to provide the Servlet context to the user service application depends on the application loading mechanism and the concrete Java servlet container environment. For example, if the user service is deployed in a Tomcat servlet container the context can be configured by placing a file 
named TODO: .... in the Tomcat installation tree.      
   
   runtime envusing and and provide the substitution value as 
TODO: Show full configuration example with 

For example  

 
  
            
