# (Recommended) Addressing authentication requirements

The following features are not required, but are recommended with additional prerequisites.

:::info Roles required: security administrator
:::

## Multi-Factor Authentication (MFA)

Multi-factor authentication (MFA) is supported for several Zowe components, including the Zowe Desktop,  API Mediation Layer, and Zowe Application Framework.
Multi-factor authentication is provided by third-party products with which Zowe is compatible. The following MFA products are known to work with Zowe:

- [Advanced Authentication Mainframe 2.0](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html)
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).

To support the multi-factor authentication, it is necessary to apply z/OSMF APAR [PH39582](https://www.ibm.com/support/pages/apar/PH39582). 


:::important
Multi-factor authentication requires configuration with Single-Sign-On (SSO). Ensure that SSO is configured before you use MFA in Zowe.
:::

## Single Sign On (SSO)

Zowe has an SSO scheme with the goal that each time you use multiple Zowe components you should only be prompted to login once.

Requirements:

- IBM z/OS Management Facility (z/OSMF)

:::note Notes:
- For more information about single sign on (SSO) for users, see [Zowe API Mediation Layer Single Sign On Overview](./api-mediation-sso.md).

- For more information about single sign on (SSO) for extenders, see [Single Sign On Integration for Extenders](../extend/extend-apiml/api-medation-sso-integration-extenders.md).

:::

## API Mediation Layer OIDC Authentication

Zowe requires **ACF2 APAR LU01316** to be applied when using the ACF2 security manager.

For more information about OIDC authentication, see [Zowe API Mediation Layer OIDC Authentication](../extend/extend-apiml/api-mediation-oidc-authentication.md).