# Issue #4479: Issue with docs.zowe.org/v3.0.x/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4479

**Created:** 2025-05-18T07:49:08Z

**Updated:** 2025-12-16T10:21:31Z

**Labels:** area: apiml, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
With 
_List the available loggers of a service by issuing the GET request for the given service URL:_

I get 
_{"messages":[{"messageType":"ERROR","messageNum
"messageKey":"org.zowe.apiml.common.notFound"}]


and

+ curl -v -X GET --cert ../ssl/colinpaiceec.pem --key 
../ssl/colinpaiceec.key.pem --insecure --cacert 
/u/colin/ssl/zosmfca.pem 
https://127.0.0.1:7554/application/loggers 

GET /application/loggers HTTP/1.1 
Host: 127.0.0.1:7554 
User-Agent: curl/8.13.0 
Accept: */* 

Request completely sent off 
HTTP/1.1 404 
Vary: Origin 
Vary: Access-Control-Request-Method 
Vary: Access-Control-Request-Headers 
Cache-Control: no-cache, no-store, max-age=0, must-revalidate 
Pragma: no-cache 
Expires: 0 
X-Content-Type-Options: nosniff 
Strict-Transport-Security: max-age=31536000 ; includeSubDomains 
X-XSS-Protection: 0 
Referrer-Policy: no-referrer 
Content-Type: application/json 
Transfer-Encoding: chunked 
Date: Sun, 18 May 2025 07:48:13 GMT 

Connection #0 to host 127.0.0.1 left intact_ 
                                                                                                  
So there must be some configuration I need to do


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

