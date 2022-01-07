# Using Daemon Mode (Technical Preview)

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are only for testing and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md#install-zowe-cli-from-a-download).

**Table of Contents:**

- [Feature overview](#feature-overview)
- [Install the zowe native executable](#install-the-zowe-native-executable)
- [Installation notes](#installation-notes)
- [Running zowe commands with the zowe executable](#running-zowe-commands-with-zowe-executable)

## Feature overview

Daemon Mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon).

## Install the zowe native executable

You can download and install the zowe native executable from Zowe Downloads (preferred method) or from the Zowe Github repository. To install the zowe native executable from Zowe Downloads, see [Install Zowe CLI from a download](cli-install-cli-next.md#install-zowe-cli-from-a-download).

To download and install the zowe native executable from the Zowe Github repository:

1. Open the Zowe CLI GitHub [repository](https://github.com/zowe/zowe-cli).
2. Under the **Releases** section on the right side of the page, click **Native Client Release** to open the download page.
3. Download the executable (.tgz file) for your operating system.
4. Unzip the zowe .tgz file and place the zowe (or zowe.exe) file into a directory that occurs on your PATH earlier than the directory containing the NodeJS zowe command.

### Installation Notes

- If you are running CLI on a Windows operating system in a virtual environment (for example, Windows Sandbox), you might receive an error message that indicates that a library named VCRUNTIME140.dll is missing. To correct the error, install Visual C++ Redistributable for Visual Studio 2015. For more information, see [Download Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145).
- If you are running CLI on a Mac operating system, the Mac executable might need an exception for an unidentified developer. For more information, see [Open a Mac app from an unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac).

## Running zowe commands with the zowe executable

Verify that you installed [the @next release of Zowe CLI](cli-install-cli-next.md) and the [zowe native executable](#install-the-zowex-native-executable).

Run any zowe command as you normally would. The first time you run any zowe command, the command automatically starts a daemon in the background. It then runs your desired command. Since the first command must start the daemon, the first zowe command actually runs slower than a traditional zowe command. However, every zowe command afterward runs significantly faster. The daemon continues to run in the background until you close your terminal window.

Example:

```text
zowe --version
Starting a background process to increase performance ...
7.0.0-next.202110211759

zowe --version
7.0.0-next.202110211759
```
