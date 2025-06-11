# Documentation Guidelines

Documentation of Zowe&trade; comes in various forms depending on the subject being detailed. In general, consider how you can help end users and contributors through external documentation, in-product help, error messages, etc... and open an issue in [zowe/docs-site](https://github.com/zowe/docs-site) if you need assistance.

## Contributing to external documentation 
The external documentation for the Zowe project, [Zowe Docs](https://docs.zowe.org/), is completely open-source. See [How to contribute](../contributing.md) for more information about contributing to the documentation.

Consider: Release Notes, Install/Config/User Guides, Developer Tutorials, etc... 

## Component Categories

Provide the following documentation depending on the component that you contribute to: 

### Server Core

Principles of operation and end-user guides (configuration, troubleshooting) should be documented on Zowe Docs site. Code documentation follows language-specific formats.

### Server Security

Principles of operation and end-user guides (configuration, troubleshooting) should be documented on Zowe Docs site. Code documentation follows language-specific formats.

### Microservices

Microservices implement a web API, and therefore must be documented for understanding and testing. These web APIs must be accompanied with documentation in the Swagger (https://swagger.io/) format. These documents must be Swagger 2.0, `.yaml` extension files. Zowe Application Framework plug-ins that implement microservices should store these files within the `/doc/swagger` folder.

### Zowe Desktop Applications

Zowe Desktop applications should include documentation that explains how to use them, such that this documentation can integrate with a Zowe Desktop documentation reader. This is not strictly API documentation, but rather user guides that can display within the Desktop GUI. The preferred documentation format is a `.md` extension file that exists in the `/doc/guide` folder of an App.

### Web Framework

Principles of operation and end-user guides (configuration, troubleshooting) should be documented on Zowe Docs site. Code documentation follows language-specific formats.

### CLI Plugins

Provide a readme.md file for developers (overview, build, test) as well as end-user documentation for your plug-in on Zowe Docs site. 

For more information, see the CLI [documentation contribution guidelines](https://github.com/zowe/zowe-cli/blob/master/CONTRIBUTING.md#documentation-guidelines).

### Core CLI Imperative CLI Framework

Contributions that affect end users of the CLI should be documented on Zowe Docs site.

Contributions that affect the underlying Imperative CLI Framework should be documented in [the GitHub Wiki](https://github.com/zowe/imperative/wiki) for future developers using the framework.

Code documentation follows language-specific formats.

## Programming Languages

Each of the common languages in Zowe have code-documentation-generation tools, each with their own in-code comment style requirements to adhere to in order to generate readable API references. Objects and functions of interest should be commented in accordance to the language-specific tools to result in output that serves as the first point of documentation for APIs.

### Typescript

When writing TypeScript code, comment objects and functions in compliance with [JSDoc](https://jsdoc.app/). If you are writing in an area of the codebase that does not yet have a definition file for JSDoc, define a configuration file that can be used for future documentation of that code.

### Java

When writing Java code, comment objects and functions in the Javadoc format.

### C

When writing C code, comment functions and structures in compliance with Doxygen.
