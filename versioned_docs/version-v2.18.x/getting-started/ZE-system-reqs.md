# Zowe Explorer System Requirements

Before installing Zowe Explorer, make sure that you meet the following requirements.

## Client side requirements

### Operating systems


- MacOS 10.15 (Catalina), 11 (Big Sur), 12 (Monterey)
- Unix-like:
   - [CentOS](https://www.centos.org/) 8+
   - [RHEL](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) 8+
   - [Ubuntu](https://ubuntu.com/) 20.04+
- Windows 10+

### Integrated development environments: 

- [VS Code](https://code.visualstudio.com/) 1.53.2+
- [Eclipse Che](https://www.eclipse.org/che/)
- [Red Hat CodeReady Workspaces](https://www.redhat.com/en/technologies/jboss-middleware/codeready-workspaces)
- [Theia](https://theia-ide.org/) 1.18+

   - Zowe Explorer is compatible with Theia 1.18.0 or higher. However, we recommend using a [Theia community release](https://theia-ide.org/releases/) as Zowe Explorer could experience possible unexpected behaviors with the latest Theia releases.

## Server side requirements

- IBM z/OSMF is configured and running.
	- Minimally, an instance of IBM z/OSMF must be running on the mainframe before you can run Zowe Explorer successfully.
    - z/OSMF enables the core capabilities, such as retrieving data sets, executing TSO commands, submitting jobs, and more.
    
- Applicable plug-in services are configured and running on the mainframe.
    - Plug-ins communicate with various mainframe services. The services must be configured and running on the mainframe before issuing plug-in commands.
        * See [Zowe Explorer CICS Extension system requirements](../user-guide/ze-using-zowe-explorer-cics-ext#system-requirements).
        * See [Zowe Explorer FTP Extension system requirements](../user-guide/ze-ftp-using-ze-ftp-ext#system-requirements).
