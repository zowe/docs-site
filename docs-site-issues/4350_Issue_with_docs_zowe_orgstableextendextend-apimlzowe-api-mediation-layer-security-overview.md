# Issue #4350: Issue with docs.zowe.org/stable/extend/extend-apiml/zowe-api-mediation-layer-security-overview/

**URL:** https://github.com/zowe/docs-site/issues/4350

**Created:** 2025-05-03T12:46:57Z

**Updated:** 2025-06-27T06:15:41Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

Certificates are used for service-only requests

i do not understand what this means.  Can I logon with a certificate...  or only logon if it uses a REST Service request?

Please expand the description

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

**Findings:** The issue is **VALID**. The sentence is misleading and needs clarification.

**User's Confusion:**
> "Certificates are used for service-only requests"
> 
> "I do not understand what this means. Can I logon with a certificate... or only logon if it uses a REST Service request?"
> 
> "Please expand the description"

**Current Documentation State:**

1. **`docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md`** (line 36)
   ```
   - **TLS client certificates**
       - Certificates are used for service-only requests
   ```

2. **Contradiction with Other Documentation:**
   - `docs/user-guide/authenticating-with-client-certificates.md` - Describes how **users** can authenticate with client certificates
   - `docs/user-guide/api-mediation/configuration-client-certificates.md` - Describes how to **configure** client certificate authentication for users
   - These documents clearly indicate that USER authentication with certificates IS supported

3. **What "service-only requests" likely means:**
   Based on API ML architecture:
   - **Service-to-service authentication:** When one API service calls another API service, it may use TLS client certificates for mutual authentication
   - **User authentication:** Users can also authenticate with client certificates (as documented elsewhere)
   - The current sentence only mentions the service-to-service use case

**Assessment:**
- **Confirmed:** The sentence is unclear and incomplete
- **Confirmed:** It doesn't explain what "service-only requests" means
- **Confirmed:** It contradicts other documentation that shows user certificate authentication is supported
- **Confirmed:** It doesn't clarify if users can authenticate with certificates

**Root Cause:**
The sentence is an oversimplification that:
1. Doesn't define "service-only requests"
2. Doesn't mention user certificate authentication
3. Creates confusion about certificate authentication capabilities

**Recommendation:**
- **KEEP OPEN** - Documentation needs clarification
- **Action 1:** Rewrite the TLS client certificates section to be accurate:
  ```markdown
  - **TLS client certificates**
      - Certificates can be used for both service-to-service and user authentication
      - **Service-to-service:** API services can use TLS client certificates to authenticate when calling other services
      - **User authentication:** Users can present client certificates to authenticate to API ML. For more information, see [Authenticating with client certificates](../../user-guide/authenticating-with-client-certificates.md) and [Configuring client certificate authentication](../../user-guide/api-mediation/configuration-client-certificates.md)
  ```
- **Action 2:** Add a cross-reference to the user authentication documentation
- **Action 3:** Consider adding a comparison table of authentication methods and their use cases

**Impact:**
- **High** - Misleading information about authentication capabilities
- **User Experience:** Confusing - user doesn't know if certificate authentication is supported for their use case

**Technical Clarification:**

**Q: Can I logon with a certificate?**
A: **YES**. Users can authenticate with client certificates. See:
- [Authenticating with client certificates](../../user-guide/authenticating-with-client-certificates.md)
- [Configuring client certificate authentication](../../user-guide/api-mediation/configuration-client-certificates.md)

**Q: What are "service-only requests"?**
A: This refers to machine-to-machine communication where API services authenticate to each other using TLS client certificates, separate from user authentication.

**Q: What's the difference?**
A:
- **User authentication with certificates:** A human user or client application presents a certificate to authenticate as a specific z/OS user
- **Service-only requests with certificates:** API services present certificates to authenticate to other services (service-to-service authentication)

Both use cases are valid and supported in API ML.

**See Also:**
- Issue #4346, #4349, #4360, #4361, #4448-4450, #4500, #4542 - All relate to certificate authentication documentation confusion
- This is part of a larger pattern of unclear certificate authentication documentation

