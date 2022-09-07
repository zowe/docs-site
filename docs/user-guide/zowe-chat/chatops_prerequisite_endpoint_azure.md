# Configuring messaging endpoint for the Microsoft Azure bot

If you create your bot with Microsoft™ Azure, you need to specify the messaging endpoint in Microsoft Azure portal to complete the configuration.

1.  Launch the Microsoft Azure portal at [portal.azure.com](http://portal.azure.com).

2.  Click **All resources** and select the bot that you created.

3.  Select **Configuration** in **Settings**.

4.  Specify the **Messaging endpoint** with the Zowe Chat web hook URL if it is publicly accessible, for example, https://zchatops.cn.ibm.com:5001/bnz/api/v1. Otherwise, you must fill in with your public proxy URL that transmits network payload to Zowe Chat web hook URL.

5.  Verify that the **Enable Streaming Endpoint** box is enabled.

6.  Click **Apply** to make the settings effective.


Your messaging endpoint for Microsoft Azure bot is successfully configured.

**Parent topic:**[Configuring messaging endpoint for Microsoft Teams](chatops_prerequisite_endpoint_teams.md)

