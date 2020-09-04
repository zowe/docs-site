# Using Zowe SDKs

Learn about using the Zowe Client Software Development Kits (SDKs). The SDKs enable you to build client applications and scripts that interface with the mainframe.

The SDKs include programamatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Node Client SDK
- Zowe Python Client SDK

## Getting started

To get started, download and import the SDK packages into your project. You can also import packages from an online npm registry.

### Install SDK from local package

Download and install a set of offline TGZ files.

**Follow these steps:**

1. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html) and select a programming language from the **Zowe Client SDKs** section.

   The SDK is downloaded to your computer.

2. Copy each TGZ file that you want to install. Paste the files into your project directory.
3. Navigate to your project directory and issue the command `npm install <packageName>.tgz` for each package.

   The packages are installed and ready to use.

### Install SDK from npm registry

Define packages as dependencies in your project and access them from an online npm registry.

**Follow these steps:**

1. Issue the following command to import a package from public npm ``.  <!--TODO unsure about this procedure-->
2. Define the packages in your project `package.json` file. You might want to automatically update the SDK version in your project, or prevent automatic version updates.

    The packages are installed and ready to use.

## Using

The following examples demonstrate how to use the installed API packages:

**Node Example:**

After you install the package in your project, create a session object to handle communicate with z/OSMF. This example shows how to import the z/OS Files APIs and define your connection details in the session object:

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

After you install the package in your project,  import the `ZoweSDK` class. Create an object to handle handle communicate with z/OSMF:

```python
from zowe_sdk import ZoweSDK

z = ZoweSDK(zosmf_host='<host address>', zosmf_user='<zosmf user>', zosmf_password='<zosmf password>')
```

To use a Zowe CLI z/OSMF profile instead of manual authentication, provide a profile name when you create the object:

```python
from zowe_sdk import ZoweSDK
z = ZoweSDK(zosmf_profile='<profile name>')
```

<!-- TODO question - Do you think that this minimal info is enough to get started, and that from here it's easy enough to find the examples in the readmes? I didn't want to duplicate what's already written in readmes, so I see this page as "tying things together". -->

## API documentation

Browse or download the [API Reference documentation](https://docs.zowe.org/stable/#zowe-client-sdk-reference-guides) for detailed information about the API enpoints.

For more information about the Node SDK, including usage examples, see the documentation in the [Node SDK Readme](https://github.com/zowe/zowe-cli#using-the-zowe-node-apis).

For more information about the Python SDK, including usage examples see the [Python SDK Readme](https://github.com/zowe/zowe-client-python-sdk#zowe-python-client-sdk).

## Contributing

For information about contributing to the open-source Zowe SDKs, see [Developing for Zowe SDKs](./extend/../../extend/extend-sdks.md).




