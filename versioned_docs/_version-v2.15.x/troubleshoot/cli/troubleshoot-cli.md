# Troubleshooting Zowe CLI

## When there is a problem

If Zowe&trade; CLI is experiencing a problem, there are steps you can take to find a potential solution.

### Applicable environments

These instructions apply to Zowe CLI installed on Windows, Mac OS X, and Linux systems as a standalone installation via a Zowe download or an NPM registry.

### Reaching out for support

1. Is there already a GitHub issue (open or closed) that covers the problem? Check [CLI Issues](https://github.com/zowe/zowe-cli/issues).

2. Review the current list of [Known Zowe CLI issues](known-cli.md) in documentation. Also try searching using the [Zowe Docs](https://docs.zowe.org/) **Search** bar.

### Resolving the problem

Collect the following information to help diagnose the issue:

- Zowe CLI version installed.
- List of plug-ins installed and their version numbers.
- Node.js and NPM versions installed.
- List of environment variables in use.

For instructions on using commands to collect this information, see [Gathering information to troubleshoot Zowe CLI](mustgather-cli.md) or [Using individual commands for troubleshooting](use-individual-troubleshoot-commands).

The following information is also useful to collect:

- If you are experiencing HTTP errors, see [z/OSMF troubleshooting](zosmf-cli.md) for information to collect.
- Is the CLI part of another Node application, such as VSCode, or is it a general installation?
- Which queue managers are you trying to administer, and on what systems are they located?
- Are the relevant API endpoints online and valid?
