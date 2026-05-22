# Issue #4322: Issue with docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/zwe-install/

**URL:** https://github.com/zowe/docs-site/issues/4322

**Created:** 2025-04-21T13:16:42Z

**Updated:** 2025-04-29T07:56:13Z

**Labels:** area: install and config, release: V3

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
The structure of the documents is very strange.

Having using the zowe install command, I was expecting to be told to tailor the pDSmembers, defined RACF profiles etc...

no... "Next", at the bottom takes me to  "Start".   Wow - that's a surprise

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-21

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The command reference page lacks clear navigation to post-installation configuration steps.

**User's Problem:**
After reading the `zwe install` command reference, the user expected to find guidance on next steps:
- Tailoring PDS members (SZWEAUTH, SZWESAMP, SZWEEXEC, SZWELOAD)
- Defining RACF profiles
- Other post-installation configuration

Instead, the "Next" button at the bottom of the page takes them to "Start" which is unexpected and unhelpful.

**Current Documentation State:**

1. **`docs/appendix/zwe_server_command_reference/zwe/zwe-install.md`**
   - This is a **command reference** page (auto-generated from `--help` output)
   - Documents parameters, examples, and errors for `zwe install`
   - **Does NOT** provide tutorial-style guidance on what to do after running the command
   - **Does NOT** link to configuration documentation
   - "Next" navigation appears to be auto-generated from sidebar order, not content flow

2. **Post-installation configuration IS documented elsewhere:**
   - **APF Authorization:** `docs/user-guide/apf-authorize-load-library.md`
     - Explains how to APF-authorize SZWEAUTH (created by `zwe install`)
     - References SZWESAMP(ZWESIPRG) for SETPROG statements
   - **Cross Memory Server:** `docs/user-guide/configure-xmem-server.md`
     - Explains SZWEAUTH and SZWESAMP contents
     - References tailoring steps
   - **Certificates:** `docs/user-guide/configure-certificates.md`
     - References SZWESAMP(ZWEKRING) for security commands
   - **General Configuration:** `docs/user-guide/initialize-zos-system.md`
     - Covers `zwe init` subcommands (security, apfauth, certificate, stc)

3. **Sidebar Structure Issue:**
   - Command reference pages are in `appendix/zwe_server_command_reference/`
   - User guides are in `user-guide/`
   - No clear connection between command reference and user guide

**Assessment:**
- **Confirmed:** The user's expectation is reasonable - after installing datasets, they need to configure them
- **Confirmed:** The "Next" navigation is likely auto-generated and not content-aware
- **Confirmed:** There IS documentation for post-installation steps, but it's not linked from the command reference

**Specific Gaps:**

| Expected Information | Status | Location |
|----------------------|--------|----------|
| Tailoring PDS members (SZWESAMP, etc.) | ✅ Exists | configure-xmem-server.md, configure-certificates.md |
| Defining RACF profiles | ✅ Exists | configure-certificates.md |
| APF authorization | ✅ Exists | apf-authorize-load-library.md |
| Link from command ref to config docs | ❌ Missing | zwe-install.md |
| Logical "Next Steps" section | ❌ Missing | zwe-install.md |

**Recommendation:**
- **KEEP OPEN** - Documentation navigation needs improvement
- **Action 1:** Add a "Next Steps" or "See Also" section to `zwe-install.md` with links to:
  - [Configuring the cross memory server](../user-guide/configure-xmem-server.md)
  - [APF authorizing the load library](../user-guide/apf-authorize-load-library.md)
  - [Configuring certificates](../user-guide/configure-certificates.md)
  - [Initializing z/OS system with zwe init](../user-guide/initialize-zos-system.md)
- **Action 2:** Update the sidebar structure to group command reference pages separately from tutorial/user guide pages
- **Action 3:** Consider adding a note at the top of command reference pages:
  > "This is a command reference page. For step-by-step installation and configuration guides, see the [User Guide](../../user-guide/installandconfig.md)."
- **Action 4:** Fix the "Next" button navigation to be more context-aware (if possible with the doc framework)

**Impact:**
- **Medium** - Users can find the information but must know to look elsewhere
- **High** - Poor user experience for first-time users following the natural flow
- **Navigation:** The "Next" button taking users to "Start" is confusing and breaks the expected flow

**Suggested Addition to zwe-install.md:**
```markdown
## Next Steps

After running `zwe install`, you need to configure the created data sets:

- **APF Authorization**: Authorize the SZWEAUTH load library. See [APF Authorizing Load Library](../../user-guide/apf-authorize-load-library.md)
- **Cross Memory Server**: Configure and start the cross memory server. See [Configuring the Cross Memory Server](../../user-guide/configure-xmem-server.md)
- **Certificates**: Set up TLS certificates. See [Configuring Certificates](../../user-guide/configure-certificates.md)
- **System Initialization**: Run `zwe init` to complete configuration. See [Initializing z/OS System](../../user-guide/initialize-zos-system.md)
```

