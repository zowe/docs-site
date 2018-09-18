# Implementing experimental commands

As you develop plug-ins, you can flag groups and commands as experimental. You might want to specify commands as experimental when a command is not fully tested, or when users might receive unexpected results when they use the plug-ins.

As a best practice, we recommend that you define the term experimental for your plug-ins and describe your definition in the experimental command help text.

**Note:** A command that you specify as experimental displays in the help text with the prefix (experimental). When you define a command group as experimental, all commands in that group inherit the experimental flag.

## Flagging commands as experimental

To flag a command as experimental, specify `true` on the `experimental` parameter in the command definition.

**Example:** The following example illustrates the syntax to flag commands as experimental: 

```typescript
const definition: ICommandDefinition = {
  name: "cook", type: "group",
  description: "cook food",
  children: [
    {
      name: "fruit", aliases: ["frt"],
      description: "Cooks a fruit... with a chance of failure",
      type: "command",
      handler: __dirname + "/Handler",
      experimental: true,
    }
  ]
};
module.exports = definition;
```

**More information:**
- For information about how to define commands for a new application, see [Command Definition and Processing](URL).
- For information about how to define commands for a plug-in, see [Develop Plugins](URL).

## Defining the help text for experimental commands

You can define the global help text that displays for all experimental commands. You specify you the message that you want to display to the plug-in user using the `experimentalCommandDescription` parameter in your Imperative CLI Framework configuration.

**Examples:**  The following example illustrates the syntax to use when defining your help text:

```
  progressBarSpinner: ".oO0Oo.",
  experimentalCommandDescription: "These commands may damage your fruits."
```

**Note:** You define the configuration in `configurationModule`, inline where you call the `Init()` function, or in `package.json`.

The help text displays when a user issues `--help` on an experimental command. For example:

```
ABOUT EXPERIMENTAL COMMANDS
---------------------------
EXPERIMENTAL COMMANDS are commands that are not ready for general availability. If you decide to use these commands, you might encounter bugs, incompatibilities with your system, or incomplete help text.
```
