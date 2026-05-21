# Issue #4114: Issue with docs.zowe.org/stable/user-guide/configure-caching-service-ha

**URL:** https://github.com/zowe/docs-site/issues/4114

**Created:** 2025-02-02T09:08:01Z

**Updated:** 2025-12-16T10:21:18Z

**Labels:** type: enhancement, area: apiml, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Please explain what HA facilities this provides.

What is the difference between having a Zowe instance on each LPAR and the HA solution.
With separate Zowe instances, if one system goes down, you can (re) connect to a different solution, and logon.
I hope that the HA solution means you can reconnect to a backup instance, without needing to logon,

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is **STILL VALID** and requires documentation improvements.

**User's Questions:**
1. What HA facilities does the Caching Service provide?
2. What is the difference between having a Zowe instance on each LPAR vs the HA solution?
3. With separate Zowe instances, if one system goes down, can you reconnect to a backup without needing to logon again?

**Current Documentation State:**
- `docs/user-guide/configure-caching-service-ha.md` explains the technical setup:
  - Multiple Zowe launcher instances (same LPAR or different LPARs in sysplex)
  - Traffic distributed between gateways via shared northbound port (7554)
  - Work routed to available services when some become unavailable
  - Caching Service centralizes state data in HA mode
  - Storage methods: inMemory, Infinispan, VSAM, Redis
- `docs/user-guide/configure-sysplex.md` explains Sysplex Distributor with DVIPA
- `docs/user-guide/api-mediation/api-mediation-caching-service.md` explains that Caching Service enables resource sharing for stateful services

**What's Missing:**
- No **clear, concise explanation** of the HA benefits in practical terms
- No **comparison table or explanation** of separate instances vs HA solution
- No explicit answer to the **session persistence question** (can users reconnect without re-authenticating?)
- The documentation is **technical** but lacks **conceptual clarity** for the user's specific questions

**Assessment:** The user is asking for conceptual clarification that the current documentation does not provide. The technical details are present, but the "why" and "what's the difference" are not clearly explained.

**Recommendation:** KEEP OPEN. The documentation needs to be enhanced with:
1. A clear explanation of HA facilities provided by Caching Service
2. A comparison of separate instances vs HA solution (possibly in a table format)
3. Explicit information about session state preservation and authentication behavior during failover

