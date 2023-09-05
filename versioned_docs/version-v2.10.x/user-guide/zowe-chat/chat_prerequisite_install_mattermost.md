# Installing Mattermost chat platform server

You can use commands to install Mattermost Container on your server.

Mattermost is a chat solution whose free trial version is available as a Container image. You can use it for your PoC or testing environment. If you want to use Mattermost in your production environment, you must follow the [Mattermost installation guide](https://docs.mattermost.com/guides/administrator.html#installing-mattermost) to install the enterprise version. The following steps show you how to install Mattermost Container in *Preview Mode* to explore its function.

## Installing

To install Mattermost Container on a Linux® server, perform the following steps:

1.  Make sure that Docker/Podman is set up on the Linux server, and you can access [Docker Hub -mattermost/mattermost-preview](https://hub.docker.com/r/mattermost/mattermost-preview) on the Linux server.

    :::note
    
    The following command will use Docker as example. You can simply replace Docker with Podman if you are using Podman.
    
    :::

2.  Run the following command to pull the mattermost-preview image:

    ```
    docker pull mattermost/mattermost-preview:6.4.1
    ```

3.  Run the following command to install Mattermost in *Preview Mode*.

    ```
    docker run --name mattermost -d --publish 8065:8065 --publish 443:443 --add-host dockerhost:127.0.0.1 mattermost/mattermost-preview:6.4.1
    ```

    For more information about installing Mattermost in *Preview Mode* on local machines by using Docker, see [Local Machine Setup using Docker](https://docs.mattermost.com/install/docker-local-machine.html).

4.  Run the following command to verify that the Mattermost container is started.

    ```
    docker ps
    ```

    When you see the name is **mattermost** in the response, your Mattermost container is started.


Your Mattermost is installed successfully.

## Next steps

You must configure your Mattermost before using Zowe Chat. You need to create an administrator account, a team, and a bot account in Mattermost. See [Creating administrator account and Mattermost team](chat_prerequisite_mattermost_admin_account.md). 