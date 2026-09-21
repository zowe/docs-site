# Initializing user configuration

As an application developer or Zowe CLI user, you can manage your connection details efficiently and in one location.

Typically, that means the use of a team configuration file. An important convenience of team configuration is that it is easier to share connection information. Another advantage (whether you work in a team or are the sole developer in your organization) is that team configuration is optimized to leverage the broadest capabilities of Zowe CLI.

However, there might come a time when applying your own *user* configuration file could make sense.

The necessity of user configuration is rare, and setting up a user configuration file should not be a priority unless there is a specific need for one. For example, user configuration can be helpful when only one user needs access to a highly restricted project.

If you do want to use user configuration, it is advised that you create your `zowe.config.user.json` file after you have a global team configuration `zowe.config.json` file in place.

To learn more about how profiles and different configuration files work, see [How Zowe CLI uses configurations](../user-guide/cli-using-understand-profiles-configs.md).

## Creating user profiles

Generate a *user* configuration file that overrides the values defined in the global `zowe.config.json` file:

1. If you do not already have a global team configuration file, open a command line prompt and issue the following command to generate one:

    ```
    zowe config init --global-config
    ```

    The configuration file `zowe.config.json` is created in the `ZOWE_CLI_HOME` directory.


2. Respond to subsequent prompts to create connection profiles for mainframe services.

3. Generate the global user configuration file:

    ```
    zowe config init --global-config --user-config
    ```

    The configuration file `zowe.config.user.json` is created in the `ZOWE_CLI_HOME` directory.

    When created, the user configuration file contains profiles with no properties and the `defaults` object is empty. Refer to the following example.

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
            "global_base": {
                "type": "base",
                "properties": {},
                "secure": []
            }
        },
        "defaults": {},
        "autoStore": true
    }

    ```

4. Use a text editor or IDE (such as Visual Studio Code) to add your connection details as properties in the `zowe.config.user.json` file to either override the same properties in `zowe.config.json`, or to add new connection details.
