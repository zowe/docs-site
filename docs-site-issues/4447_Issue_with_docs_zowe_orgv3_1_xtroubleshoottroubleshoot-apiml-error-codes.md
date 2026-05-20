# Issue #4447: Issue with docs.zowe.org/v3.1.x/troubleshoot/troubleshoot-apiml-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4447

**Created:** 2025-05-14T16:24:47Z

**Updated:** 2025-07-04T10:41:08Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

I got  ZWEAS121E,,, when using

https://docs.zowe.org/stable/user-guide/authenticating-with-client-certificates/

curl -X POST \
--cert /path/to/cert.pem \
--key /path/to/key.pem \
https://api-mediation-layer:7554/gateway/api/v1/auth/login -v


I get

{"messages":[{"messageType":"ERROR","messageNumber":"ZWEAG121E","messageContent":"Authorization header is missing, or the request body is missing or invalid for URL '/zaas/api/v1/auth/login'","messageAction":"Provide valid authentication.","messageReason":"The aut
horization header is missing, or the request body is missing or invalid.","messageKey":"org.zowe.apiml.security.login.invalidInput"}
]}CBT:COLIN:/u/colin/zowec>            


We could do with some words as to where to look at - such as what header is missing - ( and why didn't the example have this header)
I'm logging on with certificate so I do not know which header is needed - or what is needed in the body.

                                                                                             

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

