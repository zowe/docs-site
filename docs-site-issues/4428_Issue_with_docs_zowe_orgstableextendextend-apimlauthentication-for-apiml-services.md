# Issue #4428: Issue with docs.zowe.org/stable/extend/extend-apiml/authentication-for-apiml-services/

**URL:** https://github.com/zowe/docs-site/issues/4428

**Created:** 2025-05-11T13:11:17Z

**Updated:** 2025-12-16T10:21:27Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the keystore/localhost/localhost.keystore.p12 keystore or in the SAF keyring. **It is exported to .pem format for convenience.** Any other certificate which is valid and trusted by Discovery service can be used.


so if I use the SAF keyring ... it is exported to pem format!  really - how do I stop this from happening because I do not want the private key escaping via a .pem file.     Where is it exported to so I can delete it.

Which keyring ?  The keystore or the trust store - please clarify.

 Any other certificate which is valid and trusted by Discovery service can be used.   how  do I specify the cerificate for the discovery service?
please point me to the instructions

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

**Findings:** The issue is **VALID** and related to #4426. The user has concerns about security implications of certificate export to PEM format.

**User's Questions:**
> "It says: Allows for the other services to register without mainframe credentials or token. API ML's certificate can be used. It is stored in the keystore/localhost/localhost.keystore.p12 keystore or in the SAF keyring. **It is exported to .pem format for convenience.** Any other certificate which is valid and trusted by Discovery service can be used."
>
> User asks:
> - So if I use the SAF keyring, it is exported to pem format! Really - how do I stop this from happening because I do not want the private key escaping via a .pem file.
> - Where is it exported to so I can delete it.
> - Which keyring? The keystore or the trust store - please clarify.
> - Any other certificate which is valid and trusted by Discovery service can be used. How do I specify the certificate for the discovery service?
> - Please point me to the instructions

**Current Documentation State:**

See #4426 validation for the source documentation analysis.

**What's Missing:**

1. **Security concern about PEM export:**
   - Documentation doesn't address the security implications of PEM export
   - No guidance on how to prevent PEM export if desired

2. **Export location:**
   - Where exactly are the .pem files created?

3. **Keyring clarification:**
   - Which keyring (keystore vs truststore) is being referenced

4. **Certificate specification for Discovery Service:**
   - How to specify which certificate Discovery Service uses

**Technical Clarification:**

**Q: How do I stop the private key from escaping via .pem file?**
A: **Good security concern!** By default, Zowe does NOT export the private key to PEM format. Here's what actually happens:

- **Public certificate**: Is exported to PEM format (this is safe, it's public information)
- **Private key**: Typically remains in the SAF keyring or PKCS12 keystore and is NOT exported to PEM

However, if you're seeing private keys in PEM files, this could be a configuration issue:

**To prevent private key export:**
1. **On z/OS with SAF keyring:**
   - The private key stays in the SAF keyring
   - PEM export only extracts the public certificate
   - Verify with: `ICSF` or your security product commands

2. **On Linux with keystore:**
   - By default, only the public certificate is exported
   - If you need to ensure private keys are NOT exported, check your configuration scripts
   - Look for commands like `openssl pkcs12 -in keystore.p12 -nocerts` (extracts only certs, not keys)

**If you find private keys in PEM files:**
- This is a **security issue** that should be addressed
- Remove the .pem files containing private keys
- Investigate how they were created
- Consider rotating your certificates

**Q: Where is it exported to?**
A: The PEM files are typically exported to:
```
<KEYSTORE_DIRECTORY>/localhost/localhost.cert.pem    # Public certificate ONLY
```

If a private key file exists, it would be:
```
<KEYSTORE_DIRECTORY>/localhost/localhost.key.pem    # Private key (SHOULD NOT EXIST by default)
```

Where `<KEYSTORE_DIRECTORY>` is:
- On z/OS: `{{zowe.runtimeDirectory}}/components/{{component}}/keystore/`
- In zowe.yaml: `components.gateway.tls.keyStore.directory`
- Default: Often `${ROOT_DIR}/keystore` or `${RUNTIME_DIR}/components/gateway/keystore`

**Q: Which keyring - keystore or trust store?**
A: There are THREE different stores involved:

| Store | Purpose | Contains |
|-------|---------|----------|
| **Keystore** | Server certificates and private keys | API ML's own server certificates + private keys |
| **Truststore** | Trusted CA certificates | CA certificates that API ML trusts |
| **SAF Keyring** | Alternative to keystore on z/OS | Same as keystore, but managed by SAF |

For Discovery Service client authentication:
- **Keystore/SAF Keyring**: Contains the client certificate + private key that Discovery Service uses to authenticate to other services
- **Truststore/SAF Keyring**: Contains the CA certificates that Discovery Service uses to validate incoming client certificates

**Q: How do I specify the certificate for the Discovery Service?**
A: There are TWO aspects to Discovery Service certificate configuration:

1. **Discovery Service's own certificates** (server side):
   - Configured in `zowe.yaml`:
     ```yaml
     components:
       discovery:
         tls:
           keyStore:
             file: /path/to/discovery-keystore.p12
             password: password
             type: PKCS12
           trustStore:
             file: /path/to/discovery-truststore.p12
             password: password
             type: PKCS12
     ```

2. **Which certificates Discovery Service trusts** (client validation):
   - The truststore contains CA certificates
   - Any client certificate signed by a CA in the truststore will be accepted
   - To specify a specific certificate (instead of trusting a CA), you would:
     - Add the specific client certificate to the truststore
     - Or configure certificate pinning (advanced)

**How to specify trusted certificates:**
```bash
# On Linux, add a certificate to the truststore:
keytool -import -alias myapi -keystore discovery-truststore.p12 \
  -file myapi-client-cert.pem -storepass password

# On z/OS with SAF:
# Use your security product commands (RACF, TopSecret, ACF2) to add
# the client certificate to the Discovery Service's SAF keyring
```

**Assessment:**
This is a **documentation security gap**. The documentation doesn't address:
- Security implications of certificate export
- How to prevent unwanted PEM export
- Where PEM files are located
- The difference between keystore and truststore
- How to configure certificate trust for Discovery Service

**Recommendation:**

1. **Add a security warning about PEM export:**
   ```markdown
   :::warning
   **Security Note:** By default, Zowe exports ONLY the public certificate to PEM format. The private key remains in the secure keystore or SAF keyring. If you find private key files (e.g., `localhost.key.pem`), this is a security risk and should be investigated immediately.
   
   **If private keys are being exported:**
   1. Delete the private key PEM files
   2. Rotate your certificates
   3. Review your configuration scripts for `-nodes` or `-nocerts` flags
   4. Consider using SAF keyrings which don't export private keys
   :::
   ```

2. **Clarify the export process:**
   ```markdown
   ### Certificate Export Process
   
   | Certificate Type | Exported? | Location | Security Risk |
   |-----------------|-----------|----------|---------------|
   | Public Certificate | ✅ Yes | `<KEYSTORE_DIR>/localhost/localhost.cert.pem` | None (public info) |
   | Private Key | ❌ No (by default) | Remains in keystore/SAF | None |
   | CA Certificates | ✅ Yes (optional) | Various locations | None (public info) |
   
   **To verify what's exported:**
   ```bash
   # Check if private key was exported
   ls -la <KEYSTORE_DIR>/localhost/*.pem
   
   # A private key PEM file will typically have:
   # - "PRIVATE KEY" in the header
   # - "BEGIN PRIVATE KEY" or "BEGIN RSA PRIVATE KEY"
   
   # A public certificate will have:
   # - "CERTIFICATE" in the header
   # - "BEGIN CERTIFICATE"
   
   # To check content:
   head -1 <file>.pem
   ```
   ```

3. **Add a section on configuring Discovery Service certificates:**
   ```markdown
   ### Configuring Discovery Service Certificates
   
   **1. Discovery Service's Server Certificate**
   
   This is the certificate Discovery Service presents to clients (API services) during TLS handshake:
   
   **In zowe.yaml:**
   ```yaml
   components:
     discovery:
       tls:
         keyStore:
           file: ${ROOT_DIR}/keystore/discovery-server.p12
           password: ${DISCOVERY_KEYSTORE_PASSWORD}
           type: PKCS12
           alias: discovery-server
   ```
   
   **On z/OS with SAF:**
   ```yaml
   components:
     discovery:
       tls:
         keyRing: ZWESVDS0  # SAF keyring name
   ```
   
   **2. Discovery Service's Client Certificate**
   
   This is the certificate Discovery Service uses when calling other services:
   
   Configured separately in the service's client TLS configuration.
   
   **3. Discovery Service's Truststore**
   
   This contains CA certificates that Discovery Service trusts for incoming client certificates:
   
   ```yaml
   components:
     discovery:
       tls:
         trustStore:
           file: ${ROOT_DIR}/keystore/discovery-truststore.p12
           password: ${DISCOVERY_TRUSTSTORE_PASSWORD}
           type: PKCS12
   ```
   
   **On z/OS with SAF:**
   ```yaml
   components:
     discovery:
       tls:
         trustStore:
           keyRing: DISCOVRY  # SAF keyring for trusted certs
   ```
   
   **4. Adding a Specific Client Certificate to Truststore**
   
   Instead of trusting a CA, you can add specific client certificates:
   
   ```bash
   # Import a specific client certificate
   keytool -importcert -alias apiservice1 -file apiservice1-cert.pem \
     -keystore discovery-truststore.p12 -storepass password
   
   # List certificates in truststore
   keytool -list -keystore discovery-truststore.p12 -storepass password
   ```
   ```

4. **Add keystore vs truststore clarification:**
   ```markdown
   ### Keystore vs Truststore: What's the Difference?
   
   | Aspect | Keystore | Truststore |
   |--------|----------|------------|
   | **Purpose** | Holds YOUR certificates and private keys | Holds certificates YOU trust |
   | **Contains** | Server certs, client certs, private keys | CA certificates, other trusted certs |
   | **Used for** | Presenting your identity to others | Validating others' identity |
   | **Private keys?** | ✅ Yes | ❌ No |
   | **Example** | Gateway's HTTPS certificate | CA that signed API service certificates |
   
   **For Discovery Service:**
   - **Keystore**: Contains Discovery Service's own server certificate and private key
   - **Truststore**: Contains CA certificates or specific client certificates that Discovery Service trusts
   
   **When an API service registers:**
   1. API service presents its client certificate to Discovery Service
   2. Discovery Service checks if the certificate is in its **truststore**
   3. If yes, and the certificate is valid, registration is allowed
   ```

**Impact:**
- **Severity:** HIGH
- **Security Impact:** HIGH - Private key export is a serious security concern
- **User Impact:** System administrators don't know how to properly configure certificate trust
- **Configuration Impact:** HIGH - Misconfiguration could prevent services from registering

**Related Documentation:**
- `versioned_docs/version-v3.1.x/extend/extend-apiml/authentication-for-apiml-services.md` (primary - needs enhancement)
- `docs/extend/extend-apiml/certificate-management-in-zowe-apiml.md` (certificate management)
- `docs/user-guide/configure-zos-system.md` (z/OS configuration)

