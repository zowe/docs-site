# Issue #4530: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4530

**Created:** 2025-06-14T16:28:45Z

**Updated:** 2025-06-27T06:19:43Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

The doc says 

_{

"configuredLevel": "level"

}_


but the example has 
_http POST https://hostname:port/application/loggers/org.zowe.apiml.enable.model configuredLevel=WARN_

without  {}, without "" and with = instead of ":"...

This feels confusing, and I do not know what to specify.  It may be different for curl and httpie
## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

