# Installing Zowe CLI plug-ins

Use commands in the `plugins` command group to install and manage Zowe&trade; CLI plug-ins.

**Important!** Plug-ins can gain control of your CLI application legitimately during the execution of commands. Install third-party plug-ins at your own risk. We make no warranties regarding the use of third-party plug-ins.

You can install the following Zowe plug-ins:
- IBM® CICS® Plug-in for Zowe CLI
- IBM® Db2® Plug-in for Zowe CLI
- [Third-party Zowe Conformant Plug-ins](https://www.openmainframeproject.org/projects/zowe/conformance)

Use either of the following methods to install plug-ins:

- Install from an online NPM registry. Use this method when your computer ***can*** access the Internet.

    For more information, see [Installing plug-ins from an online registry](#installing-plug-ins-from-an-online-registry).

- Install from a local package. With this method, you download and install the plug-ins from a bundled set of `.tgz` files. Use this method when your computer ***cannot*** access the Internet.

    For more information, see [Installing plug-ins from a local package](#installing-plug-ins-from-a-local-package).

## Installing plug-ins from an online registry

Install Zowe CLI plug-ins using npm commands on Windows, Mac, and Linux. The procedures in this article assume that you previously installed the core CLI.

**Follow these steps:**

1. Meet the [software requirements for each plug-in](cli-swreqplugins.md) that you install.

2.  Issue the following command to install a plug-in from public npm:

      ```
      zowe plugins install <my-plugin>
      ```

    **Note:** Replace `<my-plugin>` with the installation command syntax in the following table:

    | Plug-in | Syntax |
    |---------|-----------------------------|
    | IBM CICS Plug-in for Zowe CLI | `@zowe/cics-for-zowe-cli@zowe-v2-lts` |
    | IBM Db2 Plug-in for Zowe CLI| `@zowe/db2-for-zowe-cli@zowe-v2-lts` |
    | IBM z/OS FTP Plug-in for Zowe CLI | `@zowe/zos-ftp-for-zowe-cli@zowe-v2-lts` |
    | IBM IMS Plug-in for Zowe CLI | `@zowe/ims-for-zowe-cli@zowe-v2-lts` |
    | IBM MQ Plug-in for Zowe CLI | `@zowe/mq-for-zowe-cli@zowe-v2-lts` |
   


3.  (Optional) Issue the following command to install two or more plug-ins using one command. Separate the `<my-plugin>` names with one space.

    ```
    zowe plugins install <@zowe/my-plugin1> <@zowe/my-plugin2> <@zowe/my-plugin3> ...
    ```

    **Note:** The IBM Db2 Plug-in for Zowe CLI requires additional licensing and ODBC driver configurations. If you installed the DB2 plug-in, see [IBM Db2 Plug-in for Zowe CLI](cli-db2plugin.md).

You installed Zowe CLI plug-ins.

## Installing plug-ins from a local package

Install plug-ins from a local package on any computer that has limited or no access to the Internet. The procedure assumes that you previously installed the core CLI.

**Follow these steps:**

1.  Meet the [software requirements for each plug-in](cli-swreqplugins.md) that you want to install.

2.  Obtain the installation files.

    From the Zowe [Download](https://zowe.org/download/) website, click **Download Zowe CLI** to download the Zowe CLI installation package named `zowe-cli-package-*v*.*r*.*m*.zip` to your computer.

    **Note:** `v` indicates the version, `r` indicates the release number, and `m` indicates the modification number

3. Open a command-line window, such as Windows Command Prompt. Browse to the directory where you downloaded the Zowe CLI installation package (.zip file). Issue the following command, or use your preferred method to unzip the files:

    ```
    unzip zowe-cli-package-v.r.m.zip
    ```
    **Example:**
    ```
    unzip zowe-cli-package-1.9.0.zip
    ```

    By default, the unzip command extracts the contents of the zip file to the directory where you downloaded the .zip file. You can extract the contents of the zip file to your preferred location.

4.  Issue the following command against the extracted directory to install each available plug-in:

    ```
    zowe plugins install <my-plugin>
    ```

    Replace `<my-plugin>` with the .tgz file name listed in the following table:

    | Plug-in | `.tgz` File Name |
    |---------|-----------------|
    | IBM CICS Plug-in for Zowe CLI | `cics-for-zowe-cli.tgz` |
    | IBM Db2 Plug-in for Zowe CLI | `db2-for-zowe-cli.tgz` |
    | IBM z/OS FTP Plug-in for Zowe CLI | `zos-ftp-for-zowe-cli.tgz` |
    | IBM IMS Plug-in for Zowe CLI | `ims-for-zowe-cli.tgz` |
    | IBM MQ Plug-in for Zowe CLI | `mq-for-zowe-cli.tgz` |
   

You installed Zowe CLI plug-ins.

## Validating plug-ins

Issue the plug-in validation command to run tests against all plug-ins (or against a plug-in that you specify) to verify that the plug-ins integrate properly with Zowe CLI. The tests confirm that the plug-in does not conflict with existing command groups in the base application. The command response provides you with details or error messages about how the plug-ins integrate with Zowe CLI.

The `validate` command has the following syntax:

```
zowe plugins validate [plugin]
```

  - **`[plugin]`**
    (Optional) Specifies the name of the plug-in that you want to
    validate. If you do not specify a plug-in name, the command
    validates all installed plug-ins. The name of the plug-in is not always the same as the name of the NPM package.

    | Plug-in | Syntax |
    |---------|-----------------------------|
    | IBM CICS Plug-in for Zowe CLI | `@zowe/cics-for-zowe-cli` |
    | IBM Db2 Plug-in for Zowe CLI| `@zowe/db2-for-zowe-cli` |
    | IBM z/OS FTP Plug-in for Zowe CLI | `@zowe/zos-ftp-for-zowe-cli` |
    | IBM IMS Plug-in for Zowe CLI | `@zowe/ims-for-zowe-cli` |
    | IBM MQ Plug-in for Zowe CLI | `@zowe/mq-for-zowe-cli` |


**Examples: Validate plug-ins**

  - The following example illustrates the syntax to use to validate the IBM CICS Plug-in for Zowe CLI:

    ```
    zowe plugins validate @zowe/cics
    ```

  - The following example illustrates the syntax to use to validate all installed plug-ins:

    ```
    zowe plugins validate
    ```

## Updating plug-ins

You can update Zowe CLI plug-ins from an online registry or from a local package.

### Update plug-ins from an online registry

Issue the `update` command to install the latest stable version or a specific version of a plug-in that you installed previously. The `update` command has the following syntax:

```
zowe plugins update [plugin...] [--registry <registry>]
```

-  [plugin...]

    Specifies the name of an installed plug-in that you want to update. The name of the plug-in is not always the same as the name of the NPM package. You can use npm semantic versioning to specify a plug-in version to which to update. For more information, see npm semver.

-  `[--registry \<registry>\]`

    (Optional) Specifies a registry URL that is different from the registry URL of the original installation.

**Examples: Update plug-ins**

The following example illustrates the syntax to use to update an installed plug-in to the latest version:

```
zowe plugins update @zowe/my-plugin@zowe-v2-lts
```

The following example illustrates the syntax to use to update a plug-in to a specific version:

```
zowe plugins update @zowe/my-plugin@"^1.2.3"
```

### Update plug-ins from a local package

You can update plug-ins from a local package. You acquire the media from the [Zowe Download](https://zowe.org/download/) website and update the plug-ins using the `zowe plugins install` command.

To update plug-ins from a local package, follow the steps described in [Installing plug-ins from a local package](#installing-plug-ins-from-a-local-package).

## Uninstall Plug-ins

Issue the `uninstall` command to uninstall plug-ins from Zowe CLI. After the uninstall process completes successfully, the product no longer contains the plug-in configuration.

The uninstall command contains the following syntax:

```
zowe plugins uninstall [plugin]
```

- `[plugin]`

    Specifies the name of the plug-in that you want to uninstall.

The following table describes the uninstallation command syntax for each plug-in:


| Plug-in | Syntax |
|---------|-----------------------------|
| IBM CICS Plug-in for Zowe CLI | `@zowe/cics-for-zowe-cli` |
| IBM Db2 Plug-in for Zowe CLI| `@zowe/db2-for-zowe-cli` |
| IBM z/OS FTP Plug-in for Zowe CLI | `@zowe/zos-ftp-for-zowe-cli` |
| IBM IMS Plug-in for Zowe CLI | `@zowe/ims-for-zowe-cli` |
| IBM MQ Plug-in for Zowe CLI | `@zowe/mq-for-zowe-cli` |


**Example:**

The following example illustrates the command to uninstall the CICS plug-in:

```
zowe plugins uninstall @zowe/cics
```
