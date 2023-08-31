# System requirements for install via z/OSMF

Before you install Zowe using IBM z/OSMF, address the following installation and security requirements. Your systems programmers and security administrators can complete these tasks in parallel.  

z/OSMF is included with z/OS so you don't need to be separately installed. If z/OSMF is present, Zowe will detect this when it is configured and use z/OSMF for the following purposes:

- Authenticating TSO users and generating a single sign-on JSON Web Token (JWT). Ensure that the z/OSMF JWT Support is available via APAR and associated PTFs. If z/OSMF is not available, then Zowe is still able to provide SSO by generating its own JWT and making direct SAF calls.

- REST API services for Files (Data Sets and USS), JES, and z/OSMF workflows. These are used by some Zowe applications such as the Zowe Explorers in the Zowe Desktop. If z/OSMF REST APIs are not present, other Zowe desktop application, such as the File Editor that provides access to USS directories and files as well as MVS data sets and members, will work through the Zowe Z Secure Services (ZSS) component to access z/OS resources. 

## Version requirements

IBM z/OS Management Facility (z/OSMF) Version 2.2, Version 2.3 or Version 2.4.

## Use z/OSMF [LITE might be deprecated]
    
For non-production use of Zowe (such as development, proof-of-concept, demo), you can customize the configuration of z/OSMF to create what is known as "z/OS MF Lite" that simplifies the setup of z/OSMF. As z/OS MF Lite only supports selected REST services (JES, DataSet/File, TSO and Workflow), you will observe considerable improvements in startup time as well as a reduction in the efforts involved in setting up z/OSMF. For information about how to set up z/OSMF Lite, see Configuring z/OSMF Lite (non-production environment).

For production use of Zowe, see Configuring z/OSMF.

## Address z/OSMF Requirements for installing Zowe

* **Configure z/OSMF**
    * **Role**: Systems programmer, security administrator, domain administrator
    * The IBM z/OS Management Facility Configuration Guide is your primary source of information about how to configure z/OSMF. You can open the IBM documentation in a separate browser tab for reference during installation of your products using z/OSMF Deployments. To prevent configuration errors and to enable z/OSMF Software Update for maintenance, apply all z/OSMF related maintenance before you begin the installation process.

* **Configure z/OSMF security**
    * **Role**: Security administrator
    * Configure z/OSMF security for ACF2, Top Secret, or IBM RACF as applicable to authorize users and resources. To prevent SSL handshake failures when importing product information into z/OSMF, make sure that you have added the Digicert Intermediate CA certificate to the z/OSMF keyring. For information, see Import Product Information into z/OSMF.

* **Confirm that the installer has read, create, update, and execute privileges in z/OS**
   * **Role**: Security administrator
   * Write access is also required to the UNIX System Services (USS) directories that are used for the installation process. To deploy a product that has USS components, the installer's user ID must have access to the appropriate resource profiles in the UNIXPRIV class, access to the BPX.SUPERUSER resource profile in the FACILITY class, or UID(0). For UNIXPRIV, read access is required to SUPERUSER.FILESYS.CHOWN, SUPERUSER.FILESYS.CHGRP, and SUPERUSER.FILESYS.MOUNT.

* **Address USS requirements**
   * **Role**: Systems programmer, security administrator
   * Address the following USS requirements:
      * Create a USS directory to receive the z/OSMF pax file and to perform the unpack steps.
      * Confirm that you have write authority to the USS directories that are used for the z/OSMF pax installation process.
      * Confirm that you have available USS file space.
   * To download and unpack the pax file, you need free space that is approximately 3.5 times the pax file size in the file system that contains the pax directories. For example, to download and unpack a 14-MB pax file, you need approximately 49 MB of free space in the file system hosting your pax directory. If you do not have sufficient free space, error messages like EZA1490I Error writing to data set or EZA2606W File I/O error 133 can occur.   

* **Configure SMP/E Internet Service Retrieval**
    * **Role**: Systems programmer, security administrator
    * Configure SMP/E Internet Service Retrieval to receive and download maintenance on a regular cadence or build custom maintenance packages (order PTFs, APARs, critical, recommended, all, or just HOLDDATA). This step is our recommended best practice when installing maintenance and is required to use the z/OSMF Software Update. For configuration details, see the Mainframe Common Maintenance Procedures documentation.	

After these requirements have been addressed, you are ready to acquire a z/OSMF Portable Software Instance or Configure a Software Instance using z/OSMF Workflows.

