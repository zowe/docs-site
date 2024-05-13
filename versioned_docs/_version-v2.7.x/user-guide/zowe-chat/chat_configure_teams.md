# Configuring Zowe Chat with Microsoft Teams

This step is for Microsoft Teams users only. You configure your chat platform by editing the `msteams.yaml` file.

## Prerequisite

Make sure that you have configured your chat tool when configuring the Zowe Chat server. For details, see [Configuring Zowe Chat server](chat_configure_server.md).

## Configuring Microsoft Teams

1. Go to the Zowe Chat configuration directory.

   ```
   cd $ZOWE_CHAT_HOME/config/chatTools
   ```

1. Edit the `msteams.yaml` file. Replace `<Your Bot ID>`, `<Your bot password>` and `<Your host name>` with values based on your environment.
   
   :::tip

   You should have saved your bot ID and bot password when you created your bot. For details, see [Creating a bot with Microsoft Bot Framework](chat_prerequisite_teams_create_bot_framework.md) or [Creating a bot with Microsoft Azure](chat_prerequisite_teams_create_bot_azure.md).

   :::

   ```
   #  Specify the bot user name or account that is used in your chat tool server.
   # The default value is zowechat.
   botUserName: zowechat

   # Specify the ID of your Microsoft Teams bot.
   botId: <Your Bot ID>

   # Specify the password of your Microsoft Teams bot.
   botPassword: <Your bot password>

   # Configure the messaging endpoint for your Microsoft Teams bot.
   # Configure the messaging application which your Microsoft Teams bot will communicate with when some user clicking actions occur.
   messagingApp:
     # Specify the protocol of your messaging endpoint. The value only can be https.
     # The default value is https.
     protocol: https

     # Specify the host name or IP address of your messaging endpoint.
     hostName: <Your host name>

     # Specify the port number of your messaging endpoint.
     # The default value is 7701.
     port: 7701
  
     # Specify the base path of your messaging endpoint.
     # The default value is /zowe/chat/api/v1.
     basePath: /zowe/chat/api/v1

     # Specify the absolute file path of the TLS key (PEM) if HTTPS protocol is specified.  
     tlsKey: <Your absolute TLS key file path of your messaging server>

     # Specify the absolute file path of the TLS certificate (PEM) if HTTPS protocol is specified.
     tlsCert: <Your absolute TLS cert file path of your messaging server>
   ```
