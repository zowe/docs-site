# Uninstalling Zowe Chat

To uninstall Zowe Chat, remove the image and all Zowe Chat containers and the zchatops-configuration volume from the host system.

**Warning:** All custom configuration will get lost if you uninstall Zowe Chat.

1.  Any Zowe Chat container must be stopped before the uninstallation. Run the command to stop the container:

    ```
    ./bnzContainer.sh stop
    ```

2.  Run the command to remove the containers and the Container image:

    ```
    ./bnzContainer.sh uninstall
    ```


The Zowe Chat instance is successfully removed from your server.

After you remove the Container image and containers, delete the bnzContainer.sh script and its belonging files.

**Parent topic:**[Installing Zowe Chat with Container image](chatops_install_docker_package.md)

