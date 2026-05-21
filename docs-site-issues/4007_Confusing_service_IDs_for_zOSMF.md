# Issue #4007: Confusing service IDs for z/OSMF

**URL:** https://github.com/zowe/docs-site/issues/4007

**Created:** 2024-11-18T16:10:22Z

**Updated:** 2025-03-14T14:02:33Z

**Labels:** area: cli, area: apiml, priority-medium, release: V3, Size: M

---

**Is your feature or enhancement request related to a problem or limitation? Please describe**
Customers have indicated confusion around choosing a service ID for z/OSMF:
- When the service ID is registered as zosmf, the CLI automatically prepends /zosmf/ to the base path of API requests
- When the service ID is registered as ibmzosmf, APIML manages the base path, and the CLI does not add /zosmf/

The current doc suggests replacing ibmzosmf with the correct service ID but doesn't explain that ibmzosmf allows APIML to handle the base path, stopping the CLI from prepending /zosmf/. The doc makes it seem like ibmzosmf is a placeholder to be replaced, and isn't a valid service ID meant for APIML use.

**Describe your enhancement idea**

Update documentation to clarify the behavior when using zosmf vs. ibmzosmf as the service ID in the CLI documentation.
Be explicit that ibmzosmf allows APIML to control the base path, taking control from the CLI’s automatic base path handling.

or..

possible code change where the CLI detects whether it is using APIML. If APIML is detected, the CLI could skip automatically prepending /zosmf/, regardless of the service ID, to offload work from users.


Helpful links:

[Understanding zosmfServiceId configuration](https://docs.zowe.org/stable/user-guide/authentication-providers-for-apiml/#zosmf-authentication-provider)
[API Gateway configuration parameters and zosmfServiceId](https://docs.zowe.org/v1.28.x/user-guide/api-mediation/api-mediation-internal-configuration/)
[Accessing services through API ML](https://docs.zowe.org/v2.15.x/user-guide/cli-using-integrating-apiml/#:~:text=Accessing%20multiple%20services%20with%20SSO,Developing%20for%20API%20Mediation%20Layer)

## Validation Status: ⚠️ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. Some documentation exists but the key clarification is missing.

**Current State:** 
- `docs/user-guide/authentication-providers-for-apiml.md:43` contains misleading comment: `# Replace me with the correct z/OSMF service id` for `ibmzosmf`
- `docs/appendix/zowe-yaml-configuration.md:517` documents the parameter but doesn't explain the behavior difference
- `docs/whats-new/breaking-changes-v3.md:22` and `docs/whats-new/release-notes/v3_0_0.md:79` state that V3 only supports `/ibmzosmf` route, not `/zosmf` route
- Various docs show `ibmzosmf` as the default value

However, the CRITICAL clarification requested is MISSING:
- No explanation that when service ID is `zosmf`, CLI automatically prepends `/zosmf/` to base path
- No explanation that when service ID is `ibmzosmf`, APIML manages the base path and CLI does NOT prepend `/zosmf/`
- No explanation that `ibmzosmf` is a valid, recommended service ID (not just a placeholder)

**Recommendation:** 
1. Update `docs/user-guide/authentication-providers-for-apiml.md:43` to remove the misleading comment and explain that `ibmzosmf` is the default and recommended value
2. Add a section explaining the difference between `zosmf` and `ibmzosmf` service IDs:
   - `zosmf`: CLI prepends `/zosmf/` to API requests (legacy behavior)
   - `ibmzosmf`: APIML manages base path, CLI does not prepend `/zosmf/` (recommended for V3+)
3. Clarify that V3+ requires `ibmzosmf` route
