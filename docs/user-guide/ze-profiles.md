# Working with user profiles

You must have a profile before you can use the extension. You can set up a `zosmf` profile to retain your credentials, host, and port name. In addition, you can create multiple profiles and use them simultaneously.

**Follow these steps:**

1. Navigate to the explorer tree.
2. Click the **+** button next to the **DATA SETS**, **USS** or **JOBS** bar.

   **Note:** If you already have a profile, select it from the drop-down menu.

3. Select the **Create a New Connection to z/OS** option.

   **Note:** When you create a new profile, user name and password fields are optional. However, the system will prompt you to specify your credentials when you use the new profile for the first time.

4. Follow the instructions, and enter all required information to complete the profile creation.

![New Connection](../images/ze/ZE-newProfiles.gif?raw=true "New Connection")
<br /><br />

You successfully created a Zowe CLI `zosmf` profile. Now you can use all the functionalities of the extension.

The extension also enables you to hide a profile from the explorer tree, and permanently delete a profile. When you delete your profile permanently, the extension erases the profile from the `.zowe` folder. To hide or delete a profile, right-click the profile and choose the corresponding option from the options list.

## Profile Types

<!-- TODO A placeholder section, which will include information about profile types, the associate profiles feature etc -->