# Configuring AT-TLS for API Mediation Layer

The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application 
Transparent Transport Layer Security (AT-TLS).

Review this article for descriptions of the configuration parameters required to make the Zowe API Mediation Layer work with AT-TLS, and security recommendations.

:::info**Role:** security administrator
:::

- [Zowe configuration](#zowe-configuration)
  - [Other Zowe components](#other-zowe-components)
- [Security considerations](#security-considerations)
- [AT-TLS rules](#at-tls-rules)
  - [Inbound rules](#inbound-rules)
  - [Outbound rules](#outbound-rules)
  - [Ciphers](#ciphers)
- [High Availability](#high-availability)
- [Troubleshooting](#troubleshooting)

Starting with Zowe version 2.13, it is possible to leverage AT-TLS within API Mediation Layer. Each API ML component can run with AT-TLS rules applied. Some components, such as the Discovery service, can be made AT-TLS aware by enabling the AT-TLS profile, whereby TLS information can be utilized. Such information could be a client certificate.

## AT-TLS configuration for Zowe 

:::note
Support for AT-TLS was introduced in Zowe v1.24. In this early version, startup was not possible in some versions of Zowe. For full support, we recommend that you upgrade to v2.13 or a later version of Zowe.
:::

Follow these steps to configure Zowe to support AT-TLS:

1. Enable the AT-TLS profile and disable the TLS application in API ML. Update `zowe.yaml` with the following values under the respective component in the `zowe.components` section.

```yaml
components.*.spring.profiles.active: attls
components.*.server.ssl.enabled: false
components.*.server.internal.ssl.enabled: false
```

While API ML does not handle TLS on its own with AT-TLS enabled, API ML requires information about the server certificate that is defined in the AT-TLS rule.

2. Update the `zowe.yaml` file for each respective API ML component in the `zowe.components` sections with the path to the SAF Key ring from the AT-TLS rule. Specify the alias that is used for inbound communication:

```yaml
components.*.certificate.keystore.file: <SAF-key-ring-from-AT-TLS-rule>
components.*.certificate.keystore.type: JCERACFKS
components.*.certificate.keystore.password: password
components.*.certificate.keystore.alias: <certificate alias / label from AT-TLS rule>
```

3. If there is an outbound AT-TLS rule configured for the link between the API Gateway and z/OSMF, update or set the `zowe.zOSMF.scheme` to `http`.

:::note**Notes**
* Currently, AT-TLS is not supported in the API Cloud Gateway Mediation Layer component.

* Given that the Gateway is a core component of API ML, other components that need to interact with the Gateway, such as Zowe ZLUX App Server, also require AT-TLS configuration. 
:::

:::caution**Important security consideration**

Configuring AT-TLS for the Zowe API Mediation Layer requires careful consideration of security settings, specifically as these settings apply to the Client Certificate authentication feature in Zowe API Mediation Layer components, as well as for onboarded services that support the x.509 client certificates authentication scheme.

In general terms, the outbound AT-TLS rules (i.e. to make a transparent https call through http) that are configured to send the server certificate should be limited to the services that __require__ service to service authentication. One example of required service to service communication could be the API Gateway authenticating with the Discovery Service.

The Discovery Service endpoints are not reachable by standard API Gateway routing by default.
:::

## AT-TLS rules

This section describes suggested AT-TLS settings, and serves as guidelines to set your AT-TLS rules. 

### Inbound rules

A generic inbound rule can be set for all core API Mediation Layer services:

```pagent
TTLSRule ApimlServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 10310-10320
  Jobname ZWE*
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ApimlServerEnvironmentAction
  TTLSConnectionActionRef ApimlServerConnectionAction
}

TTLSGroupAction ServerGroupAction
{
  TTLSEnabled On
}

TTLSEnvironmentAction ApimlServerEnvironmentAction
{
  HandshakeRole ServerWithClientAuth
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ApimlKeyring
}

TTLSConnectionAction ApimlServerConnectionAction
{
  HandshakeRole ServerWithClientAuth
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlConnectionAdvParms
}
```

The `PortRange` of this inbound rule is taken from the list of API Mediation Layer components in the `zowe.yaml` file. The `PortRange` should cover the following components:

- Gateway: default port 7554
- Discovery: default port 7553
- Caching Service: 7555
- API Catalog: default port 7552
- Metrics Service: default port 7551


Note the setting `HandshakeRole`. This setting applies to core services which authenticate through certificates with each other. This setting allows the API Gateway to receive and accept X.509 client certificates from API Clients.

### Outbound rules

#### For z/OSMF

```pagent
TTLSRule ApimlZosmfClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 449
  Jobname ZWEAAG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled ON
}

TTLSEnvironmentAction ApimlClientEnvironmentAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ApimlKeyring
  TTLSCipherParmsRef CipherParms
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
}
```

:::note
`Jobname` is defined explicitly for the API Gateway and is formed with the `zowe.job.prefix` setting from `zowe.yaml` plus `AG` as the Gateway identifier.
:::

#### For communication between API Gateway and other core services

```pagent
TTLSRule ApimlClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 10310-10320
  Jobname ZWEA*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlX509ClientConnAction
}
```

#### For communication between API Gateway and southbound services

```pagent
TTLSRule ApimlServiceClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 40030
  Jobname ZWEAAG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}
```

- The outbound connection from the Gateway to the Discovery Service must not be configured with sending the server certificate.
- Outbound connections from the Gateway to southbound services (onboarded services) must not send the server certificate if the service accepts x.509 Client Certificate authentication.

### Ciphers

:::note
This list of ciphers is provided as an example only, and should be customized according to your specific configuration.
:::

The list of supported ciphers should be constructed according to the TLS supported versions.
Ensure that the cipher list has matches with non-AT-TLS-aware clients.

```pagent
TTLSCipherParms CipherParms
{
  V2CipherSuites TLS_RC4_128_WITH_MD5
  V2CipherSuites TLS_RC4_128_EXPORT40_WITH_MD5
  V2CipherSuites TLS_RC2_CBC_128_CBC_WITH_MD5
  V2CipherSuites TLS_RC2_CBC_128_CBC_EXPORT40_WITH_MD5
  V2CipherSuites TLS_RC2_CBC_128_CBC_EXPORT40_WITH_MD5
  V2CipherSuites TLS_DES_192_EDE3_CBC_WITH_MD5
  V3CipherSuites TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites TLS_AES_128_GCM_SHA256
  V3CipherSuites TLS_AES_256_GCM_SHA384
  V3CipherSuites TLS_CHACHA20_POLY1305_SHA256
}
```

## Using AT-TLS for API ML in High Availability

AT-TLS settings for a Zowe API Mediation Layer installation configured in High Availability mode do not differ extensively. Changes need to be made to the previously described rules to allow for cross-lpar communication:

Ensure that the `RemoteAddr` setting in the rules accounts for the following connections:

- Discovery Service to Discovery Service. This is the replica request.
- Gateway Service to southbound services running in another LPAR.
- Southbound services to Discovery Service. This applies during onboarding.

## Troubleshooting

This section describes some common issues when using AT-TLS with API ML and how to resolve these issues.

### The message `This combination of port requires SSL` is thrown <!-- verify correct message -->:

Make sure the URL starts with `https://`. This message indicates that AT-TLS rules are in place and it is trying to connect on port 80 to the API Gateway, however the latter is still only listening on the secure port 443.

**Solution:**  
Review settings in the API Gateway. Ensure that the changes described in [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe) are applied.

### AT-TLS rules are not applied

Ff the application is responding in http, the application may not be properly configured to support http-only calls.  AT-TLS is not correctly configured.

**Solution:**  
Ensure the rules are active and that the filters on port range and job names are properly set.

### Non matching ciphers

An error can occur if the [list of ciphers](#ciphers) does not match between the ones configured in the AT-TLS rules and the ones used by non AT-TLS-aware clients.

**Solution:**  
Review the supported TLS versions and ciphers used in both the client and the server.
