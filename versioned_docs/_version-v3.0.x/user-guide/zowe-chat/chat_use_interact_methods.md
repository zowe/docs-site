# Using Zowe Chat

You can interact with Zowe Chat by mouse navigation or issuing commands.

## Mouse navigation

Zowe Chat supports users to click buttons, dropdown menu, and other clickable components in chat to query information, drill down content, etc. 

## Interacting through commands

You can also mention "@" the bot user and issue commands to interact with Zowe Chat. Zowe Chat supports Zowe Chat commands and Zowe CLI commands.

### Zowe Chat commands

You can issue Zowe Chat commands in the following format: 

```
<scope> <resource> <action> <object> <Positional Arguments> [Options]
```

For example, 

```
zos job list status [jobID] --owner | -o <owner> --prefix | -p <prefix>
```

For detailed Zowe Chat commands, see [Zowe Chat command reference](../../appendix/zowe-chat-command-reference/zos/zowe-chat-command-reference.md).

### Zowe CLI commands

You can also issue Zowe CLI commands to perform operations, such as help and z/OS resource management including z/OS job, data set, USS file, error code, and console command. Theorytically, most of Zowe CLI commands are supported as long as it is excutable with single-submit.

:::warning

- Zowe CLI must be installed on your Zowe Chat server first before you can issue Zowe CLI commands.
- Zowe Chat currently does not support the Zowe CLI command-line interactive or ["prompt" feature](../cli-using-using-prompt-feature.md) that asks you to provide required option values.

:::

For detailed CLI commands, see <a href="/v3.0.x/web_help/index.html" target="_blank">Zowe CLI command reference</a>.