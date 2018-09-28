# Using the Zowe Application Framework

The Zowe Application Framework provides the ability to create application plug-ins. For more information, see [Exending the Zowe Application Framework](mvd-extendingzlux.md). 

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

## Using Explorers within the Zowe Application Framework
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

## Zowe Application Framework application plug-ins

Application plug-ins are applications that you can use to access the mainframe and to perform various tasks. Developers can create application plug-ins using a sample application as a guide. The following application plug-ins are installed by default:

### Hello World
This sample application plug-in for developers demonstrates how to create a dataservice and how to create an application plug-in using Angular.

### IFrame
This sample application plug-in for developers demonstrates how to embed pre-made webpages within the desktop as an application and how an application can request an action of another application (see the source code for more information).

### ZOS Subsystems
This application plug-in helps you find information about the important services on the mainframe, such as CICS, Db2, and IMS.

### TN3270
This application plug-in provides a 3270 connection to the mainframe on
which the Zowe Application Server runs. 

### VT Terminal 
This application plug-in provides a connection to UNIX System Services and UNIX.

### Workflows

From the Workflows application plug-in you can create, manage, and use z/OSMF workflows to manage your z/OS system.

## Workflows 

The Workflows application plug-in is available from the Zowe Deskstop Start menu. To launch Workflows, click the Start menu in the lower-left corner of the desktop and click the Workflows application plug-in icon.

### Navigating Workflows

When you launch the Workflows application plug-in, the **Users/Tasks Workflows** window opens.

To refresh the display, click the circular arrow in the upper right corner.

The following tabs are available:

**My Tasks**

This tab displays Workflow tasks that belong to you. You can choose to view **Pending**, **Completed**, or **All** tasks. Workflows that have tasks that are assigned to you are shown on the left side of the window. For each workflow, you can click the arrow to expand or collapse the task list. Your assigned tasks display below each workflow. Hovering over each task displays more information about the task, such as the status and the owner.

Each task has a indicator of **PERFORM** (a step needs to be performed) or **CHECK** (Check the step that was performed). Clicking **CHECK** or **PERFORM** opens a work area on the right side of the window.

**Note:** When a task is complete, a green clipboard icon with a checkmark is displayed.

Hovering over the task description in the title bar of the work area window on the right side displays more information corresponding workflow and the step description.

**Workflows**

This tab displays all workflows on the system. 

**Tip:** To search for a particular workflow, type the search string in the search box in the upper right portion of the tab.

**Workflow**

The name of the workflow.

**Description**

Workflow description.

**Version**

The version number.

**Owner**

User ID of the workflow owner.

**System**

The system identifier.

**Status** 

The status of the workflow (for example, In progress, Completed, and so on.)

**Progress**

Progress indicator.

**Warnings**

This tab lists any warning messages that were encountered.

**Message Code**

The message code associated with the warning.

**Description**

A description of the warning.

**Date**
The date of the warning.

**Corresponding Workflow**

The workflow that is associated with the warning.

**Configuration**

This tab displays the server configuration and the active servers.

From the **Configuration** tab, you can add and remove servers.

### Adding a new z/OSMF server (Configuration)

Complete these steps to add a new z/OSMF server:

1. Click the **Configuration** tab.
2. Click the plus sign (+) on the left side of the window.
3. In the **Host** field, type the name of the host.
4. In the **Port** field, type the port number.
5. Click **OK**.
