# Configuring your PC to install from an online registry by proxy

You can install Zowe CLI and Zowe CLI plug-ins from an online registry using a proxy server on Windows, macOS, or Linux operating systems.

:::info Required role: systems administrator
:::

If your site functions behind a proxy server and blocks access to public registries, complete the following steps before you install Zowe CLI core and Zowe CLI plug-ins from your desired online registry.

1. Contact your site administrator and obtain the IP address and port number to your proxy server.

2. Configure your NPM configuration file using one of the following methods:

    - If your proxy server **does not require** login credentials:

        Issue one of the following commands to add to the URL for the proxy server to your NPM configuration file.

        For `HTTPS` protocol:

        ```
        npm config set https-proxy http://proxy.[proxy_name].com:[port_number]
        ```
        
        For `HTTP` protocol:

        ```
        npm config set proxy http://proxy.[proxy_name].com:[port_number]
        ```

        - `https-proxy`

            Specifies to communicate with the proxy server using https communication.

        - `proxy`

            Specifies to communicate with the proxy server using http communication.

        - `[proxy_name]`

            Specifies the IP address or the host name of the proxy server.

        - `[port_number]`

            Specifies the port number of the proxy server.

    - If your proxy server **requires** login credentials:

        Issue one of the following commands to add the URL for the proxy server and your login credentials to your NPM configuration file.

        For `HTTPS` protocol:

        ```
        npm config set https-proxy https://[username]:[password]@proxy.[proxy_name].com:[port_number]
        ```

        For `HTTP` protocol:
        ```
        npm config set proxy http://[username]:[password]@proxy.[proxy_name].com:[port_number]
        ```

        - `https-proxy`

            Specifies to communicate with the proxy server using https communication.

        - `proxy`

            Specifies to communicate with the proxy server using http communication.

        - `[username]`

            Specifies the user name to log in to the proxy server.

        - `[password]`

            Specifies the password to log in to the proxy server.

        - `[proxy_name]`

            Specifies the IP address or the host name of the proxy server.

        - `[port_number]`

            Specifies the port number of the proxy server.

3. Install Zowe CLI and Zowe CLI plug-ins from an NPM public online registry.
