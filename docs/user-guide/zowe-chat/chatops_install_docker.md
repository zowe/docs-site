# Installing Zowe Chat

Load and run the Container image to install Zowe Chat.

Before you install Zowe Chat by using the Container image, you must ensure that you have the container management tool Docker or Podman installed on a Linux® on System x or System z®. Refer to the following information to install Docker on Linux on System x or Linux on System z:

-   [Installing Docker on Linux on System z](https://www.ibm.com/developerworks/linux/linux390/docker.html)
-   [Installing Docker on Linux on System x](https://docs.docker.com/get-docker/)

Refer to the following information to install Podman:

-   [Installing Podman on Linux](https://podman.io/getting-started/installation)

Also make sure that you have completed the following tasks before you install Zowe Chat:

-   For Slack users:
    -   [Creating and installing Slack App](chatops_prerequisite_slack_app.md)
    -   [Adding your bot user to your Slack channel](chatops_prerequisite_invite_app_to_channel.md)
-   For Mattermost users:
    -   [Installing Mattermost chat platform server](chatops_prerequisite_mattermost_server.md)
    -   [Creating administrator account and Mattermost team](chatops_prerequisite_admin_account.md)
    -   [Creating the bot account](chatops_prerequisite_bot_account.md)
    -   [Inviting the created bot to your Mattermost channel](chatops_prerequisite_invite_mattermost.md)
-   For MS Teams users:
    -   [Configuring Microsoft Teams chat platform](chatops_prerequisite_teams_users.md)

1.  Download Zowe Chat Container archive according to the architecture of the target server where Zowe Chat will be installed, for example, Z-ChatOps-v112-Container-x86\_64.tar.gz for Zowe Chat running on Linux on System x.

2.  Run the command to unpack the downloaded Zowe Chat Container archive to a target directory.

    ```
    tar -xvf Z\_ChatOps\_Container\_archive.tar.gz --directory target\_dir
    ```

    **Note:** The target directory must exist before you run the tar command so that the files can be extracted into it.

    The package contains the following files:

    -   Z-ChatOps-Image-v112.tar: the Container image that includes Zowe Chat and most of the prerequisite software.
    -   The Container Command Line Utility:

        -   bnzContainer.sh: the key shell script with other necessary files that helps you to manage the Zowe Chat Container image and perform common tasks like loading the image or starting and stopping the container. Run command `bnzContainer.sh help` for more details.

            **Note:** The script must be run from a user who is allowed to use the container management command.

        -   bnzContainer.conf: a file that allows you to overwrite the default settings used by bnzContainer.sh. It must be in the same directory where bnzContainer.sh is located. If it doesn’t exist, bnzContainer.sh will use its default settings.
        -   util: a folder that contains utility files for the bnzContainer.sh script.
    -   license: a folder that contains the Zowe Chat licenses.
    -   tools: a folder that contains the Zowe Chat self-assigned certificate tool.
        -   generateCert.sh: a script that helps create one self-signed certificate.
        -   rootCA: a folder that contains all the root CA files for the generateCert.sh script.
    -   Readme.txt: the readme file for Zowe Chat 1.1.2.
3.  Edit file bnzContainer.conf if you want to change the default settings of bnzContainer.sh. By default, Zowe Chat uses Docker to manage the container, and it will also create one volume zchatops-configuration-112 to persist the configuration data. You can remove the CONTAINER\_VOLUME setting if you don't want to use it.

4.  Load the Zowe Chat Container image by using the Container Command Line Utility. Run the following command:

    ```
    ./bnzContainer.sh load
    ```

5.  Verify if the Container image is loaded. Run the command `bnzContainer.sh status`.

    Sample output as follows:

    ```
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    +         Zowe Chat Container Command Line Utility         +
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    Executing command status ...
    
    Image zchatops:112 ----------------------------------- Loaded.
    Container zchatops_112 ------------------------------- Not available.
    Status of Container zchatops_112 --------------------- Not started. 
    
    ```

    If the load is successful, you can delete the Z-ChatOps-Image-v112.tar because you don't need it anymore.

6.  Start the container by using the Container Command Line Utility. Run the following command:

    ```
    ./bnzContainer.sh start
    ```

    **Note:** If you run this command for the first time, a new Zowe Chat container will be automatically created from the image, or else, the existing Zowe Chat container will be started.

7.  Verify if the container from the Zowe Chat image is started. Run command `bnzContainer.sh status`.

    Sample output as follows:

    ```
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    +         Zowe Chat Container Command Line Utility         +
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    Executing command status ...
    
    Image zchatops:112 ----------------------------------- Loaded.
    Container zchatops_112 ------------------------------- Available.
    Status of Container zchatops_112 --------------------- Started. 
    
    ```

    **Note:** Zowe Chat creates five user accounts by default: **admin** with the role as admin, **izoa**, **zsa**, and **omegamon** with the role as integrator, and **bnzsvr** with the role as user. You need these user accounts to post incidents and integrate Zowe Chat with other products. You can manage these user accounts through the swagger UI where the default passwords for all users are **bnz4you!**. For details, see [Managing user account password of Zowe Chat Microservice](chatops_first_steps_managing_users.md).


Your Zowe Chat is successfully installed.

You need to configure your Zowe Chat. For details, see [Configuring Zowe Chat](chatops_config.md).

**Parent topic:**[Installing Zowe Chat with Container image](chatops_install_docker_package.md)

