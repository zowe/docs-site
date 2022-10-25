# Configuring the Zowe Chat server

You can configure the Zowe Chat server by editing the `chatServer.yaml` configuration file.

1. Go to the Zowe Chat configuration directory by running the following command. 

   ```
   cd $ZOWE_CHAT_HOME/config
   ```

2. Edit the `chatServer.yaml` configuration file. Customize the default values based on your needs, for example, your chat tool. 

   ```
   # Specify the type of chat tool. Currently, 'mattermost', 'slack' or 'msteams' are the supported values.
   # The default value is mattermost.
   chatToolType: mattermost

   # # Specify your chat tool's configuration here. By default, sample configuration files will be in the "chatTools" sub-directory.
   # chatToolConfiguration: ./chatTools/mattermost.yaml

   # Configure logging
   log:
     # Specify the log file path
     # The default value is chatServer.log
     filePath: chatServer.log
  
     # Specify the level of logs, the value can be error, warn, info, verbose, debug or silly.
     # The default value is info.
     level: debug

     # Specify the maximum size of the file after which it will rotate. The value can be a number of bytes without any unit
     # or a number suffixed with 'k', 'm', or 'g' as units of kb, mb, or gb separately.
     # The default value is null, which means the file size is unlimited except operating system limit.
     maximumSize: 10m

     # Specify the maximum file number of logs to keep.
     # The default value is null, which means only one log file and no logs will be removed.
     maximumFiles: 10

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
