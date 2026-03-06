# Adding a default profile

A mainframe service can have more than one profile in your configuration file. Multiple profiles for a specific service can be helpful when you want to connect to different systems or LPARs.

If you use one profile more than others for a service, it is possible assign it as the default profile for that service. Designate a default profile manually or by issuing commands.

## Edit the configuration manually to create a default profile

Designate a default profile for a service with multiple profiles by manually editing the configuration file.

1. Open the `zowe.config.json` file with a text editor or IDE.
2. Find the `defaults` section, located toward the end of the configuration file.
3. Add your profile type and profile name to the `defaults` object (Line 5 in this example):

    ```json showLineNumbers
      "defaults": {
        "zosmf": "default_zosmf_profile_name",
        "tso": "default_tso_profile_name",
        "ssh": "default_ssh_profile_name",
        "profile_type": "add_default_profile_name_here",
        "base": "global_base"
      }
    ```
4. Save your changes.

A default profile for the added, or updated, profile type has been designated.

## Use commands to create a default profile

Designate a default profile for a service with multiple profiles by issuing a command.

To set a default `mq` profile:

```
zowe config set <defaults.mq> <your_default_mq_profile_name>
```

- ``<defaults.mq>``

  Specifies the dot notation path for the JSON object.
  
- ``<your_default_mq_profile_name>``

  Specifies the name of the profile to be set as the default.

The preceding command adds the `your_default_mq_profile_name` as the default profile for the `mq` profile type (Line 5) in the `defaults` object of the `zowe.config.json` file:

```json showLineNumbers
  "defaults": {
    "zosmf": "default_zosmf_profile_name",
    "tso": "default_tso_profile_name",
    "ssh": "default_ssh_profile_name",
    "mq": "your_default_mq_profile_name",
    "base": "global_base"
  }
```
