# Secure Credential Store Plug-in for Zowe CLI

The Secure Credential Store (SCS) Plug-in for Zowe CLI lets you store your credentials securely in the credential manager of your operating system. The plug-in invokes a native Node module, named Keytar, that manages user IDs and passwords in a credential manager.

  - [Use Cases](#use-cases)
  - [Commands](#commands)
  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Using](#using)

## Use Cases

Zowe CLI stores credentials in plaintext by default. Use the SCS plug-in to store credentials more securely and prevent your username and password from being compromised as a result of a malware attack or unlawful actions by others.

## Commands

For detailed command, actions, and option documentation for this plug-in, see our Web Help (available online or as PDF or ZIP):

- <a href="../web_help/index.html" target="_blank">Browse Online</a>
- <a href="../zowe_web_help.zip">Download (ZIP)</a>
- <a href="../CLIReference_Zowe.pdf">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

**Note:** Existing user profiles are not updated automatically. See "Securing your Credentials" in the following section for details.

## Using

The plug-in introduces a new command group named `zowe scs` that you can use to enable/disable the plug-in and update existing user profiles.

### Securing your credentials
User profiles that you create *after* installing the plug-in are stored securely.

If you created user profiles prior to installing the SCS plug-in,


that converts the profile into securely-stored profiles. Issue the following command:

```
zowe scs update
```

**Example: Credentials Secured with SCS plug-in**

The following is an example of securely stored credentials in a user profile configuration file:

```yaml
type: zosmf
host: test
port: 1234
user: 'managed by @zowe/secure-credential-store'
pass: 'managed by @zowe/secure-credential-store'
rejectUnauthorized: false
```

**Example: Credentials secured with default credential manager**

The following is an example of credentials that are stored with the *default* credential manager:

```yaml
type: zosmf
host: test
port: 1234
user: USERNAME
pass: PASSWORD
rejectUnauthorized: false
```

### Deactivating the plug-in

If you do not want to use CA Secure Credential Store Plug-in for Zowe CLI, choose one of the following methods to deactivate the plug-in:

Uninstall the Plug-in
Issue the zowe plugins uninstall [plugin] command to delete the plug-in from your computer.
When you uninstall the plug-in, existing profiles become invalid and you have to recreate them. For more information, see Create CLI Profiles.
If you uninstall the plug-in that was installed using the Windows installation wizard, you need to reset the value of the credential-manager property manually.

Reset the Configuration of Credential Manager
Issue the reset command to reset the value of the credential manager configuration to default and deactivate the plug-in.