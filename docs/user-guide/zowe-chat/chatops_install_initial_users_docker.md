# Creating initial users for Zowe Chat Microservice \(for installation with Docker image\)

After you install Zowe Chat with Docker image, you must create initial users so that you can log in Zowe Chat Microservice.

Make sure that your Zowe Chat Docker container and your MongoDB server are running.

1.  Go to the directory where you extract the Zowe Chat Docker archive.

2.  Open an interactive bash shell on the running Zowe Chat Docker container using Docker Command Line Utility.

    ```
    ./bnzDocker.sh shell
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

    1.  Make sure that the file path is the path in the container.
    2.  You can use `DOCKER_VOLUMES` in the bnzDocker.conf to mount the host directory to the container, or you can also use the **docker cp** command to manually copy the certificate files into the container.
    3.  If the client TLS/SSL is also enabled for your MongoDB server, you must provide the client certificate file or the client private key file by using the **-c** option, or else, you can ignore it.
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


Before you can use Zowe Chat Microservice, you must perform the following tasks:

-   [Configuring Zowe Chat Microservice server](chatops_config_l2_server.md)
-   [Configuring SMU data provider for Zowe Chat](chatops_config_connect_l2_smu.md)

