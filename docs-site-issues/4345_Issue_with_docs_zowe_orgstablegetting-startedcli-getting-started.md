# Issue #4345: Issue with docs.zowe.org/stable/getting-started/cli-getting-started

**URL:** https://github.com/zowe/docs-site/issues/4345

**Created:** 2025-05-03T10:54:46Z

**Updated:** 2025-05-28T11:09:36Z

**Labels:** area: cli

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Please specify what platforms are supported.  For example can  I use the cli from USS on z/OS?

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ⚠️ NEEDS CLARIFICATION

**Validation Date:** 2026-05-21

**Validator:** Mistral Vibe

**Findings:** The issue is **PARTIALLY RESOLVED**. The information exists but is not in the expected location.

**User's Question:**
"Please specify what platforms are supported. For example can I use the cli from USS on z/OS?"

**Current Documentation State:**

1. **`docs/getting-started/cli-getting-started.md`**
   - **Status:** Page has been removed/deprecated
   - **Content:** Only contains a redirect message:
     ```markdown
     The content from this page has been removed.
     See [Installing Zowe CLI](../user-guide/user-roadmap-zowe-cli.md) for instructions on how to install Zowe CLI.
     ```
   - **Issue:** No platform/support information on this page

2. **`docs/user-guide/user-roadmap-zowe-cli.md`** (the redirect target)
   - Focuses on learning resources, blogs, and community
   - **Does NOT** contain platform support information
   - Links to various resources but not to system requirements

3. **`docs/user-guide/systemrequirements-cli.md`** (contains the actual answer)
   - **Line 78-81:** Explicitly addresses z/OS USS support:
     > "Zowe CLI can be installed on an IBM z/OS environment and run under Unix System Services (USS). However, the IBM Db2 plug-in and the Zowe Secrets SDK cannot run on z/OS due to native code requirements. This means that any z/OS credentials display as plain text on a team configuration file. As such, Zowe CLI is *not supported* on z/OS and is currently experimental."
   - **Clear answer:** Yes, you CAN run CLI from USS on z/OS, but it's **NOT officially supported** and is **experimental**
   - **Limitation:** Db2 plug-in and Zowe Secrets SDK don't work on z/OS

**Assessment:**
- **✅ INFORMATION EXISTS:** Platform support information IS documented
- **❌ POOR DISCOVERABILITY:** Information is in systemrequirements-cli.md, not in getting-started/cli-getting-started.md
- **❌ BROKEN LINK:** The getting-started page redirects to user-roadmap-zowe-cli.md which does NOT contain this information

**Specific Gaps:**

| Information | Status | Location | User Expectation |
|-------------|--------|----------|------------------|
| Platform support (Windows, Linux, Mac) | ✅ Exists | systemrequirements-cli.md (line 10-11) | Not in getting-started |
| z/OS USS support | ✅ Exists | systemrequirements-cli.md (line 78-81) | Not in getting-started |
| "Supported platforms" summary | ❌ Missing | Not centralized | Expected in getting-started |

**Recommendation:**
- **CAN BE CLOSED** - If we add a link to system requirements from the getting-started page
- **Action 1:** Restore content to `getting-started/cli-getting-started.md` OR update the redirect
- **Action 2:** Add a "Platform Support" or "System Requirements" section to the CLI getting started/roadmap page
- **Action 3:** At minimum, add a link from user-roadmap-zowe-cli.md to systemrequirements-cli.md
- **Action 4:** Consider adding a summary table of supported platforms at the top of systemrequirements-cli.md

**Impact:**
- **Medium** - Information exists but is hard to find
- **User Experience:** Frustrating - user has to search multiple pages for a simple answer

**Suggested Fix:**
Update `user-roadmap-zowe-cli.md` to add a "System Requirements" section:
```markdown
## System Requirements

Before installing Zowe CLI, ensure your environment meets the requirements:

- **Supported Platforms:** Windows, Linux, Mac
- **z/OS USS:** Can be installed and run, but is **experimental and not officially supported**
  - Limitations: Db2 plug-in and Zowe Secrets SDK do not work on z/OS
  - Credentials display as plain text in team configuration files

For complete system requirements, see [Zowe CLI System Requirements](../user-guide/systemrequirements-cli.md).
```

**Answer to User's Question:**
✅ **YES**, you can use Zowe CLI from USS on z/OS, but with caveats:
- It is **experimental** and **not officially supported**
- The IBM Db2 plug-in will NOT work
- The Zowe Secrets SDK will NOT work  
- z/OS credentials will be stored in plain text in team configuration files

**See Also:**
- Issue may be related to the page restructuring that removed content from cli-getting-started.md

