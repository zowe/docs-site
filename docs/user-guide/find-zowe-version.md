# Finding your Zowe version release number

Once Zowe is installed and running, you will likely update it regularly as new major and minor releases come out.

To keep track of which release is running as you develop an extension, or troubleshoot an issue, the commands listed here can help.

## Client-side components

### Zowe CLI

In the Zowe CLI, run the following command:

`zowe –-version`

The Zowe CLI version number is returned.

### Zowe CLI plug-ins

In the Zowe CLI, run the following command:

`zowe plugins list –-short`

A list of the installed Zowe CLI plug-ins are returned, along with the version number for each plug-in.

### Zowe Explorer for Visual Studio Code

1. Open Visual Studio Code and click the **Extensions** icon.
2. In the **Search** bar, enter `Zowe Explorer`.
3. In the **Side Bar**, select `Zowe Explorer`.

    An **Editor** tab displays the Zowe Explorer marketplace details. The version number is located next to the Zowe Explorer name.

### Zowe Explorer for Visual Studio Code Extensions

1. Open Visual Studio Code and click the **Extensions** icon.
2. In the **Search** bar, enter the name of the Zowe Explorer extension.
3. In the **Side Bar**, select the entered Zowe Explorer extension.

    An **Editor** tab displays the Zowe Explorer extension's marketplace details. The version number is located next to the Zowe Explorer extension's name.

### Zowe IntelliJ Plug-in

1. Open the **File** menu and click **Settings**.
    The **Settings** window opens.
2. Click **Plugins**, then click **Installed** tab.
    A list of the installed extensions displays.
3. Search for, and select, `Zowe Explorer`.
    The Zowe Explorer marketplace details display on the right side of the window. The version number is located adjacent to Zowe Explorer's name.

### Zowe Chat

ask it for the version???

## Server-side components
