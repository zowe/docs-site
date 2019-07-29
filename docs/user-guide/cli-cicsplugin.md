# Zowe CLI Plug-in for IBM CICS

The Zowe CLI Plug-in for IBM® CICS® lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS. For more information, see [CICS management client interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) on the IBM Knowledge Center.

  - [Use Cases](#use-cases)
  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Creating a user profile](#creating-a-user-profile)
  - [Commands](#commands)

## Use cases

As an application developer, you can use Zowe CLI Plug-in for IBM CICS to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with COBOL. 
  - Deploy changes to CICS regions for testing or delivery. See the [define command](#defining-resources-to-cics) for an example of how you can define programs to CICS to assist with testing and delivery. 
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and resource definitions. 

## Commands 

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install the Zowe CLI Plug-in for IBM CICS:

- [Installing from an online registry](#installing-from-an-online-registry)

- [Installing from a local package](#installing-from-a-local-package)

**Note:** For more information about how to install multiple plug-ins, update to a specific version of a plug-ins, and install from specific registries, see [Install Plug-ins](cli-installplugins.md).

### Installing from an online registry

To install Zowe CLI from an online registry, complete the following steps:

1. Set your npm registry if you did not already do so when you installed Zowe CLI. Issue the following command:

    ```
    npm config set @brightside:registry https://api.bintray.com/npm/ca/brightside
    ```

2. Open a command line window and issue the following command:

    ``` 
    zowe plugins install @brightside/cics@lts-incremental
    ```

3. (Optional) After the command execution completes, issue the following command to validate that the installation completed successfully.

    ```
    zowe plugins validate @brightside/cics
    ```

    Successful validation of the IBM CICS plug-in returns the response: `Successfully validated`.

### Installing from a local package

If you downloaded the Zowe PAX file and extracted the `zowe-cli-bundle.zip` package, complete the following steps to install the Zowe CLI Plug-in for CICS:

1. Open a command line window and change the local directory where you extracted the `zowe-cli-bundle.zip` file. If you do not have the `zowe-cli-bundle.zip` file, see the topic [Install Zowe CLI from local package](cli-installcli.md#installing-zowe-cli-from-a-local-package) for information about how to obtain and extract it.

2. Issue the following command to install the plug-in:

    ```
    zowe plugins install zowe-cli-cics.tgz
    ```

3. (Optional) After the command execution completes, issue the following command to validate that the installation completed successfully.
  
    ```
    zowe plugins validate @brightside/cics
    ```
    Successful validation of the CICS plug-in returns the response: `Successfully validated`. You can safely ignore `*** Warning:` messages related to Imperative CLI Framework.
      
## Creating a user profile

You can set up a CICS profile to avoid typing your connection details on every command. The profile contains your host, port, username, and password for the CMCI instance of your choice. You can create multiple profiles and switch between them if necessary. Issue the following command to create a cics profile: 

```
zowe profiles create cics <profile name> -H <host> -P <port> -u <user> -p <password>
```

**Note:** For more information, issue the command `zowe profiles create cis --help`