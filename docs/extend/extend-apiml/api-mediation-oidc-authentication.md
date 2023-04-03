# Zowe API Mediation Layer OIDC authentication

Zowe API ML can be configured to authenticate users by accepting Access Tokens issued by an external Identity Provider (IDP) implementing OIDC/OAuth protocols.

This article provides details of the OIDC authentication functionality and related configuration needed to achieve it.

- [OIDC Usage](#oidc-usage)
- [Authentication Workflow](#authentication-flow)
- [Configuration](#oidc-configuration)
    * [Prerequisites](#prerequisites)
    * [External IDP Configuration](#external-idp-configuration)
    * [API ML GW configuration](#api-ml-configuration)

## OIDC Usage
[OIDC](https://openid.net/specs/openid-connect-core-1_0.html) protocol adds an authentication layer on top of the [OAuth2](https://www.rfc-editor.org/rfc/rfc6749) Authorization protocol. 
It is used to request a trusted distributed OIDC provider to authenticate the user and after successful login to grant the client application an Access Token (along with Identity Token, eventually Refresh Token if requested).
The JWT Access Token obtained from the trusted OIDC/IDP can be used to authenticate the user (and authorize the client) to access mainframe resources through the API ML GW.

**Note:** Currently, API ML can provide SSO only in a single security domain.

## Authentication Flow
The following diagram describes the interactions between the general participants in the OIDC authentication process with API ML GW.

<img src={require("../../images/api-mediation/apiml-oidc-auth-seq.png").default} alt="APIML OIDC Workflow" width="700"/>

When the User wants to access mainframe resources or services using the Client application without a valid authentication / access token, 
the Client redirects the User agent to the login page of the distributed OIDC provider. The user is asked to provide valid credentials in form of authentication factors.
After successful validation of all authentication factors, the OIDC provider would grant the Client an access token. 
The client then requests from API ML GW the needed mainframe resources presenting the access token in the request.
The GW validates the distributed access token at the OIDC provider's /inttrospection end-point and caches for short time the outcome of a successful validation.
In subsequent calls with the same token, the GW will reuse the validation outcome. This is needed to save round trips to the OIDC /introspection endpoint 
for a short interval when the client would be accessing multiple resources in a sequence to complete a unit of work. The caching interval is configurable with a sensible default. 
In case that the distribted access token is valid, the gateway fetches the user identity from the token and maps it to the user mainfrae identity using a SAF call.
The mainframe user identity is then used to create the mainframe user credentials (Zowe or SAF JWT or pass-ticket) expected by the mainframe service which provides the requested resource.

## OIDC Configuration

### Prerequisites

- The users who need access to mainframe resources using OIDC authentication must have a mainframe identity
- The users distributed profiles in teh OIDC provide are configured to have access rights to the client application
- SAF mapping for the above user identities

#### External IDP Configuration

- The Client Application must be configured in the distributed IDP.
- User assigned to the Client Application
F
### API ML Configuration
- Allow OIDC authentication in zowe.yaml
- External IDP configuration in the API ML GW application.yaml
- 
