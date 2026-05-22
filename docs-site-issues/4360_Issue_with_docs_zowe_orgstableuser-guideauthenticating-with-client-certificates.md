# Issue #4360: Issue with docs.zowe.org/stable/user-guide/authenticating-with-client-certificates/

**URL:** https://github.com/zowe/docs-site/issues/4360

**Created:** 2025-05-04T17:18:06Z

**Updated:** 2025-12-16T10:21:22Z

**Labels:** area: apiml, priority-high, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

it says

https://api-mediation-layer:7554/gateway/api/v1/auth/login -v

What is api-mediation-layer?  do I actually type this in?

I was expecting this to the URL of the system where Zowe is running. replacing it zowe-url would be clearer




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

**Findings:** The issue is **VALID**. The user is confused by the hostname `api-mediation-layer` in the example, which looks like a literal hostname rather than a placeholder.

**User's Confusion:**
> "it says https://api-mediation-layer:7554/gateway/api/v1/auth/login -v"
> "What is api-mediation-layer? do I actually type this in?"
> "I was expecting this to the URL of the system where Zowe is running. replacing it zowe-url would be clearer"

**Current Documentation State:**
The file `docs/user-guide/authenticating-with-client-certificates.md` contains this example:

```bash
curl -X POST \
--cert /path/to/cert.pem \
--key /path/to/key.pem \
https://api-mediation-layer:7554/gateway/api/v1/auth/login -v
```

The hostname `api-mediation-layer` is indeed confusing because:
1. It looks like a specific hostname
2. It's not enclosed in angle brackets like `{hostname}` to indicate it's a placeholder
3. It doesn't match the pattern used elsewhere in Zowe docs (typically `zowe` or `hostname`)

**Investigation Results:**

This is **NOT** a valid hostname that users should literally type. It's meant to be a placeholder for the actual hostname where Zowe is running.

**What the Documentation Should Say:**
The example should use a standard placeholder format consistent with other Zowe documentation:
- Option 1: `https://{gateway-hostname}:7554/gateway/api/v1/auth/login`
- Option 2: `https://<zowe-hostname>:7554/gateway/api/v1/auth/login`
- Option 3: Keep `api-mediation-layer` but add a note explaining it's a placeholder

**Assessment:**
This is a **documentation clarity issue**. The hostname placeholder is unclear and doesn't follow Zowe's standard documentation conventions.

**Recommendation:**

1. **Update the example** in `authenticating-with-client-certificates.md`:
   ```bash
   curl -X POST \
   --cert /path/to/cert.pem \
   --key /path/to/key.pem \
   https://{gateway-hostname}:7554/gateway/api/v1/auth/login -v
   ```

2. **Add a note** explaining:
   > **Note:** Replace `{gateway-hostname}` with the actual hostname or IP address where your Zowe API Gateway is running.

3. **Ensure consistency** across all curl examples in this file:
   - Check if `api-mediation-layer` appears elsewhere
   - Update all instances to use the same placeholder format

4. **Check other files** for similar unclear placeholders

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users are confused about what hostname to use
- **Beginner Impact:** High - beginners will literally try to use `api-mediation-layer` as a hostname
- **Clarity Impact:** Placeholder format is inconsistent with Zowe conventions

**Technical Clarification:**

**Q: What should I replace `api-mediation-layer` with?**
A: Replace it with the actual hostname or IP address where your Zowe instance is running. This is typically the same hostname you use to access the Zowe Desktop or API Gateway.

**Q: Is `api-mediation-layer` a special hostname?**
A: **NO** - it's just a placeholder. Your actual hostname might be something like `zowe.mycompany.com`, `myzowe.example.com`, or an IP address.

**Q: Why does it say `api-mediation-layer`?**
A: This was likely used to indicate "the API Mediation Layer gateway hostname" but it's not a standard naming convention and causes confusion.

**Related Documentation:**
- `docs/user-guide/authenticating-with-client-certificates.md` (primary - needs fix)
- Other files using curl examples should be checked for consistency

