# Issue #4527: Issue with docs.zowe.org/stable/appendix/zowe-yaml-configuration/

**URL:** https://github.com/zowe/docs-site/issues/4527

**Created:** 2025-06-14T12:43:08Z

**Updated:** 2025-06-14T12:43:08Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

(https://docs.zowe.org/stable/user-guide/api-mediation/configuration-logging/)

talks about

components:
  gateway:
    logging:
      config: /path/to/logback.xml



logging is not mentioned in this page, nor config
_________________________


The doc mentions northbound ... as in Specifies the northbound certificate facing Zowe users.  


This is a term I am not familiar with.   Could northbound and southbound be made links to a definition of what these terms mean?

___________________________________________

_If the CA of the z/OSMF is not_ 

It is not clear what z/OSMF is.   Should it be If the CA of the z/OSMF instance is not..

_______________________________________


I think ${GATEWAY_PORT} has been replaced  with ${ZWE_components_gateway_port}

________________________________


server.maxConnectionsPerRoute
Specifies the maximum connections for each service.

Is this maximum concurrent, or unique connections?... same comment applies to

server.maxTotalConnections
Specifies the total connections for all services registered under API Mediation Layer.

__________________________________
server.maxConnectionsPerRoute
Specifies the maximum connections for each service.  What is a route?

_________________________________


This comes under gateway.... so what does _Specifies the maximum connections **for each service.**_  mean?
_____________________________

apiml.catalog.customStyle.titlesColor`
Specifies the title color.   .. is there a list of colours I can use?
_______________________________


What does _specifies a custom link to be displayed in the header. Use this property to refer to **applicable** documentation. _ applicable mean

__________________________________


Under  zss in my zowe.yaml file I have 

zss: 
  hostname: 10.1.1.2 
  enabled: true 
  logLevels: 
    _zss.traceLevel: 5 
    _zss.fileTrace: 5 
    _zss.socketTrace: 5 
    _zss.httpParseTrace: 5 
    _zss.httpAuthTrace: 5 
    _zss.mvdserver: 5 
    _zss.jwk: 5 
    _zss.jwt: 5 
  port: 7557 
  crossMemoryServerName: ZWESIS_STD 
  agent: 
    jwt: 
      fallback: true 
    64bit: true 
    https: 
      trace: false 

which are not listed in this page


eg see https://docs.zowe.org/stable/user-guide/configure-xmem-server/#troubleshooting
```
components:
  zss:
    crossMemoryServerName: ZWESIS_02
```








## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

