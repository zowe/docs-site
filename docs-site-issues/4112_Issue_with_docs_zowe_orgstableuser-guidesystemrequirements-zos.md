# Issue #4112: Issue with docs.zowe.org/stable/user-guide/systemrequirements-zos/

**URL:** https://github.com/zowe/docs-site/issues/4112

**Created:** 2025-02-01T17:11:48Z

**Updated:** 2025-03-14T12:30:55Z

**Labels:** type: enhancement, area: install and config, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

This page does not clearly tell me what the pre-reqs are. It mentions z/OS levels, then Capacity issues,  then back to node.js

It would be clearer to have 

## required levels of software
- z/OS 2.5 or 3.1
- Java IBM® Semeru Runtime Certified Edition for z/OS® version 17
- Node.js ...  give a link to further down

## Optional products
- SDSF

## Disk requirements
- Product libraries
- instance 
- Install
## Machine resources

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status: ✅ CAN BE CLOSED

**Validation Date:** 2026-05-20

**Validator:** Mistral Vibe

**Findings:** The core issue has been RESOLVED. The original complaint was that the page "mentions z/OS levels, then Capacity issues, then back to node.js" - making it confusing with content jumping between different requirement types.

**Current State:**
- Node.js and Java requirements have been moved from `systemrequirements-zos.md` to a dedicated file `install-nodejs-zos.md` (commit b862a38e6, 2025-10-15)
- The `systemrequirements-zos.md` page now focuses ONLY on z/OS-specific requirements:
  - z/OS version support
  - zFS volume space requirements  
  - SDSF, z/OS OpenSSH, Parallel Sysplex (optional features)
  - Mainframe resource consumption
- The content no longer jumps between different topic types on the same page

**Assessment:** The main problem described in the issue has been addressed through content reorganization. The page is now better structured.

**Recommendation:** CLOSE this issue. The reorganization resolves the confusion. Optionally, a cross-link from systemrequirements-zos.md to install-nodejs-zos.md could improve navigation, but this is minor.

