# Install CLI from Online Registry Via Proxy
​
This topic describes how to install Zowe CLI using the NPM install command when you are working behind a proxy server. You will need to use this installation method if your site blocks access to public npm.

You can install Zowe CLI from an online registry via proxy on Windows, macOS, or Linux operating systems:

*  This method requires access to an internal server that will allow you to connect to the appropriate registries. For other installation methods, see Installing CLI.
*  Your default registry must be public npm (or a mirror of public npm).
*  If you previously installed the CLI and want to update to a current version, see Update Zowe CLI.

​Follow these steps: 
​
1. Identify the proxy server, including the IP address or hostname and the port number.​
    * If your proxy server **does not** require login credentials, issue the following commands to add the proxy URL to the NPM config file:

        ```
        npm config set https-proxy http://proxy.[proxy_name].com:[port_number]
        ```

        ```
        npm config set proxy http://proxy.[proxy_name].com:[port_number]
        ```

        *where* [proxy_name] is the IP or hostname and [port_number] is the port number of the proxy server.

    * If your proxy server **does** require login credentials, issue the following commands to add the proxy URL, with login credentials, to the NPM config file:

        ```
        npm config set https-proxy http://[username]:[password]@proxy.[proxy_name].com:[port_number]
        ```

        ```
        npm config set proxy http://[username]:[password]@proxy.[proxy_name].com:[port_number]
        ```

        *where* [username] and [password] are the required login credentials, [proxy_name] is the IP or hostname, and [port_number] is the port number of the proxy server.

2. Ensure that you meet the [Software Requirements for CLI](cli-swreqplugins.md).

3. To install Zowe CLI, issue the following command. On Linux, you might need to prepend sudo to your npm commands:

    ```
    npm install @zowe/cli@zowe-v1-lts -g
    ```

4. Install the Secure Credential Store, which lets you store your username, password, and other sensitive information in the credential vault on your computer instead of plaintext. Issue the following command:

   ```
   zowe plugins install @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts
   ```
​
5. **(Optional)** To install open-source Zowe plug-ins, issue the following command:

    ```
    zowe plugins install @zowe/cics-for-zowe-cli@zowe-v1-lts @zowe/ims-for-zowe-cli@zowe-v1-lts @zowe/mq-for-zowe-cli@zowe-v1-lts @zowe/zos-ftp-for-zowe-cli@zowe-v1-lts @zowe/db2-for-zowe-cli@zowe-v1-lts
    ```

Zowe CLI is installed.

6. **(Optional)** Verify that a Zowe plug-in is operating correctly. 

    ```
    zowe plugins validate [my-plugin]
    ```

    where [my-plugin] is the syntax for the plugin such as @zowe/cics@zowe-v1-lts
​
7. **(Optional)** Test the connection to z/OSMF. See [Testing Connection to z/OSMF](cli-usingcli.md#testing-connection-to-z-osmf) 

8. **(Optional)** Access the Zowe CLI Help (`zowe --help`) or the Zowe CLI Web Help for a complete reference of Zowe CLI.
​
After you install the CLI, you can connect to the mainframe directly issuing a command, by creating user profiles and making use of them on commands, or by using environment variables. For more information, see [Using CLI](cli-usingcli.md).
