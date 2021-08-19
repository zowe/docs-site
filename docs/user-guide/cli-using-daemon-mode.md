# Using Daemon Mode (Technical Preview) <!-- omit in toc -->

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md).

**Table of Contents:**
- [Feature overview](#feature-overview)
- [Starting Zowe in daemon mode](#starting-zowe-in-daemon-mode)

## Feature overview
Daemon Mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon).

## Starting Zowe in daemon mode
Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md).


To start Zowe CLI in daemon mode:

1. Issue the command:

   Windows:
   ```
   start zowe --daemon
   ```   
   Linux:
   ```
   zowe --daemon &
   ```
   The CLI responds with prompts for a username and password.

2. Enter the username and password.
3. Use `zowex` as your primary command instead of `zowe`.
   
   Example:
   ```
   zowex zosmf check status
   ```
