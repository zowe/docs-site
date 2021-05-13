# Zowe Desktop and Window management

The Zowe&trade; Desktop (MVD) is a web component of Zowe, which is an implementation of **MVDWindowManagement**, the interface that is used to create a window manager.

The code for this software is in the `lux-app-manager` repository.

The interface for building an alternative window manager is in the `zlux-platform` repository.

Window Management acts upon Windows, which are visualizations of an instance of an application. Applications are plug-ins of type "application", and therefore the Zowe Desktop operates around a collection of plug-ins.

**Note:** Other objects and frameworks that can be utilized by applications, but not related to Window Management, such as application-to-application communication, Logging, URI lookup, and Auth are not described here.

# Loading and presenting applications

Upon loading the Zowe Desktop, a GET call is made to `/plugins?type=application`.
The GET call returns a JSON list of all of the applications that are present on the server, which can be accessed by the user. Applications can be composed of dataservices, web content, or both. Applications that have web content are presented in the Zowe Desktop UI.

The Zowe Desktop presents a taskbar at the bottom of the page, where it displays each application as an icon with a description. The icon that is used, and description that are presented are based on the applications's PluginDefinition's **webContent** attributes.

# Plug-in management

Applications can gain insight into the environment in which they have been spawned through the Plug-in Manager. Use the Plug-in Manager to determine whether a plug-in is present before acting upon the existence of the plug-in. When the Zowe Desktop is running, you can access the Plug-in Manager through `ZoweZLUX.PluginManager`

The following are functions you can use on the Plug-in Manager:

- getPlugin(pluginID: string)
  - Accepts a string of a unique plugin ID, and returns the Plug-in Definition Object (DesktopPluginDefinition) associated with it, if found.

# Application management

Applications within a Window Manager are created and acted upon in part by an Application Manager. The Application Manager can facilitate communication between applications, but formal application-to-application communication should be performed by calls to the Dispatcher. The Application Manager is not normally accessible directly by applications, instead used by the Window Manager.

The following are functions of an Application Manager:

- `spawnApplication(plugin: DesktopPluginDefinition, launchMetadata: any): Promise<MVDHosting.InstanceId>;`

  - Opens an application instance into the Window Manager, with or without context on what actions it should perform after creation.

- killApplication(plugin:ZLUX.Plugin, appId:MVDHosting.InstanceId): void;

  - Removes an application instance from the Window Manager.

- showApplicationWindow(plugin: DesktopPluginDefinitionImpl): void;

  - Makes an open application instance visible within the Window Manager.

- isApplicationRunning(plugin: DesktopPluginDefinitionImpl): boolean;
  - Determines if instances of the application are open in the Window Manager.

# Windows and Viewports

When a user clicks on an application's icon on the taskbar, an instance of the application is started and presented within a Viewport, which is encapsulated in a Window within the Zowe Desktop.

Every instance of an application's web content within Zowe is given context and can listen on events about the Viewport and Window it exists within, regardless of whether the Window Manager implementation uses these constructs visually. It is possible to create a Window Manager that only displays one application at a time, or to have a drawer-and-panel UI rather than a true windowed UI.

When the Window is created, the application's web content is encapsulated dependent upon its framework type. The following are valid framework types:

- "angular2": The web content is written in Angular, and packaged with Webpack. Application framework objects are given through @injectables and imports.

- "iframe": The web content can be written using any framework, but is included through an iframe tag. Applications within an iframe can access framework objects through `parent.ZoweZLUX` and callbacks.

In the case of the Zowe Desktop, this framework-specific wrapping is handled by the Plug-in Manager.

# Viewport Manager

Viewports encapsulate an instance of an application's web content, but otherwise do not add to the UI (they do not present Chrome as a Window does).
Each instance of an application is associated with a viewport, and operations to act upon a particular application instance should be done by specifying a viewport for an application, to differentiate which instance is the target of an action. Actions performed against viewports should be performed through the Viewport Manager.

The following are functions of the Viewport Manager:

- createViewport(providers: ResolvedReflectiveProvider[]): MVDHosting.ViewportId;

  - Creates a viewport into which you can embed an application's webcontent.

- registerViewport(viewportId: MVDHosting.ViewportId, instanceId: MVDHosting.InstanceId): void;

  - Registers a previously created viewport to an application instance.

- destroyViewport(viewportId: MVDHosting.ViewportId): void;

  - Removes a viewport from the Window Manager.

- getApplicationInstanceId(viewportId: MVDHosting.ViewportId): MVDHosting.InstanceId | null;
  - Returns the ID of an application's instance from within a viewport in the Window Manager.

# Injection Manager

When Angular applications are created, they can utilize injectables to be informed of when an action happens. iframe applications indirectly benefit from some of these hooks due to the wrapper acting upon them, but Angular applications have direct access.

An application can utilize the following injectables:

## Plugin Definition

`@Inject(Angular2InjectionTokens.PLUGIN_DEFINITION) private pluginDefinition: ZLUX.ContainerPluginDefinition`

Provides the Plug-in Definition associated with this application. It can be used to gain some context about the application and can also be used by the application with other application framework objects to perform a contextual action.

## Logger

`@Inject(Angular2InjectionTokens.LOGGER) private logger: ZLUX.ComponentLogger`

Provides a logger that is named after the application's Plug-in Definition ID.

## Launch Metadata

`@Inject(Angular2InjectionTokens.LAUNCH_METADATA) private launchMetadata: any`

If present, this variable requests the application instance to initialize with some context, rather than the default view.

## Viewport Events

`@Inject(Angular2InjectionTokens.VIEWPORT_EVENTS) private viewportEvents: Angular2PluginViewportEvents`

Presents hooks that can be subscribed to for event listening. Events include:

- resized: Subject<{width: number, height: number}>
  - Starts when the viewport's size has changed.

## Window Events

`@Inject(Angular2InjectionTokens.WINDOW_ACTIONS) private windowActions: Angular2PluginWindowActions`

Presents hooks that can be subscribed to for event listening. Events include the following:

- maximized: Subject`<void>`

  - Starts when the Window has been maximized.

- minimized: Subject`<void>`

  - Starts when the Window has been minimized.

- restored: Subject`<void>`

  - Starts when the Window has been restored from a minimized state.

- moved: Subject<{top: number, left: number}>

  - Starts when the Window has been been moved.

- resized: Subject<{width: number, height: number}>

  - Starts when the Window has been resized.

- titleChanged: Subject`<string>`
  - Starts when the Window's title has changed.

## Window Actions

`@Inject(Angular2InjectionTokens.WINDOW_ACTIONS) private windowActions: Angular2PluginWindowActions`

An application can request actions to be performed on the Window through the following:

- close(): void

  - Closes the Window of the application instance.

- maximize(): void

  - Maximizes the Window of the application instance.

- minimize(): void

  - Minimizes the Window of the application instance.

- restore(): void

  - Restores the Window of the application instance from a minimized state.

- setTitle(title: string):void

  - Sets the title of the Window.

- setPosition(pos: {top: number, left: number, width: number, height: number}): void

  - Sets the position of the Window on the page and the size of the window.

- spawnContextMenu(xPos: number, yPos: number, items: ContextMenuItem[]): void

  - Opens a context menu on the application instance.

- registerCloseHandler`(handler: () => Promise<void>)`: void
  - Registers a handler, which is called when the Window and application instance are closed.
