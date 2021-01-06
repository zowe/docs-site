---
meta:
  - name: description
    content: You can register and execute z/OSMF workflow in the web interface to complete the Zowe configuration after you install Zowe through either the convenience build or SMP/E build. z/OSMF workflow helps to simplify the Zowe configuration tasks and reduce the level of expertise that is needed for Zowe configuration. You can use z/OSMF workflow to configure z/OS security manager, Zowe certificates, and Zowe instance directory as well as start the Zowe started task. 
  - name: keywords
    content: Zowe, z/OSMF workflow
---

# Configure Zowe with z/OSMF Workflows

As a system programmer, after you install Zowe, you can register and execute the z/OSMF workflows in the web interface to complete the Zowe configuration. z/OSMF helps to simplify the Zowe configuration tasks and reduce the level of expertise that is needed for Zowe configuration.

Ensure that you meet the following requirements before you start the Zowe configuration:

-  Installed and configured z/OSMF
-  Installed Zowe with either SMP/E build or convenience build

You can complete the following tasks with the z/OSMF workflows:

- [Configure z/OS Security Manager to prepare for launching the Zowe started tasks](#configure-zos-security-manager)
- [Configure Zowe certificates](#configure-zowe-certificates)
- [Configure Zowe Cross Memory Server](#configure-zowe-cross-memory-server)
- [Create and configure the Zowe instance directory and start the Zowe started task](#create-and-configure-the-zowe-instance-directory-and-start-the-zowe-started-task)

## Configure z/OS Security Manager 

Configure the z/OS security manager to prepare for launching the Zowe started tasks. The workflow definition file is provided to assist with the security configuration. The workflow definition file allows you to configure z/OS security manager by using one of RACF, ACF2, or TSS security systems.

Register the **ZWESECUR.xml** workflow definition file in the z/OSMF web interface to configure z/OS security manager. The path to the workflow
definition file is `<pathPrefix>/files/workflows/`.

Perform the following steps after you register the workflow definition file:

1. **Define Values for Variables**

   Review all the parameters and customize the values for variables to meet the z/OS security requirements. We recommend that the security administrator at your site reviews and edits the values for security group variables.

   Zowe package includes the variable input file that is **ZWESECUR.properties**. Optionally, you can use this file to customize the values for variables in advance. Upload the prepared properties file while your register the workflow definition. Values from this file override the default values for the workflow variables.

2. **Execute JCL**

   Execute the step to complete the z/OS security manager configuration.

After you execute these steps, the groups, user IDs and started tasks are assigned based on the customized values. For instructions on how to register and execute the workflow, see [Register and execute workflow in the z/OSMF Web Interface](#register-and-execute-workflow-in-the-zosmf-web-interface).

## Configure Zowe certificates

z/OSMF workflow lets you generate certificate signed by the Zowe API Mediation Layer and keystores in the specified location. Zowe uses the keystore directory to hold the certificate to encrypt communication between Zowe clients and the Zowe z/OS servers. The keystore directory also holds the truststore that is used to hold public keys of any servers that Zowe trusts.

Register the ZWEWRF05 member that is located `<pathPrefix>/files/workflows/ZWEWRF05.xml` data set in the z/OSMF web interface. After you register the workflow definition file, you can execute the following steps.

1. **Define Variables**

   Review all the parameters and customize the values for variables to meet the z/OS security requirements.

   Zowe package includes the variable input file ZWEWRF05.properties and the path is `<pathPrefix>/files/workflows/ZWEWRF05.properties`. Optionally you can use this file to customize the values for variables in advance. Upload the prepared properties file when you register the workflow definition file. Values from this file override the default values for the workflow variables.

2. **Generate new custom zowe-setup-certificates.env file**

   Execute the step to generate a new custom `zowe-setup-certificated.env` file based on the custom values that you provide for variables in the first step.

3. **Execute zowe-setup-certificates.sh**

   Execute the step to run the shell script to generate the custom certificates based on the defined values for varaibales and values for parameters in the provided environment file.

After you execute these steps, the keystore and certificates are successfully generated based on the custom values. For general instruction on how to register and execute the workflow, see [Register and execute workflow in the z/OSMF Web Interface](#register-and-execute-workflow-in-the-zosmf-web-interface).

## Configure Zowe Cross Memory Server 

The Zowe cross memory server provides privileged cross-memory services to the Zowe Desktop and runs as an APF-authorized program. Multiple Zowe desktop instances can use the same cross memory server. Use the z/OSMF workflow to install, configure, and launch the cross memory server if you want to use the Zowe desktop. The z/OSMF workflow also lets you create APF-authorized load libraries that are required to install and configure the cross memory server.

Register the ZWEWRF06.xml workflow definition file that is located in `<pathPrefix>/files/workflows/`. After you complete the workflow registration, Perform the following steps to configure the Zowe cross memory server:

1. **Define values for Variables**

   The workflow includes the list of Zowe cross memory server configuration and the started task variables. Enter the custom values for variables based on your mainframe environment and Zowe cross memory server configuration requirements.

   Zowe package includes ZWEWRF06.properties variable input file and the path is `<pathPrefix>/files/workflows/ZWEWRF05.properties`. Optionally you can use this file to customize the values for variables in advance. Upload the prepared properties file when your register the workflow definition file. Values from this file override the default values for the workflow variables.

2. **Allocate Cross Memory Server Data Sets**

   Execute the step to allocate Target DSN for PARMLIB, Target DSN for PROCLIB, and log directory data sets that are required for XMEM configuration.

3. **Copy artifacts**

   Execute the step to populate the data sets that are allocated in the previous step with the necessary artifacts such as load modules, parmlib members and others. This step also copies the cross memory server STC to the proclib.

4. **Add PPT entries to the system PARMLIB**
   
   The cross memory server and its auxiliary address spaces must run in key 4 and be non-swappable. For the server to start in this environment, add the following PPT entries for the server and address spaces to the SCHEDxx member of the system PARMLIB.
   ```PPT PGMNAME(ZWESIS01) KEY(4) NOSWAP```
   
   The PDS member SZWESAMP contains the PPT lines for reference. Issue the following command to make the SCHEDxx changes effective.
   ```/SET SCH=xx```
   
   For more information, see [Key 4 non-swappable](configure-xmem-server.md#key-4-non-swappable).

5. **Retrieve the LOADLIB volume**

   This step allows you to automatically retrieve the VOLUME for non-SMS LOADLIB. Run this step to retrieve the actual VOLUME of the LOADLIB.

6. **APF Authorize Load Library**

   Creates APF-authorized load library that is required to install and configure the cross memory server. Execute the step to APF authorize the XMEM LOADLIB.

7. **Start the XMEM Server**

   Execute this step to start the Cross Memory Server started task.

After you complete these steps, the Zowe cross memory server is configured and installed to start the Zowe Desktop instance. For instruction on how to register and execute the workflow, See, [Register and execute workflow in the z/OSMF Web Interface](#register-and-execute-workflow-in-the-zosmf-web-interface).

## Create and configure the Zowe instance directory and start the Zowe started task

The Zowe instance directory contains configuration data that is required to launch a Zowe runtime. This includes port numbers, location of dependent runtimes such as Java, Node, z/OSMF, as well as log files. When Zowe is started, configuration data is read from files in the instance directory and logs will be written to files in the instance directory. Zowe has three runtimes namely: the z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices.

Register **ZWEWRF03.xml** workflow definition file in the z/OSMF web interface to create a Zowe instance directory and start the Zowe started task. The path to the workflow definition file is `<pathPrefix>/files/workflows/`

After you register the workflow definition file, perform the following steps to complete the process:

1. **Define Variables**

   The workflow includes the list of instance configuration and the Zowe started task variables. Enter the values for variables based on your mainframe environment, Zowe instance configuration, and started task requirements.

   Zowe package includes the variable input file that is **ZWEWRF03.properties** and the path is `<pathPrefix>/files/workflows/ZWEWRF03.properties`. Optionally you can use this file to customize the values for variables in advance. This automates the workflow execution, saving time and effort when deploying multiple standardized Zowe instances. Values from this file override the default values for the workflow variables.

2. **Create a Zowe instance**

   Execute the step to create a Zowe instance directory. This step creates instances for all the micro services. That is z/OS Service microservice server, the Zowe Application Server, and the Zowe API Mediation Layer microservices.

3. **Change the instance configuration**

   Execute the step to configure the Zowe instance. The configuration of the Zowe instance depends on the values for variables that you defined in the first step.
   **Note: If you are planning to use Docker, be sure to select only to start LAUNCH_COMPONENT_GROUP=ZSS, otherwise more components of Zowe than necessary will be run on z/OS, such as API Mediation Layer and the App Framework. You can skip configuration for those components here, as they will run in Docker.**

4. **Copy the STC to the procedure library**

   Skip this step if the procedure library is empty.

5. **Start the Zowe instance**

   Execute the step to start the instance.

After you execute each step, the step is marked as Complete. After completing the workflow execution, you can view the Zowe started task.

## Register and execute workflow in the z/OSMF web interface

z/OSMF workflow simplifies the procedure to configure and start Zowe. Perform the following steps to register and execute the workflow in the z/OSMF web interface:

1. Log in to the z/OSMF web interface and select **Use Desktop Interface**.

2. Select the Workflows File.

3. Select **Create Workflow** from the **Actions** menu.

   The **Create Workflow** panel appears.

4. Enter the complete USS path to the workflow you want to register in the **Workflow Definition File** field.

   - If you installed Zowe with the SMP/E build, the workflow is located in the SMP/E target zFS file system that was mounted during the installation.

   - (Optional) Enter the complete USS path to the edited workflow properties file in the Workflow Variable Input File field. Use this file to customize product instances and automate workflow execution, saving time and effort when deploying multiple standardized Zowe instances. Values from this file override the default values for the workflow variables.

      The sample properties file is located in the same directory with the workflow definition file.
      Create a copy of this file, and then modify as described in the file. Set the field to the path where the new file is located.
      Note: if you use the convenience build, the workflows and variable input files are located in the USS runtime folder in files/workflows
      
      The following table provides the list of Zowe Components Workflow Definition files and their corresponding variable input files.

  Configuration Tasks | Workflow Definition File Name | Properties File Name | Workflow Definition File Path | Variable Input file Path
  --- | --- | --- | --- | ---
  Configure z/OS Security Manager | ZWESECUR.xml | ZWESECUR.properties | `<pathPrefix>/files/workflows/` /ZWESECUR.xml | `<pathPrefix>/files/workflows/ ZWESECUR.properties`
  Configure Zowe Certificates     | ZWEWRF05.xml | ZWEWRF05.properties | `<pathPrefix>/files/workflows/` / ZWEWRF05.xml | `<pathPrefix>/files/workflows/ ZWEWRF05.properties`
  Configure Cross Memory Server   | ZWEWRF06.xml | ZWEWRF06.properties | `<pathPrefix>/files/workflows/` / ZWEWRF06.xml | `<pathPrefix>/files/workflows/ZWEWRF06.properties`
  Create Instance Directory and Start the Zowe started Task | ZWEWRF03.xml | ZWEWRF03.properties | `<pathPrefix>/files/workflows/` / ZWEWRF03.xml| `<pathPrefix>/files/workflows/ ZWEWRF03.properties`

5. Select the System where the workflow runs.

6. Select **Next**.

7. Specify a unique Workflow name. 

8. Select or enter an Owner user ID, and select **Assign all steps to owner user ID**.

9. Select Finish.

    The **workflow** is registered in z/OSMF. The workflow is available for execution to deploy and configure the Zowe instance.

10. Execute the steps in order. Perform the following steps to execute each step individually:

    a. Double-click the title of the step.

    b. Select the **Perform** tab.

    c. Review the step contents and update the input values as
        required.

    d. Select **Next**.

    Repeat the previous two steps to complete all items until the option Finish is available.

11. Select **Finish**.

After you execute each step, the step is marked as Complete. The workflow is executed.

