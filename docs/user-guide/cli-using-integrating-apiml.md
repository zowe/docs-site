# Integrating with API Mediation Layer

Zowe API ML provides a single point of access to a defined set of mainframe services. The layer provides API management features such as high-availability, consistent security, and a single sign-on (SSO) and multi-factor authentication (MFA) experience.

You can access services through API ML without reauthenticating every time you issue a command. Tokens allow for a secure interaction between the client and server. When you issue commands to API ML, the layer routes requests to an appropriate API instance based on system load and available API instances.

## How token management works

When you log in with the CLI, an API ML token is supplied and stored on your computer in place of username and password. The token allows for a secure handshake with API ML when you issue each command, such that you do not need to reauthenticate until the token expires.

**Note:** Zowe CLI also supports standard token implementations such as Java Web Tokens (JWT) and Lightweight Third-Party Authentication (LTPA).

## Logging in

To request a token and "log in" to API ML, issue the following command:

```
zowe auth login apiml
```

The CLI prompts you to enter your username, password (where password can be a PIN concatenated with a second factor for MFA), host, and port for the API ML instance.

**Tip:** If you already created a base profile, you might not be prompted for host and port.

A local base profile is created that contains your token. When you issue commands, you can omit your username, password, host, and port. Instead, provide a base path and base profile on commands to connect to API ML.

Optionally, when you do not want to store the token on disk, append the `--show-token` option to the login command. If you choose this option, you must manually supply the token on each command using the `--token-value` option.

**Notes:**

* Tokens expire after a period of time defined by your security administrator. When a token expires, you must log in again to get a new token.
* If you omit connection details from a service profile, such as `zosmf` profile, the CLI uses the information from your base profile.
* You can choose to specify all connection details on a service profile and connect directly to the service. Routing through API ML is not required.

## Logging out

Log out to expire the API ML token and remove it from your base profile.

Issue the following command:

```zowe auth logout```

The token is expired. Log in again to obtain a new token.

## Accessing a service through API ML

To access services through API ML using the token in your base profile, specify the following options on commands and service profiles:

* `--base-path`: The base path of the API ML instance that you want to access.
* `--disable-defaults`: Specify this flag to prevent default values from being stored in service profiles. If you do not use this flag, the defaults can override values in your base profile.

**Note:** Ensure that you *do not* provide username, password, host, or port directly on the service commands or profiles. Supplying those options causes the CLI to ignore the API ML token in your base profile and directly access the service.

### Specifying a base path

The following example illustrates a complete path for a z/OSMF instance registered to API ML. The format of base path can vary based on how API ML is configured at your site:

```
https://myapilayerhost:port/ibmzosmf/api/v1
```

To access that API ML instance, create a service profile (or issue a command) with the `--base-path` value of `api/v1`. Your service profile uses the token and credentials stored in your default base profile.

```
zowe profiles create zosmf myprofile123 --base-path ibmzosmf/api/v1 --disable-defaults
```

Commands issued with this profile are routed through the layer to access an appropriate z/OSMF instance.

## Accessing multiple services with SSO

If multiple services are registered to the API Mediation Layer at your site, Zowe CLI lets you access the services with Single Sign-on (SSO). Log in once to conveniently access all available services.

When you are logged-in, supply the `--base-path` option on commands for each service. Ensure that you do not provide username, password, host, or port directly on your service commands or profiles. Supplying those options causes the CLI to ignore the token in your base profile and directly access the service. You might need to remove those options from existing profiles to use SSO.

For information about registering an API service at your site, see [Developing for API Mediation Layer](../extend/extend-apiml/onboard-overview).

## Accessing services through SSO + one service not through APIML

There might be a scenario where you log in to API ML with SSO, but you also want access a different service directly (not through API ML).

To access the SSO-enabled services, log in and issue commands with the `--base-path` and `--base-profile` options. The token from your base profile is used for authentication. Remember, your command or service profile must *not* contain username, password, host, or port.

To access the other service directly (circumvent API ML), supply all connection information (username, password, host, and port) on a command or service profile. When you explicitly supply username and password in a command or service profile, the CLI always uses that connection information instead of the API ML token.

## Accessing services through SSO + one service through API ML but not SSO

You might want to access multiple services with SSO, but also access a service through API ML that is not SSO-enabled.

To perform SSO for the first set of services, log in to API ML and supply the `--base-path` and `--base-profile` on commands. For more information, see [Accessing multiple services with SSO](#accessing-multiple-services-with-sso).

To access the service that is *not* SSO-enabled, explicitly provide your username and password when you issue commands. Using the `--base-path` option ensures that the request is routed to API ML, but the username and password that you provide overrides the credentials in your base profile. This lets you sign in to the individual service.
