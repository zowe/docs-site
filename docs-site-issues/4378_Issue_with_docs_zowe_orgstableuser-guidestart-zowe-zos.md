# Issue #4378: Issue with docs.zowe.org/stable/user-guide/start-zowe-zos

**URL:** https://github.com/zowe/docs-site/issues/4378

**Created:** 2025-05-06T09:11:23Z

**Updated:** 2025-05-21T15:23:08Z

**Labels:** area: zwe

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

The section on starting and stopping is very confusing

My started task is called  CCPSLSTC ( "to fit in with local standard")

This is the same as  ZWESLSTC    and I can start and stop it.

You need some words like

Starting and stopping Zowe main server

You can start and stop the main server using z/OS start and stop commands... see 
Starting and stopping Zowe main server ZWESLSTC on z/OS manually
or you can start it from Unix Servies using the zwe start --config ... command see 
Starting and stopping Zowe main server ZWESLSTC on z/OS with zwe server command


I tried using
zwe start --config /path/to/my/zowe.yaml

It needs to say 
It issues a command like


This command issue the operator command

 S ZWESLSTC,HAINST=S0W1,JOBNAME=ZWE1SV            

And the  job output is under job with name ZWE1SV in the spool.


This start command failed for me because my started task was not called  ZWESLSTC ( it is called CCPSLSTC)

_________________________

Under the topic

Starting and stopping Zowe main server ZWESLSTC on z/OS with zwe server command

The userid issuing this command needs permission to issue the start command on the console
S ZWESLSTC,HAINST=S0W1,JOBNAME=ZWE1SV            




<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

