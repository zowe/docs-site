# Troubleshooting

To isolate and resolve Zowe&trade; problems, you can use the troubleshooting and support information.

## Known problems and solutions

Some common problems with Zowe are documented, along with their solutions or workarounds. If you have a problem with Zowe installation and components, review the problem-solution topics to determine whether a solution is available to the problem that you are experiencing.

You can also find error messages and codes, must-gathers, and information about how to get community support in these topics.

- [Troubleshooting Zowe z/OS component installation](troubleshoot-zos.md)
- [Troubleshooting API Mediation Layer](troubleshoot-apiml.md)
- [Troubleshooting Zowe Application Framework](./app-framework/app-troubleshoot.md)
- [Troubleshooting z/OS Services](troubleshoot-zos-services.md)
- [Troubleshooting Zowe CLI](./cli/troubleshoot-cli.md)

## Collecting data for Zowe problems

Sometimes you cannot solve a problem by troubleshooting the symptoms. In such cases, you must collect diagnostic data. To collect diagnostic data about Zowe, see [Capturing diagnostics to assist problem determination](troubleshoot-diagnostics.md). 

## manifest.json

To see the release number of Zowe look at the `manifest.json` file.  This is included in the top level directory of where a Zowe convenience build is expanded to, see [Installing Zowe runtime from a convenience build](../user-guide/install-zowe-zos-convenience-build.md), the top level directory of a Zowe runtime `<ROOT_DIR>`, and for a Zowe instance directory `<INSTANCE_DIR>/workspace`, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md)


To see the version of a Zowe release use the Unix grep command in a directory containing a `manifest.json` file.


