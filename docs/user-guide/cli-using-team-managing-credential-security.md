# Managing credential security

## Secure credential storage

With the introduction of team profiles in Zowe CLI V2, the **Secure Credential Store (SCS) Plug-in** is deprecated. The `zowe scs` command group is obsolete.

Secure credential encryption is now included with the Zowe CLI core application. When a command using a profile with missing `user` and `password` information is issued, Zowe CLI V2 prompts you to enter the username and password by default. To save secure properties and values in the Secure Credential Store, use the `zowe config` command group.

## Configuring secure properties

Create a configuration file and set its secure properties (such as usernames and passwords):

1. Open the Zowe CLI command prompt.

2. To initialize a **project team** configuration file in the current working directory:

    ```
    zowe config init
    ```
    To initialize a **project user** configuration file in the current working directory:
    ```
    zowe config init --user-config
    ```
    To initialize a **global team** configuration file in the `ZOWE_CLI_HOME` directory:
    ```
    zowe config init --global-config
    ```
    To initialize a **global user** configuration file in the `ZOWE_CLI_HOME` directory:

    ```
    zowe config init --global-config --user-config
    ```
    A configuration file is created, if one does not already exist.
    
    Additionally, the `profiles.base.properties.user` and `profiles.base.properties.password` fields are added to the base profile `secure` array for that configuration file. This stores the username and password in the Secure Credential Store.

3. If needed, add other fields to the secure array.
    - Use a text editor or an IDE (such as Visual Studio Code) to edit the configuration file.
    - Issue the `zowe config set --secure <property-path>` command to secure a specific property in a specific profile.
        
        For example, `zowe config set profiles.base.properties.password pw123 --secure` adds the `password` property to the base profile's `secure` array and saves the password `pw123` in the Secure Credential Store.

        If you issue the command for a property that is already secured, the CLI prompts you to enter a new property value.

    The values for these properties are saved in the Secure Credential Store.

## Updating secure properties

Update secure credentials in an existing config profile:

1. Open the Zowe CLI command prompt.

2. To update values for secure fields in a **project team** configuration file:
    ```
    zowe config secure
    ```
    To update values for secure fields in a **project user** configuration file:
    ```
    zowe config secure --user-config
    ```
    To update values for secure fields in a **global team** configuration file:
    ```
    zowe config secure --global-config
    ```
    To update values for secure fields in a **global user** configuration file:
    ```
    zowe config secure --global-config --user-config
    ```
    Prompts request new values for all secure fields defined in the configuration file. In most cases, these properties include a username or password, but some users may include other fields, such as a token value or connection properties.

3. Respond to prompts as needed. Press `Enter` to leave the value unchanged.

    New values are saved in the Secure Credential Store. After the last secure value is submitted, the user returns to the system command prompt.

## Setting secure properties programmatically

When configuring secure properties with scripts or workflow pipelines, use the `zowe config set` command. See Step 3 in [Configuring secure properties](#configuring-secure-properties) for instructions on how to use the command.
