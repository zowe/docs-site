# Installation overview

To install Zowe&trade; on z/OS, there are two parts. The first part is the Zowe runtime that consists of three components: Zowe Application Framework, z/OS Explorer Services, and Zowe API Mediation Layer. The second part is the Zowe Cross Memory Server. This is an authorized server application that provides privileged services to Zowe in a secure manner.

Review the installation diagram to see the general installation sequence and the most important tasks that are to be performed during installation and configuration.

<img src="../images/common/zowe-zos-install-diagram.png" alt="Zowe z/OS components installation diagram" width="700">

## Stage 1: Plan and prepare

Before you start the installation, review the information on hardware and software requirements and other considerations. See [Planning the installation](installandconfig.md) for details.

## Stage 2: Install the Zowe runtime

1. Ensure that the software requirements are met. The necessary prerequisites are described in [System requirements](systemrequirements.md).

1. Choose the method of installing Zowe on z/OS. 

   The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

   - **Convenience build**

     The Zowe z/OS binaries are packaged as a PAX file. You install this build by running shell script within a Unix System Services (USS) shell.  Convenience builds are full product installs.

   - **SMP/E build**

     The Zowe z/OS binaries are packaged as the following files that you can download. You install this build through SMP/E.  
     - A pax.Z file, which contains an archive (compressed copy) of the FMIDs to be installed.
     - A readme file, which contains a sample job to decompress the pax.Z file, transform it into a format that SMP/E can process, and invoke SMP/E to RECEIVE the file.

   **Note:** The SMP/E build is currently in alpha, which means that it is available for early testing. You can provide any feedback about your experience with Zowe SMP/E as issues in the [zowe-install-packaging GitHub repo](https://github.com/zowe/zowe-install-packaging/issues/new).

   While the procedure to obtain and install the convenience build or SMP/E build are different, the procedure to configure a Zowe runtime are the same irrespective of how the build is obtained and installed.

1. Obtain and install the Zowe build.

   - For how to obtain the convenience build and install it, see [Installing Zowe runtime from a convenience build](install-zowe-zos-convenience-build.md).
   - For how to obtain the SMP/E build and install it, see [Installing Zowe SMP/E Alpha](install-zowe-smpe.md).
   
   After successful installation of either a convenience build or an SMP/E build, there will be a zFS folder that contains the unconfigured Zowe runtime `<RUNTIME_DIR>`, a PDS SAMPLIB member `SZWESAMPE `that contains example JCL, and a PDS load library `SZWEAUTH` that contains load modules. The steps to prepare the z/OS environment to launch Zowe are the same irrespective of the installation method.

## Stage 3: Configure the Zowe runtime

After you install Zowe&trade; through either the convenience build by running the `zowe-install.sh` command or through the SMP/E build by running the RECEIVE and APPLY jobs, you will have a Zowe runtime directory or <ROOT_DIR> in USS as well as a PDS SAMPLIB and a PDS load library in MVS.

1. Configure the z/OS security manager to prepare for launching the Zowe started tasks. For instructions, see [Configuring a z/OS system for Zowe](configure-zos-system.md).
   
   A SAMPLIB JCL member `ZWESECUR` is provided to assist with the configuration. You can submit the `ZWESECUR` JCL member as-is or customize it depending on site preferences. 
   
   If Zowe has already been launched on the z/OS system from a previous release of Version 1.8 or later, then you are applying a newer Zowe build. You can skip this security configuration step unless told otherwise in the release documentation.

   Before lauching Zowe there are two additional USS folders that need to be created.  

1. Create and customize an instance directory that contains configuration data about which components of Zowe should be executed. For instructions, see [Configuring the Zowe instance directory](configure-instance-directory.md).

   A single Zowe runtime can be launched multiple times from different instance directories, each specifying different port ranges, applications to include at start-up, paths of associated runtimes (Java, Node, z/OSMF).

   More than one instance directory can be used for the same Zowe runtime, allowing different configurations to have different port ranges, to have different version pre-requisites (node, Java) and to bring up different subsystems.

1. Configure the Zowe certificates keystore and truststore directory. For instructions, see [Configuring Zowe certificates](configure-certificates.md).  

   The Zowe certificate directory can be shared between different Zowe instances, including between different Zowe releases, unless specified otherwise in the release documentation. 
   
   The Zowe keystore directory contains the key used by the Zowe desktop and the Zowe API mediation layer to secure its TLS communication with clients (such as web browsers or REST AI clients). The keystore directory also has a trust store where public keys of any servers that Zowe communicates to (such as z/OSMF) are held.

   A keystore directory needs to be created for a Zowe instance to be launched successfully, and a keystore directory can be shared between Zowe instances and between Zowe runtimes.

1. Configure the Zowe Cross Memory Server. 

   Zowe has two high level started tasks: `ZWESVSTC` that launches the Zowe desktop and API Mediation Layer address spaces, and `ZWESISTC` that is a cross memory server that runs all of the APF authorized code.  The JCL for the tasks are included in the PDS SAMPLIB `SZWESAMP` installed by Zowe.  The load library for the cross memory server is included in the PDS load library installed in a sample `SZWEAUTH`. 
   
   For the cross memory server `ZWESISTC` to be launched, it must be configured. For instructions, see [Configuring the Cross Memory Server](configure-cross-memory-server.md).

1. Configure and lauch the Zowe started task. 

   Zowe has a number of runtimes on z/OS: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices. A single PROCLIB `ZWESVSTC` is used to start all of these microservices.  This member is installed by Zowe into the data set SAMPLIB `SZWESAMP` during the installation or either a convenience build or SMP/E build.  

   For the `ZWESVSTC` started task to be launched, it must be configured. The steps to configure the z/OS runtime in order to launch the started task are described in [Configuring the Zowe started task](configure-zowe-server.md).

## Stage 4: Verify the installation

Verify that Zowe is installed correctly on z/OS. See [Verifying Zowe runtime installation](verify-zowe-runtime-install.md).

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying the Zowe runtime on z/OS, see the [Troubleshooting](../troubleshoot/troubleshooting.md) section for tips.
