# Issue #1875: ZWE4ZFS is optional, but action needed if it is not run

**URL:** https://github.com/zowe/docs-site/issues/1875

**Created:** 2021-10-27T12:01:55Z

**Updated:** 2025-03-14T14:51:39Z

**Labels:** type: bug, area: zos-install-upgrade, release: V3, Size: S

---

## Validation Status: ⚠️ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. The information about ZWE4ZFS being optional and the manual directory creation requirement exists in the documentation, but it's currently in an observer note/comment format rather than clearly presented to users.

**Current State:**
- `docs/user-guide/install-zowe-smpe.md` (line 330) contains an observer note stating: "ZWE4ZFS is optional and it should be indicated in the doc and if you don't run it, you need to run the following Unix commands in USS cd [installdir] mkdir -p usr/lpp/zowe in order to create the required directory."
- The documentation does state ZWE4ZFS is optional (line 337)
- However, the action required if not run is buried in a comment, not in the main user-facing documentation

**Recommendation:** The observer note should be converted into proper user documentation. The information exists but needs to be more visible to users who choose not to run ZWE4ZFS.

**Documentation Location:** `docs/user-guide/install-zowe-smpe.md`

---

The documentation clearly states that ZWE4ZFS is optional. While this is true, we found that if it is not run, directories need to be created manually. This can be achieved by running the following commands in OMVS or an alternative Unix client:

cd [installdir]
mkdir -p usr/lpp/zowe
