# Installation roadmap

When you install Zowe&trade; on z/OS, you install the following two parts: 

1. The Zowe runtime, which consists of a number of components including: 
   - Zowe Application Framework
   - Zowe API Mediation Layer
   - Z Secure Services (ZSS)


2. The Zowe Cross Memory Server, also known as ZIS, which is an APF authorized server application that provides privileged services to Zowe in a secure manner.

Zowe provides the ability for some of its unix components to be run not under USS, but as a container, see [Installing Zowe Containers](k8s-introduction.md).

If you want to configure Zowe for high availability, see [High Availability overview](zowe-ha-overview.md) for instructions.

## Stage 1: Plan and prepare

Before continuing with the installation, you should be familiar with the following topics:

- Zowe's hardware and software requirements
- The `zwe` utility used for installing, configuring, and managing Zowe
- The configuration file used for Zowe, `zowe.yaml`

These topics and more are covered in the [Planning the installation](installandconfig.md) page.


## Stage 2: Install the Zowe z/OS runtime

1. Ensure that the software requirements are met. The prerequisites are described in [System requirements](systemrequirements-zos.md).

1. Choose the method of installing Zowe on z/OS. 

   The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

   - **Convenience build**

     The Zowe z/OS binaries are packaged as a PAX file which is a full product install.  Transfer this to a USS directory and expand its contents.  Using the [zwe](installandconfig.md#zwe-server-command) command `zwe install` will extract a number of PDS members contain load modules, JCL scripts, and PARMLIB entries. 

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

After successful installation of either a convenience build or an SMP/E build, there will be a zFS folder that contains the unconfigured Zowe runtime directory, a utility library `SZWEEXEC` that contains utilities, a SAMPLIB library `SZWESAMP` that contains sample members, and a load library `SZWEAUTH` that contains load modules. The steps to prepare the z/OS environment to launch Zowe are the same irrespective of the installation method.

## Stage 3: Initialize a configuration of the Zowe z/OS runtime

You can configure the Zowe runtime with one of the following methods depending on your needs. 

- Use a combination of JCL and the [zwe](installandconfig.md#zwe-server-command) command `zwe init`
- Use z/OSMF Workflows

:::tip

We recommend you open the links to this configuration procedure in new tabs.

:::

Whether you have obtained Zowe from a .pax convenience build, or an SMP/E distribution, the steps to initialize the system are the same.

1. [Prepare custom MVS data sets](initialize-mvs-datasets.md). Copy the data sets provided with Zowe to custom data sets.
1. (Required only if you are configuring Zowe for cross LPAR sysplex high availability): [Create the VSAM data sets used by the Zowe API Mediation Layer caching service](initialize-vsam-dataset.md). 
1. [APF authorize load libraries containing the modules that need to perform z/OS priviledged security calls.](apf-authorize-load-library.md).
1. [Initialize Zowe security configurations](initialize-security-configuration.md). Create the user IDs and security manager settings.

   If Zowe has already been launched on a z/OS system from a previous release of Zowe v2 you can skip this security configuration step unless told otherwise in the release documentation.

1. Configure Zowe to use TLS certificates.
1. [Install Zowe main started tasks](install-stc-members.md).

:::tip

* For testing purposes, it is not necessary to set up certificates when configuring the API Mediation Layer. You can configure Zowe without certificate setup and run Zowe with `verify_certificates: DISABLED`.
* For production environments, certificate are required. Ensure that certificates for each of the following services are issued by the Certificate Authority (CA) and that all keyrings contain the public part of the certificate for the relevant CA.
   * z/OSMF
   * Zowe
   * The service that is onboarded to Zowe
   
:::

## Stage 4: (Optional) Customize the configuration

Now that you have the permissions, certificates, tasks, files and datasets necessary to run Zowe, you may want to customize your Zowe configuration. Through customization, you can change attributes such as:

- Enabling or disabling components so you only run what you need.
- Changing the network ports Zowe runs on to suit your environment.
- Customizing the behavior of a component, such as turning on optional features or logging
   
It's recommended that the first customization you do is to [set `zwe` to use the Configuration Manager](configmgr-using.md)
Many other customization options can be found in [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md).
   
## Stage 5: (Optional) Installing extensions

You should [start zowe](start-zowe-zos.md) for the first time before installing extensions.

After it is customized based on your needs, you can get more value from Zowe through installing extensions, whether they are optional components from the Zowe project or from other vendors.

You can learn how to install extensions [here](../extend/install-configure-zos-extensions.md)

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying the Zowe runtime on z/OS, see the [Troubleshooting](../troubleshoot/troubleshooting.md) section for tips.

If you need more information on `zwe` check [the zwe appendix](../appendix/zwe_server_command_reference/zwe/zwe.md)

If you need more information on the server configuration file, check the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md).
