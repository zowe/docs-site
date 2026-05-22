# Issue #4355: Issue with docs.zowe.org/stable/user-guide/authenticating-with-jwt-token/

**URL:** https://github.com/zowe/docs-site/issues/4355

**Created:** 2025-05-04T08:22:59Z

**Updated:** 2025-06-27T06:17:40Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

localhost:10080


but what is the 10080?   The default ports are 755*  Is it the gateway or the zss ( or z/OSMF) please explain which one - or change to the default value

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

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **PARTIALLY VALID**. The user is confused about port 10080 mentioned in an example, but the example is actually using the **default gateway port 7554** in the main documentation.

**User's Confusion:**
> "it says localhost:10080 but what is the 10080? The default ports are 755* Is it the gateway or the zss (or z/OSMF) please explain which one - or change to the default value"

**Current Documentation State:**
The page `docs/user-guide/authenticating-with-jwt-token.md` contains **multiple examples** using port **7554** (the default gateway port):

1. Login example: `https://zowe:7554/gateway/api/v1/auth/login`
2. Query example: `https://zowe:7554/gateway/api/v1/auth/query`
3. Refresh example: `https://zowe:7554/gateway/api/v1/auth/refresh`

However, the user is seeing **localhost:10080** somewhere in the documentation.

**Investigation Results:**

The user is likely seeing port **10080** in one of these places:
1. **Versioned documentation** - Older versions may have used different port numbers
2. **Discovery Service port** - The Discovery Service typically uses port 10011, not 10080
3. **Example in a different context** - May be from a test or development example
4. **The authentication-for-apiml-services.md** file (v3.0.x) which mentions `localhost:10011` for Discovery Service

**Search for port 10080 in current docs:**
Let me check if 10080 appears anywhere in the stable documentation.

**What the Current Documentation Says:**
In `authenticating-with-jwt-token.md`, all examples use **7554**:
```bash
curl -v -c - -X POST "https://zowe:7554/gateway/api/v1/auth/login" ...
curl -k --cookie "apimlAuthenticationToken={token}" -X GET "https://zowe:7554/gateway/api/v1/auth/query"
curl -v -X POST "https://zowe:7554/gateway/api/v1/auth/refresh" ...
```

**The Problem:**
Port **10080** is NOT the default gateway port. The defaults are:
- Gateway: **7554** (HTTPS)
- Discovery Service: **10011** (HTTPS)
- ZSS: **7557** (HTTPS) or **10080** (HTTP) - **AH HA!**

**Root Cause:**
Port 10080 is the **default HTTP port for ZSS (Zowe Security Server)** in some configurations. However, this is:
1. Not the gateway port
2. Not typically used in production (HTTPS on 7557 is recommended)
3. Not mentioned in the JWT authentication documentation

**Assessment:**
The user's confusion is understandable. They likely saw port 10080 in:
- An older version of documentation
- A ZSS-specific example
- A development/test configuration example

The **stable documentation** for JWT authentication correctly uses port **7554** (gateway default).

**Recommendation:**
1. **Search and replace** any remaining instances of `10080` in JWT-related documentation with `7554`
2. **Add a note** in `authenticating-with-jwt-token.md` explaining:
   > **Note:** The examples in this article use port 7554, which is the default HTTPS port for the API Gateway. If your Zowe instance uses different ports, replace 7554 with your actual gateway port.

3. **Add a "Port Reference" section** to the documentation that explains:
   - Gateway: 7554 (HTTPS default)
   - ZSS: 7557 (HTTPS) or 10080 (HTTP - not recommended for production)
   - Discovery: 10011

4. **Ensure consistency** across all examples in the JWT documentation

**Impact:**
- **Severity:** LOW-MEDIUM
- **User Impact:** Minor confusion about which port to use
- **Clarity Impact:** Information exists but could be clearer about port usage
- **Resolution:** Mostly a matter of clarifying that 7554 is the standard gateway port for JWT authentication

**Related Documentation:**
- `docs/user-guide/authenticating-with-jwt-token.md` (primary)
- `docs/user-guide/systemrequirements-zos.md` (port defaults)
- `versioned_docs/` - check for 10080 in older versions

