# Develop for Zowe CLI

As a developer, you can develop plug-ins for Zowe CLI and contribute code to the base CLI or existing plug-in code bases. 

**Note:** You can also [install existing plug-ins to Zowe CLI](../user-guide/cli-extending.md). 

* [Why Create a Zowe CLI Plug-in?](#why-create-a-brightside-plug-in)
* [Tutorials](#follow-tutorials-to-extend-the-sample-plug-in)
* [Developer Documentation and Guidelines](#documentation-and-guidelines)

## Why create a Zowe CLI plug-in?
You might want to create a Zowe CLI plug-in to accomplish the following:
* Provide new scriptable functionality for yourself, your organization, or to a broader community.
* Make use of Zowe CLI infrastructure (profiles and programmatic APIs).
* Participate in the Zowe CLI community space.

The following Plug-in projects have been developed: 
* [Brightside Plug-in for IBM Db2](https://github.com/gizafoundation/zowe-cli-db2-plugin)
* [Brightside Plug-in for IBM CICS](https://github.com/gizafoundation/brightside-cics-plugin)

## Getting started
The [zowe-cli-sample-plugin GitHub repository](https://github.com/zowe/zowe-cli-sample-plugin) contains a sample plug-in that adheres to the guidelines for contributing to Zowe CLI projects. Use the sample project and follow the associated tutorials to learn about how to work with this sample plug-in, build new commands, or build a new Zowe CLI plug-in.

Before you begin the tutorials, begin your plug-in development journey by following our [Setup Guide](/docs/tutorials/Setup.md).

### Development tutorials
1. **[list directory-contents](docs/tutorials/list-directory-contents/ListDirectoryContentsPlugin.md)** - Install the plug-in bundled with this sample and run as-is. 
2. **[list typicode-todo](docs/tutorials/list-typicode-todo/ListTypicodeTodoPlugin.md)** - Extend the plug-in bundled with this sample to create a new programmatic API, command definition, and handler.
3. **[files-util diff data-set](docs/tutorials/files-util/FilesUtilPlugin.md)** - Create a new plug-in based on this sample that uses brightside programmatic APIs and a diff package compare two data sets.
4. **[profile-example](docs/tutorials/profile-example/ProfilePlugin.md)** - Implement user profiles with the plug-in.


## Documentation and Guidelines
We provide [tutorials](#follow-tutorials-to-extend-the-sample-plug-in) that you can follow to set up your development environment, create your own plug-in, and extend this sample plug-in. We also provide the following guidelines and documentation to assist you during development:

### Contribution Guidelines 
The Zowe CLI [contribution guidelines](CONTRIBUTING.md) contain standards and conventions for developing Zowe CLI plug-ins. 

The guidelines contain critical information about working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Zowe CLI properly.

### Imperative CLI Framework Documentation
[Imperative CLI Framework](https://github.com/zowe/imperative/wiki) documentation is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Zowe CLI). Refer to these documents during development. 

### Imperative CLI Framework Documentation
[Imperative CLI Framework Wiki](https://github.com/gizafoundation/imperative/wiki) is a key source of information to learn about the features of Imperative CLI Framework (the code framework that you use to build plug-ins for Brightside). Refer to these documents during development. 

### Contribution Guidelines 
We provide guidelines for developing Brightside plug-ins in the [Brightside GitHub repository](https://github.com/gizafoundation/brightside). The following information is critical to working with the code, running/writing/maintaining automated tests, developing consistent syntax in your plug-in, and ensuring that your plug-in integrates with Brightside properly:

| For more information about ... | See: |
| ------------------------------ | ----- |
| General guidelines that apply to contributing to CA Brightside and Plug-ins | [Contribution Guidelines](https://github.com/gizafoundation/brightside/tree/master/CONTRIBUTING.md) |
| Conventions and best practices for creating packages and plug-ins for Brightside | [Package and Plug-in Guidelines](https://github.com/gizafoundation/brightside/tree/master/docs/PackagesAndPluginGuidelines.md)|
| Guidelines for running tests on CA Brightside | [Testing Guidelines](https://github.com/gizafoundation/brightside/tree/master/docs/TESTING.md) |
| Guidelines for running tests on the plug-ins that you build| [Plug-in Testing Guidelines](https://github.com/gizafoundation/brightside/tree/master/docs/PluginTESTINGGuidelines.md) |
| Documentation that describes the features of the Imperative CLI Framework | [About Imperative CLI Framework](https://github.com/gizafoundation/imperative/wiki) |

## Follow Tutorials to Extend the Sample Plug-in
Understand how plug-ins are developed, perform the initial development environment setup, then follow our tutorials! 

### Plug-in Development Overview
At a high level, a plug-in must have `imperative-framework` configuration [(sample here)](../../src/imperative.ts).  This configuration is discovered by  `imperative-framework` through the [package.json](../../package.json) `imperative` key.

Along with configuration, a Brightside plug-in will minimally have:
1. **Programmatic API** - Node.js programmatic APIs to be called by your handler or other Node.js applications.
2. **Command definition** - The syntax definition for your command.
3. **Handler implementation** - To invoke your programmatic API to display information in the format that you defined in the command definition.

