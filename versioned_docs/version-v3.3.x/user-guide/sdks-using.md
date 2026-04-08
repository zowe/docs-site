# Using Zowe SDKs

Leverage the Zowe Client Software Development Kits (SDKs) to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Client Java SDK
- Zowe Client Kotlin SDK
- Zowe Client Node.js SDK
- Zowe Client Python SDK *technical preview*

## SDK documentation

For detailed SDK documentation, see the following:
- [Zowe Node.js SDK](https://docs.zowe.org/stable/typedoc/index.html)
- [Zowe Client Python SDK](https://zowe-client-python-sdk.readthedocs.io/en/latest/)

## Software requirements

### Java SDK

Requires Java runtime version 11 and later versions.

### Node.js SDK

If you install Node SDK packages from the online registry, the required dependencies are installed automatically.

If you download Node SDK packages from Zowe.org, the folder contains dependencies that you must install manually. Extract the TGZ files from the folder, copy the files to your project, and issue the following commands to install the dependencies:

```
npm install imperative.tgz
```

```
npm install core-for-zowe-sdk.tgz
```

### Python SDK

If you install Python SDK packages from the online registry, the required dependencies are installed automatically.

If you download the Python SDK packages from Zowe.org, the downloaded folder contains dependencies that you must install manually. Extract the WHL files from the folder, copy the files to your project, and issue the following command for each dependency:

```
pip install <fileName>.whl
```

## Getting started

To get started, import the SDK packages to your project. You can pull the packages from an online registry, or download the packages from Zowe.org to install locally.

### Install Java SDK from an online registry

To install this library in your project, use a build tool such as Maven, Gradle or Ant. Use the following link to get the necessary artifact:

https://mvnrepository.com/artifact/org.zowe.client.java.sdk/zowe-client-java-sdk

For a Maven project, add the SDK as a dependency by updating your `pom.xml`:
```
    <dependency>
        <groupId>org.zowe.client.java.sdk</groupId>
        <artifactId>zowe-client-java-sdk</artifactId>
        <version>2.2.0</version>
    </dependency>
```

For a Gradle project, add the SDK as a dependency by updating your `build.gradle`:

```
    implementation group: 'org.zowe.client.java.sdk', name: 'zowe-client-java-sdk', version: '2.2.0'
```

The version 2.2.0 can change. Look at the artifact link to select the latest version.

### Install Node.js SDK from an online registry

Pull the packages from an online registry such as npm.

1. In the command-line window, navigate to your project directory. Issue the following command to install a package from the registry:

   - To import a Node.js package: `npm install <PackageName>`

     * `<packageName>`
     The name of the SDK package that you want to install, such as `zos-files-for-zowe-sdk`.

     The packages are installed. Node packages are defined in `package.json` in your project.

2. **(Optional)** You might want to automatically update the SDK version when updates become available, or you might want to prevent automatic updates.

    - To define the versioning scheme for Node packages, use [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

### Install Python SDK from an online registry

Pull the packages from an online registry such as PyPi.

1. In the command-line window, navigate to your project directory. Issue the following command to install a package from the registry:

   - To import a Python package, use the following syntax:
    `pip install <PackageName>`

     * `<packageName>`
     The name of the SDK package that you want to install, such as `zos-files-for-zowe-sdk`.

     Python packages are installed by default to `$PYTHONPATH/Lib/site-packages` (Linux) or to the Python folder in your local `/AppData` folder (Windows).

2. **(Optional)** You might want to automatically update the SDK version when updates become available, or you might want to prevent automatic updates.

    - To define versioning for Python packages, specify versions or version ranges in a `requirements.txt` file checked-in to your project. For more information, see [pip install](https://pip.pypa.io/en/stable/cli/pip_install/) in the pip documentation.

### Install Node.js and Python SDKs from a local package

Download and install the packages.

1. Navigate to [Zowe.org Downloads](https://www.zowe.org/download.html). Select your desired programming language in the **Zowe Client SDKs** section.

   The SDK is downloaded to your computer.

2. Unzip the SDK folder, which contains the packages for each set of functionality (such as z/OS Jobs). Copy each file that you want to install and paste them into your project directory.

3. Install required dependencies, which are included in the bundle. See [Software requirements](#software-requirements) above for more information.

4. In a command-line window, navigate to your project directory. Issue *one* of the following commands:

   - To install a Node.js package, use the following syntax:
    `npm install <packageName>.tgz`

   - To install a Python package, use the following syntax:
    `pip install <packageName>.whl`

    * `<packageName>`
    The name of the package that you want to install, such as `zos-files-for-zowe-sdk`.

    Repeat the command for each package that you need. Packages are now installed.

## Using

After you install the SDK, you can make API calls to the mainframe from within your project.

### Using - Java

For Java SDK usage and syntax examples, refer to the following package READMEs:

- [Team Config](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/teamconfig/README.md) - Read only team configuration operations.
- [z/OS Console](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zosconsole/README.md) - Perform z/OS console operations.
- [z/OS Files-dsn](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zosfiles/dsn/README.md) - Work with data sets on z/OS.
- [z/OS Files-uss](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zosfiles/uss/README.md) - Work with UNIX system services (USS) files on z/OS.
- [z/OS Jobs](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zosjobs/README.md) - Work with batch jobs on z/OS.
- [z/OS Log](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zoslogs/README.md) - Work with logs on z/OS.
- [z/OS Management Facility](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zosmfinfo/README.md) - Return data about z/OSMF, such as connection status or a list of available systems.
- [z/OS TSO](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zostso/README.md) - Interact with TSO/E address spaces on z/OS.
- [z/OS USS](https://github.com/zowe/zowe-client-java-sdk/blob/main/src/main/java/zowe/client/sdk/zosuss/README.md) - ssh unix command request operation.

SDK Javadoc:

https://javadoc.io/doc/org.zowe.client.java.sdk/zowe-client-java-sdk/latest/index.html

See the following GitHub organization location Zowe-Java-SDK for demo apps and code examples for most API calls:

https://github.com/Zowe-Java-SDK

### Using - Node.js

For Node SDK usage and syntax examples, refer to the following package READMEs:

- [Core libraries](https://www.npmjs.com/package/@zowe/core-for-zowe-sdk) - Use shared libraries, such as `rest` to access z/OSMF REST APIs, `auth` for connecting to token-based authentication services, and more.
- [z/OS Console](https://www.npmjs.com/package/@zowe/zos-console-for-zowe-sdk) - Perform z/OS console operations.
- [z/OS Files](https://www.npmjs.com/package/@zowe/zos-files-for-zowe-sdk) - Work with data sets on z/OS.
- [z/OS Jobs](https://www.npmjs.com/package/@zowe/zos-jobs-for-zowe-sdk) - Work with batch jobs on z/OS.
- [z/OS Management Facility](https://www.npmjs.com/package/@zowe/zosmf-for-zowe-sdk) - Return data about z/OSMF, such as connection status or a list of available systems.
- [z/OS Provisioning](https://www.npmjs.com/package/@zowe/provisioning-for-zowe-sdk) - Provision middleware and resources such as IBM CICS, IBM Db2, IBM MQ, and more.
- [z/OS TSO](https://www.npmjs.com/package/@zowe/zos-tso-for-zowe-sdk) - Interact with TSO/E address spaces on z/OS.
- [z/OS USS](https://www.npmjs.com/package/@zowe/zos-uss-for-zowe-sdk) - Work with UNIX system services (USS) files on z/OS.
- [z/OS Workflows](https://www.npmjs.com/package/@zowe/zos-workflows-for-zowe-sdk) - Create and manage z/OSMF workflows on z/OS.

### Using Python

For information about the Python SDK, including usage and syntax examples, see the [Python SDK ReadTheDocs](https://zowe-client-python-sdk.readthedocs.io/en/latest/).

### Using Kotlin

For information about Zowe Client Kotlin SDK, including a setup guide and source code documentation, see the [Zowe Client Kotlin SDK docs](https://zowe.github.io/zowe-client-kotlin-sdk/).

### Using Java
For information about how to use Zowe Client Java SDK, see [this README.md section](https://github.com/zowe/zowe-client-java-sdk/?tab=readme-ov-file#examples).
