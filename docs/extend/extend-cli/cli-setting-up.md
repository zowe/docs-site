# Setting up your development environment
Before you follow the development tutorials for creating a Zowe&trade; CLI plug-in, follow these steps to set up your environment.

## Prerequisites
[Install Zowe CLI](../../user-guide/cli-installcli#methods-to-install-zowe-cli).

## Initial setup

### Clone and build your project

1. Create a local development folder named `zowe-tutorial` to clone and build all projects in this folder.

2. Clone [`zowe-cli-sample-plugin`](https://github.com/zowe/zowe-cli-sample-plugin/#zowe-cli-sample-plug-in) and build from source.

    Clone the repository into your development folder to match the following structure:
    ```
    zowe-tutorial
    └── zowe-cli-sample-plugin
    ```

    1. Open a terminal and enter `cd zowe-tutorial` to change directory into your `zowe-tutorial` folder.
    2. Enter `git clone https://github.com/zowe/zowe-cli-sample-plugin` to clone the `zowe-cli-sample-plugin` repository.
    3. Enter `cd zowe-cli-sample-plugin` to change directory into your `zowe-cli-sample-plugin` folder.
    4. Enter `npm install` to install all dependencies and modules for the project.
    5. Enter `npm run build` to create a production build.

### Optional step: Run automated tests

We recommend running automated tests on all code changes.

To run automated tests:

1. Use Visual Studio Code or your file explorer to copy the content in the `example_properties.yaml` file to the `custom_properties.yaml` file.
2. Use a text editor to edit the properties within `custom_properties.yaml` to contain valid system information for your site.
3. In a terminal, enter `cd zowe-cli-sample-plugin`  to change directory into your `zowe-cli-sample-plugin` folder.
4. Enter `npm run test` to run the automated test.

## Next steps

After you complete your setup, follow the [Installing the sample plug-in](cli-installing-sample-plugin.md) tutorial to install this sample plug-in to Zowe CLI.
