# Issue #4426: Issue with docs.zowe.org/stable/extend/extend-apiml/authentication-for-apiml-services/

**URL:** https://github.com/zowe/docs-site/issues/4426

**Created:** 2025-05-10T10:48:19Z

**Updated:** 2025-12-16T10:21:25Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

eureka/**	client certificate	Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the keystore/localhost/localhost.keystore.p12 keystore or in the SAF keyring. It is exported to .pem format for convenience. Any other certificate which is valid and trusted by Discovery service can be used.


a) what does ** mean
b) What do I do  with this info?
c) what is stored in the saf keyring?  I do not recall seeing this as part of the security definitions.
d) What exports it?
e) Where is it stored?
f) do I require authoisation wih zOSMF or is SAF ok?

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

**Findings:** The issue is **VALID**. The user has multiple questions about client certificate authentication for eureka services that are not clearly explained in the documentation.

**User's Questions:**
> The documentation says:
> "eureka/**	client certificate	Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the keystore/localhost/localhost.keystore.p12 keystore or in the SAF keyring. It is exported to .pem format for convenience. Any other certificate which is valid and trusted by Discovery service can be used."
>
> User asks:
> a) what does ** mean
> b) What do I do with this info?
> c) what is stored in the saf keyring? I do not recall seeing this as part of the security definitions.
> d) What exports it?
> e) Where is it stored?
> f) do I require authoisation wih zOSMF or is SAF ok?

**Current Documentation State:**

The file `versioned_docs/version-v3.1.x/extend/extend-apiml/authentication-for-apiml-services.md` (and similar in other versions) contains a section about Discovery Service authentication that mentions:

> "The Discovery Service is accessed by API Services. This access (reading information and registration) requires protection by means of a client certificate. (Optional) Access can be granted to users (administrators)"

And in the versioned documentation, there's likely a table or section that mentions the eureka/** endpoint and client certificates.

**What's Missing:**

1. **Explanation of the "**" wildcard:**
   - Not explained what this means in the context of eureka/**

2. **Practical guidance:**
   - What should users DO with this information?
   - How to configure client certificates for Discovery Service

3. **SAF keyring details:**
   - What's actually stored in the SAF keyring
   - How it relates to the keystore

4. **Export process:**
   - What exports the certificate to .pem format
   - Where it gets exported to

5. **Storage location:**
   - Where the .pem file is stored

6. **Authorization requirements:**
   - z/OSMF vs SAF for authorization

**Technical Clarification:**

**Q: What does eureka/** mean?**
A: `eureka/**` is a path pattern in API ML that refers to all endpoints under the Eureka (Discovery Service) API. The `**` is a wildcard that matches any path under `/eureka/`. This means all Discovery Service endpoints require client certificate authentication.

In API ML, the Discovery Service (based on Netflix Eureka) exposes endpoints under the `/eureka/` path. These endpoints are used by API services to register themselves with the Discovery Service. The `**` wildcard means "all paths under /eureka/".

**Q: What do I do with this information?**
A: This information tells you that:
1. If you're developing an API service that needs to register with API ML, it must present a client certificate when calling Discovery Service endpoints
2. The certificate must be trusted by the Discovery Service
3. You can use API ML's own certificate (stored in the keystore or SAF keyring)

As a user/configurator, you need to:
- Ensure your API services have client certificates
- Ensure those certificates are trusted by the Discovery Service
- Configure your services to use the certificate when registering

**Q: What is stored in the SAF keyring?**
A: The SAF keyring (on z/OS) stores:
- The **server certificate** for API ML services (Gateway, Discovery, etc.)
- The **client certificate** that API ML services use to authenticate to each other
- The **private key** for the client certificate
- The **trust chain** (CA certificates) needed to validate other certificates

For the Discovery Service specifically:
- It has a **server certificate** (for TLS/HTTPS) - stored in SAF keyring or keystore
- It has a **client certificate** (to authenticate to other services) - stored in SAF keyring or keystore
- It has a **truststore** containing CA certificates it trusts - including the CA that signed the client certificates of services that register with it

**Q: What exports it (to .pem format)?**
A: The certificate is exported to .pem format by the **Zowe configuration process**. During Zowe installation and configuration:

1. If using SAF keyring: The `ZWESVUSR` (Zowe server) startup procedure or configuration scripts extract the certificate from the SAF keyring and convert it to PEM format
2. If using keystore: The certificate is already in the PKCS12 keystore (`localhost.keystore.p12`), and the configuration process exports it to PEM format for convenience

**Q: Where is it stored (the .pem file)?**
A: The exported .pem certificate files are typically stored in:
```
<KEYSTORE_DIRECTORY>/localhost/localhost.cert.pem    # Public certificate
<KEYSTORE_DIRECTORY>/localhost/localhost.key.pem    # Private key (if exported)
```

Where `<KEYSTORE_DIRECTORY>` is usually:
- On z/OS: `{{zowe.runtimeDirectory}}/components/{{component}}/keystore/`
- In the zowe.yaml: `components.gateway.tls.keyStore.directory` or similar

**Q: Do I require authorization with z/OSMF or is SAF ok?**
A: **SAF is sufficient** for this use case. Here's why:

- **z/OSMF authentication** is used when you want to authenticate *users* (human users logging in via username/password)
- **SAF authentication** is used when you want to authenticate *services* (machine-to-machine authentication using certificates)
- **Client certificate authentication** for Discovery Service registration is a service-to-service authentication, which uses SAF

The Discovery Service uses client certificates to authenticate API services that register with it. This is **service-to-service** authentication, not user authentication. Therefore:
- SAF is used to validate the client certificate
- z/OSMF is NOT involved in this process (unless you specifically configure z/OSMF as the authentication provider for API ML)

However, if your API services need to authenticate with z/OSMF (separately from Discovery Service registration), then you would need z/OSMF authentication configured as well.

**Assessment:**
This is a **documentation clarity issue**. The current documentation provides technical details but doesn't explain:
- What the wildcard means
- What action users should take
- The relationship between keystore, SAF keyring, and .pem files
- The security model (SAF vs z/OSMF)

**Recommendation:**

1. **Clarify the eureka/** pattern:**
   ```markdown
   ### Discovery Service Endpoints and Authentication
   
   All Discovery Service endpoints (path pattern: `eureka/**`) require client certificate authentication.
   
   | Endpoint | Purpose | Authentication Required |
   |----------|---------|------------------------|
   | `eureka/apps` | Service registration and discovery | Client certificate |
   | `eureka/apps/{appId}` | Specific service information | Client certificate |
   | `eureka/...` (all others) | All Discovery Service APIs | Client certificate |
   
   The `**` wildcard means "all paths under /eureka/", so ALL Discovery Service endpoints require client certificates.
   ```

2. **Add a "What You Need to Do" section:**
   ```markdown
   ### What You Need to Do
   
   As a **system administrator** configuring API ML:
   
   1. **Ensure certificates are configured:**
      - Discovery Service needs a server certificate (for TLS)
      - Discovery Service needs a truststore containing CA certificates it trusts
      - API services need client certificates
   
   2. **Configure trust:**
      - The CA that signed your API services' client certificates must be in the Discovery Service's truststore
      - Or, the API services' client certificates must be directly trusted by Discovery Service
   
   3. **Configure your API services:**
      - Each API service must be configured with its client certificate
      - The service must present this certificate when calling Discovery Service endpoints
   
   As a **service developer** onboarding to API ML:
   
   1. **Obtain a client certificate** for your service
   2. **Configure your service** to use this certificate when registering with Discovery Service
   3. **Ensure the certificate is trusted** by the Discovery Service
   ```

3. **Explain the SAF keyring contents:**
   ```markdown
   ### SAF Keyring Contents for API ML
   
   When using SAF keyrings (recommended on z/OS), the following are stored:
   
   **For each API ML component (Gateway, Discovery, API Catalog):**
   
   | Item | SAF Keyring Label | Purpose |
   |------|-------------------|---------|
   | Server Certificate | Usually the component name (e.g., `ZWESIS01`) | Used for TLS/HTTPS server authentication |
   | Client Certificate | Usually `ZOWE` or the component name | Used when this component calls other services |
   | Private Key | Same as certificate | Private key for the certificate |
   | CA Certificates | Various (e.g., `CERT` for root CA) | Trust chain for validating other certificates |
   
   **For Discovery Service specifically:**
   
   The Discovery Service SAF keyring contains:
   - Its own server certificate (to serve HTTPS requests)
   - Its own client certificate (to authenticate to other services)
   - CA certificates that it trusts (to validate client certificates from registering services)
   
   When an API service registers with Discovery Service, it presents a client certificate. The Discovery Service:
   1. Checks if the certificate is in its truststore (or signed by a trusted CA)
   2. Validates the certificate hasn't expired
   3. Allows the registration if validation passes
   ```

4. **Explain the PEM export process:**
   ```markdown
   ### Certificate Export to PEM Format
   
   During Zowe configuration, certificates are exported to PEM format for convenience:
   
   **Source:**
   - If using SAF keyring: Extracted from SAF by the Zowe server (ZWESVUSR) or configuration scripts
   - If using keystore: Extracted from `localhost.keystore.p12`
   
   **Destination:**
   ```
   <KEYSTORE_DIRECTORY>/localhost/localhost.cert.pem    # Public certificate in PEM format
   <KEYSTORE_DIRECTORY>/localhost/localhost.key.pem    # Private key in PEM format (if exported)
   ```
   
   **When:**
   - During initial Zowe configuration (`zowe-configure.sh`)
   - When the Zowe server starts (ZWESVUSR)
   - When you run certificate management commands
   
   **Why:**
   - PEM format is easier to work with than PKCS12 or SAF keyring format
   - Some tools and scripts expect PEM format
   - Easier to copy, view, and verify certificates
   
   **Note:** The private key is typically NOT exported to PEM by default for security reasons. It remains in the SAF keyring or PKCS12 keystore.
   ```

5. **Clarify authorization requirements:**
   ```markdown
   ### SAF vs z/OSMF Authentication for Discovery Service
   
   | Scenario | Authentication Method | Configuration |
   |----------|----------------------|---------------|
   | Service-to-Service (Discovery registration) | Client Certificate + SAF | SAF validates the client certificate |
   | User-to-Service (API calls via Gateway) | Depends on provider | z/OSMF, SAF, or other provider |
   | Admin access to Discovery | Client Certificate + SAF | SAF validates the admin's certificate |
   
   **For Discovery Service registration (eureka/** endpoints):**
   - ✅ **SAF is used** - SAF validates the client certificate presented by API services
   - ❌ **z/OSMF is NOT used** - Unless you explicitly configure z/OSMF as the authentication provider
   
   **For user authentication (via API Gateway):**
   - Can be SAF, z/OSMF, or other configured provider
   - This is separate from service registration
   
   **When you need BOTH:**
   - If your API services need to call z/OSMF APIs (in addition to registering with Discovery), then:
     - Discovery registration: Uses SAF + client certificate
     - z/OSMF API calls: Uses your configured authentication provider (SAF or z/OSMF)
   ```

6. **Add a troubleshooting section:**
   ```markdown
   ### Troubleshooting Discovery Service Authentication
   
   **Problem:** API service cannot register with Discovery Service
   
   **Symptoms:**
   - Service fails to start
   - Error: "Failed to register with Discovery Service"
   - Error: "Client certificate required"
   - Error: "Certificate not trusted"
   
   **Checks:**
   
   1. **Verify the service has a client certificate:**
      ```bash
      # On z/OS, check the service's configuration
      grep -i "clientCert" <service-config>.yaml
      ```
   
   2. **Verify the certificate is trusted by Discovery Service:**
      ```bash
      # Check Discovery Service truststore
      # On z/OS with SAF:
      RACF or equivalent: Check if the CA is in the Discovery Service's ring
      
      # On Linux with keystore:
      keytool -list -keystore <keystore> -storepass <password>
      ```
   
   3. **Check Discovery Service logs:**
      ```
      # On z/OS:
      F ZWESVDS0,LL  # View Discovery Service job log
      
      # Look for:
      - "Client certificate received"
      - "Certificate validation failed"
      - "Trust failure"
      ```
   
   4. **Test connectivity:**
      ```bash
      # Try to call Discovery Service directly with a client certificate
      curl -v --cert <client-cert.pem> --key <client-key.pem> \
        https://<discovery-host>:<port>/eureka/apps
      ```
   ```

**Impact:**
- **Severity:** HIGH
- **User Impact:** System administrators cannot properly configure client certificate authentication
- **Security Impact:** HIGH - Misconfiguration could lead to insecure setups
- **Beginner Impact:** CRITICAL - Beginners won't understand the security model

**Related Documentation:**
- `versioned_docs/version-v3.1.x/extend/extend-apiml/authentication-for-apiml-services.md` (needs enhancement)
- `docs/extend/extend-apiml/certificate-management-in-zowe-apiml.md` (certificate management)
- `docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md` (security overview)
- `docs/user-guide/authentication-providers-for-apiml.md` (authentication providers)

