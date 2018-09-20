# Storing credentials securely

Applications based on Imperative CLI Framework manage sensitive data. For example, mainframe usernames and passwords. When users create profiles, the application must retain the information in the profiles for future use. Teh framework provides a secure credential storage mechanism to help ensure that user information is protected in your application.

## Keychain manager - keytar
Imperative CLI Framework uses the keytar Node module to implement security. Ensure that keytar meets security standards for your organization:

https://github.com/atom/node-keytar

**Note:** keytar is an optional dependency of Imperative CLI Framework.

### Considerations for Linux users
Linux users must provide additional configuration with the `libsecret` Node module before keytar can function with Imperative CLI Framework. If you use Linux, issue one of the following commands to install `libsecret`:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`
## Default implementation
Imperative CLI Framework implements keytar functionality in the following files. We recommend that you review the code comments to understand the mechanism:

- `[DefaultCredentialManager.ts]`: The default keytar security implementation.
- `[CredentialManagerFactory.ts]`: A wrapper class that controls access to the credential manager. All calls to the credential manager must be done through this class.
- `[ICredentialManagerConstructor.ts]`: This interface verifies that a credential manager class adheres to required arguments. If you implement a custom credential manager, refer to the code comments and ensure that your credential manager satisfies this interface.

**Note:** The default credential manager has limitations on the amount of data that can be stored in a single property due to restrictions enforced by some operating systems. Consider this restriction when deciding whether to implement a custom credential manager or use the default.

## Implementing custom credential managers
When keytar does not meet the security requirements for your organization, you can override the default implementation with a credential storage mechanism of your choice.

You override the default security manager with the file named `IImperativeOverrides.ts`. Use one of the following methods to override the default manager:

- Provide a new class directly in `IImperativeOverrides.ts`.
- Specify the absolute or relative location of a new class module that you create. `IImperativeOverrides.ts` contains examples for the format of an override module file.