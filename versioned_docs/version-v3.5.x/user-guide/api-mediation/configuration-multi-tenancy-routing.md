# Configuring routing in a multi-tenant environment

In a multi-sysplex environment, both the domain-specific Discovery Service as well as one or more additional Discovery Services may require registration with the Discovery Service in the domain which gathers information about all installed API Gateways in isolated sysplex environments. 

The domain-specific Discovery Service is typically in the same LPAR in a multi-sysplex environment. However, the API Gateway in API ML in one domain (for example in Domain API ML 2) may also need to register with the API ML Discovery Service in a separate domain (for example in Domain API ML 1), which gathers information about all installed API Gateways in isolated sysplex environments. After registration, data from the Discovery Service in Domain API ML 1 can be used by the Gateway in Domain API ML 2 for routing to individual API Gateways.

Follow these steps to register with additional Discovery Services:

1. Open the `zowe.yaml` configuration file.
2. Add the property `components.gateway.apiml.service.additionalRegistration` and set the value to a list of Discovery service clusters to additional Disovery Services.

   **Example:**
   ```
   components.gateway.apiml.service.additionalRegistration: 
       <!-- APIML on System 1  -->
       - discoveryServiceUrls: https://sys1:10011/eureka/,https://sys1:10021/eureka/ 
     <!-- APIML on System 2 -->
       - discoveryServiceUrls: https://sys2:10011/eureka/,https://sys2:10021/eureka/
      <!-- APIML on System 3 -->
       - discoveryServiceUrls: https://sys3:10011/eureka/,https://sys3:10021/eureka/ 
    ```

   :::note
     Ensure that each API ML instance is defined in a separated record. Do not combine multiple API ML instances in a
     single record. In the case of a high availability setup, the value `discoveryServiceUrls` may contain multiple URLs.
     We highly recommend to provide all available Discovery URLs in the value `discoveryServiceUrls`.

     Always provide the direct address to the system. Do not use the DVIPA address. Using this address could lead to unexpected behaviour.
   :::
3. Add property `components.gateway.apimlId` and set the value to a unique string to identify gateway for routing.

   **Example:**
   ```yaml
   components.gateway.apimlId: apiml1
   ```
   
4. Restart Zowe.

You completed the procedure to register with additional Discovery Services.