# Advanced API Catalog features configuration

As a system programmer who wants to configure advanced API Catalog features of the API Mediation Layer, you can customize API Catalog parameters by modifying the `<Zowe install directory>/components/api-catalog/bin/start.sh` file.

## API ML configuration

* **apiml.catalog.hide.serviceInfo**

  This parameter is used to hide the instance URL value of all the services registered to the API ML in the API Catalog. This can be useful when the service owner does not want to expose sensitive information such as the hostname.  

  Set the value of the `*apiml.catalog.hide.serviceInfo` parameter to `true` to to hide the instance URL for all services registered to the API Catalog.
  
  In your Zowe YAML configuration (typically `zowe.yaml`), set this parameter by defining `configs.apiml.catalog.hide.serviceInfo`. 
  
  Example to define this parameter globally:

    ```yaml
      configs:
         apiml:
            catalog:
                hide:
                    serviceInfo: true
    ```
  An alternative example is to define the parameter only for a high availability instance on lpar1:

    ```yaml
      haInstances:
        lpar1:
          configs:
            apiml:
               catalog:
                  hide:
                      serviceInfo: true
    ```    