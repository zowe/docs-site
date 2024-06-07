# Enabling single sign on for extending services via PassTicket configuration

Single sign on can be enabled by configuring Zowe to use PassTickets for API services to authenticate with API Mediation Layer. Follow the procedures described in this article to configure Zowe to use PassTickets, and to enable Zowe to use PassTickets to authenticate towards specific extending services.

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

API clients can use various supported methods such as a Zowe JWT token or client certificate to access an API service even if the API service itself does not support the JWT token or client certificate.

When an API client provides a valid authentication method to the API ML, the API Gateway generates a valid PassTicket for any API service that supports PassTickets.
The API Gateway then uses the PassTicket to access that API service.
The API Gateway provides the user ID and password in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

## Configuring Zowe to use PassTickets

Configuring Zowe to use PassTickets involves two processes:
* Enable PassTicket in the operating system
* Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service

### Enable PassTicket in the operating system

This section is dedicated to the users who don't have PassTickets enabled in the system or those who need to define a PassTciket for a new APPLID. In case you need to use existing one, skip to the next section [Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service](#configuring-security-to-allow-zowe-api-gateway-to-generate-passtickets-for-an-api-service).
The following steps outline the procedure for enabling PassTicket Support for your ESM:

#### PassTicket enablement with ACF2
Follow these steps to configure Zowe to use PassTickets using ACF2. Note that this procedure should be performed by your security administrator.

1.	Define the application session key by entering the following commands, if it has not already been set up:
```
SET PROFILE(PTKTDATA) DIV(SSIGNON)
INSERT <applid> SSKEY(<key-description>) MULT-USE
F ACF2,REBUILD(PTK),CLASS(P)
```

* **MULT-USE**  
This setting lets you reuse the same PassTicket multiple times.

* **key-description**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

#### PassTicket enablement with Top Secret

Follow these steps to configure Zowe to use PassTickets using Top Secret. Note that this procedure should be performed by your security administrator.

Before you begin this procedure, verify that the `PTKTDATA` class and ownership for the PassTicket resource (`IRRPTAUT`) have not already been defined.

1.	Update the resource descriptor table (RDT) to define the `PTKTDATA` class by entering the following commands:

If PTKTDATA is not a predefined class:
```
TSS ADDTO(RDT) RESCLASS(PTKTDATA) RESCODE(n) ACLST(ALL,READ,UPDATE) MAXLEN(37) 
```
The PTKTDATA resource is added to the RDT.

:::note
Include `RESCODE(n)` in the range of 101 to 13F to make `PTKTDATA` a prefixed resource class.
:::

2.	Assign ownership for the PassTicket resource (`IRRPTAUT`) by entering the following commands:
```
TSS ADDTO(department) PTKTDATA(IRRPTAUT) 
```
Define PassTicket for application ID _applid_ without replay protection.

```
TSS ADDTO(NDT) PSTKAPPL(<applid>) SESSKEY(<key-description>) SIGNMULTI
```

* **key-description**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

#### PassTicket enablement with RACF

1. Activate the `PTKTDATA` class, which encompasses all profiles containing PassTicket information. Execute the following command:
```
SETROPTS CLASSACT(PTKTDATA) RACLIST(PTKTDATA)
```

2. Specify the application ID requiring access through PassTicket for the ZOWE server with the following commands:
```
RDEFINE APPL <applid> UACC(READ)
SETROPTS CLASSACT(APPL)
SETROPTS GENERIC(PTKTDATA)
```

Replace _applid_ with a one to 8 character name designated for the application. 

:::note 
* This name is usually provided by the site security administrator.
:::

3. Define the profile for the application with the following command:
```
RDEFINE PTKTDATA  <applid> UACC(NONE) APPLDATA('NO REPLAY PROTECTION') SSIGNON(KEYMASKED(<key-description>)
```
* **key-description**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

Replace with the application name defined previously.

:::caution Important

PassTickets for the API service must have the replay protection switched off. 

```
APPLDATA('NO REPLAY PROTECTION')
```
This links a secured sign-on application key with the application.
:::


### Configuring security to allow Zowe API Gateway to generate PassTickets for an API service

Consult with your security administrator to issue security commands to allow the Zowe started task user ID to generate PassTickets for the API service.

Use the following variables to generate PassTickets for the API service to enable the Zowe started task user ID:

- **`<applid>`**  
The APPLID value used by the API service for PassTicket support (e.g. `OMVSAPPL`)

- **`<zowe-user-id>`**  
The Zowe started task user ID used during the Zowe installation

In the following examples of ESM configuration, replace these variables with actual values.

Use the configuration format that corresponds to your ESM as presented in the following examples.

#### Generating PassTickets using ACF2

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```markup
ACF
SET RESOURCE(PTK)
RECKEY IRRPTAUTH ADD(<applid>.- UID(<zowe-user-id>) SERVICE(UPDATE,READ) ALLOW)
F ACF2,REBUILD(PTK),CLASS(P)
END
```

#### Generating PassTickets using Top Secret

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```markup
TSS PERMIT(<zowe-user-id>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
TSS REFRESH
```

#### Generating PassTickets using RACF

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```markup
PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowe-user-id>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```

### Validate if the PassTicket Application is created

```
RLIST APPL APPLNAME ALL
RLIST PTKTDATA IRRPTAUTH.APPLNAME.* ALL
```
Your application and the specific access of the application will be displayed


## Adding custom HTTP Auth headers to store user ID and PassTicket

If a southbound service needs to consume the PassTicket and the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the PassTicket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the header's name.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the header's name.
4. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the PassTicket and the user ID.