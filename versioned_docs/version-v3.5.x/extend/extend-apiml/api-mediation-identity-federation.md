# Zowe API Mediation Layer - Identity Federation

Zowe API ML is able to authenticate users when presented with an access token issued by another (external/distributed) Identity Access Management (IAM) system.
After the user is authenticated by API ML, the identity of the user encoded with the external access token is federated with the mainframe identity of the user if one exists.
The mainframe services then receive the mainframe user identity in the API requests as expected according to the configuration of each request.

The Identity federation is based on the [SAF Identity Propagation mechanism](https://www.redbooks.ibm.com/redbooks/pdfs/sg247850.pdf).
The Identity Federation at the API ML level allows for complex deployments made of multiple mainframe systems representing individual security domains, each domain with dedicated API ML installations.
The mainframe domains can be also independent and detached.

A prerequisite for the Identity Federation to work is that both external and mainframe user identities be mapped in SAF, and that the distributed identity provider must be trusted by the mainframe security manager.
See the configuration prerequisites in the [API ML OIDC Authentication](./api-mediation-oidc-authentication.md) article. 