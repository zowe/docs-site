# Team configurations

Zowe CLI V2 introduces the concept of **team profiles**, which add *team* configurations to the *user* configurations already in use by Zowe CLI V1.

## Types of configuration files

Both team and user configurations can be applied either *globally* or *per project*, as described in the following definitions:

- A **team configuration file** stores *team profiles* and is used by a group of people who need the same properties to run commands.

    - The most frequently used configuration type due to its versatility and efficient maintenance.

- A **user configuration file** stores *user profiles* and is used for one person who needs their own unique properties to run commands.

    - The necessity for user configuration is rare, and setting up a user configuration should not be a priority unless there is a specific need for one.

- A **project configuration file** resides in a directory of your choice. It contains project *team profiles* and project *user profiles*.

    - Zowe CLI commands executed within that directory use the profiles from the project configuration. Similarly, when the directory is opened as a Visual Studio Code workspace, Zowe Explorer uses the project config for profiles.

- A **global configuration file** resides in the `ZOWE_CLI_HOME` directory (YourUserHomeDirectory/.zowe, by default). It contains global *team profiles* and global *user profiles*.

    - Global config profiles are used for any Zowe CLI command regardless of the directory in which the command is run. The profiles are always available in Zowe Explorer regardless of the location of the current Visual Studio Code workspace.

## Zowe CLI profile types

Configuration files are made up of multiple profiles that can be used by Zowe CLI. These profiles contain credentials and/or settings that are applied by the commands run in the CLI.

The following profile types were introduced in Zowe V1 and continue to be used in Zowe V2:

- **Service profiles** let you store connection information for specific mainframe service, such as IBM z/OSMF. Plug-ins can introduce other service profile types, such as the `cics` profile to connect to IBM CICS.

- **Base profiles** let you store connection information for use with one or more services. Typically, there is only one base profile in a configuration file. Service profiles can pull information from a base profile as needed, so that you can specify a common username and password once. A base profile can optionally store tokens to connect to the Zowe API Mediation Layer, which improves security by enabling Multi-Factor Authentication (MFA) and Single Sign-on (SSO).

- **Parent profiles** let you nest service profiles that share some of the same properties and values into groups. There can be multiple parent profiles within a configuration file. This makes it possible to define shared properties (for example, hostname or credentials) only once in your configuration file, rather than duplicating values for each service profile. Parent profiles and nested service profiles are useful when your configuration uses multiple kinds of authentication or if your configuration is used to connect to multiple hosts.

## Updating secure credentials

To change an existing username or password in a team config profile, use the `zowe config secure` command for a quick update:

1. Open the Zowe CLI command prompt.

2. To update values for secure fields in a **project team** configuration file:
    ```
    zowe config secure
    ``` 
    To update values for secure fields in a **global team** configuration file:
    ```
    zowe config secure --global-config
    ```
   Prompts request new values for all secure fields defined in the configuration file. In most cases, these properties include a username or password, but some users may include other fields, such as a token value or connection properties.

3. Respond to prompts as needed. Press `Enter` to leave the value unchanged.

    New values are saved in the [secure credential store](../appendix/zowe-glossary#secure-credential-store). After the last secure value is submitted, the user returns to the system command prompt.

For more ways to secure credentials in config profiles, see [Managing credential security](../user-guide/cli-using-team-managing-credential-security).

## Benefits of team profiles

Using team profiles in configuration files helps to improve the initial setup of Zowe CLI by making service connection details easier to share and easier to store within projects.

Consider the following benefits of using team profiles:

- As an application developer or team member, you can manage your connection details efficiently in one location.

- As a Dev-Ops advocate, or team leader, you can share global configurations with your team members so that they can easily access mainframe services. You can add the file directly to your project in a software change management (SCM) application.

- As a Dev-Ops advocate, you can quickly onboard new application developers by sharing the configuration file that your team uses with the new team member.

- As an application developer in a small shop where your role is that of an application developer *and* a Dev-Ops advocate, you can create whatever configuration type is most suitable for your needs!  

## Important information about team profiles

With the introduction of team profiles, the Secure Credential Store (SCS) Plug-in is deprecated. Secure credential encryption is now handled by the the secure array in the `zowe.config.json` file.

You can convert all of your Zowe CLI and Zowe CLI plug-ins V1 profiles to team profiles by issuing the following command:

```
zowe config convert-profiles
```
:::caution

You can continue using Zowe CLI V1 profiles with Zowe CLI V2. However, we highly recommend that you implement V2 profiles with Zowe CLI V2.

 If plain text credentials exist in the original V1 profiles and are converted, the resulting V2 team configuration file, `zowe.config.json`, will also contain plain text credentials.
   
:::

- Commands in the `zowe config` [command group](../user-guide/cli-using-understanding-core-command-groups#config) now let you manage security for any option value.

- Zowe CLI V2 prompts you to enter the username and password securely by default.