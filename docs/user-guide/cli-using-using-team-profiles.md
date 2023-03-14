# Team configurations

Zowe CLI V2 introduces the concept of **team profiles**, which add *team* configurations to the *user* configurations already in use by Zowe CLI V1.

## Types of configuration files

Both team and user configurations can be applied either *globally* or *per project*, as described in the following definitions:

- A **user configuration file** stores *user profiles* and is used for one person who needs their own unique properties to run commands.

- A **team configuration file** stores *team profiles* and is used by a group of people who need the same properties to run commands.

- A **global configuration file** resides in the `ZOWE_CLI_HOME` directory (YourUserHomeDirectory/.zowe, by default). It contains global *user profiles* and global *team profiles*.

- A **project configuration file** resides in a directory of your choice. It contains project *user profiles* and project *team profiles*.

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

**Note:** You can continue using Zowe CLI and Zowe CLI plug-ins V1 profiles with Zowe CLI V2. However, we highly recommend that you implement V2 profiles with Zowe CLI V2.

- Commands in the `zowe config` [command group](../user-guide/cli-using-understanding-core-command-groups#config.md) now let you manage security for any option value.

- The `zowe scs` and `zowe config` command groups were repurposed to work with team profiles.

- Zowe CLI V2 prompts you to enter the username and password securely by default.

