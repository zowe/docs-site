# Creating plug-in lifecycle actions

As a developer, you might want your plug-in to perform certain tasks immediately after install and just before uninstall.

Many different types of tasks can make up these *plug-in lifecycle actions*, including the following examples:

- Post-install actions:
    - An initial check
    - Additional setup
    - Adding the plug-in as an override of Zowe CLI's built-in credential manager

- Pre-uninstall actions:
    - Revert specialized setup
    - Removing the plug-in as an override of Zowe CLI's built-in credential manager

Creating and using lifecycle actions is optional, but they can be useful tools. Lifecycle actions can automate a manual process intended for the plug-in user to carry out. They can also avoid the need to create commands with uses limited to post-install and pre-uninstall tasks.

:::note
When creating a plug-in to override Zowe CLI's built-in credential manager, it is necessary to implement a post-install action to configure your plug-in as the credential manager.
:::

## Implementing lifecyle actions

To add the `pluginLifeCycle` property to your plug-in definition file and include a plug-in class to implement lifecycle functions:

1. Navigate to the plug-in definition file.

    The path to this file is the value for the `configurationModule` property in the plug-in `package.json` file.

2. In the plug-in definition file, use the `pluginLifeCycle` property to add the path to the javascript file the plug-in uses to implement the class containing lifecycle functions.

    The `pluginLifeCycle` property is defined in [this file](https://github.com/zowe/zowe-cli/blob/master/packages/imperative/src/imperative/src/doc/IImperativeConfig.ts).

    The class defined by this property extends the `AbstractPluginLifeCycle` class [found in the Imperative package of utility functions](https://github.com/zowe/zowe-cli/blob/master/packages/imperative/src/imperative/src/plugins/AbstractPluginLifeCycle.ts). 

3. In the plug-in lifecycle functions class you created, add instructions for both the `postInstall` and `preUninstall` functions.

    If implemented correctly, Zowe CLI calls the `postInstall` function of the plug-in immediately after the plug-in has been installed. Similarly, the `preUninstall` function is called immediately before the Zowe CLI uninstalls the plug-in.

:::note
If your plug-in needs to perform an operation at only post-install or pre-uninstall, implement the other action to simply return to Zowe CLI without taking any action.
:::
