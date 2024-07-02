# Configuring AT-TLS for API Mediation Layer

Review this article for descriptions of the configuration parameters required to make Zowe API Mediation Layer work with AT-TLS, including AT-TLS inbound and outbound rules, using AT-TLS in high availability, and troubleshooting. Security recommendations are also provided.

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
- [AT-TLS Troubleshooting](#at-tls-troubleshooting)

## AT-TLS configuration for Zowe

:::tip
Support for AT-TLS was introduced in Zowe v1.24. In this early version, startup was not possible in some versions of Zowe. For full support, we recommend that you upgrade to v2.13 or a later version of Zowe.
:::

Follow these steps to configure Zowe to support AT-TLS:

1. Enable the AT-TLS profile and disable the TLS application in API ML.  
Update `zowe.yaml` with the following:

**Example:**

```yaml
zowe:
  network:
    server:
      tls:
        attls: true

```

While API ML does not handle TLS on its own with AT-TLS enabled, API ML requires information about the server certificate that is defined in the AT-TLS rule. Ensure that the server certificates provided by the AT-TLS layer are trusted in the configured Zowe keyring. Ideally, AT-TLS should be configured with the same Zowe keyring.

If there is an outbound AT-TLS rule configured for the link between the API Gateway and z/OSMF, set the `zowe.zOSMF.scheme` property to `http`.

:::note Notes
* AT-TLS is supported in the API Cloud Gateway Mediation Layer component beginning with version 2.17.

* As the Gateway is a core component of API ML, other components that need to interact with the Gateway, such as Zowe ZLUX App Server, also require AT-TLS configuration.
:::

:::caution Important security consideration

Configuring AT-TLS for the Zowe API Mediation Layer requires careful consideration of security settings. These security settings apply to the Client Certificate authentication feature in Zowe API Mediation Layer components, as well as for onboarded services that support the x.509 client certificates authentication scheme.

Outbound AT-TLS rules (i.e. to make a transparent https call through http) that are configured to send the server certificate should be limited to the services that __require__ service to service authentication. If an API ML-onboarded southbound service needs to support x.509 client certificate authentication, we recommend to use the integrated TLS handshake capabilities of API ML. Do not configure an outbound AT-TLS rule for these services.

The Discovery Service endpoints are not reachable by standard API Gateway routing by default.
:::

## AT-TLS rules

Follow the examples within [at-tls configuration](../../at-tls-configuration)



## Using AT-TLS for API ML in High Availability

AT-TLS settings for a Zowe API Mediation Layer installation configured in High Availability mode do not differ extensively. Changes need to be made to the previously described rules to allow for cross-lpar communication:

Ensure that the `RemoteAddr` setting in the rules accounts for the following connections:

- Discovery Service to Discovery Service. This is the replica request.
- Gateway Service to southbound services running in another LPAR.
- Southbound services to Discovery Service. This applies during onboarding.

## Multi-tenancy deployment

For specific scenario when Central API ML is running on z/OS with AT-TLS enabled, it is important to override protocol for external URL. This information is used by the Central API ML to call domain API ML and it needs to reflect outbound AT-TLS rule. In this case, update your domain API ML configuration as follows:

```
zowe:
  components:
    gateway: 
      apiml:
        gateway:
          externalProtocol: http
```

## AT-TLS Troubleshooting

This section describes some common issues when using AT-TLS with API ML and how to resolve these issues.

### The message `This combination of port requires SSL` is thrown <!-- verify correct message -->

Make sure the URL starts with `https://`. This message indicates that AT-TLS rules are in place and it is trying to connect on port 80 to the API Gateway, however the latter is still only listening on the secure port 443.

**Solution:**  
Review settings in the API Gateway. Ensure that the changes described in [AT-TLS configuration for Zowe](#at-tls-configuration-for-zowe) are applied.

### AT-TLS rules are not applied

If the application is responding in http, the application may not be properly configured to support http-only calls. AT-TLS is not correctly configured.

**Solution:**  
Ensure the rules are active and that the filters on port range and job names are properly set.

### Non matching ciphers

An error can occur if the [list of ciphers](#ciphers) does not match between the ones configured in the AT-TLS rules and the ones used by non AT-TLS-aware clients.

**Solution:**  
Review the supported TLS versions and ciphers used in both the client and the server.
