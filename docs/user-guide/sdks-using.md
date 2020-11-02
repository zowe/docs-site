# Using Zowe SDKs

Leverage the Zowe Client Software Development Kits (SDKs) to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Node.js Client SDK
- Zowe Python Client SDK

## Software requirements

### Node.js

If you download Node SDK packages **from Zowe.org**, the downloaded folder contains dependencies that you must install manually. Extract the TGZ files from the folder, copy the files to your project, and issue the following commands:

    ```
    npm install core-for-zowe-sdk.tgz
    ```

    ```
    npm install imperative.tgz
    ```

If you install Node SDK packages **from the online registry**, the required dependencies are installed automatically.

### Python

If you download the Python SDK packages **from Zowe.org**, the downloaded folder contains dependencies that you must install manually. Extract the WHL files from the folder, copy the files to your project, and issue the following command for each dependency:

```
pip install <fileName>.whl
```

If you install Python SDK packages **from the online registry**, the required dependencies are installed automatically.

## Getting started

To get started, download and import the SDK packages to your project. Alternatively, you can pull the packages from an online registry.

### Install SDK from local package

Download and install the packages.

**Follow these steps:**

1. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html). Select your desired programming language in the **Zowe Client SDKs** section.

   The SDK is downloaded to your computer.

2. Unzip the SDK folder, which contains the packages for each set of functionality (such as z/OS Jobs). Copy each file that you want to install and paste them into your project directory.

3. Install required dependencies, which are included in the bundle. See [Software requirements](#software-requirements) above for more information.

3. In a command-line window, navigate to your project directory. Issue *one* of the following commands.

   - To install a Node.js package: `npm install <packageName>.tgz`
   - To install a Python package: `pip install <packageName>.whl`

    *where* `<packageName>` is the name of the package that you want to install, such as `zos-files-for-zowe-sdk`.

    The packages are installed and you can call the APIs from within your project.

### Install SDK from online registry

Define the packages as dependencies in your project and pull them from the online npm registry.

**Follow these steps:**

1. In command-line window, navigate to your project directory. Issue the following command to install a package from the registry:

   - To import a Node.js package: `npm install <PackageName>`
   - To import a Python package: `pip install <PackageName>`

   *where* `<packageName>` is the name of the SDK package that you want to install, such as `zos-files-for-zowe-sdk`.

    The packages are installed and you can call the APIs from within your project. Node packages are defined in `package.json` in your project. Python packages are installed to a location on your computer such as `/Users/AppData`.

2. **(Optional)** You might want to automatically update the SDK version when updates become available, or you might want to prevent automatic updates.

    To define the versioning scheme for Node packages, use [npm semver](https://docs.npmjs.com/misc/semver#x-ranges-12x-1x-12-).

    To define versioning for Python packages, specify versions or version ranges in a `requirements.txt` file checked in to their project. More information, see [pip documentation](https://pip.pypa.io/en/stable/reference/pip_install/#example-requirements-file)


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

::: tip
If you *do not* want to use the Base Profile functionality, you can omit `, true` from the example above. Base profiles let your application integrate with Zowe API Mediation Layer by storing an authentication token. They also provide a mechanism to store common values such as username, password, etc..., to be inherited by other service profiles.
:::

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
