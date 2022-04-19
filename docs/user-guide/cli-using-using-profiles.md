# Using profiles

As a system programmer, profiles let you store configuration details for reuse, and for logging in to authentication servers such as API Mediation layer. Create a profile that contains your username, password, and connection details for a mainframe service, then use that profile to avoid typing the information on every command. Switch between profiles to quickly target different mainframe subsystems. 

## Zowe CLI profile types

Zowe CLI contains the following types of profiles:

- [**Team profiles**](../user-guide/cli-using-using-team-profiles.md) simplify profile management by letting you edit, store, and share mainframe configuration details in one location. You can use a text editor to populate global profiles with connection details for your mainframe services.

    For more information, see [Configuring team profiles](../user-guide/cli-using-using-team-profiles.md).

- [**Service profiles:**](#service-profiles) let you store connection information for specific mainframe service, such as IBM z/OSMF. Plug-ins can introduce other service profile types, such as the `cics` profile to connect to IBM CICS.

- [**Base profiles:**](#base-profiles) let you store connection information for use with one or more services. Your service profiles can pull information from- base profiles as needed, so that you can specify a common username and password once. The base profile can optionally store tokens to connect to Zowe API Mediation Layer, which improves security by enabling Multi-Factor Authentication (MFA) and Single Sign-on (SSO).

### Tips for using Zowe CLI profiles

- You can have multiple service profiles and multiple base profiles.
- Profiles are **not** required. You can choose to specify all connection details for every command.
- Profile values are stored on your computer in plaintext in `C:\Users\<yourUsername>\.zowe\profiles` (Windows) or in `~/.zowe/profiles` (Mac/Linux).

### Important information about team profiles

- With the introduction of [team profiles](../user-guide/cli-using-using-team-profiles.md), the Secure Credential Store (SCS) Plug-in is deprecated. Secure credential encryption is now handled by the the secure array in the `zowe.config.json` file.
- You can convert all of your Zowe CLI and Zowe CLI plug-ins V1 profiles to team profiles by issuing the following command:

    ```
    zowe config convert-profiles
    ```

    **Note:** You can continue using Zowe CLI and Zowe CLI plug-ins V1 profiles with Zowe CLI V2. However, we highly recommend that you implement V2 profiles with Zowe CLI V2.

- Commands in the `zowe config` [command group](../user-guide/cli-using-understanding-core-command-groups.md#config) now let you manage security for any option value.
- The `zowe scs` and `zowe config` command groups were repurposed to work with team profiles.
- Zowe CLI V2 prompts you to enter the username and password securely by default.

## Displaying profile help

Use help to learn about options for creating profiles. For example, for a `zosmf` profile, issue the following command:

```
zowe profiles create zosmf-profile --help
```

## Service profiles

Create profiles that target a specific mainframe service, then use profiles to issue commands. For example, issue the following command (substituting your connection details) to create a `zosmf` service profile named `myprofile123`:

```
zowe profiles create zosmf-profile myprofile123 --host host123 --port port123 --user ibmuser --password pass123
```

Use the profile. For example, issue the following command to list all data sets under the name `ibmuser` on the system that you specified in your profile:

```
zowe zos-files list data-set "ibmuser.*" --zosmf-profile myprofile123
```

**Note:** If you do not specify a profile, your default profile is used. The first profile that your create is your default. You can set a service profile as your default with the `zowe profiles set-default <profileType> <profileName>` command.

## Base profiles

Base profiles store your connection details and provide them to service profiles and commands as needed. The base profile can also contain a token to connect to services through API ML.

For example, if you use the same username and password across multiple services, you can create a base profile with your username and password. After the base profile is created, you can omit the `--username` and `--password` options when you issue commands or use service profiles such as `zosmf` and `tso`. Commands will use the values provided by the base profile. For example, create the base profile:

```
zowe profiles create base <mybaseprofile123> --user <myusername123> --password <mypassword123>
```

The first profile that you create for a service is set as your default profile. When you create subsequent profiles, you can select one as the default with the `zowe profiles set-default <profileType> <profileName>` command.

Use the default profile to issue a command:

```
zowe zos-files list data-set "ibmuser.*" --host myhost123 --port myport123
```

**Note:** If you choose to log in to Zowe API Mediation Layer, a base profile is created for you to store a web token, host, and port.

### Tips for using base profiles

Use the base profile to share option values between services. You might share option values between services in the following situations:
- You have multiple services that share the same username, password, or other value.
- You want to store a web token to access all services through Zowe API Mediation Layer.
- You want to trust a known self-signed certificate or your site does not have server certificates configured. You can define `reject-unauthorized` in the base profile with a value of false to apply to all services. Understand the security implications of accepting self-signed certificates at your site before you use this method.
If you have multiple LPARs and want to share option values only between services that run on the same LPAR, you can use nested profiles to achieve this (see Example 1 below).

## Profile best practices

According to [order of precedence](#how-command-precedence-works), base profiles are used as a fallback for service profiles. This means that after you create a base profile, you might need to update your service profiles to remove username, password, host, and port. Otherwise, commands will use the information stored in your service profile and will ignore your base profile definition.

## Testing connections to z/OSMF

Optionally, issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs.

**Important!** By default, the server certificate is verified against a list of Certificate Authorities (CAs) trusted by Mozilla. This handshake ensures that the CLI can trust the server. You can append the flag `--ru false` to the following commands to bypass the certificate verification against CAs. If you use the `--ru false` flag, ensure that you understand the potential security risks of bypassing the certificate requirement at your site. For the most secure environment, system administrators configure a server keyring with a server certificate signed by a Certificate Authority (CA). For more information, see [Working with certificates](#working-with-certificates).

### Without a profile

Verify that your CLI instance can communicate with z/OSMF:

```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password>
```

### Default profile

After you [create a profile](../user-guide/cli-using-using-profiles.md), verify that you can use your *default profile* to communicate with z/OSMF:

```
zowe zosmf check status
```

### Specific profile


After you [create a profile](../user-guide/cli-using-using-profiles.md), verify that you can use *a specific profile* to communicate with z/OSMF:

```
zowe zosmf check status --zosmf-profile <profile_name>z
```

The commands return a success or failure message and display information about your z/OSMF server, such as the z/OSMF version number. Report failures to your systems administrator and use the information for diagnostic purposes.
