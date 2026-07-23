# Backout to revert to a previous Zowe version

Follow the best practices outlined in this article if you have performed a [Zowe server-side upgrade](./upgrading-zowe.md) but wish to revert to a previous version of Zowe.

:::info Required role: system programmer
:::

:::caution Important:
Zowe cannot be reverted while running. [Stop Zowe](../user-guide/start-zowe-zos.md) before proceeding with reverting to a previous version.
:::

Review the [Server data sets reference](../appendix/server-datasets.md) for the list of all data sets and Unix folders used by Zowe.
All the data sets and directories must be consistent with a single version of Zowe. To perform a backout, restore all such data sets and files to that version.

Some Zowe YAML properties are only applicable to a more recent version of Zowe. As some properties may be unknown to older versions of Zowe, schema validation errors may result when combining properties from different versions. We recommend you restore the Zowe YAML to match the version of Zowe you are restoring.
