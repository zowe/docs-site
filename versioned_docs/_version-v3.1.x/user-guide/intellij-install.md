# Installing the plug-in

There are two ways to install the plug-in:
1. **(Preferred)** Install the plug-in directly inside IntelliJ IDEA
2. Download and install binaries either from [JetBrains Marketplace page](https://plugins.jetbrains.com/plugin/18688-zowe-explorer) or from our [GitHub repository](https://github.com/zowe/zowe-explorer-intellij)

## Installing inside IntelliJ IDEA

To install the plug-in from IntelliJ:

1. At the right top corner click the gear button and from the dropdown list select the **Plugins** option

![Select plugins from the dropdown](../images/intellij/install_in_intellij_plugins.png)

2. Select the **Marketplace** tab on top of the window

![Select marketplace tab](../images/intellij/install_in_intellij_marketplace.png)

3. Type **Zowe Explorer** and click **Install**.

![Search for the plugin and install](../images/intellij/install_in_intellij_search_and_install.png)

4. Wait until the plug-in is installed, then click **Restart IDE**. IntelliJ IDEA will ask you if you want to restart the IDE to applly all the changes in plugins. Select **Restart**, wait until the IDE is restarted

![Restart the IDE](../images/intellij/install_in_intellij_restart.png)

After the IDE is restarted, the plug-in's icon will appear at the right top corner. It means that you are ready to work with it.

![After installed](../images/intellij/install_in_intellij_after_install.png)

:::note
Sometimes the plug-in's icon appear at some different place, other than the right top corner. To fix it, right-click on the icon, in the **Move To** dropdown select the **Right Top** option.

![Change the corner](../images/intellij/install_in_intellij_corner_change.png)

:::

## Downloading binaries

:::warning ALWAYS DOUBLE-CHECK THE BINARIES YOU ARE TRYING TO INSTALL! 
We are responsible for the genuine software provided by the zowe community only. If you have any questions regarding the installation or the usage of the plug-in, feel free to contact any person directly related to Zowe
:::

There are three ways of downloading binaries of the Zowe Explorer plug-in for IntelliJ IDEA:
1. [JetBrains Marketplace page](https://plugins.jetbrains.com/plugin/18688-zowe-explorer)
2. [GitHub Releases](https://github.com/zowe/zowe-explorer-intellij/releases) of our repository
3. [GitHub Actions](https://github.com/zowe/zowe-explorer-intellij/actions) of our repository

### Downloading binaries from JetBrains Marketplace page

1. Proceed to the [JetBrains Marketplace page](https://plugins.jetbrains.com/plugin/18688-zowe-explorer) of the plug-in
2. Click **Get** button or select the **Versions** tab

![Get IntelliJ plug-in](../images/intellij/get_plugin.png)

3. Select the compatibility option and the channel of the distribution:
    - **Stable** - the stable versions of the plug-in
    - **EAP** - the *Early Access Program* versions of the plug-in, sometimes are provided for the EAP versions of the IntelliJ IDEA
    - **Preview** - the next versions of the plug-in, that contain the bleeding-edge features of the plug-in, which may be unstable
  
![Select compatibility and channel](../images/intellij/select_compatibility_and_channel.png)

4. Select the version of the plug-in you want to download, click **Download** button against it

![Download plug-in from JetBrains Marketplace](../images/intellij/download_plugin_marketplace.png)

### Downloading binaries from GitHub Releases

1. Proceed to the [GitHub Releases](https://github.com/zowe/zowe-explorer-intellij/releases) of the repository
2. Select the release version you want to install and click on the .zip file to download the binary

:::note
Prefer the "*-signed.zip" over the regular one
:::

![Download plug-in from GitHub Releases](../images/intellij/download_plugin_releases.png)

### Downloading binaries from GitHub Actions

:::note
You need to be logged into a GitHub account to be able to download artifacts
:::

1. Proceed to the [GitHub Actions](https://github.com/zowe/zowe-explorer-intellij/actions) of the repository
2. Select a build workflow

![Select a build workflow actions](../images/intellij/actions_select_workflow.png)

3. Select the build of a branch you want to download

![Select the build of a branch actions](../images/intellij/actions_select_build.png)

4. At the bottom of the page, in the *Artifacts* section, select the .zip file with the version build to download

![Download the build actions](../images/intellij/actions_download_artifact.png)

## Installing binaries

After the .zip is downloaded, do the next steps:
1. At the right top corner click the gear button and from the dropdown list select the **Plugins** option

![Select plugins from the dropdown](../images/intellij/install_in_intellij_plugins.png)

2. Near the **Installed** tab, click the gear button, from the dropdown select the **Install Plugin from Disk** option

![Install from disk](../images/intellij/install_from_bin_from_disk.png)

3. In the **Choose Plugin File** dialog window, search for the .zip you want to install. Select it and click **OK** button

![Search for .zip](../images/intellij/install_from_bin_search_for_zip.png)

4. The plug-in will appear in the **Installed** tab, click the **Restart IDE** button, and then the **Restart** button in the dialog window.

![Restart after install from .zip](../images/intellij/install_from_bin_restart.png)

After the IDE is restarted, the plug-in's icon will appear at the right top corner. It means that you are ready to work with it.

![After installed](../images/intellij/install_in_intellij_after_install.png)

:::note
Sometimes the plug-in's icon appear at some different place, other than the right top corner. To fix it, right-click on the icon, in the **Move To** dropdown select the **Right Top** option.

![Change the corner](../images/intellij/install_in_intellij_corner_change.png)

:::
