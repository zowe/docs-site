# Configuring allow list

You can configure bot allow list by editing the bnzbot-allow-list.json file.

1.  Go to the Zowe Chat configuration directory.

    -   For Container users:

        i. Go to the directory where you extract the Zowe Chat Container archive.

        ii. Run the following command to open an interactive shell on the Zowe Chat container that is running.

        ```
        ./bnzContainer.sh shell
        ```

        iii. Go to the configuration directory.

        ```
        cd config
        ```

        **Tip:** If you are familiar with docker/podman commands, you can use commands to open the interactive bash shell. You can also edit the configuration files directly in the mounted path of the zchatops-configuration-112 volume.

    -   For native installation users:

        ```
        cd $ZCHATOPS\_HOME/config
        ```

2.  Edit the allow list configuration file bnzbot-allow-list.json by modifying the parameter values.

    ```
    
    {
       "users": ["*"],
       "channels": [{
             "name": "*",
             "members": ["*"]
          }
       ]
    }
    
    ```

    -   **users**

        The user name in your chat platform that can talk with the bot in private chat. The value of users is used when chatting with the bot in private chat only. The default value means that all users can access the bot user.

    -   **channels**

        The value of channels is used when chatting in the channels only. The default value means that all users can access the bot user in all channels.

        name: The channel name of your chat platform.

        members: The user name in your chat platform that can talk with the bot in the channel.

    **Tip:** You can refer to the following examples to control the permission.

    -   Scenario 1

        ```
        {
           "users": ["admin", "jane"],
           "channels": [{
                 "name": "System_A",
                 "members": ["*"]
              },{
                 "name": " System_B",
                 "members": ["zach", "admin"]
              }
           ]
        }
        
        ```

        In this example:

        -   User admin and user Jane can talk with the bot in private chat.
        -   All users in channel System\_A can talk with the bot user.
        -   User zach and user admin in channel System\_B can talk with the bot user.
    -   Scenario 2

        ```
        {
           "users": ["admin", "jane"],
           "channels": [{
                 "name": "*",
                 "members": ["jane, zach"]
              }
        }
        
        ```

        In this example:

        -   User zach and user jane can talk with the bot user in all channels.
3.  Stop and start your Zowe Chat for the configuration to take effect. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


**Parent topic:**[Configuring Zowe Chat](chatops_config.md)

