# Using daemon mode

Daemon mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon). Running Zowe CLI as daemon lets Zowe absorb the one-time startup of Node.js modules, which results in significantly faster responses to Zowe commands.

When you run Zowe in daemon mode, you run all Zowe commands as you normally run them. The first time you run a command, it starts the daemon in the background automatically and runs your desired Zowe command. Since the first Zowe command starts the daemon, the first command usually runs slower than a traditional Zowe command. However, subsequent Zowe commands run significantly faster. The daemon continues to run in the background until you close your terminal window.

**Important:** We do not recommend using daemon mode in an environment where multiple users use the same system. For example, a shared Linux server.

## Preparing for installation

Review the following installation notes before you configure Zowe CLI to run in daemon mode:

- Daemon mode does not function on z/OS UNIX System Services (USS) systems.
- When you want to run Zowe CLI to run in daemon mode on **z/Linux** operating systems, you must build the daemon mode binary on the z/Linux systems. For information about how to build the binary, see [Configure Secure Credential Store on headless Linux operating systems](cli-configure-scs-on-headless-linux-os.md). The sections [Enable daemon mode](#enable-daemon-mode) and [Disable daemon mode](#disable-daemon-mode) (in this article) **do not apply** to running Zowe CLI in daemon mode on z/Linux operating systems.
- We do not recommend using daemon mode in an environment where multiple users use the same system. For example, a shared Linux server.
- When you are running Zowe on a Windows operating system in a virtual environment (for example, Windows Sandbox), you might receive an error message that indicates that a library named `VCRUNTIME140.dll` is missing. To correct the error, install Visual C++ Redistributable for Visual Studio 2015. For more information, see [Download Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145). 

## Enable daemon mode

The following steps describe how to enable daemon mode and how to configure Zowe to run Zowe CLI constantly in daemon mode.

1. Open a terminal window and issue the following command:

   ```
   zowe daemon enable
   ```

   The command copies the Zowe executables for your operating system into the `$ZOWE_CLI_HOME/bin` (`.zowe/bin`) directory. The next command that you issue starts the daemon.
2. Add the path to the Zowe executable to your PATH environment variable. For example:

   ```
   C:\Users\<user_ID>\.zowe\bin
   ```

   **Important!** Ensure that you position the path to your Zowe executables before the path into which NPM installed the Node.js script. For example, `C:\Program Files\nodejs\zowe.cmd`. For information about configuring environment variables, see the documentation for your computer's operating system.
   
   **Alternative configuration**: By default, the daemon binary creates or reuses a file in the user's home directory each time a Zowe CLI command runs. In some cases, this behavior might be undesirable. To change the location that the daemon uses, see [Setting CLI daemon mode properties](../user-guide/cli-configuringcli-ev.md#setting-cli-daemon-mode-properties).

   **Note:** Complete the environment variable configuration step (Step 2) only once.

The following example illustrates running Zowe CLI commands with daemon mode enabled:

   ```
   zowe --version
   Starting a background process to increase performance ...
   7.0.0-next.202110211759
   
   zowe --version
   7.0.0-next.202110211759
   ```
**Note:** When you are running Zowe CLI in daemon mode using a Git Bash terminal on a Windows operating system, special characters might display using the wrong code page. For example, the default code page 437 renders a form-feed character (\f) as an emoji (♀️). To correct the problem, issue the command `chcp.com 65001` to change the code page to UTF-8. If you want the change to be persistent, add the command to your `.bashrc` file.

## Restart daemon mode

Daemon mode is a long-running background process (waits for work) that significantly improves Zowe CLI performance. When you make changes to your work environment, daemon mode does not capture the changes. Restarting daemon mode lets the daemon capture the changes. Issue the following command to stop the currently running daemon and start a new daemon:

```
zowe daemon restart
```

You **must** restart daemon mode under the following scenarios:

- You changed the value of any of the following [Zowe CLI environment variables](cli-configuringcli-ev.md):
  - `ZOWE_CLI_HOME`
  - `ZOWE_APP_LOG_LEVEL`
  - `ZOWE_IMPERATIVE_LOG_LEVEL`
- You installed, updated, or uninstalled a plug-in.
- You installed a newer version of Zowe CLI and daemon mode **was running** while you installed the newer version of Zowe CLI.

   **Note:** When you install another version of Zowe CLI, you should always run the `zowe daemon enable` command again.
- You issued a Zowe command and the following message appeared:
   ```
   You may be running mismatched versions of Zowe executable and Zowe daemon.
   ```

## Disable daemon mode

You can disable Zowe from running in daemon mode at any time. For example, daemon mode lacks functionality that you desire, such as viewing colored-coded commands.

1. Open a terminal window and issue the following command:

    ```
    zowe daemon disable
    ```

    The disable command stops daemon mode, removes the Zowe executables from your `.zowe/bin` directory, and disables daemon mode.