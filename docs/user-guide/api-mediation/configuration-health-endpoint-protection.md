# Configuring API Gateway Health Check Protection

:::info Role: system programmer
::: 

As a system programmer, you can configure the security setting for the health check endpoint of the API Gateway. This setting determines whether the health check endpoint is accessible without authentication, or alternatively requires authentication. Enabling protection for the health check endpoint can enhance the security of the API Gateway by restricting access to sensitive status information about the Gateway.

Use the following procedure to set the value of the health check endpoint of the API Gateway:  

1. Open the file `zowe.yaml`.
2. Configure the following property:

* `components.gateway.apiml.gateway.health.protected`  
This property defines whether the health check endpoint is accessible with or without authentication.

:::note
The default value of this parameter is `false`.
:::

**Example:**
```yaml
zowe:
  components:
    gateway:
      apiml:
        gateway:
            health:
                protected: true
```

In this example, setting `protected` to ` true` protects  the health check endpoint by requiring authentication. Only authenticated users can access the health check endpoint. This ensures that sensitive information about the status of the Gateway is not exposed to unauthenticated users.

To allow open access to the health check endpoint, set the parameter to `false`. Setting this parameter to `false` permits access to this endpoint without authentication. In this case, anyone can access the health check endpoint and obtain information about the status of the Gateway.

## Environment Recommendations

When setting this parameter, we recommend applying the following values according to your environment:

* **In Production Environments**  
It is recommended to set `apiml.gateway.health.protected` to `true` to enhance security and protect sensitive information about the API Gateway's health status.

* **In Development/Testing Environments**  
 setting `apiml.gateway.health.protected` to `false` can simplify the testing process, reduce development overhead, and assist with debugging.  
