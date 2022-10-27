# System requirements

Before installing Zowe Chat, ensure that your environment meets the prerequisites that are described in this article.

## Hardware requirements

The chat server must meet the following requirements. 

- Processor number: 1
- Memory: 4 GB
- Disk space: 300 M
- Port numbers: 2
  - 7701 for for messaging endpoint of Chatbot
  - 7702 for web app
  
   :::note
   
   You can configure the port number in the configuration file as you need. 
   
   To configure the port number for Microservice, edit the Microservice server configuration file<!--at ZCHATOPS_HOME/microservice/config/bnzsvc-server.yaml-->. 
   
   To configure the port number for the messaging endpoint, edit the chat tool configuration file<!--at ZCHATOPS_HOME/chatbot/config/bnzbot-server.yaml-->.
   :::

-   Internet access 
    -   Internet access is always required if you plan to connect your Zowe Chat with Slack chat platform. There are two ways to connect to Slack, over HTTP or using Socket mode. We strongly recommend that you use Socket mode, as you can receive events via a private WebSocket, instead of a direct HTTP subscription to events. If you want to receive events directly over HTTP. You must configure your own network firewall or use some proxy servers to make sure that your Slack App of your Slack workspace in public cloud can access the HTTP endpoint of the Zowe Chat server. For more Slack related configuration, see [Configuring the chat tool Slack](chat_prerequisite_slack.md).
    -   Internet access is always required if you plan to connect your Zowe Chat with Microsoft Teams chat platform. For more Teams related configuration, see [Configuring messaging endpoint for Microsoft Teams](chat_prerequisite_teams_configure_endpoint.md).

## Software requirements

- Operating system:
    -   Linux on System x
    -   Linux on System z

- [Node.js]((https://nodejs.org/en/)) v16.13.2 or later is installed on your Linux server

- Chat platform: 

   - Mattermost 7.0 or later

     See [Configuring Mattermost chat platform](chat_prerequisite_mattermost.md).
    
   - Microsoft Teams

     See [Configuring Microsoft Teams chat platform](chat_prerequisite_teams.md).
  
   - Slack
         
     See [Configuring Slack chat platform](chat_prerequisite_slack.md).
       
