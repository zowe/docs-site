# Initializing team configuration

You can use methods that are described in this article to initialize global configuration.

## Creating a team profile by defining a connection to z/OSMF

The following steps describe how to interactively initialize team profile configuration. It is the recommended method to initialize team configuration.

1. Issue the following command:
    ```
    zowe config init
    ```
    The CLI responds with prompts for a username and password.

2.  Respond to the prompts with a username and password for a mainframe service such as z/OSMF.

    The `zowe config init` command ensures that your credentials are stored securely on your computer by default.
    
    After you respond, the `zowe.config.json` team configuration file is added to your local `.zowe` directory. This location is the primary location where your mainframe service connection details are defined, such as host and port. You use Use this configuration file for the following procedures.

3.  (Optional) Issue a Zowe CLI command to test that you can access z/OSMF.

    **Example:** List all data sets under your user ID:
    ```
    zowe zos-files list data-set "MY.DATASET.*"
    ```

    A list of data sets is returned. You successfully configured Zowe CLI to access a z/OSMF instance.
    
    If the CLI returns an error message, verify that you have access to the target system. Examine your configuration files in a text editor to verify that the information you entered is correct.

**Important:** After the configuration files are in place (either via the zowe config init command or by manually creating the files), the now-deprecated zowe profiles commands will no longer function. Zowe CLI will return errors if you attempt to use deprecated profile commands.

## Create your configuration files manually

