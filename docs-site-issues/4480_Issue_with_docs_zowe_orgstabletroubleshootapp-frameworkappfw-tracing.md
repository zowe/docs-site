# Issue #4480: Issue with docs.zowe.org/stable/troubleshoot/app-framework/appfw-tracing/

**URL:** https://github.com/zowe/docs-site/issues/4480

**Created:** 2025-05-18T13:41:14Z

**Updated:** 2025-05-21T14:50:44Z

**Labels:** area: Zowe App Framework

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

the doc says

Advanced debugging for ZSS
The Zowe YAML file section components.zss.logLevels controls the verbosity for every logger within the server.


but the para above says

components:
  app-server:
    logLevels:
      _zsf.auth: 3
      com.foo.*: 5


So when it says "every logger within the server." does this mean within zss ... or within the Zowe server, which includes app-server etc

________________


I dont see how to turn on zss  trace 

is it

components.
   zss.
      logLevels:
          _zss.traceLevel:  5  

We could do with an example

Where does the trace go to?  -please tell me

if I specify    _zss.traceLevel:  7 - does it turn on trace for all components? 

If I specify _zss.httpAuthTrace : 7 does it turn on just this component?

it is all not very clear.



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

