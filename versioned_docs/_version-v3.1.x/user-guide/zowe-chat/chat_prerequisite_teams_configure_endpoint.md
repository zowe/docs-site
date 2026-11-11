# Configuring messaging endpoint for Microsoft Teams

You need to expose your Zowe Chat via a public HTTPS endpoint so that Microsoft™ Teams can push messages to it. The steps differ depending on the way you create your bot.

If the IP address of your Zowe Chat server is public, you can use the Chatbot messaging-endpoint URL `<messaging-endpoint.protocol>://<messaging-endpoint.hostName>:<messaging-endpoint.port><messaging-endpoint.basePath>` directly. Otherwise, you must configure your own network firewall or use some proxy servers to make sure that your Microsoft Teams can access the web hook of Zowe Chat server from Internet.

:::note

You can find the values for protocol, hostName, port, and basePath messaging-endpoint section of the configuration file `<ZOWE_CHAT_HOME>/config/chatServer.yaml`.

:::

<!--
Where,
- `<messaging-endpoint.protocol>`: the default value is https;
- `<messaging-endpoint.hostName>`: the host name where your Zowe Chat Chatbot server is installed;
- `<messaging-endpoint.port>`: the default value is 5001;
- `<messaging-endpoint.basePath>`: the default value is ....
-->