# Setting up your development environment
Before you follow the development tutorials for creating a Zowe CLI plug-in, follow these steps to set up your environment.

## Prequisites

[Install Zowe CLI](../../user-guide/cli-installcli.html#methods-to-install-zowe-cli).

## Initial setup 
To create your development space, you will clone and build [zowe-cli-sample-plugin](https://github.com/zowe/zowe-cli-sample-plugin) from source. Ensure that you clone the 

Before you clone the repository, create a local development folder named `zowe-tutorial`. You will clone and build all projects in this folder.

### Clone zowe-cli-sample-plugin and build from source
Clone the repository into your development folder to match the following structure:
```
zowe-tutorial
└── zowe-cli-sample-plugin
```
Follow these steps:
1. `cd` to your `zowe-tutorial` folder.
2. `git clone https://github.com/zowe/zowe-cli-sample-plugin`
3. `cd` to your `zowe-cli-sample-plugin` folder.
4. `npm install`
5. `npm run build`

    The first time that you build, the script will interactively ask you for the location of your Zowe CLI directory. Subsequent builds will not ask again.

    The build script creates symbolic links. On Windows, you might need to have Administrator privileges to create those symbolic links.

### (Optional) Run the automated tests
We recommend running automated tests on all code changes. Follow these steps:

1. `cd` to the `__tests__/__resources__/properties` folder.
2. Copy `example_properties.yaml` to `custom_properties.yaml`.
3. Edit the properties within `custom_properties.yaml` to contain valid system information for your site.
4. `cd` to your `zowe-cli-sample-plugin` folder
5. `npm run test`

## Next steps
After you complete your setup, follow the [Installing the sample plug-in](cli-installing-sample-plugin.md) tutorial to install this sample plug-in to Zowe CLI.
