# Stand up a local version of the Example Zowe Application Server

The `zlux-app-server` repository is an example of a server built upon the application framework. Within the repository, you will find a collection of build, deploy, and run scripts and configuration files that will help you to configure a simple Zowe Application Server with a few applications included.

## Server layout

At the core of the application infrastructure backend is an extensible server, written for nodeJS and utilizing expressJS for routing. It handles the backend components of an application, and can serve as a proxy for requests from applications to additional servers, as needed. One such proxy destination is the ZSS, the Zowe Application Framework backend component for **Z Secure Services**, a so called agent for the Zowe Application Server. If you want to set up a Zowe Application Framework installation, contact Rocket to obtain the ZSS binary to use in the installation process.

### ZSS and Zowe Application Server overlap

The Zowe Application Server and ZSS utilize the same deployment and Application/Plugin structure, and share some configuration parameters. It is possible to run ZSS and the Zowe Application Server from the same system, in which case you would be running under z/OS USS. This configuration requires that IBM's version of nodeJS is installed beforehand.

Another way to set up Zowe Application Framework is to have the Zowe Application  Server running under LUW, while keeping ZSS under USS. This is the configuration scenario presented below. In this scenario, you must clone these github repositories to two different systems, and they will require compatible configurations. If this is your initial setup, it is fine to have identical configuration files and `/plugins` folders to get started.

## First-time Installation and Use

Getting started with the server requires the following steps:

0. [(Optional) Install git for z/OS](#_0-optional-install-git-for-z-os)
1. [Acquire the source code](#_1-acquire-the-source-code)
1. [Acquire external components](#_2-acquire-external-components)
1. [Set the server configuration](#_3-set-the-server-configuration)
1. [Build application plug-ins](#_4-build-application-plug-ins)
1. [Deploy server configuration files](#_5-deploy-server-configuration-files)
1. [Run the server](#_6-run-the-server)
1. [Connect in a browser!](#_7-connect-in-a-browser)

Follow each step and you will be on your way to your first Zowe Application Server instance.

### 0. (Optional) Install git for z/OS

Because all of the code is on github, yet ZSS must run on z/OS and the Zowe Application Server can optionally run on z/OS as well, having git on z/OS is the most convenient way to work with the source code. The alternative would be to utilize FTP or another method to transfer contents to z/OS.
If you'd like to go this route, you can find git for z/OS free of charge here: http://www.rocketsoftware.com/product-categories/mainframe/git-for-zos

### 1. Acquire the source code

To get started, first clone or download the GitHub capstone repository [https://github.com/zowe/zlux](https://github.com/zowe/zlux). 

**Note:** Make sure that you have your SSH key set up and added to GitHub. For how to do this, see [Generating SSH keys](https://help.github.com/articles/connecting-to-github-with-ssh/).

Because we will be configuring ZSS on z/OS's USS, and the Zowe Application Server on a LUW host, you will need to place the contents on both systems. 
If you are using git, use the following commands. 

```
git clone --recursive git@github.com:zowe/zlux.git
cd zlux
git submodule foreach "git checkout master"
cd zlux-build
```

At this point, you have the latest code from each repository on your system.
Continue from within `zlux-app-server`.

### 2. Acquire external components

Applications and external servers can require contents that are not in the Zowe github repositories. In the case of the `zlux-app-server`, there is a a ZSS binary component which cannot be found in the repositories. To obtain the ZSS binary component, contact the Zowe project.

After you obtain the ZSS binary component, you should receive _zssServer_.
This must be placed within _zlux-build/externals/Rocket_, on the z/OS host.
For example:

```
mkdir externals
mkdir externals/Rocket

//(on z/OS only)
mv zssServer externals/Rocket
```

### 3. Set the server configuration

Read the [Configuration](https://github.com/zowe/zlux/wiki/Configuration-for-zLUX-App-Server-&-ZSS) wiki page for a detailed explanation of the primary items that you will want to configure for your first server.

In short, ensure that within the `config/zluxserver.json` file, **node.http.port** or **node.https.port** and the other HTTPS parameters are set to your liking on the LUW host, and that **zssPort** is set on the z/OS host.

Before you continue, if you intend to use the terminal, at this time (temporarily) it must be pre-configured to know the destination host.
Edit _../tn3270-ng2/\_defaultTN3270.json_ to set _host_ and _port_ to a valid TN3270 server telnet host and port and then save the file.
Edit _../vt-ng2/\_defaultVT.json_ to set _host_ and _port_ to a valid ssh host and port and then save the file.

### 4. Build application plug-ins

**Prerequisites:** 
- NPM is used when building application plug-ins. The version of NPM needed for the build to succeed should be at least 5.4. You can update NPM by executing `npm install -g npm`.
- You must have `ant` and `ant-contrib` installed. 

Application plug-ins can contain server and web components. The web components must be built, as webpack is involved in optimized packaging. Server components are also likely to need building if they require external dependencies from NPM, use native code, or are written in typescript.

This example server only needs transpilation and packaging of web components, and therefore we do not need any special build steps for the host running ZSS.

Instead, on the host that runs the Zowe Application Server, run the script that will automatically build all included application plug-ins. Simply,

```
//Windows
build.bat

//Otherwise
build.sh
```

This will take some time to complete.

### 5. Deploy server configuration files

If you are running the Zowe Application Server separate from ZSS, ensure the ZSS installation configuration is deployed. You can accomplish this through:

```
ant deploy
```

On the other hand, if you are running ZSS and the Zowe Application Server on the same host, _build.sh_ and _build.bat_ execute _deploy_ and therefore this task was accomplished in [step 4](#_4-build-application-plug-ins).

However, if you need to change the server configuration files or if you want to add more application plug-ins to be included at startup, you must update the deploy content to reflect this. Simply running `deploy.bat` or `deploy.sh` will accomplish this, but files such as `zluxserver.json` are only read at startup, so a reload of the Zowe Application Server and ZSS would be required.

### 6. Run the server

At this point, all server files have been configured and the application plug-ins built, so ZSS and the Zowe Application Server are ready to run.
First, from the z/OS system, start ZSS.

```
cd ../zlux-app-server/bin
./zssServer.sh
```

If the zssServer server did not start, two common sources of error are:

1. The _zssPort_ chosen is already occupied. To fix this, edit _config/zluxserver.json_ to choose a new one, and re-run _build/deploy.sh_ to make the change take effect.
2. The zssServer binary does not have the APF bit set. Because this server is meant for secure services, it is required. To fix this, execute `extattr +a zssServer`. Note that you might need to alter the execute permissions of `zssServer.sh` in the event that the previous command is not satisfactory (for example: `chmod +x zssServer.sh`)

Second, from the system with the Zowe Application Server, start it with a few parameters to hook it to ZSS.

```
cd ../zlux-app-server/bin

// Windows:
nodeServer.bat <parameters>

// Others:
nodeServer.sh <parameters>
```

Valid parameters for nodeServer are as follows:

- _-h_: Specifies the hostname where ZSS can be found. Use as `-h \<hostname\>`
- _-P_: Specifies the port where ZSS can be found. Use as `-P \<port\>`. This overrides _zssPort_ from the configuration file.
- _-p_: Specifies the HTTP port to be used by the Zowe Application Server. Use as `-p <port>`. This overrides _node.http.port_ from the configuration file.
- _-s_: Specifies the HTTPS port to be used by the Zowe Application Server. Use as `-s <port>`. This overrides _node.https.port_ from the configuration file.
- _--noChild_: If specified, tells the server to ignore and skip spawning of child processes defined as _node.childProcesses_ in the configuration file.

In the example where we run ZSS on a host named `mainframe.zowe.com`, running on zssPort = 19997, the Zowe Application Server running on Windows could be started with the following:

`nodeServer.bat -h mainframe.zowe.com -P 19997 -p 19998`

After which we would be able to connect to the Zowe Application Server at port 19998.

**NOTE:** the parameter parsing is provided by [argumentParser.js](https://github.com/zowe/zlux-proxy-server/blob/master/js/argumentParser.js), which allows for a few variations of input, depending on preference. For example, the following are all valid ways to specify the ZSS host:

- **-h myhost.com**
- **-h=myhost.com**
- **--hostServer myhost.com**
- **--hostServer=myhost.com**

When the Zowe Application Server has started, one of the last messages you will see as bootstrapping completes is that the server is listening on the HTTP/s port. At this time, you should be able to use the server.

### 7. Connect in a browser

Now that ZSS and the Zowe Application Server are both started, you can access this instance by pointing your web browser to the Zowe Application Server.
In this example, the address you will want to go to first is the location of the window management application: the Zowe Desktop. The URL is:

`http(s)://<zLUX App Server>:<node.http(s).port>/ZLUX/plugins/org.zowe.zlux.bootstrap/web/index.html`

Once here, a Login window opens with a few example application plug-ins in the taskbar at the bottom of the window. To try the application plug-ins to see how they interact with the framework, can login with your mainframe credentials.

- tn3270-ng2: This application communicates with the Zowe Application Server to enable a TN3270 connection in the browser.
- z/OS Subsystems: This application shows various z/OS subsystems installed on the host the ZSS runs on. This is accomplished through discovery of these services by the application's portion running in the ZSS context.
- sample-angular-app: A simple app that show how a zLUX application frontend (here, Angular) component can communicate with an App backend (REST) component.
- sample-react-app: Similar to the Angular application, but using React instead to show how you have the flexibility to use a framework of your choice.
- sample-iframe-app: Similar in functionality to the Angular and React sample application, but presented by means of inclusion of an iframe, to show that pre-existing pages can be included.


#### Deploy example

```
// All paths relative to zlux-app-server/js or zlux-app-server/bin
// In real installations, these values will be configured during the install.
  "rootDir":"../deploy",
  "productDir":"../deploy/product",
  "siteDir":"../deploy/site",
  "instanceDir":"../deploy/instance",
  "groupsDir":"../deploy/instance/groups",
  "usersDir":"../deploy/instance/users"
```

### Application plug-in configuration

This section does not cover dynamic runtime inclusion of application plug-ins, but rather application plug-ins that are defined in advance.
In the configuration file, a directory can be specified which contains JSON files that tell the server what application plug-in to include and where to find it on disk. The backend of these application plug-ins use the Server's Plugin structure, so much of the server-side references to application plug-ins use the term "Plugin".

To include application plug-ins, be sure to define the location of the `Plugins` directory in the configuration file, through the top-level attribute _pluginsDir_

**NOTE:** In this repository, the directory for these JSON files is `/plugins`. To separate configuration files from runtime files, the `zlux-app-server` repository copies the contents of this folder into `/deploy/instance/ZLUX/plugins`. So, the example configuration file uses the latter directory.

#### Plugins directory example

```
// All paths relative to zlux-app-server/js or zlux-app-server/bin
// In real installations, these values will be configured during the install.
//...
  "pluginsDir":"../deploy/instance/ZLUX/plugins",
```

### ZSS Configuration

Running ZSS requires a JSON configuration file that is similar or the same as the one used for the Zowe Application Server. The attributes that are needed for ZSS, at minimum, are:_rootDir_, _productDir_, _siteDir_, _instanceDir_, _groupsDir_, _usersDir_, _pluginsDir_ and **zssPort**. All of these attributes have the same meaning as described above for the Zowe Application Server, but if the Zowe Application Server and ZSS are not run from the same location, then these directories can be different.

The **zssPort** attribute is specific to ZSS. This is the TCP port on which ZSS will listen to be contacted by the Zowe Application Server. Define this port in the configuration file as a value between 1024-65535.

#### Connecting Zowe Application Server to ZSS

When running the Zowe Application Server, simply specify a few flags to declare which ZSS instance the Zowe Application Framework will proxy ZSS requests to:

- _-h_: Declares the host where ZSS can be found. Use as `-h \<hostname\>`
- _-P_: Declares the port at which ZSS is listening. Use as `-P \<port\>`
