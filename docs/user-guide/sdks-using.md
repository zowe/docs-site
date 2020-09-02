# Using Zowe SDKs

Learn about using the Zowe Client Software Development Kits (SDKs). The SDKs enable you to build client applications and scripts that interface with the mainframe.

The SDKs include programamatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Node Client SDK
- Zowe Python Client SDK

## Getting started

To get started with the SDKs, navigate to [Zowe.org Downloads](https://www.zowe.org/download.html) and choose a programming language from the **Zowe Client SDKs** section. The package is downloaded to your computer.

<!--TODO Can we list the artifacts that the user can expect to find in the package after downloading (files, readmes, etc..)? -->

**Example - Node:**

Create a session object to communicate with z/OSMF. This example shows how to import the z/OS Files APIs and define your connection details in the session object:

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

**Example - Python:**

After you download an SDK, import the `ZoweSDK` class into your project. Create an object to handle requests to and from the mainframe:

```python
from zowe_sdk import ZoweSDK

z = ZoweSDK(zosmf_host='<host address>', zosmf_user='<zosmf user>', zosmf_password='<zosmf password>')
```

To use a Zowe CLI z/OSMF profile instead of manual authentication, provide a profile name when you create the object:

```python
from zowe_sdk import ZoweSDK
z = ZoweSDK(zosmf_profile='<profile name>')
```

The SDK is imported into your project and you can begin making API calls.

<!-- TODO question - Do you think that this minimal info is enough to get started, and that from here it's easy enough to find the examples in the readmes? I didn't want to duplicate what's already written in readmes, so I see this page as "tying things together". -->

## API documentation

Browse or download the [API Reference documentation](https://docs.zowe.org/stable/#zowe-client-sdk-reference-guides) for detailed information about the API enpoints.

For more information about the Node SDK, including usage examples, see the documentation in the [Node SDK Readme](https://github.com/zowe/zowe-cli#using-the-zowe-node-apis).

For more information about the Python SDK, including usage examples see the [Python SDK Readme](https://github.com/zowe/zowe-client-python-sdk#zowe-python-client-sdk).

## Contributing

For information about contributing to the open-source Zowe SDKs, see [Developing for Zowe SDKs](./extend/../../extend/extend-sdks.md).




