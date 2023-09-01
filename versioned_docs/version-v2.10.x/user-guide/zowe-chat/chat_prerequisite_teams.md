# Configuring Microsoft Teams chat platform

If you use Microsoft Teams as your chat platform, you need to create a bot app and a bot for Microsoft Teams and configure the messaging endpoint. Take the following steps to configure your Microsoft Teams for Zowe Chat.

1. [Creating Microsoft Teams bot app](chat_prerequisite_teams_create_app_developer_portal.md)
    
    Microsoft Teams provides Microsoft Developer Portal to create bot app in the current version. App Studio has been deprecated according to the announcement made by Microsoft Teams.

2. [Creating a bot for Microsoft Teams bot app](chat_prerequisite_teams_create_bot.md)

    Microsoft provides two ways to create a bot, either using Microsoft Bot Framework or Microsoft Azure. You can choose either one of them according to your own environment and requirements.

3. [Configuring messaging endpoint for Microsoft Teams](chat_prerequisite_teams_configure_endpoint.md)
    
    You need to expose your Zowe Chat via a public HTTPS endpoint so that Microsoft Teams can push messages to it. The steps differ depending on the way you create your bot.
