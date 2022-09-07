# Creating administrator account and Mattermost team

After you start the Mattermost container, you can create an administrator account and a team in Mattermost, and invite your colleagues to join the team.

1.  Open `http://YOUR\_MATTERMOST\_SERVER:8065/` in your browser.

2.  Create an administrator account.

    1.  Specify your email address, username, and password.

        ![Creating administrator account](bnz_create_admin_account.png "Creating administrator account")

    2.  Click **Create Account**, and your administrator account is created.

3.  Create a team.

    1.  Click **Create a new team**.

        ![Creating a new team](bnz_create_new_team.png "Creating a new team")

    2.  Specify your **Team name**, for example, BnzDev. Click **Next**.

        ![Team name](bnz_team_name.png "Team name")

    3.  Specify your **Team URL**, for example, bnzdev. Click **Finish**.

        ![Team url](bnz_team_url.png "Team url")

        **Note:** Remember you Team URL, it will be used when [configure the chat tool-Mattermost](configuring_the_chat_tool_mattermost.md).

4.  Invite people to your team.

    1.  In the chat window, click the Main Menu icon, then click **Invite People**.

        ![Invite people](bnz_mattermost_invite.png "Invite people")

    2.  If your team member does not have an account yet, click **Copy invite link** and send the invitation link to them so that they can join by themselves. If your team members have their accounts, you can specify their account information in the **Invite members to BnzDev** field, select their accounts, and click **Invite** to add them to the team.

        ![Invite members to team](bnz_mattermost_invite_team.png "Invite members to team")

5.  Optional: if you want to enable TLS on Mattermost Server, you can refer to [Configuring TLS on Mattermost Server](https://docs.mattermost.com/install/config-tls-mattermost.html) for specific steps.


Now you have your administrator account and team chat group. You can invite other people to join.

**Parent topic:**[Configuring Mattermost chat platform](chatops_prerequisite_mattermost_hubot_integrate.md)

