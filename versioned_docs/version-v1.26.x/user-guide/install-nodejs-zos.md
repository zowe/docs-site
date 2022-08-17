# Installing Node.js on z/OS

**Note: This section is not required if using Docker or only using the CLI.**

Before you install Zowe&trade; on z/OS, you must install IBM SDK for Node.js on the same z/OS server that hosts the Zowe Application Server and z/OS Explorer Services. Review the information in this topic to obtain and install Node.js.

- [Supported Node.js versions](#supported-nodejs-versions)
- [How to obtain IBM SDK for Node.js - z/OS](#how-to-obtain-ibm-sdk-for-nodejs---zos)
- [Hardware and software prerequisites](#hardware-and-software-prerequisites)
- [Installing the PAX edition of Node.js - z/OS](#installing-the-pax-edition-of-nodejs---zos)
- [Installing the SMP/E edition of Node.js - z/OS](#installing-the-smpe-edition-of-nodejs---zos)

## Supported Node.js versions

The following Node.js versions are supported to run Zowe. See the [Hardware and software prerequisites](#hardware-and-software-prerequisites) section for the prerequisites that are required by Zowe.

The corresponding [IBM Knowledge Center for Node.js - z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos) lists all the prerequisites for Node.js. Some software packages, which might be listed as prerequisites there, are **NOT** required by Zowe. Specifically, you do **NOT** need to install Python, Make, Perl, or C/C++ runtime or compiler.  If you can run `node --version` successfully, you have installed the prerequisites required by Zowe.

- v8.x (except v8.16.1)
   - z/OS V2R2: PTFs UI62788, UI46658, UI62416, UI62415 (APARs [PH10606](https://www-01.ibm.com/support/docview.wss?uid=swg1PH10606), [PI79959](https://www-01.ibm.com/support/docview.wss?uid=swg1PI79959), [PH10740](https://www-01.ibm.com/support/docview.wss?uid=swg1PH10740), [PH10741](https://www-01.ibm.com/support/docview.wss?uid=swg1PH10741))
   - z/OS V2R3: PTFs UI61308, UI61375, UI61747 (APARs [PH0710](https://www-01.ibm.com/support/docview.wss?uid=isg1PH07107), [PH08352](https://www-01.ibm.com/support/docview.wss?uid=swg1PH08352), [PH09543](https://www-01.ibm.com/support/docview.wss?uid=swg1PH09543))
   - z/OS V2R4: PTFs UI64839, UI64940, UI64837, UI64830 (APARs [PH14559](http://www-01.ibm.com/support/docview.wss?uid=swg1PH14559), [PH16038](http://www-01.ibm.com/support/docview.wss?uid=swg1PH16038), [PH15674](http://www-01.ibm.com/support/docview.wss?uid=swg1PH15674), [PH14560](http://www-01.ibm.com/support/docview.wss?uid=swg1PH14560))

   **Known issue:** There is a known issue with node.js v8.16.1 and Zowe desktop encoding. See the [GitHub issue](https://github.com/ibmruntimes/node/issues/142) for details.

   **Workaround:** Use node.js v8.16.2 or later, which is available at [https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos](https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos). Download the `pax.Z` file.

- v12.x
   - z/OS V2R2: PTFs UI62788, UI46658, UI62416, UI62415 (APARs [PH10606](https://www-01.ibm.com/support/docview.wss?uid=swg1PH10606), [PI79959](https://www-01.ibm.com/support/docview.wss?uid=swg1PI79959), [PH10740](https://www-01.ibm.com/support/docview.wss?uid=swg1PH10740), [PH10741](https://www-01.ibm.com/support/docview.wss?uid=swg1PH10741))
   - z/OS V2R3: PTFs UI61308, UI61375, UI61747 (APARs [PH0710](https://www-01.ibm.com/support/docview.wss?uid=isg1PH07107), [PH08352](https://www-01.ibm.com/support/docview.wss?uid=swg1PH08352), [PH09543](https://www-01.ibm.com/support/docview.wss?uid=swg1PH09543))
   - z/OS V2R4: PTFs UI64839, UI64940, UI64837, UI64830 , UI65567 (APARs [PH14559](http://www-01.ibm.com/support/docview.wss?uid=swg1PH14559), [PH16038](http://www-01.ibm.com/support/docview.wss?uid=swg1PH16038), [PH15674](http://www-01.ibm.com/support/docview.wss?uid=swg1PH15674), [PH14560](http://www-01.ibm.com/support/docview.wss?uid=swg1PH14560), [PH17481](http://www-01.ibm.com/support/docview.wss?uid=swg1PH17481))

- v14 (except v14.17.2)
   - z/OS V2R3: PTFs UI61308, UI61375, UI61747 (APARs [PH07107](https://www-01.ibm.com/support/docview.wss?uid=isg1PH07107), [PH08352](https://www-01.ibm.com/support/docview.wss?uid=swg1PH08352), [PH09543](https://www-01.ibm.com/support/docview.wss?uid=swg1PH09543))    
   - z/OS V2R4: PTFs UI64830, UI64837, UI64839, UI64940, UI65567 (APARs [PH14560](https://www.ibm.com/support/pages/apar/PH14560), 
   [PH15674](https://www.ibm.com/support/pages/apar/PH15674),
   [PH14559](https://www.ibm.com/support/pages/apar/PH14559),
   [PH16038](https://www.ibm.com/support/pages/apar/PH16038),
   [PH17481](https://www.ibm.com/support/pages/apar/PH17481))

   **Known issue:** There is a known issue with node.js v14.17.2. It will cause the error of `ZWESLSTC not found in "<dsn-prefix>.SZWESAMP"` when you run the `zowe-install-proc.sh` utility.

## How to obtain IBM SDK for Node.js - z/OS

You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways:
- Order the SMP/E edition through your IBM representative if that is your standard way to order IBM software.
- Order the SMP/E edition through IBM Shopz with optional paid support available.
- Download PAX file format at [ibm.com/products/sdk-nodejs-compiler-zos](https://www.ibm.com/products/sdk-nodejs-compiler-zos). IBM defect Support is not available for this format.

For more information, see the blog ["Options on how to obtain IBM Open Enterprise SDK for Node.js"](https://community.ibm.com/community/user/ibmz-and-linuxone/blogs/bruce-armstrong/2022/07/27/options-on-how-to-obtain-ibm-open-enterprise-sdk-f).


## Hardware and software prerequisites

To install Node.js for Zowe, the following requirements must be met.

The corresponding [IBM Knowledge Center for Node.js - z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos) lists all the prerequisites for Node.js. Some software packages, which might be listed as prerequisites there, are **NOT** required by Zowe. Specifically, you do **NOT** need to install Python, Make, Perl, or C/C++ runtime or compiler.

If you can run `node --version` successfully, you have installed the Node.js prerequisites required by Zowe.

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**

- z/OS UNIX System Services enabled
- Integrated Cryptographic Service Facility (ICSF) configured and started

  ICSF is required for Node.js to operate successfully on z/OS.  If you have not configured your z/OS environment for ICSF, see [Cryptographic Services ICSF: System Programmer's Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/abstract.htm).  To see whether ICSF has been started, check whether the started task `ICSF` or `CSF` is active.

## Installing the PAX edition of Node.js - z/OS

Follow these steps to install the PAX edition of Node.js - z/OS to run Zowe.

1. Download the pax.Z file to a z/OS machine.
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

## Installing the SMP/E edition of Node.js - z/OS

To install the SMP/E edition of Node.js, see the [documentation for IBM SDK for Node.js - z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos). Remember that the software packages Perl, Python, Make, or C/C++ runtime or compiler that the Node.js documentation might mention are **NOT** needed by Zowe.
