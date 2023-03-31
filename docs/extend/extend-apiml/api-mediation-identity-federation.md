# Zowe API Mediation Layer - Identity Federation

Zowe API ML is able to authenticate users if presented with an access token issued by another (external/distributed) IAM system.
After the user is authenticated by API ML, the identity of the user encoded with the exteranl access token is federated with the user's mainframe identity if they have one.
Consequently the mainframe services receive in the API requests the mainframe user identity as expected by their configuration.     
The Identity federation is based on the SAF Identity Propagation mechanism (external #TODO: Link?).
THe Identity Federation at API ML level allows for complex deployments made of multiple mainframe systems representing individual security domains, each with dedicated API ML installations.
The mainframe domains can be also independent and detatched.

A prerequisite for the Identity Federation to work is that the external and the mainframe user identities must be mapped in SAF and the distributed identity provider must be trusted by the mainframe security.
