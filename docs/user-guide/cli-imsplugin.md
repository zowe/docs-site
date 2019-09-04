# IBM® IMS™ Plug-in for Zowe CLI

The IBM IMS Plug-in for Zowe CLI lets you extend Zowe CLI such that it can interact with IMS resources (regions, programs and transactions). You can use the plug-in to start, stop, and query regions and start, stop, query, and update programs and transactions.

**Note:** For more information about IMS, see [IBM Information Management System (IMS)](https://www.ibm.com/it-infrastructure/z/ims) on the IBM  Knowledge Center.

[[toc]]

## Use cases

As an application developer or DevOps administrator, you can use IBM IMS Plug-in for Zowe CLI to perform the following tasks:

- Refresh IMS transactions, programs, and dependent IMS regions.  
- Deploy application code into IMS production or test systems.
- Write scripts to automate IMS actions that you traditionally perform using ISPF editors, TSO, and SPOC.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Ypu can use one of the following methods to install the Zowe CLI Plug-in for IBM IMS:

- [Installing from online registry](#installing-from-online-registry)

- [Installing from local package](#installing-from-local-package)

**Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-in, and install from specific registries, see [Install Plug-ins](cli-installplugins.md).

## Creating user profiles

You can set up an `ims` profile to retain your credentials, host, and port name. You can create multiple profiles and switch between them as needed. Issue the following command to create an `ims` profile:

```
zowe profiles create ims-profile <profileName> --host <hostname> --port <portnumber> --ims-connect-host <ims-hostname> --ims-connect-port <ims-portnumber> --user <username> --password <password>
```

**Example: Setting up an IMS profile**

The following example creates an ims profile named 'ims123' to connect to IMS APIs at host zos123 and port 1490. The name of the IMS plex in this example is 'PLEX1' and the IMS region we want to communicate with has a host of zos124 and a port of 1491:

```
zowe profiles create ims-profile ims123 --host zos123 --port 1490 --user ibmuser --pass myp4ss --plex PLEX1 --ich zos124 --icp 1491
```

**Note:** For more information, issue the command `zowe profiles create ims-profile --help`.
