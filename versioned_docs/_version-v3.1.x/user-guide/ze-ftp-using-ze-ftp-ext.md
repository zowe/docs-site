# Using Zowe Explorer FTP Extension

## Using

:::caution

When transferring files, data sets, or data set members, use only ASCII characters. If a file contains non-ASCII characters (such as glyphs or mathematical symbols), a translation error can happen when the file is downloaded from, or uploaded to, the mainframe. This error can result in data loss.

:::

To use the FTP Extension with Zowe Explorer:

1. Select the **Zowe Explorer** icon on the **Activity Bar** in Visual Studio Code.

2. Hover over the **DATA SETS**, **UNIX SYSTEM SERVICES (USS)**, or **JOBS** bar and select the corresponding **+** icon to view the Zowe CLI FTP profiles in the **Quick Pick** menu.

    If you do not have an existing FTP profile, see [Creating an FTP profile with Zowe Explorer](#creating-an-ftp-profile-with-zowe-explorer).

3. Select a profile to display it in the **Side Bar**.

4. Hover over the profile and click the **Search** icon.

5. Enter the applicable values in the **Quick Pick**:
    - For data sets, select or enter the data set name.
    - For USS, select or enter the path.
    - For jobs, select or enter the job owner and job prefix.

## Creating an FTP profile with Zowe Explorer

If you do not have an existing Zowe FTP profile, you can create one graphically with Zowe Explorer:

1. Select the **Zowe Explorer** icon on the **Activity Bar** in VS Code.

2. Expand the **UNIX SYSTEM SERVICES (USS)** tree and click the **+** icon.
3. In the **Quick Pick** menu, select the **Create a New Connection to z/OS** option.
4. Enter a profile name and press the `Enter` key.
5. Select the **zftp** connection type from the dropdown list of available connection options.
6. Continue providing values for the remaining prompts, which are specific for FTP-type connections.
