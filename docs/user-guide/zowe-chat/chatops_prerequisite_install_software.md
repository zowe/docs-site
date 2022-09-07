# Preparing prerequisite software

The prerequisite software preparation for Zowe Chat differs depending on the chat platform and installation method you use.

If you plan to install Zowe Chat via native installation, you must install Node.js first no matter what chat platform you use.

If you plan to install Zowe Chat via Container image, there is no need to install Node.js.

**Remember:** No matter which chat platform or installation method you use, you must configure your chat platform before you can use Zowe Chat.

**Note:** The Common Bot Framework library is an NPM library released along with Zowe Chat installation image and no extra installation is required. For more information, see [Common Bot Framework](chatops_reference_common_bot_framework.md).

-   **[Installing Node.js](chatops_prerequisite_node.md)**  
This step is required for native installation only. To install Node.js, you must download the installation binary, unpack it to your installation folder, set the system environment variable and make it effective.
-   **[Installing Mattermost chat platform server](chatops_prerequisite_mattermost_server.md)**  
This step is required for Mattermost users only. You can use commands to install Mattermost Container on your server.
-   **[Configuring your chat platform](chatops_prerequisite_platform.md)**  
You must configure your chat platform as part of prerequisite preparation before you install and use Zowe Chat. The steps differ from Microsoft™ Teams, Slack, and Mattermost. You can refer to the corresponding topics according to your chat platform.

**Parent topic:**[Planning for Zowe Chat](chatops_prerequisite_requirement.md)

