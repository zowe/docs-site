# Hardware requirements

To successfully install Zowe Chat, you must meet the hardware requirements considering processor number, memory, disk space, port number, and internet access.

## Hardware prerequisites

-   Processor number: 1
-   Memory: 4 GB
-   Disk space: the required disk space varies depending on which kind of installation you choose, Container or native installation.
    -   Container image based installation: 0.7 GB
        -   0.7 GB for Zowe Chat container
        -   \(optional\) 1.9 GB for Mattermost container
    -   Native installation: 90 M
-   Port numbers: 2
    -   4001 for Microservice
    -   5001 for messaging endpoint of Chatbot
    -   **Note:** You can configure the port number in the configuration file as you need.

To configure the port number for Microservice, edit the Zowe Chat server configuration file at ZCHATOPS\_HOME/config/bnz-server.yaml.

To configure the port number of the messaging endpoint, edit the chat tool configuration at ZCHATOPS\_HOME/config/chattools/<chat\_tool\>.yaml

-   Internet access
    -   Internet access is always required if you plan to connect your Zowe Chat with Slack chat platform. There are two ways to connect to Slack, over HTTP or using Socket mode. We strongly recommend that you use Socket mode, as you can receive events via a private WebSocket, instead of a direct HTTP subscription to events. If you want to receive events directly over HTTP. You must configure your own network firewall or use some proxy servers to make sure that your Slack App of your Slack workspace in public cloud can access the HTTP endpoint of the Zowe Chat server. For more Slack related configuration, see [Configuring the chat tool-Slack](configuring_the_chat_tool_slack.md).
    -   Internet access is always required if you plan to connect your Zowe Chat with Microsoft™ Teams chat platform. For more Teams related configuration, see [Configuring messaging endpoint for Microsoft Teams](chatops_prerequisite_endpoint_teams.md).

**Parent topic:**[Planning for Zowe Chat](chatops_prerequisite_requirement.md)

