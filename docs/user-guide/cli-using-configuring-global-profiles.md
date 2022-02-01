# Configuring global/team profiles

This release of Zowe CLI introduces the concept of **global profiles**.

***????***Are we referring to this capability as GLOBAL or TEAM profiles ***????***
## Overview of global profiles

Global profiles simplify profile management by letting you edit, store, and share mainframe configuration details in one location.

Issue the following command to create the global profiles configuration file (zowe.config.json) and the user profile configuration file (zowe.config.user.json):

```
zowe config init --global-config --user-config
```

After you create the configuration files, you can use a text editor to populate global profiles with connection details for your mainframe services.

## Benefits of using global profiles

Consider the following benefits of using global profiles:

*   As a user, you can manage your connection details efficiently in one location.
*   As a team leader, you can share global profiles with your team members so that they can easily access mainframe services. You can add the file directly to your project in an SCM.
*   As a new team member, you can onboard quickly by using your team's shared configuration file.

## Secure Credential Store Plug-in is deprecated

The Zowe core CLI contains secure credential encryption, which eliminates the need for the plug-in. The `zowe scs` and `zowe config` command groups are obsolete.

The CLI prompts you to enter the username and password securely by default. Commands in the `zowe config` command group let you manage security for any option value.