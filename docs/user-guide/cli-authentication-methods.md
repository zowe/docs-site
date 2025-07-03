# Zowe CLI authentication methods

Zowe CLI supports multiple authentication methods including basic authentication, tokens for single sign-on, client certificates, and multi-factor authentication. 

Configure the authentication method you want to use across multiple mainframe services in a [base profile](../appendix/zowe-glossary.md#base-profile) stored in your configuration file. 

:::note Notes

- To apply your authentication method to a specific service, define the authentication type in the [service profile](../appendix/zowe-glossary.md#service-profile) of your choice.

- If you switch to a different authentication type, remove the previous authentication method from the profile it was stored in before.
:::

## Using basic authentication

The advantage of basic authentication (using a username and password) is the simplicity of set up: In most cases you can use Zowe CLI (or Zowe Explorer) to connect to mainframe services without additional configuration on the server. Other authentication methods would likely require further configuration.

Basic authentication is the default authentication method defined in the default base profile when you issue the `zowe config init` command in Zowe CLI to create your team configuration.

If you change your authentication method and want to switch back to using basic authentication:

1. Use a text editor to update the `zowe.config.json` file to define the authentication as basic authentication (see the highlighted lines) in the base profile:
   ```json showLineNumbers
         "project_base": {
               "type": "base",
               "properties": {...},
               "secure": [
   // highlight-start
                  "user",
                  "password"
   // highlight-end
               ]
         }
   ```

    :::note
    The base profile name (see Line 1) can be different in your configuration file. The preceding example shows the default name for a project team config. The default for a global team config is `global_base`. To check your base profile name, issue the `zowe config list defaults` command in the command terminal.
    :::

2. For Zowe CLI, issue commands to set the values for `user` and `password` in the end user's personal computer:

   ```
   zowe config set profiles.project_base.properties.user
   ```

   ```
   zowe config set profiles.project_base.properties.password
   ```
   Zowe CLI prompts for these values and masks them as they are typed. By default, these values are stored in the PC's secure vault. 
   
   If you are using a **global** team configuration file (located in your home directory), add `--global-config` to the end of the command.

## Using a token for Single Sign-On (SSO)

SSO lets you use a single token to access all your mainframe services through API Mediation Layer. Tokens provide more security because they have limited lifespans and can be immediately revoked when needed.

SSO is configured with Zowe API ML, which generates an authentication token to access the mainframe. To log in to API ML, use either a username and password or a client certificate. To use a service through API ML, update its service profile to include its API base path.

### Logging in with username and password

Provide your username and password to generate a token and log in to API ML:

1. Log in to API ML:

    ```
    zowe auth login apiml
    ```
    For users who do not have a base profile that has been used to log into API ML, this creates a new base profile that is set as the default base profile in your configuration file.

    For users who have a default base profile already used to log into API ML, this updates the existing default base profile with a new token. 
 
2. When prompted, enter the following information:
    - Host
    - Port for the API ML instance
    - Username
    - Password (can be a PIN concatenated with a second factor for [MFA](#using-multi-factor-authentication-mfa))

    <br/>A base profile is created or updated with your token, which is stored on your computer in place of a username and password:
    
   ```json
         "project_base": {
            "type": "base",
            "properties": {
                  // highlight-start
                "tokenType": "apimlAuthenticationToken",
                   // highlight-end
                ...
            },
            "secure": [
                  // highlight-start
                "tokenValue"
                   // highlight-end
            ]
        }
   ```  
   With token authentication set in your base profile, you can omit your username and password when you issue commands.

    If you do not want to store the token on your PC, append the `--show-token` option to the `login` command in Step 1. This returns the token value in your terminal for you to use on subsequent commands.

    If you already created a base profile, you might not be prompted for the host and port.

3. If you do not have a profile for the service, respond to Zowe CLI prompts for connection information to create a profile for the service.

    :::tip
    - To establish a base path, see instructions for [Zowe team configuration](#specifying-a-base-path-with-zowe-team-configuration) or [Zowe V1 profiles](#specifying-a-base-path-with-zowe-v1-profiles).
    :::

    If you already have a profile in your configuration for the service you want to connect to, use a text editor to open the applicable configuration file and replace the `port` property with a `basePath` property to enable the use of API ML.

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

     If you use the `--show-token` option with the `login` command in Step 1, you must manually supply the token on each command using the `--token-value` option. For example:

     ```
     zowe zos-files list data-set <searchPattern> --token-value <123>
     ```
    - `data-set <searchPattern>`

        Specifies the data set search criteria (for example, `<IBMUSER.*>`)
    - `--token-value <123>`

        Specifies the token value supplied in Step 2.

:::note notes

* Tokens expire after a period of time defined by your security administrator. When a token expires, you must log in to API ML again to get a new token.
* If you omit connection details from a service profile, such as a `zosmf` profile, the CLI uses the information from your base profile.
* You can choose to specify all connection details on a service profile and connect directly to the service. Routing through API ML is not required.

:::

### Logging in with a client certificate

Use a client certificate to generate a token and log in to API ML:

```
zowe auth login apiml --host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Key File Path>
```

- `--host <APIML Host>`

    Specifies the API ML host.
- `--port <APIML Port>`
    
    Specifies the API ML port.
- `--cert-file <PEM Public Certificate Path>`

    Specifies the path for the PEM public certificate.
- `--cert-key-file <PEM Private Key File Path>`

    Specifies the path to the PEM private key.

Zowe CLI obtains a security token from API ML and adds that token to the base profile in the applicable configuration file.

   ```json
         "project_base": {
            "type": "base",
            "properties": {
                  // highlight-start
                "tokenType": "apimlAuthenticationToken",
                   // highlight-end
                ...
            },
            "secure": [
                  // highlight-start
                "tokenValue"
                   // highlight-end
            ]
        }
   ``` 

:::note

If you have multiple types of configuration files and base profiles, see [How configuration files and profiles work together](../user-guide/cli-using-understand-profiles-configs.md#how-configuration-files-and-profiles-work-together) to learn which configuration and profile would be used to store the API ML token. To learn how to log in or out of a base profile, see [Specifying a base profile](../user-guide/cli-using-integrating-apiml.md#specifying-a-base-profile).

:::

### Logging out

Log out to remove the token from your base profile and prompt the API ML to invalidate the token:

```
zowe auth logout apiml
```

This command sends a request to the API ML to invalidate the token. Log in again to obtain a new token.

If you used the `--show-token` option and never stored your token in profile, add `--token-value <123>` (where `<123>` is the value of the token) to this command to invalidate the token. 

### Accessing a service through API ML

To access mainframe services with SSO through API ML using the token in your base profile, use the `basePath` property in your service profile to indicate the base path of the API on the API ML instance that you want to access.

To establish a base path, see instructions for [Zowe team configuration](#specifying-a-base-path-with-zowe-team-configuration).

:::note

Ensure that you *do not* provide username, password, host, or port directly on the service commands or profiles. Supplying those options causes the CLI to ignore the API ML token in your base profile and access the service directly.

:::

#### Specifying a base path with Zowe team configuration

Use the following steps to specify a base path with Zowe [team configuration](../appendix/zowe-glossary.md#team-configuration):

1. Note the complete path for a service registered to API ML.

    For example:

    ```
    https://myapilayerhost:port/<yourServiceId>/api/v1

    ```

    The format of base paths can vary based on how API ML is configured at your site.

2. Using the example in Step 1, access the API ML instance by creating or updating a [service profile](../user-guide/cli-using-using-team-profiles.md#zowe-cli-profile-types), or issuing a command, with the base path value of `<yourServiceId>/api/v1`. Your service profile uses the token and credentials stored in your default base profile.

    To create or update a service profile with the preceding base path in a **project** team configuration file:

    ```
    zowe config set profiles.<yourService>.properties.basePath <basePath> 
    ```

    If you are using a **global** team configuration file (located in your home directory), add `--global-config` to the end of the command.

    Commands issued with this profile are routed through API ML to access an appropriate instance of your service.

#### Specifying a base path with Zowe V1 profiles

See the [Integrating with API Mediation Layer](https://67c89aa5af702da5881fc564--zowe-docs-master.netlify.app/v1.28.x/user-guide/cli-usingcli#integrating-with-api-mediation-layer) Zowe V1 documentation.

## Using client certificates

Certificates are a long lasting type of authentication, rather than a password or token that can expire in hours, days, or months. A certificate is authenticated by matching a public and private key.

To use a client certificate for authentication:

1. Specify the path to the certificate file in the relevant profile :

   ```
   zowe config set profiles.base.properties.certFile <certPath> 
   ```

   - `<certPath>`
   
      Specifies the location on your computer where the certificate is stored.
      
    If you are using a **global** team configuration file (located in your home directory), add `--global-config` to the end of the command.

2. Configure the file path to the private key:
   ```
   zowe config set profiles.base.properties.certKeyFile <certKeyPath> 
   ```
      - `<certKeyPath>`
   
      Specifies the location on your computer where the private key is stored.


:::tip
Add the `--secure` option to the preceding commands to avoid saving certificate file paths as plain text in your configuration file.
:::

## Using multi-factor authentication (MFA)

MFA adds an extra layer of security because it requires users to supply their password and an additional verification method.

In Zowe, MFA can apply to basic authentication and single sign-on when logging in with username and password.

It is important to understand how MFA functions at your site in order to set it up. Typically, a user needs an authenticator app to obtain a temporary code that is typically appended to, or replaces, the password. The system administrator must configure the application so it is set up for a Zowe user.

:::note

MFA codes are different from SSO tokens. SSO tokens are an alternative to passwords and last longer than a temporary MFA code, which is combined with a password.

:::