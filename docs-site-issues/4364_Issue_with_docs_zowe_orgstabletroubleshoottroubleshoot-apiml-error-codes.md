# Issue #4364: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4364

**Created:** 2025-05-04T17:47:50Z

**Updated:** 2025-12-16T10:21:23Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

ZWEAS121E

Authorization header is missing, or the request body is missing or invalid for URL '%s'

Reason:

The authorization header is missing, or the request body is missing or invalid.

Action:

Provide valid authentication.

This is not very helpful.  Please point me to the authroisation header.

The doc pointed me to some curl code like

curl $post $cj $certca $certs  https://10.1.1.2:7554/gateway/api/v1/auth/login -v

There is no authorisation header in the specification, so I have no idea what to specify

I'm trying to logon with client certificate...  but have not done much ( any?) of the confiuration...because it is is hard to find a nice simple receipe 


I could not find any messages in any logs, please add explination which logs to use - or how to turn on how to get the messages.







## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

