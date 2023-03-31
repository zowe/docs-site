# Zowe API Mediation Layer OIDC authentication

Zowe API ML can be configured to authenticate users by accepting Access Tokens issued by an external Identity Provider (IDP) implementing OIDC/OAuth protocols.

This article provides details of the OIDC authentication functionality and related configuration needed to achieve it.

- [OIDC Usage](#apiml-oidc-usage)
- [Authentication Workflow](#apiml-oidc-flow)
- [Configuration](#apiml-oidc-configuration)
    * [Prerequisites](#apiml-oidc-prereqs)
    * [External IDP Configuration](#external-idp-config)
    * [API ML GW configuration](#apiml-gw-config)

## API ML OIDC Usage
[OIDC](#TODO-Provide-External-Link) protocol adds an authentication layer on top of the [OAuth2](#TODO-Provide-External-Link) Authorization protocol. It can be used to redirect
the user to a recognized IDP and after successful authentication, the client application can be granted an Access Token (along with Identity Token, eventually Refresh Token).
The JWT Access Token obtained from the distributed IDP can be used to authenticate the user (and authorize the client) to access mainframe resources through the API ML GW.

![img.png](img.png)

'**Note:** Currently, API ML can provide SSO only in a single security domain.

## OIDC Authentication Workflow
The following diagram describes the interactions between the general participants in the OIDC authentication process with API ML GW.

<img src={require("../../images/api-mediation/oidc-diagram.jpeg").default} alt="APIML OIDC Workflow" width="700"/>

## Configuration

### Prerequisites
#### User has mainframe identity
#### User has distributed identity
#### SAF mapping for the above user identities
#### External IDP Configuration

- ** The Client Application must be configured in the distributed IDP.
- ** User assigned to the Client Application
F
### API ML Configuration
- ** Allow OIDC authentication
- ** External IDP config

