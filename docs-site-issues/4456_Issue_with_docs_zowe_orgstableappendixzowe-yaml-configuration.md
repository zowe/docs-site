# Issue #4456: Issue with docs.zowe.org/stable/appendix/zowe-yaml-configuration/

**URL:** https://github.com/zowe/docs-site/issues/4456

**Created:** 2025-05-15T09:25:33Z

**Updated:** 2025-05-21T15:04:47Z

**Labels:** certificates

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

It says

Zowe attempts to automatically detect the z/OSMF CA based on the certificate owner specified by zowe.setup.certificate.keyring.zOSMF.user

but the owner is CERTAUTH.       how does the code know which label to use?

____________________


_If the automatic detection fails, define zowe.setup.certificate.keyring.zOSMF.ca to indicate the label of the z/OSMF root certificate authority._

it feels like the doc  is trying to say.

If the CA of the z/OSMF is not in the Zowe trust ring, you can define it using
zowe.setup.certificate.keyring.zOSMF.user and label  zowe.setup.certificate.keyring.zOSMF.ca
for example

zowe.setup.certificate.keyring.zOSMF.user: CERTAUTH 
zowe.setup.certificate.keyring.zOSMF.ca: ZOSMFCA






## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

