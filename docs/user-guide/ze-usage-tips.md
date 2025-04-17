# Usage tips

Make the best use of Zowe Explorer with the following tips.

## Data sets, USS, and jobs persistence settings
You can store any data sets, USS files, or jobs permanently in the **Favorites** tab. Right-click on a data set, USS file, or job and click **Add Favorite**.

## Identify syntax errors with a syntax highlighter
Zowe Explorer supports a syntax highlighter for data sets. To enhance the experience of using the extension, you can download an extension that highlights syntax.

## Configure the detected language of a file or data set

You can configure Visual Studio Code to use a specific language for a particular file extension type. This prevents the language for a file or data set opened in Zowe Explorer to be detected incorrectly. To set file associations, see [Add a file extension to a language](https://code.visualstudio.com/docs/languages/overview#_add-a-file-extension-to-a-language).

## Edit a profile
You can edit existing profiles listed in the **Side Bar** by clicking the profile's **Edit** icon (next to the **Search** icon). The feature lets you modify the information inside your profile.

## Delete a profile
In Zowe V1, you can permanently delete profiles by right-clicking the profile and selecting the **Delete Profile** option. The feature deletes the profile from your `.zowe` folder. In Zowe V2, right-click the profile, and select **Delete Profile** to open the configuration file and manually delete the profile.

:::tip
Alternatively, you can delete a profile by using the VS Code **Command Palette**. Press `F1` on your keyboard, then select the **Zowe Explorer: Delete a Profile Permanently** option. In Zowe V1, you select the profile to delete. In Zowe V2, the configuration file opens for you to delete the profile manually.
:::

## Hide a profile
You can hide a profile from the **Side Bar** by right-clicking the profile and selecting the **Hide Profile** option. If necessary, add the profile back by clicking the **+** icon on the **DATA SETS**, **UNIX SYSTEM SERVICES (USS)**, or **JOBS** bar.

## Open recent members
Zowe Explorer lets you open a list of members you have previously worked on. You can access the list by pressing `Ctrl`+`Alt`+`R` or `Command`+`Option`+`R`.
