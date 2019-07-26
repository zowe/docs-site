# Zowe CLI Plug-in for IBM IMS
The CA Brightside Plug-in for IBM® Information Management System (IMS)™ lets you extend CA Brightside to interact with IMS resources (regions, programs and transactions). You can use the plug-in to start, stop, and query regions and start, stop, query, and update programs and transactions. For more information about IMS, see [IBM Information Management System (IMS)](https://www.ibm.com/it-infrastructure/z/ims) in the IBM  Knowledge Center.

[[toc]]

## Use cases

As an application developer or DevOps administrator, you can use Zowe CLI Plug-in for IBM IMS to perform the following tasks:

- Refresh IMS transactions, programs, and dependent IMS regions.  
- Deploy application code into IMS production or test systems.
- Write scripts to automate IMS actions that you traditionally perform using ISPF editors, TSO, and SPOC. 

## Commands 

<!-- TODO - add link to web help @latest-->

## Software requirements

Before you install the plug-in, meet the following prerequisites:

* [Install Zowe CLI](cli-installcli.md) on your computer.

* Ensure that [IBM® IMS™ v14.1.0](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_14.1.0/com.ibm.ims14.doc/ims_product_landing_v14.html) or later is installed and running in your mainframe environment.

* Configure [IBM® IMS™ Connect](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_13.1.0/com.ibm.ims13.doc.ccg/ims_ct_intro.html). IMS Connect is required so that IBM IMS Operations APIs can function. 

* Configure [IBM IMS Operations APIs](https://github.com/zowe/ims-operations-api) to enable communication between the CLI and the IMS instance.

## Installing

Use one of the two following methods that you can use to install the Zowe CLI Plug-in for IBM IMS:

- [Installing from online registry](#installing-from-online-registry)

- [Installing from local package](#installing-from-local-package)

**Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-ins, and install from specific registries, see [Install Plug-ins](cli-installplugins.md).

### Installing from online registry

To install Zowe CLI from an online registry, complete the following steps:

1. Set your npm registry if you did not already do so when you installed Zowe CLI. Issue the following command:

    ```
    npm config set @zowe:registry
    ```

2. Open a command line window and issue the following command:

    ``` 
    zowe plugins install @zowe/ims
    ```

### Installing from local package

If you downloaded the Zowe CLI `zowe-cli-bundle.zip` package, complete the following steps to install the Zowe CLI Plug-in for IMS:

1. Open a command line window and change the local directory where you extracted the `zowe-cli-bundle.zip` file. If you do not have the `zowe-cli-bundle.zip` file, see the topic [Install Zowe CLI from local package](cli-installcli.html#installing-zowe-cli-from-local-package) for information about how to obtain and extract it.

2. Issue the following command to install the plug-in:

    ```
    zowe plugins install zowe-cli-ims.tgz
    ```

3. (Optional) After the command execution completes, issue the following command to validate that the installation completed successfully.
  
    ```
    zowe plugins validate @zowe/ims
    ```
    Successful validation of the IMS plug-in returns the response: `Successfully validated`. You can safely ignore `*** Warning:` messages related to Imperative CLI Framework.
      
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

**Note:** For more information, issue the command `zowe profiles create fmp-profile --help`
