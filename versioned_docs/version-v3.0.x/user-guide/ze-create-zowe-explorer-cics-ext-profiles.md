# Managing Zowe Explorer CICS Extension profiles

To use all functions of the Zowe Explorer CICS extension, you need to have a Zowe Explorer profile.

If you already have a Zowe CICS CLI profile, the CICS tree in the VS Code **Side Bar** loads the default profile on startup.  

If you do not have an existing Zowe CICS CLI profile, refer to the following instructions.

## Using Zowe team configuration

1. Expand the **CICS** tree in the **Side Bar**, and click the **+** icon.

2. In the **Quick Pick** menu, select the **Create New CICS profile** option to open the configuration file. If no configuration file is available, select the **Create a new Team Configuration File** option from the **Quick Pick** menu.

   The active configuration file opens in an **Editor**. If none exists, a new configuration file opens in an **Editor**.

3. Edit the configuration file to add a CICS profile.

4. Save the configuration file.

5. Refresh the Zowe Explorer for IBM CICS extension. Either click the **Refresh** icon at the top of the **CICS** tree in the **Side Bar**, or select the `Zowe Explorer for IBM CICS: Refresh` option in the **Command Palette**.

6. In the **CICS** tree, select the **+** icon and select the newly created profile from the **Quick Pick** menu to display it in the **CICS** tree.

   ![Zowe CICS Explorer profiles from config](../images/ze-cics/create-profile-from-config.gif)

::: Note

The CICS profile must specify a CICS region's CICS Management Client Interface (CMCI) TCP/IP host name and port number. The region can be a WUI server in a CICSPlex or a stand-alone CICS System Management Single Server (SMSS) region.  

Configuring a CICS region to have a connection is a system programmer task and more details can be found in [Setting up CMCI with CICSPlex SM](https://www.ibm.com/docs/en/cics-ts/5.3?topic=explorer-setting-up-cmci-cicsplex-sm) or [Setting up CMCI in a stand-alone CICS region](https://www.ibm.com/docs/en/cics-ts/5.3?topic=suace-setting-up-cmci-in-stand-alone-cics-region). If your CMCI connection is configured to use a self-signed certificate that your PC's trust store does not recognize, see [Overriding untrusted TLS certificates](ze-override-tls-certs.md).

:::

To show more than one CICS profiles in the tree, select the **+** button and choose from the list of profiles. Only profiles that are not already included in the CICS tree are shown.

## Updating profiles

1. Expand the **CICS** tree in the **Side Bar**, and right-click a profile to open up the profile menu actions.

2. Select the **Update Profile** option.

   The associated configuration file opens in an **Editor**.

3. Edit the configuration file to update the profile(s).

4. Save the configuration file.

5. Refresh the Zowe Explorer for IBM CICS extension. Either click the **Refresh** icon at the top of the **CICS** tree in the **Side Bar**, or select the `Zowe Explorer for IBM CICS: Refresh` option in the **Command Palette**.

![Zowe CICS Explorer update profiles from config](../images/ze-cics/update-profile-from-config.gif)

## Hiding and unhiding profiles

1. Expand the **CICS** tree in the **Side Bar**, and right-click the desired profile.

2. Select the **Hide Profile** option to hide it from the **CICS** tree view.

3. To unhide the profile, click the **+** icon at the top of the **CICS** tree and select the profile from the **Quick Pick** menu.

   ![Zowe CICS Explorer hide profiles](../images/ze-cics/hide-profile.gif)

## Deleting profiles

1. Expand the **CICS** tree in the **Side Bar**, and right-click the desired profile.

2. Select the **Delete Profile** option.

   The associated configuration file opens in an **Editor**.

3. Edit the configuration file to remove the profile.

4. Save the configuration file.

5. Refresh the Zowe Explorer for IBM CICS extension. Either click the **Refresh** icon at the top of the **CICS** tree in the **Side Bar**, or select the `Zowe Explorer for IBM CICS: Refresh` option in the **Command Palette**.

![Zowe CICS Explorer delete profiles from config](../images/ze-cics/delete-profile-from-config.gif)
