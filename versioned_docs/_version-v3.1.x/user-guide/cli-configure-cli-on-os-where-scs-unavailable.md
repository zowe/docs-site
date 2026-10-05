# Configuring Zowe CLI where secure credential storage is not available

By default, Zowe CLI attempts to store sensitive information and credentials in the operating system’s credential storage. If the information cannot be stored securely, Zowe CLI displays an error when you attempt to initiate [team configuration](../appendix/zowe-glossary#team-configuration).

:::info Required role: systems administrator
:::

## Team configuration

In team configuration, team profiles are stored in the `zowe.config.json` file and user profiles are saved in `zowe.config.user.json`.

By default, every configuration file includes an `autoStore` property that is set to automatically store values that are prompted from the user. The value that you enter when prompted is stored for future commands to use to avoid re-entering information repeatedly.

This can cause potential problems when secure credential storage is not available.

If Zowe CLI cannot find the value for a user ID or password, for example, it prompts the user for that information and then stores the information securely when secure storage is available.

In cases where secure storage is not possible, and the `autoStore` property is set to `true`, the credentials are saved as text in the applicable configuration file.

## Stopping automatic storage of prompted values

To stop storing information prompted by Zowe CLI:

1. Use a text editor to open the configuration file used by your commands.

    For project configuration, locate the file in your project directory. For global configuration, the file is found in the `ZOWE_CLI_HOME` directory.

2. Navigate to the `autoStore` property and set the value to `false`:

    ```
        },
        "autoStore": false
    }
    ```
    Zowe CLI is configured to prompt for all missing values on all commands that you issue.