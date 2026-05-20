# Issue #4497: Issue with docs.zowe.org/stable/user-guide/api-mediation/configuration-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4497

**Created:** 2025-05-25T14:58:57Z

**Updated:** 2025-05-26T12:25:36Z

**Labels:** certificates

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
This page is very hard to follow -  Ive taken 20 minutes... and I'm still unclear.
______________________________

_The following steps are only required if the ZSS hostname or default Zowe user name are altered:_

altered from??  my zSS hostname is the same as when I started to install Zowe.   What default Zowe user name.   The one for the started task, or the one I logon to zowe web browser with.

My zowe user name is "Colin Paice, the zowe userid is COLIN.   should the words be userid instead of user name?

_______________________________________

It says

For more information about identity mapping in SAF,
Change this to _For information how to authorise the started task to do identity mapping._ because the referenced section does not provide informaion on identity mapping.

_______________________________________

There is a top
Configure Internal API ML Mapper

but later it mentions externalMapperUrl... . is this all part of the same topic or different topics.

__________



Configure the following properties, or add these properties if not present in your configuration yaml file:

    components.gateway.apiml.security.x509.enabled
    This property is the global feature toggle. Set the value to true to enable client certificate functionality.
    components.gateway.apiml.security.useInternalMapper
    This property is the global feature toggle. Set the value to true to enable the Internal API ML Mapper.

it might be clearer if is says
or add **both** these properties 

__________________________________________


For information about configuring ZSS,  . see 

It looks like you only configure the port in zss.

I would say

**Configuration options**
The configration options are listed   [Configure component gateway] (https://docs.zowe.org/stable/appendix/zowe-yaml-configuration#configure-component-gateway)

**Configure ZSS**
For information about the port in  g ZSS, see [Configure components zss](https://docs.zowe.org/stable/appendix/zowe-yaml-configuration#configure-component-zss) in Zowe YAML server configuration file references.

___________________________________

_Set the password for the Zowe runtime user. The user is created with the NOPASSWORD parameter by the Zowe installer. It is necessary to change this password._

Change Zowe runtime user. to Zowe started task userid user.
(the documentation seems to use the term user, when it should be userid.  For example the RACF doc says _ALU (userid)...   Use the ALTUSER command to change the information in a user's profile, including the user's systemwide attributes and authorities. The user profile consists of a BASE segment and, optionally, other segments such as a TSO segment or a DFP segment. You can use this command to change  information in any segment of the user's profile_

_______________________________


please explain why a password is required.  It is good/best practice for started task userids not to have a password - so people cannot cause a denial of service, by logging on with the wrong password many times,  and so revoking the userid.
_____________________

_If you customized the ZWESECUR JCL or workflow (the customization of zowe runtime user: // SET ZOWEUSER=ZWESVUSR * userid for Zowe started task) and changed the default USERID, create the components.gateway.apiml.security.x509.externalMapperUser property and set the value by adding a new line as in the following example:

Example:

components.gateway.apiml.security.x509.externalMapperUser: yournewuserid_  

This took a while to understand.  (Because I didnt use the Zowe stuff to define the started task).

I think this is saying
Set 
components.gateway.apiml.security.x509.externalMapperUser: stcuserid 
Where stcuserid is the userid of the Zowe started task.    This defaults to ZWESVUSR.  If you are using the default userid, this  statement can be omitted.

_____________________________


A nice compact example of the statements relevent to x509 followedby an explanation should make it much clearer.

    apiml: 
      security: 
        zosmf: 
          applidL 
        useInternalMapper: false 
        allowtokenrefresh: true 
        auth: 
#         provider: zosmf 
          provider: saf 
          zosmf: 
             applid: IZUDFLT 
            jwtAutoconfiguration: jwt 
            serviceId: ibmzosmf 
        authorization: 
          endpoint: 
            enabled: false 
          provider:  native 
        x509: 
          enabled: true 
          externalMapperUser: ZWESVUSR                                                                
          externalMapperUrl: 
            https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/certificate/x509/map 

__________________________________________


Where it says

//${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/certificate/x509/map 

Do these get substituted ... or am I meant to fill them in?  please say which.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

