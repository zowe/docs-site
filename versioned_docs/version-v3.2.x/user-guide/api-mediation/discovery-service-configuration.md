# Discovery Service configuration parameters

## Zowe runtime configuration parameters

As an application developer who wants to run Zowe, set the following parameters during the Zowe runtime configuration by modifying the `zowe.yaml` file:

* **[API ML configuration](#api-ml-configuration)**

## API ML configuration

**Follow these steps:**

1. Open the file `zowe.yaml`.
2. Configure the following properties:

* **haInstance.hostname**

  This property is used to set the Discovery Service hostname. The value can be set by defining the `haInstance.hostname` property in the `zowe.yaml` file.

* **components.discovery.port**

  This property is used to set the Discovery Service port. The value can be set by defining the `components.discovery.port` property in the `zowe.yaml` file.
  
* **environments.ZWE_STATIC_DEFINITIONS_DIR**

  The static definition directories can be specified as a parameter at startup and will be scanned by the Discovery Service. These directories contain the definitions of static services.
  **Example:**
  ```yaml
  environments:
      ZWE_STATIC_DEFINITIONS_DIR: config/local/api-defs;config/local2/api-defs
  ```
* **environments.ZWE_DISCOVERY_SERVICES_LIST**

  This parameter contains the list of URLs of the Discovery Service in case of multiple instances of the service on different host.
  **Example:**
    ```yaml
    ZWE_DISCOVERY_SERVICES_LIST: https://localhost2:10021/eureka/,https://localhost3:10031/eureka/
    ```
  **Note:** Each URL within the list must be separated by a comma.The  directories can be specified as a parameter at startup and will be scanned by the Discovery Service. These directories contain the definitions of static services.

* **components.discovery.apiml.security.ssl.verifySslCertificatesOfServices**

  This parameter makes it possible to prevent server certificate validation.

  **Important!** Ensure that this parameter is set to `true` in production environments.
  Setting this parameter to `false` in production environments significantly degrades the overall security of the system.

* **components.discovery.apiml.discovery.serviceIdPrefixReplacer**
    
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

3. Restart Zowe&trade.