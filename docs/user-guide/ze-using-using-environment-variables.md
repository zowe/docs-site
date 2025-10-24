# Using environment variables

Configure environment variables to supply values for properties in your team configuration file.

Environment variables in client configuration can be used to store credentials, or other sensitive connection data, such as host and port information.

## Example use cases

- Working in **virtual environments** that do not store credentials locally.
  - Create an environment variable for Zowe Explorer to use for authentication instead of looking in a local vault.
- Storing an **authentication token** for APIML.
  - Store personal access tokens (PATs), which have longer durations than the default JSON web tokens.

## Configuring environment variables

To configure an environment variable:

1. Enable the **Override With Environment Variables** option in Zowe Explorer settings.
2. Add your environment variable and its value to your local system **[correct?]**. In Windows, go to System Properties. In MacOS, go to the system keychain **[correct?]**.

    Start the name with a `$` for Zowe to recognize it as an environment variable. For example, `$Environment_Variable`.

    :::warning
    Follow these naming guidelines to prevent unexpected behavior.
    
    - Do not use the prefix `ZOWE_OPT` for these environment variable names. `ZOWE_OPT` is used to [format environment variables in Zowe CLI](./cli-using-formatting-environment-variables.md) and the prefix does not work in Zowe Explorer.
    - Avoid names already in use on the by Zowe clients **[is "Zowe clients" correct here?]**. See [Configuring Zowe CLI environment variables](../user-guide/cli-configuringcli-ev.md) for a complete list. **[is "complete" correct here?]** 
    :::
3. Open your `zowe.config.json` file and add the environment variable to the desired property.

4. Search for data sets, USS files, or jobs to confirm that the environment variable works.

## A configuration file with environment variables

The following examples include environment variables in a configuration file with profiles organized in a nested structure (Lines 14-15, 24) and a configuration file with profiles in a flat structure (Lines 10-11, 23).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="nested" label="Nested profiles" default>
    ```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar": {
            "properties": {
                "host": "my.company.com",
                "port": 1234,
                "rejectUnauthorized": false
            },
            "profiles": {
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                          // highlight-start
                        "user": "$ZOWE_USER",
                        "password": "$ZOWE_PASS",
                          // highlight-end
                        "authOrder": "basic"
                    },
                    "apiml": {
                        "type": "zosmf",
                        "properties": {
                            "port": 7554,
                            "basePath": "ibmzosmf/api/v1",
                            "tokenType": "apimlAuthenticationToken",
                              // highlight-start
                            "tokenValue": "$ZOWE_APIML_PAT",
                              // highlight-end
                            "authOrder": "token, bearer"
                        }
                    }
                }
            }
        }
    },
    "defaults": {
        "zosmf": "lpar.zosmf"
    },
    "autoStore": false
}
    ```
  </TabItem>
  <TabItem value="flat" label="Flat profiles">
    ```json showLineNumbers
    {
    "$schema": "./zowe.schema.json",
    "profiles": {
        "zosmf": {
            "type": "zosmf",
            "properties": {
                "host": "my.company.com",
                "port": 1234,
                "rejectUnauthorized": false,
                  // highlight-start
                "user": "$ZOWE_USER",
                "password": "$ZOWE_PASS",
                  // highlight-end
                "authOrder": "basic"
            }
        },
        "apiml": {
            "type": "zosmf",
            "properties": {
                "host": "my.company.com",
                "port": 7554,
                "rejectUnauthorized": false,
                "basePath": "ibmzosmf/api/v1",
                "tokenType": "apimlAuthenticationToken",
                  // highlight-start
                "tokenValue": "$ZOWE_APIML_TOKEN",
                  // highlight-end
                "authOrder": "token, bearer"
            }
        }
    },
    "defaults": {
        "zosmf": "zosmf"
    },
    "autoStore": false
}
    ```
  </TabItem>
</Tabs>