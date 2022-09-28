# System requirements

Before installing Zowe Chat, ensure that your environment meets the prerequisites that are described in this article.

## Hardware requirements

-   Processor number: <!--TODO-->
-   Memory: <!--TODO-->
-   Disk space: <!--TODO-->
-   Internet access <!--TODO-->
    -   Internet access is always required if you plan to connect your Zowe Chat with Slack chat platform. There are two ways to connect to Slack, over HTTP or using Socket mode. We strongly recommend that you use Socket mode, as you can receive events via a private WebSocket, instead of a direct HTTP subscription to events. If you want to receive events directly over HTTP. You must configure your own network firewall or use some proxy servers to make sure that your Slack App of your Slack workspace in public cloud can access the HTTP endpoint of the Zowe Chat server. For more Slack related configuration, see [Configuring the chat tool-Slack](configuring_the_chat_tool_slack.md).
    -   Internet access is always required if you plan to connect your Zowe Chat with Microsoft™ Teams chat platform. For more Teams related configuration, see [Configuring messaging endpoint for Microsoft Teams](chatops_prerequisite_endpoint_teams.md).

## Software requirements

- Node.js: 
  
  Install a currently supported version of [Node.js LTS](https://nodejs.org/en/). For a complete list of supported LTS versions, see [Nodejs Releases](https://nodejs.org/en/about/releases/).
-   Operating system:
    -   Linux® on System x
    -   Linux on System z®
-   Runtime: <!--TODO-->
-   Chat platform: <!--TODO: what are the required versions-->
    -   Slack
    -   Mattermost or later
    -   Microsoft™ Teams

<!--TODO: Any other requirements for plug-ins or data source?-->