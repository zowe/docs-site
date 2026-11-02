---
sidebar_label: "Breaking Changes in Zowe V2 and Zowe\u00A0V3"
---

# Breaking Changes in Zowe V2 and Zowe V3

Upcoming Zowe releases will have breaking changes. Normally, the Zowe community makes breaking changes only at major release boundaries, so you can upgrade to the latest minor or patch version of Zowe without disrupting a stable environment. To address security risks, we are making an exception to that practice in Zowe V2 and Zowe V3.

:::info
This page covers breaking changes made to address security risks in Zowe V2 and V3 minor and maintenance releases. For the changes introduced with the Zowe V3 major release, see [Important updates in Zowe V3](../whats-new/breaking-changes-v3.md).
:::

## Why we are making breaking changes

The Zowe community is responding to a growing number of new security reports produced with the help of frontier AI models. Those same models can also be used by capable attackers to find and exploit weaknesses. In this environment, we've determined that keeping insecure behavior in place to avoid breaking changes would leave too many Zowe users at risk. Where a security fix requires a change in behavior, we will make that change even if it is not backward compatible.

## How we are making these changes easier to manage

We aim to make every breaking change as easy to adopt as possible:

- **Every breaking change is listed in the Zowe release notes** on docs.zowe.org. For more information, see [Where to find breaking changes](#where-to-find-breaking-changes).
- **Some breaking changes include additional documentation** that describes the change and how to adapt to it.
- **Opt-outs are available where possible.** We provide opt-out feature flags and configuration settings that let you keep the prior behavior, letting you enable breaking changes in smaller, manageable steps.

## Adapt to the change instead of opting out

We strongly recommend that you adapt to each breaking change rather than disable it.

Opt-outs are a quick way to avoid disruption while you plan your adoption. Do not use opt-outs as long-term settings. An opt-out restores the behavior that the breaking change was designed to remove, and leaves your environment exposed to the risk that the change addresses.

If you use an opt-out, we recommend that you:

1. Record where and why the opt-out is set.
2. Plan the changes needed in your environment to adopt the new behavior.
3. Remove the opt-out as soon as your environment is ready.

## Where to find breaking changes

Breaking changes were first introduced in the Zowe client 3.6.0 release, and upcoming Zowe V2 and Zowe V3 releases will include more. Before you upgrade, review the [Zowe release notes](../whats-new/release-notes/release-notes-overview.md) for the release you are upgrading to. Breaking changes are marked with a **breaking change** label.

Known upcoming releases with breaking changes include:

- Zowe server 3.6.0
- Zowe client 3.7.0
- Zowe 2.18.7
