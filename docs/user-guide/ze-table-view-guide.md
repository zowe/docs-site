# Data sets table view

The Data sets table view in Zowe Explorer provides a powerful, spreadsheet-like interface for viewing and managing mainframe data sets and their members. 

This feature is accessible through the Panel's **Zowe Resources** view and offers enhanced data visualization, filtering, and management capabilities beyond the traditional tree view.

## Using the data sets table view

Open the table view from the **Data Sets** tree or from the **Command Palette**.

### Opening from the Data Sets tree

Open the table view from a session or a partitioned data set (PDS):

1.  In the **Data Sets** tree, right-click a session node or a PDS node.
2.  Select **View as Table** from the context menu.

    - If you selected a session node that does not have a search filter applied, you are prompted to enter a data set search pattern.
    - If you selected a PDS node, the table displays all members of that PDS.

### Opening from the Command Palette

Open the table view from the **Command Palette**:

1.  Open the **Command Palette** (`Ctrl`+`Shift`+`P`/`Cmd`+`Shift`+`P`).
2.  Enter and select `Zowe Explorer: List Data Sets`.
3.  Select a profile from the dropdown list.
4.  Enter a data set pattern (for example, `USER.*` or `PUBLIC.DATA.*`).

The table view opens with the data sets that match your search pattern.

## Table view layouts

The data sets table view has two layouts: one for displaying data sets and another for displaying PDS members.

### Data sets layout

This layout displays data sets that match your search criteria. It includes the following columns:

- **Data Set Name**: The name of the data set.
- **Data Set Organization**: The type of data set (for example, PS for physical sequential, PO for partitioned organization).
- **Creation Date**: The date when the data set was created.
- **Modified Date**: The timestamp of the last modification.
- **Record Length**: The LRECL value.
- **Migrated**: Indicates whether the data set is migrated.
- **Record Format**: The RECFM value.
- **Volumes**: The storage volumes where the data set resides.
- **Last Modified By**: The user ID of the person who last modified the data set.

### Members layout

This layout displays the members of a PDS. It includes member-specific columns in addition to some of the standard data set columns:

- **Member Name**: The name of the PDS member.
- **Version**: The member version number.
- **Modification Level**: The current modification level.
- **Current Records**: The number of current records in the member.
- **Initial Records**: The number of initial records in the member.
- **Modified Records**: The number of modified records in the member.
- **SCLM**: SCLM information, if applicable.

## Managing data sets and members

The table view provides actions for managing your data sets and PDS members directly from the table.

### Using the context menu

Right-click a row to open the context menu. It contains the following options:

- **Display in Tree**: Locates and highlights the selected item in the **Data Sets** tree view.
- Additional actions provided by installed Zowe Explorer extensions.

### Opening data sets and members

Open sequential data sets and PDS members in the editor:

1.  Select one or more rows corresponding to sequential data sets or PDS members.
2.  Click the **Open** button in the action bar at the top of the table.

    :::note

    This action is only available for sequential (PS) data sets and PDS members.
    :::

### Pinning and unpinning rows

Pin important data sets or members to keep them visible at the top of the table regardless of sorting or filtering.

#### Pinning a row

  1.  Select one or more rows.
  2.  Click the **Pin** button in the action bar. The pinned rows move to the top of the table.

#### Unpinning a row
  1.  Select one or more pinned rows.
  2.  Click the **Unpin** button. The rows return to their normal position in the table.

### Navigating PDS members

You can "focus" on a PDS to view its members, and then navigate back to the list of data sets.

#### Focusing on a PDS

  1.  In the data sets layout, locate and select a PDS row (its **Data Set Organization** is `PO`).
  2.  Click the **Focus** button in the action bar.
  3.  The table switches to the members layout and displays all members of the selected PDS.

#### Returning to the parent view
  1.  While in the members layout, click the **Back** button in the action bar.
  2.  The table returns to the previous data sets view and preserving its state (filters, sorting, and pinned rows).

### Using tree mode (hierarchical view)

When viewing data sets, the table can display a hierarchy.

To see PDS members without leaving the data sets view:

1. Click the **Expand/Collapse** icon on a PDS entry to show or hide its members.
    - Members are loaded on demand when you expand a PDS for the first time.
2. Navigate the PDS member hierarchy directly within the table.

## Advanced features

The table view includes advanced features for searching, sorting, and performing bulk operations.

### Sorting options

The table view respects the sorting preferences set in the tree view for PDS members. The available sorting options include:

- **Name**: Sorts alphabetically by member name.
- **Date Created**: Sorts chronologically by creation date.
- **Last Modified**: Sorts by the modification timestamp.
- **User ID**: Sorts by the user who last modified the item.

### Bulk operations

Perform actions on multiple items at once:

1.  Select multiple rows using the checkboxes.
2.  Choose an action from the action bar (for example, **Open** or **Pin**) to apply the operation to all selected items.

## Troubleshooting

Refer to this section for solutions to common issues.

### Common issues

#### Table does not load data sets
  - Verify that your z/OSMF profile is active and connected.
  - Check that your search pattern is valid.
  - Ensure you have the proper permissions to access the data sets on the mainframe.
#### Slow performance with large data sets
  - Use a more specific search pattern to reduce the number of results.
  - Lower the number of results per page.
#### Members view shows no data
  - Verify that the PDS exists, is accessible, and contains members.
  - Ensure that the PDS is not migrated.

## Keyboard shortcuts

- **Ctrl**/**Cmd** + **Click**: Multi-select rows.
- **Shift** + **Click**: Select a range of rows.
