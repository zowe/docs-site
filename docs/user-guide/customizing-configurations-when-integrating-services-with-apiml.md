# Customizing configurations when integrating services with API ML

:::info**Role:** system programmer
:::

As a system programmer there are various configuration requirements that apply when extending services to integrate with API ML. Review the following customizations that apply to your use case:

 * To configure Zowe to use PassTickets and enable PassTicket support in the Gateway, see: [Configuring Zowe to use PassTickets](./configuring-and-enabling-passtickets), and 
 * To disable the use of encoded slashes in the URL path of a request, see [encoded slashes](./encoded-slashes).
 * To add a custom HTTP Auth header to store a Zowe JWT token, see [Add a custom HTTP Auth header to store Zowe JWT token](./adding-custom-http-header-to-store-zowe-jwt-token).
 * To add custom HTTP Auth headers to store a user ID and PassTicket, see [Add custom HTTP Auth headers to store user ID and PassTicket](./adding-custom-http-auth-headers-to-store-user-id-and-passticket.md).
 * To configure API ML to handle CORS for a new service, see [CORS handling](./cors-handling).