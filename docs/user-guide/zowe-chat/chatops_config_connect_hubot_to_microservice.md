# Connecting Zowe Chat Chatbot to Zowe Chat Microservice

Connect Zowe Chat Chatbot to Zowe Chat Microservice by updating the configuration files.

1.  **Attention:** If you installed Zowe Chat with Docker image, you must go to the directory where you extract the Zowe Chat Docker archive before you perform the following steps. Run command `./bnzDocker.sh shell` to open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

2.  Go to the Zowe Chat home directory.

    ```
    cd $ZCHATOPS\_HOME
    ```

3.  Go to the ZCHATOPS\_HOME/chatbot folder of your Zowe Chat Chatbot server.

4.  Open the Chatbot server configuration file at config/bnzsvc-server.yaml.

5.  Edit the configuration file by replacing Your host name, Your port number, Your absolute certficate file path of the REST API server, Your functional user, and Your password with the real values of your Microservice server.

    ```
    # This file controls all configurations of the microservice provided by Zowe Chat microservice component
    
    # Specify the protocol of your microservice server. The value only can be https.
    protocol: https
    
    # Specify the host name or IP address of your microservice server.
    hostName: Your host name
    
    # Specify the port number of your microservice server.
    # The default value is 4001.
    port: Your port number
    
    # Specify the base path of your microservice.
    # The default value is /ibm/bnz/v1.
    basePath: /ibm/bnz/v1
    
    # Specify the absolute file path of the self-signed certificate (PEM) of your microservice server
    certificateFilePath: Your absolute certficate file path of the REST API server
    
    # Specify the functional user used to access your microservice server
    # The deafult value is bnzbot
    userName: Your functional user
    
    # Specify the password of the functional user.
    # The password will be ecrypted automatically by Zowe Chat chat bot server with <AES> prefix added.
    userPassword: your password
    
    ```

    -   **Your host name**

        The hostname or IP address of the server where you installed Zowe Chat Microservice.

    -   **Your port number**

        The port number of the Zowe Chat Microservice. **4001** is the default number.

    -   **Your absolute certficate file path of the REST API server**

        The absolute file path of the self-signed certificate \(PEM\) of your Zowe Chat Microservice server. You can find certificate in the folder ZCHATOPS\_HOME/microservice/config/ssl/bnzsvc-server.crt.

    -   **Your functional user**

        The functional user used to access your Microservice server. The default value is bnzbot.

    -   **Your functional user password**

        The password of the functional user.

6.  Stop and start your Chatbot server to make your changes effective. See [Starting and stopping Zowe Chat Chatbot](chatops_install_start_stop_Hubot.md) for specific steps.


