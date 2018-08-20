# Standup a local version of the zLUX Example Server

This is an example of a server built upon the zLUX framework. Within, you will find a collection of build, deploy, and run scripts as well as configuration files that will help you to configure a simple zLUX server with a few Apps included.

## Server layout

At the core of the zLUX App infrastructure backend is an extensible server, written for nodeJS and utilizing expressJS for routing. It handles the backend components of Apps, and also can server as a proxy for requests from Apps to additional servers as needed. One such proxy destination is the ZSS - the zLUX backend component for **Z Secure Services**. It is recommended that everyone who is going to set up a zLUX install contact the Zowe Project, which can provide the ZSS binary to use in the install.

### ZSS & zLUX Server overlap

The zLUX Proxy Server and ZSS utilize the same deployment & App/Plugin structure, and share some configuration parameters as well. It is possible to run ZSS and zLUX Proxy Server from the same system, in which case you would be running under z/OS USS. This configuration requires that IBM's version of nodeJS is installed prior.

Another way to set up zLUX is to have the zLUX Proxy Server running under LUW, while keeping ZSS under USS. This is the configuration scenario presented below. In this scenario, you'll need to clone these github repositories to two different systems, and they'll need to have compatible configurations. For first-timers, it is fine to have identical configuration files and /plugins folders in order to get going.

## First-time Installation & Use

Getting started with this server requires just a few steps:

0. [(Optional) Install git for z/OS](#0-optional-install-git-for-zos)
1. [Acquire the source code](#1-acquire-the-source-code)
1. [Acquire external components](#2-acquire-external-components)
1. [Set the server configuration](#3-set-the-server-configuration)
1. [Build zLUX Apps](#4-build-zlux-apps)
1. [Deploy server configuration files](#5-deploy-server-configuration-files)
1. [Run the server](#6-run-the-server)
1. [Connect in a browser!](#7-connect-in-a-browser)

So, with that in mind, follow each step and you'll be on your way to your first zLUX Proxy Server instance!

### 0. (Optional) Install git for z/OS

Because all of our code is on github, yet ZSS must run on z/OS and the zLUX Proxy Server may optionally run on z/OS as well, having git on z/OS is the most convenient way to work with the source code. The alternative would be to utilize FTP or another method to transfer contents to z/OS.
If you'd like to go this route, you can find git for z/OS free of charge here: http://www.rocketsoftware.com/product-categories/mainframe/git-for-zos

### 1. Acquire the source code

To get started, first clone or download the github capstone repository, https://github.com/zowe/zlux
As we'll be configuring ZSS on z/OS's USS, and the zLUX Proxy Server on a LUW host, you'll need to put the contents on both systems.
If using git, the following commands should be used:

```
git clone --recursive git@github.com:zowe/zlux.git
cd zlux
git submodule foreach "git checkout master"
cd zlux-build
```

At this point, you'll have the latest code from each repository on your system.
Continue from within zlux-example-server.

### 2. Acquire external components

Apps and external servers can require contents not found in the Zowe github repositories. In the case of the zlux-example-server, there is a component which cannot be found in the repositories: a ZSS binary.
If you contact the Zowe project, this will be provided.

Afterwards, you should receive _zssServer_.
This must be placed within _zlux-build/externals/Rocket_, on the z/OS host.
For example:

```
mkdir externals
mkdir externals/Rocket

//(on z/OS only)
mv zssServer externals/Rocket
```

### 3. Set the server configuration

Read the [Configuration](https://github.com/zowe/zlux/wiki/Configuration-for-zLUX-Proxy-Server-&-ZSS) wiki page for a detailed explanation of the primary items that you'll want to configure for your first server.

In short, ensure that within **config/zluxserver.json**, **node.http.port** OR **node.https.port + other HTTPS parameters** are set to your liking on the LUW host, and that **zssPort** is set on the z/OS host.

Before continuing, if you intend to use the terminal, at this time (temporarily) it must be pre-configured to know the destination host.
Edit _../tn3270-ng2/\_defaultTN3270.json_ to set _host_ and _port_ to a valid TN3270 server telnet host and port and then save the file.
Edit _../vt-ng2/\_defaultVT.json_ to set _host_ and _port_ to a valid ssh host and port and then save the file.

### 4. Build zLUX Apps

**Note when building, NPM is used. The version of NPM needed for the build to succeed should be at least 5.4. You can update NPM by executing `npm install -g npm`**

zLUX Apps can contain server and/or web components. The web components must be built, as webpack is involved in optimized packaging, and server components are also likely to need building if they require external dependencies from NPM, use native code, or are written in typescript.

This example server only needs transpilation and packaging of web components, and therefore we do not need any special build steps for the host running ZSS.

Instead, on the host running the zLUX Proxy Server, run the script that will automatically build all included Apps.
Under `zlux-build` run,

```
//Windows
build.bat

//Otherwise
build.sh
```

This will take some time to complete.

_Note: You will need to have `ant` and `ant-contrib` installed_

### 5. Deploy server configuration files

If you are running the zLUX Proxy Server separate from ZSS, you must ensure the ZSS installation has its configuration deployed. You can accomplish this by navigating to `zlux-build` and running:

```
ant deploy
```

On the other hand, if you are running ZSS and the zLUX Proxy Server on the same host, _build.sh_ and _build.bat_ execute _deploy_ and therefore this task was accomplished in step #4.

However, if you need to change the server configuration files or want to add more Apps to be included at startup, you'll need to update the deploy content to reflect this. Simply running deploy.bat or deploy.sh will accomplish this, but files such as zluxserver.json are only read at startup, so a reload of the zLUX Proxy Server & ZSS would be required.

### 6. Run the server

At this point, all server files have been configured and Apps built, so ZSS and the App server are ready to run.
First, from the z/OS system, start ZSS.

```
cd ../zlux-example-server/bin
./zssServer.sh
```

This should start the zssServer. If the server did not start, two common sources of error are:

1. The _zssPort_ chosen is already occupied. To fix, edit _config/zluxserver.json_ to choose a new one, and re-run _build/deploy.sh_ to have that change take effect.
2. The zssServer binary does not have the APF bit set. Since this server is meant for secure services, it is required. To fix, execute `extattr +a zssServer`. Note you may need to alter the execute permissions of zssServer.sh in the event that the previous command is not satisfactory (eg chmod +x zssServer.sh)

Second, from the system with the zLUX Proxy Server, start it with a few parameters to hook it to ZSS.

```
cd ../zlux-example-server/bin

// Windows:
nodeServer.bat <parameters>

// Others:
nodeServer.sh <parameters>
```

Valid parameters for nodeServer are as follows:

- _-h_: Specifies the hostname where ZSS can be found. Use as `-h \<hostname\>`
- _-P_: Specifies the port where ZSS can be found. Use as `-P \<port\>`. This overrides _zssPort_ from the configuration file.
- _-p_: Specifies the HTTP port to be used by the zLUX Proxy Server. Use as `-p <port>`. This overrides _node.http.port_ from the configuration file.
- _-s_: Specifies the HTTPS port to be used by the zLUX Proxy Server. Use as `-s <port>`. This overrides _node.https.port_ from the configuration file.
- _--noChild_: If specified, tells the server to ignore and skip spawning of child processes defined as _node.childProcesses_ in the configuration file.

In the example where we're running ZSS on a host named mainframe.zowe.com, running on zssPort = 19997, the Proxy server running on Windows could be started with the following:

`nodeServer.bat -h mainframe.zowe.com -P 19997 -p 19998`

After which we'd be able to connect to the Proxy server at port 19998.

**NOTE: the parameter parsing is provided by [argumentParser.js](https://github.com/zowe/zlux-proxy-server/blob/master/js/argumentParser.js), which allows for a few variations of input, depending on preference. For example, the following are all valid ways to specify the ZSS host**

- **-h myhost.com**
- **-h=myhost.com**
- **--hostServer myhost.com**
- **--hostServer=myhost.com**

When the zLUX Proxy Server has started, one of the last messages you will see as bootstrapping completes is that the server is listening on the HTTP/s port. At this time, you should be able to use the server.

### 7. Connect in a browser

Now that ZSS & the zLUX Proxy Server are both started, you can access this instance by pointing your web browser to the zLUX Proxy Server.
In this example, the address you will want to go to first is the location of the window management App - Mainframe Virtual Desktop (MVD).
The URL for this is:

`http(s)://\<zLUX Proxy Server\>:\<node.http(s).port\>/ZLUX/plugins/com.rs.mvd/web/index.html`

Once here, you should be greeted with a Login screen and a few example Apps in the taskbar at the bottom of the screen. You can login with your mainframe credentials, and try out a few Apps to see how they interact with the framework:

- tn3270-ng2: This App communicates with the zLUX Proxy Server to enable a TN3270 connection in the browser
- subsystems: This App shows various z/OS subsystems installed on the host the ZSS runs on. This is accomplished via discovery of these services by the App's portion running in the ZSS context.
- sample-app: A simple app showing how a zLUX App frontend (Angular) component can communicate with an App backend (REST) component.

#### Deploy example

```
// All paths relative to zlux-example-server/js or zlux-example-server/bin
// In real installations, these values will be configured during the install.
  "rootDir":"../deploy",
  "productDir":"../deploy/product",
  "siteDir":"../deploy/site",
  "instanceDir":"../deploy/instance",
  "groupsDir":"../deploy/instance/groups",
  "usersDir":"../deploy/instance/users"
```

### App configuration

This section does not cover any dynamic runtime inclusion of Apps, but rather Apps defined in advance.
In the configuration file, a directory can be specified which contains JSON files which tell the server what App is to be included and where to find it on disk. The backend of these Apps use the Server's Plugin structure, so much of the server-side references to Apps use the term Plugin.

To include Apps, be sure to define the location of the Plugins directory in the configuration file, via the top-level attribute _pluginsDir_

**NOTE: In this repository, the directory for these JSON files is /plugins. Yet, in order to separate configuration files from runtime files, the zlux-example-server repository copies the contents of this folder into /deploy/instance/ZLUX/plugins. So, the example configuration file uses the latter directory.**

#### Plugins directory example

```
// All paths relative to zlux-example-server/js or zlux-example-server/bin
// In real installations, these values will be configured during the install.
//...
  "pluginsDir":"../deploy/instance/ZLUX/plugins",
```

### ZSS Configuration

When running ZSS, it will require a JSON configuration file similar or the same as the one used for the zLUX server. The attributes that are needed for ZSS, at minimum, are:_rootDir_, _productDir_, _siteDir_, _instanceDir_, _groupsDir_, _usersDir_, _pluginsDir_ and **zssPort**. All of these attributes have the same meaning as described above for the zLUX server, but if the zLUX server and ZSS are not run from the same location, then these directories may be different if desired.

The one attribute that is specific to ZSS however is **zssPort**. This is the TCP port which ZSS will listen on to be contacted by the zLUX server. Define this in the configuration file as a value between 1024-65535.

#### Connecting zLUX server to ZSS

When running the zLUX server, simply specify a few flags to declare which ZSS instance zLUX will proxy ZSS requests to:

- _-h_: Declares the host where ZSS can be found. Use as `-h \<hostname\>`
- _-P_: Declares the port at which ZSS is listening. Use as `-P \<port\>`
