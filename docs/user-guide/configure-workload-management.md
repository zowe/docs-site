# Configuring Workload Management

As a system administrator, you can configure the Workload Management plug-in to fine tune performance and monitor z/OS resources.

## What is Workload Management

To learn about Workload Management and how to use it, refer to the [IBM documentation](https://www.ibm.com/docs/en/zos/3.2.0?topic=management-what-is-mvs-workload).

## Configuring Workload Management from the z/OSMF web interface

Follow these steps to configure the entire interactive workload that goes through a z/OS service.

:::warning
Due to the complex nature of Workload Management settings, only system administrators should make these changes.
:::

1. In the Workload Management application, navigate to the z/OSMF service definition.
2. Go to Workload Management. 
3. Click **Service Definitions** to open the **Service Definitions** tab.

    See the [IBM documentation](https://www.ibm.com/docs/en/zos/3.2.0?topic=definition-defining-parts-service) to learn more about the structure of a service definition.
4. Click the active service definition to open the **View** tab.
5. Open the **Switch To** drop-down menu and select the **Editable Version of Service Definition** option.

6. Open the **Switch To** drop-down menu and select **Service Classes**.

    See the [IBM documentation](https://www.ibm.com/docs/en/zos/3.2.0?topic=management-defining-service-classes-performance-goals) to learn more about service classes. 
7. Expand the **IZUGHTTP** and **IZUGWORK** service classes.

    :::note
    Your service classes can differ depending on your configuration.
    
    IZUGHTTP and IZUGWORK are default service classes in z/OSMF. IZUGHTTP is for synchronous tasks, IZUGWORK for asynchronous tasks. See the [IBM documentation](https://www.ibm.com/docs/en/zos/3.2.0?topic=system-izuprmxx-reference-information#izuhpinputcorescripts__StatementsAndParametersForIZUPRMxx__title__1) to learn more about IZUGHTTP and IZUGWORK.
    :::

8. Change the number in the **Importance** drop-down menu to reflect your performance goal.
9. Use the **Goal Type** drop-down menu to specify a goal for both service classes. Change the z/OSMF response time by adjusting the appropriate goal field.

    See the [IBM documentation](https://www.ibm.com/docs/en/zos/3.2.0?topic=goals-defining-performance) to learn more about goal types.

## Defining a new service class

This configuration follows the same steps as [Configuring Workload Management from the z/OSMF web interface](#configuring-workload-management-from-the-zOSMF-web-interface). However, you must first take some additional preparation steps:

1. Define the performance attributes in the default log-on procedure (such as `IZUFPROC`) that z/OSMF uses to spawn new address spaces.

2. Create a new service class and workload that are mapped to the default log-on procedure.

3. Follow the steps in [Making minimal configuration changes](#making-minimal-configuration-changes). For Step 7, use the service class you defined in the preceding paragraph.
