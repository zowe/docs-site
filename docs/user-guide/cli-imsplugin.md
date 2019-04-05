# Zowe CLI Plug-in for IBM IMS
The CA Brightside Plug-in for IBM® Information Management System (IMS)™ lets you extend CA Brightside to interact with IMS resources (regions, programs and transactions). You can use the plug-in to start, stop, and query regions and start, stop, query, and update programs and transactions. For more information about IMS, see [IBM Information Management System (IMS)](https://www.ibm.com/it-infrastructure/z/ims) in the IBM  Knowledge Center.


  - [Use Cases](#use-cases)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Setting up profiles](#setting-up-profiles)
  - [Commands](#commands)

## Use cases

As an application developer or DevOps administrator, you can use Zowe CLI Plug-in for IBM IMS to perform the following tasks:

- Refresh IMS transactions, programs, and dependent IMS regions.  
- Deploy application code into IMS production or test systems.
- Write scripts to automate IMS actions that you traditionally perform using ISPF editors, TSO, and SPOC. 

## Prerequisites

Before you install the plug-in, meet the following prerequisites:

* [Install Zowe CLI](cli-installcli.md) on your computer.

* Ensure that [IBM® IMS™ v14.1.0](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_14.1.0/com.ibm.ims14.doc/ims_product_landing_v14.html) or later is installed and running in your mainframe environment.

* Configure [IBM® IMS™ Connect](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_13.1.0/com.ibm.ims13.doc.ccg/ims_ct_intro.htm). IMS Connect is required so that IBM IMS Operations APIs can function. 

* Configure IBM IMS Operations APIs to enable communication between the CLI and the IMS instance.

## Installing

Use one of the two following methods that you can use to install the Zowe CLI Plug-in for IBM IMS:

- [Installing from online registry](#installing-from-online-registry)

- [Installing from local package](#installing-from-local-package)

**Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-ins, and install from specific registries, see [Install Plug-ins](cli-installplugins.md).

### Installing from online registry

To install Zowe CLI from an online registry, complete the following steps:

1. Set your npm registry if you did not already do so when you installed Zowe CLI. Issue the following command:

    ```
    npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
    ```

2. Open a command line window and issue the following command:

    ``` 
    zowe plugins install @zowe/ims@lts-incremental
    ```

3. (Optional) After the command execution completes, issue the following command to validate that the installation completed successfully.

    ```
    zowe plugins validate ims
    ```

    Successful validation of the IMS plug-in returns the response: `Successfully validated`. You can safely ignore `*** Warning:` messages related to Imperative CLI Framework.

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
      
## Setting up profiles

You can set up an `ims` profile to retain your credentials, host, and port name for each subsequent action. You can create multiple profiles and switch between them as needed. Issue the following command to create an `ims` profile: 

```
zowe profiles create ims-profile <profileName> --host <hostname> --port <portnumber> --ims-connect-host <ims-hostname> --ims-connect-port <ims-portnumber> --user <username> --password <password>
```

*Where:*

- **profileName**

    Specifies the name of the new ims profile. You can load this profile by using the name on commands that support the --ims-profile option.

- **--host | -H**

    Specifies the IMS Command Services server host name.

- **--port  | -P**

    Specifies the IMS Command Services server port. 

- **--ims-connect-host | -ich**

    Specifies the hostname of your instance of IMS Connect. This is typically the hostname of the mainframe LPAR where IMS Connect is running.

- **--ims-connect-port | -icp**

    Specifies the port of your instance of IMS Connect. This port can be found in your IMS Connect configuration file on the mainframe.

- **--plex | -x**

    Specifies the name of the IMSplex.

- **--user  | -u**

    Specifies the username for logging on to the system specified in hostname.

- **--password | --pass**
    
    Specifies the password for logging on to the system specified in hostname.

**Example: Setting up an IMS profile**

The following example creates an ims profile named 'ims123' to connect to IMS APIs at host zos123 and port 1490. The name of the IMS plex in this example is 'PLEX1' and the IMS region we want to communicate with has a host of zos124 and a port of 1491:

```
zowe profiles create ims-profile ims123 --host zos123 --port 1490 --user ibmuser --pass myp4ss --plex PLEX1 --ich zos124 --icp 1491 
```

Entering the following command stores your profile information in a YAML file, and returns the following message:

```
Profile created successfully! Path:
C:\Users\johndoe\.zowe\profiles\ims\ims123.yaml


type:     ims
name:     ims123
host:     zos123
port:     1490
ims-connect-host: zos124
ims-connect-port: 1491
plex:     PLEX1
username: ibmuser
password: myp4ss 
```

## Commands

The plug-in adds the following commands to Zowe CLI:

  - [Starting IMS resources](#starting-ims-resources)
  - [Stopping IMS resources](#stopping-ims-resources)
  - [Querying IMS resources](#querying-ims-resources)
  - [Updating IMS resources](#updating-ims-resources)
  

**Note:** The examples in this section assume that you define your connection details using profiles or environment variables. Alternatively, you can define your connection details with options directly on the command line. For more information, see [Define Zowe CLI connection details](cli-configuringcli.md#defining-zowe-cli-connection-details).

### Starting IMS resources

Start a region, application program, or transaction and make IMS resources available for reference and use. The command submits a START REGION, UPDATE PGM, or UPDATE TRAN IMS command and returns the output. To display a list of objects and options, issue the following command:

```
zowe ims start -h
```

**Example:**

Start a transaction named `TRN1`:

```
zowe ims start transaction TRN1 
```

### Stopping IMS resources

Stops a running region, application program, or transaction. The command submits a STOP REGION, UPDATE PGM, or UPDATE TRAN IMS command and returns the output. To display a list of objects and options, issue the following command:

```
zowe ims stop -h
```

**Example:**

Stop an application program named `PGM123`:

```
zowe ims stop program PGM123
```

### Querying IMS resources

Query application programs, transactions, and regions across an IMSPlex to return information such as class, status, queue count, and more. The command submits an IMS QUERY PGM, DIS ACT, or QUERY TRANS command and returns the output. To display a list of objects and options, issue the following command:

```
zowe ims query -h
```

**Example:**

Query transaction information for transactions named `TRAN1` and `TRAN2`:

```
zowe ims query transaction TRAN1 TRAN2
```

### Updating IMS resources

Query application programs, transactions, and regions across an IMSPlex to return information such as class, status, queue count, and more. The command submits an IMS QUERY PGM, DIS ACT, or QUERY TRANS command and returns the output. To display a list of objects and options, issue the following command:

```
zowe ims update -h
```

**Example:**

Unlock all programs that begin with `PGM` to allow scheduling:

```
zowe ims update program PGM* --lock OFF
```