# Using Zowe Explorer FTP Extension
## System Requirements

Ensure that you can obtain remote access to a z/OS FTP service before using the extension.

Some functionality within the FTP extension requires the FTP server on the mainframe to be configured with the `JESINTERFACELevel` parameter set to `2`. For more information, see the [JESINTERFACELEVEL (FTP server) statement](https://www.ibm.com/docs/en/zos/2.5.0?topic=protocol-jesinterfacelevel-ftp-server-statement).

 The `JESINTERFACELevel` parameter can be found in multiple locations within the mainframe, depending on your site's security policies.
Contact your system administrator to determine if your FTP server is configured with the correct `JESINTERFACELevel`. For more information, see [FTP configuration statements in FTP.DATA](https://www.ibm.com/docs/en/zos/2.5.0?topic=protocol-ftp-configuration-statements-in-ftpdata).

## Using

:::caution

When transferring files, data sets, or data set members, use only ASCII characters. If a file contains non-ASCII characters (such as glyphs or mathematical symbols), a translation error can happen when the file is downloaded from, or uploaded to, the mainframe. This error can result in data loss.

:::

To use the FTP Extension with Zowe Explorer:

1. Select the **Zowe Explorer** icon on the **Activity Bar** in VS Code.

2. Hover over the **DATA SETS**, **UNIX SYSTEM SERVICES (USS)**, or **JOBS** bar and select the corresponding **+** icon to view the Zowe CLI FTP profiles in the **picker** dropdown list.

    If you do not have an existing FTP profile, see [Creating an FTP profile with Zowe Explorer](../user-guide/ze-ftp-using-ze-ftp-ext#creating-an-ftp-profile-with-zowe-explorer).

3. Select a profile to display it in the **Side Bar**.

4. Hover over the profile and click the **Search** icon.

5. Enter the applicable values in the **picker** field:
    - For data sets, select or enter the data set name.
    - For USS, select or enter the path.
    - For jobs, select or enter the job owner and job prefix.

## Creating an FTP profile with Zowe Explorer

If you do not have an existing Zowe FTP profile, you can create one graphically with Zowe Explorer:

1. Select the **Zowe Explorer** icon on the **Activity Bar** in VS Code.

2. Expand **UNIX SYSTEM SERVICES (USS)** and click the **+** icon.
3. In the **picker** drop-down menu, select the **Create a New Connection to z/OS** option.
4. Enter a profile name and press `Enter`.
5. Select the **zftp** connection type from the dropdown list of available connection options.
6. Continue providing values for the remaining prompts, which are specific for FTP-type connections.
