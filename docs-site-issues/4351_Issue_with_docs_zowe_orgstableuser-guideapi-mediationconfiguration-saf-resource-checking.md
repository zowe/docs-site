# Issue #4351: Issue with docs.zowe.org/stable/user-guide/api-mediation/configuration-saf-resource-checking

**URL:** https://github.com/zowe/docs-site/issues/4351

**Created:** 2025-05-03T16:42:00Z

**Updated:** 2025-06-27T06:16:09Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says
Setting the native provider to perform SAF resource check (Default setting)


How do I find out what SAF classes and resources I need to use ?

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

**Findings:** The issue is **VALID**. The user is asking a critical question: **"How do I find out what SAF classes and resources I need to use?"** This information is completely missing from the documentation.

**User's Question:**
> "It says Setting the native provider to perform SAF resource check (Default setting)"
> "How do I find out what SAF classes and resources I need to use?"

**Current Documentation State:**
The page `docs/user-guide/api-mediation/configuration-saf-resource-checking.md` describes HOW to configure SAF resource checking with three providers (native, endpoint, dummy), but it **does NOT explain** what SAF classes and resources should be defined or how to determine them.

**Specific Gaps:**

| Missing Information | Impact | Location |
|---------------------|--------|----------|
| No guidance on which SAF classes to define | Users cannot implement SAF protection | `configuration-saf-resource-checking.md` |
| No guidance on which SAF resources to define | Users cannot implement SAF protection | `configuration-saf-resource-checking.md` |
| No examples of SAF class/resource naming conventions | Users don't know what format to use | `configuration-saf-resource-checking.md` |
| No explanation of SAF class/resource purpose | Users don't understand the security model | `configuration-saf-resource-checking.md` |

**Current Documentation Content:**
The documentation explains:
- Three providers: native (default), endpoint, dummy
- Configuration steps for each provider
- For dummy provider: shows YAML structure but only as example format

The dummy provider section shows:
```yaml
safAccess:
  {CLASS}:
    {RESOURCE}:
      - {UserID}
```
But does NOT explain:
- What actual class names to use (e.g., `ZOWE`, `APIM`, etc.)
- What actual resource names to use
- How to determine appropriate class/resource names for their site
- What classes/resources are recommended by Zowe

**Assessment:**
This is a **critical documentation gap**. Without knowing what SAF classes and resources to define, users cannot properly configure SAF resource checking. The documentation teaches the mechanics of configuration but not the security design decisions required.

**Recommendation:**
1. **Add a new section** in `configuration-saf-resource-checking.md` titled "Determining SAF Classes and Resources" that explains:
   - Recommended SAF class names for Zowe (e.g., `ZOWE`)
   - Recommended resource naming conventions
   - How classes/resources map to API ML endpoints
   - Examples of complete SAF definitions
   - Site-specific customization guidance

2. **Add a section** "SAF Resource Planning" that helps users understand:
   - The relationship between API ML endpoints and SAF resources
   - How to protect different types of endpoints (gateway, services, etc.)
   - Best practices for SAF class/resource hierarchy

3. **Provide concrete examples** such as:
   ```yaml
   safAccess:
     ZOWE:
       GATEWAY:
         - user1
         - user2
       CATALOG:
         - user1
       DISCOVERY:
         - user1
   ```

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users cannot implement SAF-based security without this information
- **Security Impact:** Sites may have unprotected APIs because they don't know what to protect
- **Adoption Block:** This gap prevents proper security configuration

**Related Documentation:**
- `docs/user-guide/api-mediation/configuration-saf-resource-checking.md` (primary)
- `docs/extend/extend-apiml/implement-new-saf-provider.md` (for custom providers)

