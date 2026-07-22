# Configuring and deploying Zowe Remote SSH

Use Zowe Remote SSH in Zowe Explorer to perform z/OS mainframe operations with minimal server-side configuration.

## System requirements

- 16 MB of free space for deploying ZRS on z/OS Unix
- z/OS OpenSSH set up and configured for the user
- At minimum, user permissions for read, write, and execute (`700`) for deployment directory

## Adding ZRS to your `$PATH`

When you use an `ssh` profile with Zowe Explorer, the ZRS `zowex` binary is automatically deployed to the user's USS filesystem. On large-scale multi-user systems, this could result in hundreds of users consuming redundant storage space, creating a potential storage denial of service risk.

Before attempting to deploy the binary, the system checks if `zowex` already exists in the user's `$PATH` and is executable by the user. If a compatible version is found in the `$PATH`, the existing binary is used and no additional storage is used.

To add the `zowex` binary to your `$PATH`:

1. Use a text editor to open your `.profile` file in your home directory on USS.

2. Add a line to your `.profile` as in the following example:

    ```
    export PATH="/user/shared/zrs:$PATH"
    ```

    - `/user/shared/zrs` 
    
        Specifies the directory where the `zowex` binary was deployed.
3.  To validate the configuration, restart your shell environment by logging in to the mainframe over SSH again and issue the command `zowex -v`.

    The ZRS version is returned when the `$PATH` has been configured successfully.
    
    The `zowex` binary is now set in your `$PATH`. You can now execute the `zowex` command without specifying the full `/user/shared/zrs/zowex` location, which is now stored in the `zowe.zowex.serverInstallPath` key in the VS Code `settings.json` file. 

### Shared instances of ZRS

If you are a systems administrator maintaining a shared instance of ZRS, each user on your team must add `zowex` to their `$PATH` following the steps in [Adding ZRS to your `$PATH`](#adding-zrs-to-your-path). Also ensure that the users have execute permission on the `zowex` binary.

If you do not want the users to be able to update `zowex` with a new version, set the file permissions on the directory so that the user does not have write access to the directory.
    

### Alternatives to adding ZRS to your `$PATH`

It is not required to add ZRS to your `$PATH`. If you do not have concerns about redundant use of storage, allow the binary to be deployed to the default location, or set a different location in your Visual Studio Code configuration.

#### Using the Settings editor

Add a custom server path with the VS Code Settings editor:

1. Open your VS Code settings.
2. Navigate to **Extensions > Zowe Explorer**.
3. In **Server Install Path**, click **Add Item**.
4. In the **Item** column, enter the host name of the mainframe for the SSH profile. In the **Value** column, enter the path to use for ZRS.
5. To validate the configuration, use Zowe Explorer to connect to the mainframe using the SSH profile with the host added in Step 4. 
6. In the **USS** tree view, use the same SSH profile to navigate to the location specified in Step 4 to confirm that it contains the `zowex` binary.

    The `zowex` binary is now set in your VS Code settings and the custom server path is used to deploy ZRS when you connect to that host.

#### Editing the JSON file

Add a custom server path using the `Open user preferences (JSON)` command:

1. In the **Command Palette**, search for the `Open User Settings (JSON)` command.
2. Use the Editor to enter your custom server path, as in the following example:
    ```
    "zowe.zowex.serverInstallPath": {
        "hostexample1": "~/custom_zowex",
        "hostexample2": "/u/users/chris/customserverpath",
    },
    ```
3. To validate the configuration, use Zowe Explorer to connect to the mainframe using the SSH profile with the host added in Step 2. 
4. In the USS tree view, use the same SSH profile to navigate to the location specified in Step 2 to confirm that it contains the zowex binary.

:::note
If you have the `serverPath` property set in your [Zowe client configuration](../appendix/zowe-glossary.md#team-configuration) and a server path is also set in your VS Code configuration, the VS Code configuration takes precedence when using ZRS functionality.
:::

## Configuration methods

Create an SSH Zowe profile in your Zowe [client configuration](../appendix/zowe-glossary.md#team-configuration) to connect to z/OS and deploy to the z/OS system.

### Connecting with an SSH command

Create an SSH profile faster by using an SSH command to authenticate and deploy to the server. The user included in the command is used to search the local SSH configuration file for host directives that match the host in the command. 

When there is a match, Zowe Remote SSH attempts public-private key authentication in three ways, in the following order:

1. Using the IdentityFile (private key path) option in the command, if provided.
2. Locating the first IdentityFile that follows naming conventions of common encryption algorithms. File names are searched in the order `id_ed25519`, `id_rsa`, `id_ecdsa`, and `id_dsa`.
3. Locating the IdentityFile from the SSH config entry that matches the submitted hostname.

If an IdentityFile is found and fails to authenticate, or no IdentityFile is found, you are prompted for basic credentials.

To use an SSH command to connect and deploy to the server:

1. In the **Command Palette**, search for **Zowe-Explorer: Connect to Host...**.

2. Enter an SSH connection command in the **Quick Pick**:

    ```
    ssh <user@example.net>
    ```
    - \<user@example.net>
    
        Specifies the user ID and hostname.

     Include an IdentityFile and/or port by including flags:

    ```
    ssh <user@example.net> -i "/Users/local/.ssh/id_rsa" -p 443
    ```
    - `-i`

        Specifies the IdentityFile to use for authentication. 
    - `-p`

        Specifies the port number for the SSH connection. 

3. Answer any prompts in the **Quick Pick** to provide any additional credentials required for authentication.

 A new SSH profile is added to the corresponding Zowe client configuration file in your system and the Zowe Remote SSH binary is uploaded to your mainframe host to be used with this new profile.

 You can now interact with this SSH profile in its Zowe Explorer tree view (**Data Sets**, **USS**, or **Jobs**) to start using ZRS.

### Connecting with an existing SSH configuration file

Use an existing SSH configuration file to create a new `ssh` profile in your client configuration. 

To create a new SSH profile in your client configuration:

1. In the **Command Palette**, search for **Zowe Explorer: Connect to zowex server on host...**.

    If you have not yet configured a server path, you are prompted for a path to deploy the server. The path saved in the `zowe.zowex.serverInstallPath` key in the VS Code `settings.json` file.
2. Select a profile listed **below** the **Migrate From SSH Config** separator in the drop-down.
3. Answer prompts in the **Quick Pick** to provide any additional credentials required for authentication.

    The user's existing SSH host directive in their SSH configuration file remains unchanged. A new SSH profile is added to the corresponding Zowe client configuration file in your system and the Zowe Remote SSH binary is uploaded to your mainframe host to be used with this new profile.

    You can now interact with this SSH profile in its Zowe Explorer tree view (**Data Sets**, **USS**, or **Jobs**) to start using ZRS.

### Connecting with an existing client configuration profile

Use an existing SSH profile from a Zowe client configuration file to deploy Zowe Remote SSH:

1. In the **Command Palette**, search for **Zowe Explorer: Connect to zowex server on host...**.
        
    If you have not yet configured a server path, you are prompted for a path to deploy the server. The path saved in the `zowe.zowex.serverInstallPath` key in the VS Code `settings.json` file.
2. Select a profile listed **above** the **Migrate From SSH Config** separator in the drop-down.
3. Answer prompts in the **Quick Pick** to provide any additional credentials required for authentication.

    The Zowe Remote SSH binary is uploaded to your mainframe host to be used with this new profile. 

    You can now interact with this SSH profile in its Zowe Explorer tree view (**Data Sets**, **USS**, or **Jobs**) to start using ZRS.
