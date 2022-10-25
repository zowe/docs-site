# Configuring the Slack App

There are two ways to connect to Slack, over HTTP or using Socket mode. We strongly recommend that you use Socket mode, as you can receive events via a private WebSocket, instead of a direct HTTP subscription to events. If you want to receive events directly over HTTP, you must conﬁgure your own network ﬁrewall or use some proxy servers to make sure that your Slack application of your Slack workspace in public cloud can access the messaging endpoint of Zowe Chat server from internet. For more information, see https://api.slack.com/apis/connections.


- [Connecting to Slack using Socket mode](./chat_prerequisite_slack_socket_mode)

   You can use Socket mode to connect your app to Slack.

- [Connecting to Slack using public HTTP endpoint](./chat_prerequisite_slack_http_endpoint)

   Complete this task after your Zowe Chat server is configured and started.



