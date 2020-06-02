# Configuring Zowe CLI
This section explains how to define and verify your connection to the mainframe in Zowe&trade; CLI, and how to configure log levels and your home directory location.

**Tip:** CLI configuration is stored on your computer in a directory such as `C:\Users\user01\.zowe`. The directory includes log files, profile information, and installed CLI plug-ins. When troubleshooting, refer to the logs in the `imperative` and `zowe` folders.

  - [Setting Zowe CLI log levels](#setting-zowe-cli-log-levels)
  - [Setting the Zowe CLI home directory](#setting-the-zowe-cli-home-directory)

## How command precedence works

You can provide your mainframe connection details (username, password, etc...) to Zowe CLI in several ways. Zowe CLI abides by a "command option order of precedence" that provides flexibility when issuing commands and writing scripts.

When you issue a command, the CLI *searches* for your command arguments in the following order:

1. **Options** that you specify directly on individual commands.
2. **Environment variables** that you define in the computer's operating system. For more information, see [Defining Environment Variables](#defining-environment-variables)
3. **Service profiles** that you create (i.e. z/OSMF profile or another MF service).
4. **Base profiles** that you create (can contain credentials for multiple services and/or an API ML login token).
5. The **default value**.

If you omit an option from the command line, Zowe CLI searches for any environment variables that contains a value for the option. If no environment variable exists, the CLI searches your service profiles for the value. Base profiles provide values to other service profiles so that you do not need to specify the same options (i.e. username and password) in multiple service profiles.

**Note:** If you do not provide a value with one of these methods, the default option value is used. If a required option or argument value is not located, you receive a syntax error message that states `Missing Positional Argument` or `Missing Option`.

## Issuing commands

You can provide all connection options directly on each command. For example, issue the following command to list all data sets under the name `ibmuser`:

```
zowe zos-files list data-set "ibmuser.*" --host host123 --port port123 --user ibmuser --password pass123
```

**Note:** If you omit a required option, the CLI prompts you to enter an option value.

## Testing connection to z/OSMF

You can issue a command at any time to receive diagnostic information from the server and confirm that Zowe CLI can communicate with z/OSMF or other mainframe APIs.

**Important!** By default, the server certificate is verified against a list of Certificate Authorities (CAs) trusted by Mozilla. This handshake ensures that the CLI can trust the server. You can append the flag `--ru false` to the following commands to bypass the certificate verification against CAs. If you use the `--ru false` flag, ensure that you understand the potential security risks of bypassing the certificate requirement at your site. For the most secure environment, system administrators configure a server keyring with a server certificate signed by a Certificate Authority (CA). For more information, see [Certificate security](#certificate-security).

#### Without a profile

Verify that your CLI instance can communicate with z/OSMF.

```
zowe zosmf check status --host <host> --port <port> --user <username> --pass <password>
```

#### Default profile

After you [create a profile](#creating-zowe-cli-profiles), verify that you can use your *default profile* to communicate with z/OSMF:

```
zowe zosmf check status
```

#### Specific profile

After you [create a profile](#creating-zowe-cli-profiles), verify that you can use *a specific profile* to communicate with z/OSMF:

```
zowe zosmf check status --zosmf-profile <profile_name>
```

The commands return a success or failure message and display information about your z/OSMF server, such as the z/OSMF version number. Report failures to your systems administrator and use the information for diagnostic purposes.

## Using profiles

Profiles let you store configuration details for reuse. Create a profile that contains your username, password, and connection details for a mainframe service, then reuse that profile to avoid typing the information on every command. Switch between profiles to quickly target different mainframe subsystems.

There are two main types of profiles:

- **Service profiles:** Store connection information for specific mainframe service, such as IBM z/OSMF. Plug-ins can introduce other service profile types, such as the `cics` profile to connect to IBM CICS.

- **Base profiles:** Store connection information for use with one or more services. Your service profiles can pull information from base profiles as needed, so that you can specify your username and password once. The base profile can optionally store tokens to connect to Zowe API Mediation Layer, which improves security by enabling Multi-Factor Authentication (MFA) and Single Sign-on (SSO).

**Tips:**
- You can have multiple service profiles and multiple base profiles.
- Profiles are **not** required. You can choose to specify all connection details for every command.
- Profile values are stored on your computer in plaintext by default, in the `C:\Users\<yourUsername>\.zowe\profiles` folder.

### Displaying profiles help

Use the CLI help to learn about the  options for creating profiles. For example, for a `zosmf` profile, issue the following command:

```
zowe profiles create zosmf-profile --help
```

### Creating and using service profiles

Create a profile that targets a specific mainframe service, then use the profile to issue a command. For example, issue the following command (substituting your connection details) to create a `zosmf` service profile named `myprofile123`:

```
zowe profiles create zosmf-profile myprofile123 --host host123 --port port123 --user ibmuser --password pass123
```

Use the profile. For example, issue the following command to list all data sets under the name `ibmuser` on the system that you specified in your profile:

```
zowe zos-files list data-set "ibmuser.*" --zosmf-profile myprofile123
```

**Note:** If you do not specify a profile, your default profile is used.

### Creating and using base profiles

Create a base profile, which can store option values and provide them to multiple service profiles. The base profile can also contain tokens to connect to services securely through API ML.

For example, create a base profile that contains your username and password. After the base profile is created, you can omit the `--username` and `--password` options when creating a service profile such as `zosmf`. The service profile will use values provided by the base profile.

When you log in to Zowe API Mediation Layer, a base profile is created for you to store your username, password, and token.

<!--
Insert example syntax for creating a base profile here.

Questions:
- When you issue a command, do you have use a base-profile and service-profile option in combination or does your service profile know where to "look" for username, pass, etc in your existing base profile?
- Can you create a base profile w/ everything needed for a service profile, such as zosmf, and not actually create any service profiles? Is there a use case for that?
- -->

### Profile best practices

<!-- We described the most basic way of creating a service profile and base profile, and how to use them independently. Can we add any tips here about using them efficiently together?

If you could give someone 2-3 general tips about this, what would they be?
 -->

## Integrating with API Mediation Layer

Zowe API ML provides a single point of access to a defined set of mainframe services. The layer provides API management features such as high-availability, consistent security, and a single sign-on (SSO) and multi-factor authentication (MFA) experience.

You can access API ML through Zowe CLI, which initiates a secure session and lets you access to multiple registered services through your base CLI profile. When you issue commands using the base profile, the layer routes the requests to an appropriate instance of the API based on the system load and available API instances.

### How token management works

When you log in with the CLI, a token is supplied by API ML and stored on your computer. The token initiates a secure session with API ML and is used on future commands.

Tokens expire after a period of time defined by your security administrator. When a token expires, you must log in to API ML to initiate a new session.

**Note:** Zowe CLI also supports other token implementations, such as Java Web Tokens (JWT) and Lightweight Third-Party Authentication (LTPA).

### Logging in

To request a token and initiate a session with API ML, issue the following command:

```
zowe auth login apiml
```

The CLI prompts you to enter your username and password (where password can be a PIN concatenated with a second factor for MFA). A local base profile is created that contains your JWT, username, and password.

You can use the base profile to issue a command. For example:

```
zowe zos-files list data-set "ibmuser.*" --base-profile myprofile123
```

The request will be routed through API ML to access the appropriate instance of z/OSMF.

**Tips:**
- When your JWT token expires, you must request another token with the `zowe auth login apiml` command.
- If you omit connection details from a service profile, such as `zosmf` profile, the CLI uses the information from your base profile.
- You can choose to specify all connection details on a service profile and connect directly to the service. Routing through API ML is not required.

### Targeting a specific LPAR

If there are multiple instances of API ML at your site and want to target a specific LPAR, or if you want to connect to a specific instance of a service that is registered to API ML, use the `--base-path` option.

The following is an example of a base path for a REST request directly to z/OSMF (not through API ML):

```
https://mymainframehost:port/zosmf/restjobs/jobs
```

The following is an example of a base path for an API ML instance named `api/v1/zosmf1)`):

```
https://myapilayerhost:port/api/v1/zosmf1/zosmf/restjobs/jobs
```

When you create a profile or issue a command, you can specify the base path of the API ML instance that you want to access. The following example illustrates creating a profile that connects to z/OSMF through API ML with the base path `my/api/layer`:

```
zowe profiles create zosmf myprofile --host host123 --port port123 --user ibmuser --password pass123 --base-path my/api/layer
```

### Accessing all services through APIML SSO

<!-- you have a base profile, token, etc... and 2 services (zosmf and other) registered to apiml. You log in once and can immediately issue commands to either service using your session. -->

### Accessing services through APIML SSO + one service through APIML but not SSO

<!-- You log in and are connected w/ a session to zosmf + maybe another service through APIML, but then also issue separate commands to a service registered to apiml-->

### Accessing services through APIML SSO + one service not through APIML

<!-- You log in and are connected w/ a session to zosmf + maybe another service through APIML, but then also issue separate commands directly to a service. -->

### Accessing services not through APIML

<!-- I think this is already covered by our Issuing Commands, and Creating and Using Base Profiles sections. We also previously described that APIML integration is not required. Plan to delete this heading.  -->

## Working with certificates

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

## Using Environment Variables

You can define environment variables to execute commands more efficiently. Store a value such as your password in an environment variable, then issue commands without specifying your password every time. The term environment can refer to your operating system, container environment, or automation server such as Jenkins.

You might want to assign a variable in the following scenarios:

  - **Store a value that is commonly used.**

    For example, you might want to specify your mainframe username as an
    environment variable. Now you can issue commands and omit the `--username` option, and Zowe CLI automatically uses the value that you defined in the environment variable.

  - **Override a value in existing profiles.**

    For example, you might want to override a value that you previously defined in multiple profiles to avoid recreating each profile. Specify the new value as a variable to override the value in profiles.

  - **Secure credentials in an automation server or container**

    You can set environment variables for use in scripts that run in your CI/CD pipeline. For example, can define environment variables in Jenkins so that your password is not seen in plaintext in logs. You can also define sensitive information in the Jenkins secure credential store.

### Formatting environment variables

Transform an option into the proper format for a Zowe CLI environment variable, then define values to the new variable. The following rules apply to the transformation:

  - Prefix environment variables with `ZOWE_OPT_`.
  - Convert lowercase letters in arguments/options to uppercase letters.
  - Convert hyphens in arguments/options to underscores.

**Tip:**  See your operating system documentation for information about how to set and get environment variables. The procedure for setting environment variables varies between Windows, Mac, and various versions of Linux.

**Examples:**

The following table provides examples of command-line options and the resulting environment variable to which you can define a value:

| Command Option          | Environment Variable           | Use Case   |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--user`                | `ZOWE_OPT_USER`                | Define your mainframe username to an environment variable to avoid specifying it on all commands or profiles.                           |
| `--reject-unauthorized` | `ZOWE_OPT_REJECT_UNAUTHORIZED` | Define a value of `true` to the `--reject-unathorized` flag when you always require the flag and do not want to specify it on all commands or profiles. |

#### Setting environment variables in an automation server

You can use environment variables in an automation server, such as Jenkins, to write more efficient scripts and make use of secure credential storage.

You can either set environment variables using the `SET` command within your scripts, or navigate to **Manage Jenkins \> Configure System \> Global Properties** and define an environment variable in the Jenkins GUI. For example:

![jenkins gui](../images/guides/CLI/envVarsJenkins.png)

## Setting CLI log levels

You can set the log level to adjust the level of detail that is written to log files:

**Important\!** Setting the log level to TRACE or ALL might result in "sensitive" data being logged. For example, command line arguments will be logged when TRACE is set.

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- |------- | ------- |
| `ZOWE\_APP\_LOG\_LEVEL`        | Zowe CLI logging level            | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |
| `ZOWE\_IMPERATIVE\_LOG\_LEVEL` | Imperative CLI Framework logging level | Log4JS log levels (OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL) | DEBUG   |

## Setting the CLI home directory

You can set the location on your computer where Zowe CLI creates the *.zowe* directory, which contains log files, profiles, and plug-ins for the product:

| Environment Variable | Description | Values | Default |
| ---------------------- | ----------- | ------ | ------- |
| `ZOWE\_CLI\_HOME`  | Zowe CLI home directory location | Any valid path on your computer | Your computer default home directory |
