# Issue #3114: Adjust Onboarding Configuration Doc to account for 2nd+ Service onboarding

**URL:** https://github.com/zowe/docs-site/issues/3114

**Created:** 2023-05-30T11:12:14Z

**Updated:** 2025-05-13T09:51:31Z

**Labels:** area: apiml, release: V3, priority-high, Size: M

---

As an adopter of the APIML with pass tickets enabled and a 1st service onboarded, i want the documentation to clearly state what is required to onboard further services.

**Context**
Adopters of the API ML, who have already onboarded their first service, are unclear on which steps to follow to onboard a 2nd, 3rd, 4th.. Service. This applies in particular to Services that require a httpBasicPassTicket authentication scheme. If pass tickets have already been enabled on the target system for the 1st Service, Zowe Documentation should clearly state the steps necessary to onboard subsequent Services that require a httpBasicPassTicket authentication scheme.

**Acceptance Criteria**
API Mediation Layer onboarding configuration documentation adjusted to delineate between the following scenarios:
- Onboarding the First/Initial service with passtickets enabled
- Onboarding subsequent services with passtickets enabled
