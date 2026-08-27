# Configuring SAF resource checking 

:::info Roles: system programmer, system administrator, security administrator
:::

You can use various SAF resource providers depending on your use case to handle the SAF authorization check. Follow the procedure in this article that applies to your specific configuration use case. 

## SAF Resource Checking Providers 

API ML can check for the authorization of the user on certain endpoints. Access to a SAF resource is checked with your External Security Manager (ESM).

Verification of the SAF resource is possible by any of the following three providers:

- **native**  
  The Native JZOS classes from Java are used to determine SAF resource access. This is the default provider.

  **Note:** This provider cannot be used off-platform.

- **endpoint**  
The endpoint provider relies on APIs such as through a REST endpoint call (for example ZSS). This option is disabled by default. In Zowe, ZSS provides the API to check for SAF resource authorization.

- **dummy**  
The dummy provider is the lowest priority provider. This is the dummy implementation and is defined in a file.

:::note
Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the **native** provider. 
:::

### Setting the native provider to perform SAF resource check (Default setting) 

The Native provider is the easiest approach to use the SAF resource checking feature on the mainframe.

1. Open the file `zowe.yaml`.
2. Find or add the following property with the value set as `native`:
  ```
  components.gateway.apiml.security.authorization.provider: native
  ```

3. Restart Zowe.

:::tip
Enable this provider when classes `com.ibm.os390.security.PlatformAccessControl` and `com.ibm.os390.security.PlatformReturned`
are available on the classpath. This approach uses the method described in [Class PlatformAccessControl](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.zsecurity.api.80.doc/com.ibm.os390.security/com/ibm/os390/security/PlatformAccessControl.html?view=kc#checkPermission-java.lang.String-java.lang.String-java.lang.String-int-) in the IBM documentation.
:::

:::note
Ensure that the version of Java on your system has the same version of classes and method signatures.
:::

### Setting the endpoint provider to perform SAF resouce check

To use the endpoint provider it is necessary to enable the endpoint property and customize the URL corresponding to the SAF resource authorization. By default, the ZSS API is configured and used.

1. Open the file `zowe.yaml`.
2. Find or add the following properties and their corresponding values:
   - `components.gateway.apiml.security.authorization.provider: endpoint` 
   - `components.gateway.apiml.security.authorization.endpoint.enabled: true`
   - (Optional)`components.gateway.apiml.security.authorization.endpoint.url: <endpoint_url>`
  
   When using ZSS, the default value of the property
   `components.gateway.apiml.security.authorization.endpoint.url` is `https://<haInstance_hostname>:<gateway_port>/zss/api/v1/saf-auth`

   - **haInstance_hostname**  
     Specifies the Zowe instance hostname from the configuration.
   - **gateway_port**  
     Specifies the Gateway port from the configuration.
   
3. Restart Zowe.

###  Setting the dummy provider to perform SAF resource check

Use the Dummy provider for testing purpose outside of the mainframe.

1. Open the file `zowe.yaml`.
2. Find or add the following property with the value `dummy`:
  ```
  components.gateway.apiml.security.authorization.provider: dummy
  ```

3. Restart Zowe.

In the folder where the application is running, create the file `saf.yml`. Alternatively, you can create the file `mock-saf.yml` in the test module (root folder). 

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
- **CLASS**  
  Specifies the name of the SAF class.
- **RESOURCE**  
  Specifies the name of the SAF resource.

:::note Notes
- Classes and resources are mapped into a map with user IDs contained in a list.
- The load method does not support formatting with periods (`.`), such as shown in the following example:  
  
  **Example:** `{CLASS}.{RESOURCE}`
- Ensure that each element is separated.
- The field `safAccess` is not required to define an empty file without a definition.
- Classes and resources cannot be defined without the user ID list.
- When a user has multiple definitions of the same class and resource only the most privileged access level loads.


