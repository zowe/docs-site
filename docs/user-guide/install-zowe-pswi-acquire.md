# Acquiring a z/OSMF Portable Software Instance

As a systems programmer, you can acquire an IBM z/OSMF portable package for your product and then add the portable software instance to z/OSMF. The product SMP/E environments are pre-built, backed up, and made available for download as a z/OSMF portable software instance. After you acquire the portable software instance, you can use z/OSMF Deployments to perform the installation and z/OSMF workflows to perform post-install configuration.

When you complete the acquisition process, the product software is ready for installation using z/OSMF Deployments.

:::note
Before you begin the acquisition process, ensure that you address the z/OSMF requirements.
:::

The z/OSMF product acquisition process consists of 2 tasks.

1. Download the portable software instance from Zowe downloads and transfer the instance to the mainframe.
2. Register the portable software instance in z/OSMF.

## Download the Portable Software Instance from Zowe Downloads

The portable software instance is a portable form of a software instance, including the SMP/E CSI data sets, all associated SMP/E-managed target and distribution libraries, non-SMP/E-managed data sets, and meta-data that is required to describe the product software instance.

To acquire the portable software instance, you can download it from the Zowe Downloads page and transfer the instance to a local z/OSMF host using a file transfer utility, such as FTP.

1. Go to [Zowe Downloads](https://www.zowe.org/download.html) and find **Zowe - Portable Software Instance**.
2. Download the latest version of the package to your workstation.
3. Use a file transfer utility such as an FTP client to transfer the single pax file to the mainframe.
4. Execute the JCL to unpack the installation file and restore the individual pax files. 

**Sample JCL:**

    ```jcl
        //USSBATCH EXEC PGM=BPXBATCH
        //STDOUT DD SYSOUT=*
        //STDERR DD SYSOUT=*
        //STDPARM DD *
        sh cd /yourUSSpaxdirectory/;
        pax -rvf yourpaxfilename.ZOSMF.pax.Z
        /*
    ```

5. Customize the sample JCL as follows and then submit for execution:

    1. Add a JOB statement.
    2. Update the USS directory (*yourUSSpaxdirectory*) with the path name where you want to copy the pax file.
    3. Update *yourpaxfilename* with the name of the pax file that you want to copy to the mainframe.  

:::tip Expected results:
USSBATCH can take several minutes to execute. You will receive a return code of `0` if this job runs correctly.
:::

After successful execution, the individual pax files are restored and ready for use. The next step is to register the Portable Software Instance in z/OSMF.

## Register Portable Software Instance in z/OSMF

After you have acquired and downloaded the portable software instance to a local z/OSMF host system, it is necessary to log in to z/OSMF to register the product software and define the portable software instance to z/OSMF as shown in the following procedure. When you complete these steps, the portable software instance is registered in z/OSMF and ready for installation (deployment).

1. Log in to the z/OSMF web interface and select your user ID in the top or bottom right-hand corner to switch between the Desktop Interface and Classic Interface.
2. Complete **either** of the following steps to display the Software Management page:
    1. In the Desktop Interface, select **Software Management**.
    2. In the Classic Interface, select **Software**, **Software Management**.
3. Select **Portable Software Instances** to define your portable software instance to z/OSMF.
4. Select **Add** from the Actions menu and select **From z/OSMF System**. The _Add Portable Software Instance_ page should display.
5. Select or type the system name (destination LPAR) and UNIX directory (destination USS directory) where the portable software instance files reside and select **Retrieve**.
6. Enter a name for the new portable software instance. You can also enter an optional description and assign one or more categories that display existing packages.
7. Select **OK**.

The new portable software instance is now defined to z/OSMF, and the portable software instance is registered in z/OSMF and ready to install (deploy).
