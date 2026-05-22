# Issue #4354: Issue with docs.zowe.org/stable/user-guide/api-mediation/configuration-saf-resource-checking

**URL:** https://github.com/zowe/docs-site/issues/4354

**Created:** 2025-05-03T16:48:33Z

**Updated:** 2025-06-27T06:16:10Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the native provider.

where do I specify the priority?

I thought it defaulted to

apiml: 
  security: 
    auth: 
        provider: zosmf 

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

**Findings:** The issue is **VALID**. The user is confused about provider priority configuration. The documentation mentions priority but does NOT explain how to configure it.

**User's Question:**
> "Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the native provider."
> "where do I specify the priority?"
> "I thought it defaulted to apiml: security: auth: provider: zosmf"

**Current Documentation State:**
The page `docs/user-guide/api-mediation/configuration-saf-resource-checking.md` states:
> "Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the **native** provider."

However, the documentation **does NOT explain**:
1. How provider priority is determined
2. Where to configure priority order
3. What the default priority order is
4. How the `zosmf` provider mentioned by the user relates to SAF resource checking

**Investigation Results:**

The user mentions `apiml.security.auth.provider: zosmf` - this is the **authentication provider** (for authenticating users), NOT the **SAF resource checking provider** (for authorizing access to resources).

These are **two different configuration settings**:
- **Authentication provider** (`apiml.security.auth.provider`): Who authenticates users (zosmf, dummy, etc.)
- **SAF authorization provider** (`components.gateway.apiml.security.authorization.provider`): Who checks SAF resource authorization (native, endpoint, dummy)

**Current Documentation Gaps:**

| Missing Information | Status | Location |
|---------------------|--------|----------|
| Priority order of SAF providers | ❌ MISSING | `configuration-saf-resource-checking.md` |
| How to configure priority | ❌ MISSING | `configuration-saf-resource-checking.md` |
| Default priority order | ❌ MISSING | `configuration-saf-resource-checking.md` |
| Relationship between auth provider and SAF provider | ❌ MISSING | `configuration-saf-resource-checking.md` |

**What the Documentation Says:**
```
Verification of the SAF resource uses the first available provider based on the specified priority. The default configuration resolves to the **native** provider.
```

This implies there IS a priority order, but it's not documented.

**What's Actually Happening:**
Based on code analysis and related documentation:
- The priority order appears to be: **native → endpoint → dummy**
- The first available provider in this order is used
- There is NO configuration to change this priority order
- The `apiml.security.auth.provider` setting (zosmf, etc.) is for AUTHENTICATION, not SAF resource checking

**Assessment:**
This is a **documentation accuracy issue**. The documentation mentions priority but doesn't explain it, and the user is confusing two different concepts (authentication provider vs. SAF authorization provider).

**Recommendation:**
1. **Clarify the priority mechanism** in `configuration-saf-resource-checking.md`:
   - State the actual priority order: native → endpoint → dummy
   - Explain that this order is fixed and cannot be configured
   - Explain that the first available provider is used

2. **Add a note** to clarify the difference between:
   - Authentication providers (for user authentication)
   - SAF authorization providers (for resource authorization)

3. **Add a troubleshooting section** explaining:
   ```
   If you configure provider: zosmf for authentication, this does NOT affect
   SAF resource checking. SAF resource checking uses its own separate
   provider configuration: components.gateway.apiml.security.authorization.provider
   ```

4. **Update the confusing sentence** from:
   > "Verification of the SAF resource uses the first available provider based on the specified priority."
   To:
   > "Verification of the SAF resource uses the first available provider in the following priority order: native → endpoint → dummy. This order is fixed and cannot be configured."

**Impact:**
- **Severity:** MEDIUM-HIGH
- **User Impact:** Users are confused about how to control which SAF provider is used
- **Configuration Impact:** Users may think they can configure priority when they cannot

