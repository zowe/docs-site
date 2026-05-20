# Issue #4460: Issue with docs.zowe.org/v3.0.x/user-guide/authenticating-with-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4460

**Created:** 2025-05-15T17:37:30Z

**Updated:** 2025-05-21T15:03:26Z

**Labels:** certificates, security authentication

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it say

curl -X POST \
--cert /path/to/cert.pem \
--key /path/to/key.pem \
https://api-mediation-layer:7554/gateway/api/v1/auth/login -v

I think you also need -cacert... 

_______________________________


I get 

{"messages":[{"messageType":"ERROR","messageNumber":"ZWEAG121E","messageContent":"Authorization header is missing, or the request b
dy is missing or invalid for URL '/zaas/api/v1/auth/login'","messageAction":"Provide valid authentication.","messageReason":"The au
horization header is missing, or the request body is missing or invalid.","messageKey":"org.zowe.apiml.security.login.invalidInput"



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

