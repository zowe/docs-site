# Issue #2545: Specific documentation for installing on LPAR1 and what to copy across and share with other LPARs 

**URL:** https://github.com/zowe/docs-site/issues/2545

**Created:** 2022-12-12T09:43:20Z

**Updated:** 2025-03-14T14:46:23Z

**Labels:** type: enhancement, area: zos-install-upgrade, release: V3, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. There is no specific documentation for installing on LPAR1 and copying/sharing with other LPARs.

**Current State:**
- Some LPAR-related information exists in the documentation:
  - `docs/user-guide/installandconfig.md` mentions sharing workspace and configuration in Sysplex
  - References to shared file systems (zFS) for multi-LPAR access
- However, no step-by-step guide for:
  - Installing on LPAR1
  - What files to copy to other LPARs
  - What to share vs. what to keep separate
  - Configuration for clone/peer LPARs

**Missing:** Specific documentation on multi-LPAR installation pattern including:
- Step-by-step installation on first LPAR
- List of files/directories to copy to other LPARs
- Shared configuration requirements
- Management across LPARs

**Recommendation:** This issue remains valid. Specific documentation for multi-LPAR installations would help customers deploying Zowe across multiple LPARs.

---

When a customer installs on two LPARs they want instructions for how to copy across and share files so that it's a shared install and configure with management across the different LPARs that recognize they're clones of each other,  
