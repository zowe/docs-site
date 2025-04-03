# Addressing Node.js requirements

Before you install Zowe&trade; on z/OS, you must install IBM SDK for Node.js on the same z/OS server that hosts the Zowe Application Server and z/OS Explorer Services. Review the information in this topic to obtain and install Node.js.

:::info Required role: system programmer
:::

:::note
Node.js is required when installing the Zowe servers on z/OS.
Node.js is not required if using Docker instead of z/OS, or if running Zowe without the app-server enabled on v2.16.0 or higher.
:::

- [Supported Node.js versions](#supported-nodejs-versions)
- [How to obtain IBM SDK for Node.js - z/OS](#how-to-obtain-ibm-sdk-for-nodejs---zos)
- [Hardware and software prerequisites](#hardware-and-software-prerequisites)
- [Installing the PAX edition of Node.js - z/OS](#installing-the-pax-edition-of-nodejs---zos)
- [Installing the SMP/E edition of Node.js - z/OS](#installing-the-smpe-edition-of-nodejs---zos)

## Supported Node.js versions

The following Node.js versions are supported to run Zowe. See the [Hardware and software prerequisites](#hardware-and-software-prerequisites) section for the prerequisites that are required by Zowe.

The corresponding [IBM SDK for Node.js - z/OS documentation](https://www.ibm.com/docs/en/sdk-nodejs-zos) lists all the prerequisites for Node.js. Some software packages, which might be listed as prerequisites there, are **NOT** required by Zowe. Specifically, you do **NOT** need to install Python, Make, Perl, or C/C++ runtime or compiler.  If you can run `node --version` successfully, you have installed the prerequisites required by Zowe.

:::note
IBM SDK for Node.js withdrew v16 from marketing on September 4, 2023. The v14 service ended on September 30, 2022. <!--Zowe ended support for node v14.x in September 2023.-->
:::


- v18.x
   - z/OS V2R4: PTFs UI78913, UI81096, UI78103, UI80155, UI83490
   - z/OS V2R5: PTFs UI78912, UI81095, UI80156, UI83424

- V20.x
   - z/OS V2R4: PTFs UI80106, UI81096, UI78103, UI80155, UI83490
   - z/OS V2R5: PTFs UI78912, UI81095, UI80156, UI83424
   - z/OS V3R1: No PTFs needed.
 
 - V22.x
   - z/OS V2R5: PTFs UI78912, UI81095, UI80156, UI83424
   - z/OS V3R1: No PTFs needed.
 

## How to obtain IBM SDK for Node.js - z/OS

You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways:
- Order the SMP/E edition through your IBM representative if that is your standard way to order IBM software.
- Order the SMP/E edition through IBM Shopz with optional paid support available.
- Download PAX file format at [ibm.com/products/sdk-nodejs-compiler-zos](https://www.ibm.com/products/sdk-nodejs-compiler-zos). IBM defect Support is not available for this format.

For more information, see the blog ["Options on how to obtain IBM Open Enterprise SDK for Node.js"](https://community.ibm.com/community/user/ibmz-and-linuxone/blogs/bruce-armstrong/2022/07/27/options-on-how-to-obtain-ibm-open-enterprise-sdk-f).

## Hardware and software prerequisites

To install Node.js for Zowe, the following requirements must be met.

The corresponding [IBM SDK for Node.js - z/OS documentation](https://www.ibm.com/docs/en/sdk-nodejs-zos) lists all the prerequisites for Node.js. Some software packages, which might be listed as prerequisites there, are **NOT** required by Zowe. Specifically, you do **NOT** need to install Python, Make, Perl, or C/C++ runtime or compiler.

If you run `node --version` successfully, you installed the Node.js prerequisites required by Zowe.

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**

- z/OS UNIX System Services enabled
- Integrated Cryptographic Service Facility (ICSF) configured and started

  ICSF is required for Node.js to operate successfully on z/OS.  If you have not configured your z/OS environment for ICSF, see [Cryptographic Services ICSF: System Programmer's Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/abstract.htm).  To see whether ICSF has been started, check whether the started task `ICSF` or `CSF` is active.

## Installing the PAX edition of Node.js - z/OS

Follow these steps to install the PAX edition of Node.js - z/OS to run Zowe.

1. Download the pax.Z file to a z/OS machine.
1. Extract the pax.Z file inside an installation directory of your choice.  
    For example:

    ```pax -rf <path_to_pax.Z_file> -x pax```

1. Add the full path of your installation directory to your PATH environment variable:
    ```
    export PATH=<installation_directory>/bin/:$PATH
    ```
1. Run the following command from the command line to verify the installation.
    ```
    node --version
    ```

    If Node.js is installed correctly, the version of Node.js is displayed. If it is intalled correctly, you will see the version information on your device.
1. After you install Node.js, set the `NODE_HOME` environment variable to the directory where Node.js is installed. For example, `NODE_HOME=/proj/mvd/node/installs/node-v6.14.4-os390-s390x`.

## Installing the SMP/E edition of Node.js - z/OS

To install the SMP/E edition of Node.js, see the [documentation for IBM SDK for Node.js - z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos). Remember that the software packages Perl, Python, Make, or C/C++ runtime or compiler that the Node.js documentation might mention are **NOT** needed by Zowe.
