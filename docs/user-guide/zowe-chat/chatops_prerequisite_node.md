# Installing Node.js

This step is required for native installation only. To install Node.js, you must download the installation binary, unpack it to your installation folder, set the system environment variable and make it effective.

Node.js is a JavaScript™ runtime built on Chrome's V8 JavaScript engine. It can be installed with different methods. The following installation steps are just for your reference. You can also install it via your preferred package manager.

1.  Download Node.js installation binary from [https://nodejs.org/dist/](https://nodejs.org/dist/) according to your operation system, for example, node-v16.13.2-linux-s390x.tar.gz for Linux® on System z®.

2.  Unpack the binary to your installation folder, for example, `tar zxvf node-v16.13.2-linux-s390x.tar.gz -C /opt`.

3.  Set the system environment variable for Node.js.

    1.  Create one file nodejs.sh in /etc/profile.d with following content:

        ```
        export PATH=/opt/node-v16.13.2-linux-s390x/bin:$PATH
        ```

    2.  Restart your terminal or access session to make the environment variable effective.

4.  Verify the installation with the following commands:

    ```
    node -v
    npm -v
    
    ```


Your Node.js is successfully installed.

**Parent topic:**[Preparing prerequisite software](chatops_prerequisite_install_software.md)

