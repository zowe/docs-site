# Interacting with Zowe Chat

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
zos job list status [jobId] --owner | o <owner> --prefix | p <prefix>
```

For detailed Zowe Chat commands, see [Zowe Chat command reference](./zowe-chat-command-reference.md).

### Zowe CLI commands

You can also issue Zowe CLI commands to perform operations. In Technical Preview, Zowe Chat supports the commands for help and z/OS resource management including z/OS job, data set, USS file, error code, and console command.

:::warning

Zowe Chat currently does not support the Zowe CLI command-line interactive or ["prompt" feature](cli-using-using-prompt-feature.md) that asks you to provide required option values.

:::

For detailed CLI commands, see <a href="/stable/web_help/index.html" target="_blank">Zowe CLI command reference</a>.