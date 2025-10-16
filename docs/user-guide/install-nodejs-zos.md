# Addressing Zowe server prerequisites

To ensure a successful Zowe server-side installation on z/OS, certain components must be pre-installed and meet specific version requirements. The following table details these core prerequisites, including Node.js, Java, and z/OSMF, outlining their applicability across different Zowe versions.

:::info Required role: system programmer
:::

### Zowe Server Component Prerequisites by Version

| Component | Prerequisite | Zowe v2.x (LTS) | Zowe v3.x (Current) | Notes |
| :-------- | :----------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Zowe Application Framework (ZLUX / Desktop)** | Node.js | Node.js 14 or 16 | **Node.js 18** | The Zowe Desktop and many of its web-based applications are built on Node.js and require a 64-bit z/OS port of Node.js to function. **The Zowe Application Framework itself does not directly require Java.** |
| **API Mediation Layer (APIML)** | Java | IBM Java SDK 11 (or OpenJDK 11). <br> *Beginning with Zowe v2.18.2, Java 21 is also supported.* | **IBM Semeru Runtime Certified Edition for z/OS, Version 17 or 21** (or OpenJDK 17 or 21) | The API Mediation Layer, as a core Zowe component, requires a 64-bit Java Runtime Environment (JRE) or Java Development Kit (JDK) for z/OS. **The API Mediation Layer itself does not directly require Node.js.** |
| **General Zowe Setup & Integration** | z/OSMF | Highly Recommended | Highly Recommended | While Zowe can operate in limited scenarios without z/OSMF, it is **highly recommended** for full functionality, robust security integrations (SAF roles, certificates), simplified certificate management, and leveraging many underlying z/OS services. Zowe is architected for seamless integration with z/OSMF across all its components. | 
 

 
## Server prerequisite details

### Addressing Node.js requirements

Before you install Zowe&trade; on z/OS, you must install IBM SDK for Node.js on the same z/OS server that hosts the Zowe Application Server and z/OS Explorer Services. Review the information in this topic to obtain and install Node.js.

:::note
Node.js is required when installing the Zowe servers on z/OS.
Node.js is not required if using Docker instead of z/OS, or if running Zowe without the app-server enabled.
:::

#### Application server Node.js requirements

The app-server component requires one of the following Node.js versions:
  * v18.x
  * v20.x
  * v22.x 

:::tip
If you are a software vendor building extensions for Zowe, we recommend you tag your plug-ins. For more information, see [Tagging on z/OS](../extend/extend-desktop/mvd-buildingplugins.md#tagging-plugin-files-on-zos).
:::

#### Supported Node.js versions

<details>
<summary> Click here for details about the node.js versions supported by Zowe. </summary>

The following Node.js versions are supported to run Zowe. See the [Node.js hardware and software prerequisites for Zowe](#nodejs-hardware-and-software-prerequisites-for-zowe) section for the prerequisites that are required by Zowe.

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
  
</details>


#### How to obtain IBM SDK for Node.js - z/OS

You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways:
- Order the SMP/E edition through your IBM representative if that is your standard way to order IBM software.
- Order the SMP/E edition through IBM Shopz with optional paid support available.
- Download PAX file format at [ibm.com/products/sdk-nodejs-compiler-zos](https://www.ibm.com/products/sdk-nodejs-compiler-zos). IBM defect Support is not available for this format.

For more information, see the blog ["Options on how to obtain IBM Open Enterprise SDK for Node.js"](https://community.ibm.com/community/user/ibmz-and-linuxone/blogs/bruce-armstrong/2022/07/27/options-on-how-to-obtain-ibm-open-enterprise-sdk-f).

Here's a rewritten version of that section, aiming for improved readability, clarity, and flow while retaining all the essential information.

---

### Node.js Hardware and Software Prerequisites for Zowe

To successfully install and run Node.js for Zowe on z/OS, ensure your system meets the following hardware and software requirements:

**Hardware:**
*   IBM zEnterprise® 196 (z196) or newer.

**Software:**
*   z/OS UNIX System Services (USS) enabled.
*   Integrated Cryptographic Service Facility (ICSF) configured and started.
    *   ICSF is essential for Node.js to operate correctly on z/OS.
    *   If not yet configured, refer to the [Cryptographic Services ICSF: System Programmer's Guide](https://www.ibm.com/docs/en/zos/2.5.0?topic=services-zos-cryptographic-icsf-system-programmers-guide).
    *   To verify ICSF is active, check that the started task `ICSF` or `CSF` is running.

:::note
**Zowe's Specific Node.js Requirements**

While the comprehensive [IBM SDK for Node.js - z/OS documentation](https://www.ibm.com/docs/en/sdk-nodejs-zos) details all Node.js prerequisites, Zowe's usage requires a more focused set. You **do NOT** need to install the following software packages, even if they might be listed in the general Node.js documentation:

*   Python
*   Make
*   Perl
*   C/C++ runtime or compiler

:::

**Confirming Node.js Installation**

After installation, a successful execution of `node --version` in your z/OS UNIX command line indicates that the necessary Node.js prerequisites for Zowe have been met. 

### Node.js installation methods

#### Installing the PAX edition of Node.js - z/OS

<details>
<summary> Click here for details about installing the PAX edition of Node.js -z/OS to run Zowe. </summary>

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
1. After you install Node.js, set the `NODE_HOME` environment variable to the directory where Node.js is installed. For example, `NODE_HOME=/proj/mvd/node/installs/node-v18.18.2-os390-s390x`.

</details>

#### Installing the SMP/E edition of Node.js - z/OS

<details>
<summary>Click here for details about installing the SMP/E edition of Node.js - z/OS. </summary>

To install the SMP/E edition of Node.js, see the [documentation for IBM SDK for Node.js - z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos). Remember that the software packages Perl, Python, Make, or C/C++ runtime or compiler that the Node.js documentation might mention are **NOT** needed by Zowe.

</details>


### Addressing z/OSMF requirements

While Zowe can function in certain limited configurations without it, the **IBM z/OS Management Facility (z/OSMF)** is **highly recommended** for a fully functional and integrated Zowe environment. It comes pre-installed as part of z/OS, so no separate installation is needed. Zowe supports z/OSMF Version 2.5 or Version 3.1.

When z/OSMF is present and configured, Zowe automatically detects and leverages it during its setup for critical functionalities:

*   **TSO User Authentication and Single Sign-On (SSO):** Zowe uses z/OSMF to authenticate TSO users and generate single sign-on JSON Web Tokens (JWTs).
    *   **Crucial for JWT:** Ensure that [z/OSMF JWT Support is available via APAR and associated PTFs](https://www.ibm.com/support/pages/apar/PH12143) and that JWT generation is properly enabled. For detailed instructions, refer to [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) in the IBM documentation.

*   **Access to z/OS Resources via REST APIs:** Zowe utilizes z/OSMF's REST API services for Files (Data Sets and USS), JES, and z/OSMF workflows. These services are essential for various Zowe applications, such as the Zowe Explorers within the Zowe Desktop.
    *   **Fallback Mechanism:** If z/OSMF REST APIs are not available, certain Zowe Desktop applications (like the File Editor for USS directories, files, and MVS data sets/members) will instead access z/OS resources through the Zowe Z Secure Services (ZSS) component.

:::info Recommendations

*   **For production use of Zowe,** we strongly recommend fully configuring z/OSMF to unlock all Zowe functionalities that depend on it. For comprehensive guidance, see [Configuring z/OSMF](systemrequirements-zosmf.md).
*   **For non-production environments** (e.g., development, proof-of-concept, demos), you can opt for a simplified z/OSMF setup known as **z/OS MF Lite**. This streamlined configuration supports only selected REST services (JES, Data Set/File, TSO, and Workflow), significantly improving startup times and reducing setup complexity. Learn how to set this up at [Configuring z/OSMF Lite (non-production environment)](systemrequirements-zosmf-lite.md).
:::

:::note
For specific z/OS security configuration options pertaining to the Zowe server-side components in your setup, consult [Security customization of your z/OS system](./configure-zos-system.md).
::: 

