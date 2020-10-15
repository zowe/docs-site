Welcome to this page

* Overview, contact on slack
* GitHub repos
* Processes (open an issue, open a PR, etc…)
* Code Guidelines
* UI Guidelines

- [Code categories](#code-categories)
- [Programming languages](#programming-languages)
- [Component-specific guidelines and tutorials](#component-specific-guidelines-and-tutorials)
- [Pull requests guidelines](#pull-requests-guidelines)
- [Documenting your Code](#documenting-your-code)
  - [Zowe Docs Site](#zowe-docs-site)
  - [Server Core](#server-core)
  - [Server Security](#server-security)
  - [Microservices](#microservices)
  - [Zowe Desktop Applications](#zowe-desktop-applications)
  - [Web Framework](#web-framework)
  - [CLI Plugins](#cli-plugins)
  - [Imperative CLI Framework](#imperative-cli-framework)
  - [Programming Languages](#programming-languages-1)
- [Code style guidelines](#code-style-guidelines)
- [Whitespaces](#whitespaces)
- [Naming Conventions](#naming-conventions)
  - [Functions and methods](#functions-and-methods)
  - [Variables](#variables)

## Code categories

The Zowe&trade; codebase consists of a few key areas, with both unique and shared guidelines that define how to write new code. A few such areas are:

- Server Core
- Server Security
- Microservices
- Zowe Desktop Applications
- Zowe Application Framework
- Zowe CLI and CLI Plug-ins
- Imperative CLI Framework

## Programming languages

For each area of the codebase, there are established and favored programming languages. Each repository in Github identifies the primary language used. Some of the basic skills needed to contribute to the project include:

- **CLI** - Node.js, TypeScript
- **Desktop UI** - Node.js, JavaScript
- **APIs** - C, Assembler, Java, Spring
- **API Mediation Layer** - Java, Spring

**Note:** JavaScript is not recommended and should be avoided in favor of Typescript to utilize typing.

## Component-specific guidelines and tutorials

This "Code Guidelines" section provides high-level best practices. Each component may have more specific contribution guidelines. Look for a CONTRIBUTING.md file in the component's GitHub repository for specific details.

To learn more about how to develop Zowe applications and plug-ins or extending Zowe with APIs, see [Extending](../../extend/extend-apiml/onboard-overview.md).

## Pull requests guidelines

The Zowe&trade; source code is stored in GitHub repositories under the [Zowe GitHub project](https://github.com/zowe). You contribute to the project through Pull Requests in GitHub.

Each pull request is made against a repository that has assigned "maintainers". Pull requests cannot be merged without the approval of at least one maintainer, who will review Pull Requests to ensure that they meet the following criteria:

- The code in the pull request must adhere to the [General Code Style Guidelines](general.md).
- The code must compile/transpile (where applicable) and pass a smoke-test such that the code is not known to break the current state of Zowe.
- The pull request must describe the purpose and implementation to the extent that the maintainer understands what is being accomplished. Some pull requests need less details than others.
- The pull request must state how to test this change, if applicable, such that the maintainer or a QA team can check correctness. The explanation may simply be to run included test code.
- If a pull request depends upon a pull request from the same/another repository that is pending, this must be stated such that maintainers know in which order to merge open pull requests.

<!--Note, the following sections are about doc. But it's written for developers telling them how to document their code. I think this is fine to be in the "Contributing to Code" section but we can say "for more info about contributing to the doc-site, see contributing to doc". -->

## Documenting your Code

Documentation of Zowe&trade; comes in various forms depending on the subject being detailed. In general, consider how you can help end users and contributors through external documentation, in-product help, error messages, etc... and open an issue in [zowe/docs-site](https://github.com/zowe/docs-site) if you need assistance.

Provide the following documentation depending on the component that you contribute to:

### Zowe Docs Site
The external documentation for the Zowe project, [Zowe Docs](https://docs.zowe.org/), is completely open-source. See [How to contribute](../contributing.md) for more information about contributing to the documentation.

Consider: Release Notes, Install/Config/User Guides, Developer Tutorials, etc...

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

For more information, see the CLI [documentation contribution guidelines](https://github.com/zowe/zowe-cli/blob/conformance/CONTRIBUTING.md#documentation-guidelines).

### Imperative CLI Framework

Contributions that affect end users of the CLI should be documented on Zowe Docs site.

Contributions that affect the underlying Imperative CLI Framework should be documented in [the GitHub Wiki](https://github.com/zowe/imperative/wiki) for future developers using the framework.

Code documentation follows language-specific formats.

### Programming Languages

Each of the common languages in Zowe have code-documentation-generation tools, each with their own in-code comment style requirements to adhere to in order to generate readable API references. Objects and functions of interest should be commented in accordance to the language-specific tools to result in output that serves as the first point of documentation for APIs.

- **Typescript**

    When writing TypeScript code, comment objects and functions in compliance with [JSDoc](http://usejsdoc.org/). If you are writing in an area of the codebase that does not yet have a definition file for JSDoc, define a configuration file that can be used for future documentation of that code.

- **Java**

    When writing TypeScript code, comment objects and functions in the Javadoc format.

- **C**

    When writing C code, comment functions and structures in compliance with Doxygen.

## Code style guidelines

All code written in the languages described in [Code categories](categories.md) should adhere to the following guidelines to facilitate collaboration and understanding.

**Note:** Uncertainties, unimplemented but known future action-items, and odd/specific constants should all be accompanied with a short comment to make others aware of the reasoning that went into the code.

### Whitespaces

Do not use tabs for whitespace. Use 2 spaces per tab instead.

### Naming Conventions

Self-documenting code reduces the need for extended code comments. It is encouraged to use names as long as necessary to describe what is occurring.

### Functions and methods

Methods should be named as verbs (for example, `get` or `set`), while Objects/Classes should be nouns.

Objects and functions should be CamelCase. Methods on Objects should be dromedaryCase.

### Variables

Constants should be CAPITALIZED_AND_UNDERSCORED for clarity, while variables can remain dromedaryCase.

Avoid non-descriptive variable names such as single letters (except for iteration in loops such as i or j) and variable names that have been arbitrarily shortened (Don't strip vowels; long variable names are OK).
