# Initializing user configuration

As an application developer or Zowe CLI user, you can manage your connection details efficiently and in one location.

That could mean relying on a team configuration file, or creating your own *user* configuration file.

To create your own user configuration, start with a global team configuration file that you have created or was provided to you. In this way, a single global configuration can become the basis for multiple user-specific configurations that are created with modifications tailored to particular requirements.

To learn more about how profiles and configuration files work, see [How Zowe CLI uses configurations](../user-guide/cli-using-understand-profiles-configs.md).


**[is there a use case for a team leader to create a user config file for *someone else*? We address app developers in the first graf. But I also want to make sure that we don't need to add instructions or best practices or context in this top section for team leaders.]**

## Creating user profiles

Generate a *user* configuration file that overrides the values defined in the global `zowe.config.json` file:

1. Open a command line prompt and issue the following command to generate a global team configuration file:

    ```
    zowe config init --global-config
    ```

    The configuration file `zowe.config.json` is created in the `ZOWE_CLI_HOME` directory.

2. Respond to subsequent prompts to create connection profiles for mainframe services. **[correct?]**

3. Generate the global user configuration file:

    ```
    zowe config init --global-config --user-config
    ```

    The configuration file `zowe.config.user.json` is created in the `ZOWE_CLI_HOME` directory. **[are there any prompts the user needs to answer? or if the config file created immediately after the command?]**

    When created, the user configuration file contains profiles (copied from the global team configuration file) **[is the paranthetical correct?]** with no properties and the `defaults` object is empty. Refer to the following example.

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

4. Use a text editor or IDE (such as Visual Studio Code) to add your connection details as properties in the `zowe.config.user.json` file to either override the same properties in `zowe.config.json`, or to add new connection details.
