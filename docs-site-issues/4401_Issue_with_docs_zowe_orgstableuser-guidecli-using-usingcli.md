# Issue #4401: Issue with docs.zowe.org/stable/user-guide/cli-using-usingcli

**URL:** https://github.com/zowe/docs-site/issues/4401

**Created:** 2025-05-07T19:18:04Z

**Updated:** 2025-06-19T10:03:16Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

I have no idea how to set up zowe on linux to talk to z/OS.

There is a page which said install npm etc... and some example commands which use port 123.    This assumes that z/OSMF has a non TLS port.  I only have z/OSMF with a TLS protected port.

I tried using the zowe -h command to show how to pass a public and private key- there is nothing.

https://medium.com/zowe/zowe-cli-and-client-certificates-dae341f8f52a talks about "Zowe CLI profile"

Searching for this  did not help me.   There was a hit
https://ibm.github.io/zowe-cli-cics-deploy-plugin/cdp-Zowe-CLI-profiles


but I'm not using CICS.

I see there is zowe teams...  but I do not know what this is and how it is connected to a CLI profile and specifying a public/private key.


https://docs.zowe.org/stable/user-guide/cli-using-creating-profiles

discusses editing a profile - but I've no idea what file is being edited - or how to specify it with my zowe command
==============================================================
We could do with a page or two for people who have never used the zowe command interface before and are using tls.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

