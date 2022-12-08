# Initializing team configuration

Use one of the following methods to initialize team configuration.

**Note:** If API Mediation Layer is running on your site, [Connecting profiles to API Mediation Layer](#connecting-profiles-to-api-mediation-layer) is the recommended method to use to initialize team configuration.

## Creating team profile configuration files

1. Issue the following command:

    ```
    zowe config init --global-config
    ```

2. Respond to subsequent prompts with a username and password for a mainframe service such as z/OSMF.

    The `zowe config init` command ensures that your credentials are stored securely on your computer by default.

    When the credentials are received, the `zowe.config.json` team configuration file is added to the local `.zowe` directory. Use a text editor or IDE such as Visual Studio Code to add or modify connection details for your mainframe services.

    **Note:** Run the `zowe config init --global-config` command again after installing a new plug-in to add the plug-in profile to the global configuration file. See [Creating team plug-in profiles](#creating-team-plug-in-profiles) for information.

3.  (Optional) Issue a Zowe CLI command to test access to z/OSMF.

    For example, list all data sets under your user ID by entering your information in the following example command:
    ```
    zowe zos-files list data-set "IBMUSER.*"
    ```

    A list of data sets is returned, indicating Zowe CLI is successfully configured to access a z/OSMF instance.

    If the CLI returns an error message, verify that you have access to the target system. Examine the configuration files in a text editor to check that the entered information is correct.

**Important:** After the configuration file is in place (by using either the `zowe config init` command or a file provided by a system administrator), the `zowe profiles` commands used in Zowe v1 no longer function. Zowe CLI returns errors when deprecated profile commands are issued.

## Creating team plug-in profiles

After the `zowe.config.json` team configuration file is created and new plug-ins installed, run the `zowe config init` (or `zowe config auto-init`, if using the API ML) command again to add the plug-in profiles to the configuration file.

1. Install a new plug-in.

    For example, run the following command to install the [IBM CICS Plug-in](../user-guide/cli-cicsplugin.md):

    ```
    zowe plugins install @zowe/cics-for-zowe-cli
    ```

    **Note:** If the `zowe.config.json` file has not yet been created in the `.zowe` directory, see [Creating team profile configuration files](#creating-team-profile-configuration-files).

2. Run the `zowe config init --global-config` or `zowe config auto-init --global-config` command.

    This adds a plug-in profile to the configuration file in the `.zowe` root directory.

3. Open the `zowe.config.json` file and confirm the plug-in profile is included.
    
    In the example from Step 1, the profile information displays similarly to the example below:

    ```
    "cics": {
            "type": "cics",
            "properties": {
                "port": 123
            },
            "secure": []
        }
    ```

    The plug-in profile has been successfully added to the `zowe.config.json` file in the `.zowe` root directory.

    **Note:** To add plug-in profiles to a configuration file in the current working directory, enter the base command without the option: `zowe config init`.

## Connecting profiles to API Mediation Layer

If you are using the API Mediation Layer, set up the `zowe.config.json` file to automatically access the services that are registered to the API ML and support Single Sign-On.

1. Run the following command:

    ```
    zowe config auto-init --global-config
    ```

2. Respond to subsequent CLI prompts with the following information:

    - The host name and port to your API ML instance.
    
    - Your username and password.

    A default profile is added to the configuration file in the `.zowe` root directory.

**Note:** To add a profile to a configuration file in the current working directory, enter the base command without the option: `zowe config init`.

**Using Certificates:**

If using certificates to authenticate, specify the details for the certificates by modifying the following example command:

```
zowe auth login apiml --cert-file "/path/to/cert/file" --cert-key-file "/path/to/cert/key/file"
```
