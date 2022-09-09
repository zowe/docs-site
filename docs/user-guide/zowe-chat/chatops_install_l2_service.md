# Installing Zowe Chat Microservice Component

Install the Zowe Chat Microservice on the server where your Hubot is installed.

To install Microservice on a Linux server, you must have the following software available on that server:

-   Node.js environment
-   Node Package Manager \(npm\)

1.  Put the package file Bnz-Microservice-v110-beta-drop2.tar.gz in any directory on your server `BNZSRV`, for example, the home directory.

2.  On your server `BNZSRV`, change to that directory.

    ```
    % cd BNZSRV\_INSTROOT
    ```

3.  Run the following command to extract the file Bnz-Microservice-v110-beta-drop2.tar.gz to the directory BNZSRV\_INSTROOT/bnzmicroservice.

    ```
    % mkdir bnzmicroservice
    % tar -zxvf ./Bnz-Microservice-v110-beta-drop2.tar.gz -C BNZSRV\_INSTROOT/bnzmicroservice
    
    ```


Zowe Chat is installed successfully.

You can start the Zowe Chat Microservice server directly without the connection configuration of the SMU server. However, if you want the service to return data, you must first configure the SMU server connection. See [Configuring SMU data provider for Zowe Chat](chatops_config_connect_l2_smu.md) for specific steps.

