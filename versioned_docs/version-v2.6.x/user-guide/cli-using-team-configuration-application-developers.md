# Team configuration for application developers

As an application developer or Zowe CLI user, you want to manage your connection details efficiently and in one location.

## Initializing user-specific configuration

As an application developer, you can optionally generate a *user-specific* configuration file that overrides the values defined in the global `zowe.config.json` file.

To generate a profile configuration file (`zowe.config.json`) that you can use globally, issue the following command:

```
zowe config init --global-config
```

To generate the global user profile configuration file (`zowe.config.user.json`), issue the following command:

```
zowe config init --global-config --user-config
```

In your *user-specific* file , observe that the "defaults" object is empty and the profiles do not have properties (illustrated in the following example). You can add your connection details as properties here to override properties in `zowe.config.json`, or add add new connections.

```{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "zosmf": {
            "type": "zosmf",
            "properties": {},
            "secure": []
        },
        "tso": {
            "type": "tso",
            "properties": {},
            "secure": []
        },
        "ssh": {
            "type": "ssh",
            "properties": {},
            "secure": []
        },
        "base": {
            "type": "base",
            "properties": {},
            "secure": []
        }
    },
    "defaults": {},
    "autoStore": true
}

```

## Editing team profiles

After the initial setup, as an application developer you can define additional mainframe services to the team (or *user-specific*) configuration file.

Open the `~/.zowe/zowe.config.json` file in a text editor or an IDE (such as Visual Stuide Code) on your computer. The profiles object contains connection and other frequently needed information for accessing various services. 

**Example:**

```
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "zosmf": {
            "type": "zosmf",
            "properties": {
                "port": 443
            }
        },
        "base": {
            "type": "base",
            "properties": {
                "host": "example1.com"
            },
            "secure": [
                "user",
                "password"
            ]
        }
    },
    "defaults": {
        "zosmf": "zosmf",
        "base": "base"
    },
}
```
