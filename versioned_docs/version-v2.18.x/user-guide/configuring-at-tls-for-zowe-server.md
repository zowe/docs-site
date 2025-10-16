# Configuring AT-TLS for Zowe Server

You can configure parameters in the Zowe server to enable Zowe to work with AT-TLS. Review this article for information about AT-TLS inbound and outbound rules, and the required configuration to use AT-TLS in high availability. You can also find troubleshooting tips as well as security recommendations.

:::info Role: security administrator
:::

## AT-TLS configuration for Zowe

:::tip
For full support, we recommend that you upgrade to v2.17 or a later version of Zowe.
:::

Follow these steps to configure Zowe to support AT-TLS:

:::note
These instructions are valid for Zowe v2.18 and later versions of Zowe.
:::

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

While the Zowe Server components do not handle TLS on its own with AT-TLS enabled, the API Mediation Layer (API ML) requires information about the server certificate that is defined in the AT-TLS rule. Ensure that the server certificates provided by the AT-TLS layer are trusted in the configured Zowe keyring. 

:::tip
We strongly recommend that AT-TLS for inbound connections and outbound connections with X.509 be configured with the same Zowe keyring.

For outbound connections without an X.509 certificate, make sure you use a keyring that does not contain the public key certificate with it's corresponding private key.
:::

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

// TODO Check if ISCF keyring will be supported in v2 and remove this block accordingly
### Limitations when using AT-TLS with ICSF Hardware keyring

API ML cannot currently read private keys if they reside in a hardware module. When using AT-TLS with a z/OS Keyring with private keys stored or managed by ICSF, use one of the following options:

* [Prevent API Mediation Layer from reading the private key](#prevent-api-ml-from-reading-the-private-key)
* [Use an alternative non-hardware keyring](#use-an-alternative-non-hardware-keyring)

#### Prevent API ML from reading the private key

Set `environments.APIML_ATTLS_LOAD_KEYRING: true` in `zowe.yaml` to prevent API ML from loading the keyring.
The only supported configuration is Zowe with the z/OSMF authentication provider in JWT mode.
This mode requires both server and client AT-TLS enabled in the `zowe.yaml` with full coverage of Inbound and Outbound rules.

:::note  
The z/OSMF LTPA token, SAF native authentication provider, and Personal Access Tokens (PAT) cannot be used in this configuration as there is not a private key.

:::

#### Use an alternative non-hardware keyring

Since handshakes are handled by AT-TLS, API ML only requires access to the private key to sign API ML's own tokens when the configuration requires it. The following scenarios require a private key so that API ML is able to sign API ML's own tokens:
- Personal Access Tokens
- SAF native provider (API ML signs its own JWT in this scenario)
- z/OSMF in LTPA mode: in this scenario z/OSMF does not issue a JWT. API ML signs the JWT that contains the LTPA token.

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

# Keyring, used for TLS, will be used also to load trusted certificates
TTLSKeyringParms ZoweKeyring
{
  Keyring ZWEKRNG
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

TTLSConnectionAdvancedParms ZoweConnectionAdvParms
{
  ApplicationControlled Off
  ServerCertificateLabel apimlcert # Specify the personal server certificate used for the Zowe Server
  CertificateLabel apimlcert # Specify the personal server certificate used for the Zowe Server
  SecondaryMap Off
}
```

The `PortRange` of this inbound rule is taken from the list of API Mediation Layer components in the `zowe.yaml` file. The `PortRange` should cover the following components:

| Component | Default Port |
|----|-----------------------|
| Gateway | 7554 |
| Discovery | 7553 |
| Caching Service | 7555 |
| API Catalog | 7552 |
| Metrics Service | 7551 |
| Zowe System Services (ZSS) | 7557 |
| Zowe Application Server | 7556 |

**Follow this step:**

Replace `ZoweKeyring` with the keyring configured for your installation. Follow [the SAF keyring instructions](../getting-started/zowe-certificates-overview.md#saf-keyring) in the article _Zowe Certificates overview_ to configure keyrings for your Zowe instance.

Note the setting `HandshakeRole`. This setting applies to core services which authenticate through certificates with each other. This setting allows the API Gateway to receive and accept X.509 client certificates from API Clients.

For more granularity in the AT-TLS rules, separate the rules that need to support Client Certificate authentication (Discovery Service, Gateway Service) from the ones that do not (for example a rule covering API Gateway to an onboarded service).

### Outbound rules

Outbound rules in this section allow Zowe services to communicate with each other and to other southbound services using HTTP.

:::caution Important:
Careful consideration needs to be made regarding which rules are to be configured to send a Client Certificate. Since configuration cannot be performed on a per-request basis, it is essential not to configure the rule to send the Zowe Server certificate to the API Gateway or to a southbound service that supports X.509 Client Certificate authentication. Doing so will result in unintentionally authenticating the server ACID.

Make sure the keyring used in these rules does not contain the Zowe Server certificate.

:::


#### Outbound rule for z/OSMF

This example rule covers the connection between the API Gateway and the z/OSMF instance. This connection is made to authenticate users in z/OS.

Ensure that you set `zowe.zOSMF.scheme` to `http` in zowe.yaml if this rule is set.

```bash
TTLSRule ApimlZosmfClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535 # Using any outbound port
  RemoteAddr All
  RemotePortRange 443 # Set to z/OSMF port
  Jobname ZWE1AG* # Generate according to zowe.job.prefix in zowe.yaml + AG for Gateway outbound
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlNoX509ClientEnvAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction # No X.509 Client Certificate required
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled On
}

# Keyring has no default certificate, used to load trusted certificates keyring 
TTLSKeyringParms ZoweNoX509Keyring
{
  Keyring ZoweAttlsKeyring
}

TTLSEnvironmentAction ApimlNoX509ClientEnvAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ZoweNoX509Keyring
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
}

TTLSConnectionAction ApimlNoX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ZoweClientNoX509ConnAdvParms
}

TTLSEnvironmentAdvancedParms ClientEnvironmentAdvParms
{
  Renegotiation Disabled
  3DesKeyCheck Off
  ClientEDHGroupSize Legacy
  ServerEDHGroupSize Legacy
  PeerMinCertVersion Any
  ServerScsv Off
  MiddleBoxCompatMode Off
  CertValidationMode Any
}

TTLSConnectionAdvancedParms ZoweClientNoX509ConnAdvParms
{
# No CertificateLabel to ensure a certificate will not be picked from the keyring
  ApplicationControlled Off
  SecondaryMap Off
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  TLSv1.2 On
  TLSv1.3 Off
}
```

:::note
`Jobname` is defined explicitly for the API Gateway and is formed with the `zowe.job.prefix` setting from `zowe.yaml` plus `AG` as the Gateway identifier.

Notice the Keyring used for outbound rule that does not send X.509 Client Certificate is different from the Zowe Keyring which contains Zowe Server Certificate. Check the complete PAGENT rules below.
:::

#### Outbound rule for communication between Zowe core components

Use the example in this section as a template for internal connections between Zowe core services.

:::caution Important

The outbound connection from the Gateway Service to the Discovery Service must be configured without a `CertificateLabel`. Ensure that the keyring used in such connections does not have the Zowe Server certificate or does not have it set as Default, and that the CertificateLabel is not set, to avoid sending the certificate in case routing would be possible to the Discovery Service. Note that this route is disabled by default.

:::

```bash
TTLSRule ZoweClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7551-7559 # Range covers API ML, app-server, and zss services
  Jobname ZWE1* # Set according to zowe.job.prefix in zowe.yaml - this covers all servers within Zowe core.
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlX509ClientEnvAction
  TTLSConnectionActionRef ApimlX509ClientConnAction # X.509 Authentication is required in cross-service API ML communication
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled On
}

# Keyring, used for TLS, will be used also to load trusted certificates
TTLSKeyringParms ZoweKeyring
{
  Keyring ZWEKRNG
}

TTLSEnvironmentAction ApimlX509ClientEnvAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ZoweKeyring
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
}

TTLSConnectionAction ApimlX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlClientX509ConnAdvParms
}

TTLSEnvironmentAdvancedParms ClientEnvironmentAdvParms
{
  Renegotiation Disabled
  3DesKeyCheck Off
  ClientEDHGroupSize Legacy
  ServerEDHGroupSize Legacy
  PeerMinCertVersion Any
  ServerScsv Off
  MiddleBoxCompatMode Off
  CertValidationMode Any
}

TTLSConnectionAdvancedParms ApimlClientX509ConnAdvParms
{
  CertificateLabel Zowe Server
  ApplicationControlled Off
  SecondaryMap Off
}
```

#### Outbound rule for communication between API Gateway and extensions' servers

In this example, the rule covers all outbound connections originating from the API Gateway to a server that is not part of Zowe, such as an extension's server, listening on port 8080.
Such a rule can apply to any remote destination, as seen in the `ZoweClientRule` for Zowe core servers in the section [Outbound rule for communication between Zowe core components](./configuring-at-tls-for-zowe-server.md#outbound-rule-for-communication-between-zowe-core-components).

This example covers routing scenarios.

```bash
TTLSRule ApimlServiceClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 8080 # Set to range of ports where services are listening
  Jobname ZWE1A* # Generate according to zowe.job.prefix in zowe.yaml
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlNoX509ClientEnvAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction # Do not send X.509 Client Certificates
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled On
}

# Keyring has no default certificate, used to load trusted certificates keyring 
TTLSKeyringParms ZoweNoX509Keyring
{
  Keyring ZoweAttlsKeyring
}

TTLSEnvironmentAction ApimlNoX509ClientEnvAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ZoweNoX509Keyring # ZoweNoX509Keyring keyring has no default certificate
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
}

TTLSConnectionAction ApimlNoX509ClientConnAction
{
  HandshakeRole Client
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ApimlClientNoX509ConnAdvParms
}

TTLSEnvironmentAdvancedParms ClientEnvironmentAdvParms
{
  Renegotiation Disabled
  3DesKeyCheck Off
  ClientEDHGroupSize Legacy
  ServerEDHGroupSize Legacy
  PeerMinCertVersion Any
  ServerScsv Off
  MiddleBoxCompatMode Off
  CertValidationMode Any
}

TTLSConnectionAdvancedParms ApimlClientNoX509ConnAdvParms
{
  # No CertificateLabel to avoid sending a client certificate
  ApplicationControlled Off
  SecondaryMap Off
}
```

:::caution Important

Outbound connections from the Gateway to southbound services (onboarded services) must not send the server certificate if the service accepts X.509 Client Certificate authentication. If the server certificate is sent, the server user is subsequently authenticated.

:::

#### Outbound rule for services that validate tokens against the API Mediation Layer

In this scenario, the services issue a request against the API Gateway to validate the received authentication token.

This scenario includes the following services:

* Services that set `zoweJwt` as the authentication scheme
* Services that require an Open ID Connect (OIDC) token
* Forwarded X.509 certificates

In case the service is running on z/OS we strongly recommend:

* To have an Outbound rule from the service to the API Gateway.
* To have an Outbound rule set for the onboarding process against the Discovery Service.

Ensure that these rules are followed:

- Outbound rule to API Gateway: __Do not__ set a Client Certificate.
- Outbound rule to Discovery Service: Sends X.509 Client Certificate to authorize the onboarding.

### Ciphers

:::note
This list of ciphers is provided as an example only. Actual ciphers should be customized according to your specific configuration.
:::

The list of supported ciphers should be constructed according to the TLS supported versions.
Ensure that the cipher list has matches with non-AT-TLS-aware clients.

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
- All outbound connections need to account for all LPARs including the same where the rules are applied.

## Multi-tenancy deployment

For a specific scenario when Central API ML is running on z/OS with AT-TLS enabled, it is important to override the protocol for the external URL. This information is used by the Central API ML to call domain API ML and needs to reflect the outbound AT-TLS rule. In this case, update your domain API ML configuration:

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

### The message `This combination of port requires SSL` is thrown when accessing an API ML service through a Browser

Make sure the URL starts with `https://`. This message indicates that AT-TLS rules are in place and it is trying to connect on an unsecured port to the API Gateway, however the latter is still only listening on a application-controlled secured port.

**Solution:**
Review settings in the API Gateway. Ensure that the changes described in [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe) are applied.

### AT-TLS rules are not applied

If the application is responding in http, the application may not be properly configured to support http-only calls. AT-TLS is not correctly configured.

**Solution:**

Ensure the rules are active and that the filters on port range and job names are properly set.

### Non matching ciphers / protocols

An error can occur if the [list of ciphers](#ciphers) or the TLS protocol does not match between the ones configured in the AT-TLS rules and the ones used by non AT-TLS-aware clients.

**Solution:**
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
  LocalPortRange 7551-7559 # Range covers all possible Zowe services
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
  TTLSConnectionActionRef ZoweDCServerConnectionAction
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
  TTLSEnvironmentAdvancedParmsRef ZoweServerEnvironmentAdvParms
  TTLSKeyringParmsRef ZoweKeyring
}

# Environment action for sample southbound service
TTLSEnvironmentAction ZoweDCServerEnvironmentAction
{
  HandshakeRole Server
  EnvironmentUserInstance 0
  TTLSEnvironmentAdvancedParmsRef ZoweDCServerEnvironmentAdvParms
  TTLSKeyringParmsRef ZoweKeyring
}

# Keyring, used for TLS, will be used also to load trusted certificates
TTLSKeyringParms ZoweKeyring
{
  Keyring ZWEKRNG
}

# Keyring without public certificate with private key, will be used to load trusted certificates
TTLSKeyringParms ZoweNoX509Keyring
{
  Keyring ZoweAttlsKeyring
}

# Advanced TLS settings, choose TLS versions supported.
TTLSEnvironmentAdvancedParms ZoweServerEnvironmentAdvParms
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

# Advanced TLS settings, choose TLS versions supported.
TTLSEnvironmentAdvancedParms ZoweDCServerEnvironmentAdvParms
{
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
  TTLSConnectionAdvancedParmsRef ZoweServerConnectionAdvParms
}

# Server Connection Action for DC Service.
TTLSConnectionAction ZoweDCServerConnectionAction
{
  HandshakeRole Server 
  TTLSCipherParmsRef CipherParms
  TTLSConnectionAdvancedParmsRef ZoweDCServerConnectionAdvParms
}

# API ML Server connection action.
# Certificate label indicates which certificate is used in the client certificate authentication process between core services.
TTLSConnectionAdvancedParms ZoweServerConnectionAdvParms
{
  ApplicationControlled Off
  ServerCertificateLabel apimlcert
  CertificateLabel apimlcert
  SecondaryMap Off
}

# Service advanced server connection action.
TTLSConnectionAdvancedParms ZoweDCServerConnectionAdvParms
{
  ApplicationControlled Off
  ServerCertificateLabel apimlcert
  SecondaryMap Off
}

# Example outbound TTLS rule for a Zowe client calling a Zowe server
# In this scenario this client (a southbound service) presents client certificate to authenticate (for example during onboarding)
TTLSRule ZoweClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7551-7559 # API ML, app-server, and zss Zowe core services
  Jobname ZWE1*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlX509ClientEnvAction
  TTLSConnectionActionRef ApimlX509ClientConnAction
}

# Example outbound rule for connections from API ML Gateway and Catalog to a southbound service running in port 40030 (during request routing)
# Note EnvironmentAction defines a Keyring that does not contain a client certificate with its private key
# Note ConnectionAction doesn't configure a client certificate.
TTLSRule ApimlServiceClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 40030 # Service ports
  Jobname ZWE1A*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlNoX509ClientEnvAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

# Optional. Can configure the outbound connection from API Gateway to work with AT-TLS while connecting to z/OSMF.
TTLSRule ApimlZosmfClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 443 # z/OSMF Port
  Jobname ZWE1AG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlNoX509ClientEnvAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

# Example outbound rule from API Gateway to app server and zss.
TTLSRule ApimlZLUXClientRule
{
  LocalAddr All
  LocalPortRange 1024-65535
  RemoteAddr All
  RemotePortRange 7556-7557
  Jobname ZWE1AG*
  Direction Outbound
  TTLSGroupActionRef ClientGroupAction
  TTLSEnvironmentActionRef ApimlNoX509ClientEnvAction
  TTLSConnectionActionRef ApimlNoX509ClientConnAction
}

TTLSGroupAction ClientGroupAction
{
  TTLSEnabled On
}

TTLSEnvironmentAction ApimlX509ClientEnvAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef ZoweKeyring # Keyring contains the Zowe X.509 server certificate
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
  EnvironmentUserInstance 0
}

TTLSEnvironmentAction ApimlNoX509ClientEnvAction
{
  HandshakeRole Client
  TTLSKeyringParmsRef NoKeyKeyring # Keyring does not contain Zowe X.509 server certificate
  TTLSEnvironmentAdvancedParmsRef ClientEnvironmentAdvParms
  EnvironmentUserInstance 0
}

TTLSEnvironmentAdvancedParms ClientEnvironmentAdvParms
{
  Renegotiation Disabled
  3DesKeyCheck Off
  ClientEDHGroupSize Legacy
  ServerEDHGroupSize Legacy
  PeerMinCertVersion Any
  ServerScsv Off
  MiddleBoxCompatMode Off
  CertValidationMode Any
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

# In case the connection requires a client certificate authentication, this is where the label is set for outbound connections.
TTLSConnectionAdvancedParms ZoweClientX509ConnAdvParms
{
  CertificateLabel apimlcert
  SecondaryMap Off
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  TLSv1.2 On
  TLSv1.3 On
}

# ConnectionAdvanced parameters for connections not requiring x.509 Client Certificate authentication
# If the set Keyring has a default certificate this will not prevent sending it
TTLSConnectionAdvancedParms ZoweClientNoX509ConnAdvParms
{
# No CertificateLabel to ensure a certificate will not be picked from the keyring
  ApplicationControlled Off
  SecondaryMap Off
  SSLv3 Off
  TLSv1 Off
  TLSv1.1 Off
  TLSv1.2 On
  TLSv1.3 Off
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

## Additional Zowe feature configuration with AT-TLS

The Zowe Application Framework also leverages AT-TLS. For more information, see [Using AT-TLS in the App Framework](../user-guide/mvd-configuration#using-at-tls-in-the-app-framework).
