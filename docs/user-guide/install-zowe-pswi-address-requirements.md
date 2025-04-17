# Addressing z/OSMF requirements

Before you install Zowe using IBM z/OSMF, address the following installation and security requirements. Your systems programmers and security administrators can complete these tasks in parallel.  

## Configure z/OSMF

:::info Roles required: Systems programmer, security administrator, domain administrator
:::

The IBM z/OS Management Facility Configuration Guide is your primary source of information about how to configure z/OSMF. You can open the IBM documentation in a separate browser tab for reference during installation of your products using z/OSMF Deployments. To prevent configuration errors and to enable z/OSMF Software Update for maintenance, apply all z/OSMF related maintenance before you begin the installation process.

## Configure z/OSMF security
    
:::info Roles required: Security administrator
:::

Configure z/OSMF security for ACF2, Top Secret, or IBM RACF as applicable to authorize users and resources. To prevent SSL handshake failures when importing product information into z/OSMF, make sure that you have added the Digicert Intermediate CA certificate to the z/OSMF keyring. For information, see [Import Product Information into z/OSMF](https://techdocs.broadcom.com/us/en/ca-mainframe-software/traditional-management/mainframe-common-maintenance-procedures/1-0/getting-started/z-osmf-requirements/import-product-information-into-z-osmf.html).

## Confirm that the installer has read, create, update, and execute privileges in z/OS

:::info Roles required: Security administrator
:::

* **Write** access is also required to the USS directories that are used for the installation process. 
* To deploy a product that has USS components, the installer's user ID must have access to the appropriate resource profiles in the `UNIXPRIV` class and access to the `BPX.SUPERUSER` resource profile in the `FACILITY` class, or `UID(0)`. 
* For `UNIXPRIV` class, **read** access is required to `SUPERUSER.FILESYS.CHOWN`, `SUPERUSER.FILESYS.CHGRP`, and `SUPERUSER.FILESYS.MOUNT`.

## Address USS requirements

:::info Roles required: Security administrator, System programmer
::: 

* Create a USS directory to receive the z/OSMF pax file and to perform the unpack steps.
* Confirm that you have write authority to the USS directories that are used for the z/OSMF pax installation process.
* Confirm that you have available USS file space.
To download and unpack the pax file, you need free space that is approximately 3.5 times the pax file size in the file system that contains the pax directories. For example, to download and unpack a 14-MB pax file, you need approximately 49 MB of free space in the file system hosting your pax directory. If you do not have sufficient free space, error messages like EZA1490I Error writing to data set or EZA2606W File I/O error 133 can occur.   

## Configure SMP/E Internet Service Retrieval

:::info Roles required: Security administrator, System programmer
:::

Configure SMP/E Internet Service Retrieval to receive and download maintenance on a regular cadence or build custom maintenance packages (order PTFs, APARs, critical, recommended, all, or just HOLDDATA). This step is our recommended best practice when installing maintenance and is required to use the z/OSMF Software Update. For configuration details, see the Mainframe Common Maintenance Procedures documentation.	

After these requirements have been addressed, you are ready to [acquire a z/OSMF Portable Software Instance](./install-zowe-pswi-acquire/#download-the-portable-software-instance-from-zowe-downloads) or [Configure Zowe with z/OSMF Workflows](./configure-zowe-zosmf-workflow.md) or [Configuring API ML with z/OSMF Workflows](./configure-apiml-zosmf-workflow-2-18.md).
