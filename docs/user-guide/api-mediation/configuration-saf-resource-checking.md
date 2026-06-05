# Configuring SAF resource checking 

:::info Roles: system programmer, system administrator, security administrator
:::

You can use various SAF resource providers depending on your use case to handle the SAF authorization check. Follow the procedure in this article that applies to your specific configuration use case. 

## SAF Resource Checking Providers 

API ML can check for the authorization of the user using the endpoint `/gateway/api/v1/auth/check`. Access to a SAF resource is checked with your External Security Manager (ESM).

Verification of the SAF resource is possible by any of the following three providers:

- **native**  
  The Native JZOS classes from Java are used to determine SAF resource access. This is the default provider.

  **Note:** This provider cannot be used off-platform.

- **endpoint**  
The endpoint provider relies on APIs such as through a REST endpoint call (for example ZSS). This option is disabled by default. In Zowe, ZSS provides the API to check for SAF resource authorization.

- **dummy**  
The dummy provider is the lowest priority provider. This is the dummy implementation and is defined in a file.

**Prioritization of the provider**

Verification of the SAF resource uses the first available provider based on a predefined priority order. The provider selection logic evaluates providers in the following order: **native**, **endpoint**, **dummy**. The first provider that is available and enabled in the configuration is used. The default configuration resolves to the **native** provider.

:::note
The property `components.gateway.apiml.security.authorization.provider` controls the SAF resource authorization provider. Do not confuse this property with the similarly-structured property `components.gateway.apiml.security.auth.provider`, which controls the authentication provider (for example, `zosmf` or `saf`).
:::

### Setting the native provider to perform SAF resource check (Default setting) 

The Native provider is the most straight-forward approach to use the SAF resource checking feature on the mainframe.

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
Ensure that your system uses the same version of Java as the classes and method signatures.
:::

### How SAF resource checking works

When a user accesses a protected endpoint, the API Mediation Layer Gateway intercepts the request and determines which SAF resource to check. The process follows these steps:

1. The Gateway identifies the target SAF class and resource name based on the endpoint being accessed.
2. The configured authorization provider (`native`, `endpoint`, or `dummy`) performs the SAF authorization check.
3. The External Security Manager (ESM) such as IBM RACF, CA ACF2, or CA Top Secret evaluates the access.
4. If the user is authorized, the request proceeds to the target service. If not, the request is denied with a `403 Forbidden` response.

#### Concrete RACF examples

The following table shows common RACF resources used by Zowe components:

| SAF Class | Resource Name | Description |
|-----------|--------------|-------------|
| `MQQUEUE` | `<queue_name>` | Controls access to IBM MQ queues for MQ REST API users |
| `FACILITY` | `IRR.RUSERMAP` | Controls access to RACF user mapping and identity propagation |
| `FACILITY` | `BPX.SERVER` | Controls access to z/OS UNIX System Services server processes |
| `FACILITY` | `EZB.INITACCESS` | Controls access to TCP/IP stack initialization |

For example, to allow a user to access an IBM MQ queue named `APP.REQUEST.QUEUE`, a RACF profile would be defined as:

```
RDEFINE MQQUEUE APP.REQUEST.QUEUE UACC(NONE)
PERMIT APP.REQUEST.QUEUE CLASS(MQQUEUE) ID(ZWEADMIN) ACCESS(READ)
```

Similarly, to control access to the RACF user mapping facility:

```
RDEFINE FACILITY IRR.RUSERMAP UACC(NONE)
PERMIT IRR.RUSERMAP CLASS(FACILITY) ID(ZWEADMIN) ACCESS(READ)
```

### Setting the endpoint provider to perform SAF resouce check

To use the endpoint provider it is necessary to enable the endpoint property and customize the URL corresponding to the SAF resource authorization. By default, the [ZSS API](https://docs.zowe.org/stable/user-guide/zss-api/) is configured and used.

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

### Setting up MQ REST endpoint for SAF authorization

If you use IBM MQ REST API, you can configure SAF resource checking for MQ endpoints.

1. Open the file `zowe.yaml`.
2. Set the SAF authorization provider to `endpoint`:
   ```yaml
   components.gateway.apiml.security.authorization.provider: endpoint
   components.gateway.apiml.security.authorization.endpoint.enabled: true
   ```
3. Define the endpoint URL that performs the MQ SAF authorization check:
   ```yaml
   components.gateway.apiml.security.authorization.endpoint.url: https://<mq_host>:<mq_port>/ibmmq/rest/v1/authorization
   ```
4. Ensure the MQ REST API is configured to use RACF profiles with the class `MQQUEUE` for access control.
5. Restart Zowe.

For more information about MQ REST API authorization, see the [IBM MQ Knowledge Center](https://www.ibm.com/docs/en/ibm-mq).

:::tip Provider recommendations
- Use the **native** provider in production environments for best performance and direct SAF integration on z/OS.
- The **endpoint** provider is deprecated in favor of the native provider. It remains available for compatibility, but new deployments should use the native provider when possible.
:::

###  Setting the dummy provider to perform SAF resource check

Use the Dummy provider for testing purpose outside of the mainframe.

1. Open the file `zowe.yml`.
2. Find or add the following property with the value `dummy`:
  ```
  components.gateway.apiml.security.authorization.provider: dummy
  ```

3. Create the file `saf.yml` in the following folders where the application is running:
 * `<zowe_installation_dir>/components/zaas/bin folder (V3)`  
  The directory for the ZAAS application 
 * `<zowe_installation_dir>/components/gateway/bin folder (V3)`  
  The directory for the Gateway 
  
    Alternatively, you can create the file `mock-saf.yml` in the test module (root folder). 

4. Restart Zowe.

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
- The load method does not support formatting with periods (`.`), such as shown in the following example.  
  
  **Example:** `{CLASS}.{RESOURCE}`
- Ensure that each element is separated.
- The field `safAccess` is not required to define an empty file without a definition.
- Classes and resources cannot be defined without the user ID list.
- When a user has multiple definitions of the same class and resource only the most privileged access level loads.

:::

## Related resources

- [IBM RACF documentation](https://www.ibm.com/docs/en/zos/latest?topic=racf)
- [IBM MQ security documentation](https://www.ibm.com/docs/en/ibm-mq/latest?topic=security)
- [Class PlatformAccessControl (IBM Java)](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.zsecurity.api.80.doc/com.ibm.os390.security/com/ibm/os390/security/PlatformAccessControl.html?view=kc#checkPermission-java.lang.String-java.lang.String-java.lang.String-int-)
- [Zowe ZSS API documentation](https://docs.zowe.org/stable/user-guide/zss-api/)
