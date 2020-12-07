# z/OS Installation Roadmap

There are two parts to installing Zowe&trade; on z/OS. 

The first part is the Zowe runtime, consisting of the following components: 

- Zowe Application Framework 
- z/OS Explorer Services 
- Zowe API Mediation Layer
- ZSS

The second part is the Zowe Cross Memory Server, an authorized server application that provides privileged services to Zowe in a secure manner.

If you want to use Docker, instead follow this related page: [Installing Zowe Server Components using Docker](install-docker.md)

For more information on the Zowe components and how they are used to launch an instance of Zowe, see [Planning the installation](./installandconfig.md#planning-the-installation-of-zowe-z-os-components).

Review the installation diagram and the introduction in this topic to see the general installation sequence and the most important tasks that are to be performed during installation and configuration. You can click each step on the diagram for detailed instructions.

<figure>
  <img usemap="#home_map1" border="0" id="install-flow" src="../images/common/zowe-zos-install-diagram.png" width="850" alt="Click each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>
<map name="home_map1" id="home_map1">
  <area href="installandconfig.html#planning-the-installation-of-zowe-server-components" alt="Plan and prepare for the installation" title="Plan and prepare for the installation" shape="rect" coords="326, 63, 474, 105" />
  <area href="systemrequirements.html" alt="Configure system requirements" title="Configure system requirements" shape="rect" coords="318, 183, 467, 224" />

  <area href="https://www.zowe.org/download.html" alt="Download Zowe SMP/E build" title="Download the Zowe SMP/E build from zowe.org" shape="rect" coords="131, 308, 304, 348" />
  <area href="install-zowe-smpe.html" alt="Install the Zowe SMP/E build using JCLs" title="Install the Zowe SMP/E build using JCLs" shape="rect" coords="54, 498, 188, 555" />
  <area href="install-zowe-smpe-zosmf-workflow.html" alt="Install the Zowe SMP/E build with z/OSMF workflow" title="Install the Zowe SMP/E build with z/OSMF workflow" shape="rect" coords="250, 498, 391, 555" />

  <area href="https://www.zowe.org/download.html" alt="Download the Zowe convenience build" title="Download the Zowe convenience build from zowe.org" shape="rect" coords="527, 299, 694, 344" />
  <area href="install-zowe-zos-convenience-build.html#obtaining-and-preparing-the-convenience-build" alt="Verify, transfer, and expand the PAX file on z/OS" title="Verify, transfer, and expand the PAX file on z/OS" shape="rect" coords="526, 368, 696, 410" />
  <area href="install-zowe-zos-convenience-build.html#installing-the-zowe-runtime" alt="Install the Zowe runtime using shell script" title="Install the Zowe runtime using shell script" shape="rect" coords="450, 500, 574, 552" />
  <area href="install-zowe-zos-convenience-build.html#installing-the-zowe-runtime" alt="Install the Zowe runtime with z/OSMF workflow" title="Install the Zowe runtime with z/OSMF workflow" shape="rect" coords="647, 499, 774, 554" />

  <area href="configure-zos-system.html" alt="Configure the z/OS system for Zowe using ZWESECUR" title="Configure the z/OS system for Zowe using ZWESECUR" shape="rect" coords="121, 756, 426, 808" />
  <area href="configure-certificates.html" alt="Configure Zowe certificates using shell script" title="Create the Zowe certificates keystore directory using shell script" shape="rect" coords="124, 830, 426, 882" />
  <area href="configure-xmem-server.html" alt="Configure the Zowe cross memory server using shell script" title="Install and configure the Zowe cross memory server (ZWESISTC) using shell script" shape="rect" coords="123, 909, 426, 952" />
  <area href="configure-instance-directory.html" alt="Create and configure the Zowe instance directory using shell script" title="Create and configure the Zowe instance directory using shell script" shape="rect" coords="121, 976, 426, 1038" />
  <area href="configure-zowe-server.html" alt="Install and start the Zowe started task using shell script" title="Install and start the Zowe started task (ZWESVSTC) using shell script" shape="rect" coords="125, 1065, 426, 1117" />

  <area href="configure-zowe-zosmf-workflow.html#configure-z-os-security-manager" alt="Configure Zowe security manager with z/OSMF workflow" title="Configure Zowe security manager with z/OSMF workflow" shape="rect" coords="515, 759, 757, 805" />
  <area href="configure-zowe-zosmf-workflow.html#configure-zowe-certificates" alt="Configure Zowe certificates with z/OSMF workflow" title="Configure Zowe certificates with z/OSMF workflow" shape="rect" coords="515, 832, 754, 882" />
  <area href="configure-zowe-zosmf-workflow.html#configure-zowe-cross-memory-server" alt="Configure Zowe Cross Memory Server with z/OSMF workflow" title="Configure Zowe Cross Memory Server with z/OSMF workflow" shape="rect" coords="515, 905, 757, 960" />
  <area href="configure-zowe-zosmf-workflow.html#create-and-configure-the-zowe-instance-directory-and-start-the-zowe-started-task" alt="Create and configure the Zowe instance directory and start Zowe with z/OSMF workflow" title="Create and configure the Zowe instance directory and start Zowe with z/OSMF workflow" shape="rect" coords="513, 977, 757, 1042" />

  <area href="verify-zowe-runtime-install.html" alt="Verify Zowe installation on z/OS" title="Verify Zowe installation on z/OS" shape="rect" coords="224, 1154, 616, 1198" />
</map>

## Stage 1: Plan and prepare

Before you start the installation, review the information on hardware and software requirements and other considerations. See [Planning the installation](installandconfig.md) for details.

## Stage 2: Install the Zowe z/OS runtime

1. Ensure that the software requirements are met. The prerequisites are described in [System requirements](systemrequirements.md).

1. Choose the method of installing Zowe on z/OS. 

   The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

   - **Convenience build**

     The Zowe z/OS binaries are packaged as a PAX file. You install this build by running shell script within a UNIX System Services (USS) shell.  Convenience builds are full product installs.

   - **SMP/E build**

     The Zowe z/OS binaries are packaged as the following files that you can download. You install this build through SMP/E.  
     - A pax.Z file, which contains an archive (compressed copy) of the FMIDs to be installed.
     - A readme file, which contains a sample job to decompress the pax.Z file, transform it into a format that SMP/E can process, and invoke SMP/E to extract and expand the compressed SMP/E input data sets.

   While the procedure to obtain and install the convenience build or SMP/E build are different, the procedure to configure a Zowe runtime are the same irrespective of how the build is obtained and installed.

1. Obtain and install the Zowe build.

   - For how to obtain the convenience build and install it, see [Installing Zowe runtime from a convenience build](install-zowe-zos-convenience-build.md).
   - For how to obtain the SMP/E build and install it, see [Installing Zowe SMP/E](install-zowe-smpe.md).
   
After successful installation of either a convenience build or an SMP/E build, there will be a zFS folder that contains the unconfigured Zowe runtime `<RUNTIME_DIR>`, a SAMPLIB library `SZWESAMP` that contains sample members, and a load library `SZWEAUTH` that contains load modules. The steps to prepare the z/OS environment to launch Zowe are the same irrespective of the installation method.

## Stage 3: Configure the Zowe z/OS runtime

You can configure the Zowe runtime with one of the following methods depending on your needs. 
- Use JCL and shell scripts
- Use z/OSMF Workflows

1. Configure the z/OS security manager to prepare for launching the Zowe started tasks. For instructions, see [Configuring the z/OS system for Zowe](configure-zos-system.md) and [Configuring Zowe with z/OSMF workflows](configure-zowe-zosmf-workflow.md).
   
   A SAMPLIB JCL member `ZWESECUR` is provided to assist with the configuration. You can submit the `ZWESECUR` JCL member as-is or customize it depending on site preferences.  
   
   If Zowe has already been launched on the z/OS system from a previous release of Version 1.8 or later, then you are applying a newer Zowe build. You can skip this security configuration step unless told otherwise in the release documentation. 

2. Configure the Zowe TLS. For instructions, see [Configuring Zowe certificates](configure-certificates.md) and [Configuring Zowe with z/OSMF workflows](configure-zowe-zosmf-workflow.md).  

   If you have already created a keystore directory from a previous release of Version 1.8 or later, then you may reuse the existing keystore directory.

   The Zowe keystore directory contains the key used by the Zowe desktop and the Zowe API mediation layer to secure its TLS communication with clients (such as web browsers or REST AI clients). The keystore directory also has a truststore where public keys of any servers that Zowe communicates to (such as z/OSMF) are held.
   
   A keystore directory needs to be created for a Zowe instance to be launched successfully, and a keystore directory can be shared between Zowe instances and between Zowe runtimes, including between different Zowe releases, unless specified otherwise in the release documentation.  

3. Configure and start the `ZWESISTC` cross memory server and install the load libraries. For instructions, see [Installing and configuring the Zowe cross memory server (ZWESISTC)](configure-xmem-server.md) and [Configuring the Zowe cross memory server with z/OSMF workflow](configure-zowe-zosmf-workflow.md#configure-zowe-cross-memory-server).

4. Create and customize an instance directory that contains configuration data required to launch a Zowe runtime and is where log files are stored. For instructions, see [Creating and configuring the Zowe instance directory](configure-instance-directory.md) and [Configuring Zowe with z/OSMF workflows](configure-zowe-zosmf-workflow.md).

   A single Zowe runtime can be launched multiple times from different instance directories, each specifying different port ranges, applications to include at start-up, paths of associated runtimes (Java, Node, z/OSMF).

   Next, you will install and configure the Zowe started tasks. Zowe has two high-level started tasks: `ZWESVSTC` that launches the Zowe desktop and API mediation layer address spaces, and `ZWESISTC` that is a cross memory server that runs all of the APF-authorized code.  The JCLs for the tasks are included in the PDS SAMPLIB `SZWESAMP` installed by Zowe and the load modules for the cross memory server are included in the PDS load library `SZWEAUTH`. 
   
   **Note** 
   
   For more information about Gateway and Discovery Service parameters that can be set during the Zowe runtime configuration, see [API Gateway runtime configuration parameters](./api-mediation/api-gateway-configuration.md) and [Discovery Service runtime configuration parameters](./api-mediation/discovery-service-configuration.md).

5. Configure and start the `ZWESVSTC` started task. For instructions, see [Installing the Zowe started task (ZWESVSTC)](configure-zowe-server.md). 

## Stage 4: Verify the installation

Verify that Zowe is installed correctly on z/OS. See [Verifying Zowe installation on z/OS](verify-zowe-runtime-install.md).

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying the Zowe runtime on z/OS, see the [Troubleshooting](../troubleshoot/troubleshooting.md) section for tips.
