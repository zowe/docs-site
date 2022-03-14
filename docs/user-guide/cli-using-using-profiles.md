# Using profiles

As a system programmer, profiles let you store configuration details for reuse, and for logging in to authentication servers such as API Mediation layer. Create a profile that contains your username, password, and connection details for a mainframe service, then use that profile to avoid typing the information on every command. Switch between profiles to quickly target different mainframe subsystems. There are two main types of profiles:

- **Service profiles:** [Service profiles](#service-profiles) let you store connection information for specific mainframe service, such as IBM z/OSMF. Plug-ins can introduce other service profile types, such as the `cics` profile to connect to IBM CICS.

- **Base profiles:** [Base profiles](#base-profiles) let you store connection information for use with one or more services. Your service profiles can pull information from- base profiles as needed, so that you can specify a common username and password once. The base profile can optionally store tokens to connect to Zowe API Mediation Layer, which improves security by enabling Multi-Factor Authentication (MFA) and Single Sign-on (SSO).

- **Team profiles:** [Team profiles](./cli-using-configuring-global-profiles.md) simplify profile management by letting you edit, store, and share mainframe configuration details in one location. You can use a text editor to populate global profiles with connection details for your mainframe services.

**Tips:**

- You can have multiple service profiles and multiple base profiles.
- Profiles are **not** required. You can choose to specify all connection details for every command.
- Profile values are stored on your computer in plaintext in `C:\Users\<yourUsername>\.zowe\profiles` (Windows) or `~/.zowe/profiles` (Mac/Linux).

**Important:** With the introduction of [team profiles](cli-using-configuring-global-profiles.md), the Secure Credential Store (SCS) Plug-in is deprecated. The `zowe scs` and `zowe config` command groups are obsolete. Secure credential encryption is now included in the core CLI. The CLI prompts you to enter the username and password securely by default. Commands in the `zowe config` command group now let you manage security for any option value.


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

## Profile best practices

According to [order of precedence](#how-command-precedence-works), base profiles are used as a fallback for service profiles. This means that after you create a base profile, you might need to update your service profiles to remove username, password, host, and port. Otherwise, commands will use the information stored in your service profile and will ignore your base profile definition.

## Testing connection to z/OSMF

Optionally, issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs.

**Important!** By default, the server certificate is verified against a list of Certificate Authorities (CAs) trusted by Mozilla. This handshake ensures that the CLI can trust the server. You can append the flag `--ru false` to the following commands to bypass the certificate verification against CAs. If you use the `--ru false` flag, ensure that you understand the potential security risks of bypassing the certificate requirement at your site. For the most secure environment, system administrators configure a server keyring with a server certificate signed by a Certificate Authority (CA). For more information, see [Working with certificates](#working-with-certificates).

### Without a profile

Verify that your CLI instance can communicate with z/OSMF:

```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password>
```

### Default profile

After you [create a profile](#using-profiles), verify that you can use your *default profile* to communicate with z/OSMF:

```
zowe zosmf check status
```

### Specific profile

After you [create a profile](#using), verify that you can use *a specific profile* to communicate with z/OSMF:

```
zowe zosmf check status --zosmf-profile <profile_name>
```

The commands return a success or failure message and display information about your z/OSMF server, such as the z/OSMF version number. Report failures to your systems administrator and use the information for diagnostic purposes.
