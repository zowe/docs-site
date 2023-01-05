# IBM® CICS® Plug-in for Zowe CLI

The IBM® CICS® Plug-in for Zowe&trade; CLI lets you extend Zowe CLI to interact with CICS programs and transactions. The plug-in uses the IBM CICS® Management Client Interface (CMCI) API to achieve the interaction with CICS. For more information, see [CICS management client interface](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.3.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) on the IBM Knowledge Center.

  - [Use Cases](#use-cases)
  - [Commands](#commands)
  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Creating a user profile](#creating-a-user-profile)


## Use cases

As an application developer, you can use the plug-in to perform the following tasks:

  - Deploy code changes to CICS applications that were developed with COBOL.
  - Deploy changes to CICS regions for testing or delivery. See the [define command](#commands) for an example of how you can define programs to CICS to assist with testing and delivery.
  - Automate CICS interaction steps in your CI/CD pipeline with Jenkins Automation Server or TravisCI.
  - Deploy build artifacts to CICS regions.
  - Alter, copy, define, delete, discard, and install CICS resources and resource definitions.

## Commands

For detailed documentation on commands, actions, and options available in this plug-in, see our Web Help. It is available for download in three formats: a PDF document, an interactive online version, and a ZIP file containing the HTML for the online version.

- <a href="/v2.1.x/web_help/index.html" target="_blank">Browse Online</a>
- <a href="/v2.1.x/zowe_web_help.zip" target="_blank">Download (ZIP)</a>
- <a href="/v2.1.x/CLIReference_Zowe.pdf" target="_blank">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

## Creating a user profile

You can set up a CICS profile to avoid typing your connection details on every command. The profile contains your host, port, username, and password for the CMCI instance of your choice. You can create multiple profiles and switch between them if necessary. Issue the following command to create a cics profile:

```
zowe profiles create cics <profile name> -H <host> -P <port> -u <user> -p <password>
```

The plug-in uses HTTPS by default. Use the optional flag `--protocol http` to override the default with HTTP.

**Note:** For more information, issue the command `zowe profiles create cics --help`
