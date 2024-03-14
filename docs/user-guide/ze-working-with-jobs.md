# Working with jobs

### Viewing a job

1. Expand **JOBS** in the **Side Bar**.
2. Open a directory with JCL files.
3. Right-click on the JCL file you want to view, and select the **Get JCL** option.

   ![View JOB](../images/ze/ZE-jobs-get-jcl.gif)

## Downloading spool content

1. Expand **JOBS** in the **Side Bar**.
2. Open a directory with JCL files.
3. Click the **Download** icon next to a folder with the spool content.
4. Save the file on your computer.

   ![Download Spool](../images/ze/ZE-jobs-download-spool.gif)

## Sorting jobs

1. Expand **JOBS** in the **Side Bar**.
2. Click on the **Sort** icon to the right of a profile.
3. Select the **Sort Direction** option and select either **Ascending** or **Descending** from the **picker** field.
4. Select a sort type from the list of available options:
   - **Job ID (default)**
   - **Name**
   - **Date Submitted**
   - **Date Completed**
   - **Job Name**
   - **Return Code**

   ![Sorting jobs by date completed](../images/ze/ZE-sorting-jobs-by-date-completed.gif)

## Issuing MVS commands

1. Expand **JOBS** in the **Side Bar**.
2. Right-click on your profile and select the **Issue MVS Command** option.

   Alternatively, press the `F1` key to open the **Command Pallette**, and then select the **Zowe Expolorer: Issue MVS Command** option.

3. In the **picker** field, enter a new command or select a saved command.
4. Press `Enter` to execute the command.

   ![Issue a MVS command](../images/ze/ZE-Jobs-Issue-TSO-Command.gif)

## Issuing TSO commands

1. Expand **JOBS** in the **Side Bar**.
2. Right-click on your profile and select the **Issue TSO Command** option.

   Alternatively, press the `F1` key to open the **Command Pallette**, then select the **Zowe Explorer: Issue TSO Command** option.

3. In the **picker** field, enter a new command or select a saved command.
4. Press `Enter` to execute the command.

   The output displays in the **Output** panel.

   ![Issue a TSO command](../images/ze/ZE-TSO-Command.gif)

## Polling a spool file

Users can periodically refresh a spool file during long-running jobs to get the latest job outputs. This avoids having to close and reopen a spool file to get the latest job outputs.

There are two main ways to poll a spool file &mdash; automatically at set intervals or manually on demand.

### Defining a default interval for polling spool files
<br/>

1. Click on the **Settings** icon on the **Activity Bar** and select **Settings**.
2. In either the **User** or **Workspace** tab, click on the **Extensions** option to open the menu.
3. Select **Zowe Explorer**.
4. In the **Jobs: Poll Interval** field, enter a valid time interval, in milliseconds.
 	- Value must be greater than or equal to 1000 ms (1 second).
5. Press **Enter** to start the polling action.

### Polling a spool file at set intervals
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

### Stopping spool file polling
<br/>

1. In the **Side Bar**, select a spool file that is being polled.

   Spool files being polled are marked with a "**P**" in the **Side Bar**.

2. Right click the spool file and select **Stop Polling**.

   The poll request is removed from the poller, and the selected spool file is no longer marked with a "**P**" in the **Side Bar** and any corresponding **Editor** tabs.

### Polling a spool file manually

<br/>A spool file can be polled on demand by using a designated keyboard shortcut.

To manually poll a spool file:

1. In the **Side Bar**, double click a spool file to open it in an **Editor** tab.
2. With the spool file in an active tab, press the keyboard shortcut.
    - See [Configuring the keyboard shortcut for manual polling](#Configuring-the-keyboard-shortcut-for-manual-polling) to set the keyboard shortcut.

   <br/>
   
   The spool file is updated and "**Polling...**" displays in the bottom status bar.

### Configuring the keyboard shortcut for manual polling
<br/>

1. Click on the **Settings** icon on the **Activity Bar** and select **Keyboard Shortcuts**.

2. Navigate to **Zowe Explorer: Poll Content in Active Editor**.
3. Select the **Edit** icon to designate a different keyboard shortcut.
    - The default shortcut is the `F5` key.
    <br/>
    
    The entered key(s) can be used to activate polling.