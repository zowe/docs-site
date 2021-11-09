# Using Daemon Mode (Technical Preview)

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md#install-zowe-cli-from-a-download).

**Table of Contents:**
- [Feature overview](#feature-overview)
- [Install the zowex native executable](#install-the-zowex-native-executable)
- [Starting Zowe in daemon mode](#starting-zowe-in-daemon-mode)

## Feature overview
Daemon Mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon).

## Install the zowex native executable
You can download and install the zowex native executable from Zowe Downloads (preferred) or from the Zowe Github repository. To install the zowex native executable from Zowe Downloads, see [Install Zowe CLI from a download](cli-install-cli-next.md#install-zowe-cli-from-a-download).

To download and install the zowex native executable from the Zowe Github repository:
1. Navigate to the Zowe CLI GitHub [repository](https://github.com/zowe/zowe-cli)
2. Under the **Release** section, click **Native Client Release**.
   The Download page is displayed.
3. Click the link to download the executable (.tgz file) for your operating system.
4. Unzip the zowex .tgz file and place the zowex (or zowex.exe) file into a directory which occurs on your PATH earlier than the directory containing the NodeJS zowe command.


## Starting Zowe in daemon mode
Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md) and the [zowex native executable](#install-the-zowex-native-executable).


To start Zowe CLI in daemon mode:

1. Issue the command:
   Windows command prompt (cmd.exe):
   ```
   start zowe --daemon
   ```   
   Linux or Windows PowerShell:
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
