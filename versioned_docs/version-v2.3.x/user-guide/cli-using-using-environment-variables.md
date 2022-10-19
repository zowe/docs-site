# Using environment variables

**Note:** For information on how to modify Zowe CLI default environment variables, see [Configuring Zowe CLI environment variables](cli-configuringcli-ev.md).

You can define environment variables to execute commands more efficiently. Store a value such as your password in an environment variable, then issue commands without specifying your password every time. 

The term "environment" can refer to your operating system, container environment, or automation server such as Jenkins.

You may want to assign a variable in the following scenarios:

* **Store a value that is commonly used.**

    For example, you might want to specify your mainframe username as an environment variable. Now you can issue commands and omit the `--user` option, and Zowe CLI automatically uses the value that you defined in the environment variable.
* **Override a value in existing profiles.**

    For example, you might want to override a value that you previously defined in multiple profiles to avoid recreating each profile. Specify the new value as a variable to override the value in profiles.
* **Secure credentials in an automation server or container.**
    
    You can set environment variables for use in scripts that run in your CI/CD pipeline. For example, can define environment variables in Jenkins so that your password is not seen in plaintext in logs. You can also define sensitive information in the Jenkins secure credential store.