# How command precedence works

You can provide your mainframe connection details (username, password, etc.) to Zowe CLI in several ways. Zowe CLI abides by a *command option order of precedence* that provides flexibility when issuing commands and writing scripts.

When you issue a command, the CLI *searches* for your command arguments in the following order:

1. **Options** that you specify on individual commands.

2. **Environment variables** that you define in the computer's operating system.

    For more information, see [Using environment variables](../user-guide/cli-using-using-environment-variables).
3. **[Service profiles](../appendix/zowe-glossary.md#service-profile)** that you create (that is, a z/OSMF profile or another mainframe service).
4. **[Base profiles](../appendix/zowe-glossary.md#base-profile)** that you create.
    These can contain credentials for use with multiple services and/or an API ML login token.
5. **Default option value**.

## Command precedence in action

If you omit an option from the command line, Zowe CLI searches for an **environment variable** that contains a value for the option. If no environment variable exists, the CLI checks your **service profiles** for the value. If necessary, the CLI then searches **base profiles**, which provide values to service profiles to avoid specifying the same options (such as a username and password) in multiple service profiles.

:::note
If you do not provide a value using one of these methods, the default value is used. If a required option value is not located, a syntax error message such as `Missing Positional Argument` or `Missing Option` displays. 
:::
