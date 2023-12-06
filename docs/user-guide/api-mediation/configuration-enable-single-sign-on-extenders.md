# Enable Single Sign on For Extenders

Enabling Single Sign-On (SSO) in Zowe involves configuring JWT tokens and PassTickets for secure authentication. The JWT token configuration requires setting up a custom HTTP header to store the token, enhancing secure communication with southbound services. PassTicket configuration, alternatively, allows services that don't natively support JWT tokens or client certificates to authenticate via the API Gateway. This process involves specific steps like activating PassTicket support, recording the APPLID, and configuring the Zowe started task user ID. Additionally, custom HTTP headers can be set up for PassTickets and user IDs, ensuring secure and streamlined access within the Zowe ecosystem.

- [Enabling single sign on for extending services via JWT token configuration](./configuration-extender-jwt)
- [Enabling single sign on for extending services via PassTicket configuration](./configuration-extender-passtickets)