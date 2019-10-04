# Installing Zowe on z/OS

To install Zowe on z/OS,  there are two parts. The first part is the Zowe runtime that consists of three components: Zowe Application Framework, z/OS Explorer Services, and Zowe API Mediation Layer. The second part is the Zowe Cross Memory Server. This is an authorized server application that provides privileged services to Zowe in a secure manner.

- [Before you begin](#before-you-begin)
- [Methods of installing Zowe on z/OS](#methods-of-installing-zowe-on-zos)
- [High-level installation process](#high-level-installation-process)
- [Looking for troubleshooting help?](#looking-for-troubleshooting-help)

## Before you begin

Ensure that you meet the following software requirements before you install Zowe on z/OS. The necessary prerequisites that are described in [System requirements](systemrequirements.md).

<!--- - The user ID that is used to perform the installation must have authority to set the ``'-a'`` extattr flag. This requires a minimum of read access to the BPX.FILEATTR.APF resource profile in the RACF CLASS if you use RACF. It is not essential for this access to be enabled before you run the `zowe-install.sh` script that installs Zowe runtime on z/OS. However, this access must be enabled before you run the `zowe-runtime-authorize.sh` script. --->

## Methods of installing Zowe on z/OS

The Zowe z/OS binaries are distributed in the following formats. They contain the same contents but you install them by using different methods. You can choose which method to use depending on your needs.

- **Convenience build**

  The Zowe z/OS binaries are packaged as a PAX file. You install this build by running shell script within a Unix System Services (USS) shell.

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
2. Configure the Zowe runtime. See [Configuring the Zowe runtime](configure-zowe-runtime.md).
3. Verify that Zowe is installed correctly on z/OS. See [Verifying Zowe runtime installation](verify-zowe-runtime-install.md).

## Looking for troubleshooting help?

If you encounter unexpected behavior when installing or verifying the Zowe runtime on z/OS, see the [Troubleshooting](../troubleshoot/troubleshooting.md) section for tips.
