# Issue #4491: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4491

**Created:** 2025-05-23T13:30:23Z

**Updated:** 2025-12-16T10:21:31Z

**Labels:** area: apiml, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
A couple of problems here...


Specifies the TCP port where API ML service listens on. The port is defined by the configuration parameter MFS_GW_PORT for the Gateway, MFS_DS_PORT for the Discovery service (by default, set to gateway port + 1), and MFS_AC_PORT for the Catalog (by default, set to gateway port + 2).

What is MFS_GW_PORT ?   I think this is the gateway : port:  defaults to 7554, discovery: port defaults to 7553,  and api-catalog: port defaults to 7552.

_________________


It says

http GET https://lpar.ca.com:10000/application/loggers

what is ca.com... is this computer associates .. or certificate authority.    Port 10000 is strange... what is this for... is it for gateway?

____________________________________


https GET https://127.0.0.1:7554/application/loggers --cert colinpaice.pem --cert-key colinpaice.key.pem --verify  ca.pem2  

gave me 

_"messages": [
        {
            "messageContent": "The service can not find the requested resource.",
            "messageKey": "org.zowe.apiml.common.notFound",
            "messageNumber": "ZWEAO404E",
            "messageType": "ERROR"
        }
    ]_


So there must be something else in the configuration

I used the API catalog, each API and it application was not found.
_________________________________________

in the API catlog web page, seach box, "loggers" is not found ... mind it cannot find application.


Ahh the search is only for the list of 5 items...  - not very clever is it!


________________________________________________

If I use push - does it just affect the running configuration - or does it try to update the zowe.yaml file?



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

