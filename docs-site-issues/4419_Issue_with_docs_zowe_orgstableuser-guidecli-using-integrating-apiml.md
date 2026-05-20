# Issue #4419: Issue with docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4419

**Created:** 2025-05-09T15:59:13Z

**Updated:** 2025-07-16T10:46:45Z

**Labels:** area: cli

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
The doc has

_If you already have a profile in your configuration for the service you want to connect to, use a text editor to open the applicable configuration file and **replace the port property with a basePath property** to enable the use of API ML.
A profile with a port number:
  "type": "zosmf",
    "properties": {
        "port": 443
    }

A profile with a base path:

"type": "zosmf",
    "properties": {
        "basePath": "/ibmzosmf/api/v1"
    }_


Is "A profile with a base path:" saying   "becomes  ...  or is it a different example from the port: 443 example.
________
Please add some words to explain how replace the port property with a basePath property   the session knows which port is used.
________________________

Please explain how I know what to put in the basepath value.   This is the first mention of basepath.


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

