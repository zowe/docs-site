# Installing the Zowe Chat Chatbot Component

Install the Zowe Chat Hubot Plugin on the server where your Hubot is installed.

1.  Put the package file Bnz-HubotPlugin-v110-beta-drop2.tar.gz in any directory on your server `BNZSRV`, for example, the home directory.

2.  Extract the file Bnz-HubotPlugin-v110-beta-drop2.tar.gz.

    ```
    % tar -zxvf ./Bnz-HubotPlugin-v110-beta-drop2.tar.gz
    ```

    The following directory structure is created.

    ```
    Bnz-HubotPlugin-v110-beta-drop2.tar.gz
    |--- /bin
    |--- /config
    |--- /install
    |--- /hubot-bnz
    |--- external-scripts.json
    
    ```

3.  Change to the directory install and run the script `installPlugin.sh`.

    ```
    % cd install
    % ./installPlugin.sh BNZSRV_INSTROOT/hubot/
    
    ```

    This script copies the Hubot Plugin classes to the BNZSRV\_INSTROOT/hubot/node\_modules subdirectory, deploy the configuration files, and adapts the contents of the file external\_scripts.json to load the new plug-in.


Zowe ChatHubot Plugin is installed successfully.

You can connect the installed Zowe Chat Hubot Plugin to microservice now. For more information, see [Connecting Zowe Chat Chatbot to Zowe Chat Microservice](chatops_config_connect_hubot_to_microservice.md).

