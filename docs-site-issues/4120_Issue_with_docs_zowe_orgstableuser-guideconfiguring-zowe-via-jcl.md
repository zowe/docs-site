# Issue #4120: Issue with docs.zowe.org/stable/user-guide/configuring-zowe-via-jcl/

**URL:** https://github.com/zowe/docs-site/issues/4120

**Created:** 2025-02-03T07:02:07Z

**Updated:** 2025-03-14T12:16:55Z

**Labels:** type: bug, area: install and config, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Member 
IBMUSER.ZWEV3A.CUST.JCLLIB(ZWEIRAC)

adds the same group twice 

ADDGROUP ZWEADMIN OMVS(AUTOGID) - 
 DATA('ZOWE ADMINISTRATORS') 
 -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  
ADDGROUP ZWEADMIN OMVS(AUTOGID) - 
__________________________
Question why do we need a started task userid ZWESIUSR and ZWESVUSR.  Please explain why we need two userids.

________________________________________

The doc says

Zowe requires a user ID ZWESVUSR  ...  is this true ?  can I use another userid or must it be ZWEVUSR.   If I define a second ZOWE instance, must it use the same userid?

_______________________________________________


The RACF member has 

  ADDGROUP IBMUSER.ZWEV3A DATA('Zowe - HLQ STUB') 

which fails because it is not an 8 char string.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is **STILL VALID** and reveals both documentation gaps and potential JCL sample issues.

**User's Questions:**
1. `ZWEIRAC` member adds same group (ZWEADMIN) twice with ADDGROUP statements
2. Why do we need two user IDs: ZWESIUSR and ZWESVUSR?
3. Must Zowe use user ID `ZWESVUSR` specifically, or can another user ID be used?
4. For a second ZOWE instance, must it use the same user ID?
5. RACF member has `ADDGROUP IBMUSER.ZWEV3A DATA('Zowe - HLQ STUB')` which fails (not 8 char string)

**Current Documentation State:**
- `docs/user-guide/assign-security-permissions-to-users.md`:
  - Explains ZWESVUSR runs main Zowe runtime (ZWESLSTC)
  - Explains ZWESIUSR runs cross memory server (ZWESISTC)
  - States both must belong to ZWEADMIN group
  - States both must have valid OMVS segments
  - **MISSING:** Explanation of why two separate user IDs are needed
  - **MISSING:** Whether user IDs can be customized
- `docs/user-guide/configure-zos-system.md`:
  - States "Zowe requires a user ID `ZWESVUSR`" and "Zowe requires a user ID `ZWESIUSR`"
  - Shows example ADDGROUP commands with proper 8-char names
  - Has section "Configure ZWESLSTC to run Zowe high availability instances under ZWESVUSR user ACID"
  - **HAS:** Information about multiple ZWESLSTC instances sharing ZWESVUSR
  - **MISSING:** Clear statement that user IDs are customizable via YAML
- `docs/user-guide/configuring-zowe-via-jcl.md`:
  - Links to ZWEIRAC in GitHub (zowe-install-packaging repo)
  - **MISSING:** No discussion of the JCL content or potential issues

**What's Missing:**
1. **Why Two User IDs:** No clear explanation of the architectural reason for separating ZWESVUSR (main server) and ZWESIUSR (cross-memory server)
2. **Customizable User IDs:** Documentation states "Zowe requires user ID ZWESVUSR" but doesn't clearly state these can be customized in `zowe.yaml` via `zowe.setup.security.users.zowe` and `zowe.setup.security.users.zis`
3. **Multiple Instances:** Documentation mentions HA instances can share ZWESVUSR, but doesn't clearly address whether multiple instances *must* use the same ID or can use different IDs
4. **JCL Sample Issues:** The actual JCL samples are in zowe-install-packaging repo, not documented here. The issues mentioned (duplicate ADDGROUP, invalid group name length) suggest the samples may need fixes
5. **RACF Group Naming Rules:** No mention that RACF group names must be ≤8 characters

**Assessment:** The user encountered real issues. Some are documentation gaps (1-4), some may be actual bugs in the JCL samples in the install-packaging repo (5). The documentation should clarify user ID requirements and customization options.

**Recommendation:** KEEP OPEN. The documentation should be enhanced with:
1. Clear explanation of why two user IDs are needed (separation of privileges)
2. Explicit statement that user IDs can be customized via YAML configuration
3. Guidance on user ID requirements for multiple ZOWE instances
4. Note about RACF group naming constraints (8 char max)
5. Reference to zowe-install-packaging repo for JCL sample issues (may need fixes there)

