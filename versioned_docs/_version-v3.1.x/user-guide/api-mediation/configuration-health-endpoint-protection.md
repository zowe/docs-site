# Configuring Health Check Protection

:::info Role: system programmer
::: 

As a system programmer, you can disable the security setting for the health check endpoint of the API Gateway. This setting determines whether the health check endpoint is accessible without authentication, or alternatively requires authentication. In Zowe V2, authentication was not required. Disabling protection for the health check endpoint can limit the security of the API Gateway by allowing access to sensitive status information about the Gateway.

Use the following procedure to set the value of the health check endpoint of the API Gateway:  

1. Open the file `zowe.yaml`.
2. Configure the following property:

* `components.gateway.apiml.health.protected`  
This property defines whether the health check endpoint is accessible with or without authentication.

:::note
The default value of this parameter is `true`.
:::

**Example:**
```yaml
components:
    gateway:
        apiml:
            gateway:
                health:
                    protected: true
```

In this example, setting `protected` to `true` protects the health check endpoint by requiring authentication. Only authenticated users can access the health check endpoint. Requiring authentication ensures that sensitive information about the status of the Gateway is not exposed to unauthenticated users.

To allow open access to the health check endpoint, set the parameter to `false`. Setting this parameter to `false` permits access to this endpoint without authentication. In this case, anyone can access the health check endpoint and obtain information about the status of the Gateway.

* `components.discovery.apiml.health.protected`  
  This property defines whether the health check endpoint on Discovery service is accessible with or without authentication.
* `components.apiCatalog.apiml.health.protected`  
  This property defines whether the health check endpoint on API Catalog is accessible with or without authentication.


## Environment Recommendations

When setting this parameter, we recommend applying the following values according to your environment:

* **In Production Environments**  
It is recommended to set `components.*.apiml.health.protected` to `true` to enhance security and protect sensitive information about the API Gateway's health status. This is the default.

* **In Development/Testing Environments**  
 setting `components.*.apiml.health.protected` to `false` can simplify the testing process, reduce development overhead, and assist with debugging.  
