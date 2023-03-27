# Using Zowe CLI

In this section, learn about how to use Zowe CLI, including connecting to the mainframe, managing profiles, integrating with API Mediation Layer, and more.

You can use the CLI interactively from a command window on any computer on which it is installed, or run it in a container or automation environment.

**Tip:** If you want to use the CLI together with a screen reader to provide accessibility, we recommend using the Mac™ Terminal application enabled for Accessibility through [System Preferences > Accessibility](https://support.apple.com/zh-sg/guide/terminal/trml1020/mac). On Windows™, adjust the Properties settings in Command Prompt. For other operating systems, or for alternative terminals, check the specification for the terminal to ensure that it meets accessibility requirements.

## Supported operating systems and package/resource managers: 

### Operating systems

- MacOS 11 (Big Sur), 12 (Monterey)
- Unix-like:
   - [CentOS](https://www.centos.org/) 8+

   - [RHEL](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) 8+
   - [Ubuntu](https://ubuntu.com/) 20.04+

- Windows 10+
- [z/OS Unix Systems Services](https://www.ibm.com/docs/en/zos/2.4.0?topic=descriptions-zos-unix-system-services) <sup>*</sup>


    **\*** Zowe CLI does not support secure credential storage in this environment.
    
    **Note:** [Node.js is required on z/OS](../user-guide/systemrequirements-zos#nodejs) before installing Zowe CLI.

### Package/resource managers:

- [NodeJS](https://nodejs.org/en)


- [npm](https://www.npmjs.com/) 6+
- [PnPM](https://pnpm.io/)
- [Yarn](https://yarnpkg.com/)
