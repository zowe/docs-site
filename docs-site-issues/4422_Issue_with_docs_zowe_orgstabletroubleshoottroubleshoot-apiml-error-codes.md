# Issue #4422: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4422

**Created:** 2025-05-10T07:54:24Z

**Updated:** 2025-05-21T15:18:36Z

**Labels:** area: zwe

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

ZWEAO404E  needs more information.
I used 
zowe zos-files list data-set "COLIN.C.*" and got 

_error Details:
HTTP(S) error status "503" received.
Review request details (resource, base path, credentials, payload) and ensure correctness.

Protocol:  https
Host:      10.1.1.2
Port:      7554
Base Path: ibmzosmf/api/v1
Resource:  /zosmf/restfiles/ds?dslevel=COLIN.C.*
Request:   GET
Headers:   [{"Accept-Encodin_g":"gzip"},{"X-IBM-Max-Items":"0"},{"X-CSRF-ZOSMF-HEADER":true}]
Payload:   undefined

I can clearly get through to the server.
/zosmf/restfiles/ds?dslevel=COLIN.C.* was created by zowe cli
ibmzosmf/api/v1 was per doc..

so it looks like there is a problem on the back end.

For extra information are there commands I can issue to display what is valid?
Could it be I am not authorised to issue the command>


Is there more information in the logs I can look at - if so which logs?










## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->
