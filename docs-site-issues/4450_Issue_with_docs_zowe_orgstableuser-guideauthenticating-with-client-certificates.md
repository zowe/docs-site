# Issue #4450: Issue with docs.zowe.org/stable/user-guide/authenticating-with-client-certificates

**URL:** https://github.com/zowe/docs-site/issues/4450

**Created:** 2025-05-14T16:55:47Z

**Updated:** 2025-05-21T15:05:57Z

**Labels:** certificates

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

To disable the API ML mapper, ensure that you set the parameter components.gateway.apiml.security.useInternalMapper to false.

components.gateway.apiml.security.useInternalMapper  is not in the exanple yaml, so not in my zowe.yaml.

So perhaps after 

Register the client certificate with the user IDs in your ESM.

add 

In the zowe.yaml set components.gateway.apiml.security.useInternalMapper  to true and restart zowe

________________


Where it says

_Register the client certificate with the user IDs in your ESM._

does this mean ensure the client certificate is mapped to a userid? (rather than a certificate is owned by a userid)

I can use certificate which are not owned by a userid.   The system uses information from the certificate to map to a userid. eg all certificates with o=BIGBANK,cn=.... -> userid bigbank.


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

