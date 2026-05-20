# Issue #4531: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4531

**Created:** 2025-06-14T18:57:13Z

**Updated:** 2025-06-27T06:19:44Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->


There are hundred of possible trace entries.

- 434 for org.springframework....- 
- 36 for com.netflix....- 
- 286 for io....- 
- 63 for org.apache...- 
- 57 for org.hibernate- 
- 68 for org.ehcache - 
- 109 for org.zowe.apiml.


How do I find out which to specify.

For example I want to trace the gateway components,because I am getting a problem with resource not found.

Do I enable the trace for 

"org.zowe.apiml.product"
"org.zowe.apiml.product.gateway"
"org.zowe.apiml.product.gateway.GatewayInstanceInitializer"

____
      
There are entries like

"org.zowe.apiml.security"
        "org.zowe.apiml.security.ApimlPoolingHttpClientConnectionManager"
        "org.zowe.apiml.security.common"
        "org.zowe.apiml.security.common.audit"

If i turn trace on for  
"org.zowe.apiml.security" does it turn it on for all those below it ... eg 
"org.zowe.apiml.security.*


I think it does - but you should check.





## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

