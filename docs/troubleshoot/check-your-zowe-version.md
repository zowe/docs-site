# Checking your Zowe version release number

Once Zowe is installed and running, you will likely update it regularly as new major and minor releases come out.

To keep track of which release is running as you troubleshoot an issue, the files and commands listed here can help.

## Using the `manifest` file

Find the version number of your Zowe release in the `manifest.json` file.

1. Extract the PAX file for the [Zowe convenience build](../user-guide/install-zowe-zos-convenience-build.md) to `<YOURDIRECTORY>`.
2. Navigate to `<YOURDIRECTORY>` to locate the `manifest.json` file.
3. Open the `manifest.json` file.

    The Zowe version is listed at the beginning of the file:

    ```
    {
    "name": "Zowe",
    "version": "2.10.0",
    "description": "Zowe is an open source project ...
    ```

## Server side commands

To see the version of a Zowe release, run the `zwe version` command in USS:

```shell
zwe version
```

The `zwe version` command returns a single line with the Zowe release number:
```
Zowe v2.0.0
```
### Using other commands

Add the `debug` or `trace` options to the `zwe version` command to show more information.

Using the `debug` mode:

```
zwe version --debug
Zowe v2.0.0
build and hash: (HEADdetachedfrom4dd7c20c)#2 (c295c516259df909cf241f1818b359645276a96a)
```
The `debug` mode shows the unique build identifier for the installed version of Zowe. Run this when you want to replicate a bug for testing or troubleshooting.

Using the `trace` mode:
```
zwe version --trace
Zowe v2.0.0
build and hash: (HEADdetachedfrom4dd7c20c)#2 (c295c516259df909cf241f1818b359645276a96a)
Zowe directory: /SYSTEM/var/zowe/runtime
```
The `trace` mode  shows the location of the `zwe` executable script. Run this when you want to confirm the location of your script.

## Client side commands

### Zowe CLI

1. Open the Zowe CLI.

2. Run the following command:

    ```
    zowe –-version
    ```

    The Zowe CLI version number is returned.

### Zowe CLI plug-ins

1. Open the Zowe CLI.

2. Run the following command:
    ```
    zowe plugins list –-short
    ```

    A list of the installed Zowe CLI plug-ins are returned, along with the version number for each plug-in.

### Zowe Explorer for Visual Studio Code

1. Open Visual Studio Code and click the **Extensions** icon.

    The **Extensions Side Bar** displays.
2. In the **Search** bar, enter `Zowe Explorer`.
3. In the **Side Bar**, select `Zowe Explorer` from the search results.

    An **Editor** tab displays the Zowe Explorer marketplace details. The version number is located next to the Zowe Explorer name.

### Zowe Explorer for Visual Studio Code Extensions

1. Open Visual Studio Code and click the **Extensions** icon.

    The **Extensions Side Bar** displays.
2. In the **Search** bar, enter the name of the Zowe Explorer extension.
3. In the **Side Bar**, select the entered Zowe Explorer extension from the search results.

    An **Editor** tab displays the Zowe Explorer extension's marketplace details. The version number is located next to the Zowe Explorer extension's name.

### Zowe IntelliJ Plug-in

1. Open the **File** menu and click **Settings**.

    The **Settings** window opens.
2. Click **Plugins**, then click **Installed** tab.
    
    A list of the installed extensions displays.
3. Search for, and select, `Zowe Explorer`.
    
    The Zowe Explorer marketplace details display on the right side of the window. The version number is located adjacent to the Zowe Explorer name.
