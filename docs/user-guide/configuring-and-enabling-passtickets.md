# Configuring and enabling Zowe to use PassTickets

## Configuring Zowe to use PassTickets

As system programmer, you can configure Zowe to use PassTickets for API services that are compatible to accept them to authenticate your service with the API Mediation Layer.
For more information, see [Authentication with PassTickets](authentication-for-apiml-services.md#authentication-with-passtickets).

### Overview
API clients can use either a Zowe JWT token or client certificate to access an API service even if the API service itself does not support the JWT token or client certificate.
The Zowe JWT token is available through the API Gateway [authentication endpoint](../extend-apiml/authentication-for-apiml-services).

When an API client provides a valid Zowe JWT token or client certificate to the API ML, the API Gateway then generates a valid PassTicket for any API service that supports PassTickets.
The API Gateway then uses the PassTicket to access that API service.
The API Gateway provides the user ID and password in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

- [Outline for enabling PassTicket support](#outline-for-enabling-passticket-support)
- [Security configuration that allows the Zowe API Gateway to generate PassTickets for an API service](#security-configuration-that-allows-the-zowe-api-gateway-to-generate-passtickets-for-an-api-service)

    - [ACF2](#acf2)
    - [Top Secret](#top-secret)
    - [RACF](#racf)

## Outline for enabling PassTicket support

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

## Enabling Zowe to use PassTickets

The following steps outline the procedure for enabling PassTicket Support:

1. Follow the [API service documentation](../../extend/extend-apiml/authentication-for-apiml-services.md#authentication-with-passtickets) that explains how to activate support for PassTickets.
    - The PassTickets for the API service must have the replay protection switched off. The PassTickets are exchanged between Zowe API Gateway and the API Service in a secure mainframe environment.
2. Record the value of the APPLID of the API service.
3. Enable the Zowe started task user ID to generate PassTickets for the API service. For more information, see [PassTicket Security Configuration](../../extend/extend-apiml/api-mediation-passtickets.md). 
4. Enable PassTicket support in the API Gateway for your API service.

**Note:**
PassTickets must be enabled for every user who requires access to the API service.