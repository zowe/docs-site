# Issue #4349: Issue with docs.zowe.org/stable/user-guide/api-mediation/configuration-client-certificates

**URL:** https://github.com/zowe/docs-site/issues/4349

**Created:** 2025-05-03T12:40:06Z

**Updated:** 2025-06-27T06:15:26Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I am a little confused.

If I want to logon with a client certificate, do I need to have z/OSMF installed?

If not what is the difference between client logon with certificate and this section?  please add some text to explain

______________

Under pre-reqs it says th userid can logon to z/OSMF - this implies z/OSMF is a pre-req which is not documented.

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

**Findings:** The issue is **VALID**. The documentation is unclear about z/OSMF requirements for client certificate authentication.

**User's Confusion:**
1. "If I want to logon with a client certificate, do I need to have z/OSMF installed?"
2. "Under pre-reqs it says the userid can logon to z/OSMF - this implies z/OSMF is a pre-req which is not documented."
3. "What is the difference between client logon with certificate and this section?"

**Current Documentation State:**

1. **`docs/user-guide/api-mediation/configuration-client-certificates.md`**

   **Prerequisites Section (lines 20-26):**
   ```
   * **z/OSMF Access:** The Zowe runtime user must be a member of the default `IZUUSER` group to log in to z/OSMF.
   * **PassTicket Generation:** The Zowe runtime user must be able to generate PassTickets for the user and for the z/OSMF `APPLID`. For more information, see [Configuring Zowe to use PassTickets](../api-mediation/configuration-extender-passtickets.md#configuring-zowe-to-use-passtickets).
   ```

   **Issue:** These prerequisites IMPLY z/OSMF is required but don't explicitly state it.

2. **Two Authentication Methods Described:**
   - **Internal API ML Mapper** (recommended, default in v3+)
     - Uses SAF identity mapping
     - "simpler to configure"
     - "required method for ACF2 users"
   - **ZSS** (legacy)
     - Uses Z Secure Services
     - "requires the certificate to be added to the user in z/OS"
     - "ZSS mapping does not support IDMAP"

3. **Missing Clarification:**
   - Is z/OSMF required for Internal API ML Mapper?
   - Is z/OSMF required for ZSS?
   - What is the relationship between client certificate auth and z/OSMF?

**Assessment:**

**Question 1: Is z/OSMF required for client certificate authentication?**

Based on the prerequisites mentioning:
- z/OSMF Access requirement
- PassTicket Generation for z/OSMF APPLID

**Answer:** **YES, z/OSMF appears to be required** for the documented configuration.

However, this is confusing because:
- The Internal API ML Mapper uses SAF identity mapping (which might not require z/OSMF)
- But the PassTicket requirement suggests z/OSMF is needed
- The documentation doesn't clarify the dependency chain

**Question 2: What is the difference between "client logon with certificate" and this section?**

The user is likely referring to:
- `docs/user-guide/authenticating-with-client-certificates.md` (general client cert auth)
- `docs/user-guide/api-mediation/configuration-client-certificates.md` (server-side configuration)

**Difference:**
- **authenticating-with-client-certificates.md**: How CLIENTS (users, applications) authenticate to Zowe using certificates
- **configuration-client-certificates.md**: How to CONFIGURE the API ML server to ACCEPT client certificate authentication

This is a tutorial vs. configuration distinction that should be clarified.

**Root Cause of Confusion:**
1. **Implicit dependency:** z/OSMF is mentioned in prerequisites but not explained as a requirement
2. **Missing context:** No explanation of WHY z/OSMF is needed (for PassTicket generation)
3. **Terminology overlap:** "Client certificate authentication" is used for both:
   - The user-facing feature (authenticating-with-client-certificates.md)
   - The server configuration (configuration-client-certificates.md)
4. **No architecture overview:** No diagram showing the flow and dependencies

**Recommendation:**
- **KEEP OPEN** - Documentation needs clarification
- **Action 1:** Add explicit statement at the top:
  ```markdown
  :::info Important
  **z/OSMF Requirement:** z/OSMF must be installed and configured. Client certificate authentication in API ML requires PassTicket generation, which depends on z/OSMF.
  :::
  ```
- **Action 2:** Clarify the prerequisites:
  ```markdown
  * **z/OSMF:** z/OSMF must be installed. The Zowe runtime user must be a member of the default `IZUUSER` group to access z/OSMF functions.
  * **PassTicket Generation:** z/OSMF is used to generate PassTickets. The Zowe runtime user must be able to generate PassTickets for users and for the z/OSMF APPLID.
  ```
- **Action 3:** Add a "How it works" or "Architecture" section explaining:
  - Client presents certificate to API ML Gateway
  - Gateway validates certificate against truststore
  - Gateway uses Internal Mapper or ZSS to map certificate to z/OS user
  - z/OSMF generates PassTicket for the mapped user
  - PassTicket is used for downstream z/OS requests
- **Action 4:** Clarify the difference between this page and authenticating-with-client-certificates.md
- **Action 5:** Consider adding a flowchart diagram

**Impact:**
- **High** - Users cannot determine if they need z/OSMF installed
- **Medium** - Confusion about which documentation applies to their use case
- **User Experience:** Frustrating - unclear dependencies and architecture

**Technical Answer to User's Question:**

**Q: Do I need z/OSMF installed for client certificate authentication?**
A: **YES**. Based on the current configuration described, z/OSMF is required because:
- The PassTicket Generation prerequisite requires generating PassTickets for the z/OSMF APPLID
- This suggests PassTickets are used for downstream authentication after client certificate validation

**Q: What's the difference between client logon with certificate and this section?**
A: This section (`configuration-client-certificates.md`) describes how to **configure the server** to accept client certificates. The other document (`authenticating-with-client-certificates.md`) describes how **clients** use certificates to authenticate.

**See Also:**
- This is one of many client certificate-related issues (4346, 4360, 4361, 4448-4450, 4500, 4542)
- All indicate confusion around client certificate authentication documentation

