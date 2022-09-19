# Creating Microsoft Teams bot app using App Studio

To create a bot app for Microsoft™ Teams, you need to use the tool App Studio to create a new app, specify app details, enable bot capabilities, and add it to your teams.

App Studio is a Teams app that makes it easy to create or integrate your own Microsoft Teams apps whether you develop custom apps for your enterprise or SaaS applications for teams around the world. It streamlines the creation of the manifest and package for your app and provides several useful tools like the Card Editor. You can find App Studio in the Teams store.

1.  Find and add App Studio to your Microsoft Teams.

    1.  Launch and log in your Microsoft Teams client.

    2.  Click the Apps icon at the bottom left of your Microsoft Teams window to open the Apps pane.

        ![Apps pane](bnz_teams_app_panel.png "Apps pane")

    3.  Search for App Studio with the search bar.

        ![App Studio](bnz_teams_app_studio.png "App Studio")

    4.  Select App Studio and click **Add**.

        ![Add App Studio](bnz_teams_app_add.png "Add App Studio")

        You can see the home page of App Studio.

2.  Create a new app.

    1.  In the home page of App Studio, select **Create a new app** to open the **New app** pane.

        ![Create a new app](bnz_teams_create.png "Create a new app")

    2.  Specify the required values for your app.

        ![New App pane](bnz_new_app_panel.png "New App pane")

        -   For **App names**, specify a short name for your app that is used for configuration in Z ChatOps as the bot username.

            ![App names](bnz_teams_app_names.png "App
            names")

        -   For **Identification**, click **Generate** to generate an App ID. Specify the package name and version as well.

            ![Identification](bnz_teams_app_identification.png "Identification")

        -   Specify all the required information accordingly.
3.  Enable bot capabilities.

    1.  Click the **Bots** under **Capabilities**.

        ![Capabilities section](bnz_teams_bots_menu.png "Capabilities section")

    2.  Click **Set up** to set up your bot.

        ![Set up your bot](bnz_teams_setup.png "Set up your bot")

    3.  Switch to **Existing bot** if you have an existing bot. Select **Select from one of my existing bots** and select the bot that you created. If your bot does not appear automatically, use the Bot ID to connect to it.

        ![Existing bot](bnz_teams_setup_existing.png "Existing bot")

        Select **Team** for **Scope** so that you can add the bot app to your teams. Save your settings and you can see your bot in the **Bots** panel. **Group Chat** and **Personal** are not supported in this version.

        **Remember:** You need to create a bot if you don't have one. You can either create a bot with Microsoft Bot Framework or with Microsoft Azure. For specific steps, see [Creating a bot with Microsoft Bot Framework](chatops_prerequisite_framework_bot.md) or [Creating a bot with Microsoft Azure](chatops_prerequisite_azure_bot.md).

4.  Test and distribute your app.

    1.  Click the **Test and distribute** icon under **Finish**.

        ![Test and distribute](bnz_teams_finish.png "Test and distribute")

    2.  Click **Install** to install your app in Teams.

        ![Install your app](bnz_teams_install.png "Install your app")

    3.  Select **Add to a team** in the drill-down options to add the app to a team.

    ![Add to a team](bnz_teams_add.png "Add to a team")

5.  Optional: You can also choose to publish your app to your tenant's app catalog so that people in your tenant can share it.

    1.  Select **Publish** under **Test and Distribute**.

        ![Publish your app](bnz_teams_publish.png "Publish your app")

    2.  Select your tenant to publish your app.

        ![Publish to your app catalog](bnz_teams_publish_org.png "Publish to your app catalog")

        Your app will appear on your Apps homepage when the IT admin of your tenant approves.

        ![App catalog](bnz_teams_app_catalog.png "App catalog")

        Now, people in your tenant can see this app and can use it.


You have successfully created a bot app for Microsoft Teams and can talk to it in your teams.

