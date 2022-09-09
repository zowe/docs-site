# Managing Zowe Chat container

This section describes the commands available for managing the container.

## Commands provided by the Container Command Line Utility

Run the following commands to manage Zowe Chat container:

-   **bnzContainer.sh load**

    Loads the IBM® Zowe Chat Container image.

    You shall run this command only once. If the image is successfully loaded, you can delete the Z-ChatOps-Image-v112.tar file.

-   **bnzContainer.sh start**

    Starts Zowe Chat container if it is stopped.

    If no Zowe Chat container exists, it creates a new container from the loaded Zowe Chat Container image.


-   **bnzContainer.sh stop**

    Stops the running Zowe Chat container.

-   **bnzContainer.sh restart**

    Restarts the running Zowe Chat container.

    It stops the container and starts it again. For example, you can run the command if you must restart Zowe Chat after a configuration change.

-   **bnzContainer.sh status**

    Shows the status of the Zowe Chat container.


-   **bnzContainer.sh shell**

    Opens a Bash shell to the running Zowe Chat container. The default working directory is ZCHATOPS\_HOME, which in this case, is /opt/ibm/zchatops.

    It allows you to access the internal of the container, for example, if the configuration files must be edited manually.

    To exit the shell, issue command **exit** in the shell. It only exits the shell connection into the container, the container and Zowe Chat continue to run.

-   **bnzContainer.sh collect**

    Collects and bundles all relevant log files from the running Zowe Chat container and copies them to the host system's /tmp folder.

    For example, you can run this command if you have a problem and the IBM® Support team requests the log information.

-   **bnzContainer.sh import**

    Import the custom configurations and settings of a Zowe Chat container from a file on the host filesystem.


-   **bnzContainer.sh export**

    Export the custom configurations and settings of a Zowe Chat container to a file on the host filesystem.


-   **bnzContainer.sh reconfigure**

    Some configuration can only be specified during the creation of Zowe Chat container, for example, the network configuration. If you must change such a configuration option, issue this command to make the configuration changes effective.

    Internally, the current container is committed into a snapshot of the Container image, from which a new container is created. By this means, the new container has all the configuration and customization of the old container, but runs with the new configuration. When you issue command **bnzContainer.sh reconfigure**, a new snapshot is created. Keep the snapshot image because an image cannot be removed if there are containers derived from it. The image doesn't take up too much disk space because only the changes, compared to the official image, are stored in it.


-   **bnzContainer.sh migrate**

    Migrates all of your custom configuration from the old Zowe Chat container into the new container of a new Zowe Chat release. See [Upgrading Zowe Chat with Container](upgrading_ibm_z_chatops_container.md).


-   **bnzContainer.sh uninstall**

    Deletes the current Zowe Chat container and the Container image.

    **Warning:** All custom configuration will get lost! Run the command if you must remove Zowe Chat.


**Parent topic:**[Installing Zowe Chat with Container image](chatops_install_docker_package.md)

