# Configuring PassTickets for z/OSMF Authentication

Starting in Zowe v3.4.0, System Authorization Facility (SAF) is the default authentication provider (`apiml.security.auth.provider=saf`). Under this framework, API Mediation Layer (API ML) automatically communicates with z/OSMF using a static routing definition defined with the `httpBasicPassticket` authentication scheme.

:::info Required role: Security Administrator
:::

Use of SAF as the authentication provider requires that PassTicket generation permissions are configured for the z/OSMF application ID (APPLID) if your deployment routes traffic to z/OSMF via the API Gateway. Without this configuration, the API Gateway cannot securely validate requests against z/OSMF, causing core subsystem API requests to fail.

:::info
This configuration grants the Zowe started task permissions to generate PassTickets specifically for the z/OSMF APPLID (`IZUDFLT`). It does not require generating a new application session key (`SSKEY`), establishing an application profile, or adjusting replay protection settings. Those settings are already managed globally by your operating system's z/OSMF installation.
:::

## Prerequisites

Before executing the commands below, ensure that your environment meets these criteria:

* **Zowe Version:** v3.4.0 or higher.

* **Authentication Provider:** Configured for SAF (`apiml.security.auth.provider=saf` in your zowe.yaml).

* **z/OSMF Status:** Installed, running, and active on your system.

## Configuration Variables

* **zosmf-applid**  
The active APPLID assigned to your z/OSMF instance.  
**Default:** `IZUDFLT`

* **zowe-user-id**  
The User ID/Accessor ID assigned to the Zowe started task.  
**Default:** `ZWESVUSR`

## Configure PassTicket permissions by ESM

Choose the commands that correspond to your system's External Security Manager (ESM)to grant the Zowe runtime permission to generate PassTickets for z/OSMF.

**Top Secret (TSS)**



<details>
<summary>Click here for command details for Top Secret (TSS).</summary>

Authorize the Zowe started task Accessor ID (ACID) to generate PassTickets for the target z/OSMF instance by adding the following update permit:

```
/* Grant update access to the Zowe started task ACID for the specific z/OSMF APPLID */
TSS PERMIT(<zowe-user-id>) PTKTDATA(IRRPTAUTH.<zosmf-applid>.) ACCESS(READ,UPDATE)

/* Refresh the security environment to apply the update immediately */
TSS REFRESH
```

</details>

**ACF2**

<details>
<summary>Click here for command details for ACF2.</summary>

Compile the resource rule inside the PassTicket (PTK) to validate and allow generation from the Zowe server user ID:

```
SET RESOURCE(PTK)

/* Add permission for the Zowe started task user ID to use the PassTicket Auth path */
RECKEY IRRPTAUTH ADD(<zosmf-applid>.- UID(<zowe-user-id>) SERVICE(UPDATE,READ) ALLOW)

/* Rebuild the local active memory structures for PassTickets */
F ACF2,REBUILD(PTK),CLASS(P)
```
</details>

**IBM RACF**

<details>
<summary>Click here for command details for IBM RACF.</summary>

Execute the following commands to define the `IRRPTAUTH` profile for z/OSMF inside the `PTKTDATA` class and authorize the Zowe started task user:

```
/* Define the profile for the z/OSMF APPLID within the PassTicket Auth class */
RDEFINE PTKTDATA IRRPTAUTH.<zosmf-applid>.* UACC(NONE)

/* Permit the Zowe user ID to generate PassTickets for z/OSMF */
PERMIT IRRPTAUTH.<zosmf-applid>.* CLASS(PTKTDATA) ID(<zowe-user-id>) ACCESS(UPDATE)

/* Refresh the PTKTDATA class storage to apply changes */
SETROPTS RACLIST(PTKTDATA) REFRESH
```
</details>

## Verify the configuration

To verify that the permissions were correctly applied and that the Zowe started task user has the necessary administrative access, issue the command that corresponds to your ESM:

**Top Secret (TSS) verification**

<details>
<summary>Click here for command verification command details for Top Secret. </summary>

```
TSS WHOHAS PTKTDATA(IRRPTAUTH.<zosmf-applid>.)
```

Verify that the returned access mask confirms READ,UPDATE visibility for the Zowe ACID.

</details>

**ACF2 verification**

<details>
<summary>Click here for command verification command details for ACF2. </summary>

```
SET RESOURCE(PTK)
LIST LIKE(IRRPTAUTH-)
```

Ensure that the compiled record properly lists the <zosmf-applid> rule containing your Zowe user ID's UID string match.

</details>

**IBM RACF verification**

<details>
<summary>Click here for command verification command details for IBM RACF. </summary>

```
RLIST PTKTDATA IRRPTAUTH.<zosmf-applid>.* ALL
```

Verify that the output shows your Zowe started task user listed under USER ACCESS with UPDATE authority.

</details>

Correct verification output indicates you successfully granted the Zowe runtime permission to generate PassTickets for z/OSMF.