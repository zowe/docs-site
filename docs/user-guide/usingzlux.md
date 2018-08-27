# Using zLUX

zLUX provides the ability to create application plug-ins. For more information, see [Creating zLUX application plug-ins](mvd-creatingzluxappplugins.md). 

## Navigating MVD


From the Mainframe Virtual Desktop (MVD), you can access the Project Zowe applications. 

### Accessing the MVD

From a supported browser, open the MVD at `https://myhost:httpsPort/ZLUX/plugins/com.rs.mvd/web/index.html`
    
where:

-   *myHost* is the host on which you are running the Zowe Node Server.
-   *httpsPort* is the value that was assigned to *node.https.port* in `zluxserver.json`.
    For example, if you run the Zowe Node Server on host *myhost* and the value that is assigned to *node.https.port* in `zluxserver.json` is 12345, you would specify `https://myhost:12345/ZLUX/plugins/com.rs.mvd/web/index.html`.


### Logging in and out of the MVD

1. To log in, enter your mainframe credentials in the **Username** and  **Password** fields.
2. Press Enter. Upon authentication of your user name and password, the desktop opens.

To log out, click the the avatar in the lower right corner and click **Sign Out**.

## Using Explorers within zLUX
The explorer server provides a sample web client that can be used to view and manipulate the Job Entry Subsystem (JES), data sets, z/OS UNIX System Services (USS), and System log.

The following views are available from the explorer server Web UI and are accessible via the explorer server icon located in the application draw of MVD (Navigation between views can be performed using the menu draw located in the top left corner of the explorer server Web UI):

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

## Using zLUX application plug-ins

Application plug-ins are applications that you can use to access the mainframe and to perform various tasks. Developers can create application plug-ins using a sample application as a guide. The following application plug-ins are installed by default:

### Hello World
This sample application plug-in for developers demonstrates how to create a dataservice and how to create an application plug-in using Angular.

### IFrame
This sample application plug-in for developers demonstrates how to embed pre-made webpages within the desktop as an application and how an application can request an action of another application (see the source code for more information).

### ZOS Subsystems
This application plug-in helps you find information about the important services on the mainframe, such as CICS, Db2, and IMS.

### TN3270
This application plug-in provides a 3270 connection to the mainframe on
which the Zowe Node Server runs. 

### VT Terminal 
This application plug-in provides a connection to UNIX System Services and UNIX.
