# Developing for Zowe CLI

Extend Zowe&trade; CLI by developing plug-ins and contributing code to Zowe CLI core or existing plug-ins.

## How to contribute

Contribute to Zowe CLI in the following ways:
- Add new commands, options, or other improvements to the core CLI.
- Develop a Zowe CLI plug-in.

You might want to contribute to Zowe CLI to accomplish the following objectives:
- Provide new scriptable functionality for yourself, your organization, or to a broader community.
- Make use of Zowe CLI infrastructure (such as profiles and programmatic APIs).
- Participate in the Zowe CLI community space.

## Getting started

If you want to start working with the code immediately, review the Readme file in the [Zowe CLI core repository](https://github.com/zowe/zowe-cli#zowe-cli--) and the Zowe [contribution guidelines](https://github.com/zowe/zowe-cli/blob/master/CONTRIBUTING.md#contribution-guidelines). To review a sample plug-in that adheres to the guidelines for contributing to Zowe CLI projects, see the [zowe-cli-sample-plugin GitHub repository](https://github.com/zowe/zowe-cli-sample-plugin#zowe-cli-sample-plug-in).

### Contribution guidelines

The Zowe CLI contribution guidelines contain standards and conventions for developing Zowe CLI plug-ins.

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly.

| For more information about ... | See: |
| ------------------------------ | ----- |
| General guidelines that apply to contributing to Zowe CLI and plug-ins | [Contribution guidelines](https://github.com/zowe/zowe-cli/blob/master/CONTRIBUTING.md) |
| Conventions and best practices for creating packages and plug-ins for Zowe CLI | [Package and plug-in guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PackagesAndPluginGuidelines.md)|
| Guidelines for running tests on Zowe CLI | [Testing guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/TESTING.md) |
| Guidelines for running tests on the plug-ins that you build| [Plug-in testing guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PluginTESTINGGuidelines.md) |
Versioning conventions for Zowe CLI and plug-ins| [Versioning guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md) |

### Plug-in development overview

At a high level, a plug-in must have `imperative-framework` configuration (see a [sample here](https://github.com/zowe/zowe-cli-sample-plugin/blob/master/src/pluginDef.ts)).  This configuration is discovered by  `imperative-framework` through the [package.json](https://github.com/zowe/zowe-cli-sample-plugin/blob/master/package.json) `imperative` key.

A Zowe CLI plug-in minimally contains the following:
1. Programmatic API: Node.js programmatic APIs to be called by your handler or other Node.js applications.
2. Command definition: The syntax definition for your command.
3. Handler implementation: To invoke your programmatic API to display information in the format that you defined in the definition.

#### Imperative CLI Framework documentation
[Imperative CLI Framework documentation](https://github.com/zowe/zowe-cli/wiki) is a key source of information to learn about the features of Imperative CLI Framework, the code framework that you use to build plug-ins for Zowe CLI. Refer to these supplementary documents during development to learn about specific features such as:

- Auto-generated help
- JSON responses
- User profiles
- Logging, progress bars, experimental commands, and more
- Authentication mechanisms
