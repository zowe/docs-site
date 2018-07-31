# zLUX application filesystem structure

A zLUX application can be loaded from a filesystem accessible to the zLUX application server, or dynamically at runtime.

When accessed from a filesystem, there are important considerations for both the developer and the user as to where files must be placed for proper build, packaging, and operation.

# Root files and directories
At the root of an application's directory, the following content is found:

## pluginDefinition.json
This file describes a plug-in to the zLUX Application Server. A plug-in is the unit of extensibility for the server, where an application is a plug-in of the type Application, the most common and visible plug-in type.

A definition file informs the server whether the application has server-side, client-side web content, or both.
The attributes of this file and how it is found by the server are described in [zLUX plug-in definition and structure](mvd-zluxplugindefandstruct.md).

## Dev and Source content
Aside from demonstration or open source applications, the following directories should not be seen on a deployed server. The directories are not read by the server, but they are used to build content that the server can read.

### nodeServer
When an application has Dataservices of the type "router", they are interpreted by the zLUX Application Server by attaching them as ExpressJS routers. It is strongly suggested that applications be written in Typescript as it leads to more well-structured code.  Use of Typescript results in build steps because the pre-transpilation Typescript content is not to be consumed by NodeJS. Therefore, keep your server-side source code within **nodeServer**. At runtime, the server loads **router dataservices** from the `lib` directory.

### webClient
When an application has the webContent attribute in its Definition, the server serves static content for a client. It is strongly suggested that applications be written in Typescript and packaged through Webpack to optimize loading of the application to the user. Use of Typescript and Webpack result in build steps as the pre-transpilation Typescript and the pre-webpack content are not to be consumed by the browser. Therefore, separate the source code from the served content by placing source code within webClient. 

## Runtime content
At runtime, a different set of directories are used by the server and client rather than those described for use in the development environment.

### lib
The `lib` directory is where router-type Dataservices are loaded by use in the zLUX Application Server. If the JS files that are loaded from the `lib` directory require NodeJS modules, which are not provided by the server base (modules zlux-proxy-server requires are added to `NODE_PATH` at runtime), then these modules must be included in `lib/node_modules` for local directory lookup or be found on the `NODE_PATH` environment variable. `nodeServer/node_modules` is not automatically accessed at runtime as it is a dev and build directory.

### web
The `web` directory is where the server serves static content for an application that has included the webContent attribute in its Definition. Typically this directory contains the output of a webpack build. Anything you place in this folder can be accessed by a client. Therefore, only place content in this folder that is intended to be consumed by clients.
