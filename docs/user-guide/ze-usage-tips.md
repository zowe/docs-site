# Usage tips

Make the best use of Zowe Explorer with the following tips.

## Data sets, USS, and jobs persistence settings

Store any data sets, USS files, or jobs permanently in the **Favorites** tab. Right-click on a data set, USS file, or job and click **Add Favorite**.

## Identify syntax errors with a syntax highlighter

Zowe Explorer supports syntax highlighting for data sets and USS files. To enable syntax highlighting, download a Visual Studio Code extension that provides syntax highlighting.

## Configure the detected language of a file or data set

Configure the `file.associations` setting in Visual Studio Code to use a specific language for a particular file extension type. This prevents the language for a file or data set opened in Zowe Explorer from being detected incorrectly.

 To set file associations that work for sequential data sets as well as partitioned data set members, use wildcards with the language identifier in the format `**/*LANGUAGE*{,/*}`:

```
    "files.associations": {
        "**/*COBOL*{,/*}": "cobol"
    }
```

In the example above, Zowe Explorer uses wild cards to find matches of the configured language (`COBOL`) in the file paths of sequential data sets (for example, `/lpar.zosmf/TEST.COBOL.PS`) and PDS members (for example, `/lpar.zosmf/TEST.COBOL.PDS/MEMBER`).

## Manage a profile

Manage existing profiles listed in the **Side Bar**. Right-click the profile and select **Manage Profile** in the context menu to see a list of options in the **Quick Pick**. Choose the option desired for managing the profile.

## Delete a profile

Delete a profile displayed in the **Side Bar**. Right-click the profile and select **Manage Profile** in the context menu to see a list of options in the **Quick Pick**. Select **Delete Profile** to open the associated configuration file and manually delete the profile.

## Hide a profile

Hide a profile from the **Side Bar**. Right-click the profile, select the **Manage Profile** option in the context menu, and then click **Hide Profile** in the **Quick Pick**. If necessary, add the profile back by clicking the **+** icon on the **DATA SETS**, **UNIX SYSTEM SERVICES (USS)**, or **JOBS** bar.

## Multi-select functionality

Apply an action to multiple objects at the same time for increased efficiency. This is available in actions such as **Copy** (data sets, USS), **Delete**, and **Add to Favorites**.

Use the `Shift` key to select a continuous range of items, or select multiple items by pressing the `Ctrl` key as you select each item. Once the items are selected, right-click to choose the action from the menu.

## Open recent members

Zowe Explorer lets you open a list of members you have previously worked on. Access the list by pressing `Ctrl`+`Alt`+`R` or `Command`+`Option`+`R`.
