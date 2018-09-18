# Core features and functionalities

The Imperative CLI Framework contains the capabilites that are described in the following topics.

## Standardized command definition structure
    
Imperative CLI Framework features a standardized command definition structure and a standardized approach to defining and implementing handlers. The framework also uses standardized command responses, such as messages and JSON response formats. Imperative CLI Framework contains an advanced mechanism for validating syntax. The framework supports the capability to programmatically process compound command handler statements. Imperative CLI Framework contains helper utilities.

**More information:**
- [Working with command handler responses](IMPF-ComHandResp.md)
- [Command definition and processing](IMPF-ComDefPro.md)
- [Generating command responses in JSON format](IMPF-generatejsonresponses.md)

## Generate help content
The framework lets you generate help content automatically.
  
**More information:**
- [Generating help automatically](IMPF-generatehelpauto.md)

## Create user profiles

Imperative CLI Framework lets you create user profiles during the configuration process. This capability includes a profile validation infrastructure. Also, the framework features a secure credential store, which helps you manage user profiles.

**More information:**
- [Working with plug-in profiles](IMPF-workingwithprofiles.md)
- [Storing credentials securely](IMPF-storecredsecure.md)

## Flexible extension framework

Imperative CLI framework contains a flexible extension framework that lets you add custom plug-ins to applications that are build on Imperative CLI framework, such as Zowe CLI.
    
**More information:**
- [Working with plug-ins]IMPF-workingwithplugins.md)

## CLI reference markdown

The framework lets you generate CLI reference markdown automatically.

## Utilities

Imperative CLI Framework contains the following utilities that let you perform the following tasks:

- Implement progress bars in your CLI.
- Logging and error handling capabilities.
- Generate tables and Pretty JSON files.
- Designate command Groups and commands as Experimental.
    
**More information:**
- [Implementing progress bars](IMPF-implementprogressbars.md)
- [Configuring logging](IMPF-logging.md)
- [Implementing experimental commands](IMPF-ExpCommands.md)
