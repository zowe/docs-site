# Issue #3092: Document tips on (server) install verification

**URL:** https://github.com/zowe/docs-site/issues/3092

**Created:** 2023-09-01T14:33:21Z

**Updated:** 2025-03-14T14:41:31Z

**Labels:** area: install and config, release: V3, Size: L

---

## Validation Status: ⚠️ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. There IS a verification document, but it may not contain all the tips the issue author had in mind.

**Current State:**
- `docs/user-guide/verify-zowe-runtime-install.md` exists and provides verification steps
- Covers verification for Application Framework, API Mediation Layer, and z/OS Services
- Includes checking browser access to desktop and REST API calls
- However, it may not include all the specific "tips" the author uses (logs examination, specific browser checks, etc.)

**Existing Documentation:**
- Verification steps for Zowe Application Framework (browser access)
- Verification steps for API Mediation Layer (REST API health check)
- Verification steps for z/OS Services
- CLI verification: `docs/user-guide/cli-install-verify-your-installation.md`
- ZE verification: `docs/user-guide/ze-install-verify-your-installation.md`

**Recommendation:** Review the existing verification documentation and consider adding a "Tips and Tricks" section with the author's specific verification techniques (logs to check, browser console errors to look for, etc.).

---

How do you know when Zowe is correctly installed?
I encountered a user who was trying a `zwe` command recently, assuming it would do install verification, to prove that their install was fully operational.

When I interact with users, I have some things I look for in logs and in the browser to determine that the majority of the server configuration is correct and operational.

I don't think we have a page on this in the doc, and it could be pretty useful!
Let's collect the tips we do have, and make a page out of that, and place it at the end of the install steps.

The same is true for the CLI & Explorers - users should have a way to know that their install is good.
