# Issue #4481: Issue with docs.zowe.org/v3.1.x/user-guide/configure-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4481

**Created:** 2025-05-18T16:14:03Z

**Updated:** 2025-05-21T14:47:11Z

**Labels:** certificates

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Ive spent a day trying to resolve a problem with jwt (and SAF)

{"messages":[{"messageType":"ERROR","messageNumber":"ZWEAM701E","messageContent":"The request to the URL '/zaas/api/v1/auth/login' h
as failed: SignatureException: Unable to compute RS256 signature. Cause: Unrecognized RSA or RSASSA-PSS key algorithm name. caused b
y: InvalidKeyException: Unrecognized RSA or RSASSA-PSS key algorithm name.","messageAction":"Refer to specific exception details for
 troubleshooting. Create an issue with this message.","messageReason":"The request failed because of an internal error.","messageKey
":"org.zowe.apiml.common.internalRequestError"}]}+ url=https://127.0.0.1:7554/unixfile/contents/*        



It looks like you need a server certificate which is an RSA, not an Elliptic curve ( or other)

with an RSA it seems to work... with 

RACDCERT ID(COLIN) GENCERT - 
   SUBJECTSDN(CN('COLINEC') - 
              O('CBT') - 
              OU('COLIN')) - 
   ALTNAME(IP(127.0.0.1)) - 
   NISTECC - 
   KEYUSAGE(   HANDSHAKE     )  - 
   SIZE(256) - 
   NOTAFTER(   DATE(2029-07-02  ))- 
   SIGNWITH (CERTAUTH LABEL('DOCZOSCA')) - 
   WITHLABEL('ZOWECERTEC') 

is seems to fail... but it could be another reason.


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

