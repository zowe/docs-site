# Issue #4431: Issue with docs.zowe.org/v3.1.x/user-guide/api-mediation/configuration-jwt/

**URL:** https://github.com/zowe/docs-site/issues/4431

**Created:** 2025-05-11T13:28:55Z

**Updated:** 2025-05-21T15:10:30Z

**Labels:** JWT

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

it says

Using SAF as an authentication provider


... I started off using SAF as a provider.  Please document what I need to provide to use zosmf

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ✅ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user started with SAF as an authentication provider and wants to know what they need to provide to use z/OSMF instead.

**User's Request:**
> "Using SAF as an authentication provider... I started off using SAF as a provider. Please document what I need to provide to use zosmf"

**Current Documentation State:**

The file `versioned_docs/version-v3.1.x/user-guide/api-mediation/configuration-jwt.md` likely has information about JWT configuration but may not clearly explain the differences between SAF and z/OSMF authentication providers, or how to switch from one to the other.

**What's Missing:**

1. **No migration guide:**
   - How to switch from SAF to z/OSMF authentication provider

2. **No comparison:**
   - What's different between SAF and z/OSMF providers

3. **No configuration requirements:**
   - What specific parameters are needed for z/OSMF provider

**Technical Clarification:**

**Q: What do I need to provide to use z/OSMF authentication provider instead of SAF?**
A: To switch from SAF to z/OSMF authentication provider, you need to provide/configure:

**Required for z/OSMF Provider:**
1. **z/OSMF must be running and accessible**
2. **z/OSMF must be registered with API ML** (or you must register it)
3. **z/OSMF service id** (if not using default `ibmzosmf`)

**Configuration Changes:**

**Current (SAF):**
```yaml
components:
  gateway:
    apiml:
      security:
        auth:
          provider: saf
```

**To switch to z/OSMF:**
```yaml
components:
  gateway:
    apiml:
      security:
        auth:
          provider: zosmf
          zosmfServiceId: ibmzosmf  # or your custom service id
```

**What you need to provide:**

| Item | SAF Provider | z/OSMF Provider | Required? |
|------|--------------|-----------------|-----------|
| z/OSMF running | ❌ No | ✅ Yes | ✅ Yes |
| z/OSMF registered with API ML | ❌ No | ✅ Yes | ✅ Yes |
| zosmfServiceId | ❌ No | ✅ Yes | ❌ Only if not default |
| SAF configuration | ✅ Yes | ❌ No | ❌ No |
| z/OSMF credentials | ❌ No | ❌ No | ❌ No (handled by provider) |

**Detailed Requirements:**

1. **z/OSMF must be running:**
   - On z/OS: `F IZUSVR1,STATUS` should show it's active
   - Verify: `curl -k https://<zosmf-host>:<port>/zosmf/info`

2. **z/OSMF must be registered with API ML:**
   - Check Discovery Service: `curl -k https://<discovery-host>:<port>/eureka/apps | grep -i zosmf`
   - Or check API Catalog UI
   - If not registered, add a static API definition (see issue #4430)

3. **z/OSMF connection details:**
   - The API Gateway needs to be able to connect to z/OSMF
   - This is typically configured via the service registration (instanceBaseUrls)
   - Example: z/OSMF registered with URL `https://zosmf.example.com:443`

4. **z/OSMF service id:**
   - Default: `ibmzosmf`
   - Custom: Whatever you defined in your static API definition
   - Find it: See issue #4429 for methods to discover your service id

5. **TLS configuration:**
   - The API Gateway must trust z/OSMF's certificate
   - z/OSMF's CA must be in the Gateway's truststore
   - Or z/OSMF certificate must be directly trusted

**What SAF Provider provides that z/OSMF doesn't:**
- SAF uses z/OS security system directly (RACF, TopSecret, ACF2)
- SAF doesn't require z/OSMF to be running
- SAF authenticates directly against the z/OS security database
- SAF is typically faster for z/OS-native users

**What z/OSMF Provider provides that SAF doesn't:**
- z/OSMF can authenticate users who don't have z/OS accounts (via z/OSMF's own user registry)
- z/OSMF supports JWT tokens natively
- z/OSMF is easier to integrate with external systems
- z/OSMF provides more detailed user information

**Migration Steps:**

**Step 1: Verify z/OSMF is ready**
```bash
# Check z/OSMF is running
curl -k https://<zosmf-host>:<port>/zosmf/info

# Check z/OSMF is registered with API ML
curl -k https://<discovery-host>:<port>/eureka/apps | grep -i zosmf
```

**Step 2: Update zowe.yaml**
```yaml
components:
  gateway:
    apiml:
      security:
        auth:
          provider: zosmf
          zosmfServiceId: ibmzosmf  # or your service id
```

**Step 3: Restart API Gateway**
```bash
# On z/OS:
P ZWESIS01
S ZWESIS01

# On Linux:
systemctl restart zowe-gateway
# or
./bin/zowe-gateway.sh restart
```

**Step 4: Test authentication**
```bash
# Try to login with z/OSMF provider
zowe auth login apiml --user myuser --password mypassword

# Check you get a token
zowe auth status apiml
```

**Troubleshooting:**

**Problem: Authentication fails after switching**
- Verify z/OSMF is running and registered
- Check the service id is correct
- Verify Gateway can reach z/OSMF
- Check Gateway logs for connection errors

**Problem: "zOSMF service name not found"**
- The `zosmfServiceId` doesn't match any registered service
- Verify with: `curl -k https://<discovery-host>:<port>/eureka/apps`
- Update zowe.yaml with the correct service id

**Problem: Connection timeout**
- Gateway cannot reach z/OSMF
- Check network connectivity
- Verify z/OSMF host and port are correct in the service registration
- Check firewall rules

**Assessment:**
This is a **documentation gap issue**. The documentation doesn't provide:
- A migration guide from SAF to z/OSMF
- A comparison of the two providers
- Clear requirements for using z/OSMF provider

**Recommendation:**

1. **Add a "Choosing an Authentication Provider" section:**
   ```markdown
   ### SAF vs z/OSMF Authentication Provider
   
   | Feature | SAF Provider | z/OSMF Provider |
   |---------|---------------|-----------------|
   | **Authentication Method** | Direct SAF calls | z/OSMF API calls |
   | **Requires z/OSMF** | ❌ No | ✅ Yes |
   | **User Registry** | z/OS security database | z/OSMF user registry |
   | **Token Type** | Zowe JWT | z/OSMF JWT or Zowe JWT |
   | **Performance** | ⚡ Fast (direct) | 🏎️ Fast (via API) |
   | **Setup Complexity** | Low | Medium |
   | **External Users** | ❌ No (needs z/OS account) | ✅ Yes (z/OSMF users) |
   | **Mainframe Users** | ✅ Yes | ✅ Yes |
   | **Recommended For** | z/OS-native environments | Mixed environments |
   
   **Use SAF if:**
   - All your users have z/OS accounts
   - You want direct authentication without z/OSMF dependency
   - You're in a purely mainframe environment
   
   **Use z/OSMF if:**
   - You need to support users without z/OS accounts
   - You're already using z/OSMF for other purposes
   - You want to leverage z/OSMF's JWT support
   - You need integration with external systems
   ```

2. **Add a migration guide:**
   ```markdown
   ### Migrating from SAF to z/OSMF Authentication Provider
   
   **Prerequisites:**
   - [ ] z/OSMF is installed and running
   - [ ] z/OSMF is registered with API ML
   - [ ] z/OSMF service id is known
   - [ ] API Gateway can connect to z/OSMF
   
   **Migration Steps:**
   
   1. **Verify z/OSMF registration:**
      ```bash
      curl -k https://<discovery-host>:<port>/eureka/apps | grep -i zosmf
      ```
   
   2. **Find your z/OSMF service id:**
      See [Finding Your z/OSMF Service ID](#finding-your-zosmf-service-id) (Issue #4429)
   
   3. **Update zowe.yaml:**
      ```yaml
      components:
        gateway:
          apiml:
            security:
              auth:
                provider: zosmf
                zosmfServiceId: <your-service-id>  # e.g., ibmzosmf
      ```
   
   4. **Restart API Gateway:**
      ```bash
      # On z/OS:
      P ZWESIS01 && S ZWESIS01
      
      # On Linux:
      systemctl restart zowe-gateway
      ```
   
   5. **Test authentication:**
      ```bash
      zowe auth login apiml --user myuser --password mypassword
      ```
   
   6. **Verify token:**
      ```bash
      zowe auth status apiml
      ```
   
   **Rollback Plan:**
   If you encounter issues, revert to SAF:
   ```yaml
   components:
     gateway:
       apiml:
         security:
           auth:
             provider: saf
   ```
   And restart the Gateway.
   ```

3. **Add configuration requirements:**
   ```markdown
   ### z/OSMF Authentication Provider Requirements
   
   To use the z/OSMF authentication provider, ensure:
   
   **1. z/OSMF Configuration:**
   - z/OSMF is installed and running
   - z/OSMF is accessible from the API Gateway
   - z/OSMF has user authentication enabled
   
   **2. API ML Configuration:**
   - z/OSMF is registered with Discovery Service
   - The service id is correctly set in your configuration
   
   **3. Network Configuration:**
   - API Gateway can reach z/OSMF (no firewall blocking)
   - DNS resolution works for z/OSMF hostname
   
   **4. TLS Configuration:**
   - API Gateway trusts z/OSMF's certificate
   - z/OSMF's CA is in Gateway's truststore
   - Or z/OSMF certificate is directly trusted
   
   **5. User Requirements:**
   - Users must have accounts in z/OSMF
   - Or users must be defined in z/OSMF's user registry
   ```

4. **Add troubleshooting:**
   ```markdown
   ### Troubleshooting z/OSMF Authentication
   
   **Error: "zOSMF service name not found"**
   
   **Cause:** The `zosmfServiceId` doesn't match any registered service.
   
   **Solution:**
   1. Verify the service id:
      ```bash
      curl -k https://<discovery-host>:<port>/eureka/apps | jq .
      ```
   2. Update zowe.yaml with the correct service id
   3. Restart Gateway
   
   **Error: Connection timeout to z/OSMF**
   
   **Cause:** Gateway cannot reach z/OSMF.
   
   **Solution:**
   1. Verify z/OSMF is running: `F IZUSVR1,STATUS`
   2. Test direct connection:
      ```bash
      curl -v https://<zosmf-host>:<port>/zosmf/info
      ```
   3. Check network connectivity from Gateway server
   4. Verify hostname resolution
   
   **Error: Certificate not trusted**
   
   **Cause:** Gateway doesn't trust z/OSMF's certificate.
   
   **Solution:**
   1. Add z/OSMF's CA to Gateway's truststore
   2. Or add z/OSMF certificate directly to truststore
   3. Restart Gateway
   
   **Error: Invalid credentials**
   
   **Cause:** User credentials are not valid in z/OSMF.
   
   **Solution:**
   1. Verify user exists in z/OSMF
   2. Check user password
   3. Ensure user is not locked out
   ```

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users cannot switch between authentication providers
- **Configuration Impact:** MEDIUM - Misconfiguration prevents authentication
- **Flexibility Impact:** HIGH - Users don't know their options for authentication

**Related Documentation:**
- `versioned_docs/version-v3.1.x/user-guide/api-mediation/configuration-jwt.md` (primary - needs enhancement)
- `docs/user-guide/authentication-providers-for-apiml.md` (authentication providers overview)
- `docs/getting-started/configure-zowe-server.md` (zowe.yaml configuration)

