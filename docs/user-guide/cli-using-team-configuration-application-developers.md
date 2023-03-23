# Team configuration for application developers

As an application developer or Zowe CLI user, you want to manage your connection details efficiently and in one location.

That could mean relying on a team configuration file, or creating your own *user* configuration file.

To create your own user configuration, start with a global team configuration file that you have created or was provided to you. In this way, a single global configuration can become the basis for multiple user-specific configurations that are created with modifications tailored to particular requirements.

## Initializing user configuration

As an application developer, you can optionally generate a *user* configuration file that overrides the values defined in the global `zowe.config.json` file. (See [How Zowe CLI uses configurations](../user-guide/cli-using-understand-profiles-configs.md) for more information.)

Follow these steps:

1. To generate a team configuration file (`zowe.config.json`) that you can use globally, issue the following command:

    ```
    zowe config init --global-config
    ```

2. To generate the global user profile configuration file `zowe.config.user.json`, issue the following command:

    ```
    zowe config init --global-config --user-config
    ```

    In your *user* file (`zowe.config.user.json`), observe that the profiles do not have properties and the "defaults" object is empty, as illustrated in the following example. Use a text editor or IDE (such as Visual Studio Code) to add your connection details as properties here to override properties in `zowe.config.json`, or to add new connections.

    ```{
        "$schema": "./zowe.schema.json",
        "profiles": {
            "zosmf": {
                "type": "zosmf",
                "properties": {},
                "secure": []
            },
            "tso": {
                "type": "tso",
                "properties": {},
                "secure": []
            },
            "ssh": {
                "type": "ssh",
                "properties": {},
                "secure": []
            },
            "base": {
                "type": "base",
                "properties": {},
                "secure": []
            }
        },
        "defaults": {},
        "autoStore": true
    }

    ```

## Editing team configurations

After creating a team configuration file, you can define additional mainframe services, and other profiles, to the configuration.

Follow these steps:

1. Open the `~/.zowe/zowe.config.json` file in a text editor or an IDE (such as Visual Studio Code) on your computer. 

2. Edit the file by adding or modifying the profiles stored there.

    The profiles object contains connection and other frequently needed information for accessing various services, as in the following example:

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
            "base": {
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
            "base": "base"
        },
    }
    ```
