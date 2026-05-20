# Issue #1963: Zowe Must Remain Vendor-Neutral

**URL:** https://github.com/zowe/docs-site/issues/1963

**Created:** 2022-01-11T21:12:10Z

**Updated:** 2025-03-14T14:43:15Z

**Labels:** type: enhancement, area: misc, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
In the Zowe documentation, any time it is considered important or necessary to make a reference or provide a link to a vendor' commercial offering, if must be made absolutely clear that the Zowe community does not (a) endorse the solution or (b) perform any validation to confirm ongoing compatibility with Zowe.

## Pages to Update
<!--https://docs.zowe.org/...-->
https://docs.zowe.org/stable/user-guide/systemrequirements-zos/#multi-factor-authentication-mfa
(Note - this might not be the only page requiring an update.  A thorough review is recommended by the ZAC.)

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->
n/a

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->
The phrase "The following are known to work:" preceding the link to the IBM MFA Solution should be replaced with a standard (can be repeated anywhere in the doc as needed) paragraph which clearly and concisely makes the point that the Zowe community does not endorse or validate the commercial offering.

Suggest this text as a new paragraph:
The following commercial product offerings have been identified as compatible with Zowe for this purpose.  Please note that Zowe does not endorse these specific offerings for this purpose, nor does the Zowe community perform any ongoing validation of the compatibility of these solutions with Zowe for this purpose.  For more information please contact your commercial vendor. 

## Additional context
<!--Add any other context about the documentation error here.-->
The doc link provided for MFA may not be the only place in the Zowe doc where a specific commercial product is called out or linked.  I recommend a thorough review of the doc for commercial product references, and that similar text be included in front of those references as well.   

