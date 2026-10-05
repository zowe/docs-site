# Testing connections to z/OSMF

Optionally, issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs.

Refer to the following sections for instructions on how to connect to z/OSMF with different types of profiles.

**Important!** By default, the server certificate is verified against a list of Certificate Authorities (CAs) trusted by Mozilla. This handshake ensures that the CLI can trust the server. You can append the flag `--ru false` to the following commands to bypass the certificate verification against CAs. If you use the `--ru false` flag, ensure that you understand the potential security risks of bypassing the certificate requirement at your site. For the most secure environment, system administrators configure a server keyring with a server certificate signed by a Certificate Authority (CA). For more information, see [Working with certificates](../user-guide/cli-using-working-certificates.md).

### Without a profile

Verify that your CLI instance can communicate with z/OSMF:

```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password>
```

- `<host>`

    Specifies the host.

- `<port>`

    Specifies the port.

- `<username>`

    Specifies the username.

- `<password>`

    Specifies the password.

### Default profile

After you create a profile in a configuration (such as a [global team configuration file](../user-guide/cli-using-initializing-team-configuration/)), verify that you can use your *default profile* to communicate with z/OSMF:

```
zowe zosmf check status
```

### Specific profile

After you create a specific profile in a configuration (such as a [global team configuration file](../user-guide/cli-using-initializing-team-configuration/)), verify that you can use a *specific profile* to communicate with z/OSMF:

```
zowe zosmf check status --zosmf-profile <profile_name>
```

- `<profile name>`

    Specifies the name of the profile.

The commands return a success or failure message and display information about your z/OSMF server, such as the z/OSMF version number. Report failures to your systems administrator and use the information for diagnostic purposes.