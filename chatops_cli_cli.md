# IBM Z ChatOps Commands

IBM Z® ChatOps commands provide a simple and streamlined way to interact with IBM Z ChatOps.

## Command Structure

Most IBM Z ChatOps commands should adhere to the following complete form.

Form:

```

1  @*botname*
2.1 resource
1  action
1?  object?  positional_arguments?  options
```



Example: `@bnz automation-domain list system AOBC --domain-name “LPAR400J INGXSGSA”`

|Segment|Description|Notes®|
|-------|-----------|------|
|`@botname`|The name of the bot user that is notified to perform the Z ChatOps commands, for example, `bnz`.|`@bnz` is used for all example commands in this guide.|
|`resource`|The target resource that you want the bot user to operate on, for example, `automation-domain`. Each resource contains a set of actions. The current version supports the following resources.

-   [default](chatops_cli_default.md)
-   [credential-store](chatops_cli_cs.md)
-   [teps-server \| ts](chatops_cli_ts.md)
-   [event](chatops_cli_event.md)
-   [cicsplex \| cp](chatops_cli_cp.md)
-   [cicsregion \| cr](chatops_cli_cr.md)
-   [db2](chatops_cli_db2.md)
-   [lpar](chatops_cli_lpar.md)
-   [network](chatops_cli_network.md)
-   [storage-group \| sg](chatops_cli_sg.md)
-   [storage-volume \| sv](chatops_cli_sv.md)
-   [ims](chatops_cli_ims.md)
-   [jvm](chatops_cli_jvm.md)
-   [mq](chatops_cli_mq.md)
-   [automation-domain \| ad](chatops_cli_ad.md)
-   [system](chatops_cli_system.md)
-   [automation-resource \| ar](chatops_cli_ar.md)
-   [netview-domain \| nd](chatops_cli_nd.md)
-   [command](chatops_cli_command.md)
-   [engine](chatops_cli_engine.md)
-   [workstation](chatops_cli_workstation.md)
-   [job-stream \| js](chatops_cli_js.md)
-   [job](chatops_cli_job.md)
-   [critical-job \| cj](chatops_cli_cj.md)

|Resource is required for commands. All available resources are listed here. You can use either the complete resource name or the abbreviation, for example, `ad` or `automation-domain`.|
|`action`|The target operation that you want the bot user to perform, for example, `list`.|Action is required for commands.|
|`object`|The target property that you want the bot user to operate on, for example, `system`.|You can use either the complete object name or the abbreviation.|
|`positional argument`|The name, ID, or other properties that are used to tell the bot user to operate on one specific resource, for example, `AOBC`, the name of one system.|**\*** is a wildcard character that you can use to search for resource with certain characters in its property. **\*** represents zero or more characters in a string of characters.

You can place the wildcard character **\*** at the beginning, the end, or both the beginning and the end of the command positional argument.

|
|`options`|The additional properties of a resource that you want the bot user to filter out, for example, `--domain-name “LPAR400J INGXSGSA”` specifies the target domain.|1.  When the `object` is status and there is no positional argument specified for this type of command, the `object` status can be omitted in the command, and Z ChatOps will list the status of your specified resource.
2.  When there is a space character in the value name, you must use quotation marks to quote the value name as shown in the example.
3.  Some options are required, and some are optional. All required options must be specified, or else the bot doesn’t know which resource you want to operate on.
4.  For some commands, there can be numerous results. Z ChatOps will return the found results of a certain number which you can configure in the configuration file at $ZCHATOPS\_HOME/config/bnz-server.yaml. If you have additional requirements on the number of returned results, you can always add the option `--limit number`, where number is a positive integer.

|

**Note:** If you use Slack client on a Mac operating system, when you use quotation marks to quote some strings containing spaces, the single and double quotation marks in English are auto-converted to non-English ones when you type any non-space character behind them, so that Z ChatOps cannot parse the command. You must change the default keyboard setting on your Mac with the following steps.

1.  Click **System Preferences**.
2.  Click **Keyboard** and the **Keyboard** window opens.
3.  Click **Text** tab and clear the check box **Use smart quote and dashes** as shown in the picture.

    ![Clear default check box for keyboard](bnz_keyboard_uncheck.png "Keyboard
    clear")


