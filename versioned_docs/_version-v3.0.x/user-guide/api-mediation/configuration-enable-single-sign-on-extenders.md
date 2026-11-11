# Enabling single sign on for extending services

:::info Roles: system programmer, API service extender
:::

Enabling Single Sign On (SSO) in Zowe involves configuring JWT tokens or PassTickets for secure authentication. The JWT token configuration requires setting up a custom HTTP header to store the token, thereby enhancing secure communication with southbound services. 

For more information, see [Enabling single sign on for extending services via JWT token configuration](./configuration-extender-jwt.md).

PassTicket configuration, alternatively, allows services that do not natively support JWT tokens or client certificates to authenticate via the API Gateway. This authentication process requires the activation of PassTicket support, recording the APPLID, and configuring the Zowe started task user ID. Additionally, custom HTTP headers can be set up for PassTickets and user IDs, ensuring secure and streamlined access within the Zowe ecosystem.

For more information, see [Enabling single sign on for extending services via PassTicket configuration](./configuration-extender-passtickets.md).