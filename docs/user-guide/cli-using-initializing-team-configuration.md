# Initializing team configuration

You can use methods that are described in this article to initialize team configuration.

## Create team profile configuration files

1. Issue the following command:

    ```
    zowe config init
    ```

    Zowe CLI responds with prompts for a username and password.

2. Respond to the prompts with a username and password for a mainframe service such as z/OSMF.

    The `zowe config init` command ensures that your credentials are stored securely on your computer by default.

    After you respond, the `zowe.config.json` team configuration file is added to your local `.zowe` directory. This location is the primary location where your mainframe service connection details are defined, such as host and port. You use this configuration file for the following procedures.

After you create the configuration files, you can use a text editor or IDE, such as *Visual Studio Code*, to populate global profiles with connection details for your mainframe services.
## Creating team profiles by defining a connection to z/OSMF

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

## Connecting profiles to API Mediation Layer

To configure your profile to connect to API ML, issue the following command to set up your initial `zowe.config.json` file:

```
zowe-config-auto-init
```

After you issue the command, Zowe CLI prompts you to specify the following information:

- The host name and port to your API ML instance
- Your username and password

If you are using certificates to authenticate, you can specify the details for the certificates by issuing the following commands:

```
zowe auth login apiml --cert-file
```

```
zowe auth login apiml --cert-key-file
```