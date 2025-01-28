# Managing and using profiles

Use profiles and configuration files to apply specific settings when you work with the mainframe.

## Profiles

### Managing a profile

Manage existing profiles listed in the **Side Bar**. Right-click the profile and select **Manage Profile** in the context menu to see a list of options in the **Quick Pick**. Choose the option desired for managing the profile.

### Deleting a profile

Delete a profile displayed in the **Side Bar**. Right-click the profile and select **Manage Profile** in the context menu to see a list of options in the **Quick Pick**. Select **Edit Profile** to open the associated configuration file and manually delete the profile.

### Hiding a profile

Hide a profile from the **Side Bar**. Right-click the profile, select the **Manage Profile** option in the context menu, and then click **Hide Profile** in the **Quick Pick**. If necessary, add the profile back by clicking the **+** icon on the **DATA SETS**, **UNIX SYSTEM SERVICES (USS)**, or **JOBS** bar.

## Configuration files

### Using configurations across VS Code multi-root workspaces

You can take advantage of Visual Studio Code multi-root workspaces to work on multiple projects. Multi-root workspaces are convenient when projects do not share the same parent folder, or when you want to work on different use cases for the same project.

In scenarios like these, you can apply a [project configurations](../user-guide/cli-using-using-team-profiles.md#types-of-configuration-files) to a VS Code multi-root workspace.

#### Using a single project configuration

To apply a specific project configuration across a multi-root workspace:

1. In VS Code, open a directory with a project configuration file to create a single-folder workspace.
2. Select the option **Add Folder to Workspace...** in the **File** menu and select a different directory.

    The selected folder displays as a root in the File Explorer and a new multi-root workspace is created.

3. Modify a data set or USS file and save the changes to the mainframe.

    Zowe Explorer uses the profile information stored in the configuration file from Step 1 to communicate with the mainframe.

#### Using multiple project configurations

To use a project configuration other than the one associated with the first workspace folder, you can either open multiple instances of VS Code, or create a new multi-root workspace.

##### Opening another instance of VS Code

1. In VS Code, create or open a multi-root workspace.

    The configuration file from the first folder applies across the workspace.
2. To use the configuration from a different folder, open a separate VS Code window to open the folder.

    The new instance of VS Code uses the configuration from that directory.

##### Creating a new multi-root workspace

1. In VS Code, create or open a multi-root workspace that lists the folder associated with the desired project configuration as the first root.

    The configuration file from the first folder applies across the workspace.

2. Create or open as many multi-root workspaces as necessary to apply different project configurations.
