# Zowe Explorer profiles

After you install Zowe Explorer, you must have a Zowe Explorer profile to use all functions of the extension.

:::info
You can continue using Zowe V1 profiles with Zowe Explorer V2. See [Working with Zowe CLI V1 profiles](#working-with-zowe-cli-v1-profiles) for more information.
:::

## Configuring Zowe V2 profiles

Zowe V2 uses *team profiles* to simplify profile management by letting you edit, store, and share mainframe connection details in one location, a configuration file.

You can use a text editor or an IDE to populate configuration files with the connection information for your mainframe services. By default, your *global* team configuration file is located in the `.zowe` home folder, whereas the *project* configuration file is located in the main directory of your project.

You can create profiles that you use globally, given that the names of the globally-used profiles are different from your other profile names.

:::note

When multiple profiles are available in Zowe CLI, project configuration takes precedence over global configuration. To learn more, see [How Zowe CLI uses configurations](../user-guide/cli-using-understand-profiles-configs).

:::

### Creating team configuration files

Create a team configuration file:

1. Navigate to the explorer tree.
2. Hover over **DATA SETS**, **USS**, or **JOBS**.
3. Click the **+** icon.
4. Select **Create a New Team Configuration File**.
5. If no workspace is open, a global configuration file is created. If a workspace is open, chose either a global configuration file or a project-level configuration file.
6. Edit the config file to include the host information and save the file.
7. Refresh Zowe Explorer by either clicking the button in the notification message shown after creation, `alt` + `z`, or the `Zowe Explorer: Refresh Zowe Explorer` command palette option.

    Your team configuration file appears either in your `.zowe` folder if you choose the global configuration file option, or in your workspace directory if you choose the project-level configuration file option. The notification message that displays in VS Code after the configuration file creation includes the path of the file created.

### Managing profiles

Change profile validations and edit the profiles in your project or global configuration files:

1. Right-click on your profile.
2. Select the **Manage Profile** option to choose from several authentication and profile management actions for the credentials detected in your Zowe Explorer session.

    Authentication options display according to the detected credentials:

    - **Add Credentials** to store a username and password. Credentials are stored securely in the credential vault when the team or user profile has values in the `secure` array. Otherwise, the credentials are stored as plain text in the profile.
    - **Update Credentials** to update the username and password. Credentials are stored securely in the credential vault when the team or user profile has values in the `secure` array. Otherwise, the credentials are stored as plain text in the profile.
    - **Log in to authentication service** to obtain a new authentication token when the token in the profile is no longer valid or is missing
    - **Log out of authentication service** to invalidate the token in the profile so a valid token is not stored

    Profile management options displays for specific profile actions:

    - **Disable/Enable Profile Validation** to disable or enable validation of access to z/OSMF
    - **Edit Profile** to update profile information in an **Editor** tab
    - **Hide Profile** to hide the profile name from the tree view
    - **Delete Profile** to manually remove the profile information in an **Editor** tab

3. Refresh the view by clicking the **Refresh** icon in the **DATA SETS**, **USS**, or **JOBS** tree view.

     You successfully edited your configuration file.

### Sample profile configuration

View the profile configuration sample. In the sample, the default `lpar1.zosmf` profile will be loaded upon activation.

You can use the sample to customize your profile configuration file. Ensure that you edit the `host` and `port` values before you work in your environment.

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
    "my_base": {
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
    "base": "my_base"
  },
  "plugins": []
}
```

## Working with Zowe V1 profiles

:::info

Zowe V1 profiles are defined by having one yaml file for each user profile.

:::

### Managing Zowe V1 profiles

You must have a `zosmf` compatible profile before you can use Zowe Explorer. You can set up a profile to retain your credentials, host, and port name. In addition, you can create multiple profiles and use them simultaneously.

To create a `zosmf` compatible profile:

1. Navigate to the explorer tree.
2. Click the **+** button next to the **DATA SETS**, **USS**, or **JOBS** bar.

  :::note

  If you already have a profile, select it from the drop-down menu in the **picker** field.

  :::

3. Select the **Create a New Connection to z/OS** option.

   :::note

   When you create a new profile, username and password fields are optional. However, the system prompts you to specify your credentials when you use the new profile for the first time.

   :::

4. Follow the instructions, and enter all required information to complete the profile creation.

  <img src={require("../images/ze/ZE-newProfiles.gif").default} width="600" alt="New Connection"/>

  You successfully created a Zowe CLI `zosmf` profile. Now you can use all the functionalities of the extension.

To edit a profile:

1. Right-click the profile and select **Update Profile** option.

2. Edit the profile information in the **picker** field.

    <img src={require("../images/ze/ZE-prof-update.gif").default} width="600" height="300" alt="Edit a Profile"/>

To hide a profile from the tree view, right-click the profile and select the **Hide Profile** option.

To delete a profile from your system, right-click the profile and select the **Delete Profile** option.

### Validating profiles

Zowe Explorer includes the profile validation feature that helps to ensure that z/OSMF is accessible and ready for use. If a profile is valid, the profile is active and can be used. By default, the feature is automatically enabled. You can disable the feature by right-clicking on your profile and selecting the **Disable Validation for Profile** option. Alternatively, you can enable or disable the feature for all profiles in the VS Code settings.

1. Navigate to the VS Code settings.
2. Open Zowe Explorer Settings.
3. Enable or disable the automatic validation of profiles option.
4. Restart VS Code.

### Using base profiles and tokens with existing profiles

As a Zowe user, you can leverage the base profile functionality to access multiple services through Single Sign-on. Base profiles enable you to authenticate using Zowe API Mediation Layer (API ML). You can use base profiles with more than one service profile. For more information, see [Base Profiles](../user-guide/cli-using-using-profiles-v1.md#base-profiles).

Before you log in and connect your service profile, ensure that you have [Zowe CLI](../user-guide/cli-install-cli-checklist.md) v6.16 or higher installed.

#### Accessing services through API ML using SSO

Connect your service profile with a base profile and token:

1. Open Zowe CLI and issue the following command:

   ```
   zowe auth login apiml
   ```

2. Follow the onscreen instructions to complete the login process.

   A local base profile is created that contains your token. For more information about the process, see [Token Management](../user-guide/cli-using-integrating-apiml.md#how-token-management-works).
  
3. Run Zowe Explorer and click the **+** icon.  

4. Select the profile you use with your base profile with the token.

   The profile appears in the tree and you can now use this profile to access z/OSMF via the API Mediation Layer.

For more information, see [Integrating with API Mediation Layer](../user-guide/cli-using-integrating-apiml.md).

#### Logging in to the Authentication Service

If the token for your base profile is no longer valid, you can log in again to get a new token with the **Log in to Authentication Service** feature.

:::note

- The feature is only available for base profiles.
- The feature supports only API Mediation Layer at the moment. Other extenders may use a different authentication service.

:::

1. Open Zowe Explorer.
2. Right-click your profile.
3. Select the **Log in to Authentication Service** option.

   You are prompted to enter your username and password beforehand.

    The token is stored in the corresponding base profile.

If you do not want to store your token, request from the server to end the session of your token. Use the **Log out from Authentication Service** feature to invalidate the token.

1. Open Zowe Explorer.
2. Right-click your profile.
3. Select the **Log out from Authentication Service** option.

    Your token has been successfully invalidated.
