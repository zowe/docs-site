# Configuring SMU data provider for Zowe Chat

You must configure the IBM® Service Management Unite \(SMU\) data provider for Zowe Chat to get the monitor data on z/OS®.

Connect your Zowe Chat to IBM Service Management Unite \(SMU\) by using SSL certificate.

1.  Download SSL certificate of SMU server.

    1.  From one supported browser, access SMU web console via `https://your\_smu\_server\_host\_name:your\_smu\_server\_port/ibm/console`.
        -   your\_smu\_server\_host\_name is the host name of the server where SMU is installed.
        -   your\_smu\_server\_port is the console port of SMU server. The default value is **16311**.
    2.  If you get a security message about an insecure connection, add exception for the certificate. Take Firefox Version 60.2.1 as an example:
        1.  Click **Advanced** and then click **Add Exception...**.
        2.  In the task menu, select **Options** \> **Privacy & Security**.
        3.  Click **View Certificates...** to open the **Certificate Manager**.

            ![Certificate manager](bnz_certificate_manager.png "Certificate manager")

        4.  In the certificate list, select the certificate of your SMU server.

            ![Certificate list](bnz_certificate_list.png "Certificate list")

        5.  Click **Export...** to save the certificate as X.509 certificate, for example, save it as **smu.crt**.
    3.  Upload the exported certificate to your Zowe Chat Server. You can place it in any directory that your Zowe Chat server can access.
        -   For Container users, you need to upload the certificate to your Zowe Chat container with your container management tool, for example, docker.

            i. Get your container ID.

            ```
            docker container ls --all -q --filter name="zchatops"
            ```

            ii. Upload your certificate to one existing path in the container, for example, /opt/ibm/zchatops/config/.

            ```
            docker cp certificate\_file\_path chatops\_container\_id:/opt/ibm/zchatops/config/
            ```

            **Note:** The file path should contain the file name.

2.  Configure smu-server.yaml.

    1.  Go to the Zowe Chat configuration directory.
        -   For Container users:

            i. Go to the directory where you extract the Zowe Chat Container archive.

            ii. Run the following command to open an interactive shell on the Zowe Chat container that is running.

            ```
            ./bnzContainer.sh shell
            ```

            iii. Go to the configuration directory.

            ```
            cd config
            ```

            **Tip:** If you are familiar with docker/podman commands, you can use commands to open the interactive bash shell. You can also edit the configuration files directly in the mounted path of the zchatops-configuration-112 volume.

        -   For native installation users:

            ```
            cd $ZCHATOPS\_HOME/config
            ```

    2.  Edit the SMU server configuration file smu-server.yaml by replacing Your host name, Your port number, Your absolute certificate file path of SMU server, Your functional user, and Your password with the actual values of your SMU server. If you want to access your SMU CURI REST API sever to operate resources such as start/stop resource or issue command, you must also specifying your administrator user name and password.

        ```
        # Licensed material - Property of IBM
        # © Copyright IBM Corporation 2022.
        # This file controls all configurations of the CURI REST service provided by IBM Service Management Unite (SMU) server
        
        # Specify the protocol of your SMU server. The value can be https or http.
        # The default value is https.
        protocol: https
        
        # Specify the host name or IP address of your SMU server.
        hostName: Your host name
        
        # Specify the port number of your SMU server.
        # The default value is 16311.
        port: 16311
        
        # Specify the base path of your SMU CURI REST API server.
        # The default value is /ibm/tivoli/rest.
        basePath: /ibm/tivoli/rest
        
        # Specify the absolute file path of the TLS certificate (PEM) of your SMU server if HTTPS protocol is specified.
        certificateFilePath:  Your absolute certificate file path of the SMU server
        
        # Configure the connection timeout value of your SMU CURI REST API server in millisecond
        timeout:
          response: 5000    # Set the maximum time to wait for the first byte to arrive from remote server
          deadline: 60000   # Set the maximum time till all content is retrieved from remote on slow but reliable networks
        
        # Specify the functional user used to access your SMU CURI REST API server to query data
        # The value usually is eezdmn.
        userName: your user name
        
        # Specify the password of the functional user.
        # The password will be encrypted automatically by Zowe Chat server with <AES> prefix added.
        userPassword: your password
        
        # Specify the administrator used to access your SMU CURI REST API server to operate resources such as start/stop resource or issue command.
        # The value usually is eezadmin.
        adminUserName: Your administrator user name
        
        # Specify the password of the administrator.
        # The password will be encrypted automatically by Zowe Chat server with <AES> prefix added.
        adminUserPassword: Your administrator user password
        ```

        -   **Your host name**

            The host name of the server where SMU is installed.

        -   **Your port number**

            The port number of the CURI rest service provided by SMU. **16311** is the default number.

        -   **Your absolute certificate file path of SMU server**

            The absolute file path to the SMU server certificate that you have uploaded.

        -   **Your user name**

            The functional user name of your SMU server. **eezdmn** is the default name.

        -   **Your password**

            The password of the functional user of SMU server.

        -   **Your administrator user name**

            The administrator used to access your SMU CURI REST API server to operate resources such as start/stop resource or issue command. **eezadmin**is the default name.

        -   **Your administrator user password**

            The password of the administrator.

3.  Stop and start your Zowe Chat for the configuration to take effect. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


