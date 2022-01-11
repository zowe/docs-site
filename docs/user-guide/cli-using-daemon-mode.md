# Using Daemon Mode (Technical Preview)

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for only testing and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md#install-zowe-cli-from-a-download).

- [Feature overview](#feature-overview)
- [Installation notes](#installation-notes)
- [Running Zowe commands in daemon mode](#running-zowe-commands-in-daemon-mode)

## Feature overview

Daemon mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon). Running Zowe CLI as daemon lets Zowe absorb the one-time startup of Node.js modules, which resusts in significantly faster responses to Zowe commands.

**Important:** We do not recommend using daemon mode in an environment where multiple users use the same system. For example, a shared Linux server.

## Installation notes

The following notes apply to running Zowe in daemon mode:

- To enable daemon mode, ensure that you installed [the @next release of Zowe CLI](cli-install-cli-next.md).
- When you are running Zowe on a Windows operating system in a virtual environment (for example, Windows Sandbox), you might receive an error message that indicates that a library named VCRUNTIME140.dll is missing. To correct the error, install Visual C++ Redistributable for Visual Studio 2015. For more information, see [Download Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145).
- When you are running Zowe on a Mac operating system, the Mac executable might need an exception for an unidentified developer. For more information, see [Open a Mac app from an unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac).

## Running Zowe commands in daemon mode

When you run Zowe in daemon mode, you run all Zowe commands as you normally run them. The first time you run a command, it starts the daemon in the background automatically and runs your desired Zowe command. Since the first Zowe command starts the daemon, the first command usually runs slower than a traditional Zowe command. However, subsequent Zowe commands run significantly faster. The daemon continues to run in the background until you close your terminal window.

If you want to run Zowe in daemon mode constantly, add the path of the $ZOWE_CLI_HOME/bin (.zowe/bin) executables to the directory path of your computer's environment variables. When you configure Zowe to constantly run in daemon mode, daemon mode starts automatically after you issue the first Zowe command. When you open multiple terminal windows and issue Zowe commands, the Zowe commands in all of the terminal windows run in daemon mode.

**Enable daemon mode**

The following steps describe how to enable daemon mode and how to (optionally) configure Zowe to run in daemon mode constantly.

1. Open a terminal window and issue the following command:
   ```
   zowe daemon enable
   ```
   The command copies the Zowe executables for your operating system into the $ZOWE_CLI_HOME/bin (.zowe/bin) directory. The next command that you issue starts the daemon.
2. (Optional) Add the path to the Zowe executables to the environment variables for your computer. For example:
   ```
   C:\Users\<user_ID>\.zowe\bin
   ```
   **Important!** Ensure that you position the path to your Zowe executables before the path into which NPM installed the Node.js script. For information about configuring environment variables, see the documentation for your computer's operating system.

   **Note:** Complete the environment variable configuration step (Step 2) only one time.

Example:
   ```zowe --version
   Starting a background process to increase performance ...
   7.0.0-next.202110211759
   
   zowe --version
   7.0.0-next.202110211759
   ```
**Disable daemon mode**

You can disable Zowe from running in daemon mode at any time. For example, daemon mode lacks functionality that you desire, such as viewing colored-coded commands.

Open a terminal window and issue the following command:
```
zowe daemon disable
```

The disable command removes the Zowe executables from your .zowe/bin directory and disables daemon mode.