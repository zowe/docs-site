# Issue #4122: Issue with docs.zowe.org/stable/user-guide/configure-certificates

**URL:** https://github.com/zowe/docs-site/issues/4122

**Created:** 2025-02-03T07:23:55Z

**Updated:** 2025-03-14T12:15:35Z

**Labels:** type: enhancement, area: install and config, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

## Pages to Update
<!--https://docs.zowe.org/...-->
It says

Zowe supports using either file-based (PKCS12) or z/OS key ring-based (when on z/OS) keystores and truststores, and can reuse compatible stores if they exist. Zowe can assist in creating the stores by either generating certificates or by allowing users to import their own compatible certificates via the zwe init certificate command.

I believe that PKCS12  (or .pem) files are not considered very secure - but you need to check with the security people.
Anyone with super user authority can access this .pem file, and so steal your private key.

If you use a keyring, you have to explicity grant someone access to the keyring to be able to use it - and give them control/update access to the ring to be able to use any private key on the ring.

_____________________________________________


Take our [Certificates Configuration Questionnaire](https://docs.zowe.org/stable/user-guide/configure-certificates/certificates-configuration-questionnaire) to assist with determining which configuration scenario and associated zowe.yaml format best suits your use case.

broken link


## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

