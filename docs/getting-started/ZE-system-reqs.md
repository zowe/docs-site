# Zowe Explorer system requirements

Before installing Zowe Explorer, make sure that you meet the following requirements.

:::info Required roles: systems administrator, devops architect
:::

## Client side requirements

### Operating systems

- macOS

    :::note

    Only Mac operating system versions supported by Apple.

    :::
- Unix-like:
   - [CentOS](https://www.centos.org/) 8+
   - [RHEL](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) 8+
   - [Ubuntu](https://ubuntu.com/) 20.04+
- Windows 10+

### Integrated development environments: 

- [Red Hat CodeReady Workspaces](https://www.redhat.com/en/technologies/jboss-middleware/codeready-workspaces) 

    :::note

    Secure credentials are not supported in Red Hat CodeReady Workspaces as the keyrings are not unlocked by default.

    :::
- [VS Code](https://code.visualstudio.com/) 1.79.0+

## Server side requirements

- IBM z/OSMF is configured and running.
	- See [z/OSMF REST services for Zowe clients](/user-guide/systemrequirements-zosmf/#zosmf-rest-services-for-the-zowe-cli) for a list of services that need configuration.
    
- Applicable plug-in services are configured and running on the mainframe.
    - Plug-ins communicate with various mainframe services. The services must be configured and running on the mainframe before issuing plug-in commands.
        * See [Zowe Explorer CICS Extension system requirements](../user-guide/ze-using-zowe-explorer-cics-ext#system-requirements).
        * See [Zowe Explorer FTP Extension system requirements](../user-guide/ze-ftp-using-ze-ftp-ext#system-requirements).
