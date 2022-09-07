# Configuring the chat tool-Mattermost

This step is for Mattermost™ users only. You can configure your chat platform by editing the mottermost.yaml file.

Make sure that you have configured your chat tool when configuring Zowe Chat server. For details, see [Configuring Zowe Chat server](chatops_config_chatops_server.md).

1.  Go to the Zowe Chat configuration directory.

    -   For Container users:
        1.  Go to the directory where you extract the Zowe Chat Container archive.
        2.  Run the following command to open an interactive bash shell on the Zowe Chat Container that is running.

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

2.  Download SSL certificate of Mattermost server.

    1.  Log in to Mattermost with your administrator account.
    2.  Click Main Menu icon and then click **System Console**.

        ![System console](bnz_mattermost_system_console.png "System console")

    3.  Scroll down to **ENVIRONMENT** section and click **Web Server**. Find your certificate according to the path configured in **TLS Certificate File**.

        ![Integration menu item](environment_web_server.png "Environment menu item")

    4.  Copy the certificate to your Zowe Chat Server. You can place it in any directory that your Zowe Chat server can access.
        -   If your Mattermost server is installed using docker, you need to copy this certificate file from Mattermost server container to server which is running Zowe Chat .
        -   If your Mattermost server is installed with native installation package, make sure the certificate file is placed in any directory that your Zowe Chat server can access.
    5.  \[Zowe Chat Container users only\] Upload your Mattermost certificate to Zowe Chat Container.
        -   If your Zowe Chat is installed from docker, you need to upload this certificate to Zowe Chat container with your container management tool, and then configure the uploaded certificate file path into mattermost.yaml.

            i. Get your container ID.

            ```
            docker container ls --all -q --filter name="zchatops"
            ```

            ii. Upload your certificate to one existing path in the container, for example, /opt/ibm/zchatops/config/.

            ```
            docker cp certificate\_file\_path chatops\_container\_id:/opt/ibm/zchatops/config/mattermost.crt
            ```

3.  Edit the mattermost.yaml file by replacing Your host name, Your absolute certificate file path of your Mattermost server, Your bot access token, and Your host name with the actual values of your Mattermost server. You can also specify the protocol, port number, team URL, bot user name, and HTTP endpoint of your Mattermost server.

    ```
    # Licensed material - Property of IBM
    # © Copyright IBM Corporation 2022.
    # This file controls Mattermost related configurations for your chat tool server.
    
    # Specify the protocol of your Mattermost server. The value can be https or http.
    # The default value is https.
    protocol: https
    
    # Specify the host name or IP address of your Mattermost server.
    hostName: Your host name
    
    # Specify the port number of your Mattermost server.
    # The default value is 443.
    port: 443
    
    # Specify the base path of your Mattermost web service API server. Only '/api/v4' is supported by Mattermost at present.
    # The default value is /api/v4.
    basePath: /api/v4
    
    # Specify the absolute file path of the TLS certificate (PEM) of your Mattermost server if HTTPS protocol is specified.
    certificateFilePath: Your absolute certificate file path of your Mattermost server
    
    # Specify the team URL of your team created in your Mattermost server.
    # The default value is devops.
    teamUrl: devops
    
    # Specify the bot user name or account that is used in your chat tool server.
    # The default value is bnz.
    botUserName: bnz
    
    # Specify the access token to connect to your bot.
    # The token will be encrypted automatically by Zowe Chat server with <AES> prefix added.
    botAccessToken: Your bot access token
    
    # Configure the HTTP endpoint for Mattermost to communicate with your chatbot server when some user click actions occur.
    integrationEndpoint:
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

    -   **Your host name**

        The host name of the server where Mattermost server is installed.

    -   **Your absolute certificate file path of your Mattermost server**

        The absolute file path to the Mattermost server certificate that you have uploaded.

    -   **Your bot access token**

        The access token to connect to your bot.

    -   **Your host name**

        The host name of your HTTP endpoint.

    **Tip:** Team URL is what you got when you create your team. If you don't remember that, you can just select any channel in your team and copy link. Paste the link into a text editor, and then you will find the team URL.

    ![](bnz_mattermost_channel_link.png "Copy link")

    ![](bnz_mattermost_team_url.png "Team URL")


