# Using the Zowe Desktop

You can use the Zowe&trade; Application Framework to create application plug-ins for the Zowe Desktop. For more information, see [Extending the Zowe Application Framework](../extend/extend-desktop/mvd-extendingzlux.md). 

## Navigating the Zowe Desktop

From the Zowe Desktop, you can access Zowe applications. 

### Accessing the Zowe Desktop

From a supported browser, open the Zowe Desktop at `https://<gwshostname>:<gwsport>/zlux/ui/v1/` or you can navigate to the direct Desktop URI at `https://<gwshostname>:<gwsport>/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`
    
Where:

-   *gwshostname* is the host on which you are running the Zowe Application Server.
-   *gwsport* is the value that was assigned to *components.app-server.port* in the zowe configuration
    file.
    For example, if you run the Zowe Application Server on host *gwshostname* and the value that is assigned to *components.app-server.port* in the zowe configuration file is 12345, you would specify `https://<gwshostname>:12345/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`.


### Logging in and out of the Zowe Desktop

1. To log in, enter your TSO credentials in the **Username** and  **Password** fields.
2. Press Enter. Upon authentication of your user name and password, the desktop opens.

To log out, click the User icon in the lower right corner and click **Sign Out**.

<img src={require("../images/mvd/person.png").default}/>

### Changing user password
 
1. Open the Preferences panel by clicking on the Preferences icon in the bottom right of the desktop.

<img src={require("../images/mvd/settings.png").default}/>
  
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

### Open application in new tab

1. Click the Start menu in the bottom left corner of the home screen.
2. Locate the application you want to open in new tab.
3. Right-click the application icon and select **Open In New Browser Tab**.

  - While opening a application in new tab you can also do the following:
   
     -  You can use url to send data to the application, for example you would specify
        `https://<gwshostname>:<gwsport>//ZLUX/plugins/org.zowe.zlux.bootstrap/web/?pluginId=org.zowe.editor:data:{"type":"openFile","name":"<path of file>"}`
     -  You can use url to open application directly on browser with and without credentials using
         `showLogin` in url.
            1. If `showLogin = true` then you need to login with your credntials before using an 
               application for example.
              `https://<gwshostname>:<gwsport>/ZLUX/plugins/org.zowe.zlux.bootstrap/web/?pluginId=org.zowe.terminal.tn3270&showLogin=true`.
            2. If `showLogin = false` then you can access application directly without login.

### Personalizing the Desktop

1. Click the **Preferences icon** to open the Preferences panel.

<img src={require("../images/mvd/settings.png").default}/>

2. Click the **Personalization icon** to open the menu.

<img src={require("../images/mvd/personalization.png").default}/>

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

### 3270 Terminal
The 3270 Terminal plug-in provides a user interface that emulates the basic functions of IBM 3270 family terminals. On the "back end," the plug-in and the Zowe Application Server connect to any standard TN3270E server.

### VT Terminal 
The VT Terminal plug-in provides a user interface that emulates the basic functions of DEC VT family terminals. On the "back end," the plug-in and the Zowe Application Server connect to VT compatible hosts, such as z/OS UNIX System Services (USS), using standard network protocols.

### API Catalog
The API Catalog plug-in lets you view API services that have been discovered by the API Mediation Layer. For more information about the API Mediation Layer, Discovery Service, and API Catalog, see [API Mediation Layer Overview](../getting-started/overview.md).

### Editor
With the Zowe Editor you can create and edit files and view datasets on the system that Zowe serves.

### JES Explorer
Use this application to query JES jobs with filters, and view the related steps, files, and status. You can also purge jobs from this view.

### IP Explorer
With the IP Explorer you can monitor the TCP/IP stacks, view active connections and reserved ports.

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


