# Ways to connect to the mainframe

:::info Required role: system administrator
:::


## Determining your connection protocol

There are several ways to connect to the mainframe, each offering its own advantages. Deciding which type of connection to use — FTP, SSH, or z/OSMF — ultimately depends on what works best with your mainframe environment. Consult your system administrator to determine the best path for you.

### FTP

File Transfer Protocol (FTP) is a basic protocol that follows a standard set of rules to upload, download, or transfer data between your local computer and the mainframe. FTP sends data only over plain text in either ASCII or binary transfer modes, resulting in limitations that can expose sensitive information and restrict the type of data that can be transferred.

FTP is solely for accessing or modifying resources. FTP does not support console, TSO, or system operations. 

You can authenticate only with basic authentication when using FTP.

It is not recommended to use FTP unless you are using File Transfer Protocol Secure (FTPS), an FTP extension that uses Transport Layer Security (TLS) encryption to protect your data. Note that FTPS is different from SFTP (SSH File Transfer Protocol), which is a way to encrypt FTP traffic over SSH.

To use FTP with Zowe CLI, see the [IBM z/OS FTP Plug-in for Zowe CLI](../user-guide/cli-ftpplugin.md) documentation. To use FTP with Zowe Explorer, see the [Zowe Explorer for IBM z/OS FTP](../user-guide/ze-ftp-using-ze-ftp-ext.md) documentation. To learn about FTPS, see the IBM documentation on [File Transfer Protocol](https://www.ibm.com/docs/en/zos/3.2.0?topic=reference-file-transfer-protocol).

### SSH

SSH (Secure Shell) is a cryptographic network protocol that offers a quick way to get started with Zowe client applications.

Use SSH to connect to the mainframe without having to configure a service such as z/OSMF.
If you have a z/OS user account, for example, and SSH is enabled for that system, then you can easily access your z/OS UNIX resources over SSH.

SSH supports basic authentication and public/private key authentication.

:::note 

The SSH daemon (SSHD) that is used on the mainframe server to accept client connections has to be enabled on that LPAR/system. If you do not have SSHD running on one of the LPARs, you cannot connect to that system using SSH.

:::

To use SSH with Zowe Explorer, see the [Zowe Remote SSH](ze-configuring-zowe-remote-ssh.md) documentation. To keep track of updates to functionality as ZRS develops, see the [Zowe Remote SSH functionality](../user-guide/zowe-remote-ssh.md) documentation.

### z/OSMF

Part of IBM z/OS, z/OSMF (IBM z/OS Management Facility) is a web browser-based graphical interface and REST API framework that offers a way to communicate with the mainframe.

To use z/OSMF, a system administrator must configure and enable the service on the mainframe. When configured, z/OSMF is a common way for users to access mainframe resources.

z/OSMF is accessible over a REST API and can be registered as a service with [API Mediation Layer](../appendix/zowe-glossary.md#zowe-api-mediation-layer-api-ml). z/OSMF supports basic authentication and certificate authentication. When using API ML, you can authenticate using a token.

:::note 

Starting in z/OS v3.1, z/OSMF is no longer set up in z/OS by default.

:::


To use z/OSMF, see the [IBM z/OS Management Facility](https://www.ibm.com/products/zos/management-facility) documentation.
