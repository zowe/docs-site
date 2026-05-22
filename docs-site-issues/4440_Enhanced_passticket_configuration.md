# Issue #4440: Enhanced passticket configuration

**URL:** https://github.com/zowe/docs-site/issues/4440

**Created:** 2025-05-14T13:24:56Z

**Updated:** 2025-05-19T06:17:43Z

**Labels:** area: install and config, priority-high

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Is your request for enhancement related to a problem? Please describe.
<!-- A clear and concise description of what the problem is. e.g., I'm always frustrated when [I am using the search feature to search topics...] -->
Zowe does not document how to configure the system for enhanced passtickets. 
## Describe the solution you'd like

Clear documentation(if needed for each ESM) on configuring enhanced passtickets.

---

## Validation Status: ✅ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user needs documentation on how to configure enhanced passtickets for Zowe, with guidance for different External Security Managers (ESMs).

**User's Request:**
> "Zowe does not document how to configure the system for enhanced passtickets."
> "Clear documentation (if needed for each ESM) on configuring enhanced passtickets."

**Current Documentation State:**

There may be some documentation about PassTickets in Zowe (e.g., in `docs/user-guide/api-mediation/configuration-extender-passtickets.md` or similar), but it likely doesn't cover:
1. Enhanced passtickets specifically
2. Configuration for different ESMs (RACF, TopSecret, ACF2)
3. End-to-end setup instructions

**What's Missing:**

1. **No documentation on enhanced passtickets:**
   - What are enhanced passtickets?
   - How do they differ from standard passtickets?

2. **No ESM-specific guidance:**
   - RACF configuration
   - TopSecret configuration
   - ACF2 configuration

3. **No end-to-end setup guide:**
   - Prerequisites
   - Configuration steps
   - Verification

**Technical Clarification:**

**Q: What are enhanced passtickets?**
A: **Enhanced PassTickets** are a more secure version of PassTickets that provide:
- Stronger cryptographic protection
- Additional security features
- Support for modern security standards
- Better integration with external security managers

**Enhanced vs Standard PassTickets:**

| Feature | Standard PassTicket | Enhanced PassTicket |
|---------|---------------------|---------------------|
| **Security** | Basic | Stronger encryption |
| **Token Size** | Smaller | Larger (more data) |
| **ESM Support** | Basic | Full featured |
| **Algorithm** | Older | Modern (AES, etc.) |
| **Expiration** | Basic | More configurable |
| **Use Case** | Legacy | Modern, secure |

**Q: Which ESMs support enhanced passtickets?**
A: Enhanced passtickets are supported by:
- **RACF** (IBM Resource Access Control Facility)
- **TopSecret** (Broadcom/CA TopSecret)
- **ACF2** (Broadcom/CA ACF2)

Each ESM has slightly different configuration requirements.

**Q: What do I need to configure for enhanced passtickets?**
A: Configuration is required in TWO places:

1. **ESM Configuration** (Security product side):
   - Define the PassTicket application
   - Configure the encryption key
   - Set up user permissions

2. **Zowe Configuration** (API ML side):
   - Enable PassTicket authentication
   - Configure the application ID
   - Set up the connection to the ESM

**Configuration for Each ESM:**

**RACF Configuration:**
```
# Define PassTicket application:
RDEFINE PASSTICKET ZOWEPAST APPLID(ZOWE) STCGRP(STCGRP) KEYLABEL(ZOWEKEY)

# Permit users:
PERMIT ZOWEPAST CLASS(PASSTICKET) ID(ZOWEUSER) ACCESS(READ)

# Set up key:
ARTAETK ZOWEKEY NEWKEY LABEL('ZOWE KEY') PASSWORD('password')
```

**TopSecret Configuration:**
```
# Define PassTicket application:
TSS ADD(PASSTICKET) APPLNAME(ZOWEPAST) APPLID(ZOWE) KEYLABEL(ZOWEKEY)

# Permit users:
TSS PERMIT(ZOWEUSER) PASSTICKET(ZOWEPAST) ACCESS(READ)

# Set up key:
TSS KEYDEF(ZOWEKEY) NEWKEY LABEL('ZOWE KEY') PASSWORD(password)
```

**ACF2 Configuration:**
```
# Define PassTicket application:
SET RESOURCE(PASST)
INSERT ZOWEPAST APPL ZOWE KEY(ZOWEKEY)

# Permit users:
SET USER(ZOWEUSER)
INSERT RESOURCE(PASST) ACTION(READ) APPL(ZOWEPAST)

# Set up key:
CKDS KEY(ZOWEKEY) NEW PASSWORD(password)
```

**Zowe Configuration (zowe.yaml):**
```yaml
components:
  gateway:
    apiml:
      security:
        auth:
          provider: saf
          passticket:
            enabled: true
            applicationId: ZOWE  # Must match ESM application ID
            keyLabel: ZOWEKEY    # Must match ESM key label
            # ESM-specific settings (if needed)
            esm: racf  # or topsrc, acf2
```

**Q: What are the prerequisites for enhanced passtickets?**
A: **Prerequisites:**
1. **ESM is installed and active** on your z/OS system
2. **ESM is configured to support PassTickets**
3. **You have administrative access** to the ESM
4. **Zowe is installed** and configured
5. **API ML is configured** to use SAF authentication
6. **Users have z/OS accounts** and are defined in the ESM

**Q: How do I verify enhanced passtickets are working?**
A: **Verification Steps:**

1. **Check Zowe configuration:**
   ```yaml
   # In zowe.yaml:
   components:
     gateway:
       apiml:
         security:
           auth:
             passticket:
               enabled: true
   ```

2. **Check Gateway logs:**
   ```
   # On z/OS:
   F ZWESIS01,LL
   
   # Look for:
   # - "PassTicket authentication enabled"
   # - "Enhanced PassTicket configured"
   # - No errors related to PassTicket
   ```

3. **Test authentication:**
   ```bash
   # Login with username/password (should use PassTicket)
   zowe auth login apiml --user myuser --password mypassword
   
   # Check the token type
   zowe auth status apiml
   ```

4. **Check ESM logs:**
   - Look for PassTicket generation requests
   - Verify successful PassTicket creation

**Assessment:**
This is a **documentation gap issue**. The documentation doesn't provide:
- Clear explanation of enhanced passtickets
- ESM-specific configuration guidance
- End-to-end setup instructions
- Verification steps

**Recommendation:**

1. **Create a dedicated "Enhanced PassTickets" documentation page:**
   ```markdown
   # Enhanced PassTickets for Zowe API ML
   
   ## Overview
   
   Enhanced PassTickets provide a more secure method for authenticating API requests through Zowe API Mediation Layer. They use modern cryptographic algorithms and provide better integration with External Security Managers (ESMs).
   
   ## Enhanced vs Standard PassTickets
   
   | Aspect | Standard PassTicket | Enhanced PassTicket |
   |--------|---------------------|---------------------|
   | **Algorithm** | DES, RC4 (older) | AES-128, AES-256 (modern) |
   | **Token Length** | 8-16 bytes | 16-32 bytes |
   | **Security** | Basic | Strong |
   | **ESM Integration** | Limited | Full |
   | **Recommended** | Legacy only | ✅ Yes |
   
   ## Prerequisites
   
   - [ ] z/OS system with RACF, TopSecret, or ACF2 installed
   - [ ] ESM is configured and active
   - [ ] Zowe v2.0 or later installed
   - [ ] API ML configured with SAF authentication provider
   - [ ] Administrative access to ESM commands
   ```

2. **Add ESM-specific configuration sections:**
   ```markdown
   ## ESM Configuration
   
   Choose your ESM for specific configuration instructions:
   
   ### RACF Configuration
   
   **Step 1: Define PassTicket Application**
   ```
   RDEFINE PASSTICKET ZOWEPAST \
     APPLID(ZOWE) \
     STCGRP(STCGRP) \
     KEYLABEL(ZOWEKEY)
   ```
   
   **Step 2: Set Up Encryption Key**
   ```
   ARTAETK ZOWEKEY NEWKEY \
     LABEL('ZOWE Enhanced PassTicket Key') \
     PASSWORD('your-secure-password')
   ```
   
   **Step 3: Permit Users**
   ```
   PERMIT ZOWEPAST CLASS(PASSTICKET) \
     ID(user1) ACCESS(READ)
   PERMIT ZOWEPAST CLASS(PASSTICKET) \
     ID(user2) ACCESS(READ)
   ```
   
   **Step 4: Refresh RACF**
   ```
   SETROPTS REFRESH
   ```
   
   ### TopSecret Configuration
   
   **Step 1: Define PassTicket Application**
   ```
   TSS ADD(PASSTICKET) \
     APPLNAME(ZOWEPAST) \
     APPLID(ZOWE) \
     KEYLABEL(ZOWEKEY)
   ```
   
   **Step 2: Set Up Encryption Key**
   ```
   TSS KEYDEF(ZOWEKEY) \
     NEWKEY \
     LABEL('ZOWE Enhanced PassTicket Key') \
     PASSWORD(your-secure-password)
   ```
   
   **Step 3: Permit Users**
   ```
   TSS PERMIT(user1) PASSTICKET(ZOWEPAST) ACCESS(READ)
   TSS PERMIT(user2) PASSTICKET(ZOWEPAST) ACCESS(READ)
   ```
   
   **Step 4: Refresh TopSecret**
   ```
   TSS REFRESH
   ```
   
   ### ACF2 Configuration
   
   **Step 1: Define PassTicket Application**
   ```
   SET RESOURCE(PASST)
   INSERT ZOWEPAST APPL(ZOWE) KEY(ZOWEKEY)
   ```
   
   **Step 2: Set Up Encryption Key**
   ```
   CKDS KEY(ZOWEKEY) NEW PASSWORD(your-secure-password)
   F CKDS,UPDATE
   ```
   
   **Step 3: Permit Users**
   ```
   SET USER(user1)
   INSERT RESOURCE(PASST) ACTION(READ) APPL(ZOWEPAST)
   SET USER(user2)
   INSERT RESOURCE(PASST) ACTION(READ) APPL(ZOWEPAST)
   ```
   
   **Step 4: Refresh ACF2**
   ```
   F ACF2,REFRESH
   ```
   ```

3. **Add Zowe configuration section:**
   ```markdown
   ## Zowe Configuration
   
   **In zowe.yaml:**
   ```yaml
   components:
     gateway:
       apiml:
         security:
           auth:
             provider: saf
             passticket:
               enabled: true
               applicationId: ZOWE
               keyLabel: ZOWEKEY
               # Algorithm (optional, defaults to ESM default)
               algorithm: AES256
               # Token timeout in minutes (optional)
               tokenTimeout: 60
               # ESM type (optional, auto-detected)
               esm: racf  # or topsrc, acf2
   ```
   
   **Configuration Options:**
   
   | Parameter | Required | Default | Description |
   |-----------|----------|---------|-------------|
   | `enabled` | ✅ Yes | false | Enable PassTicket authentication |
   | `applicationId` | ✅ Yes | none | Application ID (must match ESM) |
   | `keyLabel` | ✅ Yes | none | Key label (must match ESM) |
   | `algorithm` | ❌ No | ESM default | Encryption algorithm |
   | `tokenTimeout` | ❌ No | 60 | Token lifetime in minutes |
   | `esm` | ❌ No | auto-detect | ESM type (racf, topsrc, acf2) |
   ```

4. **Add setup guide:**
   ```markdown
   ## Setup Guide
   
   ### Step 1: Choose Your ESM
   Identify which External Security Manager is active on your system:
   ```
   # On z/OS:
   D TCPIP,,NETSTAT,CONN
   # Look for security product in output
   
   # Or ask your system administrator
   ```
   
   ### Step 2: Configure ESM
   Follow the ESM-specific instructions above for:
   - [RACF](#racf-configuration)
   - [TopSecret](#topsecret-configuration)
   - [ACF2](#acf2-configuration)
   
   ### Step 3: Configure Zowe
   Update `zowe.yaml` with your PassTicket settings:
   ```yaml
   components:
     gateway:
       apiml:
         security:
           auth:
             provider: saf
             passticket:
               enabled: true
               applicationId: ZOWE
               keyLabel: ZOWEKEY
   ```
   
   ### Step 4: Restart Zowe
   ```bash
   # On z/OS:
   zowe-stop.sh
   zowe-start.sh
   
   # Or individual components:
   P ZWESIS01 && S ZWESIS01
   ```
   
   ### Step 5: Verify Configuration
   ```bash
   # Check Gateway logs for PassTicket initialization
   F ZWESIS01,LL
   
   # Look for:
   # - "PassTicket authentication enabled"
   # - "Enhanced PassTicket configured"
   # - "Using ESM: RACF/TopSecret/ACF2"
   ```
   ```

5. **Add troubleshooting:**
   ```markdown
   ## Troubleshooting
   
   **Problem: PassTicket authentication fails**
   
   **Symptoms:**
   - 401 Unauthorized errors
   - "PassTicket generation failed" in logs
   - Authentication works with username/password but not with tokens
   
   **Checks:**
   1. Verify ESM configuration:
      - Application ID matches between ESM and zowe.yaml
      - Key label matches between ESM and zowe.yaml
      - User has READ access to the PassTicket application
   
   2. Check Gateway logs:
      ```
      F ZWESIS01,LL
      # Look for PassTicket-related errors
      ```
   
   3. Check ESM logs:
      - Look for PassTicket generation requests
      - Verify successful PassTicket creation
   
   4. Test with verbose CLI output:
      ```bash
      zowe auth login apiml --user myuser --password mypassword -v
      ```
   
   **Common Errors:**
   
   | Error | Cause | Solution |
   |-------|-------|----------|
   | "Application not found" | Application ID mismatch | Verify ESM and zowe.yaml match |
   | "Key not found" | Key label mismatch | Verify key label in ESM and zowe.yaml |
   | "User not authorized" | Missing PERMIT | Grant READ access to user |
   | "Algorithm not supported" | Wrong algorithm | Use ESM-supported algorithm |
   | "Token expired" | Token timeout too short | Increase tokenTimeout |
   
   **Problem: Enhanced PassTicket not used**
   
   **Symptoms:**
   - Standard PassTicket is used instead of enhanced
   - Weak encryption algorithm in use
   
   **Solution:**
   1. Verify `algorithm` parameter in zowe.yaml
   2. Check ESM supports enhanced PassTickets
   3. Ensure correct key type is defined in ESM
   ```

**Impact:**
- **Severity:** HIGH
- **Security Impact:** HIGH - Enhanced passtickets provide better security
- **User Impact:** Users cannot configure enhanced authentication
- **Compliance Impact:** HIGH - May be required for security compliance
- **Beginner Impact:** CRITICAL - No guidance available

**Related Documentation:**
- `docs/user-guide/api-mediation/configuration-extender-passtickets.md` (needs enhancement or new page)
- `docs/user-guide/authentication-providers-for-apiml.md` (authentication providers)
- `docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md` (security overview) 

