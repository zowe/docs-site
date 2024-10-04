# Sharing team configuration

As a team leader, or DevOps advocate, you might want to share a team configuration globally in the following scenarios:

- You want to share profiles with application developers so that they can work with a defined set of mainframe services. The recipient of the file places it in their local `~/.zowe` folder manually before issuing CLI commands.
- You want to add the profiles to your project directory in a software change management (SCM) tool, such as GitHub. When you store the profiles in an SCM tool, application developers can pull the project to their local computer and use the defined configuration. Zowe CLI commands that you issue from within the project directory use the configuration scheme for the project automatically.
- You want to enable test automation in a CI/CD pipeline, which lets your pipelines make use of the project configuration.

Team leaders can share team configuration files using several methods:
- Shared network drive
- Project repository (for example, GitHub)
- Web server

## Network drive

To use a network drive to share a team configuration file:

1. Store the configuration files on a shared network drive.

2. Open a command line prompt and issue the following command:

    ```
    zowe config import <DriveLetter>:\<FolderPath>\zowe.config.json
    ```
    - `<DriveLetter>`

        Specifies the drive letter of the shared network drive

    - `<FolderPath>`

        Specifies the directory path on the drive

    :::note
    
    You can specify any path that file management applications, such as Windows Explorer and Finder, can access. For example, a UNC network path (`\\<HostName>\SharedZoweConfig\zowe.config.json`) or local file path (`C:\Users\<UserName>\Downloads\zowe.config.json`).

    :::

## Project repository and web server

To import the team configuration file from a GitHub repository and a web server:

1. Store the configuration files in a project repository or on a web server.

2. Issue the following command:

    - **Project repository** (such as GitHub)

        ```
        zowe config import https://<user>:<password>@<githubUrl>/raw/<repoName>/<branch>/<folderPath>/zowe.config.json
        ```

        - `<user>`

            Specifies the user ID

        - `<password>`

            Specifies the password for the user ID

        - `<githubUrl>`

            Specifies the URL to the GitHub repository

        - `<repoName>`

            Specifies the name of the repository

        - `<branch>`

            Specifies the name of the branch that contains the configuration file

        - `<folderPath>`

            Specifies the path to the configuration file

    - **Web server**

        ```
        zowe config import https://<user>:<password>@<HostName>/<folderPath>/zowe.config.json
        ```

        :::note
        
        You can host team configuration files on **private** and **public** web servers. The user name and password are required for only private URLs. However, to maintain the highest level of security, you should **not** store team configuration files on public URLs.

        :::

        - `<user>`
 
            Specifies the user ID
        - `<password>`

            Specifies the password for the user ID
        - `<hostname>`

            Specifies the host name of the system
        - `<folderPath>`

            Specifies the path to the team configuration file



        :::tip

        To import the schema automatically from shared drives and from web servers, store the schema in the same directory as the `zowe.config.json` file. In the configuration file, reference the schema as a relative path at the top of the configuration file.

        **Example:**

        ```
        json
        {
            "$schema": "./zowe.schema.json",
            ...
        }

        :::
