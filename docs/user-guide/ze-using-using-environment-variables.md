# Using environment variables

Configure environment variables to supply values for properties in your team configuration file.

Environment variables in client configuration can be used to store credentials or other sensitive connection data, such as host and port information.

## Example use cases

- Working in **virtual environments** that do not store credentials locally.
  - Create an environment variable for Zowe Explorer to use for authentication instead of looking in a local vault.
- Storing an **authentication token** for APIML.
  - Store personal access tokens (PATs), which have longer durations, and can have narrower scope, than the default JSON web tokens.

## Configuring environment variables for credentials

### One set of credentials

To use only one set of credentials:
      
  1. Use the `ZOWE_OPT_USER` and `ZOWE_OPT_PASSWORD` environment variables.
  
      These environment variables can also be [formatted for use in Zowe CLI](../user-guide/cli-using-formatting-environment-variables.md).
      
  2. Check the **Override With Environment Variables** setting in Zowe Explorer.

  3. Open your `zowe.config.json` file and add the environment variable with the `$` prefix to the corresponding property. For example, `$ZOWE_OPT_USER` or `$ZOWE_OPT_PASSWORD`.

  4. Confirm that the environment variables work by executing a search for data sets, USS files, or jobs.

### Multiple sets of credentials

To use multiple sets of credentials:
  
  1. If checked, uncheck the **Override With Environment Variables** setting in Zowe Explorer.
  2. Create your own non-`ZOWE_OPT_` environment variables. For example, `OTHER_USER` and `OTHER_PASSWORD`.

      Add your environment variables and values to your local system. In Windows, go to System Properties. In cloud development environments, secret environment variables can be defined when configuring the cloud IDE.

      :::warning

      To prevent conflicts, avoid names already in use by Zowe clients. See [Configuring Zowe CLI environment variables](../user-guide/cli-configuringcli-ev.md) for a complete list. 

      :::
  3. Open your `zowe.config.json` file and add the environment variable with the `$` prefix to the corresponding property. For example, `$OTHER_USER` or `$OTHER_PASSWORD`.

  4. Confirm that the environment variables work by executing a search for data sets, USS files, or jobs.

## Configuration with environment variables

### Using one set of credentials

In the following example, the configuration uses the `ZOWE_OPT_USER` and `ZOWE_OPT_PASSWORD` environment variables for one set of credentials.

```
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar": {
            "properties": {
                "host": "my.company.com",
                "rejectUnauthorized": false,
                "port": 7554
            },
            "profiles": {
                "zosmf_via_apiml": {
                    "type": "zosmf",
                    "properties": {
                        "basePath": "ibmzosmf/api/v1"
                    }
                }
            }
        }
    },
    "defaults": {
        "zosmf": "lpar.zosmf_via_apiml"
    },
    "autoStore": false
}
```

### Using multiple sets of credentials

The following examples of configurations use environment variables for multiple credentials.

**In the nested structure**, the `zosmf` and `zosmf_via_apiml` profiles are nested within the `lpar` profile.
- This avoids repeating the `host` and `rejectUnauthorized` properties in both service profiles.
- Environment variables are used for [multiple credentials](#multiple-sets-of-credentials) in Lines 14-15 and Line 24.

**In the flat structure**, the `zosmf` and `apiml` service profiles are organized sequentially.
- This includes the `host` and `rejectUnauthorized` properties in both service profiles.
- Environment variables are used for [multiple credentials](#multiple-sets-of-credentials) in Lines 10-11 and Line 23.


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
                "port": 7554,
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
                        "authOrder": "basic",
                        "port": 443
                    }
                },
                "zosmf_via_apiml": {
                    "type": "zosmf",
                    "properties": {
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
    },
    "defaults": {
        "zosmf": "lpar.zosmf_via_apiml"
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


