# Initializing team configuration

You can use one of the following methods to initialize team configuration.

**Tip:** If API Mediation Layer is running on your site, *Connecting profiles to API Mediation Layer* is the recommended method to use to initialize team configuration.

## Create team profile configuration files

1. Issue the following command:

    ```
    zowe config init
    ```

    Zowe CLI responds with prompts for a username and password.

2. Respond to the prompts with a username and password for a mainframe service such as z/OSMF.

    The `zowe config init` command ensures that your credentials are stored securely on your computer by default.

    After you respond, the `zowe.config.json` team configuration file is added to your local `.zowe` directory. You can then use a text editor or IDE, such as *Visual Studio Code*, to add the connection details for your mainframe services.
    
    
3.  (Optional) Issue a Zowe CLI command to test that you can access z/OSMF.

    **Example:** List all data sets under your user ID:
    ```
    zowe zos-files list data-set "MY.DATASET.*"
    ```

    A list of data sets is returned. You successfully configured Zowe CLI to access a z/OSMF instance.
    
    If the CLI returns an error message, verify that you have access to the target system. Examine your configuration files in a text editor to verify that the information you entered is correct.


**Important:** After the configuration files are in place (either by using the `zowe config init` command or by manually creating the files), the now-deprecated zowe profiles commands no longer function. Zowe CLI returns errors when you attempt to use deprecated profile commands.

## Connecting profiles to API Mediation Layer

If you are using the API Mediation Layer, you can set up your `zowe.config.json` file to automatically access the services that are registered to the API ML by issuing the following command:

```
zowe config auto-init
```

After you issue the command, Zowe CLI prompts you to specify the following information:

- The host name and port to your API ML instance
- Your username and password

**Using Certificates:**

If you are using certificates to authenticate, you can specify the details for the certificates by issuing the following command:

```
zowe auth login apiml --cert-file "/path/to/cert/file" --cert-key-file "/path/to/cert/key/file"
```
