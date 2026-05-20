# Issue #4542: Issue with docs.zowe.org/stable/user-guide/authenticating-with-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4542

**Created:** 2025-06-16T14:23:28Z

**Updated:** 2025-06-16T14:23:28Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

It says

_The client certificate is verified as a valid TLS client certificate against the trusted certificate authorities (CAs) of the Gateway.
The certificate is checked against the CA in the Zowe keyring. If the certificate is valid, the security service (eg RACF MAP) then checks to see if the certificate is mapped to a userid. ._

___________________
double . at the end 
__________________________


trusted certificate authorities (CAs) of the Gateway.

I think this is the Zowe trust store keyring.

so the next line _The certificate is checked against the CA in the Zowe keyring._ looks like it is saying exactly the same thing, and is redundant.

If this is not so, why is it checking twice ?
________________

replace 
If the certificate is valid, the security service (eg RACF MAP) then checks to see if the certificate is mapped to a userid. ._

with 
If the certificate is valid, the security service (eg RACF MAP) is used to see if the certificate is mapped to a userid, and retrieve the userid. ._



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

