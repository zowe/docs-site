# Issue #4430: Issue with docs.zowe.org/stable/extend/extend-apiml/authentication-for-apiml-services/

**URL:** https://github.com/zowe/docs-site/issues/4430

**Created:** 2025-05-11T13:21:33Z

**Updated:** 2025-12-16T10:21:28Z

**Labels:** area: apiml, priority-medium, Size: M, security authentication

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

The zOSMF service is onboarded statically under the ibmzosmf service id. The specific definition is created during the Zowe configuration based on the values provided in the zowe.yaml file.


what values is is based on...  for example I want to create a second z/OSMF system -  what do I need to provide to make this id unique - please specify

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

**Findings:** The issue is **VALID**. The user wants to know what values in zowe.yaml are used to create a second z/OSMF service definition.

**User's Question:**
> "It says: The zOSMF service is onboarded statically under the ibmzosmf service id. The specific definition is created during the Zowe configuration based on the values provided in the zowe.yaml file."
> "what values is is based on... for example I want to create a second z/OSMF system - what do I need to provide to make this id unique - please specify"

**Current Documentation State:**

The versioned documentation mentions that z/OSMF is onboarded statically with service id `ibmzosmf` based on zowe.yaml values, but doesn't specify which values or how to create additional z/OSMF instances.

**What's Missing:**

1. **No explanation of which zowe.yaml values are used:**
   - What parameters in zowe.yaml define the z/OSMF service?

2. **No guidance on creating multiple z/OSMF instances:**
   - How to add a second z/OSMF with a unique service id

3. **No examples of multi-z/OSMF configuration:**
   - Concrete examples showing how to define multiple instances

**Technical Clarification:**

**Q: What values in zowe.yaml are used to create the z/OSMF service definition?**
A: The z/OSMF service definition is created from a combination of:

1. **Explicit static API definitions** in zowe.yaml:
   ```yaml
   components:
     discovery:
       staticApiDefinitionsDirectories:
         - ./api-defs
   
   # And in the api-defs directory, a YAML file defining z/OSMF:
   # Example: api-defs/zosmf.yaml
   staticApiDefinitions:
     - serviceId: ibmzosmf
       instanceBaseUrls:
         - https://<zosmf-host>:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: ibmzosmf
           title: z/OSMF
           description: IBM z/OSMF
   ```

2. **If no static definition exists**, Zowe may auto-generate one based on:
   ```yaml
   # In zowe.yaml:
   zOSMF:
     host: zosmf.example.com
     port: 443
     basePath: /zosmf
   
   # Or
   components:
     zosmf:
       host: zosmf.example.com
       port: 443
   ```

3. **The default service id** is typically `ibmzosmf` unless overridden.

**Q: How do I create a second z/OSMF system?**
A: To add a second (or additional) z/OSMF instance, you have TWO options:

**Option 1: Add to Static API Definitions (Recommended)**

1. Create or edit a static API definition file (e.g., `api-defs/zosmf-instances.yaml`):
   ```yaml
   staticApiDefinitions:
     # First z/OSMF instance (existing)
     - serviceId: ibmzosmf
       instanceBaseUrls:
         - https://zosmf1.example.com:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: ibmzosmf
           title: z/OSMF Instance 1
           description: Primary z/OSMF
   
     # Second z/OSMF instance (new)
     - serviceId: zosmf-secondary
       instanceBaseUrls:
         - https://zosmf2.example.com:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: zosmf-secondary
           title: z/OSMF Instance 2
           description: Secondary z/OSMF
   ```

2. Update zowe.yaml to point to the directory containing your definitions:
   ```yaml
   components:
     discovery:
       staticApiDefinitionsDirectories:
         - ./api-defs
   ```

3. Restart the Discovery Service for changes to take effect.

**Option 2: Use Multiple zowe.yaml Configurations (Advanced)**

For completely separate Zowe instances (not just multiple z/OSMF under one Zowe):
1. Create separate zowe.yaml files for each instance
2. Each can have its own z/OSMF configuration
3. Run separate Zowe instances with different configurations

**Q: What do I need to provide to make the service id unique?**
A: To make each z/OSMF service unique, you need to provide **unique values for these fields**:

| Field | Purpose | Example Values | Uniqueness Requirement |
|-------|---------|----------------|-----------------------|
| `serviceId` | Internal service identifier | `ibmzosmf`, `zosmf-dev`, `zosmf-prod` | **MUST be unique** across all services |
| `instanceBaseUrls` | URL(s) of the z/OSMF instance | `https://zosmf1:443`, `https://zosmf2:443` | **MUST be unique** per instance |
| `catalog.tile.id` | UI tile identifier | `zosmf-1`, `zosmf-2` | **MUST be unique** in API Catalog |
| `routing.gatewayUrl` | Gateway URL path | `api/v1`, `api/v2` | Can be same or different |

**What happens if service ids are not unique?**
- Discovery Service will treat them as the same service
- Only one instance will be registered (last one wins)
- Users will see only one z/OSMF in the API Catalog
- Authentication may fail unpredictably

**Q: Can I have the same service id with different URLs?**
A: **NO**. The `serviceId` must be unique. However, you CAN have:
- One service id with multiple `instanceBaseUrls` (load balancing / HA)
- Example: One `ibmzosmf` service with multiple z/OSMF instances behind a load balancer

**Example: Multiple z/OSMF instances with load balancing:**
```yaml
staticApiDefinitions:
  - serviceId: ibmzosmf  # Single service id
    instanceBaseUrls:
      - https://zosmf-lb.example.com:443  # Load balancer
      # - https://zosmf1.example.com:443  # Or individual instances
      # - https://zosmf2.example.com:443
    homePageRelativeUrl: /zosmf
    routing:
      - serviceRelativeUrl: /zosmf
        gatewayUrl: api/v1
    catalog:
      tile:
        id: ibmzosmf
        title: z/OSMF
        description: IBM z/OSMF with HA
```

**Assessment:**
This is a **documentation gap issue**. The documentation:
1. Doesn't specify which zowe.yaml values define z/OSMF services
2. Doesn't explain how to add multiple z/OSMF instances
3. Doesn't provide examples of multi-instance configuration

**Recommendation:**

1. **Add a "z/OSMF Service Definition" section:**
   ```markdown
   ### z/OSMF Service Definition in zowe.yaml
   
   The z/OSMF service is defined in one of two ways:
   
   **Method 1: Static API Definition (Recommended)**
   
   In a YAML file under the directory specified by `components.discovery.staticApiDefinitionsDirectories`:
   
   ```yaml
   # In api-defs/zosmf.yaml:
   staticApiDefinitions:
     - serviceId: ibmzosmf
       instanceBaseUrls:
         - https://<zosmf-host>:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: ibmzosmf
           title: z/OSMF
   ```
   
   **Method 2: Auto-generation from zowe.yaml**
   
   If no static definition exists, Zowe can auto-generate one from:
   ```yaml
   zOSMF:
     host: zosmf.example.com
     port: 443
     basePath: /zosmf
   ```
   ```

2. **Add "Multiple z/OSMF Instances" section:**
   ```markdown
   ### Configuring Multiple z/OSMF Instances
   
   To register multiple z/OSMF instances with API ML:
   
   **Step 1: Create static API definitions**
   ```yaml
   # In api-defs/zosmf-instances.yaml:
   staticApiDefinitions:
     - serviceId: zosmf-production
       instanceBaseUrls:
         - https://zosmf-prod.example.com:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: zosmf-production
           title: Production z/OSMF
           description: Production z/OSMF instance
   
     - serviceId: zosmf-development
       instanceBaseUrls:
         - https://zosmf-dev.example.com:443
       homePageRelativeUrl: /zosmf
       routing:
         - serviceRelativeUrl: /zosmf
           gatewayUrl: api/v1
       catalog:
         tile:
           id: zosmf-development
           title: Development z/OSMF
           description: Development z/OSMF instance
   ```
   
   **Step 2: Update zowe.yaml**
   ```yaml
   components:
     discovery:
       staticApiDefinitionsDirectories:
         - ./api-defs
   ```
   
   **Step 3: Restart Discovery Service**
   ```bash
   # On z/OS:
   P ZWESVDS0
   S ZWESVDS0
   
   # On Linux:
   systemctl restart zowe-discovery
   # or
   ./bin/zowe-discovery.sh restart
   ```
   
   **Step 4: Verify registration**
   ```bash
   curl -k https://<discovery-host>:<port>/eureka/apps | jq .
   # Should show both zosmf-production and zosmf-development
   ```
   ```

3. **Add a table of unique fields:**
   ```markdown
   ### Required Unique Fields for Multiple z/OSMF
   
   | Field | Example | Must Be Unique? | Notes |
   |-------|---------|----------------|-------|
   | `serviceId` | `zosmf-prod`, `zosmf-dev` | ✅ **YES** | Primary identifier |
   | `instanceBaseUrls[]` | `https://host1:443`, `https://host2:443` | ✅ **YES** per instance | URLs of actual instances |
   | `catalog.tile.id` | `zosmf-1`, `zosmf-2` | ✅ **YES** | UI tile identifier |
   | `catalog.tile.title` | `Prod z/OSMF`, `Dev z/OSMF` | ❌ No | Display name only |
   | `routing.gatewayUrl` | `api/v1`, `api/v2` | ❌ No | Can share gateway path |
   | `homePageRelativeUrl` | `/zosmf` | ❌ No | Typically same for all z/OSMF |
   ```

4. **Add authentication considerations:**
   ```markdown
   ### Authentication with Multiple z/OSMF Instances
   
   When using multiple z/OSMF instances with z/OSMF Authentication Provider:
   
   **Option A: Single zosmfServiceId (Load Balanced)**
   ```yaml
   components:
     gateway:
       apiml:
         security:
           auth:
             provider: zosmf
             zosmfServiceId: ibmzosmf  # Points to load balancer
   ```
   
   **Option B: Multiple Profiles (User Selection)**
   ```json
   {
     "defaults": {
       "zosmf": "zosmf-prod"  // Default to production
     },
     "profiles": {
       "zosmf-prod": {
         "type": "zosmf",
         "properties": {
           "basePath": "zosmf-production/api/v1"
         }
       },
       "zosmf-dev": {
         "type": "zosmf",
         "properties": {
           "basePath": "zosmf-development/api/v1"
         }
       }
     }
   }
   ```
   
   Users can then specify which z/OSMF to use:
   ```bash
   zowe zos-files list data-set "DS.*" --zosmf-profile zosmf-dev
   ```
   ```

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** System administrators cannot configure multiple z/OSMF instances
- **Configuration Impact:** HIGH - Prevents multi-instance setups
- **Beginner Impact:** HIGH - Beginners won't know how to add additional instances

**Related Documentation:**
- `versioned_docs/version-v3.1.x/extend/extend-apiml/authentication-for-apiml-services.md` (primary - needs enhancement)
- `docs/extend/extend-apiml/onboard-static-definition.md` (static API definitions)
- `docs/user-guide/api-mediation/configuration-gateway.md` (gateway configuration)

