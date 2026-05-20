# Issue #4425: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4425

**Created:** 2025-05-10T10:16:17Z

**Updated:** 2025-12-16T10:21:25Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

it says

For each component, find the components.*.debug parameter and set the value to true:

 components.gateway.debug: true

By default, debug mode is disabled, and the components.*.debug is set to false.

Restart Zowe™.

You enabled debug mode for the API ML core services (API Catalog, API Gateway and Discovery service).

_______

can I just stop and restart the gateway compinent.. or must I restart zowe?

please explain how this  enables  debug mode for API Catalog, ... Discovery service if I didnt set the debug to true on these components.
Is the debug option more subtle than debug true|false


Please say where the output goes to.

I turned it on.. and nothing additional was generated



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->
it says
