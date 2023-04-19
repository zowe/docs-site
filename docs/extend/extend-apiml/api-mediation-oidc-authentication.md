# Zowe API Mediation Layer OIDC Authentication

The OpenID/Connect ([OIDC](https://openid.net/specs/openid-connect-core-1_0.html)) protocol adds an authentication layer on top of the [OAuth2](https://www.rfc-editor.org/rfc/rfc6749) Authorization protocol.
OIDC authentication, together with the z/OS [Identity Propagation](https://www.redbooks.ibm.com/redbooks/pdfs/sg247850.pdf) mechanism, is the foundation of the API ML Identity Federation.
Zowe API ML can be configured to authenticate users by accepting Access Tokens issued by an external OIDC provider.
This configuration is useful in advanced deployments of Zowe where client applications need to access mainframe as well as enterprise/distributed systems while simultaneously offering single sign-on (SSO) across system boundaries.  

Review this topic for details about the API ML OIDC authentication functionality and how to configure this feature. 

- [Usage](#usage)
- [Authentication flow](#authentication-flow)
- [Prerequisites](#prerequisites)
  * [OIDC provider](#oidc-provider)
  * [ESM configuration](#esm-configuration)
- [API ML configuration](#api-ml-configuration)
- [Troubleshooting](#troubleshooting)

## Usage
The OIDC protocol is used by API ML client applications to verify the identity of a user with a distributed OIDC provider trusted by the mainframe security manager.
Upon successful user login, the OIDC provider grants the client application an Access Token along with an Identity Token.
The client application can pass this OIDC token with subsequent requests to mainframe services routed through the API ML Gateway.
The API ML Gateway then validates the OIDC Access Token. If the token is valid, the user identity from that token is mapped to the mainframe identity of the user.
This API ML Gateway can then route the request to target API services with mainframe user credentials (JWT or a Passticket) according to the service's authentication schema configuration.

## Authentication Flow
The following diagram illustrates the interactions between the participants of the OIDC based API ML authentication process.

<img src={require("../../images/api-mediation/apiml-oidc-auth-seq.png").default} alt="APIML OIDC Workflow" width="700"/>

* When a user wants to access mainframe resources or services using the client application without a valid authentication / access token, the client redirects the user agent to the login end-point of the distributed OIDC provider. 
* The user is asked to provide valid credentials (authentication factors).
* After successful validation of all authentication factors, the OIDC provider grants the client an access token.
* The client can then request from API ML Gateway the needed mainframe resources presenting the access token in the request. 
* The Gateway validates the access token at the provider's OIDC/introspection end-point. If the access token is validated, the outcome is cached for a short time. 
* In subsequent calls with the same token, the Gateway reuses the cached validation outcome. As such, round trips to the OIDC /introspection end-point are not required between short intervals, when the client needs to access multiple resources in a row to complete a unit of work. The caching interval is configurable with a default value of 30 seconds, a sufficient time allotment to allowc most client operations requiring multiple API requests to complete, while also providing adequate protection against unauthorized access. 
* The API ML Gateway fetches the distributed user identity from the distributed access token and maps this user identity to the user mainframe identity using SAF. 
* The mainframe user identity is able to create mainframe user credentials (Zowe, SAF JWT, or pass-ticket) which are expected by the target mainframe service.

## Prerequisites
Ensure that the following prerequisites are met:  

- Users who require access to mainframe resources using OIDC authentication have a mainframe identity managed by SAF/ESM.
- Client application users have distributed identity managed by the OIDC provider. For details, see the section [OIDC provider](#oidc-provider) in this topic.
- SAF/ESM is configured with mapping between the mainframe and distributed user identities. For details, see the section [ESM configuration](#esm-configuration) in this topic.
  
### OIDC provider

- Client Application configuration in the OIDC provider.

  Depending on the OIDC provider and client application capabilities, configuration of the OIDC provider varies.
For example Web Applications with a secure server side component can use `code grant authorization flow` and can be granted a Refresh Token, whereas a Single Page Application running entirely in the User Agent (browser) is more limited regarding its security capabilities.  

  **Tip:** Consult your OIDC provider documentation for options and requirements available for your type of client application. 

- Users have been assigned to the Client Application.

  To access mainframe resources, users with a distributed authentication must either be directly assigned by the OIDC provider to the client application, or must be part of group which is allowed to work with the client application.     

### ESM configuration 
The user identity mapping is defined as a distributed user identity filter, which is maintained by the System Authorization Facility (SAF) / External Security Manager (ESM).
A distributed identity consists of two parts: a distributed identity name, and a trusted registry which governs that identity. 
API ML provides a Zowe CLI plugin to help administrators to generate a JCL for creating the mapping filter specific for the ESM installed on the target mainframe system. 

  See the [Identity Federation cli plugin]( )  <!--Add link --> documentation for details about how to use the plugin tool to set up the mapping in the ESM of your z/OS system.

Alternatively, administrators can use the installed ESM functionality to create, delete, list, and query a distributed identity filter/s:
 - For RACF consult [RACMAP command](https://www.ibm.com/docs/en/zos/2.3.0?topic=rcs-racmap-create-delete-list-query-distributed-identity-filter).
 - For CA Top Secret use the [IDMAP Keyword - Implement z/OS Identity Propagation Mapping](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-top-secret-for-z-os/16-0/administrating/issuing-commands-to-communicate-administrative-requirements/keywords/idmap-keyword-implement-z-os-identity-propagation-mapping.html).
 - For CA ACF2 use [IDMAP User Profile Data Records](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-acf2-for-z-os/16-0/administrating/administer-records/user-profile-records/idmap-user-profile-records.html).

## API ML configuration to use an OIDC Access Token
Use the following procedure to enable the feature to use an OIDC Access Token as the method of authentication for the API Mediation Layer Gateway.

 In the zowe.yaml file, configure the following properties:
          
   * **components.gateway.apiml.security.oidc.enabled**  
   Specifies the global feature toggle. Set the value to true to enable OIDC authentication functionality.

   * **components.gateway.apiml.security.oidc.clientId**  
   Specifies the value of the client identification (client_id) assigned by the OIDC provider to the API ML Gateway.
   
   * **components.gateway.apiml.security.oidc.clientSecret**   
   Specifies the client secret assigned by the OIDC provider to the API ML Gateway. It is used in combination with the client_id in Access Token validation requests at the /introspection endpoint of the OIDC provider.
   
   * **components.gateway.apiml.security.oidc.registry**  
   Specifies the SAF registry used to group the identities recognized as having a OIDC identity mapping.        

<!-- Can we add an example of this zowe.yml with these parameters? -->    

TODO@PetrWeinfurt: Do we need a property for the ZWESVUSR name to be assigned for the identity mapper, similarly as for the x.509 mapper?

## Troubleshooting
TODO# Add here troubleshooting topics for at least the following cases:
- OIDC provider is not configured properly
- User identities are not mapped properly in SAF and Identitiy Propagation does not work correctly at request time.