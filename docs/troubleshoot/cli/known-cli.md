# Known Zowe CLI issues

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe&trade; CLI.

## Zowe Commands Fail with Secure Credential Errors

**Valid on Windows, macOS, and Linux**

**Symptoms:**

After you install Zowe CLI, and the installation appears to complete successfully, Zowe commands that load the secure credential store return error messages. For example, the following commands return error messages:

- `zowe config init`
- `zowe config secure`
- `zowe profiles create`
- Most Zowe commands that access your mainframe environment

This behavior occurs under the following conditions:

- npm version 8.11.0 or 8.12.0 is running on your computer.
- The computer on which you installed Zowe CLI cannot access the Internet or it has limited access to the Internet. Your site does not allow connections to https://github.com/.
- You installed Zowe CLI from a local package or from an NPM public online registry

**Solution:**

1. Define the `npm_config_global` environment variable. Issue the command that corresponds with your operating system:

    - **Windows Command Prompt:** `set npm_config_global=true`
    - **Windows PowerShell:** `$env:npm_config_global="true"`
    - **macOS/Linux Bash:** `export npm_config_global=true`
2. Install or reinstall Zowe CLI using your preferred installation method.
3. After the Zowe CLI installation completes, reset the `npm_config_global` environment variable. Issue the command that corresponds with your operating system:
    - **Windows Command Prompt:** `set npm_config_global=`
    - **Windows PowerShell:** `$env:npm_config_global=""`
    - **macOS/Linux Bash:** `export npm_config_global=`
4. Continue configuring Zowe CLI. Or, reissue a Zowe command that returned an error message. You should no longer get an error message.

## EACCESS error when issing `npm install` command

**Valid on Windows, Mac, or Linux**

**Symptom:**

An `EACCESS` error is returned when you issue the `npm install -g` command to install a package from Zowe.org or npm.

**Solution:**

To resolve the issue, follow the steps described in [Resolving EACCESS permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) in the npm documentation.

## *Command not found* message displays when issuing `npm install` commands

**Valid on all supported platforms**

**Symptom:**

When you issue NPM commands to install the CLI, the message *command not found* displays. The message indicates that Node.js and NPM are not installed on your computer, or that PATH does not contain the correct path to the NodeJS folder.

**Solution:**

To correct this behavior, verify the following:

- Node.js and NPM are installed.
- PATH contains the correct path to the NodeJS folder.

**More Information:** [System requirements for Zowe CLI](../../user-guide/systemrequirements-cli.md)

## `npm install -g `Command Fails Due to an EPERM Error

**Valid on Windows**

**Symptom:**

This behavior is due to a problem with Node Package Manager (npm). There
is an open issue on the npm GitHub repository to fix the defect.

**Solution:**

If you encounter this problem, some users report that repeatedly
attempting to install Zowe CLI yields success. Some users also
report success using the following workarounds:

  - Issue the `npm cache clean` command.

  - Uninstall and reinstall Zowe CLI. For more information,
    see [Install Zowe CLI](../../user-guide/cli-installcli.md).

  - `Add the --no-optional` flag to the end of the `npm install` command.

## `Sudo` syntax required to complete some installations

**Valid on Linux and macOS**

**Symptom:**

The installation fails on Linux or macOS.

**Solution:**

Depending on how you configured Node.js on Linux or macOS, you might need to add the prefix `sudo ` before the `npm install -g` command or the `npm uninstall -g` command. This step gives Node.js write access to the installation directory.

## `npm install -g` command fails due to `npm ERR! Cannot read property 'pause' of undefined` error

**Valid on Windows or Linux**

**Symptom:**

You receive the error message `npm ERR! Cannot read property 'pause' of undefined` when you attempt to install the product.

**Solution:**

This behavior is due to a problem with Node Package Manager (npm). If
you encounter this problem, revert to a previous version of npm that
does not contain this defect. To revert to a previous version of npm,
issue the following command:
```
npm install npm@5.3.0 -g
```

## Node.js commands do not respond as expected

**Valid on Windows or Linux**

**Symptom:**

You attempt to issue node.js commands and you do not receive the expected  output.

**Solution:**

There might be a program that is named *node* on your path. The Node.js installer automatically adds a program that is named *node* to your path. When there are pre-existing programs that are named *node* on your computer, the program that appears first in the path is used. To correct this behavior, change the order of the programs in the path so that Node.js appears first.

## Installation fails on Oracle Linux 6

**Valid on Oracle Linux 6**

**Symptom:**

You receive error messages when you attempt to install the product on an
Oracle Linux 6 operating system.

**Solution:**

Install the product on Oracle Linux 7 or another Linux or Windows OS. Zowe CLI is not compatible with Oracle Linux 6.

