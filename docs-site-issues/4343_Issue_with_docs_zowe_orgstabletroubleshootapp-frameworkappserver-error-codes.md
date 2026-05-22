# Issue #4343: Issue with docs.zowe.org/stable/troubleshoot/app-framework/appserver-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4343

**Created:** 2025-05-02T19:32:49Z

**Updated:** 2025-05-09T11:16:10Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Ive got a message

 ZWED0159I - *** rejects:  {} 


this page has  ZWED0159E and  ZWED0159W but not  ZWED0159I 

What do I do with this message?

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

**Findings:** The issue is **VALID**. This is a duplicate/similar report to issue #4342, confirming the documentation gap.

**User's Problem:**
User encountered message `ZWED0159I - *** rejects:  {}` in logs and found that the error codes page has ZWED0159E and ZWED0159W but NOT ZWED0159I. The user doesn't know what action to take.

**Current Documentation State:**

1. **`docs/troubleshoot/app-framework/appserver-error-codes.md`**
   - **Has:** ZWED0159E (line 922) and ZWED0159W (line 2322)
   - **Missing:** ZWED0159I (Informational variant)
   - **Note:** Line 157 references ZWED0159W but not ZWED0159I

**Assessment:**
- **Confirmed:** ZWED0159I exists in the code (user encountered it in logs)
- **Confirmed:** Only E and W variants are documented, not I
- **Confirmed:** This is part of a larger pattern - see issue #4342 for additional missing codes (ZWED0190I, ZWED0197I)

**Root Cause:**
Same as issue #4342 - The appserver error codes documentation is incomplete, particularly for informational messages (I suffix).

**Recommendation:**
- **MERGE with #4342** - These issues are related and should be tracked together
- **Action:** Add ZWED0159I to the error codes documentation (see #4342 for detailed recommendation)
- **Action:** Consider a comprehensive audit of all ZWED error codes

**Impact:**
- **Medium** - Single missing error code
- **User Experience:** Confusing - user sees message but cannot determine if action is needed

**See Also:**
- Issue #4342 - Reports same documentation gap plus additional missing codes (ZWED0190I, ZWED0197I)
- The message "*** rejects:  {}" suggests this may be plugin-related

**Note:**
This issue is very similar to #4342 which was created 5 minutes earlier. They should be consolidated.

