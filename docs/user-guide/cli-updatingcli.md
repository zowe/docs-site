# Updating Zowe CLI

Zowe&trade; CLI is updated continuously. You can update Zowe CLI to a more recent version using online registry method or the local package method. However, you can only update Zowe CLI using the method that you used to install Zowe CLI.

- [(Optional) Identify the currently installed version of Zowe CLI](#optional-identify-the-currently-installed-version-of-zowe-cli)
- [(Optional) Identify the currently installed versions of Zowe CLI plug-ins](#optional-identify-the-currently-installed-versions-of-zowe-cli-plug-ins)
- [Update Zowe CLI from the online registry](#update-zowe-cli-from-the-online-registry)
- [Update or revert Zowe CLI to a specific version](#update-or-revert-zowe-cli-to-a-specific-version)
- [Update Zowe CLI from a local package](#update-zowe-cli-from-a-local-package)

## (Optional) Identify the currently installed version of Zowe CLI

Issue the following command:

```
zowe -V
```

## (Optional) Identify the currently installed versions of Zowe CLI plug-ins

Issue the following command:
```
zowe plugins list
```

## Update Zowe CLI from the online registry

You can update Zowe CLI to the latest version from the online registry on Windows, Mac, and Linux computers.

**Note:** The following steps assume that you set the `npm` registry as described in [Installing Zowe CLI from an online registry](cli-installcli.md#installing-zowe-cli-from-an-online-registry).

**Follow these steps:**

1. Issue the following command to update Zowe CLI to the most recent `@latest` version:

   ```
   npm install -g @zowe/cli
   ```

2. Reinstall the plug-ins and update existing plug-ins using the following command:

   ```
   zowe plugins install @zowe/cics-for-zowe-cli @zowe/db2-for-zowe-cli @zowe/zos-ftp-for-zowe-cli @zowe/ims-for-zowe-cli @zowe/mq-for-zowe-cli
   ```

3. Recreate any user profiles that you created before you updated to the latest version of Zowe CLI.

## Update or revert Zowe CLI to a specific version

Optionally, you can update Zowe CLI (or revert) to a known version. The following example illustrates the syntax to update Zowe CLI to version 3.3.1:

```
npm install -g @zowe/cli@3.3.1
```

## Update Zowe CLI from a local package

To update Zowe CLI from an offline (`.tgz`), local package, uninstall your current package then reinstall from a new package using the [Installing Zowe CLI from a local package](cli-installcli.md#installing-zowe-cli-from-a-local-package) instructions.

**Important!** Recreate any user profiles that you created before the update.