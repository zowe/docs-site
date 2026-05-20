# Issue #2968: (Zowe Server Install Study) Establish System, Config, Environment Best Practices

**URL:** https://github.com/zowe/docs-site/issues/2968

**Created:** 2023-06-30T11:03:18Z

**Updated:** 2025-03-14T15:01:57Z

**Labels:** area: install and config, release: V3, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. There is no consolidated best practices article for Zowe server-side installation and configuration.

**Current State:**
- No dedicated "Best Practices" page exists for Zowe server installation
- Installation information is spread across multiple documents:
  - `docs/user-guide/installandconfig.md`
  - `docs/user-guide/configure-zos-system.md`
  - Various component-specific configuration guides
- No consolidated guidance on:
  - Using SSH vs ishell
  - API ML one-time, one-place installation pattern
  - Security, zFS, mount points configuration
  - ZIS/ZSS for certificates
  - Multi-service configuration
  - Diagram of full Zowe environment

**Recommendation:** This issue remains valid. Creating a best practices guide based on the installation study findings would help users avoid common pitfalls.

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

