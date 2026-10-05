# Enabling single sign on for extending services

:::info Roles: system programmer, API service extender
:::

Enabling Single Sign On (SSO) in Zowe involves configuring JSON Web Tokens (JWT) or PassTickets for secure authentication. 

## Configuring JWTs

The JWT configuration requires setting up a custom HTTP header to store the token, thereby enhancing secure communication with southbound services. 

For more information, see [Enabling single sign on for extending services via JSON Web Token (JWT) configuration](./configuration-extender-jwt.md).

## Configuring PassTickets

PassTicket configuration serves two distinct purposes within Zowe depending on your authentication architecture:

* **Core Infrastructure (z/OSMF)**  
Starting in Zowe v3.4.0, System Authorization Facility (SAF) is the default authentication provider (`apiml.security.auth.provider=saf`) for all new installations performed via Portable Software Instance (**PSWI**), which is the recommended method for installing Zowe API ML. Under this framework, authentication requests natively utilize SAF directly rather than routing explicitly through z/OSMF for initial validation. This is a mandatory core installation step if z/OSMF is present on your system.

To configure PassTickets for core Zowe and z/OSMF functionality, see [Addressing z/OSMF PassTicket and authentication requirements](./configuring-passtickets-for-zosmf-authentication.md).

* **Extending Services**  
PassTickets can also be used to allow third-party extending services that do not natively support JWT or client certificates to securely authenticate users via the API Gateway. This method requires activating PassTicket support, recording your custom service APPLID, and establishing dedicated application session keys.

:::note
The PassTicket configuration process differs depending on whether you are setting up your first service or a subsequent service. First-time setup requires full ESM configuration, whereas onboarding subsequent services only requires setting up and permitting the new APPLID.
:::

For details about first service and second/subsequent service configuration requirements, see:
* [First service onboarding with PassTickets](./configuration-extender-passtickets.md#first-service-onboarding-with-passtickets)
* [Second and subsequent service onboarding with PassTickets](./configuration-extender-passtickets.md#second-and-subsequent-service-onboarding-with-passtickets)

To configure PassTickets for a custom downstream service onboarding onto the API Mediation Layer, see [Enabling single sign on for extending services via PassTicket configuration](./configuration-extender-passtickets.md).
