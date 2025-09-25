# Creating profiles

Configuration profiles are used to connect to different mainframe services, and you can structure each profile based on how that connection is made.

For example, profiles can be nested to share the same connection information, or keep different information separate. Services can be accessed directly by Zowe CLI, or they can be accessed through the API Mediation Layer.

Review the following scenarios to help determine the profile types best suited for your environment.

As a team leader, you can share the configuration you create with your team members so they can easily access mainframe services.

## Accessing LPARs that contain services that share the same credentials

In the following configuration, nested profiles (highlighted in the example) use the credentials from the same base profile to access services directly on multiple LPARs:

```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
            "properties": {
                "host": "lpar1.example.com"
            },
            "profiles": {
                // highlight-start
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "port": 443
                    }
                },
                "tso": {
                    "type": "tso",
                    "properties": {
                        "account": "ACCT#",
                        "codePage": "1047",
                        "logonProcedure": "IZUFPROC"
                    }
                },
                "ssh": {
                    "type": "ssh",
                    "properties": {
                        "port": 22
                    }
                }
                // highlight-end
            }
        },
        "lpar2": {
            "properties": {
                "host": "lpar2.example.com"
            },
            "profiles": {
                // highlight-start
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "port": 1443
                    }
                }
                // highlight-end
            }
        },
        "project_base": {
            "type": "base",
            "properties": {
                "rejectUnauthorized": true
            },
            "secure": [
                "user",
                "password"
            ]
        }
    },
    "defaults": {
        "zosmf": "lpar2.zosmf",
        "tso": "lpar1.tso",
        "ssh": "lpar1.ssh",
        "base": "project_base"
    },
    "autoStore": true
}
```
## Accessing LPARs that contain services that do not share the same credentials

In the following configuration, profiles are highlighted to show they are nested to use the credentials from parent profiles for different LPARs to access services directly on multiple LPARs.

```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
            "properties": {
                "host": "lpar1.example.com"
            },
            "profiles": {
                // highlight-start
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "port": 443
                    }
                },
                "tso": {
                    "type": "tso",
                    "properties": {
                        "account": "ACCT#",
                        "codePage": "1047",
                        "logonProcedure": "IZUFPROC"
                    }
                },
                "ssh": {
                    "type": "ssh",
                    "properties": {
                        "port": 22
                    }
                }
                // highlight-end
            },
            "secure": [
                "user",
                "password"
            ]
        },
        "lpar2": {
            "properties": {
                "host": "lpar2.example.com"
            },
            "profiles": {
               // highlight-start
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "port": 1443
                    }
                }
              // highlight-end
            },
            "secure": [
                "user",
                "password"
            ]
        },
        "project_base": {
            "type": "base",
            "properties": {
                "rejectUnauthorized": true
            }
        }
    },
    "defaults": {
        "zosmf": "lpar2.zosmf",
        "tso": "lpar1.tso",
        "ssh": "lpar1.ssh",
        "base": "project_base"
    },
    "autoStore": true
}
```

## Accessing LPARs that access services through one API Mediation Layer

In the following configuration, services are accessed through API ML (where multi-factor authentication (MFA) or single sign-on (SSO) is achievable) using token-based authorization stored in a base profile (highlighted in the example).

```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "zosmf": {
            "type": "zosmf",
            "properties": {
                "basePath": "ibmzosmf/api/v1"
            }
        },
        "cics": {
            "type": "cics",
            "properties": {
                "basePath": "ibmcics/api/v1"
            }
        },
        "db2": {
            "type": "db2",
            "properties": {
                "basePath": "ibmdb2/api/v1"
            }
        },
        // highlight-start
        "project_base": {
            "type": "base",
            "properties": {
                "host": "example.com",
                "port": 7554,
                "rejectUnauthorized": true,
                "tokenType": "apimlAuthenticationToken"
            },
            "secure": [
                "tokenValue"
            ]
        }
        // highlight-end
    },
    "defaults": {
        "zosmf": "zosmf",
        "cics": "cics",
        "db2": "db2",
        "base": "project_base"
    },
    "autoStore": true
}
```

## Accessing LPARs that access services through one API Mediation Layer using certificate authentication

In the following configuration, services are accessed through API ML using certificate authentication stored in a base profile (highlighted in the example).

```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "zosmf": {
            "type": "zosmf",
            "properties": {
                "basePath": "ibmzosmf/api/v1"
            }
        },
        "cics": {
            "type": "cics",
            "properties": {
                "basePath": "ibmcics/api/v1"
            }
        },
        "db2": {
            "type": "db2",
            "properties": {
                "basePath": "ibmdb2/api/v1"
            }
        },
        // highlight-start
        "project_base": {
            "type": "base",
            "properties": {
                "certFile": "./zowe-cert.pem",
                "certKeyFile": "./zowe-cert-key.pem",
                "host": "example.com",
                "port": 7554,
                "rejectUnauthorized": true
            }
        }
        // highlight-end
    },
    "defaults": {
        "zosmf": "zosmf",
        "cics": "cics",
        "db2": "db2",
        "base": "project_base"
    },
    "autoStore": true
}
```

## Accessing services through multiple API ML gateways

There are different ways to access mainframe services through multiple API ML gateways, depending on how you organize the profiles in your configuration. Determine the method to use by the requirements of your client component. 

In Zowe CLI, profiles do not need to be nested in order to use multiple API ML gateways. Nested profiles are required for Zowe Explorer for VS Code. 

Select one of the following tabs to see the configuration possible for the client components.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="zowe cli ze" label="Zowe CLI, Zowe Explorer for VS Code" default>
In the following configuration, profiles are highlighted to show they are nested so their connection information can be used with multiple API ML gateways. 

To authenticate to a specific API ML gateway from this configuration, issue the `zowe auth login apiml --base-profile lpar1` or `zowe auth login apiml --base-profile lpar2` commands.

```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
            "properties": {
                "host": "lpar1.example.com",
                "port": 7554,
                "tokenType": "apimlAuthenticationToken"
            },
            "profiles": {
                // highlight-start
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "basePath": "ibmzosmf/api/v1"
                    }
                },
                "tso": {
                    "type": "tso",
                    "properties": {
                        "account": "ACCT#",
                        "codePage": "1047",
                        "logonProcedure": "IZUFPROC"
                    }
                },
                "ssh": {
                    "type": "ssh",
                    "properties": {
                        "port": 22
                    },
                    "secure": [
                        "user", 
                        "password"
    ]
}
                // highlight-end
            },
            "secure": [
                "tokenValue"
            ]
        },
        "lpar2": {
            "properties": {
                "host": "lpar2.example.com",
                "port": 7554,
                "rejectUnauthorized": false,
                "tokenType": "apimlAuthenticationToken"
            },
            "profiles": {
                // highlight-start
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "basePath": "ibmzosmf/api/v1"
                    }
                }
                // highlight-end
            },
            "secure": [
                "tokenValue"
            ]
        }
    },
    "defaults": {
        "zosmf": "lpar2.zosmf",
        "tso": "lpar1.tso",
        "ssh": "lpar1.ssh"
    },
    "autoStore": true
}
```
  </TabItem>
  <TabItem value="zowe cli 2" label="Zowe CLI alternative">

In the following configuration, profiles are highlighted to show they are all at the same level.

Use the `--base-profile` option on Zowe CLI commands to select a base profile that contains API ML gateway information to use for a specific API ML gateway for that command.

```json showLineNumbers
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        // highlight-start
        "zosmf": {
            "type": "zosmf",
            "properties": {
                "basePath": "/ibmzosmf/api/v1"
            }
        },
        "lpar1": {
            "properties": {
                "host": "lpar1.example.com",
                "port": 7554,
                "tokenType": "apimlAuthenticationToken"
            },
            "secure": [
                "tokenValue"
            ]
        },
        "lpar2": {
            "properties": {
                "host": "lpar2.example.com",
                "port": 7554,
                "tokenType": "apimlAuthenticationToken"
            },
            "secure": [
                "tokenValue"
            ]
        }
        // highlight-end
    },
    "defaults": {
        "zosmf": "zosmf",
        "base": "lpar2"
    },
    "autoStore": true
}
```
  </TabItem>
</Tabs>
