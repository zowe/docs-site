# Installing plug-ins

Use commands in the plugins command group to install and manage plug-ins for Zowe CLI.

**Important!** Plug-ins can gain control of your CLI application
legitimately during the execution of every command. Install third-party
plug-ins at your own risk. We make no warranties regarding
the use of third-party plug-ins.

You can install the following plug-ins:

  - **IBM Db2 Database**  
    Use `@brightside/db2` in your command syntax to install, update, and
    validate the IBM Db2 Database plug-in. 

## Setting the registry

If you installed Zowe CLI from the zowe-cli-bundle.zip distributed with the Zowe PAX media, proceed to the [Install step](#installing-plug-ins).

If you installed Zowe CLI from a registry, confirm that NPM is set to target the registry by issuing the following command: 

```
npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
```

## Meeting the prerequisites

Ensure that you meet the prerequisites for a plug-in before you install
the plug-in to Zowe CLI. For documentation related to each plug-in,
see [Extending Zowe CLI](cli-extending.md).

## Installing plug-ins

Issue an `install `command to install plug-ins to Zowe CLI. The
`install` command contains the following syntax:

```
zowe plugins install [plugin...] [--registry <registry>]
```

  - **`[plugin...]`**   
    (Optional) Specifies the name of a plug-in, an npm package, or a
    pointer to a (local or remote) URL. When you do not specify a
    plug-in version, the command installs the latest plug-in version and
    specifies the prefix that is stored in npm save-prefix. For more
    information, see [npm save prefix](https://docs.npmjs.com/misc/config#save-prefix). For more
    information about npm semantic versioning, see [npm semver](https://docs.npmjs.com/misc/semver). Optionally, you can
    specify a specific version of a plug-in to install. For example, `zowe plugin install pluginName@^1.0.0`.

    **Tip:** You can install multiple plug-ins with one command. For
    example, issue `zowe plugin install plugin1 plugin2 plugin3`

  - **`[--registry <registry>]`**  
    (Optional) Specifies a registry URL from which to install a plug-in
    when you do not use `npm config set` to set the registry initially. 

**Examples: Install plug-ins**

  - The following example illustrates the syntax to use to install a 
    plug-in that is distributed with the zowe-cli-bundle.zip.
    If you are using zowe-cli-bundle.zip, issue the following command for each plug-in .tgz file:
    
    ```
    zowe plugins install ./zowe-cli-db2-1.0.0-next.20180531.tgz 
    ```

  - The following example illustrates the syntax to use to install a
    plug-in that is named "my-plugin" from a specified registry:

    ```
    zowe plugins install @brightside/my-plugin
    ```

  - The following example illustrates the syntax to use to install a
    specific version of "my-plugins" 

    ```
     zowe plugins install @brightside/my-plugin@"^1.2.3"
    ```
    

## Validating plug-ins

Issue the plug-in validation command to run tests against all plug-ins (or against a plug-in that you specify) to verify that the plug-ins integrate properly with Zowe CLI. The tests confirm that the plug-in does not conflict with existing command groups in the base application. The command response provides you with details or error messages about how the plug-ins integrate with Zowe CLI. 

Perform validation after you install the plug-ins to help ensure that it integrates with Zowe CLI.

The `validate` command has the following syntax:

```
zowe plugins validate [plugin]
```

  - **`[plugin]`**  
    (Optional) Specifies the name of the plug-in that you want to
    validate. If you do not specify a plug-in name, the command
    validates all installed plug-ins. The name of the plug-in is not
    always the same as the name of the NPM package.

**Examples: Validate plug-ins**

  - The following example illustrates the syntax to use to validate a
    specified installed plug-in:

    ```
    zowe plugins validate @brightside/my-plugin
    ```

  - The following example illustrates the syntax to use to validate all
    installed plug-ins:

    ```
    zowe plugins validate
    ```

## Updating plug-ins

Issue the `update` command to install the latest version or a specific
version of a plug-in that you installed previously. The `update` command
has the following syntax:

```
zowe plugins update [plugin...] [--registry <registry>]
```

  - **`[plugin...]`** 

    Specifies the name of an installed plug-in that you want to update.
    The name of the plug-in is not always the same as the name of the
    NPM package. You can use npm semantic versioning to specify a
    plug-in version to which to update. For more information,
    see [npm semver](https://docs.npmjs.com/misc/semver).

  - **`[--registry <registry>]`**

    (Optional) Specifies a registry URL that is different from the
    registry URL of the original installation. 

**Examples: Update plug-ins**

  - The following example illustrates the syntax to use to update an
    installed plug-in to the latest version:

    ```
    zowe plugins update @brightside/my-plugin@latest
    ```

  - The following example illustrates the syntax to use to update a
    plug-in to a specific version:

    ```
    zowe plugins update @brightside/my-plugin@"^1.2.3"
    ```

## Uninstalling plug-ins

Issue the `uninstall` command to uninstall plug-ins from a base
application. After the uninstall process completes successfully,
the product no longer contains the plug-in
configuration.

**Tip:** The command is equivalent to using [npm uninstall](https://docs.npmjs.com/cli/uninstall) to uninstall a package.

The `uninstall` command contains the following syntax:

```
zowe plugins uninstall [plugin]
```

  - **`[plugin]`**   
    Specifies the plug-in name to uninstall.

**Example: Uninstall plug-ins**

- The following example illustrates the syntax to use to uninstall a plug-in:

  ```
  zowe plugins uninstall @brightside/my-plugin
  ```
