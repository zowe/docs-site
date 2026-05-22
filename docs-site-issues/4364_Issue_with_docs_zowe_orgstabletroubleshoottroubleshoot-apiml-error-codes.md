# Issue #4364: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4364

**Created:** 2025-05-04T17:47:50Z

**Updated:** 2025-12-16T10:21:23Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

ZWEAS121E

Authorization header is missing, or the request body is missing or invalid for URL '%s'

Reason:

The authorization header is missing, or the request body is missing or invalid.

Action:

Provide valid authentication.

This is not very helpful.  Please point me to the authroisation header.

The doc pointed me to some curl code like

curl $post $cj $certca $certs  https://10.1.1.2:7554/gateway/api/v1/auth/login -v

There is no authorisation header in the specification, so I have no idea what to specify

I'm trying to logon with client certificate...  but have not done much ( any?) of the confiuration...because it is is hard to find a nice simple receipe 


I could not find any messages in any logs, please add explination which logs to use - or how to turn on how to get the messages.







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

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The error message ZWEAS121E lacks actionable guidance, and the user is confused about what authentication header to provide, especially for client certificate authentication.

**User's Problem:**
> "ZWEAS121E - Authorization header is missing, or the request body is missing or invalid for URL '%s'"
> "Reason: The authorization header is missing, or the request body is missing or invalid."
> "Action: Provide valid authentication."
> "This is not very helpful. Please point me to the authorization header."
> "The doc pointed me to some curl code like: curl $post $cj $certca $certs https://10.1.1.2:7554/gateway/api/v1/auth/login -v"
> "There is no authorization header in the specification, so I have no idea what to specify"
> "I'm trying to logon with client certificate... but have not done much (any?) of the configuration...because it is hard to find a nice simple recipe"
> "I could not find any messages in any logs, please add explanation which logs to use - or how to turn on how to get the messages."

**Current Documentation State:**

The error message in `docs/troubleshoot/troubleshoot-apiml-error-codes.md` (line 854):

```
### ZWEAS121E

  Authorization header is missing, or the request body is missing or invalid for URL '%s'

  **Reason:**

  The authorization header is missing, or the request body is missing or invalid.

  **Action:**

  Provide valid authentication.
```

**Problems Identified:**

| Issue | Status | Impact |
|-------|--------|--------|
| "Provide valid authentication" is too vague | ❌ MISSING | Users don't know WHAT to provide |
| No guidance on Authorization header format | ❌ MISSING | Users don't know HOW to provide it |
| No examples for different auth methods | ❌ MISSING | Users don't know WHICH method to use |
| No log location information | ❌ MISSING | Users can't troubleshoot further |
| No link to authentication documentation | ❌ MISSING | Users can't find detailed help |

**What's Actually Happening:**

The error ZWEAS121E occurs when:
1. A request to `/gateway/api/v1/auth/login` is missing authentication
2. For client certificate auth: The certificate is not being sent correctly
3. For JWT auth: The token is not being sent in the Authorization header
4. For basic auth: The credentials are not being sent

**User's Specific Case:**
The user is trying to use **client certificate authentication** but:
1. The curl example they were given doesn't show the Authorization header (because cert auth doesn't use it!)
2. They're being told to provide an "authorization header" but cert auth uses TLS client certificates, not headers
3. They don't know where to look for logs
4. They can't find a simple recipe for cert auth configuration

**Assessment:**
This is a **multi-faceted documentation gap**:
1. The error message documentation is too vague
2. There's no connection between error messages and authentication methods
3. There's no troubleshooting guidance for logs
4. The user experience for client certificate auth is poor

**Recommendation:**

1. **Enhance the ZWEAS121E error message** in `troubleshoot-apiml-error-codes.md`:

```markdown
### ZWEAS121E

  Authorization header is missing, or the request body is missing or invalid for URL '%s'

  **Reason:**

  The request lacks proper authentication credentials. This can occur when:
  - No authentication method is provided
  - The authentication header or certificate is malformed
  - The authentication method doesn't match the endpoint requirements

  **Action:**

  Provide valid authentication based on your configuration:
  
  **For client certificate authentication:**
  - Ensure your curl command includes `--cert` and `--key` parameters
  - Example: `curl --cert /path/to/cert.pem --key /path/to/key.pem https://{host}:7554/gateway/api/v1/auth/login`
  - For troubleshooting, see [Authenticating with client certificates](../../user-guide/authenticating-with-client-certificates.md)
  
  **For JWT token authentication:**
  - Include the token in an `Authorization: Bearer <token>` header
  - Or use the `apimlAuthenticationToken` cookie
  - For troubleshooting, see [Authenticating with JWT token](../../user-guide/authenticating-with-jwt-token.md)
  
  **For basic authentication:**
  - Include credentials in an `Authorization: Basic <base64>` header
  - Or provide username/password in the JSON request body

  **Logs:**
  - Gateway logs: Check `<Zowe Install Directory>/logs/zowe-*.log`
  - Enable debug logging with `-Dapiml.log.level=DEBUG` in gateway start script
  - For client certificate issues, check SAF/ESM logs for certificate mapping errors
```

2. **Add a "Troubleshooting Authentication" section** that cross-references:
   - Authentication configuration guides
   - Common authentication errors
   - Log locations and debug modes

3. **Add a "Common Curl Patterns" table** showing correct curl syntax for each auth method

4. **Review all error messages** for similar vagueness issues

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users cannot troubleshoot authentication issues
- **Support Impact:** Increased support burden due to unclear error messages
- **Beginner Impact:** Very high - beginners have no idea what to do

**Technical Clarification:**

**Q: What is the Authorization header for client certificate authentication?**
A: **There isn't one!** Client certificate authentication uses TLS-level certificates, not HTTP headers. You provide certificates via `--cert` and `--key` parameters in curl, or configure them in your HTTP client.

**Q: How do I provide an Authorization header for JWT?**
A: Use `Authorization: Bearer <your-jwt-token>` header, or the `apimlAuthenticationToken` cookie.

**Q: Where are the logs for authentication issues?**
A: Check:
- Gateway logs: `<Zowe Install Dir>/logs/zowe-*.log`
- Discovery Service logs: `<Zowe Install Dir>/logs/discovery-*.log`
- Enable debug: Add `-Dapiml.log.level=DEBUG` to gateway JVM options

**Q: Why is my client certificate not working?**
A: Common issues:
1. Certificate not trusted by gateway
2. Certificate not mapped to a user in your ESM
3. Private key doesn't match certificate
4. Certificate doesn't have client authentication extended key usage

**Related Documentation:**
- `docs/troubleshoot/troubleshoot-apiml-error-codes.md` (primary - needs enhancement)
- `docs/user-guide/authenticating-with-client-certificates.md` (referenced)
- `docs/user-guide/authenticating-with-jwt-token.md` (referenced)
- `docs/user-guide/api-mediation/configuration-client-certificates.md` (configuration)

