# Issue #4422: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml-error-codes/

**URL:** https://github.com/zowe/docs-site/issues/4422

**Created:** 2025-05-10T07:54:24Z

**Updated:** 2025-05-21T15:18:36Z

**Labels:** area: zwe

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

ZWEAO404E  needs more information.
I used 
zowe zos-files list data-set "COLIN.C.*" and got 

_error Details:
HTTP(S) error status "503" received.
Review request details (resource, base path, credentials, payload) and ensure correctness.

Protocol:  https
Host:      10.1.1.2
Port:      7554
Base Path: ibmzosmf/api/v1
Resource:  /zosmf/restfiles/ds?dslevel=COLIN.C.*
Request:   GET
Headers:   [{"Accept-Encodin_g":"gzip"},{"X-IBM-Max-Items":"0"},{"X-CSRF-ZOSMF-HEADER":true}]
Payload:   undefined

I can clearly get through to the server.
/zosmf/restfiles/ds?dslevel=COLIN.C.* was created by zowe cli
ibmzosmf/api/v1 was per doc..

so it looks like there is a problem on the back end.

For extra information are there commands I can issue to display what is valid?
Could it be I am not authorised to issue the command>


Is there more information in the logs I can look at - if so which logs?










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

**Findings:** The issue is **PARTIALLY VALID**. The user encountered a ZWEAO404E error (or similar) and needs more information about troubleshooting, but there are some misunderstandings about the error.

**User's Problem:**
> User ran `zowe zos-files list data-set "COLIN.C.*"` and got:
> ```
> HTTP(S) error status "503" received.
> Review request details (resource, base path, credentials, payload) and ensure correctness.
> 
> Protocol:  https
> Host:      10.1.1.2
> Port:      7554
> Base Path: ibmzosmf/api/v1
> Resource:  /zosmf/restfiles/ds?dslevel=COLIN.C.*
> ```
> User asks: "I can clearly get through to the server. For extra information are there commands I can issue to display what is valid? Could it be I am not authorised to issue the command? Is there more information in the logs I can look at - if so which logs?"

**Current Documentation State:**

The file `docs/troubleshoot/troubleshoot-apiml-error-codes.md` has the following entry for ZWEAO404E:

```
### ZWEAO404E

  The service can not find the requested resource.

  **Reason:**

  **Action:**
```

The entry is **INCOMPLETE** - it has no Reason or Action specified.

Also, the user's error shows HTTP status 503, which maps to ZWEAO503E or ZWEAM503E in the documentation.

**What's Missing:**

1. **ZWEAO404E needs a complete description:**
   - Currently has empty Reason and Action fields
   - Should explain what causes this error and how to fix it

2. **HTTP 503 error mapping:**
   - User got HTTP 503, but the issue title mentions ZWEAO404E
   - Need to clarify the difference between HTTP status codes and Zowe error codes

3. **Troubleshooting guidance for 503 errors:**
   - 503 means "Service Unavailable"
   - Could be z/OSMF not running, API ML not routing correctly, or service not registered

4. **Log information:**
   - Documentation doesn't specify which logs to check for which errors

**Technical Clarification:**

**Q: What is ZWEAO404E?**
A: ZWEAO404E is a Zowe-specific error code that indicates "The service cannot find the requested resource." This is typically returned when:
- The API endpoint doesn't exist
- The resource path is incorrect
- The service is not properly registered with API ML
- The base path is wrong

**Q: Why did I get HTTP 503 instead?**
A: HTTP 503 "Service Unavailable" is a standard HTTP status code that means the server is temporarily unable to handle the request. This could be because:
- z/OSMF service is down or not responding
- API ML Gateway cannot reach z/OSMF
- The service is still starting up
- There's a network connectivity issue

**Q: What's the difference between HTTP errors and Zowe error codes?**
A: 
- **HTTP status codes** (like 404, 503) are standard HTTP response codes
- **Zowe error codes** (like ZWEAO404E) are Zowe-specific error identifiers that appear in logs
- A single HTTP error might map to multiple Zowe error codes depending on the root cause

**Q: What logs should I check?**
A: For API ML errors, check these logs:
1. **API ML Gateway logs:** `ZWESVUSR` or `ZWESIS01` job logs (look for ZWEAG* error codes)
2. **z/OSMF logs:** Check the z/OSMF server logs for errors
3. **Discovery Service logs:** Check if z/OSMF is properly registered
4. **Zowe server logs:** `zowe-server.log` or `ZWESVUSR` for startup issues

**Assessment:**
This is a **documentation completeness issue**. The issue has two parts:
1. ZWEAO404E entry is incomplete (missing Reason and Action)
2. User needs general troubleshooting guidance for HTTP 503 errors

The user's actual error (HTTP 503) suggests a service availability issue, not a 404 (not found) issue. The documentation should help users distinguish between these scenarios.

**Recommendation:**

1. **Complete the ZWEAO404E entry:**
   ```markdown
   ### ZWEAO404E

     The service can not find the requested resource.

     **Reason:**
     The requested API endpoint or resource path does not exist, or the service is not properly configured.
     
     Possible causes:
     - The base path in your profile is incorrect
     - The resource path is malformed or doesn't match any registered service
     - The service is not properly onboarded to API ML
     - The API service is down or not responding

     **Action:**
     - Verify the base path in your profile matches a registered service
     - Check that the resource path is correct
     - Verify the service is running and registered with API ML
     - Check the API ML Gateway and Discovery Service logs for more details
     - Use `zowe zos-files list data-set --help` to verify the command syntax
   ```

2. **Add a troubleshooting section for HTTP status codes:**
   ```markdown
   ## HTTP Status Codes vs Zowe Error Codes
   
   | HTTP Code | Zowe Error Codes | Meaning | Troubleshooting |
   |------------|-------------------|---------|-----------------|
   | 404 | ZWEAO404E | Not Found | Resource path is incorrect or service not registered |
   | 503 | ZWEAO503E, ZWEAM503E | Service Unavailable | Service is down, not ready, or unreachable |
   | 401 | ZWEAO402E, ZWEAT416E | Unauthorized | Invalid or missing credentials |
   | 403 | ZWEAT403E | Forbidden | User lacks permission |
   
   **For HTTP 503 errors specifically:**
   
   The "Service Unavailable" error typically indicates that the backend service (like z/OSMF) is not accessible through API ML. To troubleshoot:
   
   1. **Check if z/OSMF is running:**
      ```bash
      # On z/OS:
      F IZUSVR1,STATUS
      ```
   
   2. **Check if the service is registered with API ML:**
      - Access the API Catalog UI (usually at https://<gateway-host>:<port>/api/v1/apicatalog)
      - Look for your z/OSMF service in the list
      - Verify the base path (should be something like `/ibmzosmf/api/v1`)
   
   3. **Test direct connectivity to z/OSMF:**
      ```bash
      curl -k https://<zosmf-host>:<zosmf-port>/zosmf/info
      ```
      If this works but API ML doesn't, there's a routing issue.
   
   4. **Check API ML Gateway logs:**
      Look for errors connecting to z/OSMF
   
   5. **Check Discovery Service:**
      - Verify z/OSMF is registered
      - Check the service URL is correct
   ```

3. **Add a "Common Troubleshooting Scenarios" section:**
   ```markdown
   ## Common Troubleshooting Scenarios
   
   ### Scenario: Command works directly to z/OSMF but not through API ML
   
   **Symptoms:**
   - Direct z/OSMF calls work: `curl https://<zosmf>:<port>/zosmf/restfiles/ds...`
   - API ML calls fail with 404 or 503
   
   **Likely Causes:**
   - z/OSMF not properly onboarded to API ML
   - Incorrect base path in profile
   - API ML Gateway cannot reach z/OSMF
   
   **Solution:**
   1. Verify z/OSMF is onboarded (check API Catalog)
   2. Verify base path matches the registered service
   3. Check Gateway can reach z/OSMF (no firewall blocking)
   
   ### Scenario: HTTP 503 with "Service Unavailable"
   
   **Symptoms:**
   - All commands fail with 503
   - Or specific service commands fail with 503
   
   **Likely Causes:**
   - Service is down
   - Service is still starting
   - Network connectivity issue
   - SSL/TLS handshake failure
   
   **Solution:**
   1. Check if the service is running
   2. Wait for service to fully initialize
   3. Verify network connectivity
   4. Check SSL/TLS certificates are valid
   ```

4. **Add log file locations:**
   ```markdown
   ## Log File Locations
   
   | Component | Log Location | What to Look For |
   |-----------|---------------|------------------|
   | API ML Gateway | `ZWESVUSR` or `ZWESIS01` job logs | ZWEAG* error codes, connection errors |
   | Discovery Service | `ZWESVDS0` or similar | ZWEAD* error codes, registration issues |
   | z/OSMF | z/OSMF server logs | HTTP errors, service status |
   | Zowe Server | `zowe-server.log` | Startup errors, component failures |
   | CLI | Terminal output, `--verbose` flag | Request/response details |
   
   **To enable verbose CLI output:**
   ```bash
   zowe zos-files list data-set "COLIN.C.*" --base-profile myprofile -v
   # or
   zowe zos-files list data-set "COLIN.C.*" --base-profile myprofile --verbose
   ```
   ```

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users cannot troubleshoot API ML errors effectively
- **Support Impact:** HIGH - Lack of clear guidance leads to more support tickets
- **Beginner Impact:** CRITICAL - Beginners have no way to diagnose issues

**Related Documentation:**
- `docs/troubleshoot/troubleshoot-apiml-error-codes.md` (primary - needs enhancement)
- `docs/troubleshoot/troubleshoot-apiml.md` (general troubleshooting)
- `docs/user-guide/cli-using-integrating-apiml.md` (CLI usage)
