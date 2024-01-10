# IBM Db2 Database Plug-in troubleshooting

As part of the IBM Db2 Database Plug-in installation, the ODBC driver is automatically installed. The driver is required to connect to Db2, but installation can fail due to security restrictions.

When the ODBC driver installation fails, Zowe CLI displays an error message. To resolve this, the user can manually download and install the driver.

**Symptom:**

The ODBC driver installation fails when installing the IBM Db2 Database Plug-in.

**Sample:**

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

The response includes an error message, which could specify a timeout or unpacking error.

#### Timeout error

Network restrictions can prevent the ODBC driver from downloading, resulting in a timeout error:

```
Downloading DB2 ODBC CLI Driver from https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/ntx64_odbc_cli.zip ...

ETIMEDOUT : https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/ntx64_odbc_cli.zipbm_db/-/ibm_db-3.2.3.tgz 7210ms (cache miss)
Downloading DB2 ODBC CLI Driver from https://github.com/ibmdb/db2drivers/raw/main/clidriver/ntx64_odbc_cli.zip ...

ETIMEDOUT : https://github.com/ibmdb/db2drivers/raw/main/clidriver/ntx64_odbc_cli.zipifactory/api/npm/npmjs/ibm_db/-/ibm_db-3.2.3.tgz 7210ms (cache miss)

=====================================
Error: Installation of ibm_db failed.
=====================================
```

To troubleshoot a timeout error, see [Downloading the ODBC driver manually](#downloading-the-odbc-driver-manually).

#### Unpacking error

If the driver downloads successfully, security settings can still prompt an unpacking error.

In the following example, the ODBC driver was downloaded manually and the environment variable `IBM_DB_INSTALLER_URL` was set.

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

To troubleshoot a packaging error, see [Fixing a failed extraction](#fixing-a-failed-extraction).

**Solution:**

#### Downloading the ODBC driver manually

To manually download the ODBC driver, see instructions in [Downloading the ODBC driver](../../user-guide/cli-db2plugin.md#downloading-the-odbc-driver).

#### Fixing a failed extraction

1. Manually extract the ODBC driver binaries from the `build.zip` file which is bundled with the [ibm_db](https://www.npmjs.com/package/ibm_db) package. The package can also be downloaded from [GitHub](https://github.com/ibmdb/node-ibm_db/blob/master/build.zip).

2. Open the `build/Release` folder and copy the binary for your Node version (`odbc_bindings.node.18.18.2`, for example) into the Db2 plug-in folder (`C:\Users\username\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\Release`).

3. Rename the file to `odbc_bindings.node`. This is the name used by the Db2 plug-in.

    You have successfully extracted the ODBC driver.

:::note

The preceding steps work to extract the driver binary for a downloaded version of the IBM Db2 Database Plug-in. When installing a new plug-in version, perform the workaround again to fix a failed extraction.

:::
