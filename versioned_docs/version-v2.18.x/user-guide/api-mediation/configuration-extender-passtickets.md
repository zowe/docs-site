# Enabling single sign on for extending services via PassTicket configuration

One option to enable single sign-on (SSO) to your extending REST API services is to configure Zowe API ML PassTickets. Passtickets are encoded and encrypted and are only valid for a few minutes after you generate them. PassTickets enable z/OS components and products to authenticate a user ID without storing or caching z/OS passwords or sending the passwords through the network. Follow the procedures described in this article to configure Zowe to use PassTickets, and to enable Zowe to use PassTickets to authenticate towards specific extending services.

:::info Required Role: security administrator
:::

## Overview of PassTickets 
API clients can use various supported methods to access an API service such as a Zowe JWT token or a client certificate even if the API service itself does not support the JWT token or a client certificate. An intermediary for support of JWT or a client certificate can be through the use of PassTickets.

When an API client provides a valid authentication method to API ML, the API Gateway generates a valid PassTicket for any API service that supports PassTickets. A PassTicket is a one-time only password that is generated for a specific user ID. 
The API Gateway uses the PassTicket to access that API service. The API Gateway provides the user ID and password in the Authorization header which serves as basic authentication in HTTP requests using the
[Basic authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

## Configuring Zowe to use PassTickets

Configuring Zowe to use PassTickets involves two processes:

- Enabling the use of PassTickets in your External Security Manager (ESM)
- Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service

### Enabling the use of PassTickets in your External Security Manager (ESM)

:::note

Since the Zowe 2.17 release, it is no longer necessary to disable replay protection. If you are upgrading Zowe from a prior release, these protections can be activated again. For earlier Zowe versions, ensure that the API service has replay protection switched off. This links a secured sign-on application key with the application.
:::

This section applies to users who do not already have PassTickets enabled in the system, or users who need to define a PassTicket for a new APPLID. If you already have an APPLID that you intend to use to define your API service, skip to the section [Configuring security to allow the Zowe API Gateway to generate PassTickets for an API service](#configuring-security-to-allow-zowe-api-gateway-to-generate-passtickets-for-an-api-service).

:::tip
To validate if a PassTicket is already defined, list the APPL and PKTDATA with a command corresponding to your ESM. Output indicates if a PassTicket is already defined. No results after issuing an ESM command indicates that a PassTicket is not defined. If a PassTicket is defined, the access of the zoweuser can be determined.

- **Validating an existing PassTicket for ACF2**

    <details>

    <summary>Click here for command details about validating an existing PassTicket for ACF2.</summary>

    In your ESM command line interface or other security environment, execute the following commands:

    ```acf2
        SET RESOURCE(SAF)
        LIST LIKE(-)

        SET RESOURCE(SAF)
        LIST LIKE(<applid>-)

        SET PROFILE(PTKTDATA) DIVISION(SSIGNON)
        LIST LIKE(<applid>-)

        SET RESOURCE(PTK)
        LIST LIKE(IRRPTAUTH-)
    ```

    - **`-`**  
        A wildcard symbol that lists all resources

    - **`<applid>-`**  
        Lists everything related to specified applid in a resource (in this case, SAF), or specified in a profile (in this case, PTKTDATA)

    </details>

- **Validating an existing PassTicket for Top Secret**

    <details>

    <summary>Click here for command details about validating an existing PassTicket for Top Secret.</summary>

    In your ESM command line interface or other security environment, execute the following commands:

    ```tss
        TSS WHOHAS APPL(<applid>)
        TSS WHOHAS PTKTDATA(<applid>)
        TSS WHOHAS PTKTDATA(IRRPTAUTH.<applid>.)
    ```

    - **`.`**  
        A wildcard symbol that lists all resources

    - **`IRRPTAUTH.<applid>.`**  
        Returns everything about the specified applid for IRRPTAUTH

    </details>

- **Validating an existing PassTicket for RACF**

    <details>

    <summary>Click here for command details about validating an existing PassTicket for RACF.</summary>

    In your ESM command line interface or other security environment, execute the following commands:

    ```racf
        RLIST APPL * ALL 
        RLIST APPL <applid> ALL  
        RLIST PTKTDATA <applid> SSIGNON ALL
        RLIST PTKTDATA IRRPTAUTH.<applid>.* ALL
    ```

    Ensure that you validate PKTDATA access for APPL.

    - **`*`**  
        A wildcard symbol that resturns all resources

    - **`RLIST PTKTDATA <applid> SSIGNON ALL`**  
        Validates all applid for PTKDATA class

    - **`RLIST PTKTDATA IRRPTAUTH.<applid>.* ALL`**  
        Validates all applid permissions for PTKDATA class

    </details>

:::

Follow these steps to enable PassTicket Support specific to your ESM. 

#### Enabling PassTickets with ACF2

<details>

<summary> Click here for command details about configuring Zowe to use PassTickets using ACF2. </summary>

1. In your ESM command line interface or other security environment, define the application session key by entering the following commands, if the session key is not already defined.

    ```acf2
        SET PROFILE(PTKTDATA) DIV(SSIGNON)
        INSERT <applid> SSKEY(<key-description>)
        F ACF2,REBUILD(PTK),CLASS(P)
    ```

* **`applid`**  
Specifies the application ID used for PassTicket validation to authenticate connections to the server.

* **`key-description`**  
 Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

2. Complete the PassTicket setup by entering the following commands:

    ```acf2
        F ACF2,REBUILD(PTK),CLASS(P)
    ```

    The PassTicket record is now active in the system.

3. Enable the started task user ID to generate PassTickets for the application by entering commands similar to the following:

    ```
    SET RESOURCE(PTK) 
    RECKEY IRRPTAUTH ADD(applid.userid UID(<userid>) SERVICE(UPDATE,READ) ALLOW)
    ```
  
* **`userid`**    
Specifies the Zowe server user ID

You configured Zowe to use PassTickets for single sign on using ACF2.

</details>

#### Enabling PassTickets with Top Secret

<details>

<summary> Click here for command details about configuring Zowe to use PassTickets using Top Secret.</summary>


Before you begin this procedure, verify that the `PTKTDATA` class and ownership for the PassTicket resource (`IRRPTAUT`) have not already been defined as described in the previous tip.

1. Update the resource descriptor table (RDT) to define the `PTKTDATA` class by entering the following commands:

    :::note
    The `PTKTDATA` resource is not a predefined class.
    :::

    ```
    TSS ADDTO(RDT) RESCLASS(PTKTDATA) RESCODE(n) ACLST(ALL,READ,UPDATE) MAXLEN(37) 
    ```
    The `PTKTDATA` resource is added to the RDT.
  
    :::note
    Include `RESCODE(n)` in the range of 101 to 13F to make `PTKTDATA` a prefixed resource class.
    :::
  
2.	Assign ownership for the PassTicket resource (`IRRPTAUT`). Execute the following commands: 
    ```
    TSS ADDTO(department) PTKTDATA(IRRPTAUT) 
    ```
  
3. Define PassTicket for application ID _applid_:
  
    ```tss
    TSS ADDTO(NDT) PSTKAPPL(<applid>) SESSKEY(<key-description>)
    ```

- **`applid`**  
Specifies the application ID used for PassTicket validation to authenticate connections to the server.

- **`key-description`**  
Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

4. Permit access to the PassTicket resource defined in the previous step for the LDAP Server by executing the following command:

    ```tss
    TSS PERMIT(<stc-userid>) PTKTDATA(IRRPTAUTH.applid) ACCESS(UPDATE)
    ```
  
* **`stc-userid`**  
Specifies the Accessor ID (ACID) that you created when you created LDAP Server started task User IDs.

**Default:** CALDAP	

You configured Zowe to use PassTickets using Top Secret.

</details>

#### Enabling PassTickets with RACF

<details>

<summary> Click here for command details about configuring Zowe to use PassTickets using RACF.</summary>

1. Activate the `PTKTDATA` class, which encompasses all profiles containing PassTicket information.

    In your ESM command line interface or other security environment, execute the following command:

    ```racf
        SETROPTS CLASSACT(PTKTDATA) RACLIST(PTKTDATA)
    ```

2. Specify the application ID requiring access through PassTicket for the Zowe server with the following commands:

    ```
    RDEFINE APPL <applid> UACC(READ)
    SETROPTS CLASSACT(APPL)
    SETROPTS GENERIC(PTKTDATA)
    ```

* **`applid`**  
Specifies the application ID used for PassTicket validation to authenticate connections to the server.  (One to 8 characters) 

    :::note
    This name is usually provided by the site security administrator.
    :::

3. Define the profile for the application with the following command:

    ```
    RDEFINE PTKTDATA  <applid> UACC(NONE) APPLDATA('NO REPLAY PROTECTION') SSIGNON(KEYMASKED(<key-description>) APPLDATA('NO REPLAY PROTECTION')
    ```
* **`key-description`**  
  Specifies the secured sign-on hexadecimal application key of 16 hexadecimal digits (8-byte or 64-bit key). Each application key must be the same on all systems in the configuration and the values must be kept secret and secured.

4. Replace `key-description` with the application name defined previously.

5. Allow the application ID (_applid_) to use PassTickets:

    ```racf
    PERMIT IRRPTAUTH.applid.* CLASS(PTKTDATA) ACCESS(UPDATE) ID(userid)
    ```

* **`userid`**  
Specifies the value of the LDAP Server started task.

6. Refresh the RACF PTKTDATA definition with the new profile:
    ```
    SETROPTS RACLIST(PTKTDATA) REFRESH
    ```

You configured Zowe to use PassTickets using RACF.

</details>

### Configuring security to allow Zowe API Gateway to generate PassTickets for an API service

As a security administrator, you can issue security commands to allow the Zowe started task user ID to generate PassTickets for the API service.

Specify the following variables when generating PassTickets for the API service to enable the Zowe started task user ID:

* **`applid`**  
The APPLID value used by the API service for PassTicket support (for example, `OMVSAPPL`)

* **`zowe-user-id`**   

The Zowe started task user ID used during the Zowe installation

In the following examples of ESM configuration, replace these variables with actual values.

Use the configuration format that corresponds to your ESM as presented in the following examples.

#### Generating PassTickets using ACF2

<details>

<summary> Click here for command details about generating PassTickets using ACF2. </summary>

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```acf
    ACF
    SET RESOURCE(PTK)
    RECKEY IRRPTAUTH ADD(<applid>.- UID(<zowe-user-id>) SERVICE(UPDATE,READ) ALLOW)
    F ACF2,REBUILD(PTK),CLASS(P)
    END
```

</details>

#### Generating PassTickets using Top Secret

<details>

<summary>Click here for command details about generating PassTickets using Top Secret.</summary>

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```tss
    TSS PERMIT(<zowe-user-id>) PTKTDATA(IRRPTAUTH.<applid>.) ACCESS(READ,UPDATE)
    TSS REFRESH
```

</details>

#### Generating PassTickets using RACF

<details>

<summary> Click here for command details about generating PassTickets using RACF.</summary>

Grant the Zowe started task user ID permission to generate PassTickets for users of the API service.

**Example:**

```racf
    PERMIT IRRPTAUTH.<applid>.* CL(PTKTDATA) ID(<zowe-user-id>) ACCESS(UPDATE)
    SETROPTS RACLIST(PTKTDATA) REFRESH
```

</details>

### Verifying your PassTicket Application

In your ESM command line interface or other security environment, execute the following commands:

```racf
    RLIST APPL <applid> ALL
    RLIST PTKTDATA IRRPTAUTH.<applid>.* ALL
```

* **`applid`**  
Specifies the application ID used for PassTicket validation to authenticate connections to the server

Successful execution of this validation command shows your application and the specific access of the application.

**Output example:**
```
 CLASS      NAME
 -----      ----
 PTKTDATA   IRRPTAUTH.ZWEADMIN.* (G)

 USER      ACCESS
 ----      ------
 ZWESVUSR  UPDATE
 ```

## (Optional) Adding custom HTTP Auth headers to store user ID and PassTicket 

If a downstream (southbound) service needs to consume the PassTicket as well as the user ID from custom headers to participate in the Zowe SSO, you can define the custom HTTP headers names as part of the Gateway configuration.
The southbound service must use the `httpBasicPassTicket` scheme in order to leverage this functionality. Once the HTTP headers names are defined, each request to the southbound service contains the PassTicket and the user ID in the custom headers.

Use the following procedure to add the custom HTTP headers.

1. Open the file `zowe.yaml`.
2. Find or add the property `components.gateway.apiml.security.auth.passticket.customAuthHeader` and set the value which represents the name of the header.
3. Find or add the property `components.gateway.apiml.security.auth.passticket.customUserHeader` and set the value which represents the name of the header.
4. Restart Zowe.

Requests through the Gateway towards the southbound service now contain the custom HTTP headers with the PassTicket and the user ID.
