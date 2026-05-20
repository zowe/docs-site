# Issue #4487: Issue with docs.zowe.org/stable/user-guide/configure-zos-system

**URL:** https://github.com/zowe/docs-site/issues/4487

**Created:** 2025-05-20T12:30:28Z

**Updated:** 2025-06-04T11:41:10Z

**Labels:** area: install and config

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
The text is not clear
_This security configuration is necessary for API ML to map the association between a z/OS user ID and a distributed user identity. A user running the API Gateway must have READ access to the SAF resource IRR.IDIDMAP.QUERY in the FACILITY class. To set up this security configuration, submit the ZWESECUR JCL member. For users upgrading from version 1.28 and lower, use the following configuration steps according to your ESM:_
_______
I think it is map from distributed user identity. to a z/OS userid - not the other way round
_____________

A user running the API Gateway 

is this the started task userid ? or the user trying to access zowe, eg from a browser?

I think is saying the Zowe started task userid.
_____________

What do you mean by a distributed user identify?  Is this a client digital certificate client sign on.  or a Linux/windows user id and password?
____

I would add words. "The IRR.IDIDMAP.QUERY profile controls access to the mapping of certificates to userids, such as with RACDCERT MAP command"






## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

