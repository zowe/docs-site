# Working with plug-ins

Imperative CLI Framework provides the capability build plug-ins that you integrate with imperative-based applications, such as Zowe CLI. 

When you enable the plug-ins feature, consumers of your application can develop their own plug-ins or install third-party plugins. Plug-ins are enabled by default in new applications, but you can manually switch the feature on or off.

## Using the Plugin Management Facility (PMF)

The Plugin Management Facility (PMF) manages plug-ins in an Imperative CLI Framework application.

When you initialize a CLI application, you set a parameter to enable or disable the PMF. The parameter that you set adds a **plugins** command group to your application that lets users install and manage plug-ins.

## Enable the Plugin Management Facility

The PMF is enabled by default in the `allowPlugins` parameter in [ImperativeConfig.ts](URL).

You can disable the PMF when you do not want to allow plug-ins in your CLI. When you set `allowPlugins` to `false`, the PMF is not initialized.

The following example illustrates how to disable plug-ins in [ImperativeConfig.ts](URL):

```typescript
import {ICommandDefinition} from "../../../cmd";
import {IImperativeProfileConfig} from "./IImperativeProfileConfig";
import {IImperativeLogsConfig} from "./IImperativeLogsConfig";

/**
 * All of the configuration required to set up your Imperative CLI app
 */
export interface IImperativeConfig {
    /**
     * Boolean flag control wheather plugins are enable or disable.
     * This option is assumed to be true by default.
     */
    allowPlugins?: boolean;
```
## Manage and load installed plug-ins 

Imperative CLI Framework uses the `Plugins.json` file to manage and load installed plug-ins. All plug-ins have a `package.json` file that contains the code structure of the plug-in.

You use the commands in the **plugins** command group to register the package that is defined in `package.json` in `plugins.json`.

## Design and develop plug-ins

The following topics provide you with tip, best practices, and examples to help you design and develop plug-ins. However, before you read further, review the following tips and recommendations:

- We recommend that you develop plug-ins in TypeScript. Alternatively, you can develop plug-ins in JavaScript. Regardless of the language with which you develop plug-ins, the architecture that you define must be robust and plug-ins must be well structured.
- Every plug-in installed in an Imperative CLI Framework application increases the load time of your applications. Consider the size and complexity of your plug-ins during development to minimize load times.

## Coding plug-ins

The following requirements must be met for your plug-in to function after you install it to a base application:

- The plug-in must:
    - Be an npm package.
    - Define an imperative configuration property in package.json.
    - Specify the main property of package.json.
- The configuration that you provide must:
    - Be valid to Imperative CLI Framework.
    - Define the properties that we list in Define Plug-in Configuration.
- The new plug-in command groups that you define must:
    - Have unique command group names that do not exist in the base CLI application. This restriction includes command groups that were added previously by other plug-ins.
    - Have a valid command tree structure.

## Define the plug-in NPM package:

Plug-ins require `name`, `version`, `description`, and `main` parameters to define the Node Package Manager (npm) package.

**More information:**
- [package.json: Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)


## Define plug-in configurations

You define plug-in configurations in the same manner that you configure a CLI application.

**More information:**
- [Command Definition & Processing](URL).

You specify the following configuration properties for plug-ins:

- `name`: The name of a new command group.

- `definitions`: The command definitions (command tree) for the plug-in.
    
    **More information:**
    - [Command Definition & Processing](URL).

- `rootCommandDescription`: A description of the command group that appears in help text.
- `pluginHealthCheck `: (Optional) The location the health check handler for the plug-in.

## Define plug-in handlers

To be considered a valid plug-in, your plug-in must define at least one command and a corresponding handler.

The syntax for a command handler is the same whether you are developing a plug-in or a CLI application.

**More information:**
- [Command Definition & Processing](URL).

**Example: plug-in handler (typeScript):**

The following example illustrates a basic, sample plug-in handler written in TypeScript. Use this example as reference when creating your plug-ins:

```typescript
import {ICommandHandler, IHandlerParameters} from "@brightside/imperative";

export default class FooHandler implements ICommandHandler {
  public async process(params: IHandlerParameters): Promise<void> {
    // Insert handler code

    // Example:
    // Write to log file, add a response output, build response
    params.response.log.debug("Invoked sample-plugin foo handler");
    params.response.writeMessage("You have executed the Foo command!");
    params.response.build();
  }
}
```
## Implement profiles

Plug-ins can introduce new profile types to CLI applications. You develop profiles for the plug-in commands in the same manner that you develop profiles for applications. 

**More information:**
- [User Profiles](URL)
