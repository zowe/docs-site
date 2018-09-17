# Brightside Sample Plug-in
This repository contains a sample plug-in that adheres to the guidelines for contributing to Brightside projects. You can use this project and the associated tutorials as a starting point for creating Brightside plug-ins. 

* [Why Create a Brightside Plug-in?](#why-create-a-brightside-plug-in)
* [Documentation and Guidelines](#documentation-and-guidelines)
* [Follow Tutorials to Extend the Plug-in](#follow-tutorials-to-extend-the-sample-plug-in)


## Why Create a Brightside Plug-in?
You might want to create a Brightside plug-in to accomplish the following:
* Provide new scriptable functionality for yourself, your organization, or to a broader community.
* Make use of Brightside infrastructure (profiles and programmatic APIs).
* Participate in the Brightside community space.

### Existing Brightside Plug-ins

The following Brightside Plug-in projects have been developed: 
* [Brightside Plug-in for IBM Db2](https://github.com/gizafoundation/zowe-cli-db2-plugin)
* [Brightside Plug-in for IBM CICS](https://github.com/gizafoundation/brightside-cics-plugin)

## Documentation and Guidelines
We provide [tutorials](#follow-tutorials-to-extend-the-sample-plug-in) that you can follow to set up your development environment, create your own plug-in, and extend this sample plug-in. We also provide the following guidelines and documentation to assist you during development:

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

### Initial Setup Tutorial
Before you begin the tutorials, begin your plug-in development journey by following our [Setup Guide](/docs/tutorials/Setup.md).

### Development Tutorials
1. **[list directory-contents](docs/tutorials/list-directory-contents/ListDirectoryContentsPlugin.md)** - Install the plug-in bundled with this sample and run as-is. 
2. **[list typicode-todo](docs/tutorials/list-typicode-todo/ListTypicodeTodoPlugin.md)** - Extend the plug-in bundled with this sample to create a new programmatic API, command definition, and handler.
3. **[files-util diff data-set](docs/tutorials/files-util/FilesUtilPlugin.md)** - Create a new plug-in based on this sample that uses brightside programmatic APIs and a diff package compare two data sets.
4. **[profile-example](docs/tutorials/profile-example/ProfilePlugin.md)** - Implement user profiles with the plug-in.