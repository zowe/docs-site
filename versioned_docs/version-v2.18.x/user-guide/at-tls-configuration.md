<!-- omit in toc -->
# Configuring AT-TLS for Zowe Server

Review this article for descriptions of the configuration parameters required to make Zowe work with AT-TLS, including AT-TLS inbound and outbound rules, using AT-TLS in high availability, and troubleshooting. Security recommendations are also provided.

:::info Role: security administrator
:::

- [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe)
  - [Limitations](#limitations)
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
  - [The message `This combination of port requires SSL` is thrown when accesing an API ML service through a Browser](#the-message-this-combination-of-port-requires-ssl-is-thrown-when-accesing-an-api-ml-service-through-a-browser)
  - [AT-TLS rules are not applied](#at-tls-rules-are-not-applied)
  - [Non matching ciphers / protocols](#non-matching-ciphers--protocols)
  - [Additional troubleshooting](#additional-troubleshooting)
- [Full example of AT-TLS configuration](#full-example-of-at-tls-configuration)
- [See also](#see-also)

## AT-TLS configuration for Zowe

:::tip
For full support, we recommend that you upgrade to v2.17 or a later version of Zowe.
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

- AT-TLS is supported in the API Cloud Gateway Mediation Layer component (SCGW) beginning with version 2.17.
  - Support is partial. X.509 Client Certificates are not supported, if the AT-TLS rule is not in effect, the SCGW will allow unsecured connections.

- As the API ML Gateway is a core component of API ML, other components that need to interact with the Gateway, such as Zowe ZLUX App Server, also require AT-TLS configuration.

:::

:::caution Important security consideration

Configuring AT-TLS for Zowe requires careful consideration of security settings. These security settings apply to the Client Certificate authentication feature in Zowe API Mediation Layer components, as well as for onboarded services that support the x.509 client certificates authentication scheme.

Outbound AT-TLS rules (i.e. to make a transparent https call through http) that are configured to send the server certificate should be limited to the services that __require__ service to service authentication. If an API ML-onboarded southbound service needs to support X.509 client certificate authentication, we recommend to use the integrated TLS handshake capabilities of API ML. Do not configure an outbound AT-TLS rule for these services.

The Discovery Service endpoints are not reachable by standard API Gateway routing by default.
:::

### Limitations

If using AT-TLS with a z/OS Keyring backed by an ICSF hardware module, the only supported configuration is Zowe with z/OSMF authentication provider in JWT mode.
LTPA token and SAF provider cannot be used in this configuration because API ML cannot access the hardware key to sign its own tokens.

## AT-TLS rules

This section describes suggested AT-TLS settings, and serves as guidelines to set your AT-TLS rules.

### Inbound rules

A generic inbound rule can be set for all Zowe services:

```bash
TTLSRule ZoweServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 7551-7559 # Range covers all Zowe services
  Jobname ZWE1* # Jobname according to zowe.job.prefix in zowe.yaml
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ZoweServerEnvironmentAction
  TTLSConnectionActionRef ZoweServerConnectionAction
}

TTLSGroupAction ServerGroupAction
{
  TTLSEnabled On
}

TTLSEnvironmentAction ZoweServerEnvironmentAction
{
  HandshakeRole ServerWithClientAuth
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ZoweKeyring
}

TTLSConnectionAction ZoweServerConnectionAction
{
  HandshakeRole ServerWithClientAuth
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ZoweConnectionAdvParms
}
```

The `PortRange` of this inbound rule is taken from the list of API Mediation Layer components in the `zowe.yaml` file. The `PortRange` should cover the following components:

| Component | Port |
|----|-----------------------|
| Gateway | default port 7554 |
| Discovery | default port 7553 |
| Caching Service | default port 7555 |
| API Catalog | default port 7552 |
| Metrics Service | default port 7551 |
| Zowe System Services (ZSS) | default port 7557 |
| Zowe Application Server | default port 7556 |

__Follow this step:__

Replace `ZoweKeyring` with the keyring configured for your installation. Follow [the SAF keyring instructions](../../getting-started/zowe-certificates-overview.md#saf-keyring) in the article _Zowe Certificates overview_ to configure keyrings for your Zowe instance.

Note the setting `HandshakeRole`. This setting applies to core services which authenticate through certificates with each other. This setting allows the API Gateway to receive and accept X.509 client certificates from API Clients.

For more granularity in the AT-TLS rules, separate the rules that need to support Client Certificate authentication (Discovery Service, Gateway Service) from the rest.

### Outbound rules

Outbound rules in this section allow Zowe services to communicate with each other and to other southbound services using HTTP.

Careful consideration needs to be set especially regarding which rules will be configured to send a Client Certificate. Since this cannot be configured on a per-request basis.
I.E. __Do not__ configure the rule to send the Zowe Server certificate to the API Gateway or to a southbound service that supports X.509 Client Certificate authentication. This will result in unintentionally authenticating the server ACID.

__For example:__

```yaml
TTLSConnectionAction ClientConnectionAction  
{  
  HandshakeRole Client  
  TTLSCipherParmsRef CipherParms  
  TTLSConnectionAdvancedParmsRef ConnectionAdvancedParms  
  CertificateLabel  
}
```

#### For z/OSMF

This example rule covers the connection between the API Gateway and the z/OSMF instance. This connection is made to authenticate users in z/OS.

Remember to set `zowe.zOSMF.scheme` to `http` in zowe.yaml if this rule is set.

```bash
TTLSRule ApimlZosmfClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535 # Using any outbound port
  RemoteAddr All
  RemotePortRange 449 # Set to z/OSMF port
  Jobname ZWE1AG* # Generate according to zowe.job.prefix in zowe.yaml + AG for Gateway outbound
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction # No X.509 Client Certificate required
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

Use the example in this section as a template for internal connections between API Mediation Layer core services.

:::important

- The outbound connection from the Gateway Service to the Discovery Service must be configured without a `CertificateLabel`. Ensure that the certificate label is not included (but keep the `CertificateLabel` field) to avoid sending the certificate in case routing would be possible to the Discovery Service. Note that this route is disabled by default.

:::

```bash
TTLSRule ApimlClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7551-7555 # Range covers API ML services (gateway, discovery, api catalog, caching service)
  Jobname ZWE1A* # Generate according to zowe.job.prefix in zowe.yaml
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlX509ClientConnAction # X.509 Authentication is required in cross-service API ML communication
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

In this example, the rule covers all outbound connections originating from the API Gateway to an example southbound service listening on port 8080.
This rule applies for Zowe services as well, such as the ZSS and app-server if they are enabled.

This covers routing scenarios.

```bash
TTLSRule ApimlServiceClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 8080 # Set to range of ports where services are listening
  Jobname ZWE1AG* # Generate according to zowe.job.prefix in zowe.yaml
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction # Do not send X.509 Client Certificates
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
  CertificateLabel # Leave empty to avoid sending a client certificate (i.e. if the keyring has a default certificate)
  SecondaryMap Off
}
```

:::important

- Outbound connections from the Gateway to southbound services (onboarded services) must not send the server certificate if the service accepts X.509 Client Certificate authentication. If the server certificate is sent, it is the server user who would be authenticated.

:::

#### Services that validate tokens against the API Mediation Layer

In this scenario, the services will issue a request against the API Gateway to validate the received authentication token.

This includes services that set `zoweJwt` as authentication scheme, those that require an Open ID Connect (OIDC) token or forwarded X.509 certificates.

In this case it's necessary to have an Outbound rule from the service to the API Gateway.

These service will also already have an outbound rule set for the onboarding process against the Discovery Service.

Ensure these rules are followed:

- Outbound rule to Discovery Service: Sends X.509 Client Certificate to authorize the onboarding.
- Outbound rule to API Gateway: __Do not__ set a Client Certificate.

### Ciphers

:::note
This list of ciphers is provided as an example only. Actual ciphers should be customized according to your specific configuration.
:::

The list of supported ciphers should be constructed according to the TLS supported versions.
Ensure that the cipher list has matches with non-AT-TLS clients.

<details>
<summary>Click here for an example of Cipher parameters.</summary>

```bash
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

AT-TLS settings for a Zowe installation configured in High Availability mode do not differ extensively. Changes need to be made to the previously described rules to allow for cross-lpar communication:

Ensure that the `RemoteAddr` setting in the rules accounts for the following connections:

- Discovery Service to Discovery Service. This is the replica request.
- Gateway Service to southbound services (including app-server and ZSS) running in another LPAR.
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

This section describes some common issues when using AT-TLS with Zowe and how to resolve these issues.

### The message `This combination of port requires SSL` is thrown when accesing an API ML service through a Browser

Make sure the URL starts with `https://`. This message indicates that AT-TLS rules are in place and it is trying to connect on an unsecured port to the API Gateway, however the latter is still only listening on a application-controlled secured port.

__Solution:__
Review settings in the API Gateway. Ensure that the changes described in [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe) are applied.

### AT-TLS rules are not applied

If the application is responding in http, the application may not be properly configured to support http-only calls. AT-TLS is not correctly configured.

__Solution:__

Ensure the rules are active and that the filters on port range and job names are properly set.

### Non matching ciphers / protocols

An error can occur if the [list of ciphers](#ciphers) or the TLS protocol does not match between the ones configured in the AT-TLS rules and the ones used by non AT-TLS-aware clients.

__Solution:__
Review the supported TLS versions and ciphers used in both the client and the server.

### Additional troubleshooting

When asking for support make sure to follow IBM guides for troubleshooting AT-TLS problems. This is covered in the "Diagnosing Application Transparent Transport Layer Security (AT-TLS)" article on IBM documentation.

Ensure you collect the logs and current configurations when contacting support.

## Full example of AT-TLS configuration

Review a full working example of an AT-TLS configuration file on z/OS, specifically used for defining secure communication between different services in a mainframe environment. All port values are examples.
The example is commented for convenience.
<details>

<summary>Click here to display the full AT-TLS configuration file.</summary>

```bash
# Main inbound rule, all Zowe services have it defined.
TTLSRule ZoweServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 7554-7559 # Range covers all possible Zowe services
  Jobname ZWE1*
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ZoweServerEnvironmentAction
  TTLSConnectionActionRef ZoweServerConnectionAction
}

# Example southbound service inbound rule
TTLSRule ApimlDCServerRule
{
  LocalAddr All
  RemoteAddr All
  LocalPortRange 8080-8090 # Example service ports
  Jobname ZWE1DC* # Jobname prefix (optional)
  Direction Inbound
  TTLSGroupActionRef ServerGroupAction
  TTLSEnvironmentActionRef ZoweDCServerEnvironmentAction
  TTLSConnectionActionRef ZoweServerConnectionAction
}

TTLSGroupAction ServerGroupAction
{
  TTLSEnabled On
}

# Environment action for all Zowe service
TTLSEnvironmentAction ZoweServerEnvironmentAction
{
  HandshakeRole ServerWithClientAuth # Zowe Servers can optionally support Client Certificate authentication
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ZoweKeyring
  TTLSSignatureParmsRef TNESigParms
}

# Environment action for sample southbound service
TTLSEnvironmentAction ZoweDCServerEnvironmentAction
{
  HandshakeRole Server
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ServerEnvironmentAdvParms
  TTLSKeyringParmsRef ZoweKeyring
  TTLSSignatureParmsRef TNESigParms
}

# Keyring, used for TLS, will be used also to load trusted certificates
TTLSKeyringParms ZoweKeyring
{
  Keyring ZWEKRNG
}

# Advanced TLS settings, choose TLS versions supported.
TTLSEnvironmentAdvancedParms ServerEnvironmentAdvParms
{
  ClientAuthType Full # Support optional Client Certificate authentication
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
TTLSConnectionAction ZoweServerConnectionAction
{
  HandshakeRole ServerWithClientAuth # API ML Core Services use Client Certificate authentication
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ZoweConnectionAdvParms
  TTLSSignatureParmsRef TNESigParms
}

# API ML Server connection action.
# Certificate label indicates which certificate is used in the client certificate authentication process between core services.
TTLSConnectionAdvancedParms ZoweConnectionAdvParms
{
  ApplicationControlled Off
  ServerCertificateLabel apimlcert
  CertificateLabel apimlcert
  SecondaryMap Off
}

# Example outbound TTLS rule for a client calling API ML
# In this scenario this client (a southbound service) presents client certificate to authenticate (for example during onboarding)
TTLSRule ZoweClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7553-7555 # API ML Core services ports
  Jobname ZWE1*
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
  Jobname ZWE1AG*
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
  Jobname ZWE1AG*
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
  Jobname ZWE1AG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlClientEnvironmentAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction # Southbound services should not sent a client certificate to Gateway
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
  TTLSConnectionAdvancedParmsRef ZoweClientNoX509ConnAdvParms
}

# ConnectionAdvanced parameters for connections not requiring x.509 Client Certificate authentication
# If the set Keyring has a default certificate this will not prevent sending it
TTLSConnectionAdvancedParms ZoweClientNoX509ConnAdvParms
{
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  ApplicationControlled Off
  CertificateLabel # Keep the Label empty to ensure a default certificate will not be picked from the keyring
  SecondaryMap Off
  TLSv1.2 On
  TLSv1.3 Off
}

# In case the connection requires a client certificate authentication, this is where the label is set for outbound connections.
TTLSConnectionAdvancedParms ZoweClientX509ConnAdvParms
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

# Example list of supported ciphers in handshake. Validate and filter this list based on local setup
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

## See also

- [Using AT-TLS in the App Framework](../user-guide/mvd-configuration#using-at-tls-in-the-app-framework)
