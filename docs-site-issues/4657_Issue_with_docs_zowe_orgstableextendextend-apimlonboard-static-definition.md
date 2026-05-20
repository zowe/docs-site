# Issue #4657: Issue with docs.zowe.org/stable/extend/extend-apiml/onboard-static-definition

**URL:** https://github.com/zowe/docs-site/issues/4657

**Created:** 2025-08-12T10:41:12Z

**Updated:** 2025-08-14T08:27:45Z

**Labels:** area: apiml, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description


I am new to APIML, and have been asked to configure MQWEB as a service in Zowe APIML.   Even though I have installed ZOwe and used it to a limited amount, I am not an expert.

_________

(Optional) base path where the service is available. This URL is called the base URL of the service.

What is the base path?  do you mean //https://10.1.1.2:9443/MQ? 

please explain or give an example 

It says

In the sample service described in the [Onboarding Overview](https://docs.zowe.org/stable/extend/extend-apiml/onboard-overview#sample-rest-api-service), the URL of the service is: http://localhost:8080.

which part of this is the base path?
______


I would have at the top 
example definitions of  a petstore application


Url   http://localhost:8080/v2/my cats
serviceid : petstore

Your API needs a version eg v2 in the URL

____________________________


Its says 

In the sample service, we provide a REST API. The first segment is /api as the service provides only one REST API. To indicate that this is _version 2, the second segment is /v2. This version is required by the Gateway. If your service does not have a version, use v1 on the Gateway._

Is a version number a prereq?  It says **This version is required by the Gateway.**  which contra dicts If your service does not have a version


____________________________________________________________


I would put the section Customize configuration parameters in its own page... it would be eaiser to use. ( I went round in circles several time before finding it was the same page.)

_________________

httpBasicPassTicket  is not documented under scheme

There is no reference to scheme  in the configuration section

We need a list of valid values - and what they mean.

____________________________
There is no definition of applid as in  applid: ZOWEAPPL

Is this the applid as used in the pthread_logon_applid used to verify a certificate authentication to a service?

_______________

It says

_This parameter specifies the API identifier that is registered in the API Mediation Layer installation. The API ID uniquely identifies the API in the API Mediation Layer. The same API can be provided by multiple services. The API ID can be used to locate the same APIs that are provided by different services._

I do not understand the importance or not of this value.  Where is it used?  Is this used by my client application using the service  - or is it
just used with Zowe>  Please give more explainations

__________________________________

It says

_API ID needs to be a string of up to 64 characters that uses lowercase alphanumeric characters and a dot_

The example code has multiple dots.  that uses lowercase alphanumeric characters or dots_
___________________________________________


_The creator of the API defines this ID._ so does this mean MQ development team in Hursley?  
Should the _The creator of the API **definition file** defines this ID._ 

__________________________________


catalogUiTileId..

wow you throw in an advanced definiton without explain the concept.


At the top somewhere where you describe the APIML and creating a service.  You need words like

You can define external services to APIML, so they service is available from the zowe CLI APIML interface.

When you define a service it is available in the API catalog, available on a web page or REST interface.

You can group similar services together, so they appear in "a tile" ( see catalogUiTileId)

....


_______________________________


it says

The following procedure describes how to add your service to the API Mediation Layer on your local machine.


but I do not have an APIML on my local machine - it is on z/OS.

_______________________________________________________________________

It says

Copy or move your YAML file to the config/local/api-defs directory in the directory with API Mediation Layer.

I do not have this on my z/OS.. I have

IBMUSER:/u/tmp/zowec: >ls ./workspace/api-mediation/ap*                                                                      
discovery.zosmf_static_definition_yaml_template.s0w1.yml  zss.apiml_static_reg_yaml_template.s0w1.yml                        

_________________________


Start the API Mediation Layer services.


it is already started.

can I just stop and restart the APIML? 

_________________________

Where should I look for messages (as I'm bound to have misconfiured it)
please tell me

___________________________________

Run your Java application.

what Java app?

________________________________



Add a definition in the API Mediation Layer in the Zowe runtime


Whoa... .   What was I running on before ??  I Only have Zowe on z/OS !

_____________________________________


I do not have Add the fully qualified zFS path of your YAML file to **ZWE_STATIC_DEFINITIONS_DIR** in zowe.yaml.

Please document where I create it..


_______________________________-




You successfully defined your Java application if your service is running and you can access the service endpoints. The following example is the service endpoint for the sample application:
What java app?


___________________________________


Change

Add the fully qualified zFS path of your YAML file to ZWE_STATIC_DEFINITIONS_DIR in zowe.yaml.

to 

Define the location of your configuration file to Zowe.  because the existing sentence goes on to say
To place your YAML file within the instance directory,  .. and you do not need to define ZWE_STATIC_DEFINITIONS_DIR

_____________________________________


Use a REST API client to issue a POST request to the Discovery Service (port 10011):  
change to

Use a REST API client to issue a POST request to the Discovery Service (port 10011 in this example) :  

________________________________________________________________


httpie --cert=keystore/localhost/localhost.pem --verify=keystore/local_ca/localca.cer -j POST     https://localhost:10011/discovery/api/v1/staticApi

the syntax is https 















## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description 
of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

