# Issue #4476: Issue with docs.zowe.org/stable/user-guide/api-mediation/configuration-jwt/

**URL:** https://github.com/zowe/docs-site/issues/4476

**Created:** 2025-05-17T17:32:34Z

**Updated:** 2025-05-21T14:56:37Z

**Labels:** JWT

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

It says

When using the z/OSMF authentication provider, enable API Mediation Layer for PassTicket generation and configure the z/OSMF APPLID.


...

_If you use z/OSMF as an authentication provider, provide a valid APPLID. The API ML generates a PassTicket for the specified APPLID and subsequently uses this PassTicket to authenticate to z/OSMF. The default value in the installation of z/OSMF is IZUDFLT.
...._
Here are my z/OSMF attributes... there is no APPLID


SERVER_PROC(IZUSVR1) 
ANGEL_PROC(IZUANG1) 
AUTOSTART(LOCAL) 
AUTOSTART_GROUP(NONE) 
HOSTNAME('*') 
HTTP_SSL_PORT(10443) 
UNAUTH_USER(IZUGUEST) 
SAF_PREFIX(IZUDFLT) 
SEC_GROUPS USER(IZUUSER),ADMIN(IZUADMIN),SECADMIN(IZUSECAD) 
JAVA_HOME('/usr/lpp/java/J17.0_64') 
KEYRING_NAME('IZUKeyring.IZUDFLT') 
PLUGINS( INCIDENT_LOG, 
             COMMSERVER_CFG, 
             WORKLOAD_MGMT 
             RESOURCE_MON, 
             INCIDENT_LOG, 
             CAPACITY_PROV, 
             SOFTWARE_MGMT, 
             SYSPLEX_MGMT, 
             ISPF) 

or do you mean the RACF APPLID ( like omvsappl?) 

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

