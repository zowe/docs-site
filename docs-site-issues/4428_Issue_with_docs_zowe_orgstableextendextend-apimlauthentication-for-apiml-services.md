# Issue #4428: Issue with docs.zowe.org/stable/extend/extend-apiml/authentication-for-apiml-services/

**URL:** https://github.com/zowe/docs-site/issues/4428

**Created:** 2025-05-11T13:11:17Z

**Updated:** 2025-12-16T10:21:27Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the keystore/localhost/localhost.keystore.p12 keystore or in the SAF keyring. **It is exported to .pem format for convenience.** Any other certificate which is valid and trusted by Discovery service can be used.


so if I use the SAF keyring ... it is exported to pem format!  really - how do I stop this from happening because I do not want the private key escaping via a .pem file.     Where is it exported to so I can delete it.

Which keyring ?  The keystore or the trust store - please clarify.

 Any other certificate which is valid and trusted by Discovery service can be used.   how  do I specify the cerificate for the discovery service?
please point me to the instructions

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

