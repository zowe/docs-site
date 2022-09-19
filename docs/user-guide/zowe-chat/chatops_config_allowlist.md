# Configuring the allow list to control the access to chatbot

Anyone can talk to the bot user by default. You can configure the allow list for Zowe Chat to control who can talk to the bot user in which channel.

1.  **Attention:** If you installed Zowe Chat with Docker image, you must go to the directory where you extract the Zowe Chat Docker archive before you perform the following steps. Run command `./bnzDocker.sh shell` to open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

2.  Go to the Zowe Chat home directory.

    ```
    cd $ZCHATOPS\_HOME
    ```

3.  Go to ZCHATOPS\_HOME/chatbot folder of your Zowe Chat Chatbot server.

4.  Open the allow list configuration file config/bnzbot-allow-list.json to change the values. You can see the default file content.

    ```
    [
        {
            "user_name": "*",
            "room_name": "*"
        }
    ]
    
    ```

    The room\_name specifies the channel name of your chat platform. The default settings mean that all users from all channels can access the bot user when it is in the channel.

    You can refer to the following example to control the permission.

    ```
    [
        {
            "user_name": "*",
            "room_name": "System_A"
        },
        {
            "user_name": "jane",
            "room_name": "System_B"
        },
        {
            "user_name": "zach",
            "room_name": "*"
        }
    ]
    
    ```

    In this example,

    -   all users in channel `System_A` can talk to the bot user;
    -   user `jane` in channel `System_B` can talk to the bot user;
    -   user `zach` can talk to the bot user from any channel whether it is public or private, and can talk to the bot user via direct message.
5.  Stop and start your Chatbot server to make your changes effective. See [Starting and stopping Zowe Chat Chatbot](chatops_install_start_stop_Hubot.md) for specific steps.


