# Using Zowe Desktop

You can use the Zowe&trade; Application Framework to create application plugins for the Zowe Desktop. For more information, see [Extending the Zowe Application Framework](../extend/extend-desktop/mvd-extendingzlux.md). 

## Enabling Server Components for the Desktop

The Zowe Desktop requires the `app-server` Component of Zowe to be enabled.
This is set by default, but can be controlled by the Zowe YAML property `components.app-server.enabled` which should be set to `true`.

When this server is running, it will print the message `ZWED0031I` when fully ready.

## Navigating the Zowe Desktop

From the Zowe Desktop, you can access Zowe applications.

### Accessing the Zowe Desktop

From a supported browser, open the Zowe Desktop at `https://zowe.externalDomains[0]:zowe.externalPort/zlux/ui/v1/` or you can navigate to the direct Desktop URI at `https://zowe.externalDomains[0]:zowe.externalPort/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`
    
Where:

-   *zowe.externalDomains* is the host on which you are running the Zowe Application Server, its the value that was assigned in the zowe configuration file.
-   *zowe.externalPort*  is the value of Gateway port that was assigned in the zowe configuration file.
    
### Alternative Desktop access

The above URL can be modified with query parameters for the following purposes:

| Action | Query Parameter | Example | Detail |
|--------|-----------------|---------|--------|
| Access Desktop without Gateway proxy | zwed-no-redirect=1 | `https://zowe.externalDomains[0]:components.app-server.port/?zwed-no-redirect=1` | When the APIML Gateway is running, the Desktop should be reached through it instead of going to the app-server port directly. The Desktop avoids direct access by redirecting users to the gateway URL when possible. To disable this behavior for direct access, you can use "zwed-no-redirect=1". This is intended for troubleshooting and is not recommended otherwise since some Desktop apps will not work without being accessed via the gateway URL. |
| Access the Zowe v2 Desktop | use-v2-desktop=true | `https://zowe.externalDomains[0]:zowe.externalPort/zlux/ui/v1/?use-v2-desktop=true` | Zowe V3 includes the Zowe v2 Desktop for ease of transition. By default, the V3 desktop is used but if you have an app that does not yet work on the V3 Desktop, you can use the v2 Desktop through this parameter. The v2 desktop is in maintenance mode and no longer receives enhancements. |


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

  - While opening an application in new tab you can also do the following:
   
     -  You can use url to send data to the application, for example you would specify
        `https://zowe.externalDomains[0]:zowe.externalPort/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/?pluginId=org.zowe.editor:data:{"type":"openFile","name":"<path of file>"}`
     -  You can use url to open application directly on browser with and without credentials using
         `showLogin` in url.
            1. If `showLogin = true` then you need to login with your credentials before using an 
               application for example.
              `https://zowe.externalDomains[0]:zowe.externalPort/zlux/ui/v1/ZLUX/plugins/org.zowe.zlux.bootstrap/web/?pluginId=org.zowe.terminal.tn3270&showLogin=true`.
            2. If `showLogin = false` then you can access application directly without login.

## Keyboard shortcuts

The following keyboard shortcuts can be used in the Desktop to navigate or perform actions with only the keyboard.

|Keyboard Shortcut|Command|
|---	|---	|
|CTRL+ALT+M  |Open the Zowe launchbar menu. Use the UP/DOWN arrow keys to select an app, RIGHT arrow key to spawn context menu, ENTER to launch app, and ESC to close menu |
|CTRL+ALT+UP  |Maximize active app. Press again to restore |
|CTRL+ALT+DOWN  |Minimize active app. Press again to restore |
|CTRL+ALT+LEFT (or "\<" key)   	|Switch to next recently active app |
|CTRL+ALT+RIGHT (or "\>" key)   	|Switch to least recently active app |
|CTRL+ALT+W   	|Close active app |

### Changing application elements size
There are 3 supported ways of changing size within the Desktop.

1. Use your browser's zoom feature (keyboard shortcuts: Ctrl +, Ctrl - for various supported browsers) to change all elements' size. Recommended: 67%

**Note:** Zoom is highly variable and depends on your display size, resolution, and many other variables so the recommended zoom may not be ideal for you

2. View the Preferences panel (see below section) to change the scale of the Desktop UI: elements like window title bar, app icons, bottom-left start menu, app tool bar etc. and excluding main app content

3. Change an individual application's size via its window handles or minimize/maximize buttons. You can also start an application in full screen mode by right clicking on an application's icon in the taskbar and select "Open in New Browser Tab"

**Tip:** Did you know you can use the whole Desktop in full screen mode by using your browser's full screen feature (keyboard shortcuts: F11 for various supported browsers)?

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

## Zowe Desktop application plugins

Application plugins are applications that you can use to access the mainframe and to perform various tasks. Zowe's official server download contains some built-in plugins as described below. 

Additional plugins can be added to the Desktop, and are packaged and installed as Extensions to Zowe. [See here for how to install extensions](install-configure-zos-extensions).

Developers can create application plug-ins to put into extensions, and developers should [read the extending guide for more information](../extend/extend-desktop/mvd-extendingzlux).

### VT Terminal 
The VT Terminal plugin provides a user interface that emulates the basic functions of DEC VT family terminals. On the "back end," the plugin and the Zowe Application Server connect to VT compatible hosts, such as z/OS UNIX System Services (USS), using SSH or Telnet.

This terminal display emulator operates as a "Three-Tier" program. Due to web browsers being unable to supply TCP networking that terminals require, this terminal display emulator does not connect directly to your SSH or Telnet server. Instead, the Zowe Application Server acts as a bridge, and uses websockets between it and the browser for terminal communication. As a result, terminal connections only work when the stack of network programs supports websockets and the TN3270 server destination is visible to the Zowe Application Server.

The terminal connection can be customized per-user and saved for future sessions using the connection toolbar of the application. The preferences are stored within [the configuration dataservice storage](../extend/extend-desktop/mvd-configdataservice), which can also be used to set instance-wide defaults for multiple users.

### API Catalog
The API Catalog plugin lets you view API services that have been discovered by the API Mediation Layer. For more information about the API Mediation Layer, Discovery Service, and API Catalog, see [API Mediation Layer Overview](../getting-started/overview.md).

### Editor
With the Zowe Editor you can create, edit, and manage files, folders, and datasets. With files and folders, you can also modify properties such as ownership and tagging. The Editor uses Monaco, a technology shared with the popular Microsoft Visual Studio Code program. As a result, you can benefit from advanced syntax highlighting and a modern editing experience. The editor has more features and customization that you can read about on [the Editor user guide](mvd-editor.md).

### JES Explorer
Use this application to query JES jobs with filters, and view the related steps, files, and status. You can also purge jobs from this view.

### IP Explorer
With the IP Explorer you can monitor the TCP/IP stacks, view active connections and reserved ports.

### MVS Explorer
Most features of the MVS explorer are now incorporated into the "Editor" plug-in listed above, and the community focuses on future enhancements there, but you can still find the MVS Explorer in a Zowe install and use the features found below.

Use this application to browse the MVS™ file system by using a high-level qualifier filter. With the MVS Explorer, you can complete the following tasks:

  - List the members of partitioned data sets.
  - Create new data sets using attributes or the attributes of an existing data set ("Allocate Like").
  - Submit data sets that contain JCL to Job Entry Subsystem (JES).
  - Edit sequential data sets and partitioned data set members with basic syntax highlighting and content assist for JCL and REXX.
  - Conduct basic validation of record length when editing JCL.
  - Delete data sets and members.
  - Open data sets in full screen editor mode, which gives you a fully qualified link to that file. The link is then reusable for example in help tickets.

### USS Explorer
Most features of the USS explorer are now incorporated into the "Editor" plug-in listed above, and the community focuses on future enhancements there, but you can still find the MVS Explorer in a Zowe install and use the features found below.

Use this application to browse the USS files by using a path. With the USS Explorer, you can complete the following tasks:

 - List files and folders.
 - Create new files and folders.
 - Edit files with basic syntax highlighting and content assist for JCL and REXX.
 - Delete files and folders.
