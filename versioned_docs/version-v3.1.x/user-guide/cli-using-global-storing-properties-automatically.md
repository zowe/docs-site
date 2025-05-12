# Storing properties automatically

When you issue a command that is missing a required option value for a property (for example, host or password) the CLI prompts you to enter the option value.

The `autoStore` property in the `zowe.config.json` file lets you store the option values for properties automatically. When you specify the `autoStore` property in `zowe.config.json` to `true`, the value that you enter when prompted is stored for future commands to use. The values for secure fields are stored securely in the credential vault (if configured accordingly), and the other values are written to `zowe.config.json` on disk.

The default value of the `autoStore` property is `true`. However, if you do not want to store properties automatically, set the value of `autoStore` to `false`.

A value of `false` prompts for missing values on all commands that you issue.
