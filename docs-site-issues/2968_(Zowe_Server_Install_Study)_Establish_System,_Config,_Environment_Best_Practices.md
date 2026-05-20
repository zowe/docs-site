# Issue #2968: (Zowe Server Install Study) Establish System, Config, Environment Best Practices

**URL:** https://github.com/zowe/docs-site/issues/2968

**Created:** 2023-06-30T11:03:18Z

**Updated:** 2025-03-14T15:01:57Z

**Labels:** area: install and config, release: V3, Size: L

---

## Is your request for enhancement related to a problem? Please describe.
Zowe install teams are missing a consolidated set of best practices to install/configure Zowe Server side.

## Describe the solution you'd like
Suggested content for the Best Practices article:

- Advise the installer to use SSH over ishell because the former is more interactive.
- Establish the best practice configuration to meet when installing API ML. For example, install API ML one time and in one place, security, zfs, mount pts, ZIS/ZSS for certs, and so on.
- Explain the config required to manage multiple services, not just one.
- Include a diagram showing the full Zowe ENV with highlights for multi-service best practices.

This is a starting point. Once the article is created, more content can be added as and when desired.

## Additional context
This enhancement request comes directly from user feedback received during the Spring 2023 Zowe Server Installation Study which uncovered several common challenges for the Zowe install/config process.

