# Creating team profiles

As a Dev-Ops advocate or team leader, you can share team profiles with your team members so that they can easily access mainframe services.

## Share team configurations

As a team leader, you might want to share a configuration globally under the following scenarios:

- You want to share profiles with developers so that they can work with a defined set of mainframe services. The recipient of the file manually places it in their local `~/.zowe` folder before issuing CLI commands.
- You want to add the profiles to your project directory in a software change management (SCM) tool, such as GitHub. When you store the profiles in an SCM, developers can pull the project to their local machine and use the defined configuration. Zowe CLI commands that you issue from within the project directory automatically use the project's configuration scheme.
- You want to enable test automation and CI/CD, which lets your pipelines make use of the project configuration.
you store the profiles in an SCM, developers can pull the project to their local machine and use the defined configuration. Zowe CLI commands that you issue from within the project directory automatically use the project's configuration scheme.
-   You want to enable test automation and CI/CD, which lets your pipelines make use of the project configuration.


## Profile scenarios

The following topics describe various profile scenarios that system administrators can create to share with their teams.

### Access to one or more LPARs

The following example illustrates that the settings are using nested profiles to access multiple services directly on multiple LPARs that share the same username and password.

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
        "base": {
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
        "base": "base"
    }
}
```
The following example 





### two

### three