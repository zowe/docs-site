# Issue #2714: Document the upgrade path between minor versions

**URL:** https://github.com/zowe/docs-site/issues/2714

**Created:** 2023-03-09T13:39:28Z

**Updated:** 2025-03-14T14:22:58Z

**Labels:** area: zos-install-upgrade, release: V3, Size: L

---

This issue is linked to the https://github.com/zowe/zowe-install-packaging/issues/3315 

The problem is that users occasionally run into problems when upgrading the zowe versions. In general there should be no problem as we shouldn't introduce breaking changes, but we still want to document how to get most out of the new version. 

We should prepare a page which would explain how you migrate from version - 1 to version. There should be one page per major version. 

## Validation Status: ✅ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. There is extensive upgrade documentation available:
- `docs/user-guide/upgrade-zos.md` - Main upgrade guide with detailed migration instructions from various Zowe versions (v2.18.x, v2.16.0, v2.15.0, v2.10.0, v2.9.0, v2.3.0, and v1)
- `docs/whats-new/zowe-v3-migration.md` - Comprehensive V3 migration guide
- `docs/whats-new/upgrade-from-convenience-build-to-pswi-smpe.md` - Convenience build to PSWI/SMP/E upgrade guide

**Current State:** Documentation exists covering upgrade paths from multiple previous versions to current versions. Each section in the upgrade guides details specific changes, configuration updates, and migration steps required. However, the documentation is not organized as "one page per major version" as originally requested. Instead, version-specific migration information is grouped within comprehensive upgrade guides.

**Recommendation:** The existing documentation provides substantial coverage of upgrade paths. To fully address the issue, consider reorganizing into separate pages per major version (v2 to v3, v3 to v4, etc.) for better discoverability and easier maintenance.
