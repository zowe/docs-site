# Setting a unique cookie name for multiple Zowe instances

By default, in the API Gateway, the cookie name is `apimlAuthenticationToken`.
To prevent overwriting of the default cookie name in the case of multiple Zowe instances, a unique cookie name can be configured for each instance.  

Follow this procedure to configure a unique cookie name for the instances:

1. Open the `zowe.yaml` configuration file.
2. Find or add the property  `components.gateway.apiml.security.auth.uniqueCookie`, and set it to `true`. A unique cookie name is generated as `apimlAuthenticationToken.cookieIdentifier`.

    **Example:**  
    If this parameter is set to `true`, and the cookieIdentifier is `1`, the name of the cookie transforms to `apimlAuthenticationToken.1`.  
    If this property is not set to `true`, the cookie name remains `apimlAuthenticationToken` by default.
    
3. Restart Zowe.