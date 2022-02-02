# Configuring global/team profiles

This release of Zowe CLI introduces the concept of **global profiles**.

## Overview of global profiles

Using global profiles helps to improve the initial setup of Zowe CLI by making service connection details easier to share and easier to store within projects.

Consider the following benefits of using global profiles:

*   As a team member or system programmer, you can manage your connection details efficiently in one location.
*   As a team leader or system administrator, you can share global profiles with your team members so that they can easily access mainframe services. You can add the file directly to your project in a software change management (SCM) application.
*   As a new team member, you can onboard quickly by using the configuration file that your team shares.

Issue the following command to create the global profiles configuration file (`zowe.config.json`) and the user profile configuration file (`zowe.config.user.json`):

```
zowe config init --global-config --user-config
```

After you create the configuration files, you can use a text editor to populate global profiles with connection details for your mainframe services.

## Secure Credential Store Plug-in is deprecated

The Zowe core CLI contains secure credential encryption, which eliminates the need for the plug-in. The `zowe scs` and `zowe config` command groups are obsolete.

The CLI prompts you to enter the username and password securely by default. Commands in the `zowe config` command group let you manage security for any option value.