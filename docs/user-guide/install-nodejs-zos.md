# Installing Node.js on z/OS

Before you install Zowe&trade;, you must install IBM SDK for Node.js on the same z/OS server that hosts the Zowe Application Server. To install Node.js for Zowe, you can follow the steps in this topic or in the IBM SDK for Node.js - z/OS documentation. 

**Note:** If you follow the steps in the Node.js documentation to install Node.js, you do **NOT** need to install Python, Make, Perl, or C/C++ runtime or compiler, which might be listed as prerequisites there. These software packages are **NOT** required by Zowe. If you can execute `node --version` successfully, you have installed the prerequisites required by Zowe.

## How to obtain IBM SDK for Node.js - z/OS

You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways: 
- Order the SMP/E version through your IBM representative for production use
- Use the pax evaluation for non-production deployments

For details, see the blog ["How to obtain IBM SDK for Node.js - z/OS, at no charge"](https://developer.ibm.com/mainframe/2019/04/17/ibm-sdk-for-node-js-z-os-at-no-charge/).

**Known issue:** There is a known issue with node.js v8.16.1 and Zowe desktop encoding. See [https://github.com/ibmruntimes/node/issues/142](https://github.com/ibmruntimes/node/issues/142) for details.

**Workaround:** Use node.js v8.16.2 or later which is available at [https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos](https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos). Download the `pax.Z` file.

## Hardware and software requirements

To install Node.js for Zowe, the following requirements must be met.

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**
- Node.js Version 6 (see [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSTRRS_6.0.0/com.ibm.nodejs.zos.v6.doc/plan.htm) for all prerequisites):
    - z/OS V2R2 with PTF UI46658 or z/OS V2R3

- Node.js Version 8 (see [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/smpe.htm) for all prerequisites):
   - z/OS V2R2: PTFs UI62788, UI46658, UI62416 (APARs PH10606, PI79959, PH10740)
   - z/OS V2R3: PTFs UI61308, UI61376, and UI61747 (APARs PH07107, PH08353, and PH09543)

- Node.js Version 12 (see [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSTRRS_12.0.0/com.ibm.nodejs.zos.v12.doc/smpe.htm) for all prerequisites):
   - z/OS V2R2: PTFs UI62788, UI46658, UI62416, UI62415
   - z/OS V2R3: PTFs UI61308, UI61375, UI61747

- z/OS UNIX System Services enabled
- Integrated Cryptographic Service Facility (ICSF) configured and started.

## Installing the PAX evaluation version of Node.js -z/OS

Follow these steps to installing the PAX evaluation version of Node.js - z/OS to run Zowe. 

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

    If Node.js is installed correctly, the version of Node.js is displayed.
1. After you install Node.js, set the *NODE_HOME* environment variable to the directory where Node.js is installed. For example, `NODE_HOME=/proj/mvd/node/installs/node-v6.14.4-os390-s390x`.

To troubleshoot or install the SMP/E version of Node.js, see the [documentation for IBM SDK for Node.js - z/OS](https://www.ibm.com/support/knowledgecenter/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/welcome.html). Remember that the software packages Perl, Python, Make, or C/C++ runtime or compiler that the Node.js documentation might mention are **NOT** needed by Zowe.
