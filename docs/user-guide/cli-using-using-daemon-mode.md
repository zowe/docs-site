# Configuring daemon mode

Daemon mode significantly improves the performance of Zowe CLI commands by running Zowe CLI as a persistent background process (daemon). Running Zowe CLI as daemon lets Zowe absorb the one-time startup of Node.js modules, which results in significantly faster responses to Zowe commands.

:::info Required roles: Security administrator, DevOps architect
:::

When you run Zowe CLI in daemon mode, you run all Zowe commands as you normally run them. The first time you run a command, it starts the daemon in the background automatically and runs your desired Zowe command. Since the first Zowe command starts the daemon, the first command usually runs slower than a traditional Zowe command. However, subsequent Zowe commands run significantly faster. The daemon continues to run in the background until you close your terminal window.

## Preparing for installation

Review the following installation notes before you configure Zowe CLI to run in daemon mode:

- Daemon mode does not function on z/OS UNIX System Services (USS) systems.
- When you want Zowe CLI to run in daemon mode on z/Linux operating systems, you must build the daemon mode binary on the z/Linux systems. For information about how to build the binary, see [Configuring daemon mode on z/Linux operating systems](../user-guide/cli-configure-daemon-on-zlinux-os.md). The sections [Enabling daemon mode](#enabling-daemon-mode) and [Disabling daemon mode](#disabling-daemon-mode) (in this article) **do not apply** to running Zowe CLI in daemon mode on z/Linux operating systems.
- We do not recommend using daemon mode in an environment where multiple users use the same system. For example, a shared Linux server. This could result in increased consumption of system resources.
- When you are running Zowe on a Windows operating system in a virtual environment (for example, Windows Sandbox), you might receive an error message that indicates that a library named `VCRUNTIME140.dll` is missing. To correct the error, install Visual C++ Redistributable for Visual Studio 2015. For more information, see [Download Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145) in the Microsoft Download Center.

## Enabling daemon mode

To enable daemon mode and configure Zowe to run Zowe CLI constantly in daemon mode:

1. Open a terminal window and issue the following command:

   ```
   zowe daemon enable
   ```

   The command copies the Zowe executable for your operating system into the `$ZOWE_CLI_HOME/bin` (`.zowe/bin`) directory. The next command that you issue starts the daemon.

2. Add the binary file path to the Zowe executable to your PATH environment variable. For example:

   ```
   C:\Users\<user_ID>\.zowe\bin
   ```

   :::info Important
   
   Ensure that you position the path to your Zowe executable before the path into which NPM installed the Node.js script. For example, `C:\Program Files\nodejs\zowe.cmd`. For information about configuring environment variables, see the documentation for your computer's operating system.

   :::

   You have successfully configured Zowe CLI to run on daemon mode. Each time a Zowe CLI command is issued, the daemon binary is loaded from the user's home directory to run the Zowe executable.
   
   :::note

   In some cases, using the home directory might be undesirable. (For example, the home directory resides on a network drive and has poor file performance.) To change the location that the daemon uses, see [Setting CLI daemon mode properties](../user-guide/cli-configuringcli-ev.md#setting-cli-daemon-mode-properties).

   :::

## Restarting daemon mode

Daemon mode is a long-running background process that significantly improves Zowe CLI performance by, essentially, waiting for work to perform. When you make changes to your work environment, daemon mode does not capture the changes.

Restarting daemon mode lets the daemon capture the changes.

To stop the currently running daemon and start a new daemon, open a command line window and issue the following command:

```
zowe daemon restart
```

### Changes that require daemon mode restart

You must restart daemon mode under the following scenarios:

- You changed the value of any of the following [Zowe CLI environment variables](cli-configuringcli-ev.md):
  - `ZOWE_CLI_HOME`
  - `ZOWE_APP_LOG_LEVEL`
  - `ZOWE_IMPERATIVE_LOG_LEVEL`
- You installed, updated, or uninstalled a plug-in.
- You installed a newer version of Zowe CLI and daemon mode was running while you installed the newer version of Zowe CLI.

:::note

When you install another version of Zowe CLI, you should always run the `zowe daemon enable` command again.

:::

- You issued a Zowe command and the following message displays:
   ```
   You may be running mismatched versions of Zowe executable and Zowe daemon.
   ```

- You created or updated the `.zowe.env.json` file in your home directory or the path set in the `ZOWE_CLI_HOME` environment variable. See [Configuring an environment variables file](../user-guide/cli-configuringcli-evfile) for more information.

## Disabling daemon mode

You can disable Zowe CLI from running in daemon mode at any time. For example, if the daemon experiences an unexpected error.

To disable daemon mode, open a terminal window and issue the following command:

   ```
   zowe daemon disable
   ```

The `disable` command stops daemon mode, removes the Zowe executable from your `.zowe/bin` directory, and disables daemon mode.
