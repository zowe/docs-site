# Configuring Zowe IntelliJ plug-in

After you install the Zowe Intellij plug-in, you must create a z/OSMF connection to your mainframe and some working sets. 

:::note

z/OS v2.1 or later is required z/OSMF configuration. The plug-in is in active development state. 

:::

## Creating z/OSMF connection 

You can create a z/OSMF connection to your mainframe either by manually specifying all the needed information through the Settings tab, or just by clicking the "+" sign. The z/OSMF port should be specified at the end of the address. 

![Configure IntelliJ z/OSMF connection](../images/intellij/intellij-configure.gif)

## Creating a files working set

To work with the datasets and USS files, you must set up a files working set through the **Settings**. 

Complete the following steps:

1. Go to plug-in **Settings**. 
2. Go to the **Files Working Sets** tab (or go directly to the **File Explorer** tab on the plug-in panel). 
3. Press the **+** button.
4. Specify **Working Set Name**. 
5. Press the **+** button and add necessary Mask. 
6. Press the **OK** button. 
7. Go to the plug-in panel and start working with data. 

![Configure IntelliJ files working set](../images/intellij/intellij-files-working-set.gif)

## Creating a JES working set

To operate with your JCL jobs, see their logs, view and edit JCL with further job run, you need to create a JES working set, which will hold all the filters for the JES Explorer. You can do it either by clicking the **+** button in the JES Explorer tab, or through the plugin **Settings**.  

Complete the following steps:

1. Go to plug-in **Settings**. 
2. Go to the **JES Working Sets** tab (or go directly to **JES Explorer** tab on the Plug-in panel). 
3. Press the **+** button.
4. Specify the **JES Working Set Name**. 
5. Press the **+** button and add necessary Mask. 
6. Press the **OK** button.

![Configure IntelliJ JES working set](../images/intellij/intellij-jes-working-set.gif)
