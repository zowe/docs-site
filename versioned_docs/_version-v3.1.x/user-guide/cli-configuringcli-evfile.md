# Configuring an environment variables file

If it is not possible to configure your own system environment variables, create a special configuration file to set these variables for Zowe CLI commands.

:::info Required roles: Security administrator, DevOps architect
:::

Although not common, there are cases where users do not have the ability to configure their own system environment variables. This can happen when users are working on hosted integrated development environments (IDEs), or in a highly locked down environment.

When working under these kinds of restrictions, you can set environment variables that apply to CLI commands. To do this, create a `.zowe.env.json` file storing key-value pairs that specify your configurations.

:::note

Use a `.zowe.env.json` file *only* when it is not possible to set your own system environment variables. If you are able to configure environment variables in your system, continue to do so.

:::

## How `.zowe.env.json` works

When a Zowe command is issued, the command initializes the Imperative CLI Framework so that it loads all the utilities that allow the command to function. Imperative reads the `.zowe.env.json` configuration file and sets the environment variables before any loggers or Zowe CLI finish their own initialization.

The `.zowe.env.json` environment variables are set for only the duration of a Zowe CLI command.

If an existing environment variable is set in your system and the variable is also in `.zowe.env.json`, the values in `.zowe.env.json` overwrite it.

`.zowe.env.json` can be used to set any environment variable. This allows setting environment variables to change the default behavior of Node.JS, in addition to all of the Zowe environment variables.

## Creating the configuration file

Create a dedicated JSON file to store settings for environment variables:

1. In your Files Explorer, go to the home directory (`%HOMEPATH%` for Windows, `$HOME` for Linux and Mac) or the path set in the `ZOWE_CLI_HOME` environment variable.

2. Create a JSON file titled `.zowe.env.json`.

3. Use a text editor to open `.zowe.env.json` and enter environment variables, as in the following example:

    ```
    {
        "ZOWE_CLI_HOME": "C:\Users\User\alternate\location\to\.zowe",
        "ZOWE_APP_LOG_LEVEL": "DEBUG",
        "ZOWE_IMPERATIVE_LOG_LEVEL": "DEBUG",
        "ZOWE_CLI_PLUGINS_DIR": "C:\Users\Shared\.zowe\Plugins",
        "SOME_OTHER_VARIABLE": "SOME OTHER VALUE",
        "NUMBER": "12345",
        "BOOLEAN": "TRUE",
        "OBJECT": "{\"key\":\"value\"}"
    }
    ```

    :::note
    
    If you have the `ZOWE_CLI_HOME` environment variable set in your system, do not include it in the `.zowe.env.json` file. Otherwise, unexpected behavior can occur.
    
    :::

## Using daemon mode

Daemon mode is a long-running background process that significantly improves Zowe CLI performance.

When changes are made to your work environment, daemon mode does not capture the changes. Restarting daemon mode lets the daemon capture any updates since its last start up.

This means that if the Zowe CLI daemon is in use, the daemon must be restarted when the `.zowe.env.json` file is created or updated.

Issue the following command to stop the currently running daemon and start a new daemon:

```
zowe daemon restart
```

See [Restart daemon mode](https://docs.zowe.org/stable/user-guide/cli-using-using-daemon-mode/#restart-daemon-mode) for more information.
