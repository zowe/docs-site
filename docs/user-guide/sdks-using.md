# Using Zowe SDKs

Learn about using the Zowe Client Software Development Kits (SDKs). The SDKs enable you to build client applications and scripts that interface with the mainframe.

The SDKs include programamatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Node Client SDK
- Zowe Python Client SDK

## Software requirements

Before you use the Python SDK, install the following software:

<!-- These are listed in the python repo. I assume that the end user needs to install them prior to calling the APIs? Do they install them into their project? -->

- [requests-2.22](https://github.com/psf/requests)
- [keyring](https://github.com/jaraco/keyring)
- [pyyaml](https://github.com/yaml/pyyaml)

## Getting started

To get started, download and import the SDK packages to your project. Alternatively, you can pull the packages from an online registry.

### Install SDK from local package

Download and install the packages.

**Follow these steps:**

1. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html). Select your desired programming language in the **Zowe Client SDKs** section.

   The SDK is downloaded to your computer.

2. Unzip the SDK folder, which contains the packages for each set of functionality (such as z/OS Jobs). Copy each file that you want to install and paste them into your project directory.

3. In a command-line window, navigate to your project directory. Issue one of the following commands:

   - To install a Node package: `npm install <fileName>.tgz`
   - To install a Python package: `pip install <fileName>.whl`

   The packages are installed and you can call the APIs from within your project.

### Install SDK from online registry

Define the packages as dependencies in your project and pull them from an online registry.

**Follow these steps:**

1. In command-line window, navigate to your project directory. Issue the following command to install a package from the registry:

   - To import a Node package: `npm install <sdkPackageName>`
   - To import a Python package: `pip install <sdkPackageName>`

    The package is installed and defined in your `package.json` or `requirements.txt` file.

2. **(Optional)** You might want to automatically update the SDK version when updates become available, or you might want to prevent automatic updates. Use [npm semver](https://docs.npmjs.com/misc/semver#x-ranges-12x-1x-12-) to define the versioning scheme.

    The packages are installed and you can call the APIs from within your project.

## Using

The following examples demonstrate how to call the API endpoints:

**Node Example:**

After you install the package in your project, create a session object to handle communication with z/OSMF. This example shows how to import the z/OS Files APIs and define your connection details in the session object:

```javascript
import { Download } from "@zowe/zos-files-for-zowe-sdk";

const session = new Session({
    hostname: '<host address>',
    user: '<zosmf user>',
    password: '<zosmf password>'
});
```

To use a Zowe CLI z/OSMF profile instead of manual authentication, provide the profile name when you create the object:

```javascript
import { CliProfileManager } from "@zowe/imperative";
import { Submit } from "@zowe/zos-jobs-for-zowe-sdk";

const profileManager = new CliProfileManager({
  	profileRootDirectory: require("path").join(require("os").homedir(), ".zowe", "profiles"),
  	type: "zosmf"
});
const profile = (await profileManager.load({ loadDefault: true })).profile;
```

**Python Example**

After you install the package in your project,  import the `ZoweSDK` class. Create an object to handle communication with z/OSMF:

```python
from zowe_sdk import ZoweSDK

z = ZoweSDK(zosmf_host='<host address>', zosmf_user='<zosmf user>', zosmf_password='<zosmf password>')
```

To use a Zowe CLI z/OSMF profile instead of manual authentication, provide a profile name when you create the object:

```python
from zowe_sdk import ZoweSDK
z = ZoweSDK(zosmf_profile='<profile name>')
```

## API documentation

Browse or download the [API Reference documentation](https://docs.zowe.org/stable/#zowe-client-sdk-reference-guides) for details about each endpoint.

For more information about the Node SDK, including usage examples, see the documentation in the [Node SDK Readme](https://github.com/zowe/zowe-cli#using-the-zowe-node-apis).

For more information about the Python SDK, including usage examples see the [Python SDK Readme](https://github.com/zowe/zowe-client-python-sdk#zowe-python-client-sdk).

## Contributing

For information about contributing to the open-source Zowe SDKs, see [Developing for Zowe SDKs](./extend/../../extend/extend-sdks.md).




