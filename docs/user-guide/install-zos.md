# Installation roadmap

When you install Zowe&trade; on z/OS, you install the following two parts: 

1. The Zowe runtime, which consists of a number of components including: 
   - The Zowe Desktop, also known as the Zowe Application Framework (ZLUX)
   - Zowe API Mediation Layer
   - Z Secure Services (ZSS)

2. The Zowe Cross Memory Server, also known as ZIS, which is an APF authorized server application that provides privileged services to Zowe in a secure manner.

Zowe provides the ability for some of its unix components to be run not under USS, but as a Linux Docker container, see [Installing Zowe Server Components using Docker](install-docker.md). <Badge text="Technical Preview"/> 

If you want to configure Zowe for high availability, see [Installing Zowe Server Components in Sysplex](install-ha-sysplex.md) for instructions.

## Stage 1: Plan and prepare

Before you start the installation, review the information on hardware and software requirements and other considerations. See [Planning the installation](installandconfig.md) for details.

## Stage 2: Install the Zowe z/OS runtime

1. Ensure that the software requirements are met. The prerequisites are described in [System requirements](systemrequirements-zos.md).

1. Choose the method of installing Zowe on z/OS. 

   The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

   - **Convenience build**

     The Zowe z/OS binaries are packaged as a PAX file which is a full product install.  Transfer this to a USS directory and expand its contents.  The command `zwe install` will extract a number of PDS members contain load modules, JCL scripts, and PARMLIB entries, see [Install the MVS Data Sets](./install-zowe-zos-convenience-build.md#install-the-mvs-data-sets).

   - **SMP/E build**

     The Zowe z/OS binaries are packaged as the following files that you can download. You install this build through SMP/E.  
     - A pax.Z file, which contains an archive (compressed copy) of the FMIDs to be installed.
     - A readme file, which contains a sample job to decompress the pax.Z file, transform it into a format that SMP/E can process, and invoke SMP/E to extract and expand the compressed SMP/E input data sets.

   - **Portable Software Instance (PSWI)**

     You can acquire and install the Zowe z/OS PAX file as a portable software instance (PSWI) using z/OSMF.

   While the procedures to obtain and install the convenience build, SMP/E build or PSWI are different, the procedure to configure a Zowe runtime is the same irrespective of how the build is obtained and installed.

1. Obtain and install the Zowe build.

   - For how to obtain the convenience build and install it, see [Installing Zowe runtime from a convenience build](install-zowe-zos-convenience-build.md).
   - For how to obtain the SMP/E build and install it, see [Installing Zowe SMP/E](install-zowe-smpe.md).
   - For how to obtain the PSWI and install it, see [Installing Zowe from a Portable Software Instance](install-zowe-pswi.md).
   
After successful installation of either a convenience build or an SMP/E build, there will be a zFS folder that contains the unconfigured Zowe runtime `<RUNTIME_DIR>`, a SAMPLIB library `SZWESAMP` that contains sample members, and a load library `SZWEAUTH` that contains load modules. The steps to prepare the z/OS environment to launch Zowe are the same irrespective of the installation method.

## Stage 3: Configure the Zowe z/OS runtime

You can configure the Zowe runtime with one of the following methods depending on your needs. 

- Use a combination of JCL and the `zwe init` command
- Use z/OSMF Workflows

**Tip:** We recommend you open the links to this configuration procedure in new tabs.

1. Using JCL together with the `zwe init`command

Whether you have obtained Zowe from a .pax convenience build, or an SMP/E distribution, the steps to initialize the system are the same.

 - [mvs](./initialize-zos-system.md#initialize-the-mvs-data-sets-using-zwe-init-mvs). Copy the data sets provided with Zowe to cust data sets.
 - Security. Create the user IDs and security manager settings.
 - stc. Configure the system to launch the Zowe started task.
 - apfauth. APF authorize the LOADLIB containing the modules that need to perform z/OS priviledged security calls.
 - certificate. Configure Zowe to use TLS certificates.
 - vsam. Configure the VSAM files needed to run the Zowe caching service used for high availability (HA)

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying the Zowe runtime on z/OS, see the [Troubleshooting](../troubleshoot/troubleshooting.md) section for tips.
