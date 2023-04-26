# Sharing team configuration files

Team leaders can share team configuration files using several methods:
- Shared network drive
- Project repository (for example, GitHub)
- Web server

The following topics describe how to share the team configuration files.

## Network drive

1. Store the configuration files on a shared network drive.

2. Issue the following command:

    ```
    zowe config import <DriveLetter>:\<FolderPath>\zowe.config.json
    ```
    - DriveLetter:

        The drive letter of the shared network drive

    - FolderPath:

        The directory path on the drive

    **Note:** You can specify any path that file management applications, such as Windows Explorer and Finder, can access. For example, a UNC network path (`\\<HostName>\SharedZoweConfig\zowe.config.json`) or local file path (`C:\Users\<UserName>\Downloads\zowe.config.json`).


## Project repository and web server

Team leaders can import configuration files from a web URL that is in raw json format. The following steps describe how to import the configuration file from a GitHub repository and a web server.

1. Store the configuration files in a project repository or on a web server.

2. Issue the following command:

    - **Project (GitHub) repository**

        ```
        zowe config import https://<user>:<password>@<githubUrl>/raw/<repoName>/<branch>/<folderPath>/zowe.config.json
        ```

        - user

            Specifies the user ID

        - password

            Specifies the password for the user ID

        - githuburl

            Specifies the URL to the GitHub repository

        - repoName

            Specifies the name of the repository

        - branch

            Specifies the name of the branch that contains the configuration file

        - folderPath

            Specifies the path to the configuration file

    - **Web server**

        ```
        zowe config import https://<user>:<password>@<HostName>/<folderPath>/zowe.config.json
        ```

        - user
 
            Specifies the user ID
        - password

            Specifies the password for the user ID
        - hostname

            Specifies the host name of the system
        - folderPath

        
        Specifies the path to the team configuration file

        **Note:** You can host team configuration files on **private** and **public** web servers. The user name and password are required for **only private URLs**. However, to maintain the highest level of security, you **should not store** team configuration files on public URLs.

**Tip:** To import the schema automatically from shared drives and from web servers, store the schema in the same directory as the `zowe.config.json` file. In the configuration file, reference the schema as a relative path at the top of the configuration file.

**Example:**

```
json
{
    "$schema": "./zowe.schema.json",
    ...
}