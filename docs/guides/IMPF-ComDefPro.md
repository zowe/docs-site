# Command definition and processing

Imperative CLI Framework is a command processing system (a command-line interface or CLI) that supports the capability to let you (application developers and systems programmers) architect customized tools using collections of plug-ins and utilities that help you perform your daily business processes.

- [Creating Imperative CLI plug-in projects](#creating-imperative-cli-plug-in-projects)
- [Configuring Imperative CLI projects](#configuring-imperative-cli-plug-in-projects)
- [Formatting configuration files](#formatting-configuration-files)

**More information:**
- Implementing User Profiles with Your Applications

## Creating Imperative CLI plug-in projects
You create plug-in projects in Node Package Manager (npm) packages. The plug-ins that you create is published to npm.

To use the Imperative CLI Framework, add Imperative CLI as a dependency, and call the `Imperative.init()` and `Imperative.parse()` methods.

## Configuring Imperative CLI plug-in projects

You create command definition documents that define the command syntax that your project requires. The configuration object also lets you define other settings that you want to specify for your project. For example, you can specify the configuration profiles that you want to let users to create and use, define the highlighting colors in the UI, format custom help text, and more.

You define the command syntax for your project in the command definition document in a tree-like structure. You construct the definitions fields with an array of the definition trees. Each entry in the array is assumed to be a child tree of the root command. You can nest commands in the trees arbitrarily deep, which can be useful for organizing complex CLIs or CLIs whose syntax is similar to natural language.

You define the configuration when you initialize Imperative CLI Framework APIs (through `Imperative.init()`), or you can define the configuration in the imperative field of package.json. Whether you define the configuration as an argument to `Imperative.init()` or in `package.json`, you can opt to provide a path on the `configurationModule` field of the configuration object. The `configurationModule` should be a Node.js javascript file; the default export of which is the full configuration object.

For information about the properties to define in your configuration document, refer to code comments in the IImperativeConfig interface, found in `packages/imperative/src/doc/IImperativeConfig.ts` within the imperative GitHub repository.

Example:

```typescript
{
//...
"imperative" : {
"configurationModule": "lib/configuration.js"
}
//...
}
// lib/configuration.js
module.exports = {
    definitions: [...],
    defaultHome: "~/.mycli",
    primaryTextColor: "green",
  //  ...
}
```

**Example:** You name your plug-in banana and you issue the command `banana --help`. The command prints the overall description for your plug-in, and the child command groups that are available to banana.

When you issue the command `banana --version`, it prints the current version of your plug-in. The following syntax illustrates an example of how to define the functionality. The example syntax also creates the following commands:

- `banana config list`
- `banana config set`
- `banana config start`

```typescript
{
    "definitions": [{
        "name"    : "config",
        "type"    : "group",
        "description" : "Configure your CLI",
        "children": [
            {
                "name"   : "list",
                "type"   : "command",
                "handler": "path/to/file"
            },
            {
                "name"   : "set",
                "type"   : "command",
                "handler": "path/to/file"
            }, 
            {
                // ...
            }
        ]
    }, 
    {
     "name": "server", "aliases": ["serv"],
     "description": "Manage the CLI's server mode",
     "type": "group",
     "children": [
     { 
        "name" : "start",
        "description" : "Start the server",
        "handler": "path/to/file",
        "options" : [
          "name": "port", "aliases": ["p"]
          "type": "number", 
          "description" : "the port to run the server with",
        ]
      }
     ]
    }]
}
```

You define the handlers by a path in the handler property. The handlers load on-demand when you issue the command.

The following features are available on the syntax definition tree:

- Positional arguments with names and help text.
- Support for `--options` that can be described with aliases and help text.
- Advanced syntax validation rules such as conflicting options, implications, regex pattern matching, and more.
- Exposing options for configuration profiles on your commands.
- Example commands.

In a concept that is similar to that of the `configurationModule` (mentioned above), you can load the command syntax definition trees from Node.js javascript files by specifying paths in the modules field of the configuration object. You can specify definitions, modules, or both to build your complete command syntax.

## Formatting configuration files

You create the configuration files to define profiles, commands, plug-ins, and any other configurations for your project in the form of JSON documents.

**More information:**

- [JSON Responses](URL)

