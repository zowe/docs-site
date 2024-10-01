# Using Zowe SDKs

Leverage the Zowe Client Software Development Kits (SDKs) to build client applications and scripts that interface with the mainframe.

The SDKs include programmatic APIs, each of which performs a particular mainframe task. For example, one API package provides the ability to upload and download z/OS data sets. You can leverage that package to rapidly build a client application that interacts with data sets.

The following SDKs are available.
- Zowe Client Java SDK
- Zowe Client Kotlin SDK
- Zowe Client Node.js SDK
- Zowe Client Python SDK *technical preview*

## Using

After you install the SDK, you can make API calls to the mainframe from within your project.

### Using Node.js

For Node SDK usage and syntax examples, refer to the following package Readmes:

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
