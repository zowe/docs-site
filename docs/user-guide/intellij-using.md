# Using Zowe IntelliJ plug-in

Learn how to work with the Zowe IntelliJ plug-in, including working with datasets, USS files, and jobs.

## Settings

<!-- Add settings description first -->

## Working with Files Working Sets

To work with z/OS datasets or USS files, you need to [set up a Files Working Set](intellij-working-sets.md#files-working-set). The most of the functions are available under context menu in Files Working Set view.

Using the plug-in, you will be able to:
- create, rename, view, edit, delete PS, PDS, PDS/e datasets, as well as PDS and PDS/e members;
- use feature **Allocate Like** to create a dataset with parameters of another dataset;
- use feature **Migrate** for datasets;
- copy and move datasets and members between each other, as well as to USS filesystem and to another z/OS system;
- submit JCL jobs with **Submit Job**;

### Working with z/OS PS datasets

![Work with PS datasets](../images/intellij/create_edit_rename_delete_ps.gif)

### Working with z/OS PDS datasets

![Work with PDS datasets](../images/intellij/pds_create_and_props.gif)

### "Allocate Like" feature

To issue the **Allocate Like**, click right mouse button on any of datasets and select **Allocate Like**.

!["Allocate Like" feature](../images/intellij/allocate_like.gif)

### "Submit Job" feature

To issue the **Submit Job**, click right mouse button on any of PS datasets or PDS members and select **Submit Job**.

!["Submit Job" feature](../images/intellij/submit_jcl.gif)


<!-- CHANGEME -->
## Working with USS files

Using the context menu in Zowe IntelliJ plug-in, you can create, rename, and delete files and directories.

You can use the following functionalities when interacting with USS files:

- **View Unix System Services (USS) files**: You can view multiple USS files simultaneously.
- **Rename USS files and directories**: Use “Rename” menu item in the context menu for any directory or file. 
- **Edit USS files**: Use double-click to open and edit any file. 
- **Create USS files and directories**: Use “New” -> “Directory” or “File” menu item in the context menu for any directory or file. 
- **Delete USS files and directories**: Use “Delete” menu item in the context menu for any directory or file. 
- **Copy/move USS files and directories**: Use “Copy” / “Paste” / “Cut” menu item in the context menu for any directory or file. 

![Work with USS files](../images/intellij/intellij-using-uss-files.gif)

## Working with jobs

To operate with your JCL jobs, ensure you [create a JES Working Set](intellij-configure.md#creating-a-jes-working-set) first, which will hold all the filters for the JES Explorer. 

You can submit a job and see the output. 

![Work with jobs](../images/intellij/intellij-using-jobs.gif)
