# Issue #4467: Issue with docs.zowe.org/stable/getting-started/zowe-security-authentication/

**URL:** https://github.com/zowe/docs-site/issues/4467

**Created:** 2025-05-17T09:23:02Z

**Updated:** 2025-05-21T15:02:53Z

**Labels:** security authentication

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

It says

_If the keyring or a truststore contains at least one valid certificate authority (CA) other than the CA of API ML, it is possible to use client certificates issued by this CA to authenticate to API ML._

I do not understand this.  I have a z/OS system wide CA for signing certificates, so my Zowe server, and  my client are signed by this CA.   Does this text mean I had to add a dummy CA into the keyring?

I think you are assuming that Zowe has its own CA...  which may be unlikely.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

