# Creating zLUX application plug-ins

A zLUX application plug-in is an installable set of files that present resources in a web-based user interface, as a set of RESTful services, or in a web-based user interface and as a set of RESTful services.

Before you build a zLUX application plug-in, you must set the UNIX environment variables that support the plug-in environment.

## Setting the environment variables for plug-in development

To set up the environment, the node must be accessible on the PATH. To determine if the node is already on the PATH, issue the following command from the command line:

```
node --version
``` 

If the version is returned, the node is already on the PATH.  

If nothing is returned from the command, you can set the PATH using the *NODE_HOME* variable. The *NODE_HOME* variable must be set to the directory of the node install. You can use the export command to set the directory. For example: 

```
export NODE_HOME=node_installation_directory
```

Using this directory, the node will be included on the PATH in `nodeServer.sh`. (`nodeServer.sh` is located in `zlux-example-server/bin`). 

## Using the zLUX sample application plug-in

You can experiment with the sample application plug-in called `sample-app` that is provided with zLUX.

To build the sample application plug-in, node and npm must be included in the PATH. You can use the `npm run build` or `npm start` command to build the sample application plug-in. These commands are configured in `package.json`.

**Note:** 

- If you change the source code for the sample application, you must rebuild it.

- If you want to modify `sample-app`, you must run `_npm install_` in the virtual desktop and the `sample-app/webClient`. Then, you can run `_npm run build_` in `sample-app/webClient`.

- Ensure that you set the `MVD_DESKTOP_DIR` system variable to the virtual desktop plug-in location. For example: `<ZLUX_CAP>/zlux-app-manager/virtual-desktop`.

1.   Add an item to `sample-app`. The following figure shows an excerpt from `app.component.ts`:

      ```
        export class AppComponent {
          items = ['a', 'b', 'c', 'd']
          title = 'app';
          helloText: string;
          serverResponseMessage: string;
      ```

2.   Save the changes to `app.component.ts`. 
3.   Issue one of the following commands: 
     -   To rebuild the application plug-in, issue the following command:
     ```
        npm run build
     ```
     -   To rebuild the application plug-in and wait for additional changes to `app.component.ts`, issue the following command:
     ```
       npm start
     ``` 
4.   Reload the web page. 
5.   If you make changes to the sample application source code, follow these steps to rebuild the application: 
     1. Navigate to the `sample-app` subdirectory where you made the source code changes. 
     2. Issue the following command:
          ```
           npm run build
          ``` 

     3.   Reload the web page. 
