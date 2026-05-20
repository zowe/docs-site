# Issue #4655: Issue with docs.zowe.org/stable/extend/extend-apiml/onboard-overview

**URL:** https://github.com/zowe/docs-site/issues/4655

**Created:** 2025-08-12T09:46:41Z

**Updated:** 2025-08-12T09:46:41Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I'm coming to this topic as a systems programmer who has been asked to connect MQWEB to Zowe.   I am not an expert in Zowe.

I do not know what
_As an API developer, you can onboard a REST API service to Zowe™ API Mediation Layer (API ML). Onboarding your REST service to Zowe™ API Mediation Layer makes your service discoverable by the API ML Discovery Service, enables routing through the API Gateway, and makes service information and API documentation available through the API Catalog._

is ...

even with my installing Zowe - I,m not clear what this means.

I googled for API ML Discovery service - and found how to configure it - but not what it does.
You should put a definition of the API discovery service somewhere, and link to it.


I'm guessing that it displays available services in a web page [API ML Discovery Service](https://10.1.1.2:7554/apicatalog/api/v1/#/service/apicatalog), and available via a REST query.

Similary I do not know what the with API catalog. does - so  please make a link to it.

I think it is saying 
You can make an external REST API service accessible from an Zowe CLI APIML request.
The definitions will be published on a web page, and accessible from a REST API query.
_______________________________________________________

It says

Note: For [static onboarding](https://docs.zowe.org/stable/extend/extend-apiml/onboard-static-definition), access to Zowe runtime is required to create the static service definition.

Please define what static onboarding is.   The link does not tell me.

Something like

You can have 
1) static onboarding where... 
2) dynamic onboarding where...  ( assuming there dynamic onboarding)

_________________________________


Where it says 
access to Zowe runtime 


do you mean the web pages? or the zowe configuration files?
________________________________________________________


It says

Zowe uses secured communication over TLSv1.2. As such, the protocol version and the certificate is required. For more information, see [Certificate management in API Mediation Layer](https://docs.zowe.org/stable/extend/extend-apiml/certificate-management-in-zowe-apiml)

the page Certificate management in API Mediation Layer   .. contains a lot of information about certificates.   What are the key bits I need to know.  Can you link to specific topics?

___________________________________________

It says

If you do not have a specific REST API service, you can use the [sample service](https://docs.zowe.org/stable/extend/extend-apiml/onboard-overview#sample-rest-api-service).


I tried this and had major difficulties getting started with running it on z/OS.
______________________________________
Sample REST API Service  this needs more information - eg which platforms ( does it run on z/OS?)
Does it run on Linux?

_The Sample REST API Service has a base URL. When you start this service on your computer,_ 


A small Python example would be easier to use, and run anywhere

__________________________________________


It says

Your service should be documented in a valid OpenApi 2.0/3.0 Swagger JSON format.

How do I do that?   are there tools to validate ?  or give a link to https://swagger.io/specification/v2/

__________________________________________


It says

Access to the Zowe artifactory

Repository URL: https://zowe.jfrog.io/zowe/libs-release

access - where from?    my z/OS is air gapped - is this a problem.  Please explain why I need access to it - and where  I need access from

__________________________________________


Either the Gradle or Maven build automation system


That's a bummer - I do not have access to this from z/OS...  my z/OS is air gapped.

So it looks like I cannot install a service on z/OS!


______________________________________________________


Services can be updated to support API Mediation Layer natively by updating the service code. Use one of the following guides to onboard your REST service to Zowe API Mediation Layer:

what does this mean?

Is this my MQWEB service ?   What do I need to update in MQ web?

________________________________________________________


it says

[Onboard a REST API using static definition without code changes](https://docs.zowe.org/stable/extend/extend-apiml/onboard-static-definition)


who'se code changes?  APIML or MQWEB?

_______________________________


Verifying that your service was successfully onboraded t

spelling mistake

________________________________________________________


https://{zowe-hostname}:{discovery-service-port}/eureka/apps/{serviceId}

what's the service id...  is this from my definitons?  If so say
where serviceId is the xxx in your defintions.

_________________________________________


I would put the sample service definition in its own page... it makes the page easier to use.



_____________________________________




## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

