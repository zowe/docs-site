# Zowe API Mediation Layer OIDC authentication

[OIDC](https://openid.net/specs/openid-connect-core-1_0.html) protocol adds an authentication layer on top of the [OAuth2](https://www.rfc-editor.org/rfc/rfc6749) Authorization protocol.
OpenID/Connect (OIDC) authentication together with the z/OS [Identity Propagation](https://www.redbooks.ibm.com/redbooks/pdfs/sg247850.pdf) mechanism is the foundation of the API ML Identity Federation.
Zowe API ML can be configured to authenticate users by accepting Access Tokens issued by an external OIDC provider.
This is useful in advanced deployments of Zowe, where client applications need to access mainframe as well as to enterprise/distributed systems, while offering their users the comfort of SSO across the systems boundaries.  

This article provides details of the API ML OIDC authentication functionality and related configuration needed to achieve it.

- [Usage](#usage)
- [Authentication flow](#authentication-flow)
- [Prerequisites](#prerequisites)
  * [OIDC provider configuration](#oidc-provider-configuration)
  * [ESM configuration](#esm-configuration)
- [API ML configuration](#api-ml-configuration)
- [Troubleshooting](#troubleshooting)

## Usage
OIDC protocol is used by APIML client applications to verify user's identity with a distributed OIDC provider trusted by the mainframe security manager.
Upon successful user login, the OIDC provider grants the client application an Access Token (along with an Identity Token).
The client application can pass that OIDC token with subsequent requests to the mainframe services routed through the API ML Gateway.
API ML Gateway then validates the OIDC Access Token and if it is valid, the user identity from that token is mapped to the mainframe identity of the user.
This allows API ML Gateway to route the request to the target API service's with mainframe user credentials (JWT or a Passticket) according to the service's authentication schema configuration.

## Authentication Flow
The following diagram describes the interactions between the participants of the OIDC based API ML authentication process.

<img src={require("../../images/api-mediation/apiml-oidc-auth-seq.png").default} alt="APIML OIDC Workflow" width="700"/>

* When the User wants to access mainframe resources or services using the client application without a valid authentication / access token, 
the client redirects the User agent to the login end-point of the distributed OIDC provider. 
* The user is asked to provide their valid credentials (authentication factors).
* After successful validation of all authentication factors, the OIDC provider grants the Client an access token.
* The client then can request from API ML GW the needed mainframe resources presenting the access token in the request. 
* The GW validates the access token at the OIDC provider's /introspection end-point and in case of success, caches the outcome for a short time. 
* In subsequent calls with the same token, the GW reuses the cached validation outcome. This helps to save round trips to the OIDC /introspection end-point 
for a short interval of time, when the client needs to access multiple resources in a row to complete a unit of work. The caching interval is configurable with a default value of 30 seconds which should be sufficient to complete most client operations requiring multiple API requests, while providing adequate protection against unauthorized access. 
* The API ML GW fetches  the distributed user identity from the distributed access token and maps it to the user mainframe identity using SAF. 
* The mainframe user identity is used to create the mainframe user credentials (Zowe or SAF JWT or pass-ticket) expected by the target mainframe service.

## Prerequisites
Before a client application attempts to use OIDC authentication with API ML, the deployers must ensure that: 

- The client application users need to have distributed identity managed by the OIDC provider.
- The users who need access to mainframe resources using OIDC authentication must have a mainframe identity managed by SAF/ESM.
- SAF/ESM is configured with mapping between the mainframe and distributed user identities. For details, read the [ESM configuration](#esm-configuration) section bellow.
  
### OIDC provider configuration

- Client Application configuration in the OIDC provider.

  Depending on the OIDC provider and client application capabilities the configuration of the OIDC provider would vary.
For example Web Applications with a secure server side component can use `code grant authorization flow` and can be granted Refresh Token, whereas a Single Page Application running entirely in the User Agent (browser) is more limited regarding its security capabilities.  

  Consult your OIDC provider documentation for options and requirements available for your type of client application. 

- Users assignment to the Client Application.

  Users who will be allowed to access the mainframe resources with a distributed authentication must be eiter directly assigned by the OIDC provider to the client application,
or must be part of group which is allowed to work with the client application.     

### ESM configuration
SAF/ESM must be configured to maintain mapping between the mainframe and distributed user identities. 
API ML provides Zowe CLI plugin to help administrators to generate JCL for the required mapping configuration. 
Please see the [Identity Federation cli plugin]() documentation for details how to use the plugin tool to set up the mapping in the ESM of your z/OS system.

## API ML configuration
Use the following procedure to enable the feature to use a OIDC Access Token as the method of authentication for the API Mediation Layer Gateway.

Follow these steps:
1. Open zowe.yaml configuration file.

2. Configure the following properties:
          
   * components.gateway.apiml.security.oidc.enabled

   This property is the global feature toggle. Set the value to true to enable OIDC authentication functionality.

   * components.gateway.apiml.security.oidc.clientId
   This property is the value of the client identification (client_id) assigned by the OIDC provider to the API ML Gateway
   
   * components.gateway.apiml.security.oidc.clientSecret 
   This property is the client secret assigned by the OIDC provider to the API ML Gateway. It is used in combination with the client_id in Access Token validation requests at the /introspection endpoint of the OIDC provider.
   
   * components.gateway.apiml.security.oidc.registry
   This property denotes the SAF registry used to group the identities recognized as having a OIDC identity mapping.        

    
TODO@PetrWeinfurt: Do we need a property for the ZWESVUSR name to be assigned for the identity mapper, similarly as for the x.509 mapper?

## Troubleshooting
TODO# Add here troubleshooting topics for at least the following cases:
- OIDC provider is not configured properly
- User identities are not mapped properly in SAF and Identitiy Propagation doesn't work correctly at request time