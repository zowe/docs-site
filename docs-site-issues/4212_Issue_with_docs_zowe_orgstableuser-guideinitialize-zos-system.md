# Issue #4212: Issue with docs.zowe.org/stable/user-guide/initialize-zos-system

**URL:** https://github.com/zowe/docs-site/issues/4212

**Created:** 2025-03-05T19:32:32Z

**Updated:** 2025-03-14T10:58:15Z

**Labels:** type: bug, area: install and config, area: zwe, release: V3, Size: L

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
Installation and configuration instructions are unclear and seem to skip steps. I chose to install ZOWE using SMPE as I use a central system to push out software updates. The SMPE install was flawless. Now I go to configure the system. I chose zwe init and then everything went wrong. There appears to be some updates needed for the /etc/profile and also the creation of a /global/zowe file system as well as a zowe.yaml file that is needed. Yet there is no mention of this in the flow.

It is far more difficult to install zowe with what is provided than it could be, Now I am playing "go fish" using notes I had taken from an older release.

## Pages to Update
https://docs.zowe.org/stable/user-guide/initialize-zos-system

## Screenshots
N/A

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-21

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The documentation has significant gaps that make post-SMP/E installation confusing.

**User's Problem:**
After successful SMP/E installation, the user ran `zwe init` and encountered issues because critical prerequisites were not documented:
1. **Updates needed for `/etc/profile`** - Not mentioned in the initialize-zos-system page
2. **Creation of `/global/zowe` file system** - Not mentioned anywhere in the installation flow
3. **Creation of `zowe.yaml` configuration file** - Assumed to exist but creation process not clearly linked

**Current Documentation State:**

1. **`docs/user-guide/initialize-zos-system.md`** (the page mentioned in the issue)
   - Assumes `zwe` command is available in PATH
   - References `zwe init --config /path/to/zowe.yaml` but doesn't explain how to create zowe.yaml
   - Does NOT mention `/etc/profile` or PATH configuration
   - Does NOT mention `/global/zowe` file system
   - **Missing:** Clear prerequisites section

2. **`docs/user-guide/install-zowe-smpe.md`**
   - Focuses on SMP/E installation steps
   - Does NOT mention `/global/zowe` as a default or recommended path
   - Does NOT link to initialization steps or prerequisites
   - **Missing:** Post-installation next steps

3. **`docs/user-guide/installandconfig.md`**
   - **DOES mention** (line 146): Adding `zwe` to PATH via `/etc/.profile` (note: typo - should be `/etc/profile`)
   - **DOES mention** (lines 194-206): Creating zowe.yaml from `example-zowe.yaml`
   - But this is in a general installation guide, not specifically linked from SMP/E or initialize-zos-system pages

4. **`/global/zowe` references in docs:**
   - Found in `docs/user-guide/generate-certificates.md` (keystore paths)
   - Found in `docs/user-guide/install-configure-zos-extensions.md` (extensions path)
   - **NOT found** in SMP/E installation or initialization docs
   - Appears to be a default/conventional path but not documented as a prerequisite

**Assessment:**
- **Confirmed:** The documentation is missing critical prerequisites for running `zwe init` after SMP/E installation
- **Confirmed:** The user must create/modify multiple files and configurations before `zwe init` will work
- **Confirmed:** These prerequisites are documented elsewhere but NOT in the pages the user would naturally follow after SMP/E install

**Specific Gaps:**

| Missing Information | Location | Current State |
|---------------------|----------|---------------|
| Add `zwe` to PATH via /etc/profile | installandconfig.md | ⚠️ Exists but not linked from initialize-zos-system.md |
| Create zowe.yaml from example | installandconfig.md | ⚠️ Exists but not linked from initialize-zos-system.md |
| /global/zowe file system requirement | Not documented | ❌ Missing entirely |
| Prerequisites check before `zwe init` | initialize-zos-system.md | ❌ Missing entirely |

**Recommendation:**
- **KEEP OPEN** - Documentation needs improvements
- **Action 1:** Add a "Prerequisites" section to `initialize-zos-system.md` that links to:
  - PATH configuration in installandconfig.md
  - zowe.yaml creation in installandconfig.md
  - File system requirements (create new section or link)
- **Action 2:** Add a "Post-installation steps" section to `install-zowe-smpe.md` that:
  - Points to PATH configuration
  - Points to zowe.yaml creation
  - Points to initialize-zos-system.md
  - Mentions `/global/zowe` as a conventional path (or clarify the actual default)
- **Action 3:** Clarify the `/global/zowe` path - is this a default? A recommendation? Document it consistently
- **Action 4:** Fix typo in installandconfig.md: `/etc/.profile` should be `/etc/profile`

**Impact:**
- **High** - Users following the SMP/E -> `zwe init` path will encounter errors without this information
- **Medium** - Information exists but is scattered and not discoverable in the natural flow
- **User Experience:** Frustrating - "go fish" experience as the user described

**Suggested Fix:**
Add to `initialize-zos-system.md` at the top:
```markdown
## Prerequisites

Before running `zwe init`, ensure the following are in place:

1. **PATH Configuration**: The `zwe` command must be in your PATH. Add it to `/etc/profile` or `~/.profile`:
   ```bash
   export PATH=${PATH}:<RUNTIME_DIR>/bin
   ```
   See [Installation and Configuration](../installandconfig.md#path-configuration) for details.

2. **Configuration File**: Create your `zowe.yaml` from the example:
   ```bash
   cp <RUNTIME_DIR>/example-zowe.yaml /path/to/zowe.yaml
   ```
   See [Zowe configuration file](../installandconfig.md#zowe-configuration-file-zoweyaml) for details.

3. **File System**: Ensure your Zowe runtime directory exists (commonly `/global/zowe` or as defined during installation).
```

