# Creating plug-in lifecycle actions

As a developer, you may want your plug-in to perform certain tasks immediately after install and just before uninstall.

Many different types of tasks can make up these *plug-in lifecycle actions*, including the following examples:

- Post-install actions:
    - A sanity check 
    - Additional setup
    - Adding the plug-in as an override of Zowe CLI Credential Manager

- Pre-uninstall actions:
    - Revert specialized setup
    - Removing the plug-in as an override of Zowe CLI Credential Manager

Creating and using lifecycle actions is optional, but they can be useful tools. Lifecycle actions can automate a manual process intended for the plug-in user to carry out. They can also avoid the need to create commands with uses limited to post-install and pre-uninstall tasks.

**Note:** When creating a plug-in to override Zowe CLI Credential Manager, it is necessary to implement a post-install action to configure your plug-in as the credential manager.

## Implenting lifeycyle actions

Add the `pluginLifeCycle` property to your plug-in definition file and include a plug-in class to implement lifecycle functions.

Follow these steps:

1. Navigate to the plug-in definition file.

    This file is the value for the `configurationModule` property in the plug-in `package.json` file.

    See this [`IImperativeConfig.ts` file](https://github.com/zowe/imperative/blob/master/packages/imperative/src/doc/IImperativeConfig.ts) to view an example of the detailed format use in the plug-in definition file.

2. In the plug-in definition file, use the `pluginLifeCycle` property to add the path to the javascript file the plug-in uses to implement the class containing lifecycle functions.

    This plug-in lifecycle functions class extends the `AbstractPluginLifeCycle` class [found in the Imperative package of utility functions](https://github.com/zowe/imperative/blob/master/packages/imperative/src/plugins/AbstractPluginLifeCycle.ts).

3. In the plug-in lifecycle functions class you created, add instructions for both the `postInstall` and `preUninstall` functions.

    If implemented correctly, Zowe CLI calls the `postInstall` function of the plug-in immediately after the plug-in has been installed. Similarly, the `preUninstall` function is called immediately before the Zowe CLI uninstalls the plug-in.

**Note:** If your plug-in needs to perform an operation at only post-install or pre-uninstall, implement the other action to simply return to Zowe CLI without taking any action.
