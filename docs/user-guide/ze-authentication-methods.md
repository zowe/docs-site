# Authentication methods

Zowe Explorer for VS Code supports multiple authentication methods including basic authentication, tokens, certificates, and multi-factor authentication.

## Using Single Sign-On (SSO)

As a Zowe user, you can use a base profile stored in a team configuration file to access multiple services through SSO with a token.

In Zowe Explorer, a base profile enables you to authenticate your credentials with one method, the Zowe API Mediation Layer (API ML), to access multiple services. For more information about profiles, see [profile types](https://docs.zowe.org/stable/user-guide/cli-using-using-team-profiles#zowe-cli-profile-types).

To log into the API ML authentication service with an existing base profile:

1. Right-click on the profile you want to connect to using SSO.
2. Select the **Manage Profile** option from the context menu.
3. In the **Quick Pick**, select **Log in to Authentication Service**.
4. In the following **Quick Pick** menu, select the appropriate option for authenticating to the API ML.
5. Answer the proceeding prompts for information.

   If the request is successful, the token is used for authentication until the logout action is taken or the token expires.

For more information, see [Integrating with API Mediation Layer](https://docs.zowe.org/stable/user-guide/cli-using-integrating-apiml).

:::note
For services not registered to your API ML instance, please consult the product or extender documentation for SSO support.
:::

If you are done working with Zowe Explorer and want to prevent further use of a token, you can request the server to invalidate your session token. Use the **Log out from Authentication Service** feature to invalidate the token:

1. Open Zowe Explorer.
2. Right-click the profile you want to disconnect.
3. Select the **Manage Profile** option.
4. In the **Quick Pick**, select the **Log out from Authentication Service** option.

   Your token has been successfully invalidated.

## Multi-factor authentication (MFA) support

Zowe Explorer supports the use of MFA through token authentication using either Zowe API Mediation Layer (API ML) or z/OSMF.

:::note
For services not registered to your API ML instance, please consult the product or extender documentation for MFA support.
:::

To use MFA authentication with Zowe Explorer, log into API ML:

1. Right click on a profile.
2. Select the **Manage Profile** option.
3. Select **Log in to Authentication Service** from the **Quick Pick**.
4. When prompted, select the credential method you want to use.

   Zowe Explorer logs you in to the authentication service for your selected profile.

For more information regarding MFA support in Zowe's documentation on [using API Mediation Layer](https://docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/).