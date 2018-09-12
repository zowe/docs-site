# Welcome to Imperative CLI Framework
Imperative CLI Framework is a command processing system that lets application developers and systems programers build customized plug-ins quickly, by letting them focus on adding features rather than creating infrastructure.  

Within the imperative repository, we provide all the tools that application developers and systems programmers need to get started with building plug-ins.

## Get started today
To get started, review the core features that are built into Imperative CLI Framework and the plug-in functionality that the framework provides. You can build plug-ins for existing imperative-based applications, such as Zowe CLI.

## Contribution guidelines
If you want to contribute code to Imperative CLI Framework, see our contribution guidelines posted in the Imperative Framework repository.

## Review the Sample Plug-in

We provide a sample plug-in that you can use to get started developing your own plug-ins. 

**Note:** For more information on how to build the sample plug-in and install it to a CLI application, see the README.md file in the [Sample Plugin GitHub repository](URL).

## npm package requirements
Plug-ins that you build using Imperative CLI Framework must include `@types/yargs` as a devDependency in the `package.json` file. The suggested version to use is 8.0.2.

```
package.json content:
{
  "devDependencies": {
    "@types/yargs": "8.0.2"
  }
}
```
