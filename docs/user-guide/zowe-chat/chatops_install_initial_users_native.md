# Creating initial users for Zowe Chat Microservice

After you install Zowe Chat, you must create initial users so that you can log in Zowe Chat Microservice.

Make sure that your MongoDB server is running. If you use Docker installation, also make sure that your Docker container is running.

1.  **Attention:** If you installed Zowe Chat with Docker image, you must go to the directory where you extract the Zowe Chat Docker archive before you perform the following steps. Run command `./bnzDocker.sh shell` to open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

2.  Go to the Zowe Chat home directory.

    ```
    cd $ZCHATOPS\_HOME
    ```

3.  Run the following command to configure the MongoDB server and create initial users for Zowe Chat Microservice according to whether the TLS/SSL is enabled for your MongoDB server.

    TLS/SSL disabled:

    ```
    ./microservice/install/config.sh microservice mongodb -h MongoDB\_server\_hostname -p MongoDB\_server\_port -u authentication\_username -w user\_password
    ```

    TLS/SSL enabled:

    ```
    ./microservice/install/config.sh microservice mongodb -h MongoDB\_server\_hostname -p MongoDB\_server\_port -u authentication\_username -w user\_password -s MongoDB\_certificate\_authority\_file\_absolute\_path -c client\_certificate\_absolute\_path -e
    ```

    **Note:**

    -   \(For docker installation only\) Make sure that the file path is the path in the container. You can user `DOCKER_VOLUMES` in the bnzDocker.conf to mount the host directory to the container, or you can also use the `docker cp` command to manually copy the certificate files into the container.
    -   If the client TLS/SSL is also enabled for your MongoDB server, you must provide the client certificate file or the client private key file by using the **-c** option. Otherwise, you can ignore it.
    Several initial users are created for you: `admin`, `izoa`, `zsa`, `omegamon`, and `bnzbot`. Default passwords are all `bnz4you!`. You can find the samples at .microservice/sample/user/user.json. The sample users have the following parameters.

    -   **name**

        The user account name.

    -   **password**

        The user account password.

    -   **tokenValidTimePeriod**

        Valid time period in second after token is created. The default value is 300 seconds. If 0 \(zero\) is specified, the token will not expire.

    -   **status**

        The user account status. Valid values are `OPEN`, `EXPIRED`, and `LOCKED`.

    -   **role**

        The user account role. Valid values are `ADMIN`, `USER`, and `INTEGRATOR`.

4.  Stop and start your Zowe Chat Microservice to make your changes effective. See [Starting and stopping Zowe Chat](chatops_install_start_stop_service.md) for specific steps.


