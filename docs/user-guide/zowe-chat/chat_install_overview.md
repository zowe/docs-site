# Installing Zowe Chat 

<!--Topics listed below are example, feel free to modify them-->


## Prerequisites

Before installing Zowe Chat, ... 

### Chat plarform requirements

- [Slack](chat_prerequisite_slack_install.md)
- [Microsoft Teams]
- [Mattermost](chat_prerequisite_install_mattermost.md)

## Installing

1. Download `Zowe Chat` according to the architecture of the target server where Zowe Chat will be installed.

1. Run the command to unpack the downloaded package to a target directory.

    ```
    xxxxxx
    ```
1. Edit file `xxxx.conf` if you want to change the default settings of bnzDocker.sh. 

1. Load the Zowe Chat image into your Docker environment by using the Docker Command Line Utility. Run the following command:

    ```
    xxxx.sh load
    ```
1. Verify if the Docker image is loaded. Run the command `xxxx.sh status`.

    Sample output as follows: 
    ```
    Executing command status ...

    Docker image zchatops:110 ----------------------------------- Loaded.
    Docker container zchatops_110 ------------------------------- Not available.
    Status of Docker container zchatops_110 --------------------- Not started.
    ```
    If the load is successful, you can delete the Z-ChatOps-Image-v110.tar because you don't need it anymore.

1. Start the Docker container by using the Docker Command Line Utility. 

    Run the following command:
    ```
    ./bnzDocker.sh start
    ```

1. Verify if the Docker container from the Zowe Chat image is started. Run command `xxxx.sh` status.
    Sample output as follows: 




