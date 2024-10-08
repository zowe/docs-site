# Creating Zowe Explorer profiles

After you install Zowe Explorer, you must have a Zowe Explorer profile to use all functions of the extension.

:::info Required roles: Systems administrator
:::

## Configuring Zowe profiles

Zowe uses [team configuration](/appendix/zowe-glossary.md#team-configuration) to simplify profile management by letting you edit, store, and share mainframe connection details in one location, a configuration file.

You can use a text editor or an IDE to populate configuration files with profiles, which contain the connection information for your mainframe services. By default, your *global* team configuration file is located in the `.zowe` folder in your home folder, whereas a *project* configuration file is located in the main directory of your project.

:::note

When multiple profiles with the same name are available in Zowe Explorer, project configuration takes precedence over global configuration. To learn more, see [How Zowe CLI uses configurations](../user-guide/cli-using-understand-profiles-configs).

:::

### Creating team configuration files

Create a team configuration file:

1. Navigate to the explorer tree.
2. Hover over **DATA SETS**, **USS**, or **JOBS**.
3. Click the **+** icon.
4. Select **Create a New Team Configuration File**.
5. If no workspace is open, a global configuration file is created. If a workspace is open, choose either a global configuration file or a project-level configuration file.
6. Edit the configuration file to include the host information and save the file.
7. Refresh Zowe Explorer by either clicking the button in the notification message shown after creation, `alt` + `z`, or the `Zowe Explorer: Refresh Zowe Explorer` command palette option.

    Your team configuration file appears either in your `.zowe` folder if you choose the global configuration file option, or in your workspace directory if you choose the project-level configuration file option. The notification message that displays in VS Code after the configuration file creation includes the path of the file created.

### Managing profiles

Change profile validations and edit the profiles in your project or global configuration files:

1. Right-click on a profile icon in the **DATA SETS**, **USS**, or **JOBS** tree view.
2. Select the **Manage Profile** option to choose from several authentication and profile management actions for the credentials detected in your Zowe Explorer session.

    Authentication options display according to the detected credentials:

    - **Add Credentials** to store a username and password. Credentials are stored securely in the credential vault when the team or user profile has values in the `secure` array. Otherwise, the credentials are stored as plain text in the profile.
    - **Update Credentials** to update the username and password. Credentials are stored securely in the credential vault when the team or user profile has values in the `secure` array. Otherwise, the credentials are stored as plain text in the profile.
    - **Log in to authentication service** to obtain a new authentication token when the token in the profile is no longer valid or is missing.
    - **Log out of authentication service** to invalidate the token in the profile so a valid token is not stored.

    Profile management options displays for specific profile actions:

    - **Disable/Enable Profile Validation** to disable or enable validation of access to z/OSMF.
    - **Edit Profile** to update profile information in an **Editor** tab.
    - **Hide Profile** to hide the profile name from the tree view.
    - **Delete Profile** to manually remove the profile information in an **Editor** tab.

3. Refresh the view by clicking the **Refresh** icon in the **DATA SETS**, **USS**, or **JOBS** tree view.

     You successfully edited your configuration file.

### Example profiles configuration

Review the profile examples below to understand how settings are organized in a configuration file. In this example, the default `lpar1.zosmf` profile is loaded upon activation.

You can use this example to customize your own profiles in a configuration file. Ensure that you edit the `host` and `port` values before you work in your environment.

```json
{
  "$schema": "./zowe.schema.json",
  "profiles": {
    "lpar1": {
      "properties": {
        "host": "192.86.32.67"
      },
      "profiles": {
        "zosmf": {
          "type": "zosmf",
          "properties": {
            "port": 10443
          },
          "secure": []
        },
        "tso": {
          "type": "tso",
          "properties": {
            "account": "",
            "codePage": "1047",
            "logonProcedure": "IZUFPROC"
          },
          "secure": []
        },
        "ssh": {
          "type": "ssh",
          "properties": {
            "port": 22
          },
          "secure": []
        },
        "zftp": {
          "type": "zftp",
          "properties": {
            "port": 21
          },
          "secure": []
        }
      }
    },
    "project_base": {
      "type": "base",
      "properties": {
        "rejectUnauthorized": false
      },
      "secure": ["user", "password"]
    }
  },
  "defaults": {
    "zosmf": "lpar1.zosmf",
    "tso": "lpar1.tso",
    "ssh": "lpar1.ssh",
    "zftp": "lpar1.zftp",
    "base": "project_base"
  },
  "plugins": []
}
```

## Using base profiles and tokens with existing profiles

As a Zowe user, you can leverage the base profile functionality to access multiple services through Single Sign-on. Base profiles enable you to authenticate using Zowe API Mediation Layer (API ML). You can use base profiles with more than one service profile. For more information, see [Base Profiles](../user-guide/cli-using-using-profiles-v1.md#base-profiles).

::: note

If you want to access services through multiple API ML gateways, the same following steps apply. However, you must first edit your configuration file to follow a specific structure.

Review [Accessing services for multiple API ML instances](../user-guide/cli-using-creating-profiles.md#accessing-services-through-multiple-api-ml-gateways) to see how profiles are structured in the configuration file.

:::

### Accessing services through API ML using SSO

Connect your service profile with a base profile and token:

1. Right-click on the profiles you want to connect through with the API ML.
2. Select the **Manage Profile** option from the context menu
3. In the **Quick Pick**, select **Log in to Authentication Service**.
4. In the next **Quick Pick** menu, select the appropriate option for authenticating to the API ML
5. Answer the proceeding prompts for information.

    Tokens are stored either in a base profile or, if using a nested profile structure, in a parent profile that has a secure array that contains `tokenValue`. If not using a nested profile structure, and if a base profile does not exist, a base profile is created that contains your token. For more information about API integration and using tokens, see [Token Management](../user-guide/cli-using-integrating-apiml.md#how-token-management-works).

### Logging out of the API ML using SSO

If you do not want to store your token, request the server to revoke your token and delete it from your local profile. Use the **Log out from Authentication Service** feature to invalidate the token.

1. Open Zowe Explorer.
2. Right-click your profile.
3. Select the **Manage Profile** option.
4. In the **Quick Pick**, select the **Log out from Authentication Service** option.

    Your token has been successfully invalidated.
