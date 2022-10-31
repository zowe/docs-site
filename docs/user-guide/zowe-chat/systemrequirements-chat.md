# System requirements

Before installing Zowe Chat, ensure that your target environment meets the prerequisites that are described in this article. 

Zowe Chat must be able to communicate with the chat tool you plan to use. More information is provided in the network requirements section. 

- [Linux System Requirements](#linux-system-requirements)
  - [Node.js](#nodejs)
  - [Optional: Zowe CLI](#zowe-cli-optional)
- [z/OS System Requirements](#zos-system-requirements)
  - [z/OSMF](#zosmf)
- [Network Requirements](#network-requirements)
  - [Ports](#ports)
  - [Connectivity Requirements](#connectivity-requirements)
- [Chat Tool Requirements](#chat-tool-requirements)

## Linux system requirements

The chat server must meet the following requirements: 

- Operating System: Any Linux distribution (Linux or zLinux)
  
  :::note
  
  Zowe Chat can only be deployed to Linux or zLinux environments now. z/OS support is pending further review. If you are interested in running Zowe Chat on z/OS, let us know by [opening a question](https://github.com/zowe/zowe-chat/issues/new/choose).

  :::

- Processor count: 1
- Memory: 4 GB
- Disk space: 300 M

### Node.js

- Node.js v16.x. Zowe Chat has not yet been tested with 14.x or 18.x.

  If Node.js is not included out of the box in your Linux distribution, you must install it. To install Node.js, follow the instructions on the [Node.js Download Page](https://nodejs.org/en/download/). It is recommended that you use a package manager [as outlined here](https://nodejs.org/en/download/package-manager/) if possible.

### Zowe CLI (Optional)

If you want to run Zowe CLI on Zowe Chat, you must install Zowe CLI on your Zowe Chat server. To install Zowe CLI, see [Installing Zowe CLI](../cli-installcli.md).

## z/OS system requirements

### z/OSMF

- IBM z/OS Management Facility (z/OSMF) Version 2.3 or Version 2.4.
<!--z/OS V2.2 reached end of support on 30 September 2020-->

  z/OSMF is included with z/OS so does not need to be separately installed. You must configure z/OSMF with REST APIs enabled because these APIs are used by Zowe Chat as data provider. 

  - For non-production use of Zowe Chat (such as development, proof-of-concept, demo), you can set up z/OSMF Lite. See [Configuring z/OSMF Lite (non-production environment)](../systemrequirements-zosmf-lite.md).
  - For production use of Zowe Chat, see [Configuring z/OSMF](../systemrequirements-zosmf.md).

## Network requirements

### Ports

The following ports are required to run Zowe Chat. You can change the defaults as part of the Zowe Chat configuration. See the [Configuring Zowe Chat](./chat_configure_overview.md) topic for more detail.

| Port number | Configuration file | Configuration field | Description |
|------|------|------|-----|
| 7701 | `$ZOWE_CHAT_HOME/config/chatServer.yaml` | `webapp.port` | Used to host a web application required to login users |  
| 7702 | <code>$ZOWE_CHAT_HOME/config/chatTools/&lt;mattermost &#124; msteams &#124; slack&gt;.yaml</code> | `messagingApp.port` | Used as the messaging endpoint by some chat tools. |

### Connectivity Requirements

Zowe Chat requires network connectivity to the mainframe system z/OSMF is running on, as well as network connectivity to the chat tool of your choice. Since mainframes reside inside organizations’ private networks, by default we assume that Zowe Chat will also be deployed in such a private network, and recommend it. Each chat tool has its own connectivity requirements that require additional consideration as part of your installation plan.

**Slack**:

- Public internet access is required. There are two ways to connect to Slack, over HTTP or using Socket mode. Socket mode sets up a persistent connection to the Slack chat platform using secure WebSockets, while in HTTP mode Slack issues requests directly to Zowe Chat over HTTP. 
- We strongly recommend that you use Socket mode, as it reduces your overall network configuration burden and is equally secure when compared to HTTP mode.
  - Socket mode requires that Zowe Chat has *outbound* public internet access.
  - HTTP mode requires that Zowe Chat has both *outbound* and *inbound* public internet access. To set up inbound access, you must configure your network firewall or use proxy servers to ensure that the Slack platform (on the public net) can reach the HTTP endpoint of the Zowe Chat server (on your private network). 

For more Slack related configuration, see [Configuring the chat tool Slack](chat_prerequisite_slack.md).


**Microsoft Teams**:

Both *outbound* and *inbound* public internet access are required if you plan to connect your Zowe Chat with Microsoft Teams chat platform, and will require network firewall configuration or use of proxy servers to allow the inbound traffic. 

For more Teams-related configuration, see [Configuring messaging endpoint for Microsoft Teams](chat_prerequisite_teams_configure_endpoint.md).

**Mattermost**:

Mattermost requires both *outbound* and *inbound* network access. However, the specific connectivity details depend on the deployment of Mattermost in your organization.

- If you use a cloud-hosted instance of Mattermost, you will require network firewall configuration or use of proxy servers to allow inbound traffic to reach Zowe Chat.
- If you use an on-premises instance of Mattermost, no additional network configuration is required.

## Chat Tool Requirements

Before you install Zowe Chat on your site, you must set up a bot in the Chat Tool you plan to connect with Zowe Chat. You will use the information from the bot setup in a future Zowe Chat configuration step. 

**Slack**
- See [Configuring Slack chat platform](chat_prerequisite_slack.md).

**Microsoft Teams**
- See [Configuring Microsoft Teams chat platform](chat_prerequisite_teams.md).

**Mattermost**
-  Must be version 7.0 or newer. See [Configuring Mattermost chat platform](chat_prerequisite_mattermost.md).
           
