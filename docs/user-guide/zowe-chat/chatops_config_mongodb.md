# Connecting Zowe Chat Microservice to MongoDB server

Connect your Zowe Chat Microservice to a MongoDB server to persist and retrieve incidents and user account data.

Make sure that you have created initial users. See [Creating initial users for Zowe Chat Microservice](chatops_install_initial_users_native.md) if you haven't.

You can ignore this topic if you have run the command `ZCHATOP\_HOME/microservice/install/config.sh microservice mongodb` when you created initial users for Zowe Chat. The MongoDB configuration has been updated per your environment by then. Only modify the file mongodb-server.yaml when there are changes in your MongoDB server.

1.  **Attention:** If you installed Zowe Chat with Docker image, you must go to the directory where you extract the Zowe Chat Docker archive before you perform the following steps. Run command `./bnzDocker.sh shell` to open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

2.  Configure mongodb-server.yaml.

    1.  Go to the Zowe Chat home directory.

        ```
        cd $ZCHATOPS\_HOME
        ```

    2.  Go to the ZCHATOPS\_HOME/microservice/config folder of your Zowe Chat Microservice server.
    3.  Open the MongoDB server configuration file at mongodb-server.yaml.
    4.  Edit the configuration file by replacing Your host name, Your port number, Your database user name, and Your database password with the real values of your MongoDB server. .

        ```
        # Licensed material - Property of IBM
        # © Copyright IBM Corporation 2020.
        # This file controls all configurations of the MongoDB used by Zowe Chat microservice server
        # Specify the host name or IP address of your MongoDB server.
        host: Your host name
        # Specify the port number of your MongoDB server.
        # The default value is 27017.
        port: 27017
        # Specify your MongoDB atabase name used by Zowe Chat microservice server
        # The default value is chatops.
        # Note: The database will be created if it doesn't exsit.
        name: zchatops
        # Specify the user name used to access your MongoDB server in the authentication database
        userName: Your database user name
        # Specify the password of the user
        # The password will be ecrypted automatically by Zowe Chat microservice server with <AES> prefix added.
        userPassword: Your database user password
        # Specify whether TLS is enabled or not. The value can be true or false.
        # The default value is false.
        tls: false
        # Specify the absolute path of your certificate authority file of MongoDB server if TSL is enabled
        tlsServerCertificate: The absolute file path of your certificate authority file of MongoDB server
        # Specify the absolute path of your client certificate file or the client private key file. The files should be concatenated if they both are needed. Leave it empty if you doesn't enable client certificate validation on the MongoDB server.
        tlsClientCertificate: The absolute file path of your client certificate file of MonoDB server>
        # Specify TCP connection timeout value in milisecond.
        # The default value is 5000.
        connectTimeoutMS: 5000
        # Specify TCP socket timeout value in milisecond.
        # The default value is 5000
        socketTimeoutMS: 5000
        ```

        -   **Your host name**

            The hostname of the server where MongoDB is installed.

        -   **Your port number**

            The port number of the MongoDB server. **27017** is the default number.

        -   **Your database user name**

            The user name of your MongoDB.

        -   **Your database password**

            The password of the database user.

        -   **Your absolute certificate authority file path of MongoDB server**

            The absolute certificate authority file path of your MongoDB server.

        -   **Your absolute certificate file path of the client**

            The absolute certificate file path of the client for the validation on the MongoDB server.

    **Note:** You must replace Your absolute certificate authority file path of MongoDB server with the real value if you enabled TLS/SSL on your MongoDB server. If client certificate verification is also enabled, you also must replace Your absolute certificate file path of the client with the real value.

3.  Stop and start your Zowe Chat Microservice to make your changes effective. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


