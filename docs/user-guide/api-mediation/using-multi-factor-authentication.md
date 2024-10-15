# Using multi-factor authentication (MFA)

Zowe offers the option to use multi-factor authentication (MFA) systems, which require users to provide multiple authentication factors during logon to verify the user's identity. When using multi-factor authentication, it is necessary that each authentication factor be from a separate category of credential types. While multi-factor authentication is supported by Zowe, there are limitations for this feature to function properly. This topic explains the limitations of using MFA in Zowe and recommendations to address these limitations.

The Zowe API Mediation Layer, Zowe App Framework, and all apps present in the SMP/E or convenience builds support out-of-band MFA. Users are required to enter an MFA assigned token or passcode into the password field of the Desktop login screen or authentication to the API Catalog.

Alternatively, a user can access one of the authentication endpoints such as `/gateway/auth/login` within the API Mediation Layer or via App-servers `/auth` REST API endpoint.

When using MFA with Zowe CLI or the API ML Catalog, users are required to log in with their mainframe user name and MFA token.

## Prerequisite

If you use z/OSMF as your authentication provider, ensure that you meet the following prerequisite to use MFA with Zowe CLI or API ML Catalog:

* z/OSMF APAR for MFA must be installed on the system. For more information, see [this APAR](https://www.ibm.com/support/pages/apar/PH39582) in IBM Support.

## Known Limitations and Recommendations

### Unintentional Reuse of MFA Token

When z/OSMF is used as a security provider, it is possible to reuse MFA tokens, whereby it is possible to receive a JWT token based on previously used MFA token. This presents a security risk.  

This issue can be resolved by configuring z/OSMF to work properly with API ML.
Update the z/OSMF configuration with the following parameter:
`allowBasicAuthLookup="false"`

After applying this change, each authentication call results in generating a new JWT.
For more information, see [Configuring z/OSMF](../systemrequirements-zosmf.md) to properly work with API ML. 

### No Notification when Additional Input is Required

Neither Zowe CLI nor API Catalog issue a notification when a user is required to provide additional input. This can occur in cases such as when a user signon attempt triggers the requirements of a **New Pin** or **Next Token**. The user must resolve this situation outside of Zowe. Depending on the current authentication factor enabled (RSA SecurID or RADIUS), the user can use TSO console or MFA Self-service facilities.

We recommend you first try to access self-service facilities and resolve the issue there. If you are unable to access your self-service facilities, contact your system administrator.

:::tip Tips:
* For more information about how to manage multi-factor authentication credentials in AAM, see [Manage Multi-Factor Authentication Credentials (IBM RACF)](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0/using-with-ibm-racf/manage-multi-factor-authentication-credentials-ibm-racf.html) in the Advanced Authentication Mainframe 2.0 Broadcom documentation.
* For more information about how to manage multi-factor authentication credentials in IBM Z MFA, see
[IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).
* Additionally, Zowe API ML can be configured to accept OIDC/OAuth2 user authentication tokens. In this particular case, MFA support is built into the OIDC provider system. This support alternative does not rely on the mainframe MFA technology, but is equally secure.
* For more information about how to resolve the RADIUS Access Challenge, see the sub-topic _RADIUS Access Challenge Considerations_ in the article [Manage Multi-Factor Authentication Credentials (IBM RACF)](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0/using-with-ibm-racf/manage-multi-factor-authentication-credentials-ibm-racf.html).
:::

### Token Expiration when Stored in the Authorization Dialog in "Try it out"

When using the API Catalog, you have the option to use the "Try it out" functionality to test a protected endpoint. In this case, you are given the option to provide and store MFA credentials in the Authorization dialog. As the MFA token has a short lifetime, we do not recommend storing your MFA token when using this feature.

You can, however, continue to use your credentials in the Authorization dialog when you set a fixed password, rather than using an MFA token. Alternatively, you can store your credentials in the Authorization dialog if your account is configured to bypass MFA mode. In this case, authentication is performed through the mainframe credentials of the user.


