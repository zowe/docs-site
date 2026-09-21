# Building plugin apps
You can build a plugin app by using the following steps as a model. Alternatively, you can follow the [Sample Angular App tutorial](https://github.com/zowe/sample-angular-app/blob/lab/step-1-hello-world/README.md).

Plugins can have any build process desired as long as it doesn't conflict with the [packaging structure](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure).
The basic requirement for a plugin app is that static web content must be in a `/web` directory, and server and other backend files must be in a `/lib` directory.

Before you can build a plugin app you must install all [prerequisites](https://github.com/zowe/zlux-app-server#0-install-prerequisites).

## Building web content
1. On the computer where the virtual desktop is installed, use the the following command to specify a value for the `MVD_DESKTOP_DIR` environment variable:
    ```
    export MVD_DESKTOP_DIR=/<path>/zowe/zlux-app-manager/virtual-desktop
    ```

    Where `<path>` is the install location of the virtual desktop.

2. Navigate to `/<plugin_dir>/webClient`.  If there is no `/webClient` directory, proceed to the **Building server content** section below.

3. Run the `npm install` command to install any application dependencies. Check for successful return code.

4. Run one of the following commands to build the application code:

    - Run the `npm run build` command to generate static content in the `/web` directory. (You can ignore warnings as long as the build is successful.)
    - Run the `npm run start` command to compile in real-time. Until you stop the script, it compiles code changes as you make them.

## Building app server content
1. Navigate to the plugin directory. If there is no `/nodeServer` directory in the plugin directory, proceed to the **Building Javascript content (*.js files)** section below.

2. Run the `npm install` command to install any application dependencies. Check for successful return code.

4. Run one of the following commands to build the application code:

    - Run the `npm run build` command to generate static content in the `/lib` directory.
    - Run the `npm run start` command to compile in real-time. Until you stop the script, it compiles code changes as you make them.
    
## Building zss server content
1. Clone the [zss repository](https://github.com/zowe/zss) and its submodule zowe-common-c.

2. Make a build script that compiles your C code with -Wc,dll and -Wl,dll, and other flags as seen in [this zowe example](https://github.com/zowe/explorer-ip/blob/master/dataService/build/build.sh)

3. Include a ZSS .x file to link zss server APIs to your plugin, as seen in [this zowe example](https://github.com/zowe/explorer-ip/blob/master/dataService/build/pluginAPI.x)

4. Ensure that the build output ends up in the /lib folder as a .so file that has the z/OS program control (`+p`) extended attribute.

## Tagging plugin files on z/OS
When Zowe App Framework is installed on z/OS developers should tag their plugin files according to the file content. Tagging files helps programs on z/OS understand how to interpret those files, most importantly to know whether a file is encoded using EBCDIC (Extended Binary Coded Decimal Interchange Code). If you are unsure if a plugin you are using is tagged, it can be checked and set using the [`chtag` command](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.2.0/com.ibm.zos.v2r2.bpxa500/chtag.htm). If you want to set the tags, it can be done in bulk with the help of these programs:

- Autotag: This free, open-source application is not part of Zowe. You can download the binary from here for example https://anaconda.org/izoda/autotag. Source: https://github.com/RocketSoftware/autotag
- The Zowe tagging script: This script tags by file extension. It might not work for all cases, but can be altered to suit your needs. Source: https://github.com/zowe/zowe-install-packaging/blob/master/scripts/tag-files.sh

## Building Javascript content (*.js files)
Unlike Typescript, Javascript is an interpreted language and does not need to be built. In most cases, reloading the page should build new code changes. For Iframes or other JS-based apps, close and open the app.

## Installing
Follow the steps described in [Installing plugins](mvd-installplugins.md) to add your built plugin to the Zowe desktop.

## Packaging
For more information on how to package your Zowe app, developers can see [Plugins definition and structure](mvd-plugindefandstruct.md).
