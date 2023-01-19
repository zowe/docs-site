# Managing credential security

When you first run the `zowe config init --global-config` command, the `profiles.base.properties.user` and `profiles.base.properties.password` fields are defined to the "secure" array in your configuration file, which helps to ensure that the username and password are stored securely on your computer.

To store or update values for the secure fields (for example, when you want to change your username and password), issue the `zowe config secure` command. If, for example, you want to update several property values in a long list of properties, press Enter to skip a field.

To secure a specific field, issue `zowe config set --secure <property-path>`. For example, `zowe config set --secure profiles.base.properties.password`. When you issue the command for an option that is already secured, the CLI prompts you to enter a new option value.

You can use an editor to define options to the secure array in `zowe.config.json`. Any option that you define to there becomes secure/prompted-for.

## Changes to secure credential storage

With the introduction of team profiles in Zowe CLI V2, the **Secure Credential Store (SCS) Plug-in** is deprecated. The `zowe scs` and `zowe config` command groups are obsolete. Secure credential encryption is now included with the Zowe CLI core application.

Zowe CLI V2 prompts you to enter the `username` and `password` securely by default. Commands in the `zowe config` command group let you manage security for any option value.