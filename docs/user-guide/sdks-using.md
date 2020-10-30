# Using Zowe SDKs

Learn about using the Zowe Client Software Development Kits (SDKs). The SDKs enable you to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Node.js Client SDK
- Zowe Python Client SDK

## Software requirements

Before you use the Python SDK, install the following software:

<!-- These are listed in the python repo. I assume that the end user needs to install them prior to calling the APIs? Do they install them into their project? -->

- [requests-2.22](https://github.com/psf/requests)
- [keyring](https://github.com/jaraco/keyring)
- [pyyaml](https://github.com/yaml/pyyaml)
- [urllib3](https://github.com/urllib3/urllib3)

## Getting started

To get started, download and import the SDK packages to your project. Alternatively, you can pull the packages from an online registry.

### Install SDK from local package

Download and install the packages.

**Follow these steps:**

1. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html). Select your desired programming language in the **Zowe Client SDKs** section.

   The SDK is downloaded to your computer.

2. Unzip the SDK folder, which contains the packages for each set of functionality (such as z/OS Jobs). Copy each file that you want to install and paste them into your project directory.

3. **(Node.js SDK only)** Install required dependencies for the Node SDK. In a command-line window, navigate to your project directory and issue the following commands:

    ```
    npm install core-for-zowe-sdk.tgz
    ```

    ```
    npm install imperative.tgz
    ```

4. In a command-line window, navigate to your project directory. Issue *one* of the following commands.

   - To install a Node.js package: `npm install <packageName>.tgz`
   - To install a Python package: `pip install <packageName>.whl`

    *where* `<packageName>` is the name of the package that you want to install, such as `zos-files-for-zowe-sdk`.

    The packages are installed and you can call the APIs from within your project.

### Install SDK from online registry

Define the packages as dependencies in your project and pull them from an online registry.

**Follow these steps:**

1. **(Node.js SDK only)** Install required dependencies for the Node SDK. In a command-line window, navigate to your project directory and issue the following commands:
npm install @zowe/core-for-zowe-sdk and npm install @zowe/imperative
    ```
    npm install @zowe/core-for-zowe-sdk
    ```

    ```
    npm install @zowe/imperative
    ```

2. In command-line window, navigate to your project directory. Issue the following command to install a package from the registry:

   - To import a Node.js package: `npm install <PackageName>`
   - To import a Python package: `pip install <PackageName>`

   *where* `<packageName>` is the name of the package that you want to install, such as `zos-files-for-zowe-sdk`.

    The package is installed in your `package.json` or `setup.py` file.

3. **(Optional)** You might want to automatically update the SDK version when updates become available, or you might want to prevent automatic updates. To define the versioning scheme, use [npm semver](https://docs.npmjs.com/misc/semver#x-ranges-12x-1x-12-).

    The packages are installed and you can call the APIs from within your project.

## Using

The following examples demonstrate how to call the API endpoints:

**Node.js Example:**

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
import { getDefaultProfile } from "@zowe/core-for-zowe-sdk";
import { Submit } from "@zowe/zos-jobs-for-zowe-sdk";

const profile = await getDefaultProfile("zosmf", true)
```

**Python Example**

After you install the package in your project,  import the class for the required sub-package (i.e `Console` class for z/OS Console commands). Create a dictionary to handle communication with z/OSMF:

```python
from zowe.zos_console_for_zowe_sdk import Console

connection = {
    "host_url": "'<host address>'",
    "user": "<user>",
    "password": "<password>",

}
my_console = Console(connection)
```

## API documentation

Browse or download the [API Reference documentation](https://docs.zowe.org/stable/#zowe-client-sdk-reference-guides) for details about each endpoint.

For more information about the Node.js SDK, including usage examples, see the documentation in the [Node SDK Readme](https://github.com/zowe/zowe-cli#using-the-zowe-node-apis).

For more information about the Python SDK, including usage examples see the [Python SDK ReadTheDocs](https://zowe-client-python-sdk.readthedocs.io/en/latest/).

## Contributing

For information about contributing to the open-source Zowe SDKs, see [Developing for Zowe SDKs](../extend/extend-sdks.md).
