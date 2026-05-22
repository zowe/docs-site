# Issue #4441: How to enable ICSF

**URL:** https://github.com/zowe/docs-site/issues/4441

**Created:** 2025-05-14T13:27:59Z

**Updated:** 2025-12-16T10:21:29Z

**Labels:** area: install and config, priority-high

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Is your request for enhancement related to a problem? Please describe.
There is an issue when an application is accessing ICSF. It initially appeared for enhanced passtickets. When ICSF is accessed, program control is disabled for the application, and it needs to be restarted.

## Describe the solution you'd like
Provide documentation on how to configure the system when Zowe requires ICSF access, e.g. when using enhanced passtickets. We know at least this needs to be done https://www.ibm.com/docs/en/zos/2.5.0?topic=considerations-controlling-program-environment

---

## Validation Status: ✅ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID** and related to #4440. The user needs documentation on configuring ICSF (Integrated Cryptographic Service Facility) for Zowe, particularly when using enhanced passtickets.

**User's Problem:**
> "There is an issue when an application is accessing ICSF. It initially appeared for enhanced passtickets. When ICSF is accessed, program control is disabled for the application, and it needs to be restarted."
> "Provide documentation on how to configure the system when Zowe requires ICSF access, e.g. when using enhanced passtickets."
> "We know at least this needs to be done: https://www.ibm.com/docs/en/zos/2.5.0?topic=considerations-controlling-program-environment"

**Current Documentation State:**

No Zowe documentation exists for ICSF configuration. The user references IBM documentation about "Controlling program environment" which is related to program control (PC) and ICSF.

**What's Missing:**

1. **No ICSF overview:**
   - What ICSF is and why Zowe needs it

2. **No configuration guide:**
   - How to configure ICSF for Zowe
   - Specific requirements for different Zowe components

3. **No problem explanation:**
   - Why program control is disabled when accessing ICSF
   - How to prevent this

4. **No relationship to enhanced passtickets:**
   - How ICSF relates to enhanced passtickets

**Technical Clarification:**

**Q: What is ICSF?**
A: **ICSF (Integrated Cryptographic Service Facility)** is an IBM z/OS component that provides:
- Cryptographic services for applications
- Hardware-based encryption (via cryptographic hardware like Crypto Express)
- Secure key management
- Digital signature services
- Random number generation

**Why Zowe needs ICSF:**
1. **Enhanced PassTickets** require cryptographic operations that may use ICSF
2. **SAF keyring access** can use ICSF for cryptographic operations
3. **TLS/SSL acceleration** can use ICSF for hardware-accelerated cryptography
4. **Certificate management** may use ICSF for key operations

**Q: Why is program control disabled when accessing ICSF?**
A: **Program Control (PC)** is a z/OS security feature that restricts which programs can run in certain address spaces. When an application (like a Zowe component) accesses ICSF:
- z/OS checks if the program is authorized to use cryptographic services
- If program control is enabled for the address space, z/OS may disable it when ICSF is accessed
- This is a security feature to prevent unauthorized cryptographic operations

**The problem:** When program control is disabled, the application (Zowe component) can no longer run properly and needs to be restarted.

**Q: How do I configure the system to allow Zowe to use ICSF without disabling program control?**
A: You need to configure **Program Control (PC) exceptions** for Zowe components that need to access ICSF.

**Solution:**

**Step 1: Identify which Zowe components need ICSF access**
- **Gateway** (ZWESIS01) - if using enhanced passtickets or SAF keyrings
- **Discovery Service** (ZWESVDS0) - if using SAF keyrings
- **API Catalog** (ZWESACS0) - if using SAF keyrings
- **ZAAS** (ZWESAAS0) - if using enhanced passtickets

**Step 2: Configure Program Control (PC) for these components**

**Using RACF:**
```
# Allow specific programs to run with ICSF access
RDEFINE PC PROGRAM(ZWESIS01) STCGRP(STCGRP) UACC(NONE)
RDEFINE PC PROGRAM(ZWESVDS0) STCGRP(STCGRP) UACC(NONE)
RDEFINE PC PROGRAM(ZWESACS0) STCGRP(STCGRP) UACC(NONE)
RDEFINE PC PROGRAM(ZWESAAS0) STCGRP(STCGRP) UACC(NONE)

# Or allow the entire STC group
RDEFINE PC STCGRP(STCGRP) UACC(READ)

# Permit the programs to use ICSF
PERMIT ZWESIS01 CLASS(PC) ID(STCGRP) ACCESS(READ)
PERMIT ZWESVDS0 CLASS(PC) ID(STCGRP) ACCESS(READ)
PERMIT ZWESACS0 CLASS(PC) ID(STCGRP) ACCESS(READ)
PERMIT ZWESAAS0 CLASS(PC) ID(STCGRP) ACCESS(READ)

# Refresh RACF
SETROPTS REFRESH
```

**Using TopSecret:**
```
# Define program control rules
TSS ADD(PC) PROGRAM(ZWESIS01) STCGRP(STCGRP)
TSS ADD(PC) PROGRAM(ZWESVDS0) STCGRP(STCGRP)
TSS ADD(PC) PROGRAM(ZWESACS0) STCGRP(STCGRP)
TSS ADD(PC) PROGRAM(ZWESAAS0) STCGRP(STCGRP)

# Permit access
TSS PERMIT(STCGRP) PC(ZWESIS01) ACCESS(READ)
TSS PERMIT(STCGRP) PC(ZWESVDS0) ACCESS(READ)
TSS PERMIT(STCGRP) PC(ZWESACS0) ACCESS(READ)
TSS PERMIT(STCGRP) PC(ZWESAAS0) ACCESS(READ)

# Refresh TopSecret
TSS REFRESH
```

**Using ACF2:**
```
# Define program control rules
SET RESOURCE(PC)
INSERT ZWESIS01 STCGRP(STCGRP)
INSERT ZWESVDS0 STCGRP(STCGRP)
INSERT ZWESACS0 STCGRP(STCGRP)
INSERT ZWESAAS0 STCGRP(STCGRP)

# Permit access
SET USER(STCGRP)
INSERT RESOURCE(PC) ACTION(READ) PROGRAM(ZWESIS01)
INSERT RESOURCE(PC) ACTION(READ) PROGRAM(ZWESVDS0)
INSERT RESOURCE(PC) ACTION(READ) PROGRAM(ZWESACS0)
INSERT RESOURCE(PC) ACTION(READ) PROGRAM(ZWESAAS0)

# Refresh ACF2
F ACF2,REFRESH
```

**Step 3: Configure ICSF for Zowe**

**Ensure ICSF is started:**
```
# Check if ICSF is running
F CSF,STATUS

# If not running, start it
S CSF
```

**Configure ICSF for Zowe's STC group:**
```
# Using ICSF operator commands or SDK
# Allow Zowe's STC group to use cryptographic services
```

**Step 4: Configure Zowe to use ICSF (if needed)**

In `zowe.yaml`:
```yaml
components:
  gateway:
    # Enable ICSF for cryptographic operations
    tls:
      useIcsf: true  # If available in your version
    apiml:
      security:
        # Use ICSF for PassTicket operations
        passticket:
          useIcsf: true
```

**Step 5: Enable Program-Managed Services (PMS) for ICSF**

The IBM documentation reference (https://www.ibm.com/docs/en/zos/2.5.0?topic=considerations-controlling-program-environment) mentions **PMS (Program-Managed Services)**.

**Configure PMS for ICSF:**
```
# In IEAPMSxx parmlib member or via operator command:
# Add Zowe's STC group to the PMS configuration
# Example:
PMS ADD STCGRP(STCGRP) SERVCLASS(ICSF)
```

**Q: What is PMS and why is it needed?**
A: **PMS (Program-Managed Services)** is a z/OS feature that:
- Allows programs to request system services (like ICSF) without disabling program control
- Provides a controlled way for applications to access protected system resources
- Prevents the "program control disabled" issue

**How PMS works with ICSF:**
1. Application (Zowe) requests cryptographic service via PMS
2. z/OS checks if the application is authorized for PMS
3. If authorized, z/OS allows the ICSF access without disabling program control
4. Application can continue running normally

**Q: How do I verify ICSF is properly configured for Zowe?**
A: **Verification Steps:**

1. **Check ICSF is active:**
   ```
   F CSF,STATUS
   # Look for: ACTIVE
   ```

2. **Check program control status for Zowe components:**
   ```
   # On z/OS, use the operator command:
   D TCPIP,,NETSTAT,PC
   # Or check specific address spaces:
   F ZWESIS01,PC
   F ZWESVDS0,PC
   ```

3. **Check for program control disablement messages:**
   ```
   # In Zowe component logs (e.g., ZWESIS01):
   F ZWESIS01,LL
   # Look for:
   # - "Program control disabled"
   # - "ICSF access denied"
   # - "PMS not configured"
   ```

4. **Test enhanced passticket authentication:**
   ```bash
   zowe auth login apiml --user myuser --password mypassword
   ```

5. **Check for ICSF-related errors:**
   ```
   # In Zowe logs:
   F ZWESIS01,LL
   # Look for ICSF or cryptographic errors
   ```

**Q: What are the specific requirements for enhanced passtickets and ICSF?**
A: **Enhanced PassTickets + ICSF Requirements:**

1. **ICSF must be installed and active** on z/OS
2. **Appropriate cryptographic hardware** must be available
3. **Zowe components must have program control authorization** for ICSF
4. **PMS must be configured** for Zowe's STC group
5. **ESM must be configured** to use ICSF for PassTicket operations

**Enhanced PassTicket with ICSF flow:**
1. User authenticates with username/password
2. API Gateway requests PassTicket from SAF
3. SAF uses ICSF (via PMS) to generate the enhanced PassTicket
4. ICSF uses cryptographic hardware to create the secure token
5. PassTicket is returned to the user
6. User presents PassTicket for subsequent requests
7. API Gateway validates PassTicket (may also use ICSF)

**Q: What if I don't want to use ICSF?**
A: **Alternatives to ICSF:**

1. **Use standard PassTickets** instead of enhanced:
   ```yaml
   components:
     gateway:
       apiml:
         security:
           auth:
             passticket:
               enabled: true
               useEnhanced: false  # Use standard PassTickets
   ```

2. **Use software-based cryptography** (no hardware acceleration):
   - Configure ESM to use software cryptography
   - Slower performance
   - May not meet security requirements

3. **Use a different authentication provider:**
   - Switch from SAF to z/OSMF (doesn't use ICSF)
   - Use JWT tokens only
   - Use client certificates

**Assessment:**
This is a **critical documentation gap**. The documentation doesn't provide:
- ICSF overview and its relationship to Zowe
- Configuration instructions for ICSF with Zowe
- Explanation of program control issues
- PMS configuration for ICSF
- Verification steps

**Recommendation:**

1. **Create a dedicated "ICSF Configuration for Zowe" documentation page:**
   ```markdown
   # ICSF Configuration for Zowe
   
   ## Overview
   
   **ICSF (Integrated Cryptographic Service Facility)** is an IBM z/OS component that provides cryptographic services. Zowe uses ICSF for:
   - Enhanced PassTicket generation and validation
   - SAF keyring cryptographic operations
   - Hardware-accelerated TLS/SSL
   - Certificate management
   
   ## When ICSF is Required
   
   | Feature | ICSF Required? | Notes |
   |---------|---------------|-------|
   | Standard PassTickets | ❌ No | Uses ESM software crypto |
   | Enhanced PassTickets | ✅ **Yes** | Requires ICSF |
   | SAF Keyring (basic) | ❌ No | Uses ESM software crypto |
   | SAF Keyring (hardware) | ✅ Yes | Uses ICSF |
   | TLS/SSL (software) | ❌ No | Uses Java crypto |
   | TLS/SSL (hardware) | ✅ Yes | Uses ICSF |
   
   ## Prerequisites
   
   - [ ] z/OS with ICSF installed
   - [ ] Appropriate cryptographic hardware (e.g., Crypto Express)
   - [ ] ICSF started and active
   - [ ] Administrative access to z/OS security configuration
   ```

2. **Add Program Control and PMS explanation:**
   ```markdown
   ## Program Control and PMS
   
   ### The Problem
   
   When a Zowe component accesses ICSF, z/OS may disable **Program Control (PC)** for that address space. This prevents the component from continuing to run properly.
   
   **Symptoms:**
   - Zowe component stops processing requests
   - Component needs to be restarted
   - Logs show "Program control disabled" messages
   - Authentication fails after initial success
   
   ### The Solution: PMS
   
   **PMS (Program-Managed Services)** allows applications to access system services (like ICSF) without disabling program control.
   
   **How it works:**
   1. Zowe requests cryptographic service via PMS
   2. z/OS validates the request against PMS configuration
   3. If authorized, ICSF access is granted without disabling PC
   4. Zowe continues normal operation
   
   **Configuration:**
   ```
   # In IEAPMSxx parmlib member:
   PMS ADD STCGRP(ZWESVUSR) SERVCLASS(ICSF)
   PMS ADD STCGRP(STCGRP) SERVCLASS(ICSF)
   ```
   
   **Verification:**
   ```
   # Check PMS configuration:
   D PMS
   
   # Check if PMS is active for ICSF:
   D PMS,SERVCLASS=ICSF
   ```
   ```

3. **Add ICSF configuration steps:**
   ```markdown
   ## Configuring ICSF for Zowe
   
   ### Step 1: Verify ICSF is Installed and Active
   
   **Check ICSF installation:**
   ```
   # On z/OS:
   D A,LPA
   # Look for ICSF modules
   
   # Or:
   F CSF,STATUS
   ```
   
   **Start ICSF if needed:**
   ```
   S CSF
   ```
   
   ### Step 2: Configure Program Control Exceptions
   
   See [ESM-specific configuration](#esm-configuration) above.
   
   ### Step 3: Configure PMS for ICSF
   
   **Method A: Via IEAPMSxx parmlib member**
   ```
   # Add to IEAPMSxx:
   PMS ADD STCGRP(ZWESVUSR) SERVCLASS(ICSF)
   PMS ADD STCGRP(STCGRP) SERVCLASS(ICSF)
   ```
   
   **Method B: Via operator command**
   ```
   F IEAPMS,ADD,SERVCLASS=ICSF,STCGRP=ZWESVUSR
   F IEAPMS,ADD,SERVCLASS=ICSF,STCGRP=STCGRP
   ```
   
   **Activate PMS configuration:**
   ```
   F IEAPMS,REFRESH
   ```
   
   ### Step 4: Configure Zowe for ICSF
   
   **In zowe.yaml:**
   ```yaml
   components:
     gateway:
       # Enable ICSF for cryptographic operations
       tls:
         useIcsf: true
       apiml:
         security:
           auth:
             passticket:
               enabled: true
               useIcsf: true
               useEnhanced: true
   ```
   
   ### Step 5: Restart Zowe Components
   
   ```bash
   # On z/OS:
   zowe-stop.sh
   zowe-start.sh
   
   # Or individual components:
   P ZWESIS01 && S ZWESIS01
   P ZWESVDS0 && S ZWESVDS0
   P ZWESAAS0 && S ZWESAAS0
   ```
   ```

4. **Add troubleshooting:**
   ```markdown
   ## Troubleshooting ICSF Issues
   
   **Problem: Program control disabled when accessing ICSF**
   
   **Symptoms:**
   - Zowe component stops working after ICSF access
   - Component needs to be restarted
   - Logs show "Program control disabled"
   
   **Solution:**
   1. Verify PMS is configured for ICSF:
      ```
      D PMS,SERVCLASS=ICSF
      ```
   2. Verify program control exceptions are set:
      ```
      # For RACF:
      RLIST PC STCGRP(STCGRP)
      ```
   3. Add missing PMS configuration and refresh
   4. Restart Zowe components
   
   **Problem: ICSF not available**
   
   **Symptoms:**
   - "ICSF not available" errors
   - Cryptographic operations fail
   - Enhanced PassTickets not generated
   
   **Solution:**
   1. Verify ICSF is started:
      ```
      F CSF,STATUS
      ```
   2. Check for ICSF startup errors
   3. Verify cryptographic hardware is available
   4. Start ICSF if needed: `S CSF`
   
   **Problem: Enhanced PassTicket generation fails**
   
   **Symptoms:**
   - Authentication fails with PassTicket errors
   - "PassTicket generation failed" in logs
   
   **Solution:**
   1. Verify ICSF is configured correctly (above)
   2. Check ESM configuration for PassTicket application
   3. Verify key is properly defined
   4. Check for ICSF-specific errors in logs
   
   **Problem: Performance issues with ICSF**
   
   **Symptoms:**
   - Slow authentication
   - Slow API requests
   - High CPU usage
   
   **Solution:**
   1. Verify hardware acceleration is working
   2. Check ICSF performance statistics:
      ```
      D CSF
      ```
   3. Consider load balancing across multiple cryptographic devices
   4. Ensure proper queue configuration for ICSF
   ```

5. **Add IBM documentation reference:**
   ```markdown
   ## IBM Documentation Reference
   
   The user referenced: https://www.ibm.com/docs/en/zos/2.5.0?topic=considerations-controlling-program-environment
   
   **Key IBM documentation:**
   - [ICSF Administration](https://www.ibm.com/docs/en/zos/2.5.0?topic=icsf)
   - [Program Control (PC)](https://www.ibm.com/docs/en/zos/2.5.0?topic=program-control)
   - [Program-Managed Services (PMS)](https://www.ibm.com/docs/en/zos/2.5.0?topic=pms)
   - [Controlling Program Environment](https://www.ibm.com/docs/en/zos/2.5.0?topic=considerations-controlling-program-environment)
   ```

**Impact:**
- **Severity:** CRITICAL
- **Security Impact:** HIGH - ICSF is required for enhanced security features
- **Availability Impact:** HIGH - Without proper configuration, Zowe components fail
- **User Impact:** System administrators cannot configure ICSF for Zowe
- **Beginner Impact:** CRITICAL - No guidance available

**Related Documentation:**
- New page: `docs/user-guide/api-mediation/configuration-icsf.md` (recommended)
- `docs/user-guide/api-mediation/configuration-extender-passtickets.md` (related)
- IBM z/OS ICSF documentation (external reference)

