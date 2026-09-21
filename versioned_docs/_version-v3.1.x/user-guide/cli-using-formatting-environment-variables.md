# Formatting environment variables

Transform an option into the proper format for a Zowe CLI environment variable, then define a value to the variable. Transform option names according to the following rules:

* Prefix environment variables with `ZOWE_OPT_`.
* Convert lowercase letters in arguments/options to uppercase letters.
* Convert hyphens in arguments/options to underscores.

:::tip
Refer to your operating system documentation for information about how to set and get environment variables. The procedure varies between Windows, Mac, and various versions of Linux.
:::

## Examples of transformed CLI options

The following table provides examples of CLI options and the corresponding environment variable to which you can define a value:

| Command Option          | Environment Variable           | Use Case   |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--user`                | `ZOWE_OPT_USER`                | Define your mainframe username to an environment variable to avoid specifying it on all commands or profiles.                           |
| `--reject-unauthorized` | `ZOWE_OPT_REJECT_UNAUTHORIZED` | Define a value of `true` to the `--reject-unauthorized` flag when you always require the flag and do not want to specify it on all commands or profiles. |
| `--editor`              | `ZOWE_OPT_EDITOR`              | Define an editor that Zowe CLI uses to open files. The value can be either the editor's executable file location or the name of a program (for example, *notepad* on Windows or *nano* on Linux).|
