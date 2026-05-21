# Issue #3955: ZWEL0072E is undocumented

**URL:** https://github.com/zowe/docs-site/issues/3955

**Created:** 2024-10-16T13:15:13Z

**Updated:** 2025-03-14T14:06:17Z

**Labels:** area: install and config, release: V3, Size: S

---

Error message ZWEL0072E  from the Zowe launcher is undocumented at https://docs.zowe.org/stable/troubleshoot/launcher/launcher-error-codes

Example: `ERROR ZWEL0072E Launcher Could not load configurations`

## Validation Status: ✅ RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue IS addressed. ZWEL0072E is now documented.

**Current State:** 
- `docs/troubleshoot/launcher/launcher-error-codes.md:787` contains documentation for ZWEL0072E
- The entry includes:
  - Message: "Launcher could not load configurations"
  - Reason: "Launcher could not load the configurations."
  - Action: "Review the configuration entries."

**Recommendation:** While the error code is now technically documented, the documentation is minimal and could be improved with:
- More specific reasons for why configurations might fail to load (e.g., syntax errors, missing files, permission issues)
- Specific configuration files to check (zowe.yaml, instance directory configs, etc.)
- Log locations to review for more details
- Common solutions to configuration loading problems
