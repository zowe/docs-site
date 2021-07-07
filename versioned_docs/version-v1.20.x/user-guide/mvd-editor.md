# Using the Editor

With the Zowe Editor, you can create and edit the many types of files.

## Specifying a highlighting language

1. Click **Language** on the editor menu bar. A dropdown menu will be displayed.
2. From the dropdown, select the desired language. Plain Text will be chosen by default if the automatic language detection is not able to determine the language. 

## Open a dataset

To open a dataset, follow these steps:

1. From the **File** menu, select Open Datasets. You can also use (ALT+K).
2. In the Dataset field, specify the name of the dataset you want to open. 
3. Click **Open** 

## Deleting a file or folder

1. In the file tree, right-click on a file or folder you want to delete.
2. From the right-click menu, click **Delete**. A warning dialogue will appear. 
3. Click **Delete** 

## Opening a directory

1. From the **File** menu, select **Open Directory**. You can also use (ALT+O).
2. In the Directory field, specify the name of the directory you want to open. For example: `/u/zs1234`
3. Click **Open**

The File Explorer on the left side of the window lists the folders and files in the specified directory. Clicking on a folder expands the tree. Clicking on a file opens a tab that displays the file contents. Double-clicking on a folder will make the active directory the newly specified folder. 

## Creating a new directory

1. Right-click on a location in the directory tree where you want to create a new directory.
2. From the right-click menu, click **Create a directory...**.
3. Specify a directory name in the Directory Name field. 
4. The Path will be set to the location that you initially right-clicked to open the dialogue. You can specify a different location in the Path field. 
5. Click **Create**    

## Creating a new file

To create a new file, complete these steps:

1. From the **File** menu, select **New File**. You can also use (ALT+N).
2. From the **File** menu, select **Save** to save the newly created file. You can also use (Ctrl+S)
3. In the File Name field, specify the file name for the newly created file.
4. Choose an encoding option from the Encoding dropdown menu. The directory will be prefilled if you are creating the new file in an existing folder.
5. Click **Save**
6. To close a file, click the X icon in its tab, double-click on the tab, or use (Alt+W).   

## Hotkeys

The following hotkeys can be used in the editor to navigate or perform actions with only the keyboard.

- Shift TAB: Cycle through the menu bar, browsing type, search bar, file tree, and editor component.  
    - Individual options within the menu bar and individual nodes within the file tree can be navigated with the arrow keys and ENTER (to select).

|Hot Key|Command|
|---	|---	|
|ALT+K  |Open a dataset |
|ALT+O  |Open a directory |
|ALT+N  |Create a new file |
|ALT+W   	|Close tab |
|ALT+W+Shift |Close all tabs
|CTRL+S |Save file |
|ALT+M |Navigate Menu bar (use arrow keys) |
|ALT+P|Search Bar focus|
|ALT+1   	|Primary editing component focus |
|ALT+T+CTRL| Undo close/close all|
|ALT+R+Shift|Refresh active tab|
|ALT+PgUp(or <)| Switch to left tab|
|ALT+PgDown(or >)|Switch to right tab|
|ALT+B|Show/hide left-hand side file tree|