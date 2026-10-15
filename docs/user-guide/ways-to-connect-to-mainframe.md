# Mainframe connection options

:::info Required role: system administrator
:::


## Determining your connection protocol

There are several ways for Zowe client applications to connect to the mainframe, each offering its own advantages. Deciding which type of connection to use — Zowe Remote SSH, z/OSMF, or FTP — ultimately depends on what works best with your mainframe environment. Consult your system administrator to determine the best path for you.


### Zowe Remote SSH (introduced in Zowe v3.6)

SSH (Secure Shell) is a cryptographic network protocol that offers a quick way to get started with Zowe client applications.

Use SSH to connect to the mainframe without having to configure a service such as z/OSMF.
If you have a z/OS user account, for example, and SSH is enabled for that system, then you can easily access your z/OS UNIX resources over SSH.

SSH supports basic authentication and public/private key authentication.

:::note 

The SSH daemon (`sshd`) that is used on the mainframe server to accept client connections has to be enabled on that LPAR/system. If you do not have `sshd` running on one of the LPARs, you cannot connect to that system using SSH.

:::

To use SSH with Zowe Explorer (v3.6 and above), see the [Zowe Remote SSH](ze-configuring-zowe-remote-ssh.md) documentation. To keep track of updates to functionality as ZRS develops, see the [Zowe Remote SSH functionality](../user-guide/zowe-remote-ssh.md) documentation.

### z/OSMF

Part of IBM z/OS, z/OSMF (IBM z/OS Management Facility) is a web browser-based graphical interface and REST API framework that offers a way to communicate with the mainframe.

To use z/OSMF, a system administrator must configure and enable the service on the mainframe. When configured, z/OSMF is a common way for users to access mainframe resources.

z/OSMF is accessible over a REST API and can be registered as a service with [API Mediation Layer](../appendix/zowe-glossary.md#zowe-api-mediation-layer-api-ml). z/OSMF supports basic authentication and certificate authentication. When using API ML, you can authenticate using a token.

To use z/OSMF, see the [IBM z/OS Management Facility](https://www.ibm.com/products/zos/management-facility) documentation.

### z/OS FTP

File Transfer Protocol (FTP) is a basic protocol that follows a standard set of rules to upload, download, or transfer data between your local computer and the mainframe. FTP sends data only over plain text in either ASCII or binary transfer modes, resulting in limitations that can expose sensitive information and restrict the type of data that can be transferred.

FTP is solely for accessing or modifying resources. FTP does not support console, TSO, or system operations. 

You can authenticate only with basic authentication when using FTP.

It is not recommended to use FTP unless you are using File Transfer Protocol Secure (FTPS), an FTP extension that uses Transport Layer Security (TLS) encryption to protect your data. Note that FTPS is different from SFTP (SSH File Transfer Protocol), which is a way to encrypt FTP traffic over SSH.

To use FTP with Zowe CLI, see the [IBM z/OS FTP Plug-in for Zowe CLI](../user-guide/cli-ftpplugin.md) documentation. To use FTP with Zowe Explorer, see the [Zowe Explorer for IBM z/OS FTP](../user-guide/ze-ftp-using-ze-ftp-ext.md) documentation. To learn about FTPS, see the IBM documentation on [File Transfer Protocol](https://www.ibm.com/docs/en/zos/3.2.0?topic=reference-file-transfer-protocol).

## Comparing Zowe Remote SSH, z/OSMF, z/OS FTP

Three common ways to reach mainframe resources (data sets, USS files, jobs, console) from a client tool.

| | Zowe Remote SSH | z/OSMF REST API | z/OS FTP |
| --- | --- | --- | --- |
| Data transfer security | Encrypted by default | Encrypted by default | Plain text unless FTPS is added |
| Resources supported |  Data sets, USS files, jobs, console, TSO | Data sets, USS files, jobs, console, TSO | Data sets, USS files, jobs | Data sets, USS files, jobs |
| Interactive performance | Fast — one persistent connection | Moderate — stateless request per call | Slow — reconnects per transfer |
| Large file transfer | Good, some encoding overhead | Workable, but has known issues with very large files |  Strong, built for bulk transfer |
| Setup effort | Low — deploy binaries over existing SSH access | Higher — needs z/OSMF configured and started | Minimal — usually already running |
| Client tooling | Zowe CLI, Zowe Explorer, Node.js SDK | Zowe CLI, Zowe Explorer, any REST client | Any FTP client or language |
| Best for | Low-latency interactive tooling, no extra mainframe middleware | Standardized REST automation, sites already running z/OSMF | Scripted bulk transfer, legacy integration |
:::note

VSAM record access is not natively supported by any of the three. Console and TSO commands are not available over FTP.

:::




