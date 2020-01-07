# Enabling PassTicket creation for API Services that Accept PassTickets

<font color ="red"> **Note**: This is a draft documentation that needs to be migrated to <https:/github.com/zowe/docs-site> after the functionality is completed. </font>

As an API developer, you can use PassTickets for API services that are compatible to accept them to authenticate your service with the API Mediation Layer. 

## Overview

API clients can use a Zowe JWT token to access an API service even if the API service itself does not support the JWT token. The Zowe JWT token is available through the API Gateway [authentication endpoint](https://docs.zowe.org/stable/extend/extend-apiml/api-mediation-security.html#authentication-for-api-ml-services).


If the API client provides a valid Zowe JWT token, the API Gateway generates a valid PassTicket. The Gateway then uses the PassTicket to access the API service.
The user ID and password are provided in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).


- [Enabling PassTicket creation for API Services that Accept PassTickets](#enabling-passticket-creation-for-api-services-that-accept-passtickets)
  - [How to Enable PassTicket Support](#how-to-enable-passticket-support)
    - [Enable the Zowe started task user ID to generate PassTickets for the API service](#enable-the-zowe-started-task-user-id-to-generate-passtickets-for-the-api-service)
      - [ACF2](#acf2)
      - [RACF](#racf)
      - [TopSecret](#topsecret)
    - [API Services that Register Dynamically into API ML](#api-services-that-register-dynamically-into-api-ml)
    - [API Services that Register Dynamically into API ML but do not Provide Metadata](#api-services-that-register-dynamically-into-api-ml-but-do-not-provide-metadata)
    - [API Services that are Defined using Static YAML Definition](#api-services-that-are-defined-using-static-yaml-definition)
  - [What Developers Need to with API Services that Register Dynamically into API ML](#what-developers-need-to-with-api-services-that-register-dynamically-into-api-ml)


## Enabling PassTicket Support

The following steps outline the procedure for enabling PassTicket Support:

1. Follow the API service documentation that explains how to activate support for PassTickets.
2. Record the value of the APPLID of the API service.
3. Enable the Zowe started task user ID to generate PassTickets for the API service.
4. Enable PassTicket support in the API Gateway for your API service.


**Note:**
PassTickets must be enabled for every user who requires access to the API service.

### Generate PassTickets for the API service by enabling the Zowe started task user ID 

Use the following variables to generate PassTickets for the API service to enable the Zowe started task user ID: 

<font color ="red"> Can we add an example of how to use these variables from the command prompt? </font>

- `<applid>` is the APPLID value that is used by the API service for PassTicket support (e.g. `OMVSAPPL`)

- `<zowesrv>`is Zowe started task user ID permission


#### ACF2

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service. <font color ="red"> The following code is an example of ... </font>

**Example:**

```txt
ACF
SET RESOURCE(PTK)
RECKEY IRRPTAUTH ADD(<applid>.- UID(<zowesrv>) SERVICE(UPDATE,READ) ALLOW)
F ACF2,REBUILD(PTK),CLASS(P)
END
```

#### RACF

To enable PassTicket creation for API service users, define the profile `IRRPTAUTH.<applid>.*` in the `PTKTDATA` class and set the universal access authority to `NONE`.  

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service. <font color ="red"> Do we need to describe WHERE in the code you grant the Zowe started task user ID permission to generate PassTickets? </font>
 
**Example:**

```txt
RDEFINE PTKTDATA IRRPTAUTH.<applid>.* UACC(NONE)
PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowesrv>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```

#### TopSecret

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

<font color ="red"> Do we need to describe WHERE in the code you grant the Zowe started task user ID permission? </font>

**Example:**

```txt
TSS PERMIT(<zowesrv>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
TSS REFRESH
```

### API Services that Register Dynamically into API ML

API services that support Zowe API Mediation Layer and use dynamic registration to the Discovery Service already provide metadata that enables PassTicket support.

As the API user, you are not require to do anything in this case. All required information is provided by the API service automatically.

### API Services that Register Dynamically into API ML but do not Provide Metadata

Some services that can use PassTickets may be missing the corresponding metadata. For such service you can provide this metadata externally in the same files that contain the static YAML definitons.

Add following section to the YAML file with a static definition:

```yaml
additionalServiceMetadata:
    <serviceId>:
        authentication:
            scheme: httpBasicPassTicket
            applid: <applid>
```


where:

 * `<serviceId>` 
 
    is the service ID of the service to which you want to add metadata.

### API Services that are Defined using Static YAML Definition

Add the following metadata to the same level as the `serviceId`:

**Example:**

```yaml
    - serviceId: ...
      authentication:
        scheme: httpBasicPassTicket
        applid: TSTAPPL
```

**Note:** The fields in this example are explained later in this article.

## What Developers Need to with API Services that Register Dynamically into API ML

As the developer of this type of application, you need to provide additional metadata to tell the API Gateway that it needs to use PassTickets. Additional metadata tells the API Gateway how to generate them.

<font color ="red"> Do we need to describe WHERE in the code a dev needs to provide this metadata?</font>

```yaml
authentication:
    scheme: httpBasicPassTicket
    applid: <applid>
```

where:

* `httpBasicPassTicket` 

  is the value that means that HTTP Basic authentication scheme is used with PassTickets.

* `<applid>` 

  is the `APPLID` value that is used by the API service for PassTicket support (e.g. `OMVSAPPL`).

Additionally, there are other values of `authentication.scheme` that are also supported:

* `bypass` (default)

   API Gateway does not modify authentication headers for the API service. <font color ="red"> Is this the definition of `bypass`? If so, this need clarification. </font>

* `zoweJwt` 

  The Zowe JWT token is expected. The API Gateway does not modify but can process it. <font color ="red"> Is this the definition of `zoweJwt`? If so, this need clarification. </font>
