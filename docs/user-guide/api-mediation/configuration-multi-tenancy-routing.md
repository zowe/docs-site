# Configuring routing in a multi-tenant environment

In addition to the domain-specific Discovery Service, which is typically in the same LPAR, in a multi-sysplex environment, the API Gateway may also need to register with a Central Discovery Service which gathers information about all installed API Gateways
in isolated sysplex environments. Data from the Central Discovery Service can then be used by the Central Gateway for routing to individual API Gateways.

Follow these steps to register with additional Discovery Services:

1. Open the `zowe.yaml` configuration file.
2. Add the property `components.gateway.apiml.service.additionalRegistration` and set the value to a list of Discovery service clusters to additional Disovery Services.

   **Example:**
   ```
   components.gateway.apiml.service.additionalRegistration: 
       <!-- central APIML -->
       - discoveryServiceUrls: https://sys1:10011/eureka/,https://sys1:10021/eureka/ 
                    routes:
                            gatewayUrl: /
                            serviceUrl: /
     <!-- APIML on System 2 -->
       - discoveryServiceUrls: https://sys2:10011/eureka/,https://sys2:10021/eureka/
                    routes:
                            gatewayUrl: /
                            serviceUrl: /
      <!-- APIML on System 3 -->
       - discoveryServiceUrls: https://sys3:10011/eureka/,https://sys3:10021/eureka/ 
                    routes:
                            gatewayUrl: /
                            serviceUrl: /
    ```
3. Restart Zowe.
