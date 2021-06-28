# Installing Node.js on z/OS

Installing Zowe requires Node.js Version 6.14.4.1 or later to be installed on the z/OS host where you install the Zowe Application Server. This section summarizes the required configuration steps for installing Node.js for Zowe.

## Hardware and software requirements

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**

- z/OS V2R2 with PTF UI46658 or z/OS V2R3
- z/OS UNIX System Services is enabled
- Integrated Cryptographic Service Facility (ICSF) must be configured and started.

## Installing Node.js

1. Download the pax.Z file from the [Download](https://developer.ibm.com/node/sdk/ztp/#downloads-ztp) section to a z/OS machine.
1. Extract the pax.Z file inside an installation directory of your choice. For example:

    ```pax -rf <path_to_pax.Z_file> -x pax```

1. Add the full path of your installation directory to your PATH environment variable:
    ```
    export PATH=<installation_directory>/bin/:$PATH
    ```
1. Run the following command from the command line to verify the installation.
    ```
    node --version
    ```

    If Node.js is installed, the version of Node.js is displayed.
1. After you install Node.js, set the *NODE_HOME* environment variable to the directory where Node.js is installed. For example, `NODE_HOME=/proj/mvd/node/installs/node-v6.14.4-os390-s390x`.

To troubleshoot or read more information, see the [documentation for IBM SDK for Node.js - z/OS](https://developer.ibm.com/node/sdk/ztp/#documentation-ztp). 
