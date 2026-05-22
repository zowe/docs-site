# Issue #4427: Issue with docs.zowe.org/v2.18.x/extend/extend-apiml/zowe-api-mediation-layer-security-overview/

**URL:** https://github.com/zowe/docs-site/issues/4427

**Created:** 2025-05-11T13:06:32Z

**Updated:** 2025-12-16T10:21:26Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

it says

You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the Gateway, Discovery Service, and API Catalog.

Please make Catalog a link because  I do not know what the catalog is.   I was expecting the zowe.yaml file, not a catalog.

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

**Findings:** The issue is **VALID**. The user wants to understand what "Catalog" refers to in the context of setting ciphers for API ML services.

**User's Question:**
> "It says: You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the Gateway, Discovery Service, and API Catalog."
> "Please make Catalog a link because I do not know what the catalog is. I was expecting the zowe.yaml file, not a catalog."

**Current Documentation State:**

The file `docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md` (around line 108) states:

```
You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the Gateway, Discovery Service, and API Catalog.
```

**What's Missing:**

1. **No explanation of what "Catalog" means:**
   - Users don't understand what "API Catalog" refers to

2. **No link to API Catalog documentation:**
   - The word "Catalog" should be a link to the API Catalog documentation

3. **Unclear where to configure ciphers:**
   - User expected zowe.yaml but the documentation mentions "properties of the Gateway, Discovery Service, and API Catalog"

**Technical Clarification:**

**Q: What is the Catalog?**
A: The **API Catalog** is one of the core services of Zowe API Mediation Layer. It's a web-based user interface that:
- Displays a list of all API services registered with API ML
- Shows API documentation for each service
- Provides a way for users to discover and explore available APIs
- Allows users to try out API calls

The API Catalog service runs alongside the Gateway and Discovery Service as part of API ML.

**Q: What is the relationship between API Catalog and cipher configuration?**
A: The API Catalog, like all API ML services (Gateway, Discovery, API Catalog), uses HTTPS/TLS for secure communication. Each of these services has its own HTTPS server, and each can have its ciphers configured independently.

**Q: Where do I configure ciphers - in zowe.yaml or elsewhere?**
A: Ciphers can be configured in TWO places:

1. **In zowe.yaml (recommended):**
   ```yaml
   components:
     gateway:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384"
     discovery:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
     api-catalog:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
   ```

2. **In service-specific configuration files:**
   - On z/OS: In the STARTUP parameters for each STC (ZWESIS01 for Gateway, ZWESVDS0 for Discovery, ZWESACS0 for API Catalog)
   - On Linux: In the `start.sh` script for each component

**Q: What is the API Catalog service called?**
A: The API Catalog service has different names depending on context:
- **Service name:** API Catalog, or API Mediation Layer Catalog
- **Component name:** `api-catalog`
- **STC name on z/OS:** `ZWESACS0`
- **Process name on Linux:** Usually contains "catalog" or "api-catalog"

**Assessment:**
This is a **documentation usability issue**. The documentation:
1. Uses "Catalog" without explaining what it is or linking to its documentation
2. Doesn't clarify where cipher configuration happens (zowe.yaml vs service-specific files)
3. Assumes users know the relationship between services and their configuration

**Recommendation:**

1. **Add a link and explanation for API Catalog:**
   ```markdown
   You can override ciphers that are used by the HTTPS servers in API ML services by configuring properties of the [API Gateway](#), [Discovery Service](#), and [API Catalog](../user-guide/api-mediation/api-catalog-overview.md).
   
   :::info What is API Catalog?
   The **API Catalog** is a core API ML service that provides a web UI for discovering and exploring APIs registered with API Mediation Layer. It's one of the three main services alongside Gateway and Discovery Service.
   :::
   ```

2. **Add a section explaining the three core services:**
   ```markdown
   ### API Mediation Layer Core Services
   
   API ML consists of three core services, each with its own HTTPS server:
   
   | Service | Purpose | STC Name (z/OS) | Configuration Key |
   |---------|---------|-----------------|-----------------|
   | [API Gateway](api-mediation-routing.md) | Routes API requests, handles authentication | ZWESIS01 | `components.gateway` |
   | [Discovery Service](api-mediation-routing.md) | Service registry, tracks available services | ZWESVDS0 | `components.discovery` |
   | [API Catalog](api-catalog-overview.md) | Web UI for API discovery and documentation | ZWESACS0 | `components.api-catalog` |
   
   Each service can have its ciphers configured independently.
   ```

3. **Clarify where to configure ciphers:**
   ```markdown
   ### Where to Configure Ciphers
   
   **Option 1: In zowe.yaml (Recommended)**
   
   The easiest way to configure ciphers for all services is in the `zowe.yaml` file:
   
   ```yaml
   components:
     gateway:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
     discovery:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
     api-catalog:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
   ```
   
   After changing `zowe.yaml`, restart Zowe or the specific component.
   
   **Option 2: In Service-Specific Files**
   
   For advanced configurations, you can set ciphers in service-specific configuration:
   
   **On z/OS:**
   - Modify the STARTUP parameters for each STC
   - For Gateway (ZWESIS01): Add `-Dapiml.security.ciphers=<cipher-list>` to the PARM
   - For Discovery (ZWESVDS0): Add the same parameter
   - For API Catalog (ZWESACS0): Add the same parameter
   
   **On Linux:**
   - Edit the `start.sh` script for each component in `<RUNTIME_DIR>/components/<component>/bin/`
   - Add: `export SERVER_SSL_CIPHERS=<cipher-list>` or `-Dapiml.security.ciphers=<cipher-list>`
   
   **Option 3: Via Environment Variables**
   
   Some deployments support setting ciphers via environment variables:
   ```bash
   export APIML_GATEWAY_CIPHERS="TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
   export APIML_DISCOVERY_CIPHERS="TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
   export APIML_CATALOG_CIPHERS="TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
   ```
   ```

4. **Add a cipher configuration example:**
   ```markdown
   ### Example: Setting Ciphers for All Services
   
   To set strong ciphers for all three core services in `zowe.yaml`:
   
   ```yaml
   components:
     gateway:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_AES_256_GCM_SHA384"
     discovery:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_AES_256_GCM_SHA384"
     api-catalog:
       tls:
         ciphers: "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_AES_256_GCM_SHA384"
   ```
   
   **Recommended strong ciphers:**
   ```
   TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
   TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
   TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
   TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256
   TLS_AES_256_GCM_SHA384
   TLS_AES_128_GCM_SHA256
   ```
   
   **Ciphers to avoid:**
   - Any cipher with `CBC` mode (vulnerable to attacks)
   - Any cipher with `RC4`
   - Any cipher with `DES` or `3DES`
   - SSLv3 ciphers
   ```

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users don't understand the API ML service architecture
- **Configuration Impact:** MEDIUM - Users might configure ciphers in the wrong place
- **Beginner Impact:** HIGH - Beginners won't know what API Catalog is

**Related Documentation:**
- `docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md` (primary - needs enhancement)
- `docs/user-guide/api-mediation/api-catalog-overview.md` (API Catalog overview)
- `docs/extend/extend-apiml/api-mediation-routing.md` (API ML services overview)

