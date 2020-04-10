# Installing Node.js on z/OS

Before you install Zowe&trade;, you must install IBM SDK for Node.js on the same z/OS server that hosts the Zowe Application Server. Review the information in this topic to obtain and install Node.js.

- [Supported Node.js versions](#supported-nodejs-versions)
- [How to obtain IBM SDK for Node.js - z/OS](#how-to-obtain-ibm-sdk-for-nodejs---zos)
- [Hardware and software prerequisites](#hardware-and-software-prerequisites)
- [Installing the PAX edition of Node.js - z/OS](#installing-the-pax-edition-of-nodejs---zos)
- [Installing the SMP/E edition of Node.js - z/OS](#installing-the-smpe-edition-of-nodejs---zos)

## Supported Node.js versions

The following Node.js versions are supported to run Zowe. See the [Hardware and software prerequisites](#hardware-and-software-prerequisites) section for the prerequisites that are required by Zowe. 

The corresponding [IBM Knowledge Center for Node.js - z/OS](https://www.ibm.com/support/knowledgecenter/SSWLKB/welcome_nodesdk_family.html) lists all the prerequisites for Node.js. Some software packages, which might be listed as prerequisites there, are **NOT** required by Zowe. Specifically, you do **NOT** need to install Python, Make, Perl, or C/C++ runtime or compiler.  If you can run `node --version` successfully, you have installed the prerequisites required by Zowe.

- Node.js Version 6
    - z/OS V2R2 with PTF UI46658 or z/OS V2R3

- Node.js Version 8
   - z/OS V2R2: PTFs UI62788, UI46658, UI62416 (APARs PH10606, PI79959, PH10740)
   - z/OS V2R3: PTFs UI61308, UI61376, and UI61747 (APARs PH07107, PH08353, and PH09543)

   **Known issue:** There is a known issue with node.js v8.16.1 and Zowe desktop encoding. See the [GitHub issue](https://github.com/ibmruntimes/node/issues/142) for details.

   **Workaround:** Use node.js v8.16.2 or later, which is available at [https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos](https://www.ibm.com/ca-en/marketplace/sdk-nodejs-compiler-zos). Download the `pax.Z` file.

- Node.js Version 12

## How to obtain IBM SDK for Node.js - z/OS

You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways: 
- Order the SMP/E edition through your IBM representative for production use
- Use the PAX evaluation edition for non-production deployments

For more information, see the blog ["How to obtain IBM SDK for Node.js - z/OS, at no charge"](https://developer.ibm.com/mainframe/2019/04/17/ibm-sdk-for-node-js-z-os-at-no-charge/).

## Hardware and software prerequisites

To install Node.js for Zowe, the following requirements must be met.

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**
- z/OS UNIX System Services enabled
- Integrated Cryptographic Service Facility (ICSF) configured and started on systems where Node.js is run. 

### Configuring ICSF

This section summarizes the high-level steps that you can follow to configure and start ICSF. For more information, refer to [ICSF System Programmer's Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb200/in2.htm) and [ICSF Administrator's Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.csfb300/abstract.htm).

1. Add `CSF.SCSFMOD0` to the LNKLST concatenation.
2. APF authorize `CSF.SCSFMOD0`.
3. Modify `IKJTSOxx` to add `CSFDAUTH` and `CSFDPKDS` in the `AUTHPGM` parameter list and in the `AUTHTSF` parameter list.
4. Create the following ICSF Key Data Sets:
    - Cryptographic Key Data Set (CKDS) 
      
      Sample JCL: `SYS1.SAMPLIB(CSFCKDS)`

    - Public Key Data Set (PKDS)
    
      Sample JCL: `SYS1.SAMPLIB(CSFPKDS)`

    - (Optional) If you want to have PKCS#11 support through ICSF, you should create Token Key Data Set (TKDS) 
    
      Sample JCL: `SYS1.SAMPLIB(CSFTKDS)`

5. Copy ICSF Installation Options sample (`SYS1.SAMPLIB(CSFPRM00)`) to the system PARMLIB data set, and change the name of the data set on the CKDSN and PKDSN statements to the name of data sets you created previously.
6. Create ICSF startup procedure. Copy `SYS1.SAMPLIB(CSF)` to the system PROCLIB and change the data set name in the `CSFPARM DD` statement to the name of the installation options data set you provided previously.
7. (Optional) Define a RACF Started Procedure profile for CSF procedure in `CLASS(STARTED)`.
8. Start ICSF (`S CSF`).

**Note:** You might need IPL before starting ICSF.

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

To install the SMP/E edition of Node.js, see the [documentation for IBM SDK for Node.js - z/OS](https://www.ibm.com/support/knowledgecenter/SSWLKB/welcome_nodesdk_family.html). Remember that the software packages Perl, Python, Make, or C/C++ runtime or compiler that the Node.js documentation might mention are **NOT** needed by Zowe.
