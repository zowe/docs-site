# Issue #4472: Issue with docs.zowe.org/stable/extend/extend-apiml/zowe-api-mediation-layer-security-overview/

**URL:** https://github.com/zowe/docs-site/issues/4472

**Created:** 2025-05-17T15:52:00Z

**Updated:** 2025-05-21T14:58:07Z

**Labels:** JWT

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

Your z/OSMF instance can be enabled to support JWTs as described in [Enabling JSON Web Token support](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zos.v2r4.izua300/izuconfig_EnableJSONWebTokens.htm). In such cases, the Zowe API ML uses this JWT and does not generate its own Zowe JWT. All authentication APIs, such as /gateway/api/v1/login and /gateway/api/v1/check function in the same way as without z/OSMF JWT. The Gateway service endpoint /gateway/api/v1/auth/keys/public serves the z/OSMF JWK that can be used for JWT signature validation.


Do any of the z/OSMF parameters in

https://www.ibm.com/docs/en/zos/2.4.0?topic=configurations-enabling-json-web-token-support

have to match up with any Zowe ones?   It would be good to say 

the parameter....    must match  the z/OSMF definition..

or 

No parameters in https://www.ibm.com/docs/en/zos/2.4.0?topic=configurations-enabling-json-web-token-support  need specific values, and the z/OSMF defaults are suitable for Zowe





## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

