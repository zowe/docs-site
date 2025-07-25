# Authentication mechanisms

Zowe CLI uses various methods, or mechanisms, of authentication when communicating with the mainframe. The default *order of precedence* for these methods is outlined here.

As an extender, if your extension requires a specific type of authentication that differs from the default, you can tell your users to add the `authOrder` property to their configuration. Otherwise, extenders can program the addition of the `authOrder` property to their associated profile in the Zowe client configuration.

:::note

Zowe CLI users are able to change the default [order of precedence](../../user-guide/cli-authentication-methods.md#order-of-precedence) by adding the `authOrder` property to their configuration, or changing its values. Be aware of this possibility as you develop your extension.

:::

## Default order of precedence

The method that the CLI ultimately follows is based on the service it is communicating with.

Some services can accept multiple methods of authentication. When multiple methods are provided (in a profile or command) for a service, the CLI follows an *order of precedence* to determine which method to apply. Extenders can modify this order for their plug-in.

To learn the authentication methods used for different services and their order of precedence, refer to the following table.

Service | Order of precedence
|:--- |:--- |
API Mediation Layer<br/><br/> **Note**: To avoid errors, update profiles for services routed<br/> through API ML to store base path instead of port number | 1. username, password<br/> 2. API ML token<br/> 3. PEM certificate |
Db2, <br/> FTP,<br/> most other services | username, password
SSH | 1. SSH key<br/> 2. username, password
 ZOSMF<br/> direct connection | 1. username, password<br/> 2. PEM certificate
