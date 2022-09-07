# Configuring ZWS data provider for Zowe Chat

You must configure the IBM Z Workload Scheduler \(ZWS\) data provider for Zowe Chat to get the monitor data on z/OS®.

Connect your Zowe Chat to IBM® Dynamic Workload Console by using SSL certificate.

1.  Download SSL certificate of Dynamic Workload Console server.

    1.  From one supported browser, access Dynamic Workload Console via `https://your\_dwc\_server\_host\_name:your\_dwc\_server\_port/console`.
        -   your\_dwc\_server\_host\_name is the host name of the server where Dynamic Workload Console is installed.
        -   your\_dwc\_server\_port is the console port of Dynamic Workload Console server.
    2.  If you get a security message about an insecure connection, add exception for the certificate. Take Firefox Version 60.2.1 as an example:
        1.  Click **Advanced** and then click **Add Exception...**.
        2.  In the task menu, select **Options** \> **Privacy & Security**.
        3.  Click **View Certificates...** to open the **Certificate Manager**.

            ![Certificate manager](bnz_certificate_manager.png "Certificate manager")

        4.  In the certificate list, select the certificate of your ZWS server.

            ![Certificate list](bnz_certificate_list.png "Certificate list")

        5.  Click **Export...** to save the certificate as X.509 certificate, for example, save it as **zws.crt**.
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

2.  Configure zws-server.yaml.

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

    2.  Edit the ZWS server configuration file zws-server.yaml by replacing Your host name, Your port number, Your absolute certificate file path of Dynamic Workload Console server, Your functional user, and Your password with the actual values of your Dynamic Workload Console server.

        ```
        
        # Licensed material - Property of IBM
        # © Copyright IBM Corporation 2022.
        # This file controls all configurations of the REST service provided by Dynamic Workload Console server
        
        # Specify the host name or IP address of your Dynamic Workload Console server.
        hostName: Your host name
        
        # Specify the port number of your Dynamic Workload Console server.
        port: Your port number
        
        # Specify the base path of your Dynamic Workload Console REST API server, e.g. /twsz/v1.
        basePath: Your base path
        
        # Specify the absolute file path of the TLS certificate (PEM) of your Dynamic Workload Console server if HTTPS protocol is specified.
        certificateFilePath: Your absolute certificate file path of the Dynamic Workload Console server
        
        # Configure the connection timeout value of your Dynamic Workload Console server in millisecond
        timeout:
          response: 5000    # Set the maximum time to wait for the first byte to arrive from remote server
          deadline: 60000   # Set the maximum time till all content is retrieved from remote on slow but reliable networks
        
        # Specify the user used to access your Dynamic Workload Console REST API server
        userName: Your user name
        
        # Specify the password of the user.
        # The password will be encrypted automatically by Zowe Chat server with <AES> prefix added.
        userPassword: Your password
        
        ```

        -   **Your host name**

            The host name of the server where Dynamic Workload Console server is installed.

        -   **Your port number**

            The port number of the rest service provided by Dynamic Workload Console server.

        -   **Your absolute certificate file path of Dynamic Workload Console server**

            The absolute file path to the Dynamic Workload Console server certificate that you have uploaded.

        -   **Your user name**

            The functional user name of your Dynamic Workload Console server.

        -   **Your password**

            The password of the functional user of Dynamic Workload Console server.

3.  Stop and start your Zowe Chat for the configuration to take effect. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


