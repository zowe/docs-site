# Advanced API Catalog features configuration

As a system programmer who wants to configure advanced API Catalog features of the API Mediation Layer, you can customize API Catalog parameters by modifying the `<Zowe install directory>/components/api-catalog/bin/start.sh` file:

## API ML configuration

* **apiml.catalog.hideServiceInfo**

  This parameter is used to hide the instance URL value of all the services registered to the API ML in the API Catalog. This can be useful when the service owner doesn't want to expose sensitive information
  such as the hostname.
  Set the value of `*apiml.catalog.hideServiceInfo` parameter to `true` if you want to enable this functionality for all the services registered to the API Catalog.
  
  Set this parameter in your Zowe YAML configuration (typically `zowe.yaml`) by defining `configs.apiml.catalog.hideServiceInfo`. For example, defining it globally:

    ```yaml
      configs:
         apiml:
            catalog:
                hideServiceInfo: true
    ```
  Or defining it only for lpar1 high availability instance:

    ```yaml
      haInstances:
        lpar1:
          configs:
            apiml:
               catalog:
                  hideServiceInfo: true
    ```    