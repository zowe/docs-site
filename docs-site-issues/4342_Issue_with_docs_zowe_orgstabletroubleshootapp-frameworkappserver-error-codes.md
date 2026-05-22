# Issue #4342: Issue with docs.zowe.org/stable/troubleshoot/app-framework/appserver-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4342

**Created:** 2025-05-02T19:27:21Z

**Updated:** 2025-05-09T11:16:00Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Ive got  messages

(_zsf.bootstrap,depgraph.js:263) ZWED0159I - *** rejects:  {}                                                                      
(_zsf.routing,webapp.js:1304) ZWED0197I - User=undefined: root service called: /plugins, GET /plugins                              
(_zsf.auth,webauth.js:500) E4VBsIPHQaCyd_PluD2013LcO8uhn4Z0: Initiating isAuthorized check with org.zowe.zlux.auth.safsso          
(_zsf.static,webapp.js:388) ZWED0190I - Type requested = all                                                                       
(_zsf.bootstrap,plugin-loader.js:732) Scanning for new plugins in /u/colin/zowec/workspace/app-server/plugins                      

I cannot find ZWED0197I  ... to find what it means.

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

**Findings:** The issue is **VALID**. Multiple informational (I) and warning (W) error codes are missing from the appserver error codes documentation.

**User's Problem:**
User encountered the following messages in app-server logs but cannot find their meaning:
- `ZWED0159I - *** rejects:  {}`
- `ZWED0197I - User=undefined: root service called: /plugins, GET /plugins`
- `ZWED0190I - Type requested = all`

**Current Documentation State:**

1. **`docs/troubleshoot/app-framework/appserver-error-codes.md`**
   - **File size:** 3,399 lines
   - **Highest documented ZWED code:** ZWED0158E (and ZWED0159E, ZWED0159W)
   - **Missing codes identified:**
     - ZWED0159I - NOT documented (only E and W variants exist)
     - ZWED0190I - NOT documented
     - ZWED0197I - NOT documented
   - **Pattern:** Informational messages (I suffix) appear to be less documented than errors (E) and warnings (W)

2. **Search for ZWED019x codes:**
   - No ZWED019x codes found in the documentation at all
   - Gap in numbering: ZWED0158E -> ZWED0159E/W -> then next is likely ZWED0190+

3. **ZWED0159 references:**
   - Line 157: Mentions ZWED0159W in context: "review the log for messages with IDs ZWED0159W or ZWED0027W"
   - Line 922: `### ZWED0159E` - Error variant exists
   - Line 2322: `### ZWED0159W` - Warning variant exists
   - **Missing:** ZWED0159I (Informational variant)

**Assessment:**
- **Confirmed:** ZWED0159I is referenced in line 157 but not documented
- **Confirmed:** ZWED0190I and ZWED0197I are completely missing from documentation
- **Confirmed:** These are informational messages (I suffix) that appear during normal operation
- **Likely:** These codes were added in a newer version but documentation was not updated

**Specific Gaps:**

| Error Code | Type | Status | Documented? |
|------------|------|--------|-------------|
| ZWED0159I | Informational | Referenced but missing | ❌ No |
| ZWED0159E | Error | Referenced | ✅ Yes (line 922) |
| ZWED0159W | Warning | Referenced | ✅ Yes (line 2322) |
| ZWED0190I | Informational | User reported | ❌ No |
| ZWED0197I | Informational | User reported | ❌ No |

**Root Cause:**
The appserver error codes documentation is incomplete. It appears to have been updated for errors (E) and warnings (W) but not for informational messages (I).

**Recommendation:**
- **KEEP OPEN** - Documentation needs to be updated with missing codes
- **Action 1:** Add the following missing error codes to `appserver-error-codes.md`:
  ```markdown
  ### ZWED0159I
  
    *** rejects:  {}
  
    **Reason:**
    [To be determined from source code or developers]
  
    **Action:**
    [To be determined]
  
  ### ZWED0190I
  
    Type requested = all
  
    **Reason:**
    [To be determined]
  
    **Action:**
    [To be determined]
  
  ### ZWED0197I
  
    User=undefined: root service called: _path_, _method_
  
    **Reason:**
    [To be determined]
  
    **Action:**
    [To be determined]
  ```
- **Action 2:** Audit the entire ZWED error code range for missing informational messages
- **Action 3:** Consider adding a process to ensure new error codes are documented when added to the codebase
- **Action 4:** Verify if there are other missing codes in the 0190-0199 range and beyond

**Impact:**
- **Medium** - Users cannot troubleshoot informational messages
- **High** - Incomplete documentation reduces trust in the error reference
- **User Experience:** Frustrating - users see messages in logs but cannot find their meaning

**Notes:**
- These appear to be informational messages that may not require action
- However, users still need to know what they mean
- The "rejects: {}" in ZWED0159I suggests it may be related to plugin loading/rejection
- The "User=undefined" in ZWED0197I may indicate a configuration or authentication issue

**See Also:**
- Issue #4343 reports the same problem specifically for ZWED0159I

