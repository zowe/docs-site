# Configuring team profiles

This release of Zowe CLI introduces the concept of **team** profiles.

## Profiles simplified

Using team profiles helps to improve the initial setup of Zowe CLI by making service connection details easier to share and easier to store within projects.

Consider the following benefits of using team profiles:

- As a application developer or team member, you can manage your connection details efficiently in one location.
- As a Dev-Ops advocate, or team leader, you can share global profiles with your team members so that they can easily access mainframe services. You can add the file directly to your project in a software change management (SCM) application.
- As a Dev-Ops advocate, you can quickly onboard new application developers by sharing the configuration file that your team uses with the new team member.

**Important:** With the introduction of team profiles, the Secure Credential Store (SCS) Plug-in is deprecated. The `zowe scs` and `zowe config` command groups are obsolete. Secure credential encryption is now included in the core CLI. The CLI prompts you to enter the username and password securely by default. Commands in the `zowe config` command group now let you manage security for any option value.

## Create team profile configuration files

Issue the following command to create the global profiles configuration file (`zowe.config.json`) and the user profile configuration file (`zowe.config.user.json`):

```
zowe config init --global-config 
```

After you create the configuration files, you can use a text editor to populate global profiles with connection details for your mainframe services.
