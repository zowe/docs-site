# Usage tips

Make the best use of Zowe Explorer with the following tips.

## Data sets, USS, and jobs persistence settings

You can store any data sets, USS files, or jobs permanently in the **Favorites** tab. Right-click on a data set, USS file, or job and click **Add Favorite**.

## Pull from mainframe to update cached files

When you work on a data set, PDS member, USS file, or job spool file, Zowe Explorer caches the resource data for faster performance. Over time, the data can become outdated.

To ensure the file is up to date, right-click the file and select the **Pull from mainframe** option in the file's context menu.

## Identify syntax errors with a syntax highlighter

Zowe Explorer supports a syntax highlighter for data sets. To enhance the experience of using the extension, you can download an extension that highlights syntax.

## Configure the detected language of a file or data set

Configure the `file.associations` setting in Visual Studio Code to use a specific language for a particular file extension type. This prevents the language for a file or data set opened in Zowe Explorer from being detected incorrectly.

 To set file associations that work for sequential data sets as well as partitioned data set members, use wildcards with the language identifier in the format `**/*LANGUAGE*{,/*}`:

```
    "files.associations": {
        "**/*COBOL*{,/*}": "cobol"
    }
```

In the example above, Zowe Explorer uses wild cards to find matches of the configured language (`COBOL`) in the file paths of sequential data sets (for example, `/lpar.zosmf/TEST.COBOL.PS`) and PDS members (for example, `/lpar.zosmf/TEST.COBOL.PDS/MEMBER`).

## Multi-select functionality

Zowe Explorer lets you open a list of members you have previously worked on. You can access the list by pressing `Ctrl`+`Alt`+`R` or `Command`+`Option`+`R`.

## Access resources with virtual workspaces

Use your virtual workspaces to access multiple resources from the **Explorer** view, such as local files or resources from other file systems.

In the **Data Sets** or **Unix System Services (USS)** tree, click on a profile **Search** icon. In the **Search** prompt, enter a data set search pattern or a USS file path. Right click on a resource to select the **Add to Workspace** context menu option. The status bar message displays and the selected folder is listed in the **Explorer** view with any other files/resources.

## Configure read-only rules

Sometimes your system may contain data sets and USS files that some users may have edit permissions for, but generally do not want to be editing. By default, opening a data set or file in Zowe Explorer opens it in edit mode, and, when combined with VS Code's [autosave setting](https://code.visualstudio.com/docs/editing/codebasics#_save-auto-save) (which is disabled by default), can lead to accidental edits to a file without you realising.

In VS Code, to toggle the currently opened file to read-only mode, press `F1` to open the command palette, then enter `File: Set Active Editor Read-only in Session`. As the name suggests, it sets the opened file as read-only only for that session. However, this does not cover all bases, so Zowe Explorer implements its own solution.

If you want to set groups of data sets or USS files as read-only by default, you can configure the setting `zowe.readOnly.rules`:
- Supports pattern negation for data sets and Unix path globs.
- Supports setting masks for specific profiles, or globally across all profiles.
- Any number or combination of entries may be made.
- Rules are checked in order and the last matching rule wins.

Rule types:
- `profile`: Apply to the whole profile.
- `ds`: Data set mask, where % matches one character, * matches within a qualifier and ** matches any qualifiers (standard z/OS data set mask rules).
- `uss`: Unix path glob, where ? matches one character, * matches within a directory or file name and ** matches any number of directories (standard Unix path glob rules).

For example:

```json
"zowe.readOnly.rules": [
    { "profile": "lpar1", "ds": "LPAR1.PROD.**", "uss": "/lpar1/**" },
    { "profile": "lpar1", "ds": "!LPAR1.PROD.EMRGNCY" },
    { "profile": "lpar2", "ds": "Z%P.**" }, 
    { "profile": "lpar2", "ds": "!Z%P.PUBLIC.**" }, 
    { "uss": "/**" }, { "uss": "!/u/myuser/**" }
  ],
```

1. For profile `lpar1`, makes any qualifier after `LPAR1.PROD` read-only, except for `LPAR1.PROD.EMRGNCY`, and makes everything in the USS directory `/lpar1` read-only.
2. For profile `lpar2`, makes any qualifier after `Z%P` (e.g. ZAP, ZBP etc.) read-only, except any qualifier after `Z%P.PUBLIC`.
3. For all profiles, makes all USS files read-only, except for `myuser`'s homedir. Since rules are checked in order and the last matching rule wins, the USS rule in the first row for profile `lpar1` is effectively redundant.

An example use case is to make all data sets, USS files and directories read-only by default, then only allow editing a file once you want to. Set the rules as follows:

```json
"zowe.readOnly.rules": [
    { "ds": "*.**" },
    { "uss": "**" },
],
```

Then use the unlock icon 🔓 to edit the currently opened file (described in more detail below).

### Toggle read-only mode temporarily

You can override your `zowe.readOnly.rules` for a profile, data set, member, USS directory or USS file. Overrides only last until you close VS Code. After that, your rules decide what is read-only again.

For a file open in the editor, use the button on the editor toolbar (top right of the editor, next to the tabs):

- A lock icon 🔒 means the file is writable. Click it to make the file read-only.
- An unlock icon 🔓 means the file is read-only. Click it to make the file writable.

You can also right-click an item in the **Data Sets** or **Unix System Services** tree and select **Make Read-Only** or **Make Writable**. Only the option that changes the item's current state is shown.

| Action type | Applies to | What it affects |
| --- | --- | --- |
| Editor toolbar 🔒 / 🔓 | The open file | That data set, member or USS file only |
| Command palette (`F1`): Zowe Explorer: **Make Read-Only** / **Make Writable** | The open file | That data set, member or USS file only |
| Tree right-click | Profile in the **Data Sets** tree | Every data set and member in that profile, in the **Data Sets** tree only |
| Tree right-click | Profile in the **Unix System Services** tree | Every file and directory in that profile, in the **Unix System Services** tree only. If the profile is filtered to a directory (for example `/u/myuser`), only that directory and everything in it |
| Tree right-click | PDS | The PDS and all of its members |
| Tree right-click | Sequential data set | That data set only |
| Tree right-click | PDS member | That member only |
| Tree right-click | USS directory | The directory and everything in it, including subdirectories |
| Tree right-click | USS file | That file only |

### Blocked actions from read-only rules

The rules you have set may cause a block any of these actions and makes the respective error message:

- Editing a file in editor
- Saving a file in the editor
- Overwriting a file in the editor if there's a conflict detected
- Creating a member in a PDS that's read-only
- Creating a data set/allocate-like if the new data set would fall under the read-only rule or if the whole profile is read-only
- Creating a USS file or directory if the new file or directory would fall under the read-only rule or if the whole profile is read-only
- Uploading a USS file or data set if the target PDS, data set or folder would fall under the read-only rule
- Deleting a USS file or data set or member if it or its parent would fall under the read-only rule
- Renaming a data set or file if it or its destination would fall under the read-only rule
- Drag and drop across profiles if the source or destination would fall under the read-only rule
- Pasting a file or data set if the target destination would fall under the read-only rule
- USS edit attributes 

Some actions are not blocked by read-only rules when they could be, because of technical complexity and performance on the client. Some examples of these are:

- Deleting, renaming or moving a PDS but a member inside of it falls under a read-only rule
- Deleting, renaming or moving a z/OS Unix directory but a file or directory inside of it falls under a read-only rule
