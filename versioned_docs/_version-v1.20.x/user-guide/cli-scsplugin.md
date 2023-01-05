# Secure Credential Store Plug-in for Zowe CLI

The Secure Credential Store (SCS) Plug-in for Zowe CLI lets you store your credentials securely in the credential manager of your operating system. The plug-in invokes a native Node module, [keytar](https://github.com/atom/node-keytar), that manages user IDs and passwords in a credential manager.

  - [Use Cases](#use-cases)
  - [Commands](#commands)
  - [Software requirements](#software-requirements)
  - [Installing](#installing)
  - [Using](#using)

## Use Cases

Zowe CLI stores credentials (mainframe username and password) in plaintext on your computer by default. You can use the SCS plug-in to store credentials more securely and prevent your credentials from being compromised as a result of a malware attack or unlawful actions by others.

## Commands

For detailed command, actions, and option documentation for this plug-in, see our Web Help (available online or as PDF or ZIP):

- <a href="/v1.20.x/web_help/index.html" target="_blank">Browse Online</a>
- <a href="/v1.20.x/zowe_web_help.zip" target="_blank">Download (ZIP)</a>
- <a href="/v1.20.x/CLIReference_Zowe.pdf" target="_blank">Download (PDF)</a>

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

**Note:** Existing user profiles are *not* automatically updated to securely store credentials.

## Using

The plug-in introduces a new command group, `zowe scs`, that lets you update existing user profiles and enable/disable the plug-in.

### Securing your credentials

User profiles that you create *after* installing the plug-in will automatically store your credentials securely.

To secure credentials in existing user profiles (profiles that you created prior to installing the SCS plug-in), issue the following command:

    zowe scs update

Profiles are updated with secured credentials.

**Example: Secure credentials**

The following is an example of securely stored credentials in a user profile configuration file:

```yaml
type: zosmf
host: test
port: 1234
user: 'managed by @zowe/secure-credential-store-for-zowe-cli'
password: 'managed by @zowe/secure-credential-store-for-zowe-cli'
rejectUnauthorized: false
```

**Example: Default credential management**

The following is an example of credentials that are stored with the *default* credential manager:

```yaml
type: zosmf
host: test
port: 1234
user: USERNAME
password: PASSWORD
rejectUnauthorized: false
```

### Deactivating the plug-in

If you do not want to use the SCS Plug-in for Zowe CLI, choose one of the following methods to deactivate the plug-in:

**Uninstall the Plug-in**

Issue the `zowe plugins uninstall @zowe/secure-credential-store-for-zowe-cli` command to delete the plug-in from your computer.

When you uninstall the plug-in, existing profiles become invalid and you must recreate them. For more information, see [Using profiles](cli-usingcli#using-profiles).

**Reset the Configuration of Credential Manager**

Issue the `zowe config reset CredentialManager` command to reset the value of the credential manager configuration to default, which deactivates the plug-in.
