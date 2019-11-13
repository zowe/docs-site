# _API Mediation Layer_ on-boarding enabler - externalized configuration

ZOWE API ML on-boarding enablers are libraries used to simplify the process of user REST services registration with API ML Discovery services and service configuration for routing through API ML Gateway as well as their appearance in the API ML Catalog.

An API ML (on-boarding) enabler provides functionality for building service on-boarding configuration and for registering/unregistering with API ML Discovery service by calling its respective end points.

The enablers are distributed as a _JAR_ binary file from the ZOWE artifactory [GIZA](https://gizaartifactory.jfrog.io).

Currently API ML provides several on-boarding enablers written in Java programming language. It is possible to provide enablers for other programming languages as sufficient demand for this will be identified.  

The most universal JAVA enabler is our Plain Java Enabler (PJE) written only with JAVA without advanced IoC/DI dependencies.
   
The _PJE_ can be used by any REST service implemented in JAVA avoiding unnecessary dependencies, versions collisions and superfluously large size of the service executable.

The _PJE_ implements routines for building service on-boarding configuration using two file sources using same _YAML_ format:

* internal _service-configuration.yml_ - a file, which is loaded by the enabler as a _JAVA_ resource, those it must be stored on the _classpath_ of the user service application. 
It is usually placed in the WEB_INF/resources folder of the service _JAR_/_WAR_.
The configuration contained in this file is provided by the service developer/builder hence it can't match every possible production environment and requirements.
Tipically endpoints addresses and security material are not known at the time of building the service executables.

* external-service-configuration.yml - is a file which can be located anywhere on the local file system. It is provided by the service deployer and contains the correct values for the given production environment and requirements    
 
The parameters values in both files can be additionally rewritten by values provided in _JAVA_ system properties at service installation/configuration time.
 
  
            
