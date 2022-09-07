# Configuring Zowe Chat Microservice server

Run a command to configure your Zowe Chat Microservice server.

Zowe Chat Microservice service supports only HTTPS protocol. You must have one private SSL key and one signed SSL certificate before you can start it. If you have your own certificate and key, you can use them directly. Otherwise, you can create one self-signed certificate using the following configuration script provided by Zowe Chat.

1.  **Attention:** If you installed Zowe Chat with Docker image, you must go to the directory where you extract the Zowe Chat Docker archive before you perform the following steps. Run command `./bnzDocker.sh shell` to open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

2.  Go to the Zowe Chat home directory.

    ```
    cd $ZCHATOPS\_HOME/microservice/install/
    ```

3.  Run the following command to configure your Zowe Chat Microservice server.

    Using your own SSL certificate and private key:

    ```
    ./config.sh microservice server -h Your\_server\_host -p 4001 -c Your\_certficate\_file\_path -k Your\_key\_file\_path
    ```

    Using the self-signed certificate and private key created by Zowe Chat:

    ```
    ./config.sh microservice server -h Your\_server\_host -p 4001
    ```

    Where,

    -   -h: \(Required\) Specify the host name of Zowe Chat Microservice server.
    -   -p: Specify the port number of Zowe Chat Microservice server. Default is 4001.
    -   -c: Specify the SSL certificate file path for Zowe Chat Microservice. The certificate and key files will be generated automatically if no certificate or key file is specified.
    -   -k: Specify the SSL key file path for Zowe Chat Microservice.
    **Tip:** You can change your Zowe Chat Microservice server configuration file ZCHATOPS\_HOME/micorservice/config/bnzsvc-server.yaml directly, or replace the certificate and private key file content in ZCHATOPS\_HOME/micorservice/config/ssl folder with your own ones.

    ```
    # This file controls all configurations of the microservice server for Zowe Chat
    
    # Specify the port number of your microservice server.
    # The default value is 4001.
    port: 4001
    
    # Specify the log level of your microservice server, the value can be error, warn, info, verbose, debug or silly.
    # The deafult value is info.
    logLevel: info
    
    ```

4.  Stop and start your Zowe Chat Microservice to make your changes effective. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


