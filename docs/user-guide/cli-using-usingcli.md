# Using Zowe CLI

In this section, learn about how to use Zowe CLI, including connecting to the mainframe, managing profiles, integrating with API Mediation Layer, and more.

You can use the CLI interactively from a command window on any computer on which it is installed, or run it in a container or automation environment.

:::tip
Text colors could be difficult to read in some terminals. If this is the case, we suggest either adjusting the terminal settings, or setting the `FORCE_COLOR` [environment variable](../user-guide/cli-configuringcli-ev.md#setting-other-environment-variables) to `0`. For other accessibility options, check the accessibility settings for your operating system or terminal.
:::

## Supported CPU architectures, operating systems, and package/resource managers

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
