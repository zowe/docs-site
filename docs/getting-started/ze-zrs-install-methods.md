# Sharing an installation of ZRS

:::info Required roles: system administrator, system programmer
:::

If you are a system administrator managing a team using ZRS, deploy a shared installation of ZRS to save disk space and manage user permissions.

## Deploying a shared installation

1. Open the [ZRS release list](https://github.com/zowe/zowex/releases) and navigate to the desired release.
2. Expand the **Assets** section and select the `zowe-server` PAX file to download it.
3. Upload the PAX file to the mainframe using your preferred method.

    For example, to upload with SSH, open a terminal on your local machine and issue:
    ```
    scp your/local/path/zowe-server-X.Y.Z.pax.Z userid@mainframe.com:/u/userid/
    ```

    - `your/local/path/zowe-server-X.Y.Z.pax.Z`

        Specifies the local file you are uploading. 

    - `userid@mainframe.com:/u/userid/`

        Specifies the mainframe userid and hostname, and destination directory.
    
        :::info important
        Use the trailing slash to indicate that this is a directory, not a file you are creating. 
        :::

4. Extract the PAX file. Create or navigate to the directory (for example, `/your/remote/path`) on the mainframe where you want to extract the file, then issue the command. 

    To extract the PAX file:

    ```
    pax -rzf /u/userid/zowe-server-X.Y.Z.pax.Z
    ```

5. Validate the installation. Run the command `./zowex --version` to check that `zowex` can be run. 

    The ZRS version is returned when `zowex` has been installed successfully.

    Next, set up your team's access to the shared installation.

:::note

To update `zowex`, repeat the steps in [Deploying a shared installation](#deploying-a-shared-installation).

:::

## Setting up team access to a shared installation

If you are a system administrator maintaining a shared installation of ZRS, each user on your team must add `zowex` to their `$PATH` following the steps in [Adding ZRS to your $PATH](../getting-started/ze-configuring-zowe-remote-ssh.md#adding-zrs-to-your-path). Also ensure that the users have execute permission on the `zowex` binary.

If you do not want the users to be able to update `zowex` with a new version, set the file permissions on the directory so that the user does not have write access to the directory.

To set file permissions on the directory:
```
chmod go-w /your/remote/path
``` 

- `/your/remote/path`

    Specifies the directory that contains the `zowex` binary.

This command removes write permissions for all other users so that only a system administrator has permission to update the shared installation.
