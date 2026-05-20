# Issue #2705: Have one place for compatibility and features support for Zowe.

**URL:** https://github.com/zowe/docs-site/issues/2705

**Created:** 2023-03-08T10:37:49Z

**Updated:** 2025-07-23T08:44:33Z

**Labels:** area: install and config, release: V3, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. There is no single, centralized page covering key features and platform compatibility information for Zowe.

**Current State:**
- Information about features (MFA, SSO, HA) is scattered across multiple documentation pages
- Platform support information (IPv6, Java versions, Node versions) is in various locations
- No consolidated compatibility matrix or feature support page exists
- Users must search through multiple documents to find compatibility information

**Missing:** A centralized page that covers:
- Key features across all Zowe components (MFA, SSO, HA, etc.)
- Platform support matrix (IPv6, Java 11/17, Node versions, etc.)
- Clear indication of which features are available in which versions

**Recommendation:** This issue remains valid. Creating a centralized compatibility and features support page would improve user experience and make it easier to find this important information.

---

Create a page that will cover the relevant key features across the whole Zowe and the support for platform-like information. 

Examples of key features cover: 
- Multi-Factor Authentication
- Single Sign On
- High Availability

Example of platform-like information: 
- IPv6
- Java 11, 17, ...
- Node version ...

This requires the identification of such key features that need to be done on either ZAC or TSC level. Afterwards we need to find a right place to put the information and find out a process to make sure we continue keeping this page current. 
