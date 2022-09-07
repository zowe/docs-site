# Starting and stopping Zowe Chat

Start or stop Zowe Chat according to your requirement.

-   To start Zowe Chat, perform the following steps.

    1.  On your server where you install Zowe Chat, run the following command.

        ```
        bnzsvr start
        ```

    2.  Verify the status of Zowe Chat.

        -   From any command terminal, run command `bnzsvr status` to verify that the bnzsvr service exists.
        -   From any web browser window, access the URL `https://ZChatOps\_Server\_hostname:Microservice\_port\_number` to check whether the swagger UI can be shown.
        -   Check whether you are able to talk to the bot user of Zowe Chat. For details, see [Using Zowe Chat](chatops_first_steps.md).
-   To stop Zowe Chat, perform the following steps.

    1.  On your server where you install Zowe Chat, run the following command.

        ```
        bnzsvr stop
        ```

    2.  Verify the status of Zowe Chat

        -   From any command terminal, run command `bnzsvr status` to verify that the bnzsvr service is not running.
        -   From any web browser window, access the URL `https://ZChatOps\_Server\_hostname:Microservice\_port\_number`. It should be unavailable now.
        -   You cannot talk to the bot user of Zowe Chat now.
-   To restart Zowe Chat, perform the following steps.

    1.  On your server where you install Zowe Chat, run the following command.

        ```
        bnzsvr restart
        ```

    2.  Verify the status of Zowe Chat.

        -   From any command terminal, run command `bnzsvr status` to verify that the bnzsvr service exists.
        -   From any web browser window, access the URL `https://ZChatOps\_Server\_hostname:Microservice\_port\_number` to check whether the swagger UI can be shown.
        -   Check whether you are able to talk to the bot user of Zowe Chat. For details, see [Using Zowe Chat](chatops_first_steps.md).

