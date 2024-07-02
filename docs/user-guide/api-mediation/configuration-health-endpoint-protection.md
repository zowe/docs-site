# Configuring API Gateway Health Check Protection

:::info Role: system programmer
::: 

The `components.gateway.apiml.gateway.health.protected` parameter configures the security setting for the health check endpoint of the API Gateway. This setting determines whether the health check endpoint is accessible without authentication, or alternatively requires authentication. Enabling protection for the health check endpoint can enhance the security of the API Gateway by restricting access to sensitive status information about the Gateway.

## Possible Parameter Values 

* **false**  
This is the default value. When set to `false`, the health check endpoint is not protected and can be accessed without authentication. This allows anyone to access the health check endpoint and obtain information about the status of the Gateway. This setting might be suitable for development or testing environments where security is less of a concern.

* **true**  
When set to `true`, the health check endpoint is protected and requires authentication. Only authenticated users can access the health check endpoint. This ensures that sensitive information about the status of the Gateway is not exposed to unauthenticated users.

To configure the API Gateway to require authentication for the health check endpoint, set the parameter in your configuration file: 

```yaml
zowe:
  components:
    gateway:
      apiml:
        gateway:
            health:
                protected: true
```

To allow open access to the health check endpoint, set the parameter to `false`.

## Environment Recommendations

When setting this parameter, we recommend applying the following values according to your environment:

* **In Production Environments**  
It is recommended to set `apiml.gateway.health.protected` to `true` to enhance security and protect sensitive information about the API Gateway's health status.

* **In Development/Testing Environments**  
For ease of access and testing purposes, setting `apiml.gateway.health.protected` to `false` might be more convenient.
