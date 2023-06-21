# Using Zowe CLI

In this section, learn about how to use Zowe CLI, including connecting to the mainframe, managing profiles, integrating with API Mediation Layer, and more.

You can use the CLI interactively from a command window on any computer on which it is installed, or run it in a container or automation environment.

**Tip:** If you want to use the CLI together with a screen reader to provide accessibility, we recommend using the Mac™ Terminal application enabled for Accessibility through [System Preferences > Accessibility](https://support.apple.com/zh-sg/guide/terminal/trml1020/mac). On Windows™, adjust the Properties settings in Command Prompt. For other operating systems, or for alternative terminals, check the specification for the terminal to ensure that it meets accessibility requirements.

## Profile best practices

According to [order of precedence](https://docs.zowe.org/v1.28.x/user-guide/cli-usingcli/#how-command-precedence-works), base profiles are used as a fallback for service profiles. This means that after you create a base profile, you might need to update your service profiles to remove username, password, host, and port information. Otherwise, commands will use the information stored in your service profile and will ignore your base profile definition.

## Supported CPU architectures, operating systems and package/resource managers

Zowe CLI supports the following CPU architectures:
- x64
- Apple Silicon (M1+) with Rosetta
    - The [IBM Db2 Database Plug-in for Zowe CLI](../user-guide/cli-db2plugin) has limited support on Apple Silicon. To use the Db2 plug-in, a complete re-install of Zowe CLI and CLI plug-ins is required. See [M1 processor installation](../user-guide/cli-db2-install-m1) for information.
### Operating systems

- MacOS 10.15+
- Unix-like:
   - [CentOS](https://www.centos.org/) 8+
   - [Debian](https://www.debian.org/) 11+
   - [RHEL](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) 8+
   - [Ubuntu](https://ubuntu.com/) 20.04+

- Windows 10+ 

### Package/resource managers

- [NodeJS](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) 6+
- [PnPM](https://pnpm.io/)
- [Yarn](https://yarnpkg.com/) 

<br/> 

>Using Zowe CLI on [z/OS Unix Systems Services](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-zos-unix-system-services) is not supported at this time. If you would like to use it on USS in the future, show your interest by voting for the enhancement in the [Zowe CLI GitHub repository](https://github.com/zowe/zowe-cli/issues/1680). 
