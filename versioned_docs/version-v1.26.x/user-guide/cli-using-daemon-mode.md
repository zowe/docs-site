# Using Daemon Mode (Technical Preview)

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md#install-zowe-cli-from-a-download).

**Table of Contents:**

- [Feature overview](#feature-overview)
- [Install the zowe native executable](#install-the-zowe-native-executable)
- [Running zowe commands with the zowe executable](#running-zowe-commands-with-zowe-executable)

## Feature overview

Daemon Mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon).

## Install the zowe native executable

You can download and install the zowe native executable from Zowe Downloads (preferred) or from the Zowe Github repository. To install the zowe native executable from Zowe Downloads, see [Install Zowe CLI from a download](cli-install-cli-next.md#install-zowe-cli-from-a-download).

To download and install the zowe native executable from the Zowe Github repository:

1. Navigate to the Zowe CLI GitHub [repository](https://github.com/zowe/zowe-cli)
2. Under the **Release** section, click **Native Client Release**.
   The Download page is displayed.
3. Click the link to download the executable (.tgz file) for your operating system.
4. Unzip the zowe .tgz file and place the zowe (or zowe.exe) file into a directory which occurs on your PATH earlier than the directory containing the NodeJS zowe command.

**Note:** The Mac executable may need an exception for an unidentified developer: [Open a Mac app from an unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac)

## Running zowe commands with the zowe executable

Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md) and the [zowe native executable](#install-the-zowex-native-executable).

Run any zowe command as you normally would. The first time you run any zowe command, the command will automatically start a daemon in the background. It will then run your desired command. Since that first command must start the daemon, that first zowe command will actually run slower than a traditional zowe command. However, every zowe command afterward will run significantly faster. The daemon will continue to run in the background until you close your terminal window.

Example:

```text
zowe --version
Starting a background process to increase performance ...
7.0.0-next.202110211759

zowe --version
7.0.0-next.202110211759
```
