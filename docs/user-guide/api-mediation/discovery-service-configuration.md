# Discovery Service configuration parameters

## Zowe runtime configuration parameters

As an application developer who wants to run Zowe, set the following parameters during the Zowe runtime configuration by modifying the `<Zowe install directory>/components/discovery/bin/start.sh` file:

* **[API ML configuration](#api-ml-configuration)**
* **[Eureka configuration](#eureka-configuration)**

## API ML configuration

* **apiml.discovery.userid**

    The Discovery service in HTTP mode protects it's endpoints with basic authentication instead of client certificate. This parameter  specifies the userid. The default value is `eureka`. 

* **apiml.discovery.password**

    This parameter specifies the password for the basic authentication used by the Discovery Service in HTTP mode. The default value is `password`.
    
* **apiml.discovery.allPeersUrls**

    This parameter contains the list of URLs of the Discovery Service in case of multiple instances of the service on different host. 
    **Example:** 
    ```yaml
    apiml:
        discovery:
            allPeersUrls: https://localhost2:10021/eureka/,https://localhost3:10031/eureka/
    ```
    **Note:** Each URL within the list must be separated by a comma.
    
* **apiml.discovery.staticApiDefinitionsDirectories**

    The static definition directories can be specified as a parameter at startup and will be scanned by the Discovery Service. These directories contains the definitions of static services.
     **Example:** 
        ```yaml
        apiml:
            discovery:
                staticApiDefinitionsDirectories: config/local/api-defs;config/local2/api-defs

* **apiml.discovery.serviceIdPrefixReplacer**
    
    This parameter is used to modify the service ID of a service instance, before it registers to API ML.
    Using this parameter ensures compatibility of services that use a non-conformant organization prefix with v2, based on Zowe v2 conformance.
    The value of the `*apiml.discovery.serviceIdPrefixReplacer` parameter is represented as a tuple that contains two strings, separated by a comma. The format of this parameter contains the following two elements:
    * First, the prefix that you want to replace in the service ID
    * Second, the new prefix that will be replaced
    
  **Example:**
    The value of the parameter has the following format: `oldServiceIdPrefix,newServiceIdPrefix`

    Set this parameter in your Zowe YAML configuration (typically `zowe.yaml`) by defining `configs.apiml.discovery.serviceIdPrefixReplacer`. For example, defining it globally:

    ```yaml
      configs:
         apiml:
            discovery:
                serviceIdPrefixReplacer: ca*,bcm
    ```
     Or defining it only for lpar1 high availability instance:

    ```yaml
      haInstances:
        lpar1:
          configs:
            apiml:
               discovery:
                  serviceIdPrefixReplacer: ca*,bcm
    ```    

## Eureka configuration

The Discovery Service contains a configuration for implementing the client-side service discovery and for defining a Eureka Server for service registry. Such configuration is shown below:

```yaml
eureka:
    instance:
        hostname: ${apiml.service.hostname}
        ipAddress: ${apiml.service.ipAddress}
        port: ${server.port}
        securePort: 0
        nonSecurePortEnabled: true
        securePortEnabled: false
        preferIpAddress: ${apiml.service.preferIpAddress}
        statusPageUrl: http://${apiml.service.hostname}:${apiml.service.port}/application/info
        healthCheckUrl: http://${apiml.service.hostname}:${apiml.service.port}/application/health
    client:
        registerWithEureka: true
        fetchRegistry: true
        region: default
        serviceUrl:
            defaultZone: ${apiml.discovery.allPeersUrls}
    server:
        useReadOnlyResponseCache: false
```

* **eureka.client.registerWithEureka**
    If we make this property as true then while the server starts the inbuilt client will try to register itself with the Eureka server.

* **eureka.client.registerWithEureka**
    The inbuilt client will try to fetch the Eureka registry if we configure this property as true.

* **eureka.client.serviceUrl.defaultZone**
    A fallback value that provides the Eureka service URL for any client that does not express a preference (in other words, it is a useful default).

More information about the other Eureka parameters can be found in the [Spring Cloud Netflix Eureka documentation](https://cloud.spring.io/spring-cloud-netflix/multi/multi__service_discovery_eureka_clients.html).
