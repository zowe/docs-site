# Backout Procedure

:::note
Zowe cannot be reverted while it is running. You should [Stop Zowe](./start-zowe-zos.md) before proceeding.
:::
:::info Required role: system programmer
:::


If you have performed a [Zowe Server-side Upgrade](./upgrade-zos.md) but you want to revert to an older version, then you can use the steps listed in this document.

The [Server data sets reference](../appendix/server-datasets.md) lists data sets and unix folders used by Zowe.
All of the data sets and directories must be consistent with a single version of Zowe, so if you are performing a backout, you will want to restore all such data sets and files to that version.

Because some Zowe YAML properties meant for a newer version of Zowe may be unknown to older versions of Zowe in ways that cause schema validation errors, it is best to restore the Zowe YAML to match the version of Zowe you are restoring.
