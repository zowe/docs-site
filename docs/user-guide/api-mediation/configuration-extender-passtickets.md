# Enabling single sign on for extending services via PassTicket configuration

As a system programmer, follow the procedures described in this article to configure Zowe to use PassTickets, and to enable Zowe to use PassTickets to authenticate towards specific extending services.

:::info**Roles:** system programmer, security administrator
:::

## Configuring Zowe to use PassTickets

As system programmer, you can configure Zowe to use PassTickets for API services that are compatible to accept them to authenticate your service with the API Mediation Layer.

### Overview of how PassTickets are used
API clients can use various supported methods such as Zowe JWT token or client certificate to access an API service even if the API service itself does not support the JWT token or client certificate.

When an API client provides a valid authentication method to the API ML, the API Gateway then generates a valid PassTicket for any API service that supports PassTickets.
The API Gateway then uses the PassTicket to access that API service.
The API Gateway provides the user ID and password in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

- [Enabling PassTicket support](#enabling-passticket-support)
- [Security configuration that allows the Zowe API Gateway to generate PassTickets for an API service](#security-configuration-that-allows-the-zowe-api-gateway-to-generate-passtickets-for-an-api-service)

    - [ACF2](#acf2)
    - [Top Secret](#top-secret)
    - [RACF](#racf)

### Enabling PassTicket support

The following steps outline the procedure for enabling PassTicket Support:

1. Follow the API service documentation that explains how to activate support for PassTickets.
  - The PassTickets for the API service must have the replay protection switched off. The PassTickets are exchanged between Zowe API Gateway and the API Service in a secure mainframe environment.
2. Record the value of the APPLID of the API service.
3. Enable the Zowe started task user ID to generate PassTickets for the API service.
4. Enable PassTicket support in the API Gateway for your API service.

### Security configuration that allows the Zowe API Gateway to generate PassTickets for an API service

Consult with your security administrator to issue security commands to allow the Zowe started task user ID to generate PassTickets for the API service.

Use the following variables to generate PassTickets for the API service to enable the Zowe started task user ID:

- `<applid>` is the APPLID value used by the API service for PassTicket support (e.g. `OMVSAPPL`)

- `<zowesrv>` is Zowe started task user ID used during the Zowe installation

Replace the variables in the following examples with actual values.

#### ACF2

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.
The following code is an example of security commands that need to be issued.

**Example:**

```markup
ACF
SET RESOURCE(PTK)
RECKEY IRRPTAUTH ADD(<applid>.- UID(<zowesrv>) SERVICE(UPDATE,READ) ALLOW)
F ACF2,REBUILD(PTK),CLASS(P)
END
```

#### Top Secret

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**

```markup
TSS PERMIT(<zowesrv>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
TSS REFRESH
```

#### RACF

To enable PassTicket creation for API service users, define the profile `IRRPTAUTH.<applid>.*` in the `PTKTDATA` class and set the universal access authority to `NONE`.

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**

```markup
RDEFINE PTKTDATA IRRPTAUTH.<applid>.* UACC(NONE)
PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowesrv>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```

# Adding custom HTTP Auth headers to store user ID and PassTicket

If a southbound service needs to consume the PassTicket and the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the PassTicket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the header's name.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the header's name.
4. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the PassTicket and the user ID.