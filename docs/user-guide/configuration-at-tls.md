<!-- omit in toc -->
# Configuring AT-TLS for Zowe Server

Review this article for descriptions of the configuration parameters required to make Zowe work with AT-TLS, including AT-TLS inbound and outbound rules, using AT-TLS in high availability, and troubleshooting. Security recommendations are also provided.

:::info Role: security administrator
:::

- [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe)
- [AT-TLS rules](#at-tls-rules)
  - [Inbound rules](#inbound-rules)
  - [Outbound rules](#outbound-rules)
    - [For z/OSMF](#for-zosmf)
    - [For communication between API Gateway and other core services](#for-communication-between-api-gateway-and-other-core-services)
    - [For communication between API Gateway and southbound services](#for-communication-between-api-gateway-and-southbound-services)
  - [Ciphers](#ciphers)
- [Using AT-TLS for API ML in High Availability](#using-at-tls-for-api-ml-in-high-availability)
- [Multi-tenancy deployment](#multi-tenancy-deployment)
- [AT-TLS Troubleshooting](#at-tls-troubleshooting)
  - [The message `This combination of port requires SSL` is thrown](#the-message-this-combination-of-port-requires-ssl-is-thrown)
  - [AT-TLS rules are not applied](#at-tls-rules-are-not-applied)
  - [Non matching ciphers](#non-matching-ciphers)
- [Full example of AT-TLS configuration](#full-example-of-at-tls-configuration)

## AT-TLS configuration for Zowe

:::tip
For full support, we recommend that you upgrade to v2.13 or a later version of Zowe.
:::

Follow these steps to configure Zowe to support AT-TLS:

These instructions are valid for Zowe 2.18 onwards:

```yaml
zowe:
    network:
        # For inbound traffic rules:
        server:
            tls:
                attls: true
        # If outbound traffic rules will be configured:
        client:
          tls:
            attls: true
```

While the Zowe Server components do not handle TLS on its own with AT-TLS enabled, the API Mediation Layer (API ML) requires information about the server certificate that is defined in the AT-TLS rule. Ensure that the server certificates provided by the AT-TLS layer are trusted in the configured Zowe keyring. Ideally, AT-TLS should be configured with the same Zowe keyring.

If there is an outbound AT-TLS rule configured for the link between the API Gateway and z/OSMF, set the `zowe.zOSMF.scheme` property to `http`.

:::note Notes

- AT-TLS is supported in the API Cloud Gateway Mediation Layer component beginning with version 2.17.

- As the API ML Gateway is a core component of API ML, other components that need to interact with the Gateway, such as Zowe ZLUX App Server, also require AT-TLS configuration.

:::

:::caution Important security consideration

Configuring AT-TLS for Zowe requires careful consideration of security settings. These security settings apply to the Client Certificate authentication feature in Zowe API Mediation Layer components, as well as for onboarded services that support the x.509 client certificates authentication scheme.

Outbound AT-TLS rules (i.e. to make a transparent https call through http) that are configured to send the server certificate should be limited to the services that __require__ service to service authentication. If an API ML-onboarded southbound service needs to support x.509 client certificate authentication, we recommend to use the integrated TLS handshake capabilities of API ML. Do not configure an outbound AT-TLS rule for these services.

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
  LocalPortRange 7551-7555
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

| Component | Port |
|----|-----------------------|
| Gateway | default port 7554 |
| Discovery | default port 7553 |
|Caching Service | 7555 |
|API Catalog | default port 7552 |
| Metrics Service | default port 7551 |

**Follow this step:**

Replace `ApimlKeyring` with the keyring configured for your installation. Follow [the SAF keyring instructions](../../getting-started/zowe-certificates-overview.md#saf-keyring) in the article _Zowe Certificates overview_ to configure keyrings for your Zowe instance.

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
  Jobname ZWE1AG*
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
  RemotePortRange 7551-7555
  Jobname ZWE1A*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlX509ClientConnAction
}

TTLSConnectionAction ApimlX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlClientX509ConnAdvParms
}

TTLSConnectionAdvancedParms ApimlClientX509ConnAdvParms
{
  ApplicationControlled Off
  CertificateLabel Zowe Server
  SecondaryMap Off
}
```

#### For communication between API Gateway and southbound services

In this example, the rule covers all outbound connections originating from the API Gateway to a given southbound service listening on port 40030. This covers routing scenarios.

```pagent
TTLSRule ApimlServiceClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 40030
  Jobname ZWE1AG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

TTLSConnectionAction ApimlNoX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlClientNoX509ConnAdvParms
}

TTLSConnectionAdvancedParms ApimlClientNoX509ConnAdvParms
{
  ApplicationControlled Off
  SecondaryMap Off
}
```

:::important

- The outbound connection from the Gateway Service to the Discovery Service must be configured without a `CertificateLabel`. Ensure that the certificate label is not included to avoid sending the certificate in case routing would be possible to the Discovery Service. Note that this route is disabled by default.  

- Outbound connections from the Gateway to southbound services (onboarded services) must not send the server certificate if the service accepts x.509 Client Certificate authentication. If the server certificate is sent, it is the server user who would be authenticated.

:::

### Ciphers

:::note
This list of ciphers is provided as an example only. Actual ciphers should be customized according to your specific configuration.
:::

The list of supported ciphers should be constructed according to the TLS supported versions.
Ensure that the cipher list has matches with non-AT-TLS-aware clients.

<details>
<summary>Click here for an example of Cipher parameters.</summary>

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

</details>

## Using AT-TLS for API ML in High Availability

AT-TLS settings for a Zowe API Mediation Layer installation configured in High Availability mode do not differ extensively. Changes need to be made to the previously described rules to allow for cross-lpar communication:

Ensure that the `RemoteAddr` setting in the rules accounts for the following connections:

- Discovery Service to Discovery Service. This is the replica request.
- Gateway Service to southbound services running in another LPAR.
- Southbound services to Discovery Service. This applies during onboarding.

## Multi-tenancy deployment

For specific scenario when Central API ML is running on z/OS with AT-TLS enabled, it is important to override the protocol for the external URL. This information is used by the Central API ML to call domain API ML and it needs to reflect outbound AT-TLS rule. In this case, update your domain API ML configuration as follows:

```yaml
zowe:
  components:
    gateway:
      apiml:
        gateway:
          externalProtocol: http
```

## AT-TLS Troubleshooting

This section describes some common issues when using AT-TLS with API ML and how to resolve these issues.

### The message `This combination of port requires SSL` is thrown

Make sure the URL starts with `https://`. This message indicates that AT-TLS rules are in place and it is trying to connect on port 80 to the API Gateway, however the latter is still only listening on the secure port 443.

__Solution:__
Review settings in the API Gateway. Ensure that the changes described in [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe) are applied.

### AT-TLS rules are not applied

If the application is responding in http, the application may not be properly configured to support http-only calls. AT-TLS is not correctly configured.

__Solution:__

Ensure the rules are active and that the filters on port range and job names are properly set.

### Non matching ciphers

An error can occur if the [list of ciphers](#ciphers) does not match between the ones configured in the AT-TLS rules and the ones used by non AT-TLS-aware clients.

__Solution:__
Review the supported TLS versions and ciphers used in both the client and the server.

## Full example of AT-TLS configuration

Review a full working example of an AT-TLS configuration file on z/OS, specifically used for defining secure communication between different services in a mainframe environment. All port values are examples.
The example is commented for convenience.
<details>

<summary>Click here to display the full AT-TLS configuration file.</summary>

```pagent
# Main inbound rule, all API ML core services have it defined.
TTLSRule ApimlServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 7554-7559
  Jobname ZWE*
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ApimlServerEnvironmentAction
  TTLSConnectionActionRef ApimlServerConnectionAction
}

# Example southbound service inbound rule
TTLSRule ApimlDCServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 40030-40040 # Example service ports
  Jobname ZWEDC*
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ApimlDCServerEnvironmentAction
  TTLSConnectionActionRef ApimlServerConnectionAction
}

TTLSGroupAction ServerGroupAction
{
  TTLSEnabled On
}

# Environment action for API ML core services
TTLSEnvironmentAction ApimlServerEnvironmentAction
{
  HandshakeRole ServerWithClientAuth
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ApimlKeyring
  TTLSSignatureParmsRef TNESigParms
}

# Environment action for sample southbound service
TTLSEnvironmentAction ApimlDCServerEnvironmentAction
{
  HandshakeRole Server
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ApimlKeyring
  TTLSSignatureParmsRef TNESigParms
}

# Keyring, used for TLS
TTLSKeyringParms ApimlKeyring
{
  Keyring ZWEKRNG
}

# Advanced TLS settings, choose TLS versions supported.
# ClientAuthType Full to support optional x509 client cert authentication
TTLSEnvironmentAdvancedParms ServerEnvironmentAdvParms
{
  ClientAuthType Full
  ApplicationControlled Off
  Renegotiation Disabled
  SSLv2 Off
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  TLSv1.2 On
  TLSv1.3 On
}

# Server Connection Action for API ML core services.
# Needs ServerWithClientAuth to support client certificate authentication between them.
TTLSConnectionAction ApimlServerConnectionAction
{
  HandshakeRole ServerWithClientAuth
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlConnectionAdvParms
  TTLSSignatureParmsRef TNESigParms
}

# API ML Server connection action.
# Certificate label indicates which certificate is used in the client certificate authentication process between core services.
TTLSConnectionAdvancedParms ApimlConnectionAdvParms
{
  ApplicationControlled Off
  ServerCertificateLabel apimlcert
  CertificateLabel apimlcert
  SecondaryMap Off
}

# Example outbound TTLS rule for a client calling API ML
# In this scenario this client (a southbound service) presents client certificate to authenticate (for example during onboarding)
TTLSRule ApimlClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7554-7559 # API ML Core services ports
  Jobname ZWEA*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlX509ClientConnAction
}

# Example outbound rule for connections from API ML Gateway to a southbound service running in port 40030 (during request routing)
# Note ConnectionAction doesn't configure a client certificate.
TTLSRule ApimlServiceClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 40030 # Service ports
  Jobname ZWEAAG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

# Optional. Can configure the outbound connection from Gateway to work with AT-TLS while connecting to z/OSMF.
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

# Example outbound rule from app server to gateway.
TTLSRule ApimlZLUXClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7556
  Jobname ZWEAAG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

TTLSEnvironmentAction ApimlClientEnvironmentAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ApimlKeyring
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
  EnvironmentUserInstance 0
  TTLSSignatureParmsRef TNESigParms
}

TTLSEnvironmentAdvancedParms ClientEnvironmentAdvParms
{
  Renegotiation Disabled
  3DESKEYCHECK OFF
  CLIENTEDHGROUPSIZE legacy
  SERVEREDHGROUPSIZE legacy
  PEERMINCERTVERSION any
  SERVERSCSV OFF
  MIDDLEBOXCOMPATMODE Off
  CertValidationMode Any
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled ON
}

TTLSConnectionAction ApimlX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlClientX509ConnAdvParms
}

TTLSConnectionAction ApimlNoX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlClientNoX509ConnAdvParms
}

TTLSConnectionAdvancedParms ApimlClientNoX509ConnAdvParms
{
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  ApplicationControlled Off
  SecondaryMap Off
  TLSv1.2 On
  TLSv1.3 Off
}

# In case the connection requires a client certificate authentication, this is where the label is set for outbound connections.
TTLSConnectionAdvancedParms ApimlClientX509ConnAdvParms
{
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  CertificateLabel apimlcert
  SecondaryMap Off
  TLSv1.2 On
  TLSv1.3 On
}

TTLSSignatureParms TNESigParms
{
  CLientECurves Any
}

# Example list of supported ciphers in handshake
TTLSCipherParms                   CipherParms
{
  V3CipherSuites                  TLS_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_CHACHA20_POLY1305_SHA256
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites                  TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites                  TLS_DHE_RSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_RSA_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384
  V3CipherSuites                  TLS_RSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_DHE_DSS_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_DH_DSS_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_DH_RSA_WITH_AES_256_GCM_SHA384
  V3CipherSuites                  TLS_RSA_WITH_AES_256_CBC_SHA256
  V3CipherSuites                  TLS_DHE_DSS_WITH_AES_256_CBC_SHA256
  V3CipherSuites                  TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
  V3CipherSuites                  TLS_DH_DSS_WITH_AES_256_CBC_SHA256
  V3CipherSuites                  TLS_DH_RSA_WITH_AES_256_CBC_SHA256
  V3CipherSuites                  TLS_RSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_ECDH_RSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_DHE_DSS_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_DH_DSS_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_DH_RSA_WITH_AES_256_CBC_SHA
  V3CipherSuites                  TLS_RSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_DHE_DSS_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_DH_DSS_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_DH_RSA_WITH_AES_128_GCM_SHA256
  V3CipherSuites                  TLS_RSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_DHE_DSS_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_DHE_RSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_DH_DSS_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_DH_RSA_WITH_AES_128_CBC_SHA256
  V3CipherSuites                  TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_ECDH_RSA_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_DHE_DSS_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_DHE_RSA_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_DH_DSS_WITH_AES_128_CBC_SHA
  V3CipherSuites                  TLS_DH_RSA_WITH_AES_128_CBC_SHA
}
```

</details>
