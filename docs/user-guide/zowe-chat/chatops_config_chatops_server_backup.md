# Configuring Zowe Chat server

You can configure Zowe Chat server by editing the bnz-server.yaml file.

Make sure that you have configured your certificate. For details, see [Configuring the certificate](chatops_config_certificate.md).

-   For Docker users:

    1.  TODO

-   For native installation package users:

    1.  Go to the Zowe Chat configuration directory.

        ```
        cd ZCHATOPS\_HOME/config
        ```

    2.  Open the bnz-server.yaml file. Replace the Host\_name and other default values according to your needs.

        ```
        # Licensed material - Property of IBM
        # © Copyright IBM Corporation 2020.
        # This file controls all configurations of the chatbot server for Zowe Chat
        
        # Configure microservice
        microservice:
          # Specify the port number of your microservice server.
          # The default value is 4001.
          port: 4001
        
        # Configure logging
        log:
          # Specify the level of logs, the value can be error, warn, info, verbose, debug or silly.
          # The default value is info.
          level: info
        
          # Specify the maximum size of the file after which it will rotate. The value can be a number of bytes without any unit
          # or a number suffixed with 'k', 'm', or 'g' as units of kb, mb, or gb separately.
          # The default value is null, which means the file size is unlimited except operating system limit.
          maximumSize: null
        
          # Specify the maximum file number of logs to keep.
          # The default value is null, which means only one log file and no logs will be removed.
          maximumFiles: null
        
        # Specify the chat tool that is integrated with your Hubot, the value can be mattermost, slack or msteams.
        # The default value is mattermost.
        chatTool: mattermost
        
        # Specify the bot user name or account that is configured in your chat tool server.
        # The default value is bnz.
        botUserName: bnz
        
        # Configure the web hook of chatbot
        webhook:
          # Specify the protocol of chatbot web hook. The value can be https or http.
          # The default value is https.
          protocol: https
        
          # Specify the host name or IP address of chatbot web hook.
          hostName: Host\_name
        
          # Specify the port number of your chatbot web hook.
           # The default value is 5001.
          port: 5001
          
          # Specify the base path of chatbot web hook.
          # The default value is /bnz/api/v1.
          basePath: /bnz/api/v1
        
        # Specify the maximum number of resources that chatbot can retrieve for you
        limit: 10
        ```


