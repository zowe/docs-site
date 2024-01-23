# Using the prompt feature

Zowe CLI uses a command-line "prompt" feature to ask you to provide required option values. The CLI always prompts for host, port, username, and password information if not supplied in commands or profile configuration.

You can also manually enable the prompt for any option. This is helpful to mask sensitive information on the screen while you type. You can enable a one-time prompt, or choose to always prompt for a particular option.

### Enabling a one-time prompt

To enable a one-time prompt:

1. Open the Zowe CLI command prompt.

2. Specify an option or positional as `PROMPT*`:

    ```
    zowe files download data-set "PROMPT*"
    ```

    In this example, Zowe CLI prompts for the name of the data set specified for download. The prompt hides the user's input as it is entered into the command line.

    [image]

:::info

This behavior may break if you are using the Zowe CLI Daemon. **[do we need to say anything else? a workaround?]**

:::

### Always prompting for a particular option

To always prompt for a particular option:

1. Open the Zowe CLI command prompt.
