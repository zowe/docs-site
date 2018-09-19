# Set up your development environment
Before you follow the development tutorials for creating a Zowe CLI plug-in, follow these steps to set up your environment.

## Prequisites
[Install Zowe CLI](https://zowe.github.io/docs-site/user-guide/cli-installcli.html#methods-to-install-zowe-cli).

## Initial setup 
To create your development space, you will clone and build [zowe-cli-sample-plugin]() from source.

Before you clone the repository, create a local development folder named `zowe-tutorial`. You will clone and build all projects in this folder.



### Clone zowe-cli-sample-plugin and build from source
Clone the repository into your development folder to match the following structure:
```
zowe-tutorial
└── zowe-cli-sample-plugin
```

1. `cd` to your `zowe-tutorial` folder
2. `git clone https://github.com/zowe/zowe-cli-sample-plugin`
3. `cd zowe-cli-sample-plugin`
4. `npm install`
5. `npm run build`

    The first time that you build, the script will interactively ask you for the location of your Zowe CLI directory. Subsequent builds will not ask again.
    
    The build script creates symbolic links. On Windows, you might need to have Administrator privileges to create those symbolic links.

### (Optional) Run the automated tests
1. `cd __tests__/__resources__/properties`
2. Copy `example_properties.yaml` to `custom_properties.yaml`.
3. Edit the properties within `custom_properties.yaml` to contain valid system information for your site.
4. `cd` to your `zowe-cli-sample-plugin` folder
5. `npm run test`


### Install the zowe-cli-sample-plugin to Zowe CLI
This process assumes that you already installed Zowe CLI on your PC.
1. `cd` to your `zowe-tutorial` folder.
2. `zowe plugins install ./zowe-cli-sample-plugin`
3. `zowe bp-sample`
   You should see help text displayed if the installation was successful.

## Next steps
After you complete your setup, follow the [Installing the sample plug-in to Zowe CLI]() tutorial to install this sample plug-in to Zowe CLI.
