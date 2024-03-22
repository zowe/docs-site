# Using environment variables

:::note

For information on how to modify Zowe CLI default environment variables, see [Configuring Zowe CLI environment variables](cli-configuringcli-ev.md).

:::

You can define environment variables to execute commands more efficiently. Store a value such as your password in an environment variable, then issue commands without specifying your password every time. 

The term *environment* can refer to your operating system, container environment, or automation server such as Jenkins.

Consider assigning a variable in the scenarios outlined in the following table.

| Use case | Example | Benefit |
| - | - | - |
| Store a commonly used value. | Specify your mainframe username as an environment variable. | Issue commands without the `--user` option, and Zowe CLI automatically uses the value defined in the environment variable. |
| Override a value in existing profiles. | Override a value previously defined in multiple profiles. Specify the new value as a variable to override the value in profiles. | Avoid recreating each profile. |
| Secure credentials in an automation server or container | Set environment variables for use in scripts that run in your CI/CD pipeline. You can also define sensitive information in the Jenkins secure credential store. | Hide passwords and other sensitive information from plaintext in logs. |

## Store credentials securely in CI/CD pipelines

You can use environment variables to store credentials securely when running CI/CD pipelines.

To do so, use the `ZOWE_OPT_` prefix to turn a Zowe CLI command option into the proper format for a Zowe CLI environment variable. For instructions, see [Formatting environment variables](../user-guide/cli-using-formatting-environment-variables.md).

To use environment variables for a username and password:

```
ZOWE_OPT_USER
```

and

```
ZOWE_OPT_PASSWORD
```

Include the username and password environment variables in scripts that run in a CI/CD pipeline, as in the following example code that uses the Jenkins secure credential store for the variable values:

```
pipeline {
    agent {
        // Define agent details here
    }
    environment {
        ZOWE_OPT_USER = credentials('jenkins-lpar1-zosmf-user')
        ZOWE_OPT_PASSWORD = credentials('jenkins-lpar1-zosmf-password')

    }
    stages {
        stage('Example stage 1') {
            steps {
                //
            }
        }
        stage('Example stage 2') {
            steps {
                //
            }
        }
    }
}
```