<!-- omit in toc -->
# AT-TLS Configuration for API Mediation Layer

The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application 
Transparent Transport Layer Security (AT-TLS).

In this article you will find a description of the configuration parameters required to make the Zowe API Mediation Layer work with AT-TLS and recommendations to keep it secure.

- [Zowe configuration](#zowe-configuration)
- [Security considerations](#security-considerations)
- [Inbound and Outbout AT-TLS rules](#inbound-and-outbout-at-tls-rules)
  - [Inbound rules](#inbound-rules)
  - [Outbound rules](#outbound-rules)
- [High Availability](#high-availability)

:::info**Roles:** security administrator
:::

Starting with Zowe version 2.13 it is possible to leverage AT-TLS within the API Mediation Layer. Each API ML component can run with AT-TLS rules applied. Some components, such as the Discovery service, can be made AT-TLS aware by enabling the AT-TLS profile, whereby TLS information can be utilized. Such information could be a client certificate.

## Zowe configuration

:::note
Support for AT-TLS was introduced back in Zowe 1.24, however there was an issue that prevented startup in some versions. It is recommended to upgrade to 2.13 or newer for full support.
:::

To enable the AT-TLS profile and disable the TLS application in API ML, update `zowe.yaml` with following values under the respective component in the `zowe.components` section.

```yaml
components.*.spring.profiles.active: attls
components.*.server.ssl.enabled: false
components.*.server.internal.ssl.enabled: false
```

While API ML will not handle TLS on its own with AT-TLS enabled, the Mediation Layer needs information about the server certificate that is defined in the AT-TLS rule.

Update the `zowe.yaml` file for each respective APIML component in the `zowe.components` sections with the path to the SAF Key ring from the AT-TLS rule and specify the alias that is used for Inbound communication:

```yaml
components.*.certificate.keystore.file: <SAF-key-ring-from-AT-TLS-rule>
components.*.certificate.keystore.type: JCERACFKS
components.*.certificate.keystore.password: password
components.*.certificate.keystore.alias: <certificate alias / label from AT-TLS rule>
```

Finally, if there is an outbound AT-TLS rule configured for the link between the API Gateway and z/OSMF, update or set the `zowe.zOSMF.scheme` to `http`.

:::note
AT-TLS is not yet supported in the API Cloud Gateway Mediation Layer component.
:::

## Security considerations

Configuring AT-TLS for the Zowe API Mediation Layer needs careful consideration regarding the security settings, especially around the Client Certificate authentication feature in the Zowe API Mediation Layer components as well as for the Onboarded services that support the x.509 client certificates authentication scheme.

In general terms, the outbound AT-TLS rules (i.e. to make a transparent https call through http) that are configured to send the server certificate should be limited to the services that __require__ service to service authentication, such as the case of the API Gateway authenticating with the Discovery Service.

**Note:** The Discovery Service endpoints are not reachable by standard API Gateway routing by default.

## Inbound and Outbout AT-TLS rules

This section describes the suggested AT-TLS settings. It is meant as a guideline and helps showcase important aspects.

### Inbound rules

A generic inbound rule can be set for all of the core API Mediation Layer services:

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

## High Availability

AT-TLS settings for a Zowe API Mediation Layer installation configured in High Availability mode do not differ extensively. Changes need to be made to the previously described rules to allow for cross-lpar communication:

Update `RemoteAddr` setting in the rules to allow for the following connections:

- Discovery Service to Discovery Service, this is the replica request.
- Gateway Service to southbound services running in other LPAR.
- Southbound services to Discovery Service, during onboarding.
