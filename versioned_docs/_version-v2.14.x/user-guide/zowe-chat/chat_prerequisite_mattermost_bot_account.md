# Creating the bot account

Create a bot account in Mattermost.

1.  Log in to Mattermost with your administrator account.

2.  Click Main Menu icon and then click **System Console**.

    ![System console](../../images/zowe-chat/mattermost_system_console.png "System console")

3.  Scroll down to **INTEGRATIONS** section and click **Bot Accounts**.

    ![Integration menu item](../../images/zowe-chat/system_console_integrations.png "Integration menu item")

4.  Select **true** for **Enable Bot Account Creation**, and click **Save**.

    ![Bot accounts](../../images/zowe-chat/bot_accounts.png "Bot accounts")

5.  Click the Main Menu icon on the System Console, then click **Switch to your team**.

    ![System console main menu](../../images/zowe-chat/system_console_menu.png "System console main menu")

6.  Click the Main Menu icon from the main screen of Mattermost, and click **Integrations**.

    ![System console - Integrations](../../images/zowe-chat/mattermost_integrations.png "System console")

    The following dialog opens.

    ![Integrations dialog](../../images/zowe-chat/integrations_dialog.png "Integrations dialog")

7.  Add a new bot account.

    1.  Click **Bot Accounts** \> **Add Bot Account**.

    2.  Specify bnz for **Username** and System Admin for **Role**.

    3.  Click **Create Bot Account**. A successful notification dialog displays. On this dialog you can find a **Token**.

        ![Token](../../images/zowe-chat/token.png)

8.  Copy this **Token**.

    You will need this token for integration steps later. Save it well since you will not be able to retrieve it again. 
    
For more information about Bot accounts, see [Mattermost Integration Guide - Bot Accounts](https://docs.mattermost.com/developer/bot-accounts.html).

## Next steps

Now you can [invite the created bot to your Mattermost team](chat_prerequisite_mattermost_invite_team.md).



