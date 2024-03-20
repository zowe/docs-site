# Uninstalling Zowe Chat

You can uninstall Zowe Chat native installation package by running a command.

1. [Stop the Zowe Chat server](chat_start_stop.md#stopping-zowe-chat). 
2. Remove the installed Zowe Chat core part by running the following command: 
   
   ```
   rm -rf $ZOWE_CHAT_HOME
   ```
3. Remove all installed Zowe Chat plug-ins by running the following command: 

   ```
   rm -rf $ZOWE_CHAT_PLUGIN_HOME
   ```

4. Unset and update the following environment variables. 

   - `ZOWE_CHAT_HOME`
   - `ZOWE_CHAT_PLUGIN_HOME`
   - `PATH=$PATH:$ZOWE_CHAT_HOME/bin`

5. Verify the uninstallation by launching your chat tool client and verifying that you cannot chat with the bot. 