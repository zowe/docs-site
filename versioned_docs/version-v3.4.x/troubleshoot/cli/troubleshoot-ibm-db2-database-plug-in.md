# IBM Db2 Database Plug-in troubleshooting

## Incompatible glibc version

The `ibm_db` dependency, which utilizes pre-built drivers to access DB2 and downloads those drivers at install time, pulls down drivers with a pre-requisite on the GNU C library (glibc) version 2.32.

Due to potential incompatibility issues, users on some Linux distributions might encounter an error while attempting to install any version of the DB2 Plug-in. Known distributions affected include Ubuntu 20, Debian 11, CentOS 8, and Red Hat Enterprise Linux 8.

If you are using any of these distributions of Linux, a workaround is required.

**Symptom:**

```
_____ Validation results for plugin '@zowe/db2-for-zowe-cli' _____

*** CmdError: Failed to combine command definitions. Reason = Encountered an error loading one of the files (cli/call/Call.definition.js) that matched the provided command module glob for the glob **/cli/*/*.definition!(.d).*s: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.32' not found (required by /home/<user>/.zowe/plugins/installed/lib/node_modules/@zowe/db2-for-zowe-cli/node_modules/ibm_db/installer/clidriver/lib/libdb2.so.1)

This plugin has command errors. No plugin commands will be available.

```

**Solution:**

Use one of the following workarounds:

For Zowe v3 LTS DB2 Plug-in versions 6.1.0 and above, run the following command before installing the DB2 Plug-in:

```
export npm_config_clidriver=v11.5.9
```

For Zowe v2 LTS, and Zowe v3 LTS DB2 Plug-in versions prior to 6.1.0, run the following command before installing the DB2 Plug-in:

```
export IBM_DB_INSTALLER_URL=https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/v11.5.9 
```

## ODBC driver install failure

As part of the IBM Db2 Database Plug-in installation, the ODBC driver is automatically installed. The driver is required to connect to Db2, but installation can fail due to security restrictions.

When the ODBC driver installation fails, Zowe CLI displays an error message. To resolve the error, the user can manually download and install the driver.

**Symptom:**

The ODBC driver installation fails when installing the IBM Db2 Database Plug-in.

The ODBC driver installation can fail due to several factors, displaying the following error when the `zowe plugins install` command is issued:

```
_______________________________________________________________
Installed plugin name = '@zowe/db2-for-zowe-cli'

_____ Validation results for plugin '@zowe/db2-for-zowe-cli' _____

*** CmdError: Failed to combine command definitions. Reason = Encountered an error loading one of the files (cli/call/Call.definition.js) that matched the provided command module glob for the glob **/cli/*/*.definition!(.d).*s: Could not locate the bindings file. Tried:
→ C:\Users\username\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\odbc_bindings.node
→ C:\Users\username\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\Debug\odbc_bindings.node
→ C:\Users\username\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\Release\odbc_bindings.node
```

To identify the cause of the error and get more details to troubleshoot, run the following command:

```
npm install ibm_db --foreground-scripts true
```

The response includes an error message, which could specify a [timeout](#timeout-error) or [unpacking error](#unpacking-error).

### Timeout error

Network restrictions can prevent the ODBC driver from downloading, resulting in a timeout error:

```
Downloading Db2 ODBC CLI Driver from https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/ntx64_odbc_cli.zip ...

ETIMEDOUT : https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/ntx64_odbc_cli.zipbm_db/-/ibm_db-3.2.3.tgz 7210ms (cache miss)
Downloading Db2 ODBC CLI Driver from https://github.com/ibmdb/db2drivers/raw/main/clidriver/ntx64_odbc_cli.zip ...

ETIMEDOUT : https://github.com/ibmdb/db2drivers/raw/main/clidriver/ntx64_odbc_cli.zipifactory/api/npm/npmjs/ibm_db/-/ibm_db-3.2.3.tgz 7210ms (cache miss)

=====================================
Error: Installation of ibm_db failed.
=====================================
```

**Solution:**

Download the ODBC driver manually by following the instructions in [Downloading the ODBC driver](../../user-guide/cli-db2plugin.md#downloading-the-odbc-driver).

### Unpacking error

If the driver downloads successfully, security settings can still prompt an unpacking error.

In the following example, the ODBC driver is downloaded manually and the environment variable `IBM_DB_INSTALLER_URL` is set to the local path to the ODBC driver.

```
Error: invalid distance too far back
    at Zlib.zlibOnError [as onerror] (node:zlib:190:17)
Emitted 'error' event on InflateRaw instance at:
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  errno: -3,
  code: 'Z_DATA_ERROR'
}
npm ERR! code 1
npm ERR! path C:\Users\username\node_modules\ibm_db
npm ERR! command failed
npm ERR! command C:\WINDOWS\system32\cmd.exe /d /s /c node installer/driverInstall.js
```

**Solution:**

To fix a failed extraction:

1. Manually extract the ODBC driver binaries from the `build.zip` file which is bundled with the [ibm_db](https://www.npmjs.com/package/ibm_db) package. The `build.zip` archive can also be downloaded from [GitHub](https://github.com/ibmdb/node-ibm_db/blob/master/build.zip).

2. Open the `build/Release` folder and copy the binary for your Node version (for example, `odbc_bindings.node.18.18.2` if you have Node 18) into the Db2 plug-in folder (`C:\Users\username\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\Release`).

3. Rename the file to `odbc_bindings.node`. This is the name used by the Db2 plug-in.

    You successfully extracted the ODBC driver.

:::note

The preceding steps extract the driver binary to fix a broken installation of the IBM Db2 Database Plug-in. When installing a new version of the plug-in, perform the workaround again to fix a failed extraction.

:::
