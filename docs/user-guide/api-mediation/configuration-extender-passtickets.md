# Enabling single sign on for extending services via PassTicket configuration

As a system programmer, follow the procedures described in this article to configure Zowe to use PassTickets, and to enable Zowe to use PassTickets to authenticate towards specific extending services.

:::info Roles: system programmer, security administrator
:::

## Configuring Zowe to use PassTickets

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

  **Note:** PassTickets for the API service must have the replay protection switched off. 
  
  **Example:** `APPLDATA('NO REPLAY PROTECTION')

  The PassTickets are exchanged between Zowe API Gateway and the API service in a secure mainframe environment.

2. Record the value of the APPLID of the API service.
3. Enable the Zowe started task user ID to generate PassTickets for the API service. Grant `UPDATE` access to the Zowe started task by submitting commands in one of the three ESMs: ACF2, Top Secret, or RACF.
4. Enable PassTicket support in the API Gateway for your API service.

:::note
PassTickets must be enabled for every user who requires access to the API service.
:::

### Security configuration that allows the Zowe API Gateway to generate PassTickets for an API service

Consult with your security administrator to issue security commands to allow the Zowe started task user ID to generate PassTickets for the API service.

Use the following variables to generate PassTickets for the API service to enable the Zowe started task user ID:

- **`<applid>`**  
The APPLID value used by the API service for PassTicket support (e.g. `OMVSAPPL`)

- **`<zowesrv>`**  
The Zowe started task user ID used during the Zowe installation

In the following examples of ESM configuration, replace these variables with actual values.

Use the the configuration format in the following examples that corresponds to your ESM.

### Use your ESM to enable Zowe to use PassTickets

Choose from the following methods to use PassTickets based on the ESM that you are using:
* Enabling Zowe to use PassTickets with ACF2
* Enabling Zowe to use PassTickets with Top Secret (TSS)
* Enabling Zowe to use PassTickets with RACF

#### Enabling Zowe to use PassTickets with ACF2

Follow these steps to configure Zowe to use PassTickets using ACF2. Note that this procedure should be performed by your security administrator.

<details>
<summary> Click here for details how to enable Zowe to use PassTickets with ACF2</summary>  

1.	Define the application session key by entering the following commands, if it has not already been set up:
```
SET PROFILE(PTKTDATA) DIV(SSIGNON)
INSERT applid SSKEY(0123456789ABCDEF) MULT-USE
F ACF2,REBUILD(PTK),CLASS(P)
```

* **MULT-USE**  
This setting lets you reuse the same PassTicket multiple times.

* **SSKEY**  
This setting defines an encryption key for the application in the format of 16 random hexadecimal digits that are different from the values shown in the example.

:::note
This example demonstrates a complete key SESSKEY value of 16 hexadecimal digits (creating an 8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.
:::

2.	Permit the Zowe started task user ID to generate and evaluate PassTickets on behalf of Zowe users:
```
SET RESOURCE(PTK)
RECKEY IRRPTAUTH ADD(applid.- UID(uid-of-zowe_stc_userid) 
SERVICE(UPDATE,READ) ALLOW)
F ACF2,REBUILD(PTK)
```

3.	Allow individual users to access Zowe:
```
SET RESOURCE(SAF)
RECKEY applid ADD(UID(uid-csm_userid) SERVICE(READ) ALLOW)
F ACF2,REBUILD(SAF)
```

PassTickets are configured on the Zowe server side.


Grant the Zowe started task user ID permission to generate PassTickets for users of that API service. The following code is an example of security commands that need to be issued.

**Example:**
```
ACF
SET RESOURCE(PTK)
RECKEY IRRPTAUTH ADD(<applid>.- UID(<zowesrv>) SERVICE(UPDATE,READ) ALLOW)
F ACF2,REBUILD(PTK),CLASS(P)
END
```
</details>


#### Enabling Zowe to use PassTickets with Top Secret (TSS)

Follow these steps to configure Zowe to use PassTickets using Top Secret. Note that this procedure should be performed by your security administrator.

<details>
<summary> Click here for details how to enable Zowe to use PassTickets with Top Secret.</summary>

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
IRRPTAUT is owned.
3.	Define the application session key by entering the following commands:
```
TSS ADDTO(NDT) PSTKAPPL(applid) SESSKEY(0123456789ABCDEF) SIGNMULTI 
```
This example demonstrates a complete key `SESSKEY` value of 16 hexadecimal digits (creating an 8-byte or 64-bit key). Use the same application key on all systems in the configuration and keep these values secured.

4.	Permit access to the PassTicket resource defined in the previous step for the Zowe Server. Execute the following command:
```
TSS PERMIT(stc-userid) PTKTDATA(IRRPTAUTH.applid) ACCESS(UPDATE)
```
The parameter stc-userid refers to the ACID that you created when you created 
zowe Server  started task User IDs. The parameter is `ZWESVUSR` by default.

5. Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**
```
TSS PERMIT(<zowesrv>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
TSS REFRESH
```
</details>


#### Enabling Zowe to use PassTickets with RACF

Follow these steps to configure Zowe to use PassTickets using RACF. Note that this procedure should be performed by your security administrator.

<details>
<summary> Click here for details how to enable Zowe to use PassTickets with RACF.</summary>

If the `PTKTDATA` class is defined, verify that it is defined as a generic class before creating the profiles. 
 
1. Define `APPLID SYSVAPPL` that can be used:
```
 RDEFINE APPL applid UACC(NONE)
 PERMIT applid  CL(APPL) ACCESS(READ) ID(userid)
 SETROPTS RACLIST(APPL) REFRESH
 ```
2. Activate the PassTicket class by entering the following commands:
```
SETROPTS CLASSACT(PTKTDATA)
SETROPTS RACLIST(PTKTDATA)
```
3. Define profiles for the applications in the `PTKTDATA` class for the application and specify the session key:
```
RDEFINE PTKTDATA applid UACC(NONE) APPLDATA('NO REPLAY PROTECTION') -
SSIGNON(KEYMASKED(0123456789ABCDEF)
```
After you create the `PTKTDATA` class, you can change it with the `RALTER` command which is similar in syntax to `RDEFINE`.

4.	Allow the application ID (applid) to use PassTickets:
```
PERMIT IRRPTAUTH.applid.* CLASS(PTKTDATA) ACCESS(UPDATE) ID(userid)
```

* **userid**
Specifies the value of the  ZOWE Server  started task.

5.	Refresh the RACF PTKTDATA definition with the new profile:
```
SETROPTS RACLIST(PTKTDATA) REFRESH
```

To enable PassTicket creation for API service users, define the profile `IRRPTAUTH.<applid>.*` in the `PTKTDATA` class and set the universal access authority to **NONE**.
Grant the Zowe started task user ID permission to generate PassTickets for users of that API service.

**Example:**
```
RDEFINE PTKTDATA IRRPTAUTH.<applid>.* UACC(NONE)
PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowesrv>) ACCESS(UPDATE)
SETROPTS RACLIST(PTKTDATA) REFRESH
```
</details>

# Adding custom HTTP Auth headers to store user ID and PassTicket

If a southbound service needs to consume the PassTicket and the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the PassTicket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the header's name.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the header's name.
4. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the PassTicket and the user ID.