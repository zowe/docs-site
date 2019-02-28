# Troubleshooting Zowe CLI

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe CLI.

### *Command not found* message displays when issuing npm install commands

**Valid on all supported platforms**

**Symptom:**

When you issue nmp commands to install Zowe CLI, the message *command not found* displays in your CLI.

**Solution:**

The *command not found* message displays because Node.js and NPM are not installed on your computer. To correct this behavior, install Node.js and NPM and reissue the npm command to install Zowe CLI.

**More Information:** [System requirements for Zowe CLI](../user-guide/systemrequirements.md)

### `npm install -g `Command Fails Due to an EPERM Error

**Valid on Windows**

**Symptom:**

This behavior is due to a problem with Node Package Manager (npm). There
is an open issue on the npm GitHub repository to fix the defect.

**Solution:**

If you encounter this problem, some users report that repeatedly
attempting to install Zowe CLI yields success. Some users also
report success using the following workarounds:

  - Issue the `npm cache clean` command.

  - Uninstall and reinstall Zowe CLI. For more information,
    see [Install Zowe CLI](../user-guide/cli-installcli.html).

  - `Add the --no-optional` flag to the end of the `npm install` command.

### `Sudo` syntax required to complete some installations

**Valid on Linux and macOS**

**Symptom:**

The installation fails on Linux or macOS. 

**Solution:**

Depending on how you configured Node.js on Linux or macOS, you might need to add the prefix `sudo ` before the `npm install -g` command or the `npm uninstall -g` command. This step gives Node.js write access to the installation directory.

### `npm install -g` command fails due to `npm ERR! Cannot read property 'pause' of undefined` error

**Valid on Windows or Linux**

**Symptom:**

You receive the error message `npm ERR! Cannot read property 'pause' of undefined` when you attempt to install the product.

**Solution:**

This behavior is due to a problem with Node Package Manager (npm). If
you encounter this problem, revert to a previous version of npm that
does not contain this defect. To revert to a previous version of npm,
issue the following command:
```
npm install npm@5.3.0 -g
```

### Node.js commands do not respond as expected

**Valid on Windows or Linux**

**Symptom:**

You attempt to issue node.js commands and you do not receive the expected  output.

**Solution:**

There might be a program that is named *node* on your path. The Node.js installer automatically adds a program that is named *node* to your path. When there are pre-existing programs that are named *node* on your computer, the program that appears first in the path is used. To correct this behavior, change the order of the programs in the path so that Node.js appears first.

### Installation fails on Oracle Linux 6

**Valid on Oracle Linux 6**

**Symptom:**

You receive error messages when you attempt to install the product on an
Oracle Linux 6 operating system. 

**Solution:**

Install the product on Oracle Linux 7 or another Linux or Windows OS. Zowe CLI is not compatible with Oracle Linux 6.

