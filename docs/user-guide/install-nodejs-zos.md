# Installing Node.js on z/OS

Installing Zowe requires Node.js Version 6.14.4.1 or later to be installed on the z/OS host where you install the Zowe Application Server.

## Hardware and software requirements

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**

z/OS V2R2 with PTF UI46658 or z/OS V2R3, z/OS UNIX System Services enabled, and Integrated Cryptographic Service Facility (ICSF) configured and started.

**Note:** Requirements, including installing Python, Make 4.1, or Perl, are not needed for Zowe.

## Installing Node.js

1. Download the pax.Z file from the [Download](https://developer.ibm.com/node/sdk/ztp/#downloads-ztp) section to a z/OS machine.
1. Extract the pax.Z file inside an installation directory of your choice. For example:

    ```pax -rf <path_to_pax.Z_file> -x pax```

1. If required, export the following environment variables before you install the C/C++ compiler:

    - `COMPILER_INSTALL_MSGCLASS`

       The compiler installation tool requires an appropriate MSGCLASS parameter that logs the output of a dependent JCL job to the HELD OUTPUT QUEUE. The default MSGCLASS value is “s”. You can override this value by using the COMPILER_INSTALL_MSGCLASS environment variable:
       ```
       export COMPILER_INSTALL_MSGCLASS=<custom MSGCLASS>
       ```
       Failure to set an appropriate MSGCLASS can result in XMIT errors, as described in the [Troubleshooting](https://developer.ibm.com/node/sdk/ztp/#trb_msgclass) section for IBM SDK for Node.js - z/OS Trial .

    - `COMPILER_INSTALL_HLQ`

       By default, the compiler installation script creates datasets under your user ID’s HLQ. You can specify a custom HLQ for the datasets by setting the COMPILER_INSTALL_HLQ environment variable:
       ```
       export COMPILER_INSTALL_HLQ=<custom_HLQ>
       ```

1. Add the full path of your installation directory to your PATH environment variable:
    ```
    export PATH=<installation_directory>/bin/:$PATH
    ```
1. Run the node and npm commands from the command line.
1. After you install Node.js, set the *NODE_HOME* environment variable to the directory where Node.js is installed. For example, `NODE_HOME=/proj/mvd/node/installs/node-v6.14.4-os390-s390x`.

For more information, see the [documentation for IBM SDK for Node.js - z/OS](https://developer.ibm.com/node/sdk/ztp/#documentation-ztp). 
