# Installing Zowe Chat with native installation package

You can install Zowe Chat via native installation package by running several commands.

1.  Change directory to where you unpack the package file Z-ChatOps-v112.tar.gz.

2.  Run the command `./zchatops.sh install ZCHATOPS\_HOME`.

    This command will install Zowe Chat in the Zowe Chat home directory. If the Zowe Chat home directory does not exist, the script will create it automatically. This command will also create a file /etc/profile.d/zchatops.sh to export the environment variable ZCHATOPS\_HOME.

    **Note:** The ZCHATOPS\_HOME should be full path of directory

3.  Restart your terminal or access session to make the environment variable ZCHATOPS\_HOME effective.

4.  Verify your installation with commands.

    Run the command `bnzsvr`. If you see the following command help, your installation is completed.

    ```
    bnzsvr 
    Usage: /opt/ibm/zchatops/bin/bnzsvr <start | stop | restart | status>
    Example: /opt/ibm/zchatops/bin/bnzsvr start      - Start Zowe Chat server
             /opt/ibm/zchatops/bin/bnzsvr stop       - Stop Zowe Chat server
             /opt/ibm/zchatops/bin/bnzsvr restart    - Restart Zowe Chat server
             /opt/ibm/zchatops/bin/bnzsvr status     - Show the status of Zowe Chat server
    
    ```

    **Note:** Zowe Chat creates five user accounts by default: **admin** with the role as admin, **izoa**, **zsa**, and **omegamon** with the role as integrator, and **bnzsvr** with the role as user. You need these user accounts to post incidents and integrate Zowe Chat with other products. You can manage these user accounts through the swagger UI where the default passwords for all users are **bnz4you!**. For details, see [Managing user account password of Zowe Chat Microservice](chatops_first_steps_managing_users.md).


Your Zowe Chat is successfully installed.

You need to configure Zowe Chat before you can use it. For details, see [Configuring Zowe Chat](chatops_config.md).

-   **[Starting and stopping Zowe Chat](chatops_install_start_stop_service.md)**  
Start or stop Zowe Chat according to your requirement.
-   **[Uninstalling Zowe Chat with native installation package](chatops_install_uninstall_native.md)**  
You can uninstall Zowe Chat via native installation package by running a command.

**Parent topic:**[Installing and uninstalling Zowe Chat](chatops_install.md)

