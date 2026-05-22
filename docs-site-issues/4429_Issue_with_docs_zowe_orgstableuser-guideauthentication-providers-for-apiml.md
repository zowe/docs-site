# Issue #4429: Issue with docs.zowe.org/stable/user-guide/authentication-providers-for-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4429

**Created:** 2025-05-11T13:19:13Z

**Updated:** 2025-12-16T10:21:27Z

**Labels:** area: apiml, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

_components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Replace me with the correct z/OSMF service id_

where do I get the z/osmf service id from?

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

**Findings:** The issue is **VALID**. The user doesn't know where to get the z/OSMF service id from.

**User's Question:**
> "It says: `_components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Replace me with the correct z/OSMF service id_`"
> "where do I get the z/osmf service id from?"

**Current Documentation State:**

The file `docs/user-guide/authentication-providers-for-apiml.md` (around line 40) shows:

```
components.gateway.apiml.security.auth.provider: zosmf
components.gateway.apiml.security.auth.zosmfServiceId: ibmzosmf  # Replace me with the correct z/OSMF service id
```

**What's Missing:**

1. **No explanation of what the z/OSMF service id is:**
   - Users don't understand what this value represents

2. **No guidance on where to find it:**
   - How to obtain the correct value for their environment

3. **No explanation of when it's needed:**
   - When is this parameter required vs optional

**Technical Clarification:**

**Q: What is the z/OSMF service id?**
A: The **z/OSMF service id** is the service identifier under which z/OSMF is registered with the API Mediation Layer. It's used by the API Gateway to route authentication requests to the correct z/OSMF instance.

**Q: Where do I get it from?**
A: There are SEVERAL ways to find your z/OSMF service id:

**Method 1: Check the zowe.yaml configuration**
```yaml
# In zowe.yaml, look for the z/OSMF static definition:
components:
  discovery:
    staticApiDefinitionsDirectories:
      - ./api-defs
    
# Or look for explicit z/OSMF configuration:
zOSMF:
  serviceId: myzosmf  # This is your service id
```

**Method 2: Check API Catalog**
1. Access the API Catalog UI: `https://<gateway-host>:<gateway-port>/api/v1/apicatalog`
2. Look for the z/OSMF service in the list
3. The service id is typically shown in the service details

**Method 3: Check Discovery Service**
```bash
# Query Discovery Service directly:
curl -k https://<discovery-host>:<discovery-port>/eureka/apps

# Look for the z/OSMF application:
# You'll see something like:
# {
#   "application": {
#     "name": "ibmzosmf",
#     "instance": [...]
#   }
# }
# The "name" field is your service id.
```

**Method 4: Check z/OSMF configuration**
```
# On z/OS, check the IZUSVR1 STC procedure or parmlib member
# Look for:
# - SERVICE_ID parameter
# - Or the service name in the configuration
```

**Method 5: Default value**
- If z/OSMF was onboarded using the default configuration, the service id is typically: **`ibmzosmf`**
- This is why the documentation shows `ibmzosmf` as the example value

**Q: What if I have multiple z/OSMF instances?**
A: If you have multiple z/OSMF instances, each must be registered with a unique service id. Common patterns:

| Scenario | Service ID Example | Notes |
|----------|-------------------|-------|
| Default single z/OSMF | `ibmzosmf` | Standard installation |
| Multiple z/OSMF (dev/test) | `zosmf-dev`, `zosmf-test` | Custom names |
| z/OSMF LPAR-specific | `zosmf-prod`, `zosmf-dr` | Based on LPAR |
| Custom name | `mycompany-zosmf` | Your organization's standard |

**How to set custom service ids:**
```yaml
# In zowe.yaml or static API definition:
staticApiDefinitions:
  - serviceId: myzosmf-prod
    instanceBaseUrls:
      - https://zosmf-prod.example.com:443
    homePageRelativeUrl: /zosmf
    routing:
      - serviceRelativeUrl: /zosmf
        gatewayUrl: api/v1
    catalog:
      tile:
        id: zosmf-prod
        title: z/OSMF Production
        description: Production z/OSMF instance
```

**Q: When is this parameter required?**
A: The `zosmfServiceId` parameter is required when:
- You're using the **z/OSMF Authentication Provider** (`provider: zosmf`)
- You have **multiple z/OSMF instances** registered with API ML
- The default `ibmzosmf` doesn't match your actual service id

It's optional (or can use the default) when:
- You're using the **SAF Authentication Provider** (`provider: saf`)
- You have only one z/OSMF instance registered with the default service id `ibmzosmf`

**Assessment:**
This is a **documentation completeness issue**. The documentation shows the parameter but doesn't explain:
- What it is
- Where to find it
- When it's needed
- How to handle multiple z/OSMF instances

**Recommendation:**

1. **Add explanation of the parameter:**
   ```markdown
   ### z/OSMF Service ID
   
   The `zosmfServiceId` parameter specifies the service identifier under which z/OSMF is registered with API Mediation Layer. This allows the API Gateway to correctly route authentication requests to your z/OSMF instance.
   
   :::info
   This parameter is **only used when `provider: zosmf`** (z/OSMF Authentication Provider).
   If you're using `provider: saf` (SAF Authentication Provider), this parameter is ignored.
   :::
   ```

2. **Add "Finding Your z/OSMF Service ID" section:**
   ```markdown
   ### Finding Your z/OSMF Service ID
   
   Use one of these methods to find your service id:
   
   **Method 1: Check API Catalog (Recommended)**
   1. Access: `https://<gateway-host>:<port>/api/v1/apicatalog`
   2. Find the z/OSMF service tile
   3. Click on it and look for the "Service ID" or "Name" field
   
   **Method 2: Query Discovery Service**
   ```bash
   curl -k https://<discovery-host>:<port>/eureka/apps | jq .
   # Look for application names like "ibmzosmf" or "zosmf-*"
   ```
   
   **Method 3: Check zowe.yaml**
   ```bash
   grep -i "zosmf" zowe.yaml
   # Look for serviceId or instanceBaseUrls containing zosmf
   ```
   
   **Method 4: Default Value**
   If you didn't customize the installation, the service id is likely: **`ibmzosmf`**
   ```

3. **Add multiple z/OSMF configuration example:**
   ```markdown
   ### Multiple z/OSMF Instances
   
   If you have multiple z/OSMF instances, register each with a unique service id:
   
   **Static API Definition (recommended):**
   ```yaml
   # In your static API definition file:
   staticApiDefinitions:
     - serviceId: zosmf-prod
       instanceBaseUrls:
         - https://zosmf-prod.example.com:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: zosmf-prod
           title: z/OSMF Production
   
     - serviceId: zosmf-test
       instanceBaseUrls:
         - https://zosmf-test.example.com:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: zosmf-test
           title: z/OSMF Test
   ```
   
   **Then in zowe.yaml:**
   ```yaml
   components:
     gateway:
       apiml:
         security:
           auth:
             provider: zosmf
             zosmfServiceId: zosmf-prod  # Point to your primary z/OSMF
   ```
   
   **For CLI users:**
   You can then specify which z/OSMF to use via the basePath in your profile:
   ```json
   {
     "profiles": {
       "zosmf-prod": {
         "type": "zosmf",
         "properties": {
           "basePath": "zosmf-prod/api/v1"
         }
       },
       "zosmf-test": {
         "type": "zosmf",
         "properties": {
           "basePath": "zosmf-test/api/v1"
         }
       }
     }
   }
   ```
   ```

4. **Add troubleshooting:**
   ```markdown
   ### Troubleshooting z/OSMF Service ID
   
   **Problem: Authentication fails with "zOSMF service name not found"**
   
   **Cause:** The `zosmfServiceId` doesn't match any registered service.
   
   **Solution:**
   1. Verify the service id exists in Discovery Service:
      ```bash
      curl -k https://<discovery-host>:<port>/eureka/apps | grep -i zosmf
      ```
   2. Check for typos in your configuration
   3. Ensure the service is properly registered and running
   4. If using a custom service id, verify it was onboarded correctly
   
   **Problem: 404 error when calling z/OSMF through API ML**
   
   **Possible Causes:**
   - Wrong service id in configuration
   - z/OSMF not registered with API ML
   - z/OSMF service not running
   - Base path mismatch
   
   **Checks:**
   1. Verify service registration (above)
   2. Check z/OSMF is running: `F IZUSVR1,STATUS`
   3. Verify base path in your profile matches the service registration
   ```

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users cannot configure z/OSMF authentication properly
- **Configuration Impact:** MEDIUM - Misconfiguration prevents authentication
- **Beginner Impact:** HIGH - Beginners won't know where to find this value

**Related Documentation:**
- `docs/user-guide/authentication-providers-for-apiml.md` (primary - needs enhancement)
- `docs/user-guide/api-mediation/configuration-extender-passtickets.md` (z/OSMF configuration)
- `docs/extend/extend-apiml/onboard-static-definition.md` (static API definitions)

