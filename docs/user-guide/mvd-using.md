# Using the Zowe Desktop

You can use the Zowe Application Framework to create application plug-ins for the Zowe Desktop. For more information, see [Exending the Zowe Application Framework](mvd-extendingzlux.md). 

## Navigating the Zowe Desktop

From the Zowe Desktop, you can access Zowe applications. 

### Accessing the Zowe Desktop

From a supported browser, open the Zowe Desktop at `https://myhost:httpsPort/ZLUX/plugins/com.rs.mvd/web/index.html`
    
where:

-   *myHost* is the host on which you are running the Zowe Application Server.
-   *httpsPort* is the value that was assigned to *node.https.port* in `zluxserver.json`.
    For example, if you run the Zowe Application Server on host *myhost* and the value that is assigned to *node.https.port* in `zluxserver.json` is 12345, you would specify `https://myhost:12345/ZLUX/plugins/com.rs.mvd/web/index.html`.


### Logging in and out of the Zowe Desktop

1. To log in, enter your mainframe credentials in the **Username** and  **Password** fields.
2. Press Enter. Upon authentication of your user name and password, the desktop opens.

To log out, click the the avatar in the lower right corner and click **Sign Out**.

### Pinning applications to the task bar

1. Click the Start menu.
2. Locate the application you want to pin.
3. Right-click the on the application icon and select **Pin to taskbar**.


## Using Explorers within the Zowe Desktop
The explorer server provides a sample web client that can be used to view and manipulate the Job Entry Subsystem (JES), data sets, z/OS UNIX System Services (USS), and System log.

The following views are available from the explorer server Web UI and are accessible via the explorer server icon located in the application draw of Zowe Desktop (Navigation between views can be performed using the menu draw located in the top left corner of the explorer server Web UI):

**JES Explorer**

  Use this view to query JES jobs with filters, and view the related steps, files, and status. You can also purge jobs from this view.

**Data set Explorer**

  Use this view to browse the MVS™ file system by using a high-level qualifier filter. With the Dataset Explorer, you can complete the following tasks:

  - List the members of partitioned data sets.
  - Create new data sets using attributes or the attributes of an existing data set ("Allocate Like").
  - Submit data sets that contain JCL to Job Entry Subsystem (JES).
  - Edit sequential data sets and partitioned data set members with basic syntax highlighting and content assist for JCL and REXX.
  - Conduct basic validation of record length when editing JCL.
  - Delete data sets and members.
  - Open data sets in full screen editor mode, which gives you a fully qualified link to that file. The link is then reusable for example in help tickets.

**UNIX file Explorer**

  Use this view to browse the USS files by using a path. With the UNIX file Explorer, you can complete the following tasks:

 - List files and folders.
 - Create new files and folders.
 - Edit files with basic syntax highlighting and content assist for JCL and REXX.
 - Delete files and folders.
  

## Zowe Desktop application plug-ins

Application plug-ins are applications that you can use to access the mainframe and to perform various tasks. Developers can create application plug-ins using a sample application as a guide. The following application plug-ins are installed by default:

### Hello World Sample
The Hello World sample application plug-in for developers demonstrates how to create a dataservice and how to create an application plug-in using Angular.

### IFrame Sample
The IFrame sample application plug-in for developers demonstrates how to embed pre-made webpages within the desktop as an application and how an application can request an action of another application (see the source code for more information).

### z/OS Subsystems
This z/OS Subsystems plug-in helps you find information about the important services on the mainframe, such as CICS, Db2, and IMS.

### TN3270
This TN3270 plug-in provides a 3270 connection to the mainframe on which the Zowe Application Server runs. 

### VT Terminal 
The VT Terminal plug-in provides a connection to UNIX System Services and UNIX.

### API Catalog
The API Catalog plug-in lets you view API services that have been discovered by the API Mediation Layer. For more information about the API Mediation Layer, Discovery Service, and API Catalog, see [API Mediation Layer Overview](#api-mediation-layer-architecture).

### Workflows

From the Workflows application plug-in you can create, manage, and use z/OSMF workflows to manage your system.

## Using the Workflows application plug-in

The Workflows application plug-in is available from the Zowe Deskstop Start menu. To launch Workflows, click the Start menu in the lower-left corner of the desktop and click the Workflows application plug-in icon. The **Users/Tasks Workflows** window opens.

To refresh the display, click the circular arrow in the upper right corner of the window.

### Configuration

From the **Configuration** tab, you can view, add, and remove servers.

### Adding a z/OSMF server 

Complete these steps to add a new z/OSMF server:

1. Click the **Configuration** tab.
2. Click the plus sign (+) on the left side of the window.
3. In the **Host** field, type the name of the host.
4. In the **Port** field, type the port number.
5. Click **OK**.

To test the connection, click **Test**. When the server is online the **Online** indicator next to the server Host and Port is green.

### Setting a server as the default z/OSMF server

Complete these steps to set a default z/OSMF server:

1. Click **Set as default**.
2. Enter your user ID and password.
3. Click **Sign in**.

**Note:** You must specify a default server.

### Removing a server

To remove a server, click **x** next to the server in the list that you want to remove.

### Workflows

Click the **Workflows** tab to display all workflows on the system. 

**Tip:** To search for a particular workflow, type the search string in the search box in the upper right portion of the tab.

The following information is displayed on the **Workflows** tab.

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

The status of the workflow (for example, **In progress**, **Completed**, and so on.)

**Progress**

Progress indicator.

### Defining a workflow

Complete these steps to define a workflow:
1. From the **Workflows** tab, click **Action** in the upper left corner of the tab.
2. Click **New workflow**.
3. Specify the Name, Workflow definition file, System, and Owner.
4. Click **OK**.

### Viewing tasks

To view your tasks, click the **My Tasks** tab. This tab displays Workflow tasks that belong to you. You can choose to view **Pending**, **Completed**, or **All** tasks. Workflows that have tasks that are assigned to you are shown on the left side of the window. For each workflow, you can click the arrow to expand or collapse the task list. Your assigned tasks display below each workflow. Hovering over each task displays more information about the task, such as the status and the owner.

Each task has a indicator of **PERFORM** (a step needs to be performed) or **CHECK** (Check the step that was performed). Clicking **CHECK** or **PERFORM** opens a work area on the right side of the window.

**Note:** When a task is complete, a green clipboard icon with a checkmark is displayed.

Hovering over the task description in the title bar of the work area window on the right side displays more information corresponding workflow and the step description.

### Task work area
 When you click **CHECK** or **PERFORM**  a work area on the right side of the window is displayed.

-  When you click **CHECK**, you can view the JESMSGLG, JESJCL, JESYSMSG, or SYSTSPRT that is associated with the selected task.

-   When you click **PERFORM**, you can use the work area to perform the steps associated with the selected task. Click **Next** to advance to the next step for the task.

### Viewing warnings

Click the **Warnings** tab to view any warning messages that were encountered.

The following information is displayed on the **Warnings** tab.

**Message Code**

The message code that is associated with the warning.

**Description**

A description of the warning.

**Date**

The date of the warning.

**Corresponding Workflow**

The workflow that is associated with the warning.
