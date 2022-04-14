# Developing for Zowe CLI

You can extend Zowe&trade; CLI by developing plug-ins and contributing code to the base Zowe CLI or existing plug-ins.

## How to contribute
You can contribute to Zowe CLI in the following ways:
- Add new commands, options, or other improvements to the base CLI.
- Develop a plug-in that users can install to Zowe CLI.

You might want to contribute to Zowe CLI to accomplish the following objectives:
* Provide new scriptable functionality for yourself, your organization, or to a broader community.
* Make use of Zowe CLI infrastructure (profiles and programmatic APIs).
* Participate in the Zowe CLI community space.

## Getting started
If you want to start working with the code immediately, review the Readme file in the [Zowe CLI core repository](https://github.com/zowe/zowe-cli#zowe-cli--) and the Zowe [contribution guidelines](https://github.com/zowe/zowe-cli/blob/master/CONTRIBUTING.md#contribution-guidelines). The [zowe-cli-sample-plugin GitHub repository](https://github.com/zowe/zowe-cli-sample-plugin#zowe-cli-sample-plug-in) is a sample plug-in that adheres to the guidelines for contributing to Zowe CLI projects.

### Tutorials
Follow these tutorials to get started working with the sample plug-in:
1. [Setting up:](cli-setting-up.md) Clone the project and prepare your local environment.
2. [Installing a plug-in:](cli-installing-sample-plugin.md) Install the sample plug-in to Zowe CLI and run as-is.
3. [Extending a plug-in:](cli-extending-a-plugin.md) Extend the sample plug-in with a new by creating a programmatic API, definition, and handler.
4. [Creating a new plug-in:](cli-developing-a-plugin.md) Create a new CLI plug-in that uses Zowe CLI programmatic APIs and a diff package to compare two data sets.
5. [Implementing user profiles:](cli-implement-profiles.md) Implement user profiles with the plug-in.

### Plug-in development overview
At a high level, a plug-in must have `imperative-framework` configuration [(sample here)](https://github.com/zowe/zowe-cli-sample-plugin/blob/master/src/imperative.ts).  This configuration is discovered by  `imperative-framework` through the [package.json](https://github.com/zowe/zowe-cli-sample-plugin/blob/master/package.json) `imperative` key.

A Zowe CLI plug-in will minimally contain the following:
1. Programmatic API: Node.js programmatic APIs to be called by your handler or other Node.js applications.
2. Command definition: The syntax definition for your command.
3. Handler implementation: To invoke your programmatic API to display information in the format that you defined in the definition.

The following guidelines and documentation will assist you during development:

### Imperative CLI Framework documentation
[Imperative CLI Framework documentation](https://github.com/zowe/imperative/wiki) is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to these supplementary documents during development to learn about specific features such as:

* Auto-generated help
* JSON responses
* User profiles
* Logging, progress bars, experimental commands, and more!

### Contribution guidelines
The Zowe CLI contribution guidelines contain standards and conventions for developing Zowe CLI plug-ins.

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly:

| For more information about ... | See: |
| ------------------------------ | ----- |
| General guidelines that apply to contributing to Zowe CLI and Plug-ins | [Contribution Guidelines](https://github.com/zowe/zowe-cli/blob/master/CONTRIBUTING.md) |
| Conventions and best practices for creating packages and plug-ins for Zowe CLI | [Package and Plug-in Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PackagesAndPluginGuidelines.md)|
| Guidelines for running tests on Zowe CLI | [Testing Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/TESTING.md) |
| Guidelines for running tests on the plug-ins that you build| [Plug-in Testing Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/PluginTESTINGGuidelines.md) |
Versioning conventions for Zowe CLI and Plug-ins| [Versioning Guidelines](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md) |
