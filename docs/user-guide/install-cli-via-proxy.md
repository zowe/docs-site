# Install CLI from Online Registry Via Proxy
​
This topic describes how to install Zowe CLI using the NPM install command when you are working behind a proxy server. Use this installation method when your site blocks access to public npm.

You can install Zowe CLI from an online registry via proxy on Windows, macOS, or Linux operating systems:

*  This method requires access to an internal server that will allow you to connect to the appropriate registries. For other installation methods, see Installing CLI.
*  Your default registry must be public npm (or a mirror of public npm).
*  If you previously installed the CLI and want to update to a current version, see [Updating Zowe CLI](../user-guide/cli-updatingcli.md)
​

**Follow these steps:**

1. Identify the proxy server, including the IP address or hostname and the port number.​
    * If your proxy server **does not require** login credentials, issue the following commands to add the proxy URL to the NPM config file:

        ```
        npm config set https-proxy http://proxy.[proxy_name].com:[port_number]
        npm config set proxy http://proxy.[proxy_name].com:[port_number]
        ```

        -  [proxy_name]: The IP or hostname
        -  [port_number]: The port number of the proxy server.

    * If your proxy server **requires** login credentials, issue the following commands to add the proxy URL, with login credentials, to the NPM config file:

        ```
        npm config set https-proxy http://[username]:[password]@proxy.[proxy_name].com:[port_number]
        npm config set proxy http://[username]:[password]@proxy.[proxy_name].com:[port_number]
        ```

        - [username] and [password]: The required login credentials
        - [proxy_name]: The IP or hostname
        - [port_number]: The port number of the proxy server

2. Ensure that you meet the [System requirements](../user-guide/systemrequirements-cli.md) for CLI.

3. To install Zowe CLI, issue the following command. On Linux, you might need to prepend `sudo` to your npm commands:

    ```
    npm install -g @zowe/cli@zowe-v2-lts
    ```

4. **(Optional)** To install open-source Zowe plug-ins:

    a. Ensure that your system meets the [Software requirements for Zowe CLI plug-ins](../user-guide/cli-swreqplugins.md).
        
    b. Issue the following command to install all of the plug-ins:
        
    ```
    zowe plugins install @zowe/cics-for-zowe-cli@zowe-v2-lts @zowe/ims-for-zowe-cli@zowe-v2-lts @zowe/mq-for-zowe-cli@zowe-v2-lts @zowe/zos-ftp-for-zowe-cli@zowe-v2-lts @zowe/db2-for-zowe-cli@zowe-v2-lts
    ```
        
    Zowe CLI is installed.

5. **(Optional)** Verify that a Zowe plug-in is operating correctly. 

   ```
   zowe plugins validate [my-plugin]
   ```

   - [my-plugin]: The syntax for the plug-in. For example, `@zowe/cics@zowe-v2-lts`.
​
6. **(Optional)** Test the connection to z/OSMF. See [Testing connections to z/OSMF](../user-guide/cli-using-using-profiles.md#testing-connections-to-zosmf) 

7. **(Optional)** Access the Zowe CLI Help (`zowe --help`) or the Zowe CLI Web Help for a complete reference of Zowe CLI.
​
After you install Zowe CLI, you can connect to the mainframe directly issuing a command, by creating user profiles and making use of them on commands, or by using environment variables. For more information, see [Displaying help](cli-using-displaying-help.md).
