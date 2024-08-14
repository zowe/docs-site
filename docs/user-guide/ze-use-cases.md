# Sample use cases

The following use cases demonstrate the various functionalities available in Zowe Explorer.

## Working with data sets

### Viewing data sets and using multiple filters

1. Expand **DATA SETS** in the **Side Bar**, and hover over the profile you want to filter.
2. Click the **Search** icon.
3. Use the **Quick Pick** field to select or enter the patterns you want to apply as filters.  
   
   The data sets that match your pattern(s) display in the **Side Bar**.

   **Tip:** To use multiple filters, separate individual entries with a comma. You can append or postpend any filter with an \* to indicate a wildcard search. You cannot enter an \* as the entire pattern.

   ![View Data Set](../images/ze/ZE-multiple-search.gif)

### Viewing data sets with member filters

1. Expand **DATA SETS** in the **Side Bar**, and hover over the profile you want to filter.
2. Click the **Search** icon.
3. In the **Quick Pick** field, enter or select a search pattern in the `HLQ.ZZZ.SSS(MEMBERNAME)` format to filter out and display the specified member in the **Side Bar**.

   ![View Data Set With Member Pattern](../images/ze/ZE-member-filter-search.gif)

### Refreshing the list of data sets

1. Hover over  **DATA SETS** in the **Side Bar**.
2. Click the **Refresh All** icon.

### Renaming data sets

1. Expand **DATA SETS** in the **Side Bar**, and select the data set you want to rename.
2. Right-click the data set and select the **Rename Data Set** option.
3. Enter the new name of the data set in the **input box**.

   ![Rename Data Set](../images/ze/ZE-rename.gif)

### Copying data set members

1. Expand **DATA SETS** in the **Side Bar**, and select the member you want to copy.
2. Right-click the member and select the **Copy Member** option.
3. Right-click the data set where the member is to be contained and select the **Paste Member** option.
4. In the **input box**, enter the name of the copied member.

   ![Copy Data Set Member](../images/ze/ZE-copy-member.gif)

### Editing and uploading a data set member

1. Expand **DATA SETS** in the **Side Bar**, and select a profile to open it.
2. Open the data set with the member you want to edit.
3. Click on the member name to display it in an **Editor** tab.
4. Edit the document.
5. Press `Ctrl`+`S` or `Command`+`S` to save the changes and upload the data set to the mainframe.

   **Note:** If someone else has made changes to the data set member while you were editing, you can merge your changes before uploading to the mainframe. See [Preventing merge conflicts](#preventing-merge-conflicts) for more information.

   ![Edit and upload a data set member](../images/ze/ZE-edit-upload.gif)

### Preventing merge conflicts

1. Expand **DATA SETS** in the **Side Bar**, and navigate to the member you want to edit.
2. Edit the document in the **Editor** tab.
3. Press `Ctrl`+`S` or `Command`+`S` to save the changes.

   If the original content in your local version no longer matches the same file in the mainframe, a warning message displays advising the user to compare both versions.
4. If necessary, use the editor tool bar to resolve merge conflicts.

   ![Prevent merge conflicts](../images/ze/ZE-save.gif)

### Creating data sets and specifying parameters

1. Expand **DATA SETS** in the **Side Bar**.
2. Right-click the profile you want to create a data set with and select **Create New Data Set**.
3. Enter a name for your data set in the **input box** and press `Enter`.
4. From the **Quick Pick** menu, select the data set type that you want to create and press `Enter`.
5. Select **Edit Attributes** in the **Quick Pick** menu and press `Enter`.

   The attributes list for the data set displays. You can edit the following attributes:

   - Allocation Unit

   - Average Block Length

   - Block Size

   - Data Class

   - Device Type

   - Directory Block

   - Data Set Type

   - Management Class

   - Data Set Name

   - Data Set Organization

   - Primary Space

   - Record Format

   - Record Length

   - Secondary Space

   - Size

   - Storage Class

   - Volume Serial

6. Select the attribute you want to edit, provide the value in the **input box**, and press `Enter`.
7. (Optional) Edit the parameters of your data set.
8. Select the **+ Allocate Data Set** option to create the data set and list it in the **Side Bar**.

   ![Set Parameters](../images/ze/ZE-set-params.gif)

### Creating data sets and data set members

1. Expand **DATA SETS** in the **Side Bar**.

2. Right-click on the profile where you want to create a data set and select **Create New Data Set**.
3. Enter a name for your data set in the **input box** and press `Enter`.
4. From the **Quick Pick** menu, select the data set type that you want to create.
5. Select **+Allocate Data Set** to create your data set.
6. In the **Side Bar**, right-click your newly-created data set and select **Create New Member**.
7. Enter a name for your new data set member in the **input box** and press **Enter**.
   The member is created and opened in an **Editor** tab.

### Deleting a data set member and a data set

1. Expand **DATA SETS** in the **Side Bar**.
2. Open the profile and data set containing the member you want to delete.
3. Right-click the member and select **Delete Member**.
4. Confirm the deletion by selecting **Delete** on the **Quick Pick** menu.
5. To delete a data set, right-click the data set and select **Delete Data Set**, then confirm the deletion.

   **Note:** You can delete a data set before you delete its members.

   ![Delete](../images/ze/ZE-delete-ds.gif)

### Viewing data set, member attributes

1. Expand **DATA SETS** in the **Side Bar**, and click the **+** icon.
2. Select the **Search** icon.
3. In the **Quick Pick** field, enter or select a search pattern to filter search results in the **Side Bar**.
4. Right-click a data set or member and select the **Show Attributes** option.

   This displays the attributes in an **Editor** tab.

    ![View Data Set, Member Attributes](../images/ze/ZE-show-attributes.gif)

### Viewing and accessing multiple profiles simultaneously

1. Expand **DATA SETS** in the **Side Bar**, and click the **+** icon.
2. Select the profiles from the **Quick Pick** menu to add them to the **Side Bar**.
3. Click the **Search** icon for each profile to search and select associated data sets.

   ![Add Profile](../images/ze/ZE-mult-profiles.gif)

### Filtering data set members

Filter partitioned data set members in the **DATA SETS** tree view by **Date Modified** or **User ID**.

#### Filtering all data set members under a specific profile

1. In the **DATA SETS** tree, click on the **Filter** icon to the right of a profile, or right-click on a profile and select the **Filter PDS members…** option.

   The filter selection menu appears in the **Quick Pick** field.
2. Select a filter type from the list of available options:
   - **Date Modified**
   - **User ID**
3. Enter a valid value for the selected filter.
4. Press the `Enter` key to confirm the filter.

   Expanded data sets display a filtered list of members under the selected profile in the **DATA SETS** tree.

   ![Filtering all PDS members under a specific profile](../images/ze/ZE-filtering-profile-PDS-members.gif)

#### Filtering members for a single data set

1. In the **DATA SETS** tree, right-click on a data set and select the **Filter PDS members…** option.

   The filter selection menu appears in the **Quick Pick** field.
2. Select a filter type from the list of available options:
   - **Date Modified**
   - **User ID**
3. Enter a valid value for the selected filter.
4. Press the `Enter` key to confirm the filter. This overrides any *profile* filter preferences that might be in effect for the single data set.

   The selected data set displays a filtered list of members in the **DATA SETS** tree.

   ![Filtering PDS members for a single PDS](../images/ze/ZE-filtering-a-specific-PDS.gif)

### Sorting data set members

Sort partitioned data set members in the **DATA SETS** tree view by member **Name**, **Date Modified**, or **User ID**.

#### Sorting all data set members under a specific profile

1. In the **DATA SETS** tree, click on the **Sort** icon to the right of a profile, or right-click on a profile and select the **Sort PDS members…** option.

   The sorting selection menu appears in the **Quick Pick** field.
2. To change the sorting direction, select the **Sort Direction** option and select a direction type from the **Quick Pick** menu.
3. Select a sort type from the list of available options:
   - **Name**
   - **Date Modified**
   - **User ID**
4. Enter a valid value for the selected sort type.
5. Press the `Enter` key to confirm the sort type.

   Expanded data sets display a sorted list of members under the selected profile in the **DATA SETS** tree.

   ![Sorting all PDS members in a profile ](../images/ze/ZE-sorting-profile-PDS-members.gif)

#### Sorting members for a single data set

1. In the **DATA SETS** tree, right-click on a data set and select the **Sort PDS members…** option.
   The sort selection menu appears in the **Quick Pick** field.
2. To change the sorting direction, select the **Sort Direction** option and select a direction type from the **Quick Pick** menu.
3. Select a sort type from the list of available options:
   - **Name**
   - **Date Modified**
   - **User ID**
4. Enter a valid value for the selected sort type.
5. Press the `Enter` key to confirm the sort type. This overrides any *profile* sort preferences that might be in effect for the single PDS.

   The selected data set displays a sorted list of members in the **DATA SETS** tree.

   ![Sorting a single PDS](../images/ze/ZE-sorting-a-specific-PDS.gif)

### Submiting a JCL

1. Expand **DATA SETS** in the **Side Bar**.
2. Select the data set or data set member you want to submit.
3. Right-click the data set or member and select the **Submit Job** option.

   **Note:** Click on the hyperlink on the notification pop-up message to view the job.

   ![Submit a JCL](../images/ze/ZE-submit-jcl.gif)

### Allocate like

1. Expand **DATA SETS** in the **Side Bar**.
2. Right-click a data set and select the **Allocate Like (New File with Same Attributes)** option.
3. Enter the new data set name in the **input box** and press `Enter`.

   ![Allocate Like](../images/ze/ZE-allocate.gif)

## Working with USS files

### Viewing Unix System Services (USS) files

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.
2. Hover over the profile you want to search and click the **Search** icon.
3. In the **Quick Pick** field, enter or select the path that you want as the root of your displayed tree and press `Enter`.
   
   All child files and directories of that path display in the **Side Bar**.

   **Note:** You will not be able to expand directories or files to which you are not authorized.

    ![Enter Path](../images/ze/ZE-path.gif)

### Refreshing the list of files

1. Hover over **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.
2. Click the **Refresh All** button.

   ![Refresh All](../images/ze/ZE-refreshUSS.gif)

### Renaming USS files

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.

2. Select a USS file you want to rename.
3. Right-click the USS file and select the **Rename USS file** option.
4. In the **input box**, change the name of the USS file and press `Enter`.

### Downloading, editing, and uploading existing USS files

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.
2. Navigate to the file you want to download and click on the file name.

   This displays the file in an **Editor** tab.

   **Note:** If you define file associations with syntax coloring, the suffix of your file will be marked up.

3. Edit the document.
4. Press `Ctrl`+`S` or `Command`+`S` to save the changes and upload the USS file to the mainframe.

   ![Edit](../images/ze/ZE-editUSS.gif)

### Creating and deleting USS files and directories

#### Creating a directory

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.

2. Right-click the directory where you want to add the new directory.
3. Select the **Create Directory** option and enter the directory name in the **input box**.
4. Press `Enter` to create the directory.

#### Creating a file

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.

2. Right-click the directory to which you want to add the new file.
3. Select the **Create File** option and enter the file name in the **input box**.
4. Press `Enter` to create the file.

#### Deleting a file

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.

2. Right-click the file you want to remove.
3. Select the **Delete** option and click **Delete** again to confirm and delete the file.

#### Deleting a directory

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**.
2. Right-click the directory you want to remove.
3. Select the **Delete** button and click **Delete** again to confirm and delete the directory and all its child files and directories.

   ![Create and Delete](../images/ze/ZE-CreateDelete.gif)

### Viewing and accessing multiple USS profiles simultaneously

1. Expand **UNIX SYSTEM SERVICES (USS)** in the **Side Bar**, and click the **+** icon.
2. Select or enter a profile in the **Quick Pick** drop-down menu to add it to the **Side Bar**.

   ![View Profiles](../images/ze/ZE-profile2.gif)

## Working with jobs

### Viewing a job

1. Expand **JOBS** in the **Side Bar**.
2. Open a directory with JCL files.
3. Right-click on the JCL file you want to view, and select the **Get JCL** option.

   ![View JOB](../images/ze/ZE-jobs-get-jcl.gif)

### Downloading spool content

1. Expand **JOBS** in the **Side Bar**.
2. Open a directory with JCL files.
3. Click the **Download** icon next to a folder with the spool content.
4. Save the file on your computer.

   ![Download Spool](../images/ze/ZE-jobs-download-spool.gif)

### Issuing MVS commands

1. Expand **JOBS** in the **Side Bar**.
2. Right-click on your profile and select the **Issue MVS Command** option.

   Alternatively, press the `F1` key to open the **Command Pallette**, then select the **Zowe Expolorer: Issue MVS Command** option.

3. In the **Quick Pick** field, enter a new command or select a saved command.
4. Press `Enter` to execute the command.

   ![Issue a MVS command](../images/ze/ZE-Jobs-Issue-TSO-Command.gif)

### Issuing TSO commands

1. Expand **JOBS** in the **Side Bar**.
2. Right-click on your profile and select the **Issue TSO Command** option.

   Alternatively, press the `F1` key to open the **Command Pallette**, then select the **Zowe Explorer: Issue TSO Command** option.

3. In the **Quick Pick** field, enter a new command or select a saved command.
4. Press `Enter` to execute the command.

   The output displays in the **Output** panel.

   ![Issue a TSO command](../images/ze/ZE-TSO-Command.gif)

### Polling a spool file

Users can periodically refresh a spool file during long-running jobs to get the latest job outputs. This avoids having to close and reopen a spool file to get the latest job outputs.

There are two main ways to poll a spool file &mdash; automatically at set intervals or manually on demand.

#### **Defining a default interval for polling spool files**
<br/>

1. Click on the **Settings** icon on the **Activity Bar** and select **Settings**.
2. In either the **User** or **Workspace** tab, click on the **Extensions** option to open the menu.
3. Select **Zowe Explorer**.
4. In the **Jobs: Poll Interval** field, enter a valid time interval, in milliseconds.
 	- Value must be greater than or equal to 1000 ms (1 second).
5. Press **Enter** to start the polling action.

#### **Polling a spool file at set intervals**
<br/>

1. Expand **JOBS** in the **Side Bar**.
2. Navigate to the spool file by expanding its corresponding profile and job folder.
3. Right click the spool file and select **Start Polling**.
    - Repeat this step with additional spool files to poll multiple files simultaneously.
4. The **Poll interval (in ms) for: &lt;spoolfilename&gt;** field displays the current interval value.
    - The default value is set to 5000 ms.
    - Change the value by entering a different number (must be greater than or equal to 1000 ms).
5. Press **Enter** to confirm the interval time and start the polling action.

   The poll request is added to the poller, and the selected spool file is marked with a "**P**" in the **Side Bar** and any corresponding **Editor** tabs.

   ![Start polling a spool file at set intervals](../images/ze/ZE-start-polling-V2.gif)

<br/>

#### **Stopping spool file polling**
<br/>

1. In the **Side Bar**, select a spool file that is being polled.

   Spool files being polled are marked with a "**P**" in the **Side Bar**.

2. Right click the spool file and select **Stop Polling**.

   The poll request is removed from the poller, and the selected spool file is no longer marked with a "**P**" in the **Side Bar** and any corresponding **Editor** tabs.

#### **Polling a spool file manually**

<br/>A spool file can be polled on demand by using a designated keyboard shortcut.

To manually poll a spool file:

1. In the **Side Bar**, double click a spool file to open it in an **Editor** tab.
2. With the spool file in an active tab, press the keyboard shortcut.
    - See [Configuring the keyboard shortcut for manual polling](#configuring-the-keyboard-shortcut-for-manual-polling) to set the keyboard shortcut.

   <br/>
   
   The spool file is updated and "**Polling...**" displays in the bottom status bar.

#### **Configuring the keyboard shortcut for manual polling**
<br/>

1. Click on the **Settings** icon on the **Activity Bar** and select **Keyboard Shortcuts**.

2. Navigate to **Zowe Explorer: Poll Content in Active Editor**.
3. Select the **Edit** icon to designate a different keyboard shortcut.
    - The default shortcut is the `F5` key.
    <br/>
    
    The entered key(s) can be used to activate polling.
