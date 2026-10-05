# Installing Product Software Using z/OSMF Deployments

:::info system programmer
:::

After the portable software instance or software instance is registered in z/OSMF, you can use z/OSMF Deployments to install the product software and create the product data sets (global, CSI, target libraries, and distribution libraries) for the new software instance. The deployment jobs create a copy of the source product data sets to create the product target runtime environment. Creating a copy of the SMP/E target data sets keeps the SMP/E environment clean and separates the product runtime environment for maintenance activities. You can also perform z/OSMF workflows to customize the SMP/E data sets, mount UNIX System Services (USS) files if necessary, and configure the new software instance on the target system.

## Prerequisite - Define a new deployment

To install Zowe PSWI using z/OSMF and make the product software available for use on a system by users and other programs, you first need to define a new deployment. This step defines the SMP/E environment name and the prefix of the CSI data set in z/OSMF. Specify data set allocation parameters for all SMP/E data sets, target libraries, and distribution libraries.

To define a new deployment, complete the deployment checklist as specified in [Deploying software](https://www.ibm.com/docs/en/zos/2.4.0?topic=task-deploying-software) in the IBM documentation.
Specify the following configuration elements:

* UNIX System Services path (USS path) 
* Data Set Name (DNS)
* Volume Serial Numbers (VOLSERs)

Then submit the deployment jobs through the z/OSMF user interface. When the deployment is complete, you have a source and target copy of the software.

Subsequent product maintenance activities update the SMP/E environment without affecting your active product runtime environments. You can decide when to redeploy the maintenance-updated SMP/E target data sets to each of the product runtime environments.

Before installing, ensure the [z/OSMF requirements](./install-zowe-pswi-address-requirements.md#confirm-that-the-installer-has-read-create-update-and-execute-privileges-in-zos) are met. 

## Installing process

1. Display the Deployments table in z/OSMF (**Software ManagementU**, **Deployments**).
2. Define a new deployment by selecting **New** from the Actions menu. The deployment checklist displays where you can also modify, view, copy, cancel, or remove existing deployments.
3. Complete the deployment checklist items as described in _Defining new deployments_ in the IBM documentation. As you complete the deployment checklist, be sure to make the following selections:
    1. Specify the properties for this deployment (name, description, and optional category).

    2. Select the software to deploy. Select **Portable Software Instance** and select your package.

    3. Select the objective for this deployment to indicate where and how you want to install the selected portable software instance. Indicate that you want to create a software instance and specify the global zone CSI and the system where the target software instance will reside.

    4. Check for missing SYSMODs and view missing SYSMOD reports. Deselect the following report options:
        - Requisite SYSMODs and Fix Categories reports
        - Regressed SYSMODs and HOLDDATA Delta reports

    5. Configure this deployment to define the target software instance.
        - For **DLIBs**, specify **Yes** to copy the distribution zones and libraries that are associated with the source software. You can customize the names and the storage class or volumes of the new data sets.
        - For **Model**, indicate **The source software** to use as a model. z/OSMF uses the data sets, volumes, mount points, catalogs, and SMP/E zones that are associated with the model to specify default values for the target software instance.
        - For **SMP/E Zones**, the DLIB and TLIB names do not typically need to be changed.
        - For **Data sets**, change the target data set name prefix to the one that you want to use for your deployment. Specify a volume or storage class to identify where to create the target data sets.
        - For **Catalogs**, no action is required assuming that your target data set prefix is defined in a user catalog.
        - For **Volumes and Storage Classes**, no action is required. A summary is presented of the target data sets to be created and how much space is required.
        - For **Mount Points**, review the mount points for the UNIX file system data sets that are included in the target software instance. When specifying a new target mount point, retain the static path extension in the path name to prevent failures in the configuration workflow  
        **Example:** `_targetpathname_**/staticpathextension**`.  
        **Note:** If your product does not include USS directories, ignore this instruction.

    6. Define the job settings to generate the JCL to install the software and view the deployment summary. Update the JOB statement as needed.

        **Note:** If the target system for the deployment is in a JES Multi-Access Spool (MAS) and the mount point is only accessible from the target system, add a System Affinity (SYSAFF) to the job card to ensure execution on the system where the zFS resides.

    7. Submit the deployment jobs in sequential order. Wait for each job to complete, and then select **Refresh** to register job completion in z/OSMF. 

        :::tip Expected results:
        You will receive a return code of `0` if this job runs correctly. When all deployment jobs are executed successfully, you have unzipped, renamed and copied the product data sets, updated the CSI data set, and specified the properties for the target software instance.
        :::

    8. Complete **Mount Workflow** to mount the Zowe zFS. Complete both steps in the workflow. Perform the following steps to execute each step individually:
       1. Click the title of the step.
       2. Select the **Perform** tab.
       3. Review the step contents and update the JCL if needed.
       4. Select **Next**.
       5. Repeat the previous two steps to complete all items until the **Finish** option is available.

    9. (Optional) To configure your Zowe instance, follow the procedure in [Configuring Zowe with z/OSMF Workflows](configure-zowe-zosmf-workflow.md). To configure your Zowe instance specifically for API Mediation Layer, see [Configuring API ML with z/OSMF Workflows](configure-apiml-zosmf-workflow.md).

   1.  Specify the name and description of the new target software instance.

:::note Notes
* All workflows that are mentioned in the previous steps are part of the PSWI.  
* You do not have to execute all workflows during PSWI provisioning in z/OSMF immediately.
:::

The deployment process is complete. The new software instance is defined to z/OSMF. You are now ready to Import Product Information into z/OSMF before you install product maintenance.

## Recommendations

### Cleanup

If there is a need to update the deployment settings such as the HLQ after a previous run, note that the deployment process does not perform a full cleanup of the datasets.
Before attempting job execution again, make sure the following datasets are deleted to avoid write conflicts:

**For Zowe v2**

```plaintext
{TARGET_HLQ}.PRODUCT.ZOWE.V2.CSI
{TARGET_HLQ}.PRODUCT.ZOWE.V2.D.AZWEAUTH.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.D.AZWESAMP.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.D.AZWEZFS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPLOG.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPLOGA.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPLTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPMTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPPTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPSCDS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.SMPSTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.T.SZWEAUTH.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.T.SZWEEXEC.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.T.SZWELOAD.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.T.SZWESAMP.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.WORKFLOW.#
{TARGET_HLQ}.PRODUCT.ZOWE.V2.ZFS.#
```

**For Zowe v3**

```plaintext
{TARGET_HLQ}.PRODUCT.ZOWE.V3.CSI
{TARGET_HLQ}.PRODUCT.ZOWE.V3.D.AZWEAUTH.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.D.AZWESAMP.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.D.AZWEZFS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPLOG.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPLOGA.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPLTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPMTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPPTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPSCDS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.SMPSTS.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.T.SZWEAUTH.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.T.SZWEEXEC.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.T.SZWELOAD.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.T.SZWESAMP.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.WORKFLOW.#
{TARGET_HLQ}.PRODUCT.ZOWE.V3.ZFS.#
```

If deployment options must be modified and the JCL recreated, first check the original JCL for the temporary ZFS dataset name.

**Example:**
`<user>.SWDEPL.<random_id>.ZFS`
 
 Delete this name manually. 
 
 :::note 
 Note that the deployment job is unable to clean this data set name once the data set is recreated because the value for `random_id` will change.
 :::

### Resources <!--Why is this titled Resources? Please suggest a better heading for this. -->

It is recommended to update the job card to run with `REGION=0M`, particularly for job `IZUD01DZ` which unpaxes the contents.
