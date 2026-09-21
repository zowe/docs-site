# Usage tips

Make the best use of Zowe Explorer with the following tips.

## Data sets, USS, and jobs persistence settings

You can store any data sets, USS files, or jobs permanently in the **Favorites** tab. Right-click on a data set, USS file, or job and click **Add Favorite**.

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
