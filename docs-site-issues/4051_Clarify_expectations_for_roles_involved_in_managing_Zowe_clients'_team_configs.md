# Issue #4051: Clarify expectations for roles involved in managing Zowe clients' team configs

**URL:** https://github.com/zowe/docs-site/issues/4051

**Created:** 2025-01-06T20:45:37Z

**Updated:** 2025-06-11T19:13:43Z

**Labels:** area: onboarding, area: cli, priority: important-longterm, release: V3, Size: M

---

## Is your request for enhancement related to a problem? Please describe.
We should try to avoid giving individual users the impression that they will need to become team config experts to be successful with Zowe CLI/Explorer for VS Code.

## Describe the solution you'd like
We should be positioning team config as something that is managed by a single person (who understands team config and has access to the networking/environment information necessary to access services running on the mainframe) and shared with a team. The shareability of team config is one of its primary benefits. Some of this is spelled out in other pages in the documentation, but this is not so clear in the pages listed below.

## Related doc pages
https://docs.zowe.org/stable/user-guide/cli-using-initializing-user-configuration
https://docs.zowe.org/stable/user-guide/cli-using-editing-team-configuration

## Additional context
<!-- Add any other context or screenshots about the feature request here.-->


## Validation Status: ⚠️ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. Some role clarification exists but not in the specific pages mentioned.

**Current State:** 
- `docs/user-guide/cli-using-benefits-of-team-config.md` DOES clearly position team config by roles (team leader/DevOps advocate, application developer, team member)
- However, the specific pages mentioned in the issue are unclear:
  - `docs/user-guide/cli-using-initializing-user-configuration.md` starts with "As an application developer or Zowe CLI user..." implying individual users manage their own configs
  - `docs/user-guide/cli-using-editing-team-configuration.md` doesn't clearly state WHO should be editing team configs

The documentation gives the impression that individual users might need to become team config experts, rather than clarifying that team config is managed by ONE person and shared.

**Recommendation:** 
1. Update `docs/user-guide/cli-using-initializing-user-configuration.md` to clarify that team config should be managed by a team leader/DevOps advocate and shared
2. Update `docs/user-guide/cli-using-editing-team-configuration.md` to add a note that it's primarily for team leaders or DevOps advocates
3. Emphasize the shareability benefit in both pages
