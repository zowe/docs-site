# Enabling PassTicket creation for API Services that Accept PassTickets

As system programmer, you can configure Zowe to use PassTickets for API services that are compatible to accept them to authenticate your service with the API Mediation Layer.

## Overview
API clients can use either a Zowe JWT token or client certificate to access an API service even if the API service itself does not support the JWT token or client certificate.
The Zowe JWT token is available through the API Gateway [authentication endpoint](../extend-apiml/api-mediation-security.md#authentication-for-api-ml-services).

When an API client provides a valid Zowe JWT token or client certificate to the API ML, the API Gateway then generates a valid PassTicket for any API service that supports PassTickets.
The API Gateway then uses the PassTicket to access that API service.
The API Gateway provides the user ID and password in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

- [Outline for enabling PassTicket support](#outline-for-enabling-passticket-support)
- [Security configuration that allows the Zowe API Gateway to generate PassTickets for an API service](#security-configuration-that-allows-the-zowe-api-gateway-to-generate-passtickets-for-an-api-service)

  - [ACF2](#acf2)
  - [Top Secret](#top-secret)
  - [RACF](#racf)
- [API services that support PassTickets](#api-services-that-support-passtickets)
  - [API Services that register dynamically with API ML that provide authentication information](#api-services-that-register-dynamically-with-api-ml-that-provide-authentication-information)
  - [API Services that register dynamically with API ML but do not provide metadata](#api-services-that-register-dynamically-with-api-ml-but-do-not-provide-metadata)
  - [API services that are defined using a static YAML definition](#api-services-that-are-defined-using-a-static-yaml-definition)
- [Adding YAML configuration to API services that register dynamically with API ML](#adding-yaml-configuration-to-api-services-that-register-dynamically-with-api-ml)

## Outline for enabling PassTicket support

The following steps outline the procedure for enabling PassTicket Support:

1. Follow the API service documentation that explains how to activate support for PassTickets.
   - The PassTickets for the API service must have the replay protection switched off. The PassTickets are exchanged between Zowe API Gateway and the API Service in a secure mainframe environment.
2. Record the value of the APPLID of the API service.
3. Enable the Zowe started task user ID to generate PassTickets for the API service.
4. Enable PassTicket support in the API Gateway for your API service.

**Note:**
PassTickets must be enabled for every user who requires access to the API service.

## Security configuration that allows the Zowe API Gateway to generate PassTickets for an API service

Consult with your security administrator to issue security commands to allow the Zowe started task user ID to generate PassTickets for the API service.

Use the following variables to generate PassTickets for the API service to enable the Zowe started task user ID:

- `<applid>` is the APPLID value used by the API service for PassTicket support (e.g. `OMVSAPPL`)

- `<zowesrv>` is Zowe started task user ID used during the Zowe installation

Replace the variables in the following examples with actual values.

### ACF2

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

### Top Secret

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**

```markup
TSS PERMIT(<zowesrv>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
TSS REFRESH
```

### RACF

To enable PassTicket creation for API service users, define the profile `IRRPTAUTH.<applid>.*` in the `PTKTDATA` class and set the universal access authority to `NONE`.

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**

```markup
RDEFINE PTKTDATA IRRPTAUTH.<applid>.* UACC(NONE)
PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowesrv>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```

## API services that support PassTickets

The following types of API services support PassTickets:

  - [API Services that register dynamically with API ML that provide authentication information](#api-services-that-register-dynamically-with-api-ml-that-provide-authentication-information)
  - [API Services that register dynamically with API ML but do not provide metadata](#api-services-that-register-dynamically-with-api-ml-but-do-not-provide-metadata)
  - [API services that are defined using a static YAML definition](#api-services-that-are-defined-using-a-static-yaml-definition)

### API Services that register dynamically with API ML that provide authentication information

API services that support Zowe API Mediation Layer and use dynamic registration to the Discovery Service already provide metadata that enables PassTicket support.

As a system programmer, you are not required to do anything in this case. All required information is provided by the API service automatically.

### API Services that register dynamically with API ML but do not provide metadata

Some services can use PassTickets but the API ML does not recognize that the service can accept PassTickets.
For such services, you can provide additional service metadata externally in the same file that contains the static YAML definiton. The static YAML definitions are described in [REST APIs without code changes required](./onboard-static-definition.md).

Add the following section to the YAML file with a static definition:

```yaml
additionalServiceMetadata:
    - serviceId: <serviceId>
      mode: UPDATE
      authentication:
        scheme: httpBasicPassTicket
        applid: <applid>
```

where:

- `<serviceId>`

    is the service ID of the service to which you want to add metadata.

### API services that are defined using a static YAML definition

Add the following metadata to the same level as the `serviceId`:

**Example:**

```yaml
    - serviceId: ...
      authentication:
        scheme: httpBasicPassTicket
        applid: TSTAPPL
```

**Note:** The fields in this example are explained later in this article.

## Adding YAML configuration to API services that register dynamically with API ML

As a developer of an API service that registers dynamically with the API ML, you need to provide additional metadata to tell the API Gateway to use PassTickets.
Additional metadata tells the API Gateway how to generate them. The following code shows an example of the YAML configuration that contains this metadata.

**Example:**

```yaml
authentication:
    scheme: httpBasicPassTicket
    applid: <applid>
```

where:

- `httpBasicPassTicket`

  is the value that indicates that the HTTP Basic authentication scheme is used with PassTickets.

- `<applid>`

  is the `APPLID` value that is used by the API service for PassTicket support (e.g. `OMVSAPPL`).
