# Using team profiles

This version of Zowe CLI (V2) introduces the concept of **team** profiles.

Using team profiles helps to improve the initial setup of Zowe CLI by making service connection details easier to share and easier to store within projects.

Consider the following benefits of using team profiles:

- As an application developer or team member, you can manage your connection details efficiently in one location.
- As a Dev-Ops advocate, or team leader, you can share global profiles with your team members so that they can easily access mainframe services. You can add the file directly to your project in a software change management (SCM) application.
- As a Dev-Ops advocate, you can quickly onboard new application developers by sharing the configuration file that your team uses with the new team member.
- As an application developer in a small shop where your role is that of an application developer **and** a Dev-Ops advocate, you can create team profiles, base profiles, or service profiles; whatever profile type is most suitable for your needs!  

**Important:** With the introduction of team profiles, the Secure Credential Store (SCS) Plug-in is deprecated. The `zowe scs` and `zowe config` command groups are obsolete. Secure credential encryption is now included in the core CLI. The CLI prompts you to enter the username and password securely by default. Commands in the `zowe config` command group now let you manage security for any option value.
