# Uninstalling Zowe Chat with native installation package

You can uninstall Zowe Chat via native installation package by running a command.

1.  Change directory to where you unpack the package file Z-ChatOps-v112.tar.gz.

2.  Run the command `./ZChatOps.sh uninstall`.

    This command will uninstall Zowe Chat from the Zowe Chat home directory. This command will also remove the runtime file /etc/profile.d/zchatops.sh.

3.  Verify your uninstallation by checking that Zowe Chat is removed from the Zowe Chat home directory. The directory should be empty.

    ```
    ls <your zchatops home directory>
    ```


**Parent topic:**[Installing Zowe Chat with native installation package](chatops_install_native.md)

