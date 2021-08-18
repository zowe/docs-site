# Using Daemon Mode (Technical Preview) <!-- omit in toc -->

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md).

**Table of Contents:**
- [Feature overview](#feature-overview)
  - [Benefits](#benefits)
  - [Rust client](#rust-client)
  - [Imperative](#imperative)
  - [Zowe CLI Server](#zowe-cli-server)
- [Starting Zowe in daemon mode](#starting-zowe-in-daemon-mode)



## Feature overview
Zowe CLI start up can take as long as fifteen seconds. A contributing factor is the startup of the Node.js runtime.

Daemon mode saves time by running Zowe CLI as a persistent background process (daemon). Using daemon mode enables a one-time startup of the Node.js runtime and a native-built Rust client to communicate with the daemon via TCP/IP sockets.
* The `zowex` Rust client calls pass Zowe commands to the server via TCP writing
* The Zowe server responds with text data from command output as it normally would, but response is directed towards the socket connection instead of the console

Certain Zowe CLI features such as progress bars, writing to `stderr`, and prompting for user input use a lightweight protocol built onto the server/client communication. The protocol consists of headers that begin with `x-zowe-daemon-`. If the header is detected (either on the client or the server side), it is parsed to control the behavior between the client and the server.

### Benefits
Initial testing shows the potential benefits of daemon mode:
* Root level help (`zowe --help`) response time is reduced from approximately three seconds to under one second.

### Rust client
The native-built Rust client communicate with the Zowe CLI persistent process (daemon) via TCP/IP sockets. Set the environmental variable (`ZOWE_DAEMON=<PORT>`) to connect to the TCP socket. The default port value is 4000.

### Imperative
Imperative is updated in several places to write to a stream in addition to / instead of `stdout` and `stderr`. Stream is passed in yargs “context” which is our own user data.

dcd global flag added for Zowe CLI operations that implicitly depend on the current working directory. For example, Zowe CLI daemon could be running at any arbitrary location on the system; however, we want zowex to operate against whatever directory it was run. --dcd allows for alternate dcd.

DaemonUtils.ts in imperative describes some rules for headers sent from server to client.

All headers must appear on the same line without newline, are separated by a semi-colon and may contain PRECEDING data that is not part of a header.

### Zowe CLI Server
Zowe CLI is updated to launch a server if an undocumented --daemon parameter is detected. The server is a simple TCP/IP server.

server startup is managed by packages/cli/Processor.ts
daemon communication is managed by packages/cli/DaemonClient.ts

## Starting Zowe in daemon mode

To start Zowe CLI in daemon mode:

1. Issue the command:

   ```
   zowe --daemon
   ```
   The CLI responds with prompts for a username and password.

2. Enter the username and password.
   
  

Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md).
