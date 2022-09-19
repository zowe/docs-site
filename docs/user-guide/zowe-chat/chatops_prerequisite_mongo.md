# Installing MongoDB

Zowe Chat requires one MongoDB server to store the incidents and the user account information. If you don’t have one, follow the procedures to set up one MongoDB server by using Docker. You can also choose native installation for MongoDB. For more information, see [online MongoDB manual](https://docs.mongodb.com/manual/installation/).

Before you install MongoDB on a Linux® server, make sure that Docker environment is set up and you can access the [Docker Hub - mongo](https://hub.docker.com/_/mongo) on the Linux server.

1.  Run the following command in one line to install the latest version MongoDB:

    For xLinux,

    ```
    % docker run --network host --name mongo -e MONGO_INITDB_ROOT_USERNAME=your\_mongodb\_username -e MONGO_INITDB_ROOT_PASSWORD=your\_mongodb\_password -d mongo:latest
    ```

    For zLinux,

    ```
    % docker run --network host --name mongo -e MONGO_INITDB_ROOT_USERNAME=your\_mongodb\_username -e MONGO_INITDB_ROOT_PASSWORD=your\_mongodb\_password -d s390x/mongo:latest
    ```

    This command will start one MongoDB server and create one user your\_mongodb\_username with the password your\_mongodb\_password in the admin authentication database of MongoDB with the role of root, which is also known as a "superuser" role.

    For more information, see [Docker Hub - mongo](https://hub.docker.com/_/mongo).

2.  Run the following command to verify that the MongoDB server is started.

    ```
    % docker ps
    ```

    When you see the name is **mongo** in the returned results, your MongoDB server is started.

    **Attention:** If you use native installation to install MongoDB, you need to enable access control manually by yourself. Refer to [Enable Access Control of the MongoDB Manual](https://docs.mongodb.com/manual/tutorial/enable-authentication/) for specific steps.


