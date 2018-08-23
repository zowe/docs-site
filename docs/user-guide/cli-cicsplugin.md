# Zowe CLI Plug-in for IBM CICS

The Zowe CLI Plug-in for IBM® CICS® lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS.</span> For more information, see [CICS management client interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) on the IBM Knowledge Center.

  - [Zowe CLI Plug-in for IBM CICS Use Cases](#id-.CABrightsidePlug-inforIBMCICSv1.0-CABrightsidePlug-inforIBMCICSUseCases)
  - [Zowe CLI Plug-in for IBM CICS Prerequisites](#id-.CABrightsidePlug-inforIBMCICSv1.0-CABrightsidePlug-inforIBMCICSPrerequisites)
  - [Install Zowe CLI Plug-in for IBM CICS](#id-.CABrightsidePlug-inforIBMCICSv1.0-InstallCABrightsidePlug-inforIBMCICS)
  - [Set up Your Zowe CLI Plug-in for IBM CICS Profile](#id-.CABrightsidePlug-inforIBMCICSv1.0-SetupYourCABrightsidePlug-inforIBMCICSProfile)
  - [Zowe CLI Plug-in for IBM CICS Commands](#id-.CABrightsidePlug-inforIBMCICSv1.0-CABrightsidePlug-inforIBMCICSCommands)


## Zowe CLI Plug-in for IBM CICS Use Cases

As an application developer, you can use Zowe CLI Plug-in for IBM CICS to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with COBOL. 
  - Deploy changes to CICS regions for testing or delivery. See the [define command](#id-.CABrightsidePlug-inforIBMCICSv1.0-define) for an example of how you can define programs to CICS to assist with testing and delivery. 
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and resource definitions. 

## Zowe CLI Plug-in for IBM CICS Prerequisites

Before you install the plug-in, meet the following prerequisites:

  - [Install Zowe CLI](cli-installcli.md) on your PC.
  - Verify that [IBM® CICS® Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) API is installed and configured on your mainframe systems.

## Install Zowe CLI Plug-in for IBM CICS

To install the Zowe CLI Plug-in for IBM CICS, issue the following command:

``` 
bright plugins install @brightside/cics
```

To validate that the plug-in installed successfully, issue the following command:

```
 bright plugins validate @brightside/cics
```

**Note:** For detailed information about how to install multiple plug-ins, update to a specific version of a plug-ins, and install from specific registries, see [Install Plug-ins](https://docops.ca.com/display/CMFAAS/Install+Plug-ins).

## Set up Your Zowe CLI Plug-in for IBM CICS Profile

A `cics` profile is required to issue commands in the CICS group that interact with CICS regions. The `cics` profile contains your host, port, username, and password for the IBM CMCI server of your choice. You can create multiple profiles and switch between them as needed.

Issue the following command to create a cics profile: 

```
bright profiles create cics <profile name> <host> <port> <user> <password>
```

**Note:** For more information about the` `syntax, actions, and options, for a `profiles create` command, open Zowe CLI and issue the following command:

`bright profiles create cics -h`

The result of the command displays as a success or failure message. You can use your profile when you issue commands in the `cics` command group.

## Zowe CLI Plug-in for IBM CICS Commands

The Zowe CLI Plug-in for IBM CICS adds the following commands to Zowe CLI:

  - [Define Resources to CICS](#id-.CABrightsidePlug-inforIBMCICSv1.0-defineDefineResourcestoCICS)
  - [Delete CICS Resources](#id-.CABrightsidePlug-inforIBMCICSv1.0-DeleteCICSResources)
  - [Discard CICS Resources](#id-.CABrightsidePlug-inforIBMCICSv1.0-DiscardCICSResources)
  - [Get CICS Resources](#id-.CABrightsidePlug-inforIBMCICSv1.0-GetCICSResources)
  - [Install Resources to CICS](#id-.CABrightsidePlug-inforIBMCICSv1.0-InstallResourcestoCICS)
  - [Refresh CICS Programs](#id-.CABrightsidePlug-inforIBMCICSv1.0-RefreshCICSPrograms)


### Define Resources to CICS

The define command lets you define programs and transactions to CICS so that you can deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

```
bright cics define -h
```

**Example:**

Define a program named `myProgram` to the region named `myRegion` in the CICS system definition (CSD) group `myGroup:`

```
bright cics define program myProgram myGroup --region-name myRegion
```

### Delete CICS Resources

The delete command lets you delete previously defined CICS programs or transactions to help you deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

```
bright cics delete -h
```

**Example:**

Delete a program named PGM123 from the CICS region named MYREGION:

```
bright cics delete program PGM123 --region-name MYREGION
```

### Discard CICS Resources

The discard command lets you remove existing CICS program or transaction definitions to help you deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

```
bright cics discard -h
```

**Example:**

Discard a program named PGM123 from the CICS region named MYREGION:

```
bright cics discard program PGM123 --region-name MYREGION
```

### Get CICS Resources

The get command lets you get a list of programs and transactions that are installed in your CICS region so that you can determine if they were installed successfully and defined properly. To display a list of objects and options, issue the following command:

```
bright cics get -h
```

**Example:**

Return a list of program resources from a CICS region named MYREGION:

```
bright cis get resource CICSProgram --region-name MYREGION
```

### Install Resources to CICS

The install command lets you install resources, such as programs and transactions, to a CICS region so that you can deploy and test the changes to your CICS application. To display a list of possible objects and options, issue the following command:

``` 
bright cics install -h
```

**Example:**

Install a transaction named TRN1 to the region named MYREGION in the CSD group named MYGRP:

```
bright cics install transaction TRN1 MYGRP --region-name MYREGION
```

### Refresh CICS Programs

The refresh command lets you refresh changes to a CICS program so that you can deploy and test the changes to your CICS application. To display a list of objects and options, issue the following command:

```
bright cics refresh -h
```

**Example:**

Refresh a program named PGM123 from the region named MYREGION:

```
bright cics refresh PGM123 --region-name MYREGION
```
