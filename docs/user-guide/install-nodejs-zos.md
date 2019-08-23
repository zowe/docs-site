# Installing Node.js on z/OS

Installing Zowe requires Node.js version 6.14.4.1 or later to be installed on the z/OS host where you install the Zowe Application Server. 

## How to obtain IBM SDK for Node.js - z/OS

IBM SDK for Node.js - z/OS, V6.0 (5655-SDK) is available at no license charge, as [announced in October 2018](https://www-01.ibm.com/common/ssi/cgi-bin/ssialias?infotype=AN&subtype=CA&htmlfid=897/ENUS918-171&appname=USN). You can obtain the free SDK for IBM Z Mainframe in one of several ways, depending on your requirements. For details, see the blog ["How to obtain IBM SDK for Node.js - z/OS, at no charge"](https://developer.ibm.com/mainframe/2019/04/17/ibm-sdk-for-node-js-z-os-at-no-charge/).

To satisfy Zowe's prerequisite for Node.js - z/OS, you can choose one of the following ways: 
- Order the SMP/E version through your IBM representative for production use
- Use the pax evaluation for non-production deployments

## Hardware and software requirements

**Hardware:**

IBM zEnterprise® 196 (z196) or newer

**Software:**
- Node.js version 6 (see [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSTRRS_6.0.0/com.ibm.nodejs.zos.v6.doc/plan.htm) for all prerequisites): 
    - z/OS V2R2 with PTF UI46658 or z/OS V2R3

- Node.js v8 (see [IBM Knowledge Center](https://www.ibm.com/support/knowledgecenter/SSTRRS_8.0.0/com.ibm.nodejs.zos.v8.doc/smpe.htm) for all prerequisites):
   - z/OS 2.2: PTFs UI62788, UI46658, UI62416 (APARs PH10606, PI79959, PH10740)
   - z/OS 2.3: PTFs UI61308, UI61376 and UI61747 (APARs PH07107, PH08353 and PH09543)

- z/OS UNIX System Services enabled
- Integrated Cryptographic Service Facility (ICSF) configured and started.

## Installing Node.js

The following section summarizes the required configuration steps for **installing the pax evaluation version of Node.js - z/OS** to run Zowe.

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
