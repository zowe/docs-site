# Editing team configurations

After you [initialize team configuration](../user-guide/cli-using-initializing-team-configuration), the newly created team profiles need additional details before they can be shared and applied in your environment. This could include information such as a port number or user credentials.

You might also need to modify the configuration file to [create new profiles](../user-guide/cli-using-creating-profiles.md) for accessing mainframe services.

## Adding, modifying team profiles

To define additional mainframe services and other profiles in an existing global team configuration file:

1. Open the `~/.zowe/zowe.config.json` file in a text editor or an IDE (such as Visual Studio Code) on your computer.

2. Edit the file by adding to or modifying the profiles listed in the profiles object.

    Each profile contains connection and other frequently needed information for accessing various mainframe services, as in the following example:

    ```
    {
        "$schema": "./zowe.schema.json",
        "profiles": {
            "zosmf": {
                "type": "zosmf",
                "properties": {
                    "port": 443
                }
            },
            "global_base": {
                "type": "base",
                "properties": {
                    "host": "example1.com"
                },
                "secure": [
                    "user",
                    "password"
                ]
            }
        },
        "defaults": {
            "zosmf": "zosmf",
            "base": "global_base"
        },
    }
    ```
