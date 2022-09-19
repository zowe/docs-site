# Configuring messaging endpoint for the Microsoft Bot Framework bot

If you create your bot with Microsoft™ Bot Framework, you need to specify the bot endpoint address in Developer Portal to configure the messaging endpoint.

1.  Launch and log in your Microsoft Teams client.

2.  Click the **Developer Portal** icon ![Developer Portal](bnz_teams_developer_icon.png) and select **Tools**.

    ![Developer Portal](bnz_teams_developer_portal_apps.png "Developer Portal")

3.  Click the **Bot management**. Choose the bot that you created and start editing your bot app.

    ![Bot management](bnz_teams_bot_management.png "Bot management")

    ![](bnz_teams_yourbot.png "")

4.  Click **Configure** to configure the messaging endpoint.

    ![](bnz_teams_endpoint.png "")

5.  Specify the **Bot endpoint address** input box under **Endpoint address** with the Zowe Chat web hook URL if it is publicly accessible, for example, https://zchatops.cn.ibm.com:5001/bnz/api/v1. Otherwise, you must fill in with your public proxy URL that transmits network payload to Zowe Chat web hook URL.

    ![Bot endpoint address](bnz_teams_endpoint_address.png "Bot endpoint address")


Your messaging endpoint for Microsoft Bot Framework bot is successfully configured.

**Parent topic:**[Configuring messaging endpoint for Microsoft Teams](chatops_prerequisite_endpoint_teams.md)

