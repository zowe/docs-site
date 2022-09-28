# Installing Mattermost chat platform server

This step is required for Mattermost users only. You can use commands to install Mattermost Container on your server.

Mattermost is a chat solution whose free trial version is available as a Container image. You can use it for your POC or testing environment. If you want to use Mattermost in your production environment, you must follow the [Mattermost installation guide](https://docs.mattermost.com/guides/administrator.html#installing-mattermost) to install the enterprise version. The following steps show you how to install Mattermost Container in *Preview Mode* to explore its function.

1.  To install Mattermost Container on a Linux® server, perform the following steps:
2.  Make sure that Docker/Podman is set up on the Linux server, and you can access [Docker Hub -mattermost/mattermost-preview](https://hub.docker.com/r/mattermost/mattermost-preview) on the Linux server.

    **Note:** The following command will use docker as example. You can simply replace docker with podman if you are using podman.

3.  Run the following command to pull the mattermost-preview image:

    ```
    docker pull mattermost/mattermost-preview:6.4.1
    ```

4.  Run the following command to install Mattermost in *Preview Mode*.

    ```
    docker run --name mattermost -d --publish 8065:8065 --publish 443:443 --add-host dockerhost:127.0.0.1 mattermost/mattermost-preview:6.4.1
    ```

    For more information about installing Mattermost in *Preview Mode* on local machines by using Docker, see [Local Machine Setup using Docker](https://docs.mattermost.com/install/docker-local-machine.html).

5.  Run the following command to verify that the Mattermost container is started.

    ```
    docker ps
    ```

    When you see the name is **mattermost** in the response, your Mattermost container is started.


Your Mattermost is installed successfully.

## Next steps

You must configure your Mattermost before using Zowe Chat. You need to create an administrator account, a team, and a bot account in Mattermost.

-   **[Creating administrator account and Mattermost team]()**  
After you start the Mattermost container, you can create an administrator account and a team in Mattermost, and invite your colleagues to join the team.
-   **[Creating the bot account]()**  
Create a bot account in Mattermost.
-   **[Inviting the created bot to your Mattermost team]()**  
Invite your bot user to your team so that you can invite it to your Mattermost channel, and talk with it in the channel.
-   **[Inviting the created bot to your Mattermost channel]()**  
You can create your own private channel in Mattermost, invite your bot user to your channel by adding new members, and talk with it in the channel.
-   **[Enabling insecure outgoing connections for mouse navigation]()**
