# Extending Zowe CLI

You can install plug-ins to extend the capabilities of Zowe CLI.

Plug-ins CLI to third-party applications are also available, such as Visual Studio Code Extension for Zowe (powered by Zowe CLI).

Plug-ins add functionality to the product in the form of new command groups, actions, objects, and options. 

**Important!** Plug-ins can gain control of your CLI application legitimately during the execution of every command. Install third-party plug-ins at your own risk. We make no warranties regarding the use of third-party plug-ins.

**Note:** For information about how to install, update, and validate a plug-in, see [Installing Plug-ins](cli-installplugins.md).

The following plug-ins are available:

**CA Brightside Plug-in for IBM® CICS®**

The Zowe CLI Plug-in for IBM CICS lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS. For more information, see CICS management client interface on the IBM Knowledge Center.

For more information, see [CA Brightside Plug-in for IBM CICS](cli-cicsplugin.md).

**Zowe CLI plug-in for IBM® Db2® Database**

The Zowe CLI plug-in for Db2 enables you to interact with IBM Db2 Database on z/OS to perform tasks with modern development tools to automate typical workloads more efficiently. The plug-in also enables you to interact with IBM Db2 to foster continuous integration to validate product quality and stability.

For more information, see [Zowe CLI plug-in for IBM Db2 Database](cli-db2plugin.md).

**VSCode Extension for Zowe** 

The Visual Studio Code (VSCode) Extension for Zowe lets you interact with data sets that are stored on IBM z/OS mainframe. Install the extension directly to [VSCode](https://code.visualstudio.com/) to enable the extension within the GUI. You can explore data sets, view their contents, make changes, and upload the changes to the mainframe. For some users, it can be more convenient to interact with data sets through a GUI rather than using command-line interfaces or 3270 emulators. The extension is powered by Zowe CLI.

For more information, see [VSCode Extension for Zowe](cli-vscodeplugin.md).
