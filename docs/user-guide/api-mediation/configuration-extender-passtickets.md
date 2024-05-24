# Enabling single sign on for extending services via PassTicket configuration

As a system programmer, you can configure Zowe to use PassTickets for API services that are compatible to accept them to authenticate your service with the API Mediation Layer. Follow the procedures described in this article to configure Zowe to use PassTickets, and to enable Zowe to use PassTickets to authenticate towards specific extending services.

:::info Roles: system programmer, security administrator
:::

- [Overview of how PassTickets are used](#overview-of-how-passtickets-are-used)
- [Configuring Zowe to use PassTickets](#configuring-zowe-to-use-passtickets)
    - [Enabling PassTicket support](#enabling-passticket-support)
        - [PassTicket enablement with ACF2](#passticket-enablement-with-acf2)
        - [PassTicket enablement with Top Secret](#passticket-enablement-with-top-secret)
        - [PassTicket enablement with RACF](#passticket-enablement-with-racf)
    - [Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service](#configuring-security-to-allow-zowe-api-gateway-to-generate-passtickets-for-an-api-service)
        - [Generating PassTickets using ACF2](#generating-passtickets-using-acf2)
        - [Generating PassTickets using Top Secret](#generating-passtickets-using-top-secret)
        - [Generating PassTickets using RACF](#generating-passtickets-using-racf)
- [Adding custom HTTP Auth headers to store user ID and PassTicket](#adding-custom-http-auth-headers-to-store-user-id-and-passticket)
## Overview of how PassTickets are used

API clients can use various supported methods such as Zowe JWT token or client certificate to access an API service even if the API service itself does not support the JWT token or client certificate.

When an API client provides a valid authentication method to the API ML, the API Gateway then generates a valid PassTicket for any API service that supports PassTickets.
The API Gateway then uses the PassTicket to access that API service.
The API Gateway provides the user ID and password in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

## Configuring Zowe to use PassTickets

### Enabling PassTicket support

The following steps outline the procedure for enabling PassTicket Support for your ESM:



#### PassTicket enablement with ACF2

1. Define PassTicket for application ID _applid_ without replay protection.
```
SET PROFILE(PTKTDATA) DIVISION(SSIGNON)
INSERT <applid> SSKEY(<key-description>) MULT-USE
F ACF2,REBUILD(PTK),CLASS(P)
```
2. Add Zowe user to the defined application ID.
```
SET RESOURCE(APL)
RECKEY <applid> ADD(UID(<zowe-user-id>) ALLOW)
F ACF2,REBUILD(APL)
```

#### PassTicket enablement with Top Secret

Define PassTicket for application ID _applid_ without replay protection.

```
TSS ADDTO(NDT) PSTKAPPL(<applid>) SESSKEY(<key-description>) SIGNMULTI
```

#### PassTicket enablement with RACF

1. Activate the `PTKTDATA` class, which encompasses all profiles containing PassTicket information. Execute the following command:
```
SETROPTS CLASSACT(PTKTDATA) RACLIST(PTKTDATA)
```

2. Specify the application ID requiring access through PassTicket for the UMS server with the following commands:
```
RDEFINE APPL <applid> UACC(READ)
SETROPTS CLASSACT(APPL)
SETROPTS GENERIC(PTKTDATA)
```

Replace _applid_ with a one to 8 character name designated for the application. 

:::note Notes
* This name is usually provided by the site security administrator.
* For information about Unified Management Server for z/OS, see [Security of UMS for z/OS](https://www.ibm.com/docs/en/umsfz/1.2.0?topic=120-security-ums-zos) in the IBM documentation.

:::

3. Define the profile for the application with the following command:
```
RDEFINE PTKTDATA <applid> SSIGNON(KEYMASKED(<key-description>))
```
* **key-description**  
 Specifies the secured signon hexadecimal application key


:::caution Important

PassTickets for the API service must have the replay protection switched off. 
:::
```
APPLDATA('NO REPLAY PROTECTION')
```
This links a secured sign-on application key with the application.
Replace with the application name defined previously.

4. Grant a ZOWE user ID access to the application with the following command:
```
PERMIT APPLNAME CLASS(APPL) ID(<zowe-user-id>) ACCESS(READ)
```
Add the permitted user ID, in this case Zowe server user.


### Configuring security to allow Zowe API Gateway to generate PassTickets for an API service

Consult with your security administrator to issue security commands to allow the Zowe started task user ID to generate PassTickets for the API service.

Use the following variables to generate PassTickets for the API service to enable the Zowe started task user ID:

- **`<applid>`**  
The APPLID value used by the API service for PassTicket support (e.g. `OMVSAPPL`)

- **`<zowesrv>`**  
The Zowe started task user ID used during the Zowe installation

In the following examples of ESM configuration, replace these variables with actual values.

Use the configuration format that corresponds to your ESM as presented in the following examples.

#### Generating PassTickets using ACF2

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

#### Generating PassTickets using Top Secret

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**

```markup
TSS PERMIT(<zowesrv>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
TSS REFRESH
```

#### Generating PassTickets using RACF

To enable PassTicket creation for API service users, define the profile `IRRPTAUTH.<applid>.*` in the `PTKTDATA` class and set the universal access authority to `NONE`.

Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**

```markup
RDEFINE PTKTDATA IRRPTAUTH.<applid>.* UACC(NONE)
PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowesrv>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```

## Adding custom HTTP Auth headers to store user ID and PassTicket

If a southbound service needs to consume the PassTicket and the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the PassTicket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the header's name.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the header's name.
4. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the PassTicket and the user ID.