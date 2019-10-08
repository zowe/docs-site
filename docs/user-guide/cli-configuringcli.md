# Configuring Zowe CLI 
This section explains how to define and verify your connection to the mainframe through Zowe&trade; CLI. You can also configure CLI settings, such as the level of detail produced in logs and the location of the home directory on your computer.

**Note:** The configuration for the CLI is stored on your computer in a directory such as C:\Users\user01\.zowe. The configuration includes log files, your profile information, and CLI plug-ins that are installed. When you troubleshoot an issue with the CLI, the log files in the imperative and zowe folders contain valuable information.

[[toc]]

## Defining Zowe CLI connection details

Zowe CLI has a *command option order of precedence* that lets you define arguments and options for commands in multiple ways (command-line, environment variables, and profiles). This provides flexibility when you issue commands and write automation scripts. This topic explains order of precedence and different methods for specifying your mainframe connection details. 

  - [Understanding command option order of precedence](#understanding-command-option-order-of-precedence)
  - [Creating Zowe CLI profiles](#creating-zowe-cli-profiles)
  - [Defining environment variables](#defining-environment-variables)
  - [Integrating with API Mediation Layer](#integrating-with-api-mediation-layer)

### Understanding command option order of precedence

Before you issue commands, it is helpful to understand the command option order of precedence. The following is the order in which Zowe CLI *searches for* your command arguments and options when you issue a command:

1.  Arguments and options that you specify directly on the command line.
2.  Environment variables that you define in the computer's operating system. For more information, see [Defining Environment Variables](#defining-environment-variables)
3.  User profiles that you create.
4.  The default value for the argument or option.

The affect of the order is that if you omit an argument/option from the command line, Zowe CLI searches for an environment variable that contains a value that you defined for the argument/option. If Zowe CLI does not find a value for the argument/option in an environment variable, Zowe CLI searches your user profiles for the value that you defined for the option/argument. If Zowe CLI does not find a value for the argument/option in your profiles, Zowe CLI executes the command using the default value for the argument/option.

**Note:** If a required option or argument value is not located, you receive a syntax error message that states `Missing Positional Argument` or `Missing Option.`

### Creating Zowe CLI profiles

Profiles let you store configuration details for use on multiple commands. You can create a profile that contains your username, password, and connection details for a particular mainframe system, then reuse that profile to avoid typing it again on every command. Switch between profiles to quickly target different mainframe subsystems.

**Notes:**
- Profile values are stored on your computer in plaintext in the `C:\Users\<yourUsername>\.zowe\profiles` folder.
- Profiles are **not** required to use the CLI. You can choose to specify all connection details in options on every command.
- For information about securely connecting to the server when you issue commands, see [Certificate security](#certificate-security).

#### Displaying profiles help
To learn about the options available for creating `zosmf` profiles, issue the following command:

```
zowe profiles create zosmf-profile --help
```

#### Creating and Using a profile

Create a profile, then use the profile when you issue a command. For example, substitute your connection details and issue the following command to create a profile with the name `myprofile123`:

```
zowe profiles create zosmf-profile myprofile123 --host host123 --port port123 --user ibmuser --password pass123
```

Issue the following command to list all data sets under the username ibmuser on the system specified in `myprofile123`:

```
zowe zos-files list data-set "ibmuser.*" --zosmf-profile myprofile123
```

After you create a profile, you can verify that it can communicate with z/OSMF. For more information, see [Testing Connection to z/OSMF](#testing-zowe-cli-connection-to-z-osmf).



#### Creating a profile that accesses API Mediation Layer 

You can create profiles that access either an exposed API or API Mediation Layer (API ML) in the following ways:

* When you create a profile, specify the host and port of the API that you want to access. When you only provide the host and port configuration, Zowe CLI connects to the exposed endpoints of a specific API.

* When you create a profile, specify the host, port, and the base path of API ML instance that you want to access. Using the base path to API ML, Zowe CLI routes your requests to an appropriate instance of the API based on the system load and the available instances of the API.

For more information, see [Accessing an API Mediation Layer](#integrating-with-api-mediation-layer).

**Example:**

The following example illustrates the command to create a profile that connects to z/OSMF through API ML with the base path `my/api/layer`:

```
zowe profiles create zosmf myprofile -H <myhost> -P <myport> -u <myuser> --pw <mypass> --base-path <my/api/layer>
```

After you create a profile, verify that it can communicate with z/OSMF. For more information, see [Testing Zowe CLI connection to z/OSMF](#testing-zowe-cli-connection-to-z-osmf).

### Defining Environment Variables
You can define environment variables in your environment to execute commands more efficiently. You can store a value, such as your password, in an environment variable, then issue commands without specifying your password every time. The term environment refers to your operating system, but it can also refer to an automation server, such as Jenkins or a Docker container. In this section we explain how to transform arguments and options from Zowe CLI commands into environment variables and define them with a value. 

  - **Assigning an environment variable for a value that is commonly used.**

    For example, you might want to specify your mainframe user name as an
    environment variable on your computer. When you issue a command and omit
    the `--username` argument, Zowe CLI automatically uses the
    value that you defined in the environment variable. You can now
    issue a command or create any profile type without specifying your
    user name repeatedly.

  - **Overriding a value that is used in existing profiles.**  
  
    For example, you might want to override a value that you previously
    set on multiple profiles to avoid recreating each profile.This
    reduces the number of profiles that you need to maintain and lets
    you avoid specifying every option on command line for one-off
    commands.

  - **Specifying environment variables in a Jenkins environment (or other automation server) to store credentials securely.**  
  
    You can set values in Jenkins environment variables for use in
    scripts that run in your CI/CD pipeline. You can define Jenkins
    environment variables in the same manner that you can on your computer. You
    can also define sensitive information in the Jenkins secure
    credential store. For example, you might need to define your mainframe
    password in the secure credential store so that it is not available
    in plain text.

#### Transforming arguments/options to environment variable format

Transform the option/argument into the correct format for a Zowe CLI environment variable, then define values to the new variable.
The following rules apply to this transformation:

  - Prefix environment variables with `ZOWE_OPT_`
  - Convert lowercase letters in arguments/options to uppercase letters
  - Convert hyphens in arguments/options to underscores  

**Tip:**  See your operating system documentation for information about how to set and get environment variables. The procedure for setting environment variables varies between Windows, Mac, and various versions of Linux operating systems.

**Examples:**

The following table shows command line options that you might want to
transform and the resulting environment variable to which you should define the value. Use the appropriate procedure for for your operating system to define the variables.

| Command Option          | Environment Variable           | Use Case   |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--user`                | `ZOWE_OPT_USER`                | Define your mainframe user name to an environment variable to avoid specifying it on all commands or profiles.                           |
| `--reject-unauthorized` | `ZOWE_OPT_REJECT_UNAUTHORIZED` | Define a value of `true` to the `--reject-unathorized` flag when you always require the flag and do not want to specify it on all commands or profiles. |

#### Setting environment variables in an automation server

You can use environment variables in an automation server, such as Jenkins, to write more efficient scripts and make use of secure credential storage.

You can either set environment variables using the `SET` command within your scripts, or navigate to **Manage Jenkins \> Configure System \> Global Properties** and define an environment variable in the Jenkins GUI. For example:

![jenkins gui](../images/guides/CLI/envVarsJenkins.png)

#### Using secure credential storage

Automation tools such as Jenkins automation server usually provide a mechanism for securely storing configuration (for example, credentials). In Jenkins, you can use `withCredentials` to expose credentials as an environment variable (ENV) or Groovy variable.

**Note:** For more information about using this feature in Jenkins, see [Credentials Binding Plugin](https://jenkins.io/doc/pipeline/steps/credentials-binding/) in the Jenkins documentation.

### Integrating with API Mediation Layer

The API Mediation Layer provides a single point of access to a defined set of microservices. The API Mediation Layer provides cloud-like features such as high-availability, scalability, dynamic API discovery, consistent security, a single sign-on experience, and API documentation.

When Zowe CLI executes commands that connect to a service through the API Mediation Layer, the layer routes the command execution requests to an appropriate instance of the API. The routing path is based on the system load and available instances of the API.

Use the `--base-path` option on commands to let all of your Zowe CLI core command groups (excludes plug-in groups) access REST APIs through an API Mediation Layer. To access API Mediation Layers, you specify the base path, or URL, to the API gateway as you execute your commands. Optionally, you can define the base path URL as an environment variable or in a profile that you create.

**Examples:**

The following example illustrates the base path for a REST request that is not connecting through an API Mediation Layer to one system where an instance of z/OSMF is running:

```
https://mymainframehost:port/zosmf/restjobs/jobs
```

The following example illustrates the base path (named `api/v1/zosmf1)` for a REST request to an API mediation layer:

```
https://myapilayerhost:port/api/v1/zosmf1/zosmf/restjobs/jobs
```

The following example illustrates the command to verify that you can connect to z/OSMF through an API Mediation Layer that contains the base path `my/api/layer`:

```
zowe zosmf check status -H <myhost> -P <myport> -u <myuser> --pw <mypass> --base-path <my/api/layer>
```

**More Information:**
- [API Mediation Layer](../getting-started/overview.md)
- [Creating a profile to access API Mediation Layer](#creating-a-profile-that-accesses-api-mediation-layer)

## Testing Zowe CLI connection to z/OSMF

You can issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs.

**Important!** By default, the server certificate is verified against a list of Certificate Authorities (CAs) trusted by Mozilla. This handshake ensures that the CLI can trust the server. You can append the flag `--ru false` to any of the following commands to bypass the certificate verification against CAs. If you use the `--ru false` flag, ensure that you understand the potential security risks of bypassing the certificate requirement at your site. For the most secure environment, system administrators configure a server keyring with a server certificate signed by a Certificate Authority (CA). For more information, see [Certificate security](#certificate-security).

**Without a Profile**

Verify that your CLI instance can communicate with z/OSMF.

```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password> 
```

**Default profile**

After you [create a profile](#creating-zowe-cli-profiles), verify that you can use your *default profile* to communicate with z/OSMF:

```
zowe zosmf check status
```

**Specific profile**

After you [create a profile](#creating-zowe-cli-profiles), verify that you can use *a specific profile* to communicate with z/OSMF:

```
zowe zosmf check status --zosmf-profile <profile_name>
```

The commands return a success or failure message and display information about your z/OSMF server, such as the z/OSMF version number. Report any failure to your systems administrator and use the information for diagnostic purposes.

## Certificate security

Certificates authorize communication between a server and client, such as z/OSMF and Zowe CLI. The client CLI must "trust" the server to successfully issue commands. Use one of the following methods to let the CLI communicate with the server:

- [Configure certificates signed by a Certificate Authority (CA)](#configure-certificates-signed-by-a-certificate-authority-ca) 
- [Extend trusted certificates on client](#extend-trusted-certificates-on-client) 
- [Bypass certificate requirement with CLI flag](#bypass-certificate-requirement-with-cli-flag) 

### Configure certificates signed by a Certificate Authority (CA) 

System Administrators can configure the server with a certificate signed by a Certificate Authority (CA) trusted by Mozilla. When a CA trusted by Mozilla exists in the certificate chain, the CLI automatically recognizes the server and authorizes the connection.

**Related information:**

- [Using certificates with z/OS client/server applications](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.icha700/icha700_Using_certificates_with_z_OS_client_server_applications.htm) in the IBM Knowledge Center.
- [Configuring the z/OSMF key ring and certificate](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/izuconfig_KeyringAndCertificate.htm) in the IBM Knowledge Center.
- [Certificate management in Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-security.md#certificate-management-in-zowe-api-mediation-layer) 
- [Mozilla Included CA Certificate List](https://wiki.mozilla.org/CA/Included_Certificates) 

### Extend trusted certificates on client

If your organization uses self-signed certificates in the certificate chain (rather than a CA trusted by Mozilla), you can download the certificate to your computer add it to the local list of trusted certificates. Provide the certificate locally using the `NODE_EXTRA_CERTS` environment variable. Organizations might want to configure all client computers to trust the self-signed certificate. 

[This blog post](https://medium.com/@dkelosky/zowe-cli-providing-node-extra-ca-certs-117727d936e5) outlines the process for using environment variables to trust the self-signed certificate.

### Bypass certificate requirement with CLI flag

If you do not have server certificates configured at your site, or you want to trust a known self-signed certificate, you can append the `--reject-unauthorized false` flag to your CLI commands. Setting the `--reject-unauthorized` flag to `false` rejects self-signed certificates and essentially bypasses the certificate requirement.

**Important!** Understand the security implications of accepting self-signed certificates at your site before you use this command.

**Example:**

```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password> --reject-unauthorized false 
```

## Setting Zowe CLI log levels

You can set the log level to adjust the level of detail that is written to log files:

**Important\!** Setting the log level to TRACE or ALL might result in "sensitive" data being logged. For example, command line arguments will be logged when TRACE is set.

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE_APP_LOG_LEVEL`        | Zowe CLI logging level            | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |
| `ZOWE_IMPERATIVE_LOG_LEVEL` | Imperative CLI Framework logging level | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |

## Setting the Zowe CLI home directory

You can set the location on your computer where Zowe CLI creates the *.zowe* directory, which contains log files, profiles, and plug-ins for the product:

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE_CLI_HOME`  | Zowe CLI home directory location | Any valid path on your computer | C:\Users\\<username\>\\.zowe |
