# Issue #3775: Issue with docs.zowe.org/stable/whats-new/release-notes/v2_12_0

**URL:** https://github.com/zowe/docs-site/issues/3775

**Created:** 2024-07-19T11:45:36Z

**Updated:** 2025-03-14T14:14:28Z

**Labels:** area: install and config, release: V2, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
The issue is not documented for V2.12 and above for customers using TLS1.2 need to override 

## Pages to Update
Need to update the below-known issue in doc, to all the versions above V2.12, it's available only in the release notes.

**ZSS**
ZSS now defaults to using TLS 1.3, which requires a minimum of zOS Version 2.4. ([#646](https://github.com/zowe/zss/pull/646))
Added configuration parameter components.zss.agent.https.maxTls to control which level of TLS to use, allowing downgrading to tls 1.2 if desired with value TLSv1.2. ([#654](https://github.com/zowe/zss/pull/654))
Added configuration parameter components.zss.agent.https.trace which can be set to true if desired to capture a GSK trace, which will be put into the log directory. ([#654](https://github.com/zowe/zss/pull/654))



## Expected behavior
<!--Users should be able to debug and find the doc easily for this known issue-->


