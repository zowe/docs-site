# Issue #2847: Add "Latest" option to version picker

**URL:** https://github.com/zowe/docs-site/issues/2847

**Created:** 2023-04-28T12:17:52Z

**Updated:** 2025-03-14T14:23:14Z

**Labels:** type: enhancement, area: site-infrastructure, Size: M

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The version picker on docs.zowe.org does not have a "Latest" option.

**Current State:**
- The version picker remembers the last selected version
- When visiting docs.zowe.org, it defaults to the last manually selected version
- No "Latest" or "Stable" option exists in the version picker
- Users must manually select the newest version from the dropdown

**Impact:** Users who previously selected an older version (e.g., v2.7.x) will continue seeing that version even after newer versions are released, unless they manually change it.

**Recommendation:** This issue remains valid. Adding a "Latest" option would improve user experience by ensuring users always see the most current documentation by default.

---

A few days ago I used the version picker to switch back and forth between multiple versions. The final version I selected was "v2.7.x" which was the latest version at the time.

![image](https://user-images.githubusercontent.com/22344007/235144390-6096d008-e957-4838-bd34-bdf2b0797feb.png)

Today, I went to docs.zowe.org and saw that "v2.7.x" was still selected because it remembered the version I had most recently picked.
If there was a "Latest" option in the version picker, it could have automatically switched to "v2.8.x" which is now the latest version.
