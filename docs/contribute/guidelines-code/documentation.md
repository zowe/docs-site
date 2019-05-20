Documentation for Code Contributions 
Documentation of Zowe comes in various forms depending on the subject being detailed.

Categories
Server Core
Principles of operation and end-user guides (configuration, troubleshooting) should be documented on the wiki. Code documentation follows language-specific formats.

Server Security
Principles of operation and end-user guides (configuration, troubleshooting) should be documented on the wiki. Code documentation follows language-specific formats.

Microservices
Microservices implement a web API, and therefore must be documented for understanding and testing. These web APIs must be accompanied with documentation in the Swagger (https://swagger.io/) format. These documents must be Swagger 2.0, .yaml extension files. ZLUX plugins implementing microservices should store these files within the /doc/swagger folder.

Web Apps
ZLUX Apps should include documentation that explains how to use them, such that this documentation can integrate with a ZLUX documentation reader. This is not strictly API documentation, but rather user guides. The preferred documentation format is a .md extension file that exists in the /doc/guide folder of an App.

Web Framework
Principles of operation and end-user guides (configuration, troubleshooting) should be documented on the wiki. Code documentation follows language-specific formats.

CLI Plugins

CLI Framework
Principles of operation and end-user guides (configuration, troubleshooting) should be documented on the wiki. Code documentation follows language-specific formats.

Languages
Each of the common languages in Zowe have code-documentation-generation tools, each with their own in-code comment style requirements to adhere to in order to generate nice, readable API references. Objects and functions of interest should be commented in accordance to the language-specific tools to result in output that serves as the first point of documentation for APIs.

Typescript
When writing typescript code, comment objects and functions in compliance with JSDoc (http://usejsdoc.org/). If you are writing in an area of the codebase that does not yet have a definition file for jsdoc, be sure to define a configuration file that can be used for future documentation of that code.

Java
When writing typescript code, comment objects and functions in the Javadoc format.

C
When writing C code, comment functions and structs in compliance with Doxygen (www.doxygen.org).