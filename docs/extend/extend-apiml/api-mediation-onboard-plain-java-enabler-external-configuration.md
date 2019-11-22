# API Mediation Layer onboarding configuration

As a service developer, you can provide basic configuration of a service and externalize the configuration parameters values for subsequent customization by a systems administrator. This article describes the process of configuring a REST service for onboarding with the API Mediaiton Layer by using the API ML Plain Java Enabler.

## Introduction

The API ML Plain Java Enabler (_PJE_) is a library which helps to simplify the process of onboarding a REST service. 
This article describes how to provide and externalize the ZOWE API ML onboarding configuration of your REST service using the _PJE_. 

**Note:** For more information about individual configuration parameters and  the their possible values and the service registration process, see the specific documentation for the onboarding approach you are using for your project:

 * [Direct REST call registration (No enabler)](TODO@PZA: provide the link)
 * [Plain Java Enable](TODO@PZA: provide the link)
 * [Spring Enabler](TODO@PZA: provide the link)

The _PJE_ is the most universal ZOWE API ML enabler. This enabler uses only Java and does not use advanced IoC/DI technologies.
The _PJE_ can be used to onboard any REST service implemented in Java, avoiding dependencies, versions collisions, unexpected application behaviour, and unnecessarily large service executables.

Service developers provide onboarding configuration as part of the service source code. While this configuration is valid for the development system environment, it is likely to be different for an automated integration environment. Typically, system administrators need to deploy a service on multiple sites that have different system environments and requirements such as security.

_PJE_ supports both the service developer and the system administrator with the functionality of externalizing the service onboarding configuration. 

The _PJE_ provides a mechanism for loading API ML onboarding service configuration from a _YAML_ file.

## Configuring REST service for API ML onboarding

In most cases the API ML Discovery service, Gateway, and user service endpoint addresses are not known at the time of building the service executables. 
Similarly, security material such as certificates, private/public keys, and their corresponding passwords depend on the concrete deployment environment, and are not intended to be disclosed to everyone.
Therefore, to provide a higher level of flexibility, the _PJE_ implements routines to build service onboarding configuration by locating and loading one or two _YAML_ file sources:

* **internal _service-configuration.yml_** 

  The first configuration file is typically internal to the service deployment artifact. At a minimum this file must be accessible on the service `classpath`. 
  This file contains basic API ML configuration based on values known at development time. Usually, this basic API ML configuration is provided by the service developer and is located in the `/resources` folder of the java project source tree. This file is usually found in the deployment artifacts under `/WEB-ING/classes`.   
  The configuration contained in this file is provided by the service developer/builder. As such, it will not match every possible production environment and its corresponding requirements.

* **external or additional _service-configuration.yml_**

   ***** The second configuration file is used to externalize the configuration. A file which can be stored anywhere on the local file system, as long as that the service has access to that location. 
   This file is provided by the service deployer/system administrator and contains the correct values for the given production environment and corresponding requirements.    

At service boot time, both configuration files are merged, where the externalized configuration (if provided) has higher priority.

The values of parameters in both files can be rewritten and patched by Java system properties defined during service installation/configuration, or at start-up time. 
In the _YAML_ file, we use standard rewriting placeholders for the values of parameters in the following format:

`${apiml.parameter.key}`
 
The actual values are taken from [key, value] pairs defined as Java System properties. These values can be provided directly on a command line or set in the Java Servlet context. 
The concrete approach of how to provide the Servlet context to the user service application depends on the application loading mechanism and the concrete Java servlet container environment. 
For example, if the user service is deployed in a Tomcat servlet container, we can configure the context by placing an _xml_ file with the same name
as the application deployment directory into the `_$CATALINA_BASE/conf/[enginename]/[hostname]/_`. Other containers provide different mechanisms for the same purpose.        

## Plain Java Enabler service onboarding API

You can initialize your service onboarding configuration using different methods of the Plain Java Enabler class `ApiMediationServiceConfigReader`: 

### Automatic initialization of the onboarding configuration by a single method call.  
       
```
public ApiMediationServiceConfig initializeAPIMLConfiguration(ServletContext context); 
```

This method receives the `ServletContext` parameter which holds a map of parameters providing all necessary information for building the onboarding configuration.
The following code block is an example of Java Servlet context configuration.

**Example:**
  
      <Context>
         
         <Parameter name="apiml.config.location" value="/service-config.yml"/>
         <!-- Relative path to configuration file:    
         <Parameter name="apiml.config.additional-location" value="../conf/Catalina/localhost/apiml-plugin-poc_plain-java-enabler.yml" /> 
       -->
         <Parameter name="apiml.config.additional-location" value="/home/pin/bin/apache-tomcat-9.0.14/conf/Catalina/localhost/apiml-plugin-poc_plain-java-enabler.yml" />
          
         <Parameter name="apiml.serviceId" value="discopin" />
         <Parameter name="apiml.serviceIpAddress" value="127.0.0.2" />
         <Parameter name="apiml.discoveryService.hostname" value="localhost" />
         <Parameter name="apiml.discoveryService.port" value="10011" />
          
         <Parameter name="apiml.ssl.enabled" value="true" />
         <Parameter name="apiml.ssl.verifySslCertificatesOfServices" value="true" />
         <Parameter name="apiml.ssl.keyPassword" value="password" />
         <Parameter name="apiml.ssl.keystore.password" value="password" />
         <Parameter name="apiml.ssl.truststore.password" value="password" />
         <Parameter name="apiml.ssl.keystore" value="../keystore/localhost/localhost.truststore.p12" />
         <Parameter name="apiml.ssl.truststore" value="../keystore/localhost/localhost.truststore.p12" />
          
      </Context>
   
   Where the two parameters corresponding to the location of the configuration files are:
    
   * `apiml.config.location`

      This parameter describes the location of the basic configuration file.
   * `apiml.config.additional-location`

      This parameter describes the location of the external configuration file.
    
   The method in this example uses the provided configuration file names in order to load them as _YAML_ files into the internal Java configuration object of type _ApiMediationServiceConfig_.
    
   The other context parameters with the _apiml_ prefix are copied to the application Java System Properties.

 ## Loading _YAML_ configuration files
    
_YAML_ configuration files can be loaded either as a a single file, or by merging two files. Use the method corresponding to the needs of your service.

After successfully loading a configuration file, the loading method _loadConfiguration_ uses Java System properties to substitute corresponding configuration properties. _loadConfiguration_ is described in detail in this article.

### Loading a single _YAML_ configuration file
  
If you need to build your configuration in different way from multiple sources you can load a single configuration file, 
then rewrite any parameters as needed using values from another configuration source.   

Use the following method to load single configuration file:
 
```
public ApiMediationServiceConfig loadConfiguration(String configurationFileName);  
```
  
This method receives single _String_ parameter and can be used to load an internal or external configuration file. Initially, this method tries to load the configuration as Java resource.
If the file is not found, the method will try to resolve the file name as an absolute, and finally as a relative path.
    
If the file is found, the method loads its contents and maps them to internal data classes. 
  
After loading the configuration file, the method will attempt to substitute/rewrite configuration property values with corresponding Java System properties.   

### Loading and merging two _YAML_ configuration files
  
To load and merge two configuration files, use the following method:
   ```
   public ApiMediationServiceConfig loadConfiguration(String internalConfigurationFileName, String externalizedConfigurationFileName)
   ```     
Where:

*  **String internalConfigurationFileName**

   references the basic configuration file name 
   
* **String externalizedConfigurationFileName**

   references the external configuration file.

   **Note:**  The external configuration file takes precedence over the basic configuration file in order to match the target deployment environment.
    After loading and before merging, each configuration will be separately patched using Java System properties.
          
  
The following code block presents an example of how to load and merge onboarding configuration from _YAML_ files.

**Example:**

     @Slf4j
     public class ApiDiscoveryListener implements ServletContextListener {
     
         /**
          * @{link ApiMediationClient} instance used to register and unregister the service with API ML Discovery service.
          */
         private ApiMediationClient apiMediationClient;
     
         /**
          *  Creates {@link ApiMediationServiceConfig}
          *  Creates and initializes {@link ApiMediationClient} instance, which is then used to register this service
          *  with API ML discovery service. The registration method of ApiMediationClientImpl catches all RuntimeExceptions
          *  and only can throw {@link ServiceDefinitionException} checked exception.
          *
          * @param sce
          */
         @Override
         public void contextInitialized(ServletContextEvent sce) {
     
             ServletContext context = sce.getServletContext();
     
             /*
              * Call loadConfiguration method with both config file names initialized above.
              */
             ApiMediationServiceConfig defaultConfig = new ApiMediationServiceConfigReader().initializeAPIMLConfiguration(context);
     
             /*
              * Instantiate {@link ApiMediationClientImpl} which is used to un/register the service with API ML Discovery service.
              */
             apiMediationClient = new ApiMediationClientImpl();
     
             /*
              * Call the {@link ApiMediationClient} instance to register your REST service with API ML Discovery service.
              */
             try {
                 apiMediationClient.register(defaultConfig);
             } catch (ServiceDefinitionException sde) {
                 log.error("Service configuration failed. Check log for previous errors: ", sde);
             }
         }
     
         /**
          * If apiMediationClient is not null, attmpts to unregister this service from API ML registry.
          */
         @Override
         public void contextDestroyed(ServletContextEvent sce) {
             if (apiMediationClient != null) {
                 apiMediationClient.unregister();
             }
         }
     }
