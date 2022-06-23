# Install Product Software Using z/OSMF Deployments

As a systems programmer, your responsibilities include installing product software in your z/OS environment. After the portable software instance or software instance is registered in z/OSMF, you can use z/OSMF Deployments to install the product software and create the product data sets (global, CSI, target libraries, and distribution libraries) for the new software instance. The deployment jobs create a copy of the source product data sets to create the product target runtime environment. Creating a copy of the SMP/E target data sets keeps the SMP/E environment clean and it also isolates the product runtime environment for maintenance activities. You can also perform z/OSMF workflows to customize the SMP/E data sets, mount UNIX System Services (USS) files if necessary, and configure the new software instance on the target system.

To install Zowe PSWI using z/OSMF and make the product software available for use on a system by users and other programs, define a new deployment. This step defines the SMP/E environment name and the prefix of the CSI data set in z/OSMF. You also specify data set allocation parameters for all SMP/E data sets, target libraries, and distribution libraries. To define a new deployment, complete the deployment checklist (specify the USS path, DSN, VOLSERs), and submit the deployment jobs through the z/OSMF user interface. When the deployment is complete, you have a source and target copy of the software.

For more information about these tasks, see [Deploying software](https://www.ibm.com/docs/en/zos/2.4.0?topic=task-deploying-software) in the IBM documentation.

Subsequent maintenance activities for the product update the SMP/E environment without affecting your active product runtime environments. You decide when to redeploy the maintenance-updated SMP/E target data sets to each of the product runtime environments.

**Note**: The installer requires read, create, update, and execute privileges in z/OS. Write access is also required to the USS directories that are used for the installation process. To deploy a product that has USS components, the installer's user ID must have access to the appropriate resource profiles in the UNIXPRIV class, access to the BPX.SUPERUSER resource profile in the FACILITY class, or UID(0). For UNIXPRIV, read access is required to SUPERUSER.FILESYS.CHOWN, SUPERUSER.FILESYS.CHGRP, and SUPERUSER.FILESYS.MOUNT.

1. Display the Deployments table in z/OSMF (**Software ManagementU**, **Deployments**).
2. Define a new deployment by selecting **New** from the Actions menu.  
The deployment checklist displays. You can also modify, view, copy, cancel, or remove existing deployments.
3. Complete the deployment checklist items as described in Defining new deployments in the IBM documentation.  
As you complete the deployment checklist, be sure to make the following selections:
    1. Specify the properties for this deployment (name, description, and optional category).
    2. Select the software to deploy.  
    For this step, select **Portable Software Instance** and select your package.
    3. Select the objective for this deployment to indicate where and how you want to install the selected portable software instance.  
    For this step, indicate that you want to create a software instance and specify the global zone CSI and the system where the target software instance will reside.
    4. Check for missing SYSMODs and view missing SYSMOD reports.  
    For this step, deselect the following report options:
        - Requisite SYSMODs and Fix Categories reports
        - Regressed SYSMODs and HOLDDATA Delta reports
    5. Configure this deployment to define the target software instance.
        - For **DLIBs**, specify **Yes** to copy the distribution zones and libraries that are associated with the source software. You can customize the names and the storage class or volumes of the new data sets.
        - For **Model**, indicate **The source software** to use as a model. z/OSMF uses the data sets, volumes, mount points, catalogs, and SMP/E zones that are associated with the model to specify default values for the target software instance.
        - For **SMP/E Zones**, the DLIB and TLIB names do not typically need to be changed.
        - For **Data sets**, change the target data set name prefix to the one that you want to use for your deployment. Specify a volume or storage class to identify where to create the target data sets.
        - For **Catalogs**, no action is required assuming that your target data set prefix is defined in a user catalog.
        - For **Volumes and Storage Classes**, no action is required. A summary is presented of the target data sets to be created and how much space is required.
        - For **Mount Points**, review the mount points for the UNIX file system data sets that are included in the target software instance. When specifying a new target mount point, retain the static path extension in the path name to prevent failures in the configuration workflow. For example, _targetpathname_**/staticpathextension**.
        - **Note**: If your product does not include USS directories, ignore this instruction.
    6. Define the job settings to generate JCL to install the software and view the deployment summary. For this step, update the JOB statement as needed.
        - **Note**: If the target system for the deployment is in a JES Multi-Access Spool (MAS) and the mount point is only accessible from the target system, add a System Affinity (SYSAFF) to the job card to ensure execution on the system where the zFS resides.
    7. Submit the deployment jobs in sequential order, wait for each job to complete, and then select **Refresh** to register job completion in z/OSMF.  
    A return code of zero is expected.  
    When all deployment jobs are executed successfully, you have unzipped, renamed and copied the product data sets, updated the CSI data set, and specified the properties for the target software instance.
    8. Execute the `ZWE9MNT` Zowe mount workflow.

          Mounts the Zowe zFS.

    9. (Optional) Execute the `ZWECONF` configuration workflow.

       Sets up the created Zowe instance version 2.0 or higher.

    10. (Optional) Execute security certification configuration workflows:

        - **Workflow to set up a Zowe certificate and keyring (`ZWEKRING`)**

            <!-- TODO should we rename the workflow so that it matches the titles style of the bottom ones -->

          Sets up a Zowe certificate and keyring.

        - **Workflow to create CSR request (`ZWECRECR`)**

          Creates a certificate sign request.

        - **Workflow to sign a CSR request (`ZWESIGNC`)**

          Signs the CSR request by a local CA.

        - **Workflow to load authentication certificate into ESM (`ZWELOADC`)**

          Loads a signed client authentication certificate to the ESM under the user ACID.

    11. Specify the name and description of a new target software instance.

        - All workflows that are mentioned in the previous steps are part of the PSWI and software instance.

          **Note:** You do not have to execute all workflows during PSWI provisioning in z/OSMF immediately.

The deployment process is complete. The new software instance is defined to z/OSMF. You are now ready to Import Product Information into z/OSMF before you install product maintenance.
