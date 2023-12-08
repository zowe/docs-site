<!-- omit in toc -->
# Configuring AT-TLS for API Mediation Layer

The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application 
Transparent Transport Layer Security (AT-TLS).

Review this article for descriptions of the configuration parameters required to make the Zowe API Mediation Layer work with AT-TLS, and security recommendations.

:::info**Roles:** security administrator
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

:::note
Currently, AT-TLS is not supported in the API Cloud Gateway Mediation Layer component.
:::

:::note
Given that the Gateway is a core component of API ML, other components that need to interact with the Gateway, such as Zowe ZLUX App Server, also require AT-TLS configuration. 
:::

:::caution**Important security consideration**

Configuring AT-TLS for the Zowe API Mediation Layer requires careful consideration of security settings, specifically as these settings apply to the Client Certificate authentication feature in Zowe API Mediation Layer components, as well as for onboarded services that support the x.509 client certificates authentication scheme.

In general terms, the outbound AT-TLS rules (i.e. to make a transparent https call through http) that are configured to send the server certificate should be limited to the services that __require__ service to service authentication, such as the case of the API Gateway authenticating with the Discovery Service.

The Discovery Service endpoints are not reachable by standard API Gateway routing by default.
:::

## AT-TLS rules

This section describes the suggested AT-TLS settings, and serves as guidelines to set your AT-TLS rules. 

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

Replace `ApimlKeyring` with the one configured for your installation. Follow [these instructions](../../getting-started/zowe-certificates-overview.md#saf-keyring) to configure Keyrings for your Zowe instace.

Note the setting `HandshakeRole` as this is meant for the core services which authenticate through certificates with each other and will allow the API Gateway to receive and accept X.509 client certificates from API Clients.

### Outbound rules

- For z/OSMF

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

Note `Jobname` is defined explicitly for the API Gateway, this is formed with the `zowe.job.prefix` setting from `zowe.yaml` plus `AG` as Gateway identifier.

- For communication between API Gateway and other core services.

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

- For communication between API Gateway and southbound services.

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
This list of ciphers is provided as an example only, it's not meant to be copied.
:::

The list of supported ciphers should be constructed according to the TLS supported versions.
Make sure the list has matches with non-AT-TLS-aware clients.

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

## High Availability

AT-TLS settings for a Zowe API Mediation Layer installation configured in High Availability mode do not differ extensively. Changes need to be made to the previously described rules to allow for cross-lpar communication:

Make sure the `RemoteAddr` setting in the rules accounts for the following connections:

- Discovery Service to Discovery Service, this is the replica request.
- Gateway Service to southbound services running in other LPAR.
- Southbound services to Discovery Service, during onboarding.

## Troubleshooting

This section describes some common issues and how to resolve them.

- You see the message "This combination of port requires SSL" <!-- verify correct message -->:

  Make sure the URL starts with `https://`. This message indicates that AT-TLS rules are in place and it is trying to connect on port 80 to the API Gateway, however the latter is still only listening on the secure port 443.

  Solution: review settings in the API Gateway, make sure the changes described [here](#zowe-configuration) are applied.

- AT-TLS rules not applied

  It could be a variation of the previous one, if the application is responding in http. It means the application is properly configured to support http-only calls but AT-TLS is not in place.

  Solution: Make sure the rules are active and that the filters on port range and job names are properly set.

- Non matching ciphers

  This could happen if the [list of ciphers](#ciphers) does not match between the ones configured in the AT-TLS rules and the ones used by non AT-TLS-aware clients.

  Solution: review the supported TLS versions and ciphers used in both client and server.
