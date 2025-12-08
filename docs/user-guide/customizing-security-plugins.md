# Customizing Security Plugins

By default, the `app-server` handles security questions by utilizing either the API Mediation Layer, or ZSS, depending on which is present. If the API Mediation Layer is present, it is used to establish an SSO session which ZSS also respects. When RBAC is enabled, ZSS is queried for authorization questions.

This behavior is performed by an `app-server` security plugin named `sso-auth`.
Security plugins can be installed as part of Zowe extensions, and `app-server` can be customized to prefer them via the Zowe YAML.
Different security plugins could be used to operate in different environments, with different security systems, or with different session characteristics.
For more information, [read the extender's guide on security plugins](../extend/extend-desktop/mvd-authentication-api.md)

## Session duration and expiration

After successful authentication, a Zowe Desktop session is created by authentication plugins.

The duration of the session is determined by the plugin used. Some plugins are capable of renewing the session prior to expiration, while others may have a fixed session length.

The session duration and expiration behavior of the default security plugin, `sso-auth`, is determined by API Mediation Layer configuration if present, and otherwise upon ZSS configuration.
If API Mediation Layer is enabled, by default it will use z/OSMF as the session provider and the session duration will be based upon z/OSMF settings. [You can read more about API Mediation Layer providers here](authentication-providers-for-apiml.md).
If the API Mediation Layer is not enabled, you can [use or customize ZSS's default session duration of one hour](#customizing-zss-session-duration).

When a session expires, the credentials used for the initial login are likely to be invalid for re-use, since MFA credentials are often one-time-use or time-based.

In the Desktop, Apps that you opened prior to expiration will remain open so that your work can resume after entering new credentials.


