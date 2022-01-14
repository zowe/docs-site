# Using Daemon Mode (Technical Preview)

<Badge text="Technical Preview"/> Daemon mode is available in the `@next` version of Zowe CLI. The Zowe CLI @next release is a technical preview. Technical previews are for only testing and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Daemon mode will be included in the next major Zowe release, V2.0.0-LTS. You can also [install the @next release of Zowe CLI](cli-install-cli-next.md#install-zowe-cli-from-a-download).

## Feature overview

Daemon mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon). Running Zowe CLI as daemon lets Zowe absorb the one-time startup of Node.js modules, which results in significantly faster responses to Zowe commands.

**Important:** We **do not recommend** using daemon mode in an environment where multiple users use the same system. For example, a shared Linux server.

## Installation notes

The following notes apply to running Zowe in daemon mode:

- To enable daemon mode, ensure that you installed [the @next release of Zowe CLI](cli-install-cli-next.md).
- When you are running Zowe on a Windows operating system in a virtual environment (for example, Windows Sandbox), you might receive an error message that indicates that a library named VCRUNTIME140.dll is missing. To correct the error, install Visual C++ Redistributable for Visual Studio 2015. For more information, see [Download Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145).

## Enable daemon mode

The following steps describe how to enable daemon mode and how to configure Zowe to run in daemon mode constantly.

1. Open a terminal window and issue the following command:

   ```
   zowe daemon enable
   ```

   The command copies the Zowe executables for your operating system into the $ZOWE_CLI_HOME/bin (.zowe/bin) directory. The next command that you issue starts the daemon.
2. Add the path to the Zowe executables to the environment variables for your computer. For example:

   ```
   C:\Users\<user_ID>\.zowe\bin
   ```

   **Important!** Ensure that you position the path to your Zowe executables before the path into which NPM installed the Node.js script. For information about configuring environment variables, see the documentation for your computer's operating system.

   **Note:** Complete the environment variable configuration step (Step 2) only one time.

The following example illustrates running Zowe commands with the daemon mode enabled:

   ```
   zowe --version
   Starting a background process to increase performance ...
   7.0.0-next.202110211759
   
   zowe --version
   7.0.0-next.202110211759
   ```

## Disable daemon mode

You can disable Zowe from running in daemon mode at any time. For example, daemon mode lacks functionality that you desire, such as viewing colored-coded commands.

Open a terminal window and issue the following command:

```
zowe daemon disable
```

The disable command removes the Zowe executables from your .zowe/bin directory and disables daemon mode.

## Running Zowe commands in daemon mode

When you run Zowe in daemon mode, you run all Zowe commands as you normally run them. The first time you run a command, it starts the daemon in the background automatically and runs your desired Zowe command. Since the first Zowe command starts the daemon, the first command usually runs slower than a traditional Zowe command. However, subsequent Zowe commands run significantly faster. The daemon continues to run in the background until you close your terminal window.

**Note:** When you are running Zowe CLI in daemon using a Git Bash terminal on a Windows operating system, special characters might display using the wrong code page. For example, the default code page 437 renders a form-feed character (\f) as an emoji (♀️). To correct the problem, issue the command `chcp.com 65001` to change the code page to UTF-8. If you want the change to be persistent, add the command to your .bashrc file.