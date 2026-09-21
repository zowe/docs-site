# Downgrading to a previous Zowe version

Follow the best practices outlined in this article if you have performed a [Zowe server-side upgrade](./upgrade-zowe.md) but wish to downgrade to a previous version of Zowe.

:::info Required roles: system administrator, system programmer
:::

:::caution Important:
Zowe cannot be downgraded while running. [Stop Zowe](../user-guide/start-zowe-zos.md) before proceeding with downgrading to a previous version.
:::

Review the [Server data sets reference](../appendix/server-datasets.md) for the list of all data sets and Unix folders used by Zowe.
All the data sets and directories must be consistent with a single version of Zowe. To downgrade to a previous version, restore all data sets and files that apply to that version.

Some Zowe YAML properties are only applicable to a more recent version of Zowe. As some properties may be unknown to older versions of Zowe, schema validation errors may result when combining properties from different versions. We recommend you restore the Zowe YAML to match the version of Zowe you are downgrading to.
