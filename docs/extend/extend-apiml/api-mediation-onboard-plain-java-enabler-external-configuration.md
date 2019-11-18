# API Mediation Layer onboarding configuration

## Introduction

API ML Plain Java Enabler (_PJE_ in short) is a library which helps to simplify the process of onboarding a REST service. 
This article describes how to provide and externalize the ZOWE API ML onboarding configuration of your REST service using API ML Plain Java Enabler (_PJE_ in short). 

It does not however discuss the meaning and the possible values of individual configuration parameters. 
For more information about the service registration process and configuration parameters refer to the documentation specific for the onboarding approach you´ve chosen for your project:

 * [Direct REST call registration (No enabler)](TODO@PZA: provide the link)
 * [Plain Java Enable](TODO@PZA: provide the link)
 * [Spring Enabler](TODO@PZA: provide the link)


Our Plain Java Enabler (_PJE_) is the most universal ZOWE API ML enabler. It is written using only Java and without advanced IoC/DI technologies.
The _PJE_ can be used to onboard any REST service implemented in Java, avoiding dependency or versions collisions, unexpected application behaviour and unnecessarily large service executables.

The service developers need to provide onboarding configuration as part of the service source code. This configuration is valid for the development system environment, but most probably will be different for an automated integration environment. 
System administrators (aka deployers) need to deploy a service on multiple sites having different system environments and requirements e.g security.

_PJE_ supports service developer and deployer with functionality for externalizing the service onboarding configuration.

The _PJE_ provides mechanism for loading API ML onboarding service configuration from a YAML file. It allows to provide one or two files. 

The first file is usually internal to the service deployment artifact or at minimum must be accessible on the service classpath. 
It contains basic API ML configuration based on values known at development time. Typically it is provided by the service developer 
and is located in the /resources folder of java project source tree. It usually can be found in the deployment artifact under /WEB-ING/classes.

The second configuration file is used to externalize the configuration. It can be placed anywhere, provided that the service has access to that location. 
It is usualy populated by the system administrator with values dependent on the deployment system environment. 

At service boot time, both configurations are merged, where the externalized configuration (if provided) has higher priority.

The values of the properties contined in both configuration files can be overwritten by Java system properties.

Read bellow to learn how to provide basic configuration and how to externalize the configuration parameters values depending on the API ML onboarding approach used.  

## Configuring REST service for API ML onboarding
  
Typically the API ML Discovery service, Gateway, and user service endpoint addresses are not known at the time of building the service executables. 
Additionally, security material such as certificates, private/public keys, and their corresponding passwords depends on the concrete deployment environment, and are not intended to be disclosed to everyone.
Therefore, to provide a higher level of flexibility, the _PJE_ implements routines to build service onboarding configuration by locating and loading two file sources:

* **internal _service-configuration.yml_** 

   A file which is loaded by the enabler as a Java resource. This file must be stored on the _classpath_ of the user service application. It is usually placed in the `WEB_INF/resources` folder of the `service _JAR_/_WAR_`.
The configuration contained in this file is provided by the service developer/builder. As such, it will not match every possible production environment and its corresponding requirements.

* **external or additional _service-configuration.yml_**

   A file which can be stored anywhere on the local file system. It is provided by the service deployer/system administrator and contains the correct values for the given production environment and corresponding requirements.    
 
Additionally, the values of parameters in both files can be rewritten and patched by Java system properties defined during service installation/configuration, or at start-up time. 
In the _YAML_ file, we use standard rewriting placeholders for the values of parameters in the following format:

`${apiml.parameter.key}`
 
The actual values are taken from [key, value] pairs defined as Java System properties. They can be provided directly on a command line or set in the Java Servlet context. 
The concrete approach of how to provide the Servlet context to the user service application depends on the application loading mechanism and the concrete Java servlet container environment. 
For example, if the user service is deployed in a Tomcat servlet container, we can configure the context by placing a _xml_ file 
named the same as the application deployment directory into the _$CATALINA_BASE/conf/[enginename]/[hostname]/_. Other containers provide different mechanisms for the same purpose.        

## _PJE_ helper code

  * Automatic initialization of the onboarding configuration by single method call.  
       
        public ApiMediationServiceConfig initializeAPIMLConfiguration(ServletContext context); 

    This method receives `ServletContext` parameter which holds a map of parameters providing all necessary information for building the onboarding configuration.
    An example of Java Servlet context configuration is shown bellow:
  
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
   
    The most important parameters are `apiml.config.location` and `apiml.config.additional-location` which provide basic and external configuration file location respectively.   

    The method will use the provided configuration file names and attempt to load them as YAML files into internal Java configuration object of type _ApiMediationServiceConfig_.
    
    The other context parameters prefixed with "apiml." are copied to the application Java System Properties.

    After successfully loading a configuration file the loading method _loadConfiguration_ (see bellow) will use Java System properties to substitute corresponding configuration properties. 
  
  * Loading a single YAML configuration file
  
    If higher flexibility is needed and / or the configuration location is provided differently than by servlet context parameters,
    use the following method to load a single configuration file.  
  
        public ApiMediationServiceConfig loadConfiguration(String configurationFileName);  
  
    This method receives single _String_ parameter. 
    The method and can be used for loading internal or external configuration file. It first tries to load the configuration as Java resource.
    If the file is not found, the method will try to resolve the file name as an absolute and finally as relative path.
    
    If the file is found, the method will load its contents and map them to internal data classes. 
  
    After loading the configuration file, the method will attempt to substitute/rewrite configuration property values with corresponding Java System properties.   

  * Loading and merging both YAML configuration files
  
  Similarly to loading single configuration file we provide method for loading and merging both configuration files. 
    
        public ApiMediationServiceConfig loadConfiguration(String internalConfigurationFileName, String externalizedConfigurationFileName)
        
    Use this method to load and merge both YAML files. The first method parameter provides the basic configuration file name and the second parameter is for the external configuration file.
    The external configuration file takes precedence over teh basic one in order to match the target deployment environment.
    After loading and before merging, each configuration will be separately patched using Java System properties.
          
  
  Example Loading and merging on-boarding configuration from _YAML_ files
  

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
