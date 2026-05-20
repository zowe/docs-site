# Issue #4515: Issue with docs.zowe.org/v3.1.x/user-guide/mvd-configuration

**URL:** https://github.com/zowe/docs-site/issues/4515

**Created:** 2025-06-11T12:32:31Z

**Updated:** 2025-06-27T06:19:10Z

**Labels:** area: webui, area: Zowe App Framework

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

_Performance under high user Count: This is due to the absence of redundant workers, which can impact the system's efficiency when dealing with a large number of users._

Does this mean a high user count - eg 10,000 people (who may be doing nothing), or high activity such as 10 userids doing 1000 requests  a second.

Should it be  _redundant workers **threads**_

I think this may be trying to say
The app-server within Zowe can be run in cluster mode. Multiple instances are started, so providing more threads. They all share the same port.


_________________________

Can I configure the number of threads.  If so, the doc should say so.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

