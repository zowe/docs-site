# Configuring the chat tool-Microsoft Teams

This step is for Microsoft™ Teams users only. You can configure your chat platform by editing the msteams.yaml file.

Make sure that you have configured your chat tool when configuring Zowe Chat server. For details, see [Configuring Zowe Chat server](chatops_config_chatops_server.md).

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

2.  Edit the msteams.yaml file. Replace Your\_bot\_ID, Your\_bot\_password and Your\_host\_name with your values.

    ```
    
    # Licensed material - Property of IBM
    # © Copyright IBM Corporation 2022.
    # This file controls Microsoft Teams related configurations for your chat tool server.
    
    # Specify the bot user name or account that is used in your chat tool server.
    # The default value is bnz.
    botUserName: bnz
    
    # Specify the ID of your Microsoft Teams bot.
    botId: Your bot ID
    
    # Specify the password of your Microsoft Teams bot.
    # The password will be encrypted automatically by Zowe Chat server with <AES> prefix added.
    botPassword: Your bot password
    
    # Configure the messaging endpoint for your Microsoft Teams bot.
    messagingEndpoint:
      # Specify the protocol of your messaging endpoint. The value only can be https.
      # The default value is https.
      protocol: https
    
      # Specify the host name or IP address of your messaging endpoint.
      hostName: Your host name
    
      # Specify the port number of your messaging endpoint.
      # The default value is 5001.
      port: 5001
      
      # Specify the base path of your messaging endpoint.
      # The default value is /bnz/api/v1.
      basePath: /bnz/api/v1
    ```

    **Tip:** You should have saved your bot ID and bot password when you created your bot. For details, see step 3 and 4 in [Creating a bot with Microsoft Bot Framework](chatops_prerequisite_framework_bot.md) or step 2-d in [Creating a bot with Microsoft Azure](chatops_prerequisite_azure_bot.md).


**Parent topic:**[Configuring Zowe Chat](chatops_config.md)

