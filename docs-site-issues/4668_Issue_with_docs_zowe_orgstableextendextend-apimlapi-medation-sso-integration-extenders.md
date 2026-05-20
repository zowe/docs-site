# Issue #4668: Issue with docs.zowe.org/stable/extend/extend-apiml/api-medation-sso-integration-extenders/

**URL:** https://github.com/zowe/docs-site/issues/4668

**Created:** 2025-08-22T15:37:22Z

**Updated:** 2025-09-03T12:08:25Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I do not understand

_Accepting PassTickets

Using the scheme value httpBasicPassTicket specifies that a service accepts PassTickets in the Authorization header of the HTTP requests using the basic authentication scheme. It is necessary to provide a service APPLID in the authentication.applid parameter to prevent PassTicket generation errors and to make sure API Mediation Layer can generate PassTickets with the given APPLID.

    When a JWT is provided, the service validates the Zowe JWT to use for PassTicket generation.
    When a client certificate is provided, the service validates the certificate by mapping the certificate to a mainframe user to use for PassTicket generation._

I have definition for MQ 
/u/tmp/zowec/./workspace/api-mediation/api-defs/mq.yml
services: 
  - serviceId: passticket 
    title: Zowe Colinsmq        (ZSS) 
    description: 'Colins MQPT' 
    catalogUiTileId: colinMQ 
    instanceBaseUrls: 
      - https://10.1.1.2:8443/ibmmq/rest/v1/ 
    homePageRelativeUrl: 
    routedServices: 
      - gatewayUrl: rest/v1 
        serviceRelativeUrl: 
    apiInfo: 
      - apiId: colin.mq 
        gatewayUrl: rest/v1 
        #swaggerUrl: https://10.1.1.2:7556/api-docs/agent 
        # documentationUrl: TODO 
    authentication: 
       scheme: httpBasicPassTicket 
       applid: MQWEB 


I want to use     httpBasicPassTicket and not JWT.   
So I do not understand 
When a JWT is provided, the service validates the Zowe JWT to use for PassTicket generation.
1) which jwt
2) which service ... my mq service?

It may be trying to say 

If a JWT is used to authenticate to the Zowe APIML service, the Zowe APIML service validates the JWT, then takes the mapped userid and uses this userid to generate the pass ticket.
________________________________________________

_Accepting JWT

Accepting JSON Web Tokens (JWT) is the recommended method for integrating. No configuration is needed on the user's side.

authentication:
    scheme: zoweJwt_


....

**No configuration is needed on the user's side.**
what is the user's side... is this my application on my laptop?
Do I need to configure my MQWEB server ( such as to make sure the z/osmf parameters match the MQ ones?)



 


                                         


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

