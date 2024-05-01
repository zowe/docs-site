# Initializing team configuration

Team configuration is a profile management method introduced in Zowe Version 2.

:::info Required roles: Security administrator, DevOps architect
:::

Under this method, team-specific profiles are saved in the `zowe.config.json` configuration file and user-specific profiles in the `zowe.config.user.json` configuration file. Team configuration profile management can be applied *globally* and/or *per project*, depending on the development project. See [Team configurations](../user-guide/cli-using-using-team-profiles.md) for more information.

Use one of the following methods to initialize global team configuration. These instructions show how to create a configuration file that you can later open in a text editor or IDE (such as Visual Studio Code) to add or modify profiles.

:::note

If API Mediation Layer is running on your site, [Connecting profiles to API Mediation Layer](#connecting-profiles-to-api-mediation-layer) is the recommended method to use to initialize team configuration.

:::

## Creating a global team configuration file

1. To initialize a global team configuration file, open a command line window and issue the following command:

    ```
    zowe config init --global-config
    ```

2. Respond to subsequent prompts with a username and password for a mainframe service such as z/OSMF.

    The `zowe config init` command ensures that your credentials are stored securely on your computer by default.

    When the credentials are received, the `zowe.config.json` team configuration file is added to the local `.zowe` directory. Use a text editor or IDE to add or modify connection details for your mainframe services.

    :::note
    
    Run the `zowe config init --global-config` command again after installing a new plug-in to add the plug-in profile to the global configuration file. See [Creating team plug-in profiles](#creating-team-plug-in-profiles) for information.

    :::

3.  To test access to z/OSMF, issue a Zowe CLI command.

    For example, list all data sets under your user ID:
    ```
    zowe zos-files list data-set "IBMUSER.*"
    ```

    - `IBMUSER`

        Specifies your user ID.

    A list of data sets is returned, indicating Zowe CLI is successfully configured to access a z/OSMF instance.

    If the CLI returns an error message, verify that you have access to the target system. Examine the configuration files in a text editor to check that the entered information is correct.

:::info Important

After the configuration file is in place (by using either the `zowe config init` command or a file provided by a system administrator), the `zowe profiles` commands used in Zowe V1 no longer function. Zowe CLI returns errors when deprecated profile commands are issued.

:::

## Creating team plug-in profiles

After the `zowe.config.json` team configuration file is created and new plug-ins are installed, run the `zowe config init` (or `zowe config auto-init`, if using the API ML) command again to add the plug-in profiles to the configuration file.

To create a team plug-in profile:

1. Install a new plug-in.

    For example, open a command line window and issue the following command to install the [IBM CICS Plug-in](../user-guide/cli-cicsplugin.md) from an npm online registry:

    ```
    zowe plugins install @zowe/cics-for-zowe-cli
    ```

    :::note
    
    If the `zowe.config.json` file has not yet been created in the `.zowe` directory, see [Creating a global team configuration file](#creating-a-global-team-configuration-file).

    :::

2. Issue the `zowe config init --global-config` or `zowe config auto-init --global-config` command.

    This adds a plug-in profile to the configuration file in the `.zowe` home directory.

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

    The plug-in profile has been successfully added to the `zowe.config.json` file in the `.zowe` home directory.

    :::note
    
    To add plug-in profiles to a configuration file in the current working directory, enter the base command without the `--global-config` option: `zowe config init`.

    :::

## Connecting profiles to API Mediation Layer

You can use profiles to connect to the API Mediation Layer. This more efficient way to connect to the mainframe allows you to specify a host and port only once on a base profile instead of multiple host-and-port combinations across several service profiles.

To set up the `zowe.config.json` file to automatically access the services that are registered to the API ML and support Single Sign-On:

1. Open a command line window and issue the following command:

    ```
    zowe config auto-init --global-config
    ```

    :::note

    To add a profile to a configuration file in the current working directory, enter the base command without the `--global-config` option: `zowe config auto-init`.

    :::

2. Respond to subsequent CLI prompts with the following information:

    - The host name and port to your API ML instance.
    
    - Your username and password.

    A default base profile is added to the configuration file in the `.zowe` home directory.

    :::note

    To use certificates instead of basic authentication (such as user ID and password), you can specify the options `--cert-file` and `--cert-key-file` on the base command (`zowe config auto-init`). For more information on how to log in with certificates, see [Integrating with API Mediation Layer](../user-guide/cli-using-integrating-apiml).
    
    :::



