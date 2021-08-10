# Using Global Profile Configuration (Technical Preview) <!-- omit in toc -->

<Badge text="Technical Preview"/> Global profiles are available in the `@next` version of Zowe CLI. The Zowe CLI `@next` release is a technical preview. Technical previews are for testing only and are not ready for production. Your feedback is valued and appreciated.

If you already installed the supported version `@zowe-v1-lts`, switch versions to try this feature. Global profiles will be included in the next major Zowe release, V2.0.0-LTS. Otherwise, you can [install the @next release of Zowe CLI](cli-install-cli-next.md).

**Table of Contents:**
- [Feature overview](#feature-overview)
  - [Benefits](#benefits)
  - [Changes to secure credential storage](#changes-to-secure-credential-storage)
- [Initializing global configuration](#initializing-global-configuration)
- [Initializing user-specific configuration (Optional)](#initializing-user-specific-configuration-optional)
- [Editing global configuration](#editing-global-configuration)
- [Managing credential security](#managing-credential-security)
- [Tips for efficient configuration](#tips-for-efficient-configuration)
  - [Command option order of precedence](#command-option-order-of-precedence)
  - [Tips for using the base array](#tips-for-using-the-base-array)
- [Sharing global configuration](#sharing-global-configuration)
- [Example configurations](#example-configurations)

## Feature overview

In the V1-LTS version of Zowe CLI, users issue commands from the `zowe profiles` group to create, edit, and manage user profiles. Each profile contains the host, port, username, and password for one mainframe service instance. While effective, users often need to duplicate values across profiles and spend time managing many profiles.

The introduction of **global profiles** simplifies profile management by letting you edit, store, and share mainframe configuration details in one location. You can use a text editor to populate global profiles with connection details for your mainframe services.

### Benefits

Global profiles improve your Zowe CLI experience:

- As a user, you can manage your connection details efficiently in one location.
- As a team leader, you can share global profiles with your team members so that they can easily access mainframe services. You can add the file directly to your project in an SCM.
- As a new team member, you can onboard quickly by using your team's configuration file.

### Changes to secure credential storage

With the introduction of global profiles, the  Secure Credential Store (SCS) Plug-in is deprecated in the `@next` version. <!-- remove this plug-in from Brightside user docs --> The `zowe scs` and `zowe config` command groups are obsolete. Secure credential encryption is now included in the core CLI.

The CLI prompts you to enter the username and password securely by default. Commands in the `zowe config` command group let you manage security for any option value. <!-- is this a new command group? the previous paragraph indicates that `zowe config` is deprecated -->


## Initializing global configuration

Verify that you have installed [the @next release of Zowe CLI](cli-install-cli-next.md).

You have two options to initialize the global configuration:
 * Define a connection to z/OSMF (recommended).
 * Create your configuration files manually.

***Follow these steps:***

1. Issue the command:

   ```
   zowe config init --global-config
   ```

   The CLI responds with prompts for a username and password.

2. Respond to the prompts with a username and password for a mainframe service such as z/OSMF.

   **Note:** The `config init` command ensures that your credentials are stored securely on your computer by default.

   After you respond, the `zowe.config.json` global configuration file is added to your local `.zowe` directory. This is the primary location where your MF service connection details such as host and port are defined. Use this configuration file for the following procedures.

3. Edit the `zowe.config.json` file to edit the name of the LPAR,  supply a value for the host name, and edit the port number as needed.

4. Issue a Zowe CLI command to test that you can access z/OSMF. For example, list all data sets under your user ID:

   ```
   zowe zos-files list data-set "MY.DATASET.*"
   ```

   A list of data sets is returned. You successfully configured Zowe CLI to access a z/OSMF instance.

   If the CLI returns an error message, verify that you have access to the target system. Examine your configuration files in a text editor to verify that the information you entered is correct.

**Important!:** After the configuration files are in place (either via the `zowe config init` command or by manually creating the files), the now-deprectaed `zowe profiles` commands will no longer function. Zowe CLI will return errors if you attempt to make use of old profiles.

## Initializing user-specific configuration (Optional) 

You can generate a *user-specific* configuration file that overrides the values defined in the global `zowe.config.json` file.

To generate both global (`zowe.config.json`) and user (`zowe.config.user.json`) config files, issue the command `zowe config init --global-config --user-config`.

In your user-specific file, notice that the top level defaults, plugins, and secure fields are empty. The profiles do not have any properties. You can add your connection details as properties here to override properties in `zowe.config.json`, or add add new connections.
## Editing global configuration

After the initial setup, you can define additional mainframe services to the global (or user-specific) configuration file.

Open the `~/.zowe/zowe.config.json` file in a text editor or IDE on your computer. The profiles object contains connection and other frequently needed information for accessing various services. For example:

```json
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
                }
            },
            "secure": [
                "user",
                "password"
            ]
        }
    },
    "defaults": {
        "zosmf": "lpar1.zosmf"
    },
    "plugins": []
}
```

You can edit the details as needed and save the file.

For example, to add a new instance of z/OSMF that runs on a different mainframe LPAR, you can build on the existing array as follows:

```json
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
                // See below about tips for using base array to avoid duplicating these
                "user",
                "password"
            ]
        }
    },
    "defaults": {
        // Change to lpar2.zosmf if you wish to change default profile
        "zosmf": "lpar1.zosmf"
    },
    "plugins": []
}
```

You can continue to add more LPARs and more services within each LPAR. After you make changes, save the file and issue a Zowe CLI command to the service to verify the connection.
## Managing credential security

When you first run the `zowe config init --global-config` command, the `profiles.base.properties.user` and `profiles.base.properties.password` fields are defined to the "secure" array in your configuration file. This ensures that the username and password are stored securely on your computer.

To update the secure fields (for example, when you want to change your username and password), issue the `zowe config secure` command.

To secure a specific field, use the command `zowe config set --secure <property-path>`. For example, you can issue `zowe config set --secure profiles.base.properties.password`. If you issue the command for an option that is already secured, the CLI prompts you to enter a new option value.

You can use an editor to define options to the secure array in `zowe.config.json`. Any option that you define to there becomes secure/prompted-for.

## Tips for efficient configuration

There are several methods to more efficiently update and maintain your configuration:
* Leverage the command option order of precedence
* Utilize a base array

### Command option order of precedence

Zowe CLI uses a **command option order of precedence** by which service definitions inherit option values. Use this feature to avoid duplicating option values.

Zowe CLI checks for option values in order, skipping null values:
1. Explicit command-line option values
2. Environment variables
3. Service type profiles
4. Base type profiles
5. Default option value

The user name and password fields are not supplied in the service definitions.

**Example:** <!--Not sure what this is trying to same, as there seems to be something missing --> The username and password fields for ZOSMF1 and ZOSMF2 are not supplied in the service definitions to allow them to inherit values from the base array:

```json
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
        "my_base": {
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
        "zosmf": "lpar1.zosmf",
        "base": "my_base"
    },
    "plugins": []
}
```

### Tips for using the base array

Use the base array to share option values between services. You might share option values between services in the following situations:
- You have multiple services that share the same username, password, or other value.
- You want to store a web token to access all services through Zowe API Mediation Layer.
- You want to trust a known self-signed certificate or your site does not have server certificates configured. You can define `reject-unauthorized` in the base array with a value of  `false` to apply to all services. Understand the security implications of accepting self-signed certificates at your site before you use this method.

## Sharing global configuration

You might want to share a configuration globally:
- With developers so that they can begin working with a defined set of mainframe services. The recipient of the file manually places it in their local `~/.zowe` folder before issuing CLI commands.
- To add to your project directory in an SCM tool such as GitHub. This lets other developers pull the project to their local machine and make use of the defined configuration. Zowe CLI commands that you issue from within the project directory automatically use the project's config scheme.
- To enable test automation and CI/CD, letting your pipelines make use of the project configuration.

## Example configurations

**Example 1:** The settings are accessing multiple services directly on multiple LPARs that share the same username and password.

```json
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
        "my_base": {
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
        "base": "my_base"
    },
    "plugins": []
}
```
**Example 2:** The settings are accessing multiple services using the API ML (where MFA/SSO is achievable via token-based authorization).
```json
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "lpar1": {
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
                        "basePath": "api/v1/my_cics"
                    }
                },
                "db2": {
                    "type": "db2",
                    "properties": {
                        "basePath": "api/v1/my_db2"
                    }
                }
            }
        },
        "my_base": {
            "type": "base",
            "properties": {
                "host": "example1.com",
                "port": 443,
                "rejectUnauthorized": true
            },
            "secure": [
                "authToken"
            ]
        }
    },
    "defaults": {
        "zosmf": "lpar1.zosmf",
        "cics": "lpar1.cics",
        "db2": "lpar1.db2",
        "base": "my_base"
    },
    "plugins": []
}
```
**Example 3:** The settings are accessing multiple services directly on LPAR1 and LPAR2 where username and password varies between the LPAR1 and LPAR2 services. This example is identical to Example 1 except that LPAR1 and LPAR2 each contain a secure array, instead of just one secure array in the "my_base" profile.
```json
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
        "my_base": {
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
        "base": "my_base"
    },
    "plugins": []
}
```

**Example 4:** Using API ML to access production services while services on a dev-test environment can be accessed directly.
```json
{
    "$schema": "./zowe.schema.json",
    "profiles": {
        "prod": {
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
                        "basePath": "api/v1/my_cics"
                    }
                },
                "db2": {
                    "type": "db2",
                    "properties": {
                        "basePath": "api/v1/my_db2"
                    }
                }
            }
        },
        "dev": {
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
        "my_base": {
            "type": "base",
            "properties": {
                "host": "example1.com",
                "port": 443,
                "rejectUnauthorized": true
            },
            "secure": [
                "authToken"
            ]
        }
    },
    "defaults": {
        "zosmf": "prod.zosmf",
        "cics": "prod.cics",
        "db2": "prod.db2",
        "tso": "dev.tso",
        "ssh": "dev.ssh",
        "base": "my_base"
    },
    "plugins": []
}
```
