# Creating profiles

Configuration profiles are used to connect to different mainframe services, and you can structure each profile based on how that connection is made.

For example, profiles can be nested to share the same connection information, or keep different information separate. Services can be accessed directly by Zowe CLI, or they can be accessed through the API Mediation Layer.

Review the following scenarios to help determine the profile types best suited for your environment.

As a team leader, you can share the configuration you create with your team members so they can easily access mainframe services.

## Accessing LPARs that contain services that share the same credentials

In the following configuration, nested profiles use the credentials from the same base profile to access services directly on multiple LPARs:

```
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
            "properties": {
                "host": "example1.com"
            },
            "profiles": {
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
            }
        },
        "lpar2": {
            "properties": {
                "host": "example2.com"
            },
            "profiles": {
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "port": 1443
                    }
                }
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

In the following configuration, profiles are nested to use the credentials from parent profiles for different LPARs to access services directly on multiple LPARs.

```
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
            "properties": {
                "host": "example1.com"
            },
            "profiles": {
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
            },
            "secure": [
                "user",
                "password"
            ]
        },
        "lpar2": {
            "properties": {
                "host": "example2.com"
            },
            "profiles": {
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "port": 1443
                    }
                }
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

In the following configuration, services are accessed through the API ML (where multi-factor authentication (MFA) or single sign-on (SSO) is achievable) using token-based authorization stored in a base profile.

```
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

In the following configuration, services are accessed through the API ML using certificate authentication stored in a base profile.

```
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "zosmf": {
            "type": "zosmf",
            "properties": {
                "basePath": "api/v1"
            }
        },
        "cics": {
            "type": "cics",
            "properties": {
                "basePath": "api/v1/cics"
            }
        },
        "db2": {
            "type": "db2",
            "properties": {
                "basePath": "api/v1/db2"
            }
        },
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

In the following configuration, the profiles are structured to connect to services using multiple API ML gateways.

To authenticate to a specific API ML gateway from this configuration, you can run `zowe auth login apiml --base-profile lpar1` or `zowe auth login apiml --base-profile lpar2`.

```
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
            "properties": {
                "host": "example1.com",
                "port": 7554,
                "tokenType": "apimlAuthenticationToken"
            },
            "profiles": {
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "basePath": "api/v1"
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
            },
            "secure": [
                "tokenValue"
            ]
        },
        "lpar2": {
            "properties": {
                "host": "example2.com",
                "port": 7554,
                "rejectUnauthorized": false,
                "tokenType": "apimlAuthenticationToken"
            },
            "profiles": {
                "zosmf": {
                    "type": "zosmf",
                    "properties": {
                        "basePath": "api/v1"
                    }
                }
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