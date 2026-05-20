# Issue #4712: Issue with docs.zowe.org/stable/user-guide/installandconfig

**URL:** https://github.com/zowe/docs-site/issues/4712

**Created:** 2025-09-18T12:38:05Z

**Updated:** 2025-09-18T12:38:05Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Most of this page is not about Preparing for installation.

There is too much information which would be better suited else where.

This topic is called preparing for installation....  question:after I've been through it - what have I prepared?  ....  answer: not a lot.

having been through the install ( several times)....  I kept saying no... no no.

For example 

_Zowe has the following started tasks:

    ZWESISTC
    This started task corresponds to a cross memory server that the Zowe desktop uses to perform APF-authorized code. For more information about the cross memory server, and the cross memory auxiliary server ZWESASTC see [Configuring the Zowe cross memory server](https://docs.zowe.org/stable/user-guide/configure-xmem-server)._

- This is not strictly true.  I am going to install zowe v3.3 in parallel to V3.2  and will call it zoweI33
- _a cross memory server that the Zowe desktop_  what does this mean... is this the Zowe cli?
-  corresponds to .. is it or is it not?       if it does correspond ...please give the name of the server that cross memory server that the Zowe desktop uses




Better words would be

Zowe has the following started tasks:    

1. The main Zowe task which does most of the work..  The Zowe doc  refers to this as ZWESLSTC.  A different  Zowe instance will have a separate ZWESLSTC started task instance.
note:  It is the Zowe instance... it does not start and stop them.  It can start and stop Zowe component
2. a cross memory server that the Zowe uses to perform APF-authorized code. The Zowe documentation refers to this as the ZWESISTC task
3. An optional cross memory auxiliary server that is used under some situations in support of a Zowe extension. The auxiliary server is started, controlled, and stopped by the cross memory server, and does not need to be started manually.  The Zowe doc refers to this as ZWESASTC. 

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->
Perhaps restructure this chapter ( or rename it to background information)
As a sysprog planning a Zowe install I would expect a list of actions I need to take.
For example  see https://colinpaice.blog/2025/05/18/zowe-planning/

As sysprog  would expect to create a work plan, so they can give the security work to the RACF people, the TCP work to the networking team,
the MVS configuration to the MVS system programmers.  etc.

These might just be some one line topics - and links to the Zowe documentation on what to do.

A sysprog needs to give the list of work items ( so the items can go through the normal approval process)



## Additional context
<!--Add any other context about the documentation error here.-->

