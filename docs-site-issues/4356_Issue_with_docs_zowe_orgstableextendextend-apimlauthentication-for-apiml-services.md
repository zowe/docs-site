# Issue #4356: Issue with docs.zowe.org/stable/extend/extend-apiml/authentication-for-apiml-services/

**URL:** https://github.com/zowe/docs-site/issues/4356

**Created:** 2025-05-04T08:39:40Z

**Updated:** 2025-06-27T06:16:10Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
This page says

The full path of the auth/login endpoint appears as https://{gatewayUrl} :{gatewayPort}/gateway/api/v1/auth/login.

but
https://docs.zowe.org/stable/user-guide/authenticating-with-jwt-token/  says the path is

/api/v1/auth/login"

(and no gateway)

Which should I use...  please explain the difference, and when I should use one, and when I should use the other


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

**Findings:** The issue is **VALID**. There is a **path inconsistency** between two documentation pages. The user is seeing conflicting information about the JWT authentication endpoint path.

**User's Confusion:**
> "This page says The full path of the auth/login endpoint appears as https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/login."
> "but https://docs.zowe.org/stable/user-guide/authenticating-with-jwt-token/ says the path is /api/v1/auth/login (and no gateway)"
> "Which should I use... please explain the difference, and when I should use one, and when I should use the other"

**Current Documentation State:**

There are **TWO different paths** mentioned in different documentation:

| Documentation Page | Path Shown | Full URL Example |
|-------------------|------------|------------------|
| `versioned_docs/version-v3.0.x/extend/extend-apiml/authentication-for-apiml-services.md` | `/gateway/api/v1/auth/login` | `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/login` |
| `versioned_docs/version-v3.0.x/user-guide/authenticating-with-jwt-token.md` | `/api/v1/auth/login` | `https://localhost:10080/api/v1/auth/login` |
| `docs/user-guide/authenticating-with-jwt-token.md` (stable) | `/gateway/api/v1/auth/login` | `https://zowe:7554/gateway/api/v1/auth/login` |

**The Inconsistency:**

In **versioned v3.0.x**, the `authenticating-with-jwt-token.md` file uses `/api/v1/auth/login` (without /gateway/), while the `authentication-for-apiml-services.md` uses `/gateway/api/v1/auth/login` (with /gateway/).

In **stable (latest)**, the `authenticating-with-jwt-token.md` correctly uses `/gateway/api/v1/auth/login`.

**What's Actually Correct:**

The **correct path is `/gateway/api/v1/auth/login`** (with /gateway/). This is because:
1. The API Gateway serves these endpoints
2. The `/gateway` base path is part of the Gateway's URL routing
3. All authentication endpoints are under the Gateway component

**Why the Confusion:**

The v3.0.x version of `authenticating-with-jwt-token.md` has **incorrect examples** using `/api/v1/auth/login` (missing /gateway/). This was likely a copy-paste error or oversight when the documentation was updated.

**Assessment:**
This is a **documentation inconsistency** that needs to be fixed. Users following the v3.0.x documentation will use the wrong path and get 404 errors.

**Recommendation:**

1. **Fix the v3.0.x version of `authenticating-with-jwt-token.md`:**
   - Change all instances of `/api/v1/auth/login` to `/gateway/api/v1/auth/login`
   - Change all instances of `/api/v1/auth/query` to `/gateway/api/v1/auth/query`
   - Change all instances of `/api/v1/auth/refresh` to `/gateway/api/v1/auth/refresh`
   - Change all instances of `/api/v1/auth/ticket` to `/gateway/api/v1/auth/ticket`

2. **Ensure consistency in `authentication-for-apiml-services.md`:**
   - Verify all paths include `/gateway/` prefix
   - Update examples to use consistent formatting

3. **Add a note** in both files explaining:
   > **Note:** All API Mediation Layer authentication endpoints are served through the API Gateway and use the `/gateway/api/v1/auth/*` path prefix.

4. **Check all versioned docs** for this inconsistency:
   - v2.14.x, v2.18.x, v3.0.x, v3.1.x all have the incorrect path in `authenticating-with-jwt-token.md`

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users following v3.0.x docs will get 404 errors
- **Adoption Block:** Prevents successful JWT authentication if users follow the wrong path
- **Scope:** Affects multiple versioned documentation sets

**Technical Clarification:**

**Q: Which path should I use?**
A: **Use `/gateway/api/v1/auth/login`** - this is the correct and current path.

**Q: When would I use `/api/v1/auth/login` (without /gateway/)?**
A: **Never** - this path does not exist in the API Gateway. The `/gateway/` prefix is required.

**Q: What's the difference between the two pages?**
A:
- `authentication-for-apiml-services.md`: Describes the authentication architecture and all endpoints (correctly shows /gateway/)
- `authenticating-with-jwt-token.md`: User guide for JWT authentication (incorrectly shows /api/v1/ in v3.0.x, correct in stable)

**Related Documentation:**
- `docs/user-guide/authenticating-with-jwt-token.md` (stable - CORRECT)
- `versioned_docs/version-v3.0.x/user-guide/authenticating-with-jwt-token.md` (needs fix)
- `versioned_docs/version-v3.0.x/extend/extend-apiml/authentication-for-apiml-services.md` (CORRECT)
- All other versioned versions need to be checked and fixed

