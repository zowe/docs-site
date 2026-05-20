# Issue #4528: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4528

**Created:** 2025-06-14T12:52:58Z

**Updated:** 2025-06-27T06:19:43Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Where it says  _Enable API ML Debug Mode as described in Enable API ML Debug Mode_  make the second a link to the section.
_______________________________________________


Where it says GET scheme://hostname:port/application/loggers in the black box...  it doesnt work.

+ curl -v -X GET --cookie-jar zowe.cookie.jar --cookie zowe.cookie.jar --insecure --cert ./colinpaice.pem:password --key ./colinpaice.key.pem https://10.1.1.2:7554/application/loggers


* Connection #0 to host 10.1.1.2 left intact
{"messages":[{"messageType":"ERROR","messageNumber":"ZWEAO404E","messageContent":"The service can not find the requested resource.","messageKey":"org.zowe.apiml.common.notFound"}]}

whereas further down it gives the example 

GET [gateway-scheme]://[gateway-hostname]:[gateway-port]**/apicatalog/api/v1/**application/loggers
_______________________

Its says 
http GET https://lpar.ca.com:10000/application/loggers

what is lpar.ca.com ... is sounds like the LPAR where  a CA is ...  and a strange port 10000 ?

please make them consistent with normal convention
____________________________________________


The output has 

Output:
{"levels":["OFF","ERROR","WARN","INFO","DEBUG","TRACE"],
 "loggers":{
   "ROOT":{"configuredLevel":"INFO","effectiveLevel":"INFO"},
   "com":{"configuredLevel":null,"effectiveLevel":"INFO"},
   "com.ca":{"configuredLevel":null,"effectiveLevel":"INFO"},
   ...
 }


what is ROOT,com and com.ca .... are they zowe components like gateway or zss ?....  please make a link to where they are defined











## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

