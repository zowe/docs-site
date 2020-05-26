# Extension and Plug-ins for Zowe Explorer

This is a placeholder for a meta description. Includes information about how extensions/plug-ins for Zowe Explorer work, how to develop your own extension for ZE, and a list of existing extensions like SCS.
 
## Enabling Secure Credential Store with Zowe Explorer

You can now use the Secure Credential Store plug-in for Zowe CLI in the Zowe Explorer extension. The Secure Credentials Store plug-in lets you store your credentials securely. You can use the plug-in in the following ways:

* [Use the plug-in with Zowe Explorer](#using-secure-credential-store-with-zowe-explorer)
* [Use the plug-in with Zowe CLI and Zowe Explorer](#using-secure-credential-store-with-zowe-cli-and-zowe-explorer)

   For more information about Secure Credential Store plug-in for Zowe CLI, see [Secure Credential Store Plug-in for Zowe CLI](cli-scsplugin.md).

### Prerequisites

Ensure that you meet the following prerequisites before you can use the plug-in both with Zowe CLI and Zowe Explorer:

* [Install Zowe CLI](cli-installcli.md)
* [Install Secure Credential Store for Zowe CLI](cli-scsplugin.md)

### Using Secure Credential Store with Zowe Explorer

Activate the Secure Credential Store plug-in in Zowe Explorer.

**Follow these steps:**

1. Open Zowe Explorer.
2. Navigate to the VSCode settings.
3. Open Zowe Explorer Settings.
4. Add the **Zowe-Plugin** value to the `Zowe Security: Credential Key` entry field.
5. Restart VSCode.
6. Create a profile.

Your Zowe Explorer credentials are now stored securely.

### Using Secure Credential Store with Zowe CLI and Zowe Explorer

Activate the Secure Credential Store plug-in using Zowe CLI and Zowe Explorer.

**Follow these steps:**

1. (Optional) If you have existing profiles, issue the following command, using Zowe CLI:

   ```shell
   zowe scs u
   ```

2. Open Zowe Explorer.
3. Navigate to the VSCode settings.
4. Open Zowe Explorer Settings.
5. Add the **Zowe-Plugin** value to the `Zowe Security: Credential Key` entry field.
6. Restart VSCode.

The credentials of your newly created or existing profiles are now stored securely.