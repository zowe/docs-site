# Using Zowe IntelliJ plug-in

Learn how to work with the Zowe IntelliJ plug-in, including working with datasets, USS files, and jobs. 

## Working with datasets 

You can create, rename, and delete datasets and members by using the Zowe IntelliJ plug-in. 

You can create a new dataset, member, or allocate a dataset like an existing one by using **Allocate Like**** menu item in a context menu.

You can use the following functionalities when interacting with datasets:

- **View datasets and use different Working Sets**: You can see different datasets in the tree using several different Working Sets.
- **Refresh the list of datasets**: Use “Refresh” menu item in the context menu for any dataset or Working set in a tree. 
- **Migrate datasets**: Use “Migrate” menu item in the context menu for any dataset. 
- **Rename datasets and members**: Use “Rename” menu item in the context menu for any dataset or dataset member. 
- **Copy/move datasets and dataset members**: Use “Copy”, “Paste”, or “Cut” menu items in the context menu for any dataset or dataset member. 
- **Edit dataset members**: Use double-click to open and edit any dataset member. 
- **Create datasets/members and specify the parameters**: Use “New” -> “Dataset” or “Member” menu item in the context menu for any dataset or dataset member. 
- **Delete dataset or dataset member**: Use “Delete” menu item in the context menu for any dataset or dataset member. 
- **Submit a JCL**: You can submit a JCL from a chosen dataset. Use “Submit Job” menu item in the context menu for any dataset member. 
- **Allocate Like**: You can create a copy of a chosen dataset with the same parameters. Use “Allocate Like” menu item in the context menu for any dataset. 

![Work with datasets](../images/intellij/intellij-using-datasets.gif)

## Working with USS files

To work with USS files, you need to [set up a specified Working Set](intellij-configure.md#creating-a-files-working-set) first and then work with all available files and directories. 

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
