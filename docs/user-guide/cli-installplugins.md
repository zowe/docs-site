# Installing Zowe CLI plug-ins

Use commands in the `plugins` command group to install and manage Zowe&trade; CLI plug-ins.

:::info Important

Plug-ins can gain control of Zowe CLI legitimately during the execution of every command. Install third-party plug-ins at your own risk.

:::

You can install the following Zowe plug-ins:
- IBM® CICS® Plug-in for Zowe CLI
- IBM® Db2® Plug-in for Zowe CLI
- [Third-party Zowe Conformant Plug-ins](https://openmainframeproject.org/our-projects/zowe-conformance-program/)

Use either of the following methods to install plug-ins:

- Install from an online NPM registry. Use this method when your computer can access the Internet.

    For more information, see [Installing plug-ins from an online registry](#installing-plug-ins-from-an-online-registry).

- Install from a local package. With this method, you download and install the plug-ins from a bundled set of `.tgz` files. Use this method when your computer cannot access the Internet.

    For more information, see [Installing plug-ins from a local package](#installing-plug-ins-from-a-local-package).

## Installing plug-ins from an online registry

The following procedure assumes that you previously installed Zowe CLI core.

To install Zowe CLI plug-ins on Windows, Mac, and Linux:

1. Meet the [software requirements for each plug-in](cli-swreqplugins.md) to be installed.

2. Install a plug-in from public npm:

      ```
      zowe plugins install <my-plugin>
      ```

      - `<my-plugin>`
      
        Specifies the command syntax for the plug-in to be installed. Use the following table to determine the syntax for your plug-in.

        | Plug-in | Syntax |
        |---------|-----------------------------|
        | IBM CICS Plug-in for Zowe CLI | `@zowe/cics-for-zowe-cli@zowe-v3-lts` |
        | IBM Db2 Plug-in for Zowe CLI| `@zowe/db2-for-zowe-cli@zowe-v3-lts` |
        | IBM z/OS FTP Plug-in for Zowe CLI | `@zowe/zos-ftp-for-zowe-cli@zowe-v3-lts` |
        | IBM MQ Plug-in for Zowe CLI | `@zowe/mq-for-zowe-cli@zowe-v3-lts` |

3. (Optional) Issue the following command to install two or more plug-ins using one command. Separate the `<my-plugin>` names with a single space.

    ```
    zowe plugins install <@zowe/my-plugin1> <@zowe/my-plugin2> <@zowe/my-plugin3> ...
    ```

    :::note
    
    The IBM Db2 Plug-in for Zowe CLI requires additional licensing and ODBC driver configurations. If you installed the DB2 plug-in, see [IBM Db2 Plug-in for Zowe CLI](cli-db2plugin.md).

    :::

    You have successfully installed the specified Zowe CLI plug-in(s).

## Installing plug-ins from a local package

The following procedure assumes that you previously installed Zowe CLI core.

To install plug-ins from a local package on any computer that has limited or no access to the Internet:

1. Meet the [software requirements for each plug-in](cli-swreqplugins.md) that you want to install.

2. Obtain the installation files.

    From the Zowe [Download](https://zowe.org/download/) website, click **Download Zowe CLI** to download the Zowe CLI installation package named `zowe-cli-package-<X.Y.Z>.zip` to your computer.
    
    - `v`

        Specifies the version number
    
    - `r`
    
        Specifies the release number
    
    - `m` 
    
        Specifies the modification number.


3. Open a command-line window, such as Windows Command Prompt. Browse to the directory where you downloaded the Zowe CLI installation package (.zip file). Issue the following command, or use your preferred method to unzip the files:

    ```
    unzip zowe-cli-package-v.r.m.zip
    ```
    **Example:**
    ```
    unzip zowe-cli-package-3.0.0.zip
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
    | IBM MQ Plug-in for Zowe CLI | `mq-for-zowe-cli.tgz` |

    You have successfully installed the Zowe CLI plug-ins.

## Validating plug-ins

Issue the plug-in validation command to run tests against all plug-ins (or against a plug-in that you specify) to verify that the plug-ins integrate properly with Zowe CLI. The tests confirm that the plug-in does not conflict with existing command groups in the base application. The command response provides you with details or error messages about how the plug-ins integrate with Zowe CLI.

The `validate` command has the following syntax:

```
zowe plugins validate [plugin]
```

  - **`[plugin]`**
    
    Specifies the name of the plug-in that you want to
    validate. If you do not specify a plug-in name, the command
    validates all installed plug-ins. The name of the plug-in is not always the same as the name of the NPM package.

    | Plug-in | Syntax |
    |---------|-----------------------------|
    | IBM CICS Plug-in for Zowe CLI | `@zowe/cics-for-zowe-cli` |
    | IBM Db2 Plug-in for Zowe CLI| `@zowe/db2-for-zowe-cli` |
    | IBM z/OS FTP Plug-in for Zowe CLI | `@zowe/zos-ftp-for-zowe-cli` |
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
zowe plugins update @zowe/my-plugin@zowe-v3-lts
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
| IBM MQ Plug-in for Zowe CLI | `@zowe/mq-for-zowe-cli` |


**Example:**

The following example illustrates the command to uninstall the CICS plug-in:

```
zowe plugins uninstall @zowe/cics
```
