# Configuring the Slack App

There are two ways to connect to Slack, over HTTP or using Socket mode. We strongly recommend that you use Socket mode, as you can receive events via a private WebSocket, instead of a direct HTTP subscription to events. If you want to receive events directly over HTTP, you must conﬁgure your own network ﬁrewall or use some proxy servers to make sure that your Slack application of your Slack workspace in public cloud can access the messaging endpoint of Zowe Chat server from internet. For example, you can leverage [IBM Secure Gateway](https://cloud.ibm.com/docs/SecureGateway) to create an externally accessible URL for your locally deployed messaging endpoint on your machine. For more information, see [https://api.slack.com/apis/connections](https://api.slack.com/apis/connections).

-   **[Connecting to Slack using Socket mode](connecting_to_slack_using_a_socket_mode.md)**  
You can use Socket mode to connect your app to Slack.
-   **[Connecting to Slack using public HTTP endpoint](chatops_config_slack_web_hook.md)**  
Please complete this task after your Zowe Chat server is configured and started.

**Parent topic:**[Creating and installing Slack App](chatops_prerequisite_slack_app.md)

