# Configuring Zowe Chat server

You can configure Zowe Chat server by editing the bnz-server.yaml file.

Make sure that you have configured your certificate. For details, see [Configuring the certificate](chatops_config_certificate.md).

1.  Go to the Zowe Chat configuration directory.

    -   For Container users:
        1.  Go to the directory where you extract the Zowe Chat Container archive.
        2.  Run the following command to open an interactive bash shell on the Zowe Chat container that is running.

            ```
            ./bnzContainer.sh shell
            ```

        3.  Go to the configuration directory.

            ```
            cd config
            ```

            **Tip:** If you are familiar with docker/podman commands, you can use commands to open the interactive bash shell. You can also edit the configuration files directly in the mounted path of the zchatops-configuration-112 volume.

    -   For native installation users:

        ```
        cd $ZCHATOPS\_HOME/config
        ```

2.  Edit the bnz-server.yaml file. Replace the default values according to your needs, for example, your chat tool.

    ```
    # Licensed material - Property of IBM
    # © Copyright IBM Corporation 2022.
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
    
    # Specify the chat tool, the value can be mattermost, slack or msteams.
    # The default value is mattermost.
    chatTool: mattermost
    
    # Specify the maximum number of resources that chatbot can retrieve for you
    limit: 10
    ```


For Microsoft™ Teams users only: you need to complete the messaging endpoint configuration before you can use Zowe Chat. For details, see [Configuring messaging endpoint for Microsoft Teams](chatops_prerequisite_endpoint_teams.md).

