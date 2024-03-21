# Installing Zowe SMP/E build with z/OSMF workflow

z/OSMF workflow simplifies the procedure to create an SMP/E environment for Zowe. Register and execute the Zowe SMP/E workflow to create SMP/E environment in the z/OSMF web interface. Perform the following steps to register and execute the Zowe workflow in the z/OSMF web interface:

1. Log in to the z/OSMF web interface.
2. Select **Workflows** from the navigation tree. 
3. Select **Create Workflow** from the **Actions** menu. 
4. Enter the complete path to the workflow definition file in the **Workflow Definition filed**.

   The workflow is located in the `ZWEWRF01` member of the `hlq.ZOWE.AZWE002.F4` data set. 

5. (Optional) Enter the path to the customized variable input file that you prepared in advance.

   The variable input file is located in `ZWEYML01` member of the `hlq.ZOWE.AZWE002` data set. 

   Create a copy of the variable input file. Modify the file as necessary according to the built-in comments. Set the field to the path where the new file is located. When you execute the workflow, the values from the variable input file override the workflow variables default values.

6. Select the system where you want to execute the workflow.
7. Select **Next**. 
8. Specify the unique workflow name. 
9. Select or enter an **Owner Use ID** and select **Assign all steps to owner user ID**. 
10. Select **Finish**. 

    The workflow is registered in z/OSMF and ready to execute.

11. Select the workflow that you registered from the workflow list.
12. Execute the steps in order.   
13. Perform the following steps to execute each step individually:

    1. Double-click the title of the step.
    2. Select the **Perform** tab. 
    3. Review the step contents and update the input values as required.
    4. Select **Next**. 
    5. Repeat the previous two steps to complete all items until the option **Finish** is available. 
    6. Select **Finish**. 
   
       After you execute each step, the step is marked as **Complete**. The workflow is executed. 
       
After you complete executing all the steps individually, the Zowe SMP/E is created. 

## Activating Zowe

### File system execution

If you mount the file system in which you have installed Zowe in read-only mode during execution, then you do not have to take further actions to activate Zowe.

## Zowe customization

You can find the necessary information about customizing and using Zowe on the Zowe doc site.
- For more information about how to customize Zowe, see [Configuring Zowe after installation](mvd-configuration.md).
- For more information about how to use Zowe, see [Using Zowe](zowe-getting-started-tutorial.md).


<!-- The following are commented out for the use of a program directory in bookmaster format

## Notices

APAR numbers are provided in this document to assist in locating PTFs that may be required. Ongoing problem reporting may result in additional APARs being created. Therefore, the APAR lists in this document may not be complete.

## Trademarks

Zowe, the Zowe logo, and zowe.org are trademarks or registered trademarks of Linux Foundation, registered in many jurisdictions worldwide. Other product and service names might be trademarks of Linux Foundation or other companies.

## Reader's Comments

Program Directory for Zowe Open Source Project (Base), August 2019

We appreciate your input on this publication. Feel free to comment on the clarity, accuracy, and completeness of the information or give us any other feedback that you might have.

Report your comments in https://github.com/zowe/community/issues/new/choose.

Thank you for your participation.

-----------------

??? Where does this section belong ???

<< TODO - Where does this section belong ? >>
### SMP/E CALLLIBS Processing

Zowe uses the CALLLIBS function that is provided in SMP/E to resolve external references during installation. When Zowe is installed, ensure that DDDEFs exist for the following libraries:
<!--Needs a list of libraries-->
<!--
- CSSLIB
- DSNLOAD
- MACLIB
**Note:** CALLLIBS uses the previous DDDEFs only to resolve the link-edit for Zowe. These data sets are not updated during the installation of Zowe.
-->
