# Configuring the chat tool-Slack

This step is for Slack users only. You can configure your chat platform by editing the slack.yaml file.

Make sure that you have conﬁgured your chat tool when configuring Zowe Chat server. For details, see [Conﬁguring Zowe Chat server](chatops_config_chatops_server.md).

1.  Go to the Zowe Chat configuration directory.

    -   For Container users:
        1.  Go to the directory where you extract the Zowe Chat Container archive.
        2.  Run the following command to open an interactive bash shell on the Zowe Chat container that is running.

            ```
            ./bnzContainer.sh shell
            ```

        3.  Go to the configuration directory.

            ```
            cd config/chattools
            ```

            **Tip:** If you are familiar with docker/podman commands, you can use commands to open the interactive bash shell. You can also edit the configuration files directly in the mounted path of the zchatops-configuration-112 volume.

    -   For native installation users:

        ```
        cd $ZCHATOPS\_HOME/config/chattools
        ```

2.  Edit the slack.yaml file. Replace Your\_signing\_secret and Your\_bot\_user\_OAuth\_token. If you use socket mode, you also need to provide your app level token. If you connect Slack over HTTP, you need to configure HTTP endpoint.

    ```
    # Licensed material - Property of IBM
    # © Copyright IBM Corporation 2022.
    # This file controls Slack related configurations for your chat tool server
    
    # Specify the bot user name or account that is used in your chat tool server.
    # The default value is bnz.
    botUserName: bnz
    
    # Specify the signing secret of your chatbot Slack app
    # The secret will be encrypted automatically by Zowe Chat server with <AES> prefix added.
    signingSecret: Your signing secret
    
    # Specify the bot user OAuth token of your chatbot Slack app
    # The token will be encrypted automatically by Zowe Chat server with <AES> prefix added.
    botUserToken: Your bot user OAuth token
    
    # Specify the protocol to connect to Slack for your chatbot Slack app to receive app payloads.
    # You can see more details in https://api.slack.com/apis/connections.
    # The value can be socketMode or httpEndpoint.
    # The default value is socketMode.
    connectionProtocol:
      # Configure the private WebSocket for Slack to communicate with your chatbot Slack app.
      socketMode:
        # Enable or disable the socketMode connection protocol. The value can be true or false.
        # The default value is true.
        enabled: true
    
        # Specify the app level token of your chatbot Slack app.
        # The token will be encrypted automatically by Zowe Chat server with <AES> prefix added.
        appLevelToken: Your app level token
    
      # Configure the static public HTTP endpoint for Slack to communicate with your chatbot Slack app.
      httpEndpoint:
        # Enable or disable the httpEndpoint connection protocol. The value can be true or false.
        # The default value is false.
        enabled: false
    
        # Specify the protocol of your HTTP endpoint. The value can be https or http.
        # The default value is https.
        protocol: https
    
        # Specify the host name or IP address of your HTTP endpoint.
        hostName: Your host name
    
        # Specify the port number of your HTTP endpoint.
        # The default value is 5001.
        port: 5001
        
        # Specify the base path of your HTTP endpoint.
        # The default value is /bnz/api/v1.
        basePath: /bnz/api/v1
    ```

    **Tip:**

    -   You should have saved the signing secret and bot user OAuth token when you installed the Slack App. For details, see step 2 and 3 in [Installing the Slack App](installing_the_app.md).
    -   If you use socket mode to connect to Slack, you need to set the socketMode **enabled** as true and the httpEndpoint **enabled** as false and provide the app level token which you should have saved when you configured the Slack App. For details, see step 7 in [Connecting to Slack using Socket mode](connecting_to_slack_using_a_socket_mode.md).
    -   If you connect to Slack over HTTP endpoint, you need to set the socketMode **enabled** as false and the httpEndpoint **enabled** as true. You need to configure the HTTP endpoint, protocol, host name, port number and the basePath that you want to use.

If you connect to Slack using public HTTP endpoint, you need to [Configure the Request URL for the Interactivity for your created Slack App](chatops_config_slack_web_hook.md#configure_requesturl_interactivity), and [Configure the Request URL for event subscriptions for your created Slack App](chatops_config_slack_web_hook.md#configure_requesturl_event) after your Zowe Chat is started.

