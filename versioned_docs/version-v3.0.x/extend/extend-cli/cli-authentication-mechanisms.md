# Authentication mechanisms

As an extender, you can change the way Zowe CLI uses various mechanisms of authentication when communicating with the mainframe.

Zowe CLI accepts various methods, or mechanisms, of authentication when communicating with the mainframe, and the method that the CLI ultimately follows is based on the service it is communicating with.

However, some services can accept multiple methods of authentication. When multiple methods are provided (in a profile or command) for a service, the CLI follows an *order of precedence* to determine which method to apply. Extenders can modify this order for their plug-in.

To learn the authentication methods used for different services and their order of precedence, refer to the following table.

Service | Order of precedence
|:--- |:--- |
API ML | 1. username, password<br/> 2. API ML token<br/> 3. PEM certificate |
Db2, <br/> FTP,<br/> most other services | username, password
SSH | 1. SSH key<br/> 2. username, password
 ZOSMF<br/> direct connection | 1. username, password<br/> 2. PEM certificate
