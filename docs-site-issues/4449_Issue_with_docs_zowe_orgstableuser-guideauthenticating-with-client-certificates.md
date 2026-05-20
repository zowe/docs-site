# Issue #4449: Issue with docs.zowe.org/stable/user-guide/authenticating-with-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4449

**Created:** 2025-05-14T16:42:05Z

**Updated:** 2025-05-21T15:06:08Z

**Labels:** certificates

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

I do not understand

The public key of the provided client certificate is verified against SAF. SAF subsequently returns a user ID that owns this certificate.
The Gateway then performs the login of the mapped user and provides valid authentication to the downstream service.

What does  The public key of the provided client certificate is verified against SAF. mean - SAF is an interface.

This could mean
1)  The certificate is checked for being in the trusted keyring...   I hope not - because this is not how certificates work.    
The certificate may not exist on z/OS, so there can be no SAF owner,  and so not in the keyring.

I expect the following
The certificate is checked against the CA in the Zowe keyring.
a) If this is a valid certificate then the security service (eg RACF MAP) is used to look to see if the certificate is mapped to a userid.
or
b) The certificate is used to logon (pthread_security_np) for the thread to run as the user associated with the certificate.


What does  _and provides valid authentication to the downstream service mean?_  it might be clearer to say  _If the authentication/authorisation fails, no further work is done.   If the id is authenticated, and authorised, the downstream service can use the id._

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

