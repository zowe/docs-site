# Issue #4346: Issue with docs.zowe.org/stable/user-guide/authenticating-with-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4346

**Created:** 2025-05-03T12:01:16Z

**Updated:** 2025-12-16T10:21:21Z

**Labels:** area: apiml, review: sme, priority-high, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says
If using the internal API ML mapper (default from Zowe v3) and the MAP / CERTMAP option with distinguished name filters, use the CHCKCERT or equivalent command on the certificate to use the same order and format of the certificate's distinguished name as displayed.


I do not understand this.  How does using CHKCERT affect the same order and format?...    does it mean to display the order and format?
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

**Findings:** The issue is **VALID**. The sentence is unclear and needs improvement.

**User's Problem:**
The user doesn't understand this sentence:
> "If using the internal API ML mapper (default from Zowe v3) and the MAP / CERTMAP option with distinguished name filters, use the `CHCKCERT` or equivalent command on the certificate to use the same order and format of the certificate's distinguished name as displayed."

**Questions from User:**
- How does using CHCKCERT affect the same order and format?
- Does it mean to display the order and format?

**Current Documentation State:**

1. **`docs/user-guide/authenticating-with-client-certificates.md`** (line 39)
   - Contains the confusing sentence in a note box
   - No explanation of what CHCKCERT is
   - No explanation of what the user should do with the CHCKCERT output
   - No context about why order and format matter

2. **What is CHCKCERT?**
   - CHCKCERT is a TSO command in RACF that displays information about digital certificates
   - It shows the certificate's distinguished name (DN) and other attributes
   - The command is used to verify certificate details

3. **Why Order and Format Matter:**
   - When configuring MAP/CERTMAP with distinguished name filters, the filter must match the certificate's DN EXACTLY
   - The DN has a specific format and attribute order (e.g., "CN=John Doe+OU=IT+C=US")
   - Different tools may display the DN in different formats or orders
   - Using CHCKCERT ensures you see the DN in the same format that API ML will see it

**Assessment:**
- **Confirmed:** The sentence is confusing and unclear
- **Confirmed:** It doesn't explain WHAT CHCKCERT is
- **Confirmed:** It doesn't explain WHY the user should use it
- **Confirmed:** It doesn't explain WHAT to do with the output
- **Likely:** This causes user confusion when setting up certificate-based authentication

**Root Cause:**
The documentation assumes the user knows:
1. What CHCKCERT is
2. What it does
3. Why the DN format/order is important
4. How to use the output to configure their MAP/CERTMAP filter

**Recommendation:**
- **KEEP OPEN** - Documentation needs clarification
- **Action 1:** Rewrite the note to be clearer:
  ```markdown
  :::note
  **Important:** When using the internal API ML mapper (default from Zowe v3) with the MAP / CERTMAP option and distinguished name filters, the filter must match the certificate's distinguished name (DN) exactly, including attribute order and format.
  
  To ensure your filter matches correctly:
  1. Use the `CHCKCERT` TSO command (or equivalent for your security manager) to display the certificate
  2. Note the exact DN format and attribute order shown
  3. Use this exact format when creating your SDNFILTER in the RACDCERT MAP command
  
  For example, if CHCKCERT shows: `CN=John Doe+OU=IT+C=US`
  Your SDNFILTER should use: `SDNFILTER('CN=John Doe+OU=IT+C=US')`
  
  Using the internal API ML mapper is the preferred method.
  :::
  ```
- **Action 2:** Add a brief explanation of CHCKCERT:
  > `CHCKCERT` is a TSO command that displays certificate information. For RACF, use `CHCKCERT`. For TopSecret, use equivalent commands. For ACF2, use equivalent commands.
- **Action 3:** Link to CHCKCERT documentation if available

**Impact:**
- **Medium** - Confusing instruction may lead to incorrect configuration
- **User Experience:** Frustrating - user doesn't understand what action to take

**Technical Background:**
- DN (Distinguished Name) format can vary: `CN=X+OU=Y` vs `OU=Y+CN=X`
- Some security managers normalize DNs, others don't
- MAP/CERTMAP filters must match exactly what API ML sees
- CHCKCERT shows the DN as it's stored in the security database
- Using CHCKCERT output ensures the filter matches what API ML will see

**See Also:**
- This is part of a series of client certificate authentication issues (4346, 4360, 4361, 4448-4450, 4500, 4542)
- All relate to the same documentation page

