# Zowe CLI Plug-in for IBM CICS

The Zowe CLI Plug-in for IBM® CICS® lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS.For more information, see [CICS management client interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) on the IBM Knowledge Center.

  - [Use Cases](#use-cases)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Setting up profiles](#setting-up-profiles)
  - [Commands](#commands)

## Use cases

As an application developer, you can use Zowe CLI Plug-in for IBM CICS to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with COBOL. 
  - Deploy changes to CICS regions for testing or delivery. See the [define command](#defining-resources-to-cics) for an example of how you can define programs to CICS to assist with testing and delivery. 
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and resource definitions. 

## Prerequisites

Before you install the plug-in, meet the following prerequisites:

  - [Install Zowe CLI](cli-installcli.md) on your PC.
  - Verify that [IBM® CICS® Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) API is installed and configured on your mainframe systems.

## Installing

There are **two methods** that you can use to install the Zowe CLI Plug-in for IBM CICS - install from Bintray or install from the Zowe package.

### Installing from Bintray

If you installed Zowe CLI from **Bintray**, complete the following steps:

1. Open a command line window and issue the following command:

  ``` 
  zowe plugins install @brightside/cics
  ```

2. After the command execution completes, issue the following command to validate that the installation completed successfully.

  ```
  zowe plugins validate cics
  ```

  Successful validation of the IBM CICS plug-in returns the response: `Successfully validated`.

To validate that the plug-in installed successfully, issue the following command:

```
 zowe plugins validate @brightside/cics
```

**Note:** For detailed information about how to install multiple plug-ins, update to a specific version of a plug-ins, and install from specific registries, see [Install Plug-ins](cli-installplugins.md).

## Setting up profiles

A `cics` profile is required to issue commands in the CICS group that interact with CICS regions. The `cics` profile contains your host, port, username, and password for the IBM CMCI server of your choice. You can create multiple profiles and switch between them as needed.

Issue the following command to create a cics profile: 

```
zowe profiles create cics <profile name> -H <host> -P <port> -u <user> -p <password>
```

**Note:** For more information about the` `syntax, actions, and options, for a `profiles create` command, open Zowe CLI and issue the following command:

```
zowe profiles create cics -h
```

The result of the command displays as a success or failure message. You can use your profile when you issue commands in the `cics` command group.

## Commands

The Zowe CLI Plug-in for IBM CICS adds the following commands to Zowe CLI:

  - [Defining resources to CICS](#defining-resources-to-cics)
  - [Deleting CICS resources](#deleting-cics-resources)
  - [Discarding CICS resources](#discarding-cics-resources)
  - [Getting CICS resources](#get-cics-resources)
  - [Installing resources to CICS](#installing-resources-to-cics)
  - [Refreshing CICS programs](#refreshing-cics-programs)

### Defining resources to CICS

The define command lets you define programs and transactions to CICS so that you can deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

```
zowe cics define -h
```

**Example:**

Define a program named `myProgram` to the region named `myRegion` in the CICS system definition (CSD) group `myGroup:`

```
zowe cics define program myProgram myGroup --region-name myRegion
```

### Deleting CICS resources

The delete command lets you delete previously defined CICS programs or transactions to help you deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

```
zowe cics delete -h
```

**Example:**

Delete a program named PGM123 from the CICS region named MYREGION:

```
zowe cics delete program PGM123 --region-name MYREGION
```

### Discarding CICS resources

The discard command lets you remove existing CICS program or transaction definitions to help you deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

```
zowe cics discard -h
```

**Example:**

Discard a program named PGM123 from the CICS region named MYREGION:

```
zowe cics discard program PGM123 --region-name MYREGION
```

### Getting CICS resources

The get command lets you get a list of programs and transactions that are installed in your CICS region so that you can determine if they were installed successfully and defined properly. To display a list of objects and options, issue the following command:

```
zowe cics get -h
```

**Example:**

Return a list of program resources from a CICS region named MYREGION:

```
zowe cics get resource CICSProgram --region-name MYREGION
```

### Installing resources to CICS

The install command lets you install resources, such as programs and transactions, to a CICS region so that you can deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

``` 
zowe cics install -h
```

**Example:**

Install a transaction named TRN1 to the region named MYREGION in the CSD group named MYGRP:

```
zowe cics install transaction TRN1 MYGRP --region-name MYREGION
```

### Refreshing CICS programs

The refresh command lets you refresh changes to a CICS program so that you can deploy and test the changes to your CICS application. To display a list of objects and options, issue the following command:

```
zowe cics refresh -h
```

**Example:**

Refresh a program named PGM123 from the region named MYREGION:

```
zowe cics refresh PGM123 --region-name MYREGION
```
