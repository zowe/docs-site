# Installing Zowe on z/OS

To install Zowe&trade; on z/OS,  there are two parts. The first part is the Zowe runtime that consists of three components: Zowe Application Framework, z/OS Explorer Services, and Zowe API Mediation Layer. The second part is the Zowe Cross Memory Server. This is an authorized server application that provides privileged services to Zowe in a secure manner.

- [Before you begin](#before-you-begin)
- [Methods of installing Zowe on z/OS](#methods-of-installing-zowe-on-zos)
- [High-level installation process](#high-level-installation-process)
- [Looking for troubleshooting help?](#looking-for-troubleshooting-help)

## Before you begin

Ensure that you meet the following software requirements before you install Zowe on z/OS. The necessary prerequisites that are described in [System requirements](systemrequirements.md).

## Methods of installing Zowe on z/OS

The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

- **Convenience build**

  The Zowe z/OS binaries are packaged as a PAX file. You install this build by running shell script within a Unix System Services (USS) shell.  Convenience builds are full product installs.

- **SMP/E build**

  The Zowe z/OS binaries are packaged as the following files that you can download. You install this build through SMP/E.

  - A pax.Z file, which contains an archive (compressed copy) of the FMIDs to be installed.
  - A readme file, which contains a sample job to decompress the pax.Z file, transform it into a format that SMP/E can process, and invoke SMP/E to RECEIVE the file.

  **Note:** The SMP/E build is currently in alpha, which means that it is available for early testing. You can provide any feedback about your experience with Zowe SMP/E as issues in the [zowe-install-packaging GitHub repo](https://github.com/zowe/zowe-install-packaging/issues/new).

While the procedure to obtain and install the convenience build or SMP/E build are different, the procedure to configure a Zowe runtime are the same irrespective of how the build is obtained and installed.

## High-level installation process

The high-level process of installing Zowe on z/OS is as follows:

1. Obtain and install the Zowe build.
   - For how to obtain the convenience build and install it, see [Installing Zowe runtime from a convenience build](install-zowe-zos-convenience-build.md).
   - For how to obtain the SMP/E build and install it, see [Installing Zowe SMP/E Alpha](install-zowe-smpe.md).
   
   After successful installation of either a convenience build or an SMP/E there will be a zFS folder containing the unconfigured Zowe runtime `<RUNTIME_DIR>`, a PDS SAMPLIB member `SZWESAMPE `containing example JCL, as well as a PDS load library `SZWEAUTH` containing load modules. The steps to prepare the z/OS environment to launch Zowe are the same irrespective of whether you have installed a convenience or SMP/E build.  

2. Configure the z/OS security manager in preparation for launching the Zowe started tasks, see [Configuring a z/OS system for Zowe](configure-zos-system.md).  A SAMPLIB JCL member `ZWESECUR` is provided with Zowe to assist with configuration which can either be submitted as-is or else customized depending on site preferences.  If Zowe has already been launched on the z/OS system from a previous release of 1.8 or later then and you are applying a newer Zowe build the security configuration step may be skipped unless told otherwise in the release documentation.  

3. Create and customize an instance directory that contains configuration information about which components of Zowe should be executed, see [Zowe instance directory](configure-instance-directory.md).  A single Zowe runtime can be launched multiple times from different instance directories, each specifying different port ranges, applications to include at start-up, paths of associated runtimes (Java, Node, z/OSMF).

4. Configure the Zowe certificates keystore and truststore directory, see [Configuring Zowe certificate store](configure-certificates.md).  The Zowe certificate directory can be shared between different Zowe instances, including between different Zowe releases unless specified otherwise in the release documentation.  

. Zowe has two high level started tasks: `ZWESVSTC` that launches the Zowe desktop and API mediation layer address spaces, and `ZWESISTC` that is a cross memory server that runs all of the APF authorized code.  The JCL for the tasks are included in the PDS SAMPLIB `SZWESAMP` together installed by Zowe.  The load library for the cross memory server is included in the PDS load library installed in a sample `SZWEAUTH`.  For the `ZWESVSTC` started task to be launched it must be configured, see [Configuring the Zowe started task](configure-zowe-server.md). For the cross memory server `ZWESISTC` to be launched it must be configured, see [Configuring the Cross memory server](configuring-cross-memory-server.md)

<JRW TO DO Need a diagram here>

5. Verify that Zowe is installed correctly on z/OS. See [Verifying Zowe runtime installation](verify-zowe-runtime-install.md).

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying the Zowe runtime on z/OS, see the [Troubleshooting](../troubleshoot/troubleshooting.md) section for tips.
