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

When an API client provides a valid authentication method to API ML, the API Gateway generates a valid PassTicket for any API service that supports PassTickets. A PassTicket is a one-time only password that is generated for a specific user ID. 
The API Gateway uses the PassTicket to access that API service.
The API Gateway provides the user ID and password in the Authorization header of the HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme). 

## Configuring Zowe to use PassTickets

Configuring Zowe to use PassTickets involves two processes:
* Enabling the use of PassTickets in the operating system
* Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service

### Enabling the use of PassTickets in the operating system

This section applies to users who do not have PassTickets enabled in the system or those who need to define a PassTicket for a new APPLID. If you already have an APPLID that you will use to ... , skip to the section [Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service](#configuring-security-to-allow-zowe-api-gateway-to-generate-passtickets-for-an-api-service).

:::tip
To validate if a PassTicket is already defined, use the commands that correspond to your ESM. If the PassTicket is defined, the access of the zoweuser can be determined.

<details>
<summary>**For ACF2**</summary>

```
SET RESOURCE(SAF)
LIST LIKE(-)

SET RESOURCE(SAF)
LIST LIKE(<_applid_>-)

SET PROFILE(PTKTDATA) DIVISION(SSIGNON)
LIST LIKE(<_applid_>-)

SET RESOURCE(PTK)
LIST LIKE(IRRPTAUTH-)
```

</details>

<details>
<summary>**For Top Secret**</summary>

```
TSS WHOHAS APPL(<_applid_>)
TSS WHOHAS PTKTDATA(<_applid_>)
TSS WHOHAS PTKTDATA(IRRPTAUTH.<_applid_>.)
```

</details>

<details>
<summary>**For RACF**</summary>

```
RLIST APPL * ALL -validate all APPL
RLIST APPL <_applid_> ALL  - validate particular APPL
RLIST PTKTDATA <_applid_> SSIGNON ALL
RLIST PTKTDATA IRRPTAUTH.<_applid_>.* ALL 
```
Ensure that you validate PKTDATA access for appl.

</details>

:::

The following steps outline the procedure for enabling PassTicket Support for your ESM:

#### PassTicket enablement with ACF2
<details>
<summary> Click here for steps to configure Zowe to use PassTickets using ACF2. Note that this procedure should be performed by your security administrator. </summary>


1.	Define the application session key by entering the following commands, if the session key is not already defined. 

```
SET PROFILE(PTKTDATA) DIV(SSIGNON)
INSERT <applid> SSKEY(<_key-description_>) MULT-USE
F ACF2,REBUILD(PTK),CLASS(P)
```

* **applid**  
Specifies the application ID used for PassTicket validation to authenticate connections to the server.

* **MULT-USE**  
This setting lets you reuse the same PassTicket multiple times.

* **key-description**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

2. Complete the PassTicket setup by entering the following commands:
```
F ACF2,REBUILD(PTK),CLASS(P)
```
The PassTicket record is now active in the system.

3. Enable the started task user ID to generate PassTickets for the application by entering commands similar to the following:
```
SET RESOURCE(PTK) 
RECKEY IRRPTAUTH ADD(applid.userid UID(<_uid-of-userid_>) SERVICE(UPDATE,READ) ALLOW)
```

</details>

#### PassTicket enablement with Top Secret

<details>
<summary> Click here for steps to configure Zowe to use PassTickets using Top Secret. Note that this procedure should be performed by your security administrator. </summary>

Before you begin this procedure, verify that the `PTKTDATA` class and ownership for the PassTicket resource (`IRRPTAUT`) have not already been defined.

1.	Update the resource descriptor table (RDT) to define the `PTKTDATA` class by entering the following commands:

:::note
The PTKTDATA resource is not a predefined class.
:::
```
TSS ADDTO(RDT) RESCLASS(PTKTDATA) RESCODE(n) ACLST(ALL,READ,UPDATE) MAXLEN(37) 
```
The PTKTDATA resource is added to the RDT.

:::note
Include `RESCODE(n)` in the range of 101 to 13F to make `PTKTDATA` a prefixed resource class.
:::

2.	Assign ownership for the PassTicket resource (`IRRPTAUT`). Execute the following commands: 
```
TSS ADDTO(department) PTKTDATA(IRRPTAUT) 
```
3. Define PassTicket for application ID _applid_ without replay protection.

```
TSS ADDTO(NDT) PSTKAPPL(<_applid_>) SESSKEY(<_key-description_>) SIGNMULTI
```

* **key-description**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

4. Permit access to the PassTicket resource defined in the previous step for the LDAP Server by executing the following command:
```
TSS PERMIT(<_stc-userid_>) PTKTDATA(IRRPTAUTH.applid) ACCESS(UPDATE)
```

* **stc-userid**  
Specifies the ACID that you created when you created LDAP Server started task User IDs. The parameter is "CALDAP" by default.	
	

</details>

#### PassTicket enablement with RACF


<details>
<summary> Click here for steps to configure Zowe to use PassTickets using RACF. Note that this procedure should be performed by your security administrator. </summary>

1. Activate the `PTKTDATA` class, which encompasses all profiles containing PassTicket information.  
Execute the following command:

```
SETROPTS CLASSACT(PTKTDATA) RACLIST(PTKTDATA)
```

2. Specify the application ID requiring access through PassTicket for the ZOWE server with the following commands:
```
RDEFINE APPL <_applid_> UACC(READ)
SETROPTS CLASSACT(APPL)
SETROPTS GENERIC(PTKTDATA)
```

Replace _applid_ with a one to 8 character name designated for the application. 

:::note 
This name is usually provided by the site security administrator.
:::

3. Define the profile for the application with the following command:
```
RDEFINE PTKTDATA  <_applid_> UACC(NONE) APPLDATA('NO REPLAY PROTECTION') SSIGNON(KEYMASKED(<_key-description_>) APPLDATA('NO REPLAY PROTECTION')
```
* **key-description**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

Replace with the application name defined previously.

:::caution Important
PassTickets for the API service must have the replay protection switched off. This links a secured sign-on application key with the application.
:::

4. Allow the application ID (applid) to use PassTickets:

```
PERMIT IRRPTAUTH.applid.* CLASS(PTKTDATA) ACCESS(UPDATE) ID(userid)
```

* **userid**  
Specifies the value of the LDAP Server started task.

5. Refresh the RACF PTKTDATA definition with the new profile:
```
SETROPTS RACLIST(PTKTDATA) REFRESH
```

</details>

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

<details>

<summary> Click here for details about generating PassTickets using ACF2. </summary>

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```markup
ACF
SET RESOURCE(PTK)
RECKEY IRRPTAUTH ADD(<_applid_>.- UID(<_zowe-user-id_>) SERVICE(UPDATE,READ) ALLOW)
F ACF2,REBUILD(PTK),CLASS(P)
END
```
</details>

#### Generating PassTickets using Top Secret

<details>

<summary>Click here for details about generating PassTickets using Top Secret.</summary>

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```markup
TSS PERMIT(<_zowe-user-id_>) PTKTDATA(IRRPTAUTH.<_applid_>.) ACCESS(READ,UPDATE)
TSS REFRESH
```
</details>

#### Generating PassTickets using RACF

<details>

<summary> Click here for details about generating PassTickets using RACF.</summary>

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```markup
PERMIT IRRPTAUTH.<_applid_>.* CL(PTKTDATA) ID(<_zowe-user-id_>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```
</details>

### Validate if the PassTicket Application is created

```
RLIST APPL <_applid_> ALL
RLIST PTKTDATA IRRPTAUTH.<_applid_>.* ALL
```
Your application and the specific access of the application will be displayed.


## Adding custom HTTP Auth headers to store user ID and PassTicket

If a downstream (southbound) service needs to consume the PassTicket and the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the PassTicket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the header's name.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the header's name.
4. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the PassTicket and the user ID.