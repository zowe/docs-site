# Troubleshooting Zowe CLI

## Problem

Zowe&trade; CLI is experiencing a problem. You need to collect information that will help you resolve the issue.

### Environment

These instructions apply to Zowe CLI installed on Windows, Mac OS X, and Linux systems as a standalone installation via a Zowe download or an NPM registry.

## Before reaching out for support

1. Is there already a GitHub issue (open or closed) that covers the problem? Check [CLI Issues](https://github.com/zowe/zowe-cli/issues).
2. Review the current list of [Known issues](known-cli.md) in documentation. Also try searching using the Zowe Docs search bar.

## Resolving the problem

Collect the following information to help diagnose the issue:

- Zowe CLI version installed.
- List of plug-ins installed and their version numbers.
- Node.js and NPM versions installed.
- List of environment variables in use.

For instructions on how to collect the information, see [Gathering information for Zowe CLI](mustgather-cli.md).

The following information is also useful to collect:

- If you are experiencing HTTP errors, see [z/OSMF troubleshooting](zosmf-cli.md) for information to collect.
- Is the CLI part of another Node application, such as VSCode, or is it a general installation?
- What operating system and version are you running?
- What shell/terminal are you using (bash, cmd, powershell, etc...)?
- Which queue managers are you trying to administer, and on what systems are they located?
- Are the relevant API endpoints online and valid?
- Are you running in daemon mode?