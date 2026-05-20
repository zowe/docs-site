# Issue #4495: Issue with docs.zowe.org/stable/user-guide/api-mediation/configuration-saf-resource-checking

**URL:** https://github.com/zowe/docs-site/issues/4495

**Created:** 2025-05-25T09:37:42Z

**Updated:** 2025-12-16T10:21:32Z

**Labels:** area: apiml, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

_Verification of the SAF resource is possible by any of the following three providers:

    native
    The Native JZOS classes from Java are used to determine SAF resource access. This is the default provider.

    Note: This provider cannot be used off-platform.

    endpoint
    The endpoint provider relies on APIs such as through a REST endpoint call (for example ZSS). This option is disabled by default. In Zowe, ZSS provides the API to check for SAF resource authorization._


We could do with some information as to which is recommended.  For example why would I use endpoint?  Is there a difference in cost, or performance
(In fact what is end point .. my end point is my laptop running the rest command... so this is not clear to me)
_______________
Is this for the scenario where I run  Zowe on Linux - and this sends the request up to Z/os over ZSS to get to a backend Zowe

_____________
If Zss provids the API...  please can you give a link to it, so I can use it.



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

