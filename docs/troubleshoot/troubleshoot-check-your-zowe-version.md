# Checking your Zowe version release number

Once Zowe is installed and running, you will likely update Zowe and Zowe plug-ins regularly as new major and minor releases come out.

To keep track of which release is running as you troubleshoot an issue, the commands and file listed here can help.

## Server side

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
Zowe v2.9.0
build and hash: v2.x/master#3248 (77fe6c5277e52474ebe9258c1b745949537dc398)
```
The `debug` mode shows the unique build identifier for the installed version of Zowe. Run this when you want to replicate a bug for testing or troubleshooting.

Using the `trace` mode:
```
zwe version --trace
Zowe v2.9.0
build and hash: v2.x/master#3248 (77fe6c5277e52474ebe9258c1b745949537dc398)
Zowe directory: /SYSTEM/zowe/runtime
```
The `trace` mode  shows the location where the convenience build was extracted (such as `<RUNTIME_DIR>`). Run this when you want to confirm the location of your Zowe runtime directory.

### Using the `manifest` file

Find the version number of your Zowe release in the `manifest.json` file.

1. Extract the PAX file for the [Zowe convenience build](../user-guide/install-zowe-zos-convenience-build.md) to `<RUNTIME_DIR>`.
2. Navigate to `<RUNTIME_DIR>` to locate the `manifest.json` file.
3. Open the `manifest.json` file.
    
    The Zowe version is listed at the beginning of the file:
    ```
    {
    "name": "Zowe",
    "version": "2.10.0",
    "description": "Zowe is an open source project ...
    ```

## Client side

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

### Zowe Explorer plug-in for IntelliJ IDEA

See the [guide](./troubleshoot-intellij) for instructions.
