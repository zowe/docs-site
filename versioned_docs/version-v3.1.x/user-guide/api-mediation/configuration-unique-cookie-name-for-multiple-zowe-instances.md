# Configuring a unique cookie name for a specific API ML instance

:::info Role: system programmer
:::

By default, in the API Gateway, the cookie name is `apimlAuthenticationToken`.
To prevent overwriting of the default cookie name in the case of multiple Zowe instances, a unique cookie name can be configured for each instance.  

Follow this procedure to configure a unique cookie name for the instances:

1. Open the Zowe YAML configuration file.
2. Find or add the property `components.gateway.apiml.security.auth.uniqueCookie`, and set it to `true`.
3. Find the property `zowe.cookieIdentifier` and set it to any word or number that you wish to identify your Zowe instance.
4. Restart Zowe.

This sets a suffix for the API Gateway's cookie name based upon the value of `zowe.cookieIdentifier`.

    **Example:**  
    If the `components.gateway.apiml.security.auth.uniqueCookie` parameter is set to `true` and `zowe.cookieIdentifier` is `1`, the cookie name is `apimlAuthenticationToken.1`.  
    If this property is not set to `true`, the cookie name remains the default value `apimlAuthenticationToken`.
    
