# Using the FTP Extension

## Prerequisites

Ensure that you obtain remote access to z/OS FTP service before you can use the extension.

1. Connect to z/OS with the FTP client.
1. Run the following command in the FTP client:

   ```bash
   rstat
   ```

1. Confirm that the `JESINTERFACELevel` option is set to `2`.

## Using

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

If you do not have an existing Zowe FTP profile, you can create one graphically with Zowe Explorer.

1. Select the **Zowe Explorer** icon on the **Activity Bar** in VS Code.

2. Expand **UNIX SYSTEM SERVICES (USS)** and click the **+** icon.
3. In the **picker** drop-down menu, select the **Create a New Connection to z/OS** option.
4. Enter a profile name and press `Enter`.
5. Select the **zftp** connection type from the dropdown list of available connection options.
6. Continue providing values for the remaining prompts, which are specific for FTP-type connections.
