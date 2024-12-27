# Configuring SAF resource checking 

:::info Roles: system programmer, system administrator, security administrator
:::

You can use various SAF resource providers depending on your use case to handle the SAF authorization check. Follow the procedure in this article that applies to your specific configuration use case. 

## SAF Resource Checking Providers 

API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with your External Security Manager (ESM).

Verification of the SAF resource is provided by the following three providers:

- **native**  
  The Native JZOS classes from Java are used to determine SAF resource access. This is the default provider.

  **Note:** This provider cannot be used off-platform.

- **endpoint**  
The Endpoint provider relies on APIs such as a REST endpoint call (ZSS or similar one). This option is disabled by default. In Zowe, ZSS provides the API to check for SAF resource authorization.

- **dummy**  
dummy is the lowest priority provider. This is the dummy implementation and is defined in a file.

:::note
Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the **native** provider. 
:::

Select a specific provider by specifying the `components.gateway.apiml.security.authorization.provider` key in the `zowe.yaml` file. Use the parameter value to
strictly define a provider. If verification is disabled, select the `endpoint` option. 

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.authorization.provider` and set desired value.
3. Restart Zowe.

**Examples:**

* **Native**
    `components.gateway.apiml.security.authorization.provider: native`
    If you leave the property empty, this is used as the default value, even if you enable set `components.gateway.apiml.security.authorization.endpoint.enabled` to `true` (starting from version 3.1).
* **Endpoint**
    `components.gateway.apiml.security.authorization.provider: endpoint`
* **Dummy**
    `components.gateway.apiml.security.authorization.provider: dummy`

To use the endpoint provider, you also need to enable the endpoint property and customize the URL corresponding to the SAF resource authorization. By default, the ZSS API is configured and used.

1. Open the file `zowe.yaml`.
2. Find or add the following properties:
   - `components.gateway.apiml.security.authorization.provider: endpoint` 
   - `components.gateway.apiml.security.authorization.endpoint.enabled: true`
   - `components.gateway.apiml.security.authorization.endpoint.url: <endpoint_url>`
  
   When using ZSS, the default value the property
   `components.gateway.apiml.security.authorization.endpoint.url` is `https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/saf-auth`
   
3. Restart Zowe.

## REST endpoint call

The REST provider calls the external API to retrieve information about access rights. To enable the feature outside of the mainframe, for example when running in Docker, you can use a REST endpoint call using the `GET` method:

- Method: `GET`
- URL: `{base path}/{userId}/{class}/{entity}/{level}`
- Response:
  ```json5
      {
          "authorized": "{true|false}",
          "error": "{true|false}",
          "message": "{message}"
      }
  ```
:::note
For more information about this REST endpoint call, see [ZSS implementation](https://github.com/zowe/zss/blob/master/c/authService.c).
:::

### Native

The Native provider is the easiest approach to use the SAF resource checking feature on the mainframe.

Enable this provider when classes `com.ibm.os390.security.PlatformAccessControl` and `com.ibm.os390.security.PlatformReturned`
are available on the classpath. This approach uses the method described in [Class PlatformAccessControl](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.zsecurity.api.80.doc/com.ibm.os390.security/com/ibm/os390/security/PlatformAccessControl.html?view=kc#checkPermission-java.lang.String-java.lang.String-java.lang.String-int-) in the IBM documentation.

:::note
Ensure that the version of Java on your system has the same version of classes and method signatures.
:::

### Dummy implementation

Use the Dummy provider for testing purpose outside of the mainframe.

1. In the folder where the application is running, create the file `saf.yml`. Alternatively, you can  create the file `mock-saf.yml` in the
test module (root folder). 

:::caution Important:
It is necessary to read the file outside of the JAR. A file (inner or outside) has to exist.
:::

The following YAML presents the structure of the file:

```yaml
  safAccess:
    {CLASS}:
      {RESOURCE}:
        - {UserID}
```

:::note Notes
- Classes and resources are mapped into a map with user IDs contained in a list.
- The load method does not support formatting with periods (`.`), such as shown in the following example:  
  
  **Example:** `{CLASS}.{RESOURCE}`
- Ensure that each element is separated.
- The field `safAccess` is not required to define an empty file without a definition.
- Classes and resources cannot be defined without the user ID list.
- When a user has multiple definitions of the same class and resource only the most privileged access level loads.


