# Configuring routing in a multi-tenant environment

In addition to the domain-specific Discovery Service, which is typically in the same LPAR, in a multi-sysplex environment, where the API Gateway in APIML in one domain lets say "Domain APIML 2", may also need to register with the Discovery Service in API ML in domain any lets say "Domain APIML 1", which gathers information about all installed API Gateways
in isolated sysplex environments. Data from the Discovery Service in the API ML "Domain APIML 1" can then be used by the Gateway in the APIML "Domain APIML 2" for routing to individual API Gateways.

Follow these steps to register with additional Discovery Services:

1. Open the `zowe.yaml` configuration file.
2. Add the property `components.gateway.apiml.service.additionalRegistration` and set the value to a list of Discovery service clusters to additional Disovery Services.

   **Example:**
   ```
   components.gateway.apiml.service.additionalRegistration: 
       <!-- APIML on System 1  -->
       - discoveryServiceUrls: https://sys1:10011/eureka/,https://sys1:10021/eureka/ 
         routes:
              - gatewayUrl: /
                serviceUrl: /
       <!-- APIML on System 2 -->
       - discoveryServiceUrls: https://sys2:10011/eureka/,https://sys2:10021/eureka/
         routes:
              - gatewayUrl: /
                serviceUrl: /
       <!-- APIML on System 3 -->
       - discoveryServiceUrls: https://sys3:10011/eureka/,https://sys3:10021/eureka/ 
         routes:
              - gatewayUrl: /
                serviceUrl: /
    ```

   :::note
     Ensure that each API ML instance is defined in a separated record. Do not combine multiple API ML instances in a
     single record. In the case of a high availability setup, the value `discoveryServiceUrls` may contain multiple URLs.
     We highly recommend to provide all available Discovery URLs in the value `discoveryServiceUrls`.

     Always provide the direct address to the system. Do not use the DVIPA address. Using this address could lead to unexpected behaviour.
   :::

3. Restart Zowe.
