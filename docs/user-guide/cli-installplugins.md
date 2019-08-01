# Installing Zowe CLI plug-ins

Use commands in the plugins command group to install and manage plug-ins for Zowe CLI.

**Important!** Plug-ins can gain control of your CLI application legitimately during the execution of commands. Install third-party plug-ins at your own risk. We make no warranties regarding the use of third-party plug-ins.

You can install the following plug-ins:
- Zowe CLI Plug-in for IBM CICS
- Zowe CLI Plug-in for IBM Db2 Database
- Zowe CLI Plug-in for IBM IMS
- Zowe CLI Plug-in for IBM MQ

You install Zowe CLI plugins using either of the following methods:

- Install Zowe CLI plug-ins from an online registry. With this method, you install the plug-ins from an online, NPM registry. Use this method when your computer ***can*** access the Internet. For more information, see [Installing plug-ins from an online registry](#installing-plug-ins-from-an-online-registry).
- Install Zowe CLI plug-ins from a local package. With this method, you download and install the plug-ins from a bundled set of `.tgz` file. Use this method when your computer ***cannot*** access the Internet. For more information, see [Installing plug-ins from a local package](#installing-plug-ins-from-a-local-package).

## Installing plug-ins from an online registry

Install Zowe CLI plug-ins using npm commands on Windows, Mac, and Linux. The procedure assumes that you previously installed the core CLI.

**Follow these steps:**
1. Ensure that you meet the software requirements for a plug-in before you install the plug-in to Zowe CLI. For information related to each plug-in, see [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

2.  Set the NPM registry target to the public npm registry by issuing the following command:
      ```
      npm config set @zowe:registry
      ```
3.  Issue the following command to install a plug-in:
      ```
      zowe plugins install <my-plugin>
      ```
    **Note:** Replace `<my-plugin>` with the installation command syntax in the following table:

    | Plug-in | Installation Command Syntax |
    |---------|-----------------------------|
    | Zowe CLI Plug-in for IBM CICS | `@zowe/cics-for-zowe-cli` |
    | Zowe CLI Plug-in for IBM Db2 Database| `@zowe/db2-for-zowe-cli` |
    | Zowe CLI Plug-in for IBM IMS| `@zowe/ims-for-zowe-cli`|
    | Zowe CLI Plug-in for IBM MQ| `@zowe/mq-for-zowe-cli` |
    |    |    |

4.  (Optional) Issue the following command to install two or more plug-ins using one command. Separate the `<my-plugin>` names with one space.
    ```
    zowe plugins install @zowe/<my-plugin1> @zowe/<my-plugin2> @zowe/<my-plugin3> ...
    ```
    **Note:** The Zowe CLI Plug-in for IBM Db2 Database requires additional licensing and ODBC driver configurations. If you installed the DB2 plug-in, see [Zowe CLI Plug-in for IBM Db2 Database](.cli-db2plugin.md).

5.  (Optional) You can can validate plug-ins to verify that the plug-ins installed successfully. For more information see, [Validating plug-ins](#validating-plug-ins).

## Installing plug-ins from a local package

Application developers and systems programmers can install CA Brightside plug-ins from a local package on Windows, macOS, and Linux computers, or on any computer that has limited or no access to the Internet. The procedure assumes that you previously installed the core CLI.

**Follow these steps:**

1.  Ensure that you meet the software requirements for a plug-in before you install the plug-in to Zowe CLI. For information related to each plug-in, see [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

2.  Obtain the installation files.

    From the Zowe [Download](https://zowe.org/download/) website, click **Download Zowe Command Line Interface** to download the Zowe CLI installation package named `zowe-cli-package-*v*.*r*.*m*.zip` to your computer.

    **Note:** `v` indicates the version, `r` indicates the release number, and `m` indicates the modification number

3. Open a command line window such as Windows Command Prompt. Browse to the directory where you downloaded the Zowe CLI installation package. Issue the following command to unzip the files:

    ```
    unzip zowe-cli-package-v.r.m.zip
    ````
    **Example:**
    ```
    unzip zowe-cli-package-1.0.1.zip
    ```
    By default, the unzip command extracts the contents of the zip file to the directory where you downloaded the file. Optionally, you can extract the contents of the .zip file to your preferred location.

4.  Open a command line window and change the local directory where you extracted the zip file.

    **Example:**
    ```
    cd C:\Users\userID\my_downloads\<file_name>.zip
    ```
5.  Issue the following command to install the plug-in:

    ```
    zowe plugins install <my-plugin>
    ```
    Replace `<my-plugin>` with the .tgz file name listed in the following table:

    | Plug-in | `.tgz` File Name |
    |---------|-----------------|
    | Zowe CLI Plug-in for IBM CICS | `cics-for-zowe.cli.tgz` |
    | Zowe CLI Plug-in for IBM Db2 Database | `db2-for-zowe-cli.tgz` |
    | Zowe CLI Plug-in for IBM IMS | `ims-for-zowe-cli.tgz`|
    | Zowe CLI Plug-in for IBM MQ |`mq-for-zowe-cli.tgz`|

6.  (Optional) You can can validate plug-ins to verify that the plug-ins installed successfully. For more information see, [Validating plug-ins](#validating-plug-ins).

## Validating plug-ins

Issue the plug-in validation command to run tests against all plug-ins (or against a plug-in that you specify) to verify that the plug-ins integrate properly with Zowe CLI. The tests confirm that the plug-in does not conflict with existing command groups in the base application. The command response provides you with details or error messages about how the plug-ins integrate with Zowe CLI.

Perform validation after you install the plug-ins to help ensure that it integrates with Zowe CLI.

The `validate` command has the following syntax:

```
zowe plugins validate [plugin]
```

  - **`[plugin]`**  
    (Optional) Specifies the name of the plug-in that you want to
    validate. If you do not specify a plug-in name, the command
    validates all installed plug-ins. The name of the plug-in is not always the same as the name of the NPM package.

    |Plug-in|Syntax|
    |-|-|
    |Zowe CLI Plug-in for IBM CICS|`@zowe/cics`|
    |Zowe CLI Plug-in for IBM Db2 Database|`@zowe/db2`|
    |Zowe CLI Plug-in for IBM IMS|`@zowe/ims`|
    |Zowe CLI Plug-in for IBM MQ|`@zowe/mq`|
    |||

**Examples: Validate plug-ins**

  - The following example illustrates the syntax to use to validate the Zowe CLI Plug-in for IBM CICS:

    ```
    zowe plugins validate @zowe/cics
    ```

  - The following example illustrates the syntax to use to validate all installed plug-ins:

    ```
    zowe plugins validate
    ```


+++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++

# PREVIOUS CONTENT STARTS HERE ->


  - **Zowe CLI Plug-in for IBM CICS**
    Use `@zowe/cics-for-zowe-cli` in your command syntax to install, update, and validate the plug-in. 

  - **Zowe CLI Plug-in for IBM Db2 Database**  
  
    Use `@zowe/db2-for-zowe-cli` in your command syntax to install, update, and validate the IBM Db2 Database plug-in.

  - **Zowe CLI Plug-in for IBM IMS**  

    Use `@zowe/ims-for-zowe-cli` in your command syntax to install, update, and validate the IBM IMS plug-in.
  
  - **Zowe CLI Plug-in for IBM MQ**  

    Use `@zowe/mq-for-zowe-cli` in your command syntax to install, update, and validate the IBM MQ plug-in.

## Setting the registry

If you installed Zowe CLI from the zowe-cli-bundle.zip distributed with the Zowe PAX media, proceed to the [Install step](#installing-plug-ins).

If you installed Zowe CLI from a registry, confirm that NPM is set to target the public npm registry by issuing the following command: 

```
npm config set @zowe:registry
```

## Meeting the software requirements

Ensure that you meet the software requirements for a plug-in before you install
the plug-in to Zowe CLI. For information related to each plug-in,
see [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing plug-ins

Issue an `install` command to install plug-ins to Zowe CLI. The
`install` command contains the following syntax:

```
zowe plugins install [plugin...] [--registry <registry>]
```

  - **`[plugin...]`**   
    (Optional) Specifies the name of a plug-in, an npm package, or a
    pointer to a (local or remote) URL. When you do not specify a
    plug-in version, the command installs the latest plug-in version and
    specifies the prefix that is stored in npm save-prefix. For more
    information, see [npm save prefix](https://docs.npmjs.com/misc/config#save-prefix). For more
    information about npm semantic versioning, see [npm semver](https://docs.npmjs.com/misc/semver). Optionally, you can
    specify a specific version of a plug-in to install. For example, `zowe plugins install pluginName@^1.0.0`.

    **Tip:** You can install multiple plug-ins with one command. For
    example, issue `zowe plugins install plugin1 plugin2 plugin3` 

  - **`[--registry <registry>]`**  
    (Optional) Specifies a registry URL from which to install a plug-in
    when you do not use `npm config set` to set the registry initially. 

**Examples: Install plug-ins**

  - The following example illustrates the syntax to use to install a 
    plug-in that is distributed with the zowe-cli-bundle.zip.
    If you are using zowe-cli-bundle.zip, issue the following command for each plug-in .tgz file:
    
    ```
    zowe plugins install ./zowe-cli-cics.tgz 
    ```

  - The following example illustrates the syntax to use to install a
    plug-in that is named "my-plugin" from a specified registry:

    ```
    zowe plugins install @zowe/my-plugin@latest
    ```

  - The following example illustrates the syntax to use to install a
    specific version of "my-plugins" 

    ```
     zowe plugins install @zowe/my-plugin@"^1.2.3"
    ```
    

## Validating plug-ins

Issue the plug-in validation command to run tests against all plug-ins (or against a plug-in that you specify) to verify that the plug-ins integrate properly with Zowe CLI. The tests confirm that the plug-in does not conflict with existing command groups in the base application. The command response provides you with details or error messages about how the plug-ins integrate with Zowe CLI. 

Perform validation after you install the plug-ins to help ensure that it integrates with Zowe CLI.

The `validate` command has the following syntax:

```
zowe plugins validate [plugin]
```

  - **`[plugin]`**  
    (Optional) Specifies the name of the plug-in that you want to
    validate. If you do not specify a plug-in name, the command
    validates all installed plug-ins. The name of the plug-in is not
    always the same as the name of the NPM package.

**Examples: Validate plug-ins**

  - The following example illustrates the syntax to use to validate a
    specified installed plug-in:

    ```
    zowe plugins validate @zowe/my-plugin
    ```

  - The following example illustrates the syntax to use to validate all
    installed plug-ins:

    ```
    zowe plugins validate
    ```

## Updating plug-ins

Issue the `update` command to install the latest version or a specific
version of a plug-in that you installed previously. The `update` command
has the following syntax:

```
zowe plugins update [plugin...] [--registry <registry>]
```

  - **`[plugin...]`** 

    Specifies the name of an installed plug-in that you want to update.
    The name of the plug-in is not always the same as the name of the
    NPM package. You can use npm semantic versioning to specify a
    plug-in version to which to update. For more information,
    see [npm semver](https://docs.npmjs.com/misc/semver).

  - **`[--registry <registry>]`**

    (Optional) Specifies a registry URL that is different from the
    registry URL of the original installation. 

**Examples: Update plug-ins**

  - The following example illustrates the syntax to use to update an
    installed plug-in to the latest version:

    ```
    zowe plugins update @zowe/my-plugin
    ```

  - The following example illustrates the syntax to use to update a
    plug-in to a specific version:

    ```
    zowe plugins update @zowe/my-plugin
    ```

## Uninstalling plug-ins

Issue the `uninstall` command to uninstall plug-ins from a base
application. After the uninstall process completes successfully,
the product no longer contains the plug-in
configuration.

**Tip:** The command is equivalent to using [npm uninstall](https://docs.npmjs.com/cli/uninstall) to uninstall a package.

The `uninstall` command contains the following syntax:

```
zowe plugins uninstall [plugin]
```

  - **`[plugin]`**   
    Specifies the plug-in name to uninstall.

**Example: Uninstall plug-ins**

- The following example illustrates the syntax to use to uninstall a plug-in:

  ```
  zowe plugins uninstall @zowe/my-plugin
  ```
