# Limiting access to information or services in the API Catalog

:::info**Role:** system administrator
:::


As a system administrator, you can limit access to information and/or services available within the API Catalog and through the API Mediation Layer and check for the authorization of the user on certain endpoints.

Choose from the following use cases:


* Use the property `apiml.catalog.hide.serviceInfo` to hide the instance URL value of all services registered to the API ML in the API Catalog.

    For more information, see the section [Hide service information](./api-mediation/api-catalog-configuration/#hide-service-information). 

* The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked via an External Security Manager (ESM).

    For more information, see the section [SAF Resource Checking](./api-mediation/api-gateway-configuration/#saf-resource-checking).

## Hide service information

1. Open the file `zowe.yaml`.
2. Configure the following properties:

   * **apiml.catalog.hide.serviceInfo**

     This parameter is used to hide the instance URL value of all services registered to the API ML in the API Catalog. This customization can be useful when the service owner does not want to expose sensitive information such as the hostname.  

     Set the value of the `*apiml.catalog.hide.serviceInfo` parameter to `true` to hide the instance URL for all services registered to the API Catalog.
  
     In your Zowe YAML configuration (typically `zowe.yaml`), set this parameter by defining `configs.apiml.catalog.hide.serviceInfo`.
  
     Follow this example to define this parameter globally.

     **Example:**

       ```yaml
         configs:
            apiml:
               catalog:
                   hide:
                       serviceInfo: true
       ```

     An alternative is to define this parameter only for a high availability instance on lpar1.

     **Example:**

       ```yaml
         haInstances:
           lpar1:
             configs:
               apiml:
                  catalog:
                     hide:
                         serviceInfo: true
       ```
3. Restart Zowe.

## SAF Resource Checking

The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with ESM.

Verification of the SAF resource is provided by the following three providers:

- **`endpoint`**  
This is the highest priority provider, such as a REST endpoint call (ZSS or similar one). This option is disabled by default. In Zowe, ZSS has the API to check for SAF   resource authorization.
  
- **`native`**  
The Native JZOS classes from Java are used to determine SAF resource access. This is the default provider.
  
- **`dummy`**  
This is the lowest priority provider. This is the dummy implementation and is defined in a file.

**Note:** Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the native provider. 

You can select a specific provider by specifying the `components.gateway.apiml.security.authorization.provider` key in the `zowe.yaml` file. Use the parameter value to
strictly define a provider. If verification is disabled, select the `endpoint` option. 

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.authorization.provider` and set desired value.
3. Restart Zowe.

**Examples:**
```
components.gateway.apiml.security.authorization.endpoint.url: endpoint
```
**Note:** To configure the `endpoint` provider, add the following additional property:
`components.gateway.apiml.security.authorization.endpoint.enabled: true`
```
components.gateway.apiml.security.authorization.provider: native
```
```
components.gateway.apiml.security.authorization.provider: dummy
```

To use the endpoint provider, customize the URL corresponding to the SAF resource authorization. By default, the ZSS API is configured and used. 

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.authorization.endpoint.url` and set desired value.
   The default value for ZSS API is `https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/saf-auth`
3. Restart Zowe.

For more information about the SAF resource checking providers, see [SAF Resource Checking Providers](api-mediation-saf-resource-checking.md).
