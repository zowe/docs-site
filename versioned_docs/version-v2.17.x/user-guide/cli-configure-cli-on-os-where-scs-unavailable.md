# Configure Zowe CLI on operating systems where the Secure Credential Store is not available

By default, Zowe CLI attempts to store sensitive information and credentials in the operating system’s credential manager. When the information cannot be stored securely, Zowe CLI displays an error when you attempt to create V1 style profiles or a V2 configuration. The actions that are required to disable secure credential management differ depending on the type of configuration being used.

## V1 profiles

Existing V1 profiles will continue to function properly. However, it will not be possible to create new profiles without disabling secure credential management. To disable secure credential management for V1 profiles:

1. Navigate to the `.zowe/settings` directory.
2. Modify the `imperative.json` file by replacing the Credential Manager override value to the following:
    ```
    "CredentialManager": false
    ```
3. Save the changes.

## Team configuration

Team configuration is stored in `zowe.config.json`.

Team configuration can be created without access to the Secure Credential Store. However, team configuration does not store sensitive user information on the system. Subsequent commands prompt for the user’s sensitive information when it not provided on the command line, and will attempt to save it with the new Auto Store functionality. Users may experience errors when Auto Store cannot save sensitive information securely. To mitigate this error, disable the Auto Store functionality by changing the value of the autoStore property from `true` to `false` in the `zowe.config.json` or `zowe.config.user.json` file.  

**Example:** 

```
    },
    "autoStore": false
}
```