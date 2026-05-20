# Issue #4484: Issue with docs.zowe.org/stable/appendix/zowe-api-reference

**URL:** https://github.com/zowe/docs-site/issues/4484

**Created:** 2025-05-19T13:25:36Z

**Updated:** 2025-05-19T13:25:36Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Ive got /gateway/api/v1/auth/keys/public/all        to work.

Please can you give some words as to why I might use this information.
______________________
The swagger says

This endpoint return all possible JWKs, which **can verify sign outside the Gateway for this moment.** It filters JWK by current settings of Zowe and z/OSMF.

can verify sign outside the Gateway for this moment. does not make sense to me.  Please can you explain it better.
_________________________________________________


What does
Returns public keys to verify JWT tokens, which can be generated now

mean?  "which can be generated now" implies which are able to be generated....

/all gave me  {"keys":[{"kty":"RSA","e":"AQAB","n":"zqnRRu-w68g3Fy

/current gave me  _{"keys":[]} _

Perhaps add some words to say you get back _{"keys":[]} _ if there is no data.

I thought I was using JWT - so I do not understand why I got {key: []} ... I am not sure how you would explain this...

  

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

