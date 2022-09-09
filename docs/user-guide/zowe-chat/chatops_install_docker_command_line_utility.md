# Customizing the Container Command Line Utility

You can use the Zowe Chat Container Command Line Utility `bnzContainer.sh` to manage and control the Zowe Chat containers.

The Zowe Chat Container Command Line Utility bnzContainer.sh is preconfigured and can be used in most cases. For special scenarios, you can optionally uncomment or change the values of the variables in file bnzContainer.conf to customize the bnzContainer.sh script.

If file bnzContainer.conf exists and is located in the same directory as the bnzContainer.sh script, the Container Command Line Utility will read it and override its default configuration with the configuration provided by the config file.

1.  Open the config file bnzContainer.conf.

2.  Edit the values of the options as needed.

    -   **CONTAINER\_MANAGEMENT\_CMD**

        The container management command \(support podman and docker\) executable to use. A path can be included.

        Change the value if the $\{CONTAINER\_MANAGEMENT\_CMD\} command is not in your environment variable $PATH, or if you want to use another $\{CONTAINER\_MANAGEMENT\_CMD\} executable than the default one in your environment.

    -   **CONTAINER\_NETWORK**

        The network to which the Zowe Chat container is connected.

        The value of this option is provided as **--network** option to the **$\{CONTAINER\_MANAGEMENT\_CMD\} create** command. For more details, see the official Docker documentation at [https://docs.docker.com/network/](https://docs.docker.com/network/).

        **Note:** If you change this value, you must issue command **bnzContainer.sh reconfigure** to make the changes take effect.

    -   **CONTAINER\_NETWORK\_CONFIG**

        Additional configuration \(parameters\) related to the network type.

        It's required when you specify Zowe Chat Microservice and Chatbot port mapping. For more details, see the official Docker documentation at [https://docs.docker.com/network/](https://www.ibm.com/links?url=https://docs.docker.com/network/).

    -   **CONTAINER\_VOLUMES**

        Volumes that are used for the Zowe Chat container.

        The value\(s\) of this option is provided as is to the **$\{CONTAINER\_MANAGEMENT\_CMD\} create** command. For more details see the official Docker documentation at [https://docs.docker.com/storage/volumes/](https://www.ibm.com/links?url=https%253A%252F%252Fdocs.docker.com%252Fstorage%252Fvolumes%252F).

        **Note:** The zchatops-configuration-112 will be created by default. This volume will bind /opt/ibm/zchatops/config directory by default.

    -   **EXPORT\_CONFIG\_TMP\_DIR**

        The temporary folder where data is stored during the export of the container's configuration. It will be cleared as a final step of the export configuration task.

        **Important:** It might contain user IDs and \(encrypted\) passwords, which are part of the configuration of a container.

    -   **EXPORT\_CONFIG\_TARGET\_FILE**

        The file where exported configuration data is stored, if not specified with the **-f** option.

        **Important:** It might contain user IDs and \(encrypted\) passwords, which are part of the configuration of an Zowe Chat container.

    -   **COLLECT\_LOGS\_TMP\_DIR**

        The temporary folder where data is stored during the export of the container's logs. It will be cleared as a final step of the export configuration task.

    -   **COLLECT\_LOGS\_TARGET\_FILE**

        The file where exported logs are stored, if not specified with the **-f** option.

3.  Save the changes and exit the file.


If you already have one container running, run **bnzContainer.sh reconfigure** to make the configuration effective.

**Parent topic:**[Installing Zowe Chat with Container image](chatops_install_docker_package.md)

