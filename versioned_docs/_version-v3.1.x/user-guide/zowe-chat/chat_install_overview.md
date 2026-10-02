# Installing Zowe Chat

You can install Zowe Chat from a local package.

## Prerequisites

Before installing Zowe Chat, ensure that your environment meets the [system requirements](systemrequirements-chat.md).

## Installing

1. Download the Zowe Chat package from [Zowe.org](https://www.zowe.org/download.html). Navigate to **Technical Preview** > **Zowe Chat** section, and select the button to download the Zowe Chat build. You'll get a tar.gz file.

1. Log on to your Linux server. 

1. Navigate to the target directory that you want to transfer the Zowe Chat package into or create a new directory. 

1. When you are in the directory you want to transfer the Zowe Chat package into, upload it to the directory.
   
1. Run the command to expand the downloaded package to the target directory.

    ```
    tar zxvf <zowe-chat-package-name>.tar.gz
    ```   

    This will expand to a file structure similar to the following one.

    ```
    /zoweChat   
    /plugins   
    ```

1. Run the following commands to update your environment variables. 
   
    - Update the Zowe Chat home directory. 

      ```
      export ZOWE_CHAT_HOME=<your-chat-package-directory>/zoweChat
      ```
      where, *your-chat-package-directory* is the diretory of the Zowe Chat installation package. 
    
    - Update the Zowe Chat plug-in home directory. 

      ```
      export ZOWE_CHAT_PLUGIN_HOME=<your-chat-package-directory>/plugins
      ```
    
    - Update your `PATH` environment variable with your Zowe Chat home directory path.
    
      ```
      export PATH=$PATH:$ZOWE_CHAT_HOME/bin
      ```

1. Update the plug-in configuration file `$ZOWE_CHAT_PLUGIN_HOME/plugin.yaml` if necessary. 

1. Run the following commands to install local dependencies. 

   ```
    cd $ZOWE_CHAT_HOME/node_modules/i18next
    npm link
    cd  $ZOWE_CHAT_PLUGIN_HOME/@zowe/clicmd
    npm link $ZOWE_CHAT_HOME
    npm link i18next
    cd  $ZOWE_CHAT_PLUGIN_HOME/@zowe/zos
    npm link $ZOWE_CHAT_HOME
    npm link i18next
   ```
1. Update the following configuration files based on your need. 

   - Zowe Chat: `$ZOWE_CHAT_HOME/config/chatServer.yaml`
   - z/OSMF server: `$ZOWE_CHAT_HOME/config/zosmfServer.yaml`
   - Chat tool: `$ZOWE_CHAT_HOME/config/chatTools/<mattermost | msteams | slack>.yaml`

<!--TODO: How to verify the installation?-->

Now you can [start the Zowe Chat server](chat_start_stop.md#starting-zowe-chat). 

:::tip

If you encounter any issue during the installation, you can check the Zowe Chat server log in the folder `$ZOWE_CHAT_HOME/log/` for troubleshooting.

:::

