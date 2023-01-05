# Installation roadmap

When you install Zowe&trade; on z/OS, you install the following two parts: 

1. The Zowe runtime, which consists of the following components: 
   - Zowe Application Framework (ZLUX)
   - Zowe API Mediation Layer
   - Z Secure Services (ZSS)
   - z/OS Explorer Services 

2. The Zowe Cross Memory Server, which is an APF authorized server application that provides privileged services to Zowe in a secure manner.

Zowe provides the ability for some of its unix components to be run not under USS, but as a Linux Docker container, see [Installing Zowe Server Components using Docker](install-docker.md). <Badge text="Technical Preview"/> 

If you want to configure Zowe for high availability, see [Installing Zowe Server Components in Sysplex](install-ha-sysplex.md) for instructions.

Review the installation diagram and the introduction in this topic to see the general installation sequence and the most important tasks that are to be performed during installation and configuration. You can click each step on the diagram for detailed instructions.

<figure>
  <image usemap="#home_map1" border="0" id="install-flow" src={require("../images/common/zowe-zos-install-diagram.png").default} width="850" alt="Click each step to get more details on the flow." />
  <figcaption></figcaption>
</figure>
<map name="home_map1" id="home_map1">
  <area href="https://docs.zowe.org/stable/user-guide/installandconfig" target="_blank" alt="Plan and prepare for the installation" title="Plan and prepare for the installation" shape="rect" coords="300, 55, 453, 98" />
  <area href="https://docs.zowe.org/stable/user-guide/systemrequirements-zos/" target="_blank" alt="Configure system requirements" title="Configure system requirements" shape="rect" coords="290, 183, 445, 224" />

  <area href="https://www.zowe.org/download.html" target="_blank" alt="Download Zowe SMP/E build" title="Download the Zowe SMP/E build from zowe.org" shape="rect" coords="22, 330, 195, 375" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-smpe" target="_blank" alt="Install the Zowe SMP/E build using JCLs" title="Install the Zowe SMP/E build using JCLs" shape="rect" coords="38, 399, 180, 460" />

  <area href="https://www.zowe.org/download.html" target="_blank" alt="Download the Zowe convenience build" title="Download the Zowe convenience build from zowe.org" shape="rect" coords="277, 331, 461, 375" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/#obtaining-and-preparing-the-convenience-build" target="_blank" alt="Verify, transfer, and expand the PAX file on z/OS" title="Verify, transfer, and expand the PAX file on z/OS" shape="rect" coords="278, 391, 460, 434" />

  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/#installing-the-zowe-runtime" target="_blank" alt="Install the Zowe runtime using shell script" title="Install the Zowe runtime using shell script" shape="rect" coords="171, 516, 304, 574" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/#installing-the-zowe-runtime" target="_blank" alt="Install the Zowe runtime with z/OSMF workflow" title="Install the Zowe runtime with z/OSMF workflow" shape="rect" coords="425, 513, 560, 572" />

  <area href="https://docs.zowe.org/stable/user-guide/configure-zos-system" target="_blank" alt="Configure the z/OS system for Zowe using ZWESECUR" title="Configure the z/OS system for Zowe using ZWESECUR" shape="rect" coords="11, 801, 383, 847" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-certificates" target="_blank" alt="Configure Zowe certificates using shell script" title="Create the Zowe certificates keystore directory using shell script" shape="rect" coords="11, 882, 383, 925" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-xmem-server" target="_blank" alt="Configure the Zowe cross memory server using shell script" title="Install and configure the Zowe cross memory server (ZWESISTC) using shell script" shape="rect" coords="11, 962, 384, 1007" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-instance-directory" target="_blank" alt="Create and configure the Zowe instance directory using shell script" title="Create and configure the Zowe instance directory using shell script" shape="rect" coords="12, 1041, 383, 1081" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-server" target="_blank" alt="Install and start the Zowe started task using shell script" title="Install and start the Zowe started task (ZWESVSTC) using shell script" shape="rect" coords="10, 1117, 381, 1161" />

  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#configure-z-os-security-manager" target="_blank" alt="Configure Zowe security manager with z/OSMF workflow" title="Configure Zowe security manager with z/OSMF workflow" shape="rect" coords="486, 802, 774, 847" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#configure-zowe-certificates" target="_blank" alt="Configure Zowe certificates with z/OSMF workflow" title="Configure Zowe certificates with z/OSMF workflow" shape="rect" coords="486, 883, 778, 927" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#configure-zowe-cross-memory-server" target="_blank" alt="Configure Zowe Cross Memory Server with z/OSMF workflow" title="Configure Zowe Cross Memory Server with z/OSMF workflow" shape="rect" coords="486, 962, 776, 1008" />
  <area href="https://docs.zowe.org/stable/user-guide/configure-zowe-zosmf-workflow/#create-and-configure-the-zowe-instance-directory-and-start-the-zowe-started-task" target="_blank" alt="Create and configure the Zowe instance directory and start Zowe with z/OSMF workflow" title="Create and configure the Zowe instance directory and start Zowe with z/OSMF workflow" shape="rect" coords="486, 1043, 774, 1081" />

  <area href="https://www.zowe.org/download.html" target="_blank" alt="Download the PSWI build" title="Download the PSWI build" shape="rect" coords="595, 333, 770, 374" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-pswi-acquire" target="_blank" alt="Verify, transfer, and expand the PAX file on z/OS" title="Verify, transfer, and expand the PAX file on z/OS" shape="rect" coords="593, 397, 770, 442" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-pswi-deployment" target="_blank" alt="Install the Zowe SMP/E using PSWI" title="Install the Zowe SMP/E using PSWI" shape="rect" coords="593, 464, 770, 504" />
  <area href="https://docs.zowe.org/stable/user-guide/install-zowe-pswi-deployment" target="_blank" alt="Mount Zowe zFS workflow ZWE9MNT" title="Mount Zowe zFS workflow ZWE9MNT" shape="rect" coords="593, 527, 770, 570" />

  <area href="https://docs.zowe.org/stable/user-guide/verify-zowe-runtime-install" target="_blank" alt="Verify Zowe installation on z/OS" title="Verify Zowe installation on z/OS" shape="rect" coords="191, 1232, 602, 1269" />
</map>

## Stage 1: Plan and prepare

Before you start the installation, review the information on hardware and software requirements and other considerations. See [Planning the installation](installandconfig.md) for details.

## Stage 2: Install the Zowe z/OS runtime

1. Ensure that the software requirements are met. The prerequisites are described in [System requirements](systemrequirements-zos.md).

1. Choose the method of installing Zowe on z/OS. 

   The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

   - **Convenience build**

     The Zowe z/OS binaries are packaged as a PAX file. You install this build by running shell script within a UNIX System Services (USS) shell.  Convenience builds are full product installs.

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
- Use JCL and shell scripts
- Use z/OSMF Workflows

**Tip:** We recommend you open the links to this configuration procedure in new tabs.

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
