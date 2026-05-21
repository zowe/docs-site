# Issue #3840: Document recommended Workload Management setup for ZWE*

**URL:** https://github.com/zowe/docs-site/issues/3840

**Created:** 2024-08-29T12:56:20Z

**Updated:** 2025-03-14T14:11:42Z

**Labels:** priority-medium, area: install and config, release: V3, Size: L

---

## Is your request for enhancement related to a problem? Please describe.
The zowe startup takes all the available resources within the system. 

## Describe the solution you'd like
One correct way to solve the problem is to properly set up the class within the Workload Manager, which limits the resources available to the Job. We should document the recommended configuration for the Workload Management Setup. 

## Related doc pages
It's going to be a new one within the Installation procedure. 

## Additional context
The work probably will need to happen together with the server squads.

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. No documentation exists for recommended Workload Management setup for ZWE.

**Current State:** 
- No documentation found about Workload Management (WLM) configuration for ZWE
- The only WLM mention in docs is about z/OSMF Workload Management plug-in (`docs/user-guide/cli-install-configure-zosmf.md:51`), which is unrelated to ZWE startup resource management
- No guidance on limiting resources available to Zowe jobs via WLM classes
- No recommended WLM configuration in installation procedures

**Recommendation:** Create a new documentation page (e.g., `docs/user-guide/configure-wlm-for-zowe.md`) that describes:
- The problem: Zowe startup consuming all available system resources
- The solution: Proper WLM class setup to limit resources
- Recommended WLM configuration for ZWE started tasks
- Work with server squads to validate the recommendations
- Consider adding this to the installation checklist 

