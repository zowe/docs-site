# Zowe API Mediation Layer OIDC authentication

Zowe API ML can be configured to authenticate users by accepting Access Tokens issued by an external Identity Provider (IDP) implementing OIDC/OAuth2 protocols.
This authentication is useful in advanced deployments of Zowe, in which client applications need to access mainframe as well as enterprise/distributed systems, while offering their users the comfort of SSO across the boundaries of the system.  

Read this topic to find out details about the API ML OIDC authentication functionality, and related configuration.

- [OIDC Usage](#oidc-usage)
- [Authentication Workflow](#authentication-flow)
- [Configuration](#api-ml-oidc-configuration)
    * [Prerequisites](#prerequisites)
    * [OIDC provider configuration](#oidc-provider-configuration)
    * [API ML Gateway configuration](#api-ml-gateway-configuration)
    * [SAF/ESM configuration](#esm-configuration)
- [Troubleshooting](#troubleshooting)

## OIDC Usage
OIDC authentication is used together with the z/OS [Identity Propagation](https://www.redbooks.ibm.com/redbooks/pdfs/sg247850.pdf) feature to implement the AI ML Identity Federation. The
[OIDC](https://openid.net/specs/openid-connect-core-1_0.html) protocol adds an authentication layer on top of the [OAuth2](https://www.rfc-editor.org/rfc/rfc6749) Authorization protocol.
It is used by API ML client applications to verify a user's identity with a distributed OIDC provider trusted by the mainframe security.

After successful login, the OIDC provider grants the client an Access Token (along with an Identity Token, and possibly a Refresh Token if requested and appropriate).
The Access Token issued by a trusted OIDC provider is now accepted by API ML.
is the foundation of API ML multi-domain Identity Federation.
The JWT Access Token obtained from the OIDC/IDP can then be used to authenticate the user, authorize the client application, and enable access to mainframe resources through the API ML Gateway.

## Authentication Flow
The following diagram illustrates the interactions between the participants of the OIDC-based API ML authentication process.

<img src={require("../../images/api-mediation/apiml-oidc-auth-seq.png").default} alt="APIML OIDC Workflow" width="700"/>

* When the User wants to access mainframe resources or services using the client application without valid authentication or an access token, the client redirects the User agent to the login end-point of the distributed OIDC provider. 
* The user is asked to provide valid credentials (authentication factors).
* After successful validation of all authentication factors, the OIDC provider grants an access token to the client.
* The client can then request the needed mainframe resources and present the access token from the API ML Gateway in the request. 
* The Gateway validates the access token at the OIDC provider's /introspection end-point. If successful, the outcome is cached for a short time. 
* In subsequent calls with the same token, the Gateway reuses the cached validation outcome. This outcome reuse reduces round trips to the OIDC /introspection end-point for a short interval of time when the client needs to access multiple resources to complete a unit of work. The caching interval is configurable with a sensible default. 
* The API ML Gateway fetches the distributed user identity from the distributed access token, and maps that identity to the mainframe identity of the user using SAF. 
* The mainframe user identity is used to create the mainframe user credentials (Zowe or SAF JWT or pass-ticket) expected by the target mainframe service.

## API ML OIDC Configuration

### Prerequisites

- Users who need access to mainframe resources using OIDC authentication require a mainframe identity managed by SAF/ESM
- Users require a distributed identity managed by the OIDC provider  
- SAF/ESM is configured with mapping between the mainframe and distributed user identities
  
### OIDC provider configuration

- Client Application configuration in the OIDC provider. 

  Configuration of the OIDC provider varies depending on the OIDC provider and client application capabilities.
  For example, web applications with a secure server-side component can use the `code grant authorization flow`, and can be granted a Refresh Token. Conversely, a single page application running entirely in the user agent (browser) is more limited regarding its security capabilities.  

  Consult your OIDC provider documentation for options and requirements available for your type of client application. 

- Users assignment to the Client Application.

  Users who are allowed access the mainframe resources with a distributed authentication must either be directly assigned by the OIDC provider to the client application,
or must be part of a group which is allowed to work with the client application.     

### API ML Gateway configuration

* Allow OIDC authentication in zowe.yaml
  * set oidc_allowed

* OIDC configuration in the API ML GW application.yaml - Provide the values for the following configuration parameters in the API ML GW application.yaml, where:
  - clientId is the ID of the API ML GW client registeration in the OIDC provider
  - clientSecret is the secret generated by the OIDC provider
  - registry is the SAF/ESM registry used to group the user identities mapping from OIDC to SAF
```
  security:
      oidc:
          enabled: true
          clientId: ${apiml_gateway_oidc_client_id}
          clientSecret: ${apiml_gateway_oidc_client_secret}
          registry: ${saf_oidc_registry_name} 
```

### ESM configuration

SAF/ESM is configured with mapping between the mainframe and distributed user identities. API ML provides Zowe CLI plugin to help administrators to generate JCL for the required mapping configuration. 
Please see the [Identity Federation cli plugin](../../user-guide/cli-idfplugin.md) documentation for details how to use the plugin tool to set up the mapping in the ESM of your z/OS system.

## Troubleshooting
