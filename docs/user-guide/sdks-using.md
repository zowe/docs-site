# Using Zowe SDKs

Learn about using the Zowe Client Software Development Kits (SDKs). The SDKs enable you to build client applications and scripts that interface with the mainframe.

The SDKs includes programamatic APIs that each perform a particular mainframe task. For example, one API provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Node Client SDK
- Zowe Python Client SDK

## Getting started

To get started with the SDKs, navigate to [Zowe.org Downloads](https://www.zowe.org/download.html) and choose a programming language from the **Zowe Client SDKs** section. The package is downloaded to your computer.

<!--TODO add a list of items the user can expect to find in the SDK (files, readmes, etc..) -->

After you download an SDK, import the `ZoweSDK` class into your project. Create an object to handle requests to and from the mainframe.

**Example - Node:**

<!--TODO What is a basic example for importing Node SDK?-->

```
import node sdk example here
```

<!--TODO Similarly, is there a basic profile example for Node SDK?-->

To use a Zowe CLI z/OSMF profile instead of manual authentication, inform the profile name while creating the object:

```
node sdk profile example here
```

**Example - Python:**

```
from zowe_sdk import ZoweSDK

z = ZoweSDK(zosmf_host='<host address>', zosmf_user='<zosmf user>', zosmf_password='<zosmf password>')
```

To use a Zowe CLI z/OSMF profile instead of manual authentication, inform the profile name while creating the object:

```
from zowe_sdk import ZoweSDK
z = ZoweSDK(zosmf_profile='<profile name>')
```

<!-- TODO question - Do you think that this minimal info is enough to get started, and that from here it's easy enough to find the examples in the readmes? I didn't want to duplicate what's already written in readmes, so I see this page as "tying things together". -->

This is a brief introduction to using the SDKs. For complete documentation and usage examples, see the documentation in the [Node SDK Readme](https://github.com/zowe/zowe-cli#using-the-zowe-node-apis) or the [Python SDK Reamde](https://github.com/zowe/zowe-client-python-sdk#zowe-python-client-sdk).

## API documentation

Refer to the API Reference documentation for detailed information about each interface. To access the API Reference, do X Y and Z. <!-- Where is this mysterious API reference doc? Hosted? Local? Each SDK has it's own? -->

<!-- Note: I'm putting these links here again for good measure, since the bulk of the usage info is there. -->
To learn more about using the Node SDK, see the [Node SDK Readme](https://github.com/zowe/zowe-cli#using-the-zowe-node-apis).

To learn more about using the Python SDK, see the [Python SDK Readme](https://github.com/zowe/zowe-client-python-sdk#zowe-python-client-sdk).


