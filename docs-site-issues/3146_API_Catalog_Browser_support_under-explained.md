# Issue #3146: API Catalog Browser support under-explained

**URL:** https://github.com/zowe/docs-site/issues/3146

**Created:** 2023-10-06T15:32:43Z

**Updated:** 2025-05-13T09:52:25Z

**Labels:** area: apiml, priority-medium, area: install and config, release: V3, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The API Catalog browser support is still under-explained compared to the Zowe Desktop.

**Current State:**
- `docs/user-guide/address-browser-requirements.md` (line 19) states: "It is recommended to use Google Chrome when accessing the API Catalog of API Mediation Layer. Errors might occur if you access API Catalog with Firefox."
- The same document clearly states Zowe Desktop support: "The Zowe Desktop supports Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Edge releases that are at most 1 year old..."
- The API Catalog section does NOT state what browsers are actually supported, only that Chrome is "recommended" and Firefox "might" have errors

**Missing:** Clear support matrix for API Catalog similar to Zowe Desktop:
- Which browsers are officially supported?
- Which browsers are tested?
- What does "recommended" mean vs "supported"?
- Are Safari and Edge supported for API Catalog?

**Recommendation:** This issue remains valid. The API Catalog browser support should be clearly documented with the same level of detail as the Zowe Desktop browser requirements.

---

Recently, a limitation to the documentation was added:

"It is recommended to use Google Chrome when you are trying to access API Catalog. Errors might occur if you access API Catalog with Firefox."

On the same page, the Desktop says what it supports:

"The Zowe Desktop supports Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Edge releases that are at most 1 year old, except when the newest release is older. For Firefox, both the regular and Extended Support Release (ESR) versions are supported under this rule."

The API catalog is **recommending** a browser, but is not stating what its support actually is.
Does not not support Firefox? Does it support Safari or Edge? It does not say.
