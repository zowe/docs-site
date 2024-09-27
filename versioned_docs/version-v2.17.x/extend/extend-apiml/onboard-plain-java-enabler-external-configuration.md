# API Mediation Layer onboarding configuration

This article describes the process of configuring a REST service to onboard with the Zowe API Mediation Layer using the API ML Plain Java Enabler. As a service developer, you can provide basic configuration of a service to onboard to the API ML. You can also externalize configuration parameters for subsequent customization by a systems administrator.

* [Introduction](#introduction)
* [Configuring a REST service for API ML onboarding](#configuring-a-rest-service-for-api-ml-onboarding)
* [Plain Java Enabler service onboarding](#plain-java-enabler-service-onboarding-api)
    * [Automatic initialization of the onboarding configuration by a single method call](#automatic-initialization-of-the-onboarding-configuration-by-a-single-method-call)
* [Validating successful onboarding with the API Mediation Layer](#validating-successful-onboarding-with-the-api-mediation-layer)
* [Loading YAML configuration files](#loading-yaml-configuration-files)
    * [Loading a single YAML configuration file](#loading-a-single-yaml-configuration-file)
    * [Loading and merging two YAML configuration files](#loading-and-merging-two-yaml-configuration-files)

## Introduction

The API ML Plain Java Enabler (PJE) is a library which helps to simplify the process of onboarding a REST service with the API ML. 
This article describes how to provide and externalize the Zowe API ML onboarding configuration of your REST service using the PJE. For detailed instructions about how to onboard your API service using the Plain Java Enabler, see [Onboarding a REST API service with the Plain Java Enabler (PJE)](./onboard-plain-java-enabler.md).

The PJE is the most universal Zowe API ML enabler. This enabler uses only Java, and does not use advanced Inversion of Control (_IoC_) or Dependency Injection (_DI_) technologies.
The PJE enables you to onboard any REST service implemented in Java, avoiding dependencies, versions collisions, unexpected application behavior, and unnecessarily large service executables.

Service developers provide onboarding configuration as part of the service source code. While this configuration is valid for the development system environment, it is likely to be different for an automated integration environment. Typically, system administrators need to deploy a service on multiple sites that have different system environments and requirements such as security.

The PJE supports both the service developer and the system administrator with the functionality of externalizing the service onboarding configuration. 

The PJE provides a mechanism to load API ML onboarding service configuration from one or two _YAML_ files.

## Configuring a REST service for API ML onboarding

In most cases, the API ML Discovery Service, Gateway, and service endpoint addresses are not known at the time of building the service executables. 
Similarly, security material such as certificates, private/public keys, and their corresponding passwords depend on the specific deployment environment, and are not intended to be publicly accessible.
Therefore, to provide a higher level of flexibility, the PJE implements routines to build service onboarding configuration by locating and loading one or two _YAML_ file sources:

* **internal _service-configuration.yml_** 

  The first configuration file is typically internal to the service deployment artifact. This file must be accessible on the service `classpath`. This file contains basic API ML configuration based on values known at development time. Usually, this basic API ML configuration is provided by the service developer and is located in the `/resources` folder of the Java project source tree. This file is usually found in the deployment artifacts under `/WEB-INF/classes`. The configuration contained in this file is provided by the service developer or builder. As such, the configuration will not match every possible production environment and the corresponding requirements of the environment.

* **external or additional _service-configuration.yml_**

   The second configuration file is used to externalize the configuration. This file can be stored anywhere on the local file system, as long as that the service has access to that location. 
   This file is provided by the service deployer/system administrator and contains the correct parameter values for the specific production environment. 

At service start-up time, both _YAML_ configuration files are merged, where the externalized configuration (if provided) has higher priority.

The values of parameters in both files can be rewritten by Java system properties or servlet context parameters that were defined during service installation/configuration, or at start-up time.

In the _YAML_ file, standard rewriting placeholders for parameter values use the following format:

`${apiml.parameter.key}`
 
The actual values are taken from [key, value] pairs defined as Java system properties or servlet context parameters. The system properties can be provided directly on a command line. The servlet context parameters can be provided in the service `web.xml` or in an external file.

The specific approach of how to provide the servlet context to the user service application depends on the application loading mechanism and the specific Java servlet container environment. 

**Example:**

If the service is deployed in a Tomcat servlet container, you can configure the context by placing an _XML_ file with the same name
as the application deployment unit into `_$CATALINA_BASE/conf/[enginename]/[hostname]/_`. 

Other containers provide different mechanisms for the same purpose.        

## Plain Java Enabler service onboarding API

You can initialize your service onboarding configuration using different methods of the Plain Java Enabler class `ApiMediationServiceConfigReader`:

### Automatic initialization of the onboarding configuration by a single method call  

The following code block shows automatic initialization of the onboarding configuration by a single method call:  
       
```
public ApiMediationServiceConfig initializeAPIMLConfiguration(ServletContext context); 
```

This method receives the `ServletContext` parameter, which holds a map of parameters that provide all necessary information for building the onboarding configuration.
The following code block is an example of Java Servlet context configuration.

**Example:**
```
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
```

   The two parameters corresponding to the location of the configuration files are:
    
   * `apiml.config.location`  
   is parameter describes the location of the basic configuration file.

   * `apiml.config.additional-location`  
   This parameter describes the location of the external configuration file.
    
   The method in this example uses the provided configuration file names in order to load them as _YAML_ files into the internal Java configuration object of type _ApiMediationServiceConfig_.
   
   The other context parameters with the _apiml_ prefix are used to rewrite values of properties in the configuration files. 

## Validating successful onboarding with the API Mediation Layer
To ensure that you successfully onboarded a service with the API Mediation Layer, follow these steps: 

  1. Validate successful onboarding. Follow the procedure described in [Verify successful onboarding to the API ML](./onboard-overview.md#verify-successful-onboarding-to-the-api-ml).
 
  2. Check that you can access your API service endpoints through the Gateway.

  3. (Optional) Check that you can access your API service endpoints directly outside of the Gateway.

 ## Loading YAML configuration files
    
_YAML_ configuration files can be loaded either as a single _YAML_ file, or by merging two _YAML_ files. Use the `loadConfiguration` method described later in this article that corresponds to your service requirements. 

After successfully loading a configuration file, the loading method `loadConfiguration` uses Java system properties to substitute corresponding configuration properties.  

### Loading a single YAML configuration file
  
To build your configuration from multiple sources, load a single configuration file, and then 
rewrite parameters as needed using values from another configuration source. See: [Loading and merging two YAML configuration files](#loading-and-merging-two-yaml-configuration-files) described later in this article.   

Use the following method to load a single _YAML_ configuration file:
 
```
public ApiMediationServiceConfig loadConfiguration(String configurationFileName);  
```
  
This method receives a single _String_ parameter and can be used to load an internal or an external configuration file. 


:::note
This method first attempts to load the configuration as a Java resource. If the file is not found, the method attempts to resolve the file name as an absolute. If the file name still cannot be found, this method attempts to resolve the file as a relative path. When the file is found, the method loads the contents of the file and maps them to internal data classes. After loading the configuration file, the method attempts to substitute/rewrite configuration property values with corresponding Java System properties.  
::: 

### Loading and merging two YAML configuration files
  
To load and merge two configuration files, use the following method:
   ```
   public ApiMediationServiceConfig loadConfiguration(String internalConfigurationFileName, String externalizedConfigurationFileName)
   ```     
where:

*  **String internalConfigurationFileName**  
references the basic configuration file name. 
   
* **String externalizedConfigurationFileName**  
references the external configuration file name.

:::note
The external configuration file takes precedence over the basic configuration file in order to match the target deployment environment.
After loading and before merging, each configuration will be separately patched using Java System properties.
:::          
  
The following code block presents an example of how to load and merge onboarding configuration from _YAML_ files.

**Example:**
```
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
```
