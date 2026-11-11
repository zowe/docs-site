# Zowe Chat (Technical Preview)

Zowe Chat Technical Preview is an early access build of the newest incubating technology in Zowe, Zowe Chat! Zowe Chat is a chatbot that aims to enable a ChatOps collaboration model by bringing simple access to z/OS resources and tools within the chat tools you use everyday in your organization. As this is an early access build, it is recommended to deploy the technical preview in development and test environments. 

The following topics will guide you in setting up and using Zowe Chat.

1. [System Requirements](systemrequirements-chat.md)
2. [Configuring Chat Tools](systemrequirements-chat.md#chat-tool-requirements)
3. [Installing Zowe Chat](chat_install_overview.md)
4. [Configuring Zowe Chat](chat_configure_overview.md)
5. [Starting, stopping, and monitoring](chat_start_stop.md)
6. [Uninstalling Zowe Chat](chat_uninstall.md)

## Deployment diagram

Zowe Chat works by connecting to your chat tool of a choice as a Bot account, and is configured against a single sysplex environment through a z/OSMF installation. Zowe Chat requires network connectivity to each of the configuration endpoints. For more details and information on installation and configuration, follow the topics above. 

<img src={require("../../images/zowe-chat/chat-HLA.png").default} alt="zowe chat hla system diagram v1" width="200"/>