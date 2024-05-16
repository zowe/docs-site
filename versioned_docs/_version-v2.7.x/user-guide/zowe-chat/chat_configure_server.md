# Configuring Zowe Chat

To complete the configuration of Zowe Chat, you must complete the individual configuration steps listed below.

1. [Configure Zowe Chat server](#zowe-chat-server-configuration)
2. [Configure z/OSMF endpoint information](#zowe-chat-zosmf-endpoint-configuration)
3. [Configure chat tool information](#chat-tool-configuration)

## Zowe Chat server configuration

You can configure the Zowe Chat server by editing the `chatServer.yaml` configuration file.

1. Go to the Zowe Chat configuration directory by running the following command:

   ```
   cd $ZOWE_CHAT_HOME/config
   ```

2. Edit the `chatServer.yaml` configuration file. Customize the default values based on your needs, for example, your chat tool. 

   ```
   # Specify the type of chat tool. Currently, 'mattermost', 'slack' or 'msteams' are the supported values.
   # The default value is mattermost.
   chatToolType: mattermost

   # Configure logging
   log:
     # Specify the log file path
     # The default value is chatServer.log
     filePath: chatServer.log
  
     # Specify the level of logs, the value can be error, warn, info, verbose, debug or silly.
     # The default value is info.
     level: info

     # Specify the maximum size of the file after which it will rotate. The value can be a number of bytes without any unit
     # or a number suffixed with 'k', 'm', or 'g' as units of kb, mb, or gb separately.
     # The default value is null, which means the file size is unlimited except operating system limit.
     maximumSize: null

     # Specify the maximum file number of logs to keep.
     # The default value is null, which means only one log file and no logs will be removed.
     maximumFile: null

     # Specify whether the console output is suppressed or not. The value can be true or false.
     # The default value is true, which means the console output is suppressed.
     consoleSilent: true

   # Specify the chatting limit
   limit:
      # Specify the maximum number of resources that chatbot can retrieve for you.
      record: 10
      # Specify the maximum number of plugins that can respond to the same matched message or event.
      plugin: -1

   # Specify what security challenge method when accessing backend resource from chat tool channels. The value can be webapp, dialog or passticket.
   # The default value is webapp
   # Note: dialog and passticket is not supported at present
   securityChallengeMethod: webapp

   # Specify the configuration for Chat Web App
   webApp:
     # Specify the protocol of your HTTP endpoint. The value can be https or http.
     # The default value is https.
     protocol: https

     # Specify the host name or IP address of your HTTP endpoint.
     hostName: <Your hostname>

     # Specify the port number of the endpoint will serve the Chat Web App.
     # The default value is 7702.
     port: 7702

     # Specify the base path of your HTTP endpoint.
     # The default value is /zowe/chat/index
     basePath: /zowe/chat/index

     # Specify the absolute file path of the TLS key (PEM) if HTTPS protocol is specified.
     tlsKey: <Your absolute TLS key file path of your messaging server>

     # Specify the absolute file path of the TLS certificate (PEM) if HTTPS protocol is specified.
     tlsCert: <Your absolute TLS cert file path of your messaging server>
    ```

## Zowe Chat z/OSMF endpoint configuration

Zowe Chat is configured to run against a single z/OSMF server. You describe your z/OSMF server information by editing the `zosmfServer.yaml` configuration file.

1. Go to the z/OSMF server configuration directory by running the following command: 

   ```
   cd $ZOWE_CHAT_HOME/config
   ```

2. Edit the `zosmfServer.yaml` configuration file. Customize the default values based on your system . 

   ```
   # Specify the protocol of your Z/OSMF server. The value can be https or http.
   # The default value is https.
   protocol: https

   # Specify the host name or IP address of your Z/OSMF server.
   hostName: <Your host name>

   # Specify the port number of your z/OSMF server.
   # The default value is 443.
   port: 443

   # Specify whether self-signed certificates are rejected or not. The value can be true or false.
   # The default value is true
   rejectUnauthorized: true

   # Specify authentication type. The value can be token or password
   # The default value is password
   # Note: token is not supported at present
   authType: password

   # If you prefer all bot requests against mainframe services to use a single service account, set to true
   serviceAccount: 
     # Enable or disable the service account. The value can be true or false.
     # The default value is false.
     enabled: false

     # Service account id. if service account is enabled, this information is required.
     user: <Service account ID>

     # Service account password. if service account is enabled, this information is required.
     password: <Service account password>
    ```

## Chat tool configuration

Zowe Chat's chat tool configuration varies depending on your choice of chat tool. 

**Slack**
- [Configuring Zowe Chat with Slack](chat_configure_slack.md)

**Microsoft Teams**
- [Configuring Zowe chat with Microsoft Teams](chat_configure_teams.md)

**Mattermost** 
- [Configuring Zowe Chat with Mattermost](chat_configure_mattermost.md)
