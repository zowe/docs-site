# Using Daemon Mode (Technical Preview) <!-- omit in toc -->

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md).

**Table of Contents:**
- [Feature overview](#feature-overview)
  - [Benefits](#benefits)
- [Rust Client](#rust-client)
- [Imperative](#imperative)
- [Zowe CLI Server](#zowe-cli-server)
- [Starting Zowe in daemon mode](#starting-zowe-in-daemon-mode)



## Feature overview
Under some conditions, Zowe CLI start up time can be may be three to fifteen seconds (measured with V8). A contributing factor is the startup of the Node.js runtime.

Daemon mode allows you to run Zowe CLI as a persistent process daemon. Daemon mode enables a one-time startup of the Node.js and a native-built, Rust client to communicate with the daemon via TCP/IP sockets.


### Benefits
Initial testing shows the potential benefits of daemon mode:
* Root level help (`zowe --help`) response time is reduced from approximately 3 seconds to just under 1 second.


## Rust Client
A native Rust client calls the Zowe CLI persistent process (daemon). An env var can be set for the port to connect to tcp socket. ZOWE_DAEMON=<PORT> environmental variable used or default 4000.

Rust binderies are released on GitHub.

Rust client sets --daemon-client-directory (or --dcd) for Zowe CLI / imperative usage which is the daemon client directory. This flag is hidden from Zowe help display since it's not intended for end users.

Rust client is called zowex.exe while in PoC / validation stage. Otherwise, we might call it zowe for seamless transition. 
## Imperative

Imperative is updated in several places to write to a stream in addition to / instead of stdout & stderr. Stream is passed in yargs “context” which is our own user data.

dcd global flag added for Zowe CLI operations that implicitly depend on the current working directory. For example, Zowe CLI daemon could be running at any arbitrary location on the system; however, we want zowex to operate against whatever directory it was run. --dcd allows for alternate dcd.

## Zowe CLI Server
Zowe CLI is updated to launch a server if an undocumented --daemon parm is detected. The server is a simple tcpip server.

server startup is managed by packages/cli/Processor.ts
daemon communication is managed by packages/cli/DaemonClient.ts

## Starting Zowe in daemon mode

Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md).
