# Troubleshooting Zowe CLI plug-ins

## When there is a problem

If a plug-in for Zowe&trade; CLI is experiencing a problem, there are steps you can take to find a potential solution.

### Error codes

For help with error codes from a back-end vendor, refer to the vendor’s help documentation.

### IBM Db2 Database Plug-in fails to install on Windows with Node 18.16.0

**Symptom:**

IBM Db2 Database Plug-in for Zowe CLI fails to install in environments running with Node 18.16.0.

After Db2 is installed and validation is complete, Zowe CLI returns the following error:

```
$ zowe plugins install db2-for-zowe-cli.tgz
Plug-ins within the Imperative CLI Framework can legitimately gain
control of the zowe CLI application during the execution of every command.
Install 3rd party plug-ins at your own risk.

Registry = https://registry.npmjs.org/

_______________________________________________________________
Installed plugin name = '@zowe/db2-for-zowe-cli'

_____ Validation results for plugin '@zowe/db2-for-zowe-cli' _____

*** CmdError: Failed to combine command definitions. Reason = Encountered an error loading one of the files (cli/call/Call.definition.js) that matched the provided command module glob for the glob function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}: \\?\C:\Users\runneradmin\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\Release\odbc_bindings.node is not a valid Win32 application.
\\?\C:\Users\runneradmin\.zowe\plugins\installed\node_modules\@zowe\db2-for-zowe-cli\node_modules\ibm_db\build\Release\odbc_bindings.node

This plugin has command errors. No plugin commands will be available.
```

When Db2 plug-in commands are run subsequently, an error displays that includes following message:

```
Command Error:
Command failed due to improper syntax
```

**Solution:**

1. Uninstall Node.js 18.16.x.
2. Install [Node.js 18.15.x](https://nodejs.org/download/release/v18.15.0/).
3. Re-install [IBM Db2 Database Plug-in for Zowe CLI](../../user-guide/cli-db2plugin.md#installing).

### Reaching out for support

1. Is there already a GitHub issue (open or closed) that covers the problem? Check the following repositories: 

    - [IBM CICS Plug-in issues](https://github.com/zowe/zowe-cli-cics-plugin/issues)
    - [IBM Db2 Database Plug-in issues](https://github.com/zowe/zowe-cli-db2-plugin/issues).
    - [IBM IMS Plug-in issues](https://github.com/zowe/zowe-cli-ims-plugin/issues)
    - [IBM MQ Plug-in issues](https://github.com/zowe/zowe-cli-mq-plugin/issues)
    - [IBM z/OS FTP Plug-in issues](https://github.com/zowe/zowe-cli-ftp-plugin/issues)

    If there is no issue on the problem, file an issue in the repository for the respective plug-in so the dev team can review it.

2. Try searching for the issue using the [Zowe Docs](https://docs.zowe.org/) **Search** bar.

3. Use [the Zowe CLI Slack channel](https://openmainframeproject.slack.com/archives/CC8AALGN6) to reach the Zowe CLI community for assistance.
