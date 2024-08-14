# Configuring Zowe Chat with Slack

This step is for Slack users only. You configure your chat platform by editing the `slack.yaml` file.

## Prerequisite

Make sure that you have configured your chat tool when configuring the Zowe Chat server. For details, see [Configuring Zowe Chat server](chat_configure_server.md).

## Configuring Slack

1. Go to the Zowe Chat configuration directory.

   ```
   cd $ZOWE_CHAT_HOME/config/chatTools
   ```

1. Edit the `slack.yaml` file. Replace Your_signing_secret and Your_bot_user_OAuth_token. If you use socket mode, you also need to provide your app level token. If you connect Slack over HTTP, you need to configure HTTP endpoint.

   :::tip

   - You should have saved the signing secret and bot user OAuth token when you installed the Slack App. For details, see step 2 and 3 in [Installing the Slack App](chat_prerequisite_slack_install.md).
   - If you use socket mode to connect to Slack, you need to set the **socketMode enabled** as `true` and the **httpEndpoint enabled** as `false` and provide the app level token which you should have saved when you configured the Slack App. For details, see step 7 in [Connecting to Slack using Socket mode](chat_prerequisite_slack_socket_mode.md).
   - If you connect to Slack over HTTP endpoint, you need to set the **socketMode enabled** as `false` and the **httpEndpoint enabled** as `true`. You need to configure the HTTP endpoint, protocol, host name, port number and the basePath that you want to use.

   :::

   ```
   # Specify the bot user name or account that is used in your chat tool server.
   # The default value is zowechat.
   botUserName: zowechat

   # Specify the signing secret of your chatbot Slack app
   signingSecret: <Your slack signing secret>

   # Specify the bot user OAuth token of your chatbot Slack app
   token: <Your bot user oauth token>

   # Specify the protocol to connect to Slack for your chatbot Slack app to receive app payloads.
   # You can see more details in https://api.slack.com/apis/connections.
   # The value can be socketMode or httpEndpoint.
   # The default value is socketMode.
   socketMode: # Configure the private WebSocket for Slack to communicate with your chatbot Slack app.
     # Enable or disable the socketMode connection protocol. The value can be true or false.
     # The default value is true.
     enabled: true

     # Specify the app level token of your chatbot Slack app.
     appToken: <Your app level token>

   # Configure the messaging application which Slack will communicate with when some user clicking actions occur.
   httpEndpoint:
     # Enable or disable the httpEndpoint connection protocol. The value can be true or false.
     # The default value is false.
     enabled: false

     messagingApp:
       # Specify the protocol of your HTTP endpoint. The value can be https or http.
       # The default value is https.
       protocol: https

       # Specify the host name or IP address of your HTTP endpoint.
       hostName: <Your host name>

       # Specify the port number of your HTTP endpoint.
       # The default value is 7701.
       port: 7701
    
       # Specify the base path of your HTTP endpoint.
       # The default value is /zowe/chat/api/v1.
       basePath: /zowe/chat/api/v1

       # Specify the absolute file path of the TLS key (PEM) if HTTPS protocol is specified.  
       tlsKey: <Your absolute TLS key file path of your messaging server>

       # Specify the absolute file path of the TLS certificate (PEM) if HTTPS protocol is specified.
       tlsCert: <Your absolute TLS cert file path of your messaging server>
    ```

