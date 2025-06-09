# Zowe Explorer authentication methods

Zowe Explorer for VS Code supports multiple authentication methods including basic authentication, tokens for single sign-on, client certificates, and multi-factor authentication.

## Using basic authentication

To use basic authentication with Zowe Explorer, see [Using basic authentication](../user-guide/cli-authentication-methods.md#using-basic-authentication) in the Zowe CLI documentation.

## Using a token for Single Sign-On (SSO)

SSO lets you use a single token to access all your mainframe services through API Mediation Layer. Tokens provide more security because they have limited lifespans and can be immediately revoked when needed.

SSO is configured with Zowe API ML, which generates an authentication token to access the mainframe. 

To log into the API ML authentication service with an existing base profile:

1. Right-click on the profile you want to connect to using SSO.
2. Select the **Manage Profile** option from the context menu.
3. In the **Quick Pick**, select **Log in to Authentication Service**.
4. In the following **Quick Pick** menu, select the appropriate option for authenticating to the API ML.
5. Answer the proceeding prompts for information.

   If the request is successful, the token is used for authentication until the logout action is taken or the token expires.

For more information, see [Using API Mediation Layer](https://docs.zowe.org/stable/user-guide/cli-using-integrating-apiml).

:::note
For services not registered to your API ML instance, please consult the product or extender documentation for SSO support.
:::

If you are done working with Zowe Explorer and want to prevent further use of a token, you can request the server to invalidate your session token.

Use the **Log out from Authentication Service** feature to invalidate a token:

1. Open Zowe Explorer.
2. Right-click the profile you want to disconnect.
3. Select the **Manage Profile** option.
4. In the **Quick Pick**, select the **Log out from Authentication Service** option.

   The token has been successfully invalidated.

## Using client certificates

To use client certificates with Zowe Explorer, see [Using client certificates](../user-guide/cli-authentication-methods.md#using-client-certificates) in the Zowe CLI documentation.

## Multi-factor authentication (MFA) support

To use MFA with Zowe Explorer, see [Using multi-factor authentication](../user-guide/cli-authentication-methods.md#using-multi-factor-authentication-mfa) in the Zowe CLI documentation.
