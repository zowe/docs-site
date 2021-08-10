# Using Daemon Mode (Technical Preview) <!-- omit in toc -->

<Badge text="Technical Preview"/> Deamon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Global profiles will be included in the next major Zowe release, V2.0.0-LTS. Otherwise, you can [install the @next release of Zowe CLI](cli-install-cli-next.md).

**Table of Contents:**
- [Feature overview](#feature-overview)
  - [Benefits](#benefits)



## Feature overview
Zowe CLI start up time can be slow 3 - 15 seconds. Part of the reason this operation can be slow is the overhead involved in startup of the Node.js runtime (measured with V8 instrumentations).

We can run Zowe CLI as a persistent process “daemon” to have a one-time startup of the Node.js cost and have a native-built, Rust client to communicate with the daemon via TCP/IP sockets.


### Benefits
Root level help, zowe --help response time is reduced from ~3 seconds to just under ` second in daemon mode.

In testing a solution, the root command tree takes longer to execute than lower level command tree items, e.g. zowe -h is observably slower than zowe jobs list -h which has near instantaneous response time

Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md).
