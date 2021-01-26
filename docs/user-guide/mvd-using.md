# Using the Zowe Desktop

You can use the Zowe&trade; Application Framework to create application plug-ins for the Zowe Desktop. For more information, see [Extending the Zowe Application Framework](../extend/extend-desktop/mvd-extendingzlux.md). 

## Navigating the Zowe Desktop

From the Zowe Desktop, you can access Zowe applications. 

### Accessing the Zowe Desktop

From a supported browser, open the Zowe Desktop at `https://{myhost}:{httpsPort}` or you can navigate to the direct Desktop URI at `https://{myhost}:{httpsPort}/ZLUX/plugins/org.zowe.zlux.bootstrap/web/`
    
Where:

-   *myHost* is the host on which you are running the Zowe Application Server.
-   *httpsPort* is the value that was assigned to *node.https.port* in `server.json`.
    For example, if you run the Zowe Application Server on host *myhost* and the value that is assigned to *node.https.port* in `server.json` is 12345, you would specify `https://myhost:12345/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`.


### Logging in and out of the Zowe Desktop

1. To log in, enter your TSO credentials in the **Username** and  **Password** fields.
2. Press Enter. Upon authentication of your user name and password, the desktop opens.

To log out, click the User icon in the lower right corner and click **Sign Out**.

<img src="../images/mvd/person.png">

### Changing user password
 
1. Open the Preferences panel by clicking on the Preferences icon in the bottom right of the desktop.

<img src="../images/mvd/settings.png">
  
2. Click the Change Password icon. 
3. Fill out the Old Password and New Password fields.
4. Upon successful password change, you will be taken to the desktop.

### Updating an expired password

1. Upon logging in with an expired password, a screen will be displayed prompting you to change your password.
2. Enter and confirm your new password in the corresponding fields. 
3. Upon successful password change, you will be taken to the desktop.     

### Pinning applications to the task bar

1. Click the Start menu in the bottom left corner of the home screen.
2. Locate the application you want to pin.
3. Right-click the application icon and select **Pin to taskbar**.

### Personalizing the Desktop

1. Click the **Preferences icon** to open the Preferences panel.

<img src="../images/mvd/settings.png">

2. Click the **Personalization icon** to open the menu.

<img src="../images/mvd/personalization.png">

3. Drag an image into the wallpaper grid, or press the upload button, to upload a new Desktop wallpaper.
4. To set a new theme color, select a color from the palette or hue. 
5. Use the lightness swatch bar to adjust the lightness of the color. 
- Adjusting the lightness will also change the lightness of secondary text.  
6. Select a size (small, medium, or large) to adjust the scale of the Desktop UI. 

### Changing the desktop language
Use the Languages setting in the Preferences panel to change the desktop language. After you change the language and restart Zowe, desktop menus and text display in the specified language. Applications that support the specified desktop language also display in that language.

1. Click the Preferences icon in the lower right corner.
2. Click **Languages**.
3. In the **Languages** dialog, click a language, and then click **Apply**.
4. When you are prompted, restart Zowe.

## Zowe Desktop application plug-ins

Application plug-ins are applications that you can use to access the mainframe and to perform various tasks. Developers can create application plug-ins using a sample application as a guide. The following application plug-ins are installed by default:

### Hello World Sample
The Hello World sample application plug-in for developers demonstrates how to create a dataservice and how to create an application plug-in using Angular and using React.

### IFrame Sample
The IFrame sample application plug-in for developers demonstrates how to embed pre-made webpages within the desktop as an application and how an application can request an action of another application (see the source code for more information).

### z/OS Subsystems
The z/OS Subsystems plug-in helps you find information about the important services on the mainframe, such as CICS, Db2, and IMS.

### 3270 Terminal
The 3270 Terminal plug-in provides a user interface that emulates the basic functions of IBM 3270 family terminals. On the "back end," the plug-in and the Zowe Application Server connect to any standard TN3270E server.

### VT Terminal 
The VT Terminal plug-in provides a user interface that emulates the basic functions of DEC VT family terminals. On the "back end," the plug-in and the Zowe Application Server connect to VT compatible hosts, such as z/OS UNIX System Services (USS), using standard network protocols.

### API Catalog
The API Catalog plug-in lets you view API services that have been discovered by the API Mediation Layer. For more information about the API Mediation Layer, Discovery Service, and API Catalog, see [API Mediation Layer Overview](../getting-started/overview.md).

### Editor
With the Zowe Editor you can create and edit files and view datasets on the system that Zowe serves.

### Workflows
From the Workflows application plug-in you can create, manage, and use z/OSMF workflows to manage your system.

### JES Explorer
Use this application to query JES jobs with filters, and view the related steps, files, and status. You can also purge jobs from this view.

### MVS Explorer
Use this application to browse the MVS™ file system by using a high-level qualifier filter. With the MVS Explorer, you can complete the following tasks:

  - List the members of partitioned data sets.
  - Create new data sets using attributes or the attributes of an existing data set ("Allocate Like").
  - Submit data sets that contain JCL to Job Entry Subsystem (JES).
  - Edit sequential data sets and partitioned data set members with basic syntax highlighting and content assist for JCL and REXX.
  - Conduct basic validation of record length when editing JCL.
  - Delete data sets and members.
  - Open data sets in full screen editor mode, which gives you a fully qualified link to that file. The link is then reusable for example in help tickets.

### USS Explorer

  Use this application to browse the USS files by using a path. With the USS Explorer, you can complete the following tasks:

 - List files and folders.
 - Create new files and folders.
 - Edit files with basic syntax highlighting and content assist for JCL and REXX.
 - Delete files and folders.

## Using the Workflows application plug-in

The Workflows application plug-in is available from the Zowe Desktop Start menu. To launch Workflows, click the Start menu in the lower-left corner of the desktop and click the Workflows application plug-in icon. The **Users/Tasks Workflows** window opens.

### Logging on to the system

If you are prompted to log on to the system, complete these steps:

1. Enter your user ID and password.
2. Click **Sign in**.

### Updating the data display

To refresh the data on any tab, click ![the circular arrow](../images/mvd/mvd_workflow2.png) in the upper right corner of the window.

### Configuration

From the **Configuration** tab, you can view, add, and remove servers.

### Adding a z/OSMF server 

Complete these steps to add a new z/OSMF server:

1. Click the **Configuration** tab.
2. Click the plus sign (+) on the left side of the window.
3. In the **Host** field, type the name of the host.
4. In the **Port** field, type the port number.
5. Click **OK**.

### Testing a server connection

To test the connection, click **Test**. When the server is online the **Online** indicator next to the server **Host** and **Port** is green.

### Setting a server as the default z/OSMF server

Complete these steps to set a default z/OSMF server:

1. Click **Set as default**.
2. Enter your user ID and password.
3. Click **Sign in**.

**Note:** You must specify a default server.

### Removing a server

To remove a server, click **x** next to the server that you want to remove.

### Reload a server configuration

To reload a server configuration, click **Reload**.

### Save a server configuration

To save a server configuration, click **Save**.

### Workflows

To display all workflows on the system, click the **Workflows** tab. 

You can sort the workflows based on the following information:

**Workflow**

The name of the workflow.

**Description**

The description of the workflow.

**Version**

The version number.

**Owner**

The user ID of the workflow owner.

**System**

The system identifier.

**Status** 

The status of the workflow (**In progress** or **Completed**).

**Progress**

Indicates how much of the workflow has been completed based on the number of tasks completed.

### Searching workflows

To locate a specific workflow, type a search string in the search box in the upper right corner of the window.

### Defining a workflow

To define a workflow, complete these steps:

1. From the **Workflows** tab, click **Actions** > **New workflow**. (By default, the **Advanced Mode** check box is selected.)
2. In the **Name** field, specify a descriptive name for the workflow.
3. In the **Workflow definition file** field, specify the primary XML file for this workflow.
4. In the **System** field, specify a system.
5. In the **Owner** field, specify the user ID of the person that is responsible for assigning the tasks in the workflow. (To set the owner to the current user, select the **Set owner to current user** check box.)
4. Click **OK**.

### Viewing tasks

To view the tasks associated with a workflow, click the **My Tasks** tab. Workflows that have assigned tasks are shown on the left side of the window. The task work area is on the right side of the window.

You can choose to view workflows that have **Pending** or **Completed** tasks or you can choose to view all workflows (**Pending** and **Completed**) and their tasks, regardless of the task status.

For each workflow, you can click the arrow to expand or collapse the task list. Assigned tasks display below each workflow. Hovering over each task displays more information about the task, such as the status and the owner.

Each task has a indicator of **PERFORM** (a step to be performed) or **CHECK** (Check the step that was performed). Clicking **CHECK** or **PERFORM** opens a work area on the right side of the window. When a task is complete, a green clipboard icon with a checkmark is displayed.

**Note:** If you are viewing tasks on a **Pending** or **Completed** tab, only those workflows that have tasks with a corresponding status, are displayed. 

### Task work area

When you click **CHECK** or **PERFORM**, a work area on the right side of the window opens to display the steps to complete the task. Expand or collapse the work area by clicking  ![alt text](../images/mvd/mvd_workflow3.png).

**Tip:** Hovering over the task description in the title bar of the work area window on the right side displays more information about the corresponding workflow and the step description.

### Performing a task

1. To perform a task that has steps that are assigned to you, click **PERFORM**.
2. Use the work area to perform the steps associated with the selected task. Depending on the task, you might use an embedded tool (such as another application) or you might complete a series of steps to complete the task. 
3. If there are multiple steps to perform, click **Next** to advance to the next step for the task.
4. Click **Finish**.

**Note:** When a task is complete, a green clipboard icon with a checkmark is displayed next to the task.

### Checking a task

1. To check a task, click **CHECK**.
2. In the task work area, view the JESMSGLG, JESJCL, JESYSMSG, or SYSTSPRT output that is associated with the selected task.

### Managing tasks

To manage a task in the PERFORM status, click ![alt text](../images/mvd/mvd_workflow1.png) to the right of the task status. Choose from the following options:

**Properties**

Display the title and description of the task.

**Perform**

Perform the first step.

**Skip**

Skip this step.

**Override Complete**

Override the completion of the step. The selected step will be bypassed and will not be performed for this workflow. You must ensure that the step is performed manually.

**Assignment**

Opens the Manage Assignees window where authorized users can add or remove the user ID of the person that is assigned to the step.

**Return**

Remove ownership of the step.

### Viewing warnings

To view any warning messages that were encountered, click the **Warnings** tab. A message is listed in this tab each time it is encountered.

To locate a specific message, type a search string in the search box in the upper right corner of the window.

You can sort the warning messages based on the following information.

**Message Code**

The message code that is associated with the warning.

**Description**

A description of the warning.

**Date**

The date of the warning.

**Corresponding Workflow**

The workflow that is associated with the warning.
