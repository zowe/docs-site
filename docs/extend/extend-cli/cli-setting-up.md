# Setting up your development environment
Before you follow the development tutorials for creating a Zowe&trade; CLI plug-in, follow these steps to set up your environment.

## Prerequisites
[Install Zowe CLI](../../user-guide/cli-installcli#methods-to-install-zowe-cli).

## Initial setup
To create your development space, clone and build [zowe-cli-sample-plugin](https://github.com/zowe/zowe-cli-sample-plugin/#zowe-cli-sample-plug-in) from source.

Before you clone the repository, create a local development folder named `zowe-tutorial`. You will clone and build all projects in this folder.

## Branches

There are two branches in the repository that correspond to different Zowe CLI versions. You can develop two branches of your plug-in so that users can install your plug-in into `@latest` or `@zowe-v2-lts` CLI. Developing for both versions will let you take advantage of new core features quickly and expose your plug-in to a wider range of users.

The `master` branch of Sample Plug-in is compatible with the `@zowe-v2-lts` version of core CLI (Zowe LTS release).

The `master` branch of Sample Plug-in is also compatible with the `@latest` version of core CLI (Zowe Active Development release) at this time.

For more information about the versioning scheme, see [Maintainer Versioning](https://github.com/zowe/zowe-cli/blob/master/docs/MaintainerVersioning.md) in the Zowe CLI repository.

### Clone zowe-cli-sample-plugin and build from source
Clone the repository into your development folder to match the following structure:
```
zowe-tutorial
└── zowe-cli-sample-plugin
```
**Follow these steps:**

1. `cd` to your `zowe-tutorial` folder.
2. `git clone https://github.com/zowe/zowe-cli-sample-plugin`
3. `cd` to your `zowe-cli-sample-plugin` folder.
4. `git checkout master`
5. `npm install`
6. `npm run build`

### (Optional) Run the automated tests
We recommend running automated tests on all code changes. Follow these steps:

1. `cd` to the `__tests__/__resources__/properties` folder.
2. Copy `example_properties.yaml` to `custom_properties.yaml`.
3. Edit the properties within `custom_properties.yaml` to contain valid system information for your site.
4. `cd` to your `zowe-cli-sample-plugin` folder
5. `npm run test`

## Next steps
After you complete your setup, follow the [Installing the sample plug-in](cli-installing-sample-plugin.md) tutorial to install this sample plug-in to Zowe CLI.
