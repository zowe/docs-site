# System requirements

Before installing Zowe Chat, ensure that your target environment meets the prerequisites that are described in this article. The Zowe Chat components must be installed on Linux or zLinux. Zowe Chat deployment to z/OS is pending further evaluation. 

The components provided in Zowe chat provide services that are accessed through a web browser, and Zowe Chat must be able to communicate with the Chat Applications you will . More information is provided in the network requirements section. 

- [Linux System Requirements](#linux-system-requirements)
  - [Node.js](#nodejs)
- [z/OS System Requirements](#zos-system-requirements)
  - [z/OSMF (Required)](#zosmf)
- [Network Requirements](#network-requirements)
- [Chat Client Requirements](#chat)
## Linux System requirements

The chat server must meet the following requirements: 

- Operating System: Any Linux distribution (z/Linux or x86 Linux)
- Processor count: 1
- Memory: 4 GB
- Disk space: 300 M

### Node.js

- Node.js v14.x or v16.x. Zowe Chat has not yet been tested with 18.x.

  Node may not be included out of the box in your Linux distribution, and if so you must install it.  To install Node.js follow the instructions on the [Node.js Download Page](https://nodejs.org/en/download/). It is recommended to use a package manager if possible, [outlined here](https://nodejs.org/en/download/package-manager/).

## z/OS System Requirements
### z/OSMF

- IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

  - z/OSMF is included with z/OS so does not need to be separately installed. It does need to be configured with REST APIs enabled, as these APIs are used by the Zowe Chat application. 

  **Tips:**

  - For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see [Configuring z/OSMF Lite (non-production environment)](../systemrequirements-zosmf-lite.md).
  - For production use of Zowe, see [Configuring z/OSMF](systemrequirements-zosmf.md).

## Network Requirements
- Two available ports
    ---
   :::note
   You can configure the port numbers the ChatBot uses in the configuration file as you need. By default
   
   To configure the port number for web app, edit the configuration file `ZOWE_CHAT_HOME/config/chatServer.yaml`. 
   
   To configure the port number for the messaging endpoint, edit the chat tool configuration file at `$ZOWE_CHAT_HOME/config/chatTools/<mattermost | msteams | slack>.yaml`.
   :::
   ---
-   Internet access 
    -   Internet access is always required if you plan to connect your Zowe Chat with Slack chat platform. There are two ways to connect to Slack, over HTTP or using Socket mode. We strongly recommend that you use Socket mode, as you can receive events via a private WebSocket, instead of a direct HTTP subscription to events. If you want to receive events directly over HTTP. You must configure your own network firewall or use some proxy servers to make sure that your Slack App of your Slack workspace in public cloud can access the HTTP endpoint of the Zowe Chat server. For more Slack related configuration, see [Configuring the chat tool Slack](chat_prerequisite_slack.md).
    -   Internet access is always required if you plan to connect your Zowe Chat with Microsoft Teams chat platform. For more Teams related configuration, see [Configuring messaging endpoint for Microsoft Teams](chat_prerequisite_teams_configure_endpoint.md).

## Software requirements


- [Node.js]((https://nodejs.org/en/)) v16.13.2 or later is installed on your Linux server

- Chat platform: 

   - Mattermost 7.0 or later. See [Configuring Mattermost chat platform](chat_prerequisite_mattermost.md).
    
   - Microsoft Teams. See [Configuring Microsoft Teams chat platform](chat_prerequisite_teams.md).
  
   - Slack. See [Configuring Slack chat platform](chat_prerequisite_slack.md).
       
