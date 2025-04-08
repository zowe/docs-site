# Using the API Mediation Layer

Zowe API Mediation Layer (ML) provides a secure single point of access to a defined set of mainframe services. The mediation layer provides API management features such as high-availability, consistent security, and a single sign-on (SSO) and multi-factor authentication (MFA) experience.

The recommended way to interact with the API ML is through the use of tokens.

Tokens allow you to access services through API ML without reauthenticating every time you issue a command. Tokens provide secure interaction between the client and server. When you issue commands to API ML, the mediation layer routes requests to an appropriate API instance based on system load and available API instances.

Tokens can be obtained by logging into the API ML with a username and password, or a client certificate.

## How token management works

When you log in with Zowe CLI, an API ML token is supplied and stored on your computer to be used in place of a username and password. The token provides a secure handshake with API ML when you issue commands so that you do not need to reauthenticate until the token expires.

:::note

Zowe CLI also supports standard token implementations such as Java Web Tokens (JWT) and Lightweight Third-Party Authentication (LTPA).

:::

### Logging in with username and password

Provide your username and password to generate a token and log in to API ML:

1. Log in to API ML:

    ```
    zowe auth login apiml
    ```
    For users who do not have a base profile that has been used to log into API ML, this creates a new base profile that is set as the default base profile in your configuration file.

    For users who have a default base profile already used to log into API ML, this updates the existing default base profile with a new token. 
 
2. When prompted, enter the following information:
    - Username
    - Password (can be a PIN concatenated with a second factor for MFA)
    - Host
    - Port for the API ML instance

    A [base profile](../appendix/zowe-glossary#base-profile) is created or updated in your configuration file with your token, which is stored on your computer in place of a username and password. When you issue commands, you are able to omit your username, password, host, and port.

    If you do not want to store the token on your PC, append the `--show-token` option to the `login` command in Step 1. This returns the token value in your terminal for you to use on subsequent commands.

    If you already created a base profile, you might not be prompted for the host and port.

    :::note

    Where the token is saved depends on whether you have an existing base profile and where that profile is located. To learn about the precedence Zowe CLI follows with profile configurations, see [How configuration files and profiles work together](../user-guide/cli-using-understand-profiles-configs.md#how-configuration-files-and-profiles-work-together).
    :::

3. If you do not have a profile for the service, respond to Zowe CLI prompts for connection information to create a profile for the service.

    :::tip
    - To establish a base path, see instructions for [Zowe V2 profiles](#specifying-a-base-path-with-zowe-v2-profiles) or [Zowe V1 profiles](#specifying-a-base-path-with-zowe-v1-profiles).
    :::

    If you already have a profile in your configuration for the service you want to connect to, use a text editor to open the applicable configuration file and replace the `port` property with a `basePath` property to enable the use of the API ML.

    A profile with a port number:

    ```json
        "type": "zosmf",
        "properties": {
            // highlight-start
            "port": 443
            // highlight-end
        }
    ```

    A profile with a base path:

    ```json
    "type": "zosmf",
        "properties": {
              // highlight-start
            "basePath": "/ibmzosmf/api/v1"
              // highlight-end
        }
    ```



     If you use the  `--show-token` option with the `login` command, you must manually supply the token on each command using the `--token-value` option. For example:

     ```
     zowe zos-files list data-set <searchPattern> --token-value <123>
     ```
    - `<searchPattern>`

        Specifies the data set search criteria (for example, `<IBMUSER.*>`)
    - `<123>`

        Specifies the token value supplied in Step 2.

:::note notes

* Tokens expire after a period of time defined by your security administrator. When a token expires, you must log in to API ML again to get a new token.
* If you omit connection details from a service profile, such as `zosmf` profile, the CLI uses the information from your base profile.
* You can choose to specify all connection details on a service profile and connect directly to the service. Routing through API ML is not required.

:::

### Logging in with a client certificate

Use a client certificate to generate a token and log in to API ML:

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

### Logging out

Log out to prompt the API ML token to expire and remove it from your base profile:

```
zowe auth logout apiml
```

This causes the token to expire. Log in again to obtain a new token.

If you used the `--show token` option and never stored your token in profile, add the `--token-value` option to this command to invadlidate the token. 

### Specifying a base profile

Base profiles contain mainframe connection information that is used by the service profiles in your configuration. There can be multiple base profiles in the same configuration file, including a default base profile. This could be the case, for example, if you run different systems for development and testing and use a different base profiles for each.

The `zowe auth login apiml` and `zowe auth logout apiml` commands use your configuration's default base profile when issued without additional options.

However, you might need to use a different base profile. To do so, add the `--base-profile` option to specify the base profile that you want to use when logging in or out of API ML.

- Use `--base-profile` to log in to API ML and save your token in a specific base profile that is not the default base profile:

    Logging in with a username and password:
        
    ```
    zowe auth login apiml --base-profile <profile_name>
    ```

    Logging in with a client certificate:

    ```
    zowe auth login apiml --host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path> --base-profile <profile_name>
    ```

- Use `--base-profile` when issuing commands with API ML:

    ```
    zowe zos-files list data-set <searchPattern> --base-profile <profile_name>
    ```

- Use `--base-profile` to log out of API ML and invalidate your token:

    ```
    zowe auth logout apiml --base-profile <profile_name>
    ```

### Accessing a service through API ML

To access mainframe services through API ML using the token in your base profile, use the `basePath` property in your service profile to indicate the base path of the API on the API ML instance that you want to access.

To establish a base path, see instructions for [Zowe V2 profiles](#specifying-a-base-path-with-zowe-v2-profiles).

:::note

Ensure that you *do not* provide username, password, host, or port directly on the service commands or profiles. Supplying those options causes the CLI to ignore the API ML token in your base profile and access the service directly.

:::

#### Specifying a base path with Zowe team configuration

Use the following steps to specify a base path with Zowe [team configuration](../appendix/zowe-glossary.md#team-configuration):

1. Note the complete path for a z/OSMF instance registered to API ML.

    For example:

    ```
    https://myapilayerhost:port/ibmzosmf/api/v1
    ```

    The format of base paths can vary based on how API ML is configured at your site.

2. Using the example in Step 1, access the API ML instance by creating or updating a [service profile](../user-guide/cli-using-using-team-profiles.md#zowe-cli-profile-types), or issuing a command, with the `--base-path` value of `ibmzosmf/api/v1`. Your service profile uses the token and credentials stored in your default base profile.

    To create or update a service profile with the preceding base path in a **project** team configuration file:

    ```
    zowe config set <propertyName> <basePath> 
    ```

    If you are using a **global** team configuration file (located in your home directory), add `--global-config` to the end of the command.

    Commands issued with this profile are routed through the API ML to access an appropriate z/OSMF instance.

#### Specifying a base path with Zowe V1 profiles

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

### Accessing multiple services with SSO

If multiple services are registered to the API Mediation Layer at your site, Zowe CLI lets you access the services with Single Sign-on (SSO). Log in once to conveniently access all available services.

When you are logged in, supply the `--base-path` option on commands for each service. Ensure that you do not provide username, password, host, or port directly on your service commands or profiles. Supplying those options causes the CLI to ignore the token in your base profile and directly access the service. You might need to remove those options from existing profiles to use SSO.

For information about registering an API service at your site, see [Developing for API Mediation Layer](../extend/extend-apiml/onboard-overview).

### Accessing services through SSO and a service not through API ML

A scenario might exist where you log in to API ML with SSO, but you also want to access a different service *directly*.

In this case, your `zowe.config.json` file might look like the following client configuration:

```json showLineNumbers title="zowe.config.json"
{
    "$schema": "./zowe.schema.json",
    "defaults": {
        "zosmf": "zosmf_thru_apiml",
        "base": "my_one_base_profile",
        "tso": "tso",
        "ssh": "ssh"
    },
    "profiles": {
        // highlight-start
        "my_one_base_profile": {  // Base profile connection properties are used unless overriden
            "type": "base",
            "properties": {
                "host": "usilca32.lvn.broadcom.net",  // Both of my services are on this host
                "port": 60254,                        // Place APIML port in the base profile
            }
        },
        "zosmf_thru_apiml": {                   // A profile for connecting to z/OSMF through APIML
            "type": "zosmf",
            "properties": {
                "basePath": "ibmzosmf/api/v1"   // APIML connections require a basePath (partial URL)
            },
            "secure": []
        },
        "zosmf_direct": {       // A profile for connecting directly to z/OSMF
            "type": "zosmf",
            "properties": {
                "port": 1443    // Override the APIML port with the direct z/OSMF port
            },
            "secure": [
                "user",         // The user and password for the direct connection to APIML
                "password"
            ]
        },
          // highlight-end
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
                "port": 5678
            },
            "secure": []
        }
    },
    "autoStore": true
}
```

In the preceding configuration, the base profile `my_one_base_profile` (Lines 10-15) includes connection information to be used by the two z/OSMF service profiles, `zosmf_thru_apiml` (Lines 18-24) and `zosmf_direct` (Lines 25-34). Use `zosmf_thru_apiml` to connect to z/OSMF with API ML and `zosmf_direct` to connect to z/OSMF directly.

Use the configuration example to connect with z/OSMF using API ML's SSO feature:

1. Add a base profile that includes the information that API ML needs to connect to z/OSMF, like the host and port.
    - Include the `port` property and value to avoid entering the port number manually when logging into API ML.
2. Add a service profile for z/OSMF that includes the `basePath` property.
    - The base path indicates the starting point for the API ML connection.
    - No need to include the host and port because these are supplied by the base profile.
3. Log in to API ML.
    - This creates an authentication token that is stored on your computer. The `tokenType` property is also added to your service profile.
4. Issue commands.
    - If you have multiple base profiles in your configuration, use the `--base-profile` option to specify which base profile to use with API ML.

Use the configuration example to connect to z/OSMF directly:

1. Ensure that the base profile includes the information to connect directly to z/OSMF, like the host.
    - Leave the port information as it was set for the API ML.
2. Add a service profile for z/OSMF that includes the `port` property and value.
    - The port indicates the mainframe service. **[is this correct?]** This port number overrides the port in the base profile. 
3. Issue commands.
    - If you have multiple base profiles in your configuration, use the `--base-profile` option to specify which base profile to use for the host.

=======

A scenario might exist where you log in to API ML with SSO, but you also want to access a different service *directly*.

To access the SSO-enabled services, set the `basePath` property for these services, log in to the API ML and issue commands with the `--base-profile` option. The token from your base profile is used for authentication. Remember, your command or service profile must *not* contain username, password, host, or port. (set a default base profile in your config)

To access the other service directly &mdash; and circumvent the API ML &mdash; supply all connection information (username, password, host, and port) on a command or service profile. When you explicitly supply the username and password in a command or service profile, the CLI always uses that connection information instead of the API ML token.

### Accessing services through SSO and a service through API ML but not SSO

You might want to access multiple services with SSO, but also access a service through API ML that is not SSO-enabled.

To perform SSO for the first set of services, log in to API ML and supply the `--base-path` and `--base-profile` on commands. For more information, see [Accessing multiple services with SSO](#accessing-multiple-services-with-sso).

To access the service that is *not* SSO-enabled, explicitly provide your username and password when you issue commands. Using the `--base-path` option ensures that the request is routed to API ML, but the username and password that you provide overrides the credentials in your base profile. This lets you sign in to the individual service.

[def]: #specifying-a-base-path-with-zowe-v2-profiles
