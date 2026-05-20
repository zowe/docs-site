# Issue #4626: Issue with docs.zowe.org/v3.0.x/user-guide/ze-profiles/

**URL:** https://github.com/zowe/docs-site/issues/4626

**Created:** 2025-07-26T11:06:14Z

**Updated:** 2025-07-26T11:06:14Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

As a Zowe user, you can leverage the base profile functionality to access multiple services through Single Sign-on. Base profiles enable you to authenticate using Zowe API Mediation Layer (API ML). You can use base profiles with more than one service profile. For more information, see [Base Profiles](https://docs.zowe.org/v3.0.x/user-guide/cli-using-using-profiles-v1#base-profiles).


I do not see why base profiles leverage to multiple services with SSO
What is special about base profiles for Zowe apiml, that they are needed for APIML?

Another page says

_Base profiles: let you store connection information for use with one or more services. Your service profiles can pull information from- base profiles as needed, so that you can specify a common username and password once. The base profile can optionally store tokens to connect to Zowe API Mediation Layer, which improves security by enabling Multi-Factor Authentication (MFA) and Single Sign-on (SSO)._

(How does it store the tokens - Ive got "autoStore": false)  On the whole that paragraph makes perfect sense.



If I provide all of the parameters on a call to APIML - do I need a base profile?

It is not at all clear to me.
Im guessing that it is trying to say

_To be able to store the APIML JWT token across requests,  it is stored as part of the base profile entry._

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

