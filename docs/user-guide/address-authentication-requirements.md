# (Optional) Addressing authentication requirements

The following features are optional with additional prerequisites.

## Multi-Factor Authentication (MFA)

Multi-factor authentication is supported for several components, such as the Desktop and API Mediation Layer.
Multi-factor authentication is provided by third-party products which Zowe is compatible with. The following are known to work:

- [CA Advanced Authentication Mainframe](https://techdocs.broadcom.com/us/en/ca-mainframe-software/security/ca-advanced-authentication-mainframe/2-0.html)
- [IBM Z Multi-Factor Authentication](https://www.ibm.com/products/ibm-multifactor-authentication-for-zos).

**Note:** To support the multi-factor authentication, it is necessary to apply z/OSMF APAR  [PH39582](https://www.ibm.com/support/pages/apar/PH39582). 

For information on using MFA in Zowe, see [Multi-Factor Authentication](mvd-configuration.md#multi-factor-authentication-configuration).

**Note:** MFA must work with Single sign-on (SSO). Make sure that [SSO](#single-sign-on-sso) is configured before you use MFA in Zowe.

## Single Sign-On (SSO)

Zowe has an SSO scheme with the goal that each time you use multiple Zowe components you should only be prompted to login once. 

Requirements:

- IBM z/OS Management Facility (z/OSMF)

## API Mediation Layer OIDC Authentication

Zowe requires ACF2 APAR LU01316 to be applied when using the ACF2 security manager.