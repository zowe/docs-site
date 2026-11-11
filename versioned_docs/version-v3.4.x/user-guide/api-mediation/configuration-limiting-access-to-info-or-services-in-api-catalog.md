# Limiting access to information or services in the API Catalog

:::info Role: system administrator
:::

As a system administrator, you can limit access to information and/or services available within the API Catalog and through the API Mediation Layer and check for the authorization of the user on certain endpoints.

Choose from the following use cases:


* Use the property `apiml.catalog.hide.serviceInfo` to hide the instance URL value of all services registered to the API ML in the API Catalog.

    See the section [Hide service information](#hide-service-information). 

* The API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked via an External Security Manager (ESM).

    See the article [SAF Resource Checking](./configuration-saf-resource-checking.md).

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
