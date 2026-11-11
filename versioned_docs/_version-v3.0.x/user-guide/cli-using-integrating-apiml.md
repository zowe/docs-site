# Integrating with API Mediation Layer

Zowe API Mediation Layer (ML) provides a secure single point of access to a defined set of mainframe services. The layer provides API management features such as high-availability, consistent security, and a single sign-on (SSO) and multi-factor authentication (MFA) experience.

You can use tokens or client certificates to integrate with API ML.

Tokens allow you to access services through API ML without reauthenticating every time you issue a command. Tokens allow for secure interaction between the client and server. When you issue commands to API ML, the layer routes requests to an appropriate API instance based on system load and available API instances.

Some users prefer to use certificates to access API ML. This can be the case in sites that use credentials such as passwords and multifactor authentication, which might be valid only for a short period of time. Certificates can be valid for much longer.

## How token management works

When you log in with Zowe CLI, an API ML token is supplied and stored on your computer in place of a username and password. The token allows for a secure handshake with API ML when you issue each command, such that you do not need to reauthenticate until the token expires.

:::note

Zowe CLI also supports standard token implementations such as Java Web Tokens (JWT) and Lightweight Third-Party Authentication (LTPA).

:::

## Logging in

Follow these steps to request a token and log in to API ML:

1. Issue the following command to log in to API ML:

    ```
    zowe auth login apiml
    ```

2. When prompted, enter the following information:
    - Username
    - Password (can be a PIN concatenated with a second factor for MFA)
    - Host
    - Port for the API ML instance

    <br/>A [base profile](../appendix/zowe-glossary#base-profile) is created or updated with your token, which is stored on your computer in place of a username and password. When you issue commands, you can omit your username, password, host, and port.

    If you do not want to store the token on your PC, append the `--show-token` option to the `login` command.

    If you already created a base profile, you might not be prompted for the host and port.

    :::note

    Where the token is saved depends on whether you have an existing base profile and where that profile is located. To learn about the precedence Zowe CLI follows with profile configurations, see [How configuration files and profiles work together](../user-guide/cli-using-understand-profiles-configs.md#how-configuration-files-and-profiles-work-together).
    :::

3. Provide a base path and base profile on commands to connect to API ML.

    To establish a base path, see instructions for [Zowe V2 profiles](#specifying-a-base-path-with-zowe-v2-profiles) or [Zowe V1 profiles](#specifying-a-base-path-with-zowe-v1-profiles).

     If you use the  `--show-token` option with the `login` command, you must manually supply the token on each command using the `--token-value` option. For example:

     ```
     zowe zos-files list data-set "IBMUSER.*" --base-path "ibmzosmf/api/v1" --token-value "123"
     ```

:::note notes

* Tokens expire after a period of time defined by your security administrator. When a token expires, you must log in to API ML again to get a new token.
* If you omit connection details from a service profile, such as `zosmf` profile, the CLI uses the information from your base profile.
* You can choose to specify all connection details on a service profile and connect directly to the service. Routing through API ML is not required.

:::

## Logging out

Log out to prompt the API ML token to expire and remove it from your base profile.

Use the following logout prompt:

```
zowe auth logout apiml
```

This causes the token to expire. Log in again to obtain a new token.

## Accessing a service through API ML

To access mainframe services through API ML using the token in your base profile, use the following command options:

* `--base-path`: Indicates the base path of the API ML instance that you want to access.

    - To establish a base path, see instructions for [Zowe V2 profiles](#specifying-a-base-path-with-zowe-v2-profiles).
* `--disable-defaults`: Prevents default values from being stored in service profiles. If you do not use this flag, the defaults can override values in your base profile.

:::note

Ensure that you *do not* provide username, password, host, or port directly on the service commands or profiles. Supplying those options causes the CLI to ignore the API ML token in your base profile and access the service directly.

:::

### Specifying a base path with Zowe V2 profiles

Use the following steps to specify a base path with Zowe V2 profiles:

1. Note the complete path for a z/OSMF instance registered to API ML.

    For example:

    ```
    https://myapilayerhost:port/ibmzosmf/api/v1
    ```

    The format of base paths can vary based on how API ML is configured at your site.

2. Using the example included in Step 1, access the API ML instance by creating or updating a [service profile](../user-guide/cli-using-using-team-profiles.md#zowe-cli-profile-types), or issuing a command, with the `--base-path` value of `ibmzosmf/api/v1`. Your service profile uses the token and credentials stored in your default base profile.

    To create or update a service profile with the preceding base path in a **project** team configuration file:

    ```
    zowe config set "profiles.myapimlprofile.properties.basePath" "ibmzosmf/api/v1" 
    ```

    If you are using a **global** team configuration file (located in your home directory), add `--global-config` to the end of the command.

    Commands issued with this profile are routed through the layer to access an appropriate z/OSMF instance.

### Specifying a base path with Zowe V1 profiles

Use the following steps to specify a base path with Zowe V1 profiles:

1. Note the complete path for a z/OSMF instance registered to API ML.

    For example:

    ```
    https://myapilayerhost:port/ibmzosmf/api/v1
    ```

    The format of base path can vary based on how API ML is configured at your site.

2. Access the API ML instance by creating a [service profile](../user-guide/cli-using-using-profiles-v1#zowe-cli-v1-profile-types) (or issuing a command) with the `--base-path` value of `ibmzosmf/api/v1`. Your service profile uses the token and credentials stored in your default base profile.

    Using the preceding example, you would issue the following command with your profile name:

    ```
    zowe profiles create zosmf myapimlprofile --base-path ibmzosmf/api/v1 --disable-defaults
    ```
    Commands issued with this profile are routed through the layer to access an appropriate z/OSMF instance.


## Accessing multiple services with SSO

If multiple services are registered to the API Mediation Layer at your site, Zowe CLI lets you access the services with Single Sign-on (SSO). Log in once to conveniently access all available services.

When you are logged in, supply the `--base-path` option on commands for each service. Ensure that you do not provide username, password, host, or port directly on your service commands or profiles. Supplying those options causes the CLI to ignore the token in your base profile and directly access the service. You might need to remove those options from existing profiles to use SSO.

For information about registering an API service at your site, see [Developing for API Mediation Layer](../extend/extend-apiml/onboard-overview).

## Accessing services through SSO and a service not through API ML

A scenario might exist where you log in to API ML with SSO, but you also want to access a different service *directly*.

To access the SSO-enabled services, log in and issue commands with the `--base-path` and `--base-profile` options. The token from your base profile is used for authentication. Remember, your command or service profile must *not* contain username, password, host, or port.

To access the other service directly &mdash; and circumvent API ML &mdash; supply all connection information (username, password, host, and port) on a command or service profile. When you explicitly supply the username and password in a command or service profile, the CLI always uses that connection information instead of the API ML token.

## Accessing services through SSO and a service through API ML but not SSO

You might want to access multiple services with SSO, but also access a service through API ML that is not SSO-enabled.

To perform SSO for the first set of services, log in to API ML and supply the `--base-path` and `--base-profile` on commands. For more information, see [Accessing multiple services with SSO](#accessing-multiple-services-with-sso).

To access the service that is *not* SSO-enabled, explicitly provide your username and password when you issue commands. Using the `--base-path` option ensures that the request is routed to API ML, but the username and password that you provide overrides the credentials in your base profile. This lets you sign in to the individual service.

[def]: #specifying-a-base-path-with-zowe-v2-profiles

## Using client certificates to authenticate to API ML

To use a client certificate to generate an API ML token, open a command line window and issue the following command:

    ```
    zowe auth login apiml --host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path>
    ```
    - `<APIML Host>`
    
        Specifies the API ML host.
    - `<APIML Port>`
        
        Specifies the API ML port.
    - `<PEM Public Certificate Path>`
    
        Specifies the path for the PEM public certificate.
    - `<PEM Private Certificate Path>`
    
        Specifies the path to the PEM private certificate.

Zowe CLI procures a security token from the API ML and adds that token to the base profile in the applicable configuration file.

:::note

If you have multiple types of configuration files and base profiles, see [How configuration files and profiles work together](../user-guide/cli-using-understand-profiles-configs.md#how-configuration-files-and-profiles-work-together) to learn which configuration and profile would be used to store the API ML token.

:::
