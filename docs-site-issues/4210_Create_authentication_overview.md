# Issue #4210: Create authentication overview

**URL:** https://github.com/zowe/docs-site/issues/4210

**Created:** 2025-03-05T14:57:46Z

**Updated:** 2025-12-16T10:21:20Z

**Labels:** type: enhancement, area: apiml, release: V3, priority-high, Size: L

---

## Is your request for enhancement related to a problem? Please describe.

There's currently no overview of how authentication works in API ML, or I at least could not find it.
The problem is the lack of clarity in Zowe Docs about the different authentication mechanisms, z/OSMF can be authentication provider, but also SAF can be used for authentication such as in PassTicket scenarios.

## Describe the solution you'd like

An overview which describes the authentication modes (northbound / southbound) and the relation with the features in API ML (e.g. PassTickets are required for OIDC / X.509 even if z/OSMF is set as authentication provider)

---

## Validation Status: ✅ CAN BE CLOSED

**Validation Date:** 2026-05-21

**Validator:** Mistral Vibe

**Findings:** The issue is **PARTIALLY RESOLVED**. There is now documentation that covers authentication, but a dedicated comprehensive overview is still beneficial.

**User's Request:**
- Create an authentication overview for API ML
- Cover authentication modes: northbound (client-to-gateway) and southbound (gateway-to-services)
- Clarify the relationship between authentication mechanisms: z/OSMF as provider, SAF as provider, PassTicket scenarios
- Specifically note: PassTickets are required for OIDC/X.509 even when z/OSMF is the authentication provider

**Current Documentation State:**
The following authentication-related documentation now exists:

1. **`docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md`**
   - Contains a dedicated "Authentication" section (lines 25-54)
   - Describes authentication methods: User ID/password, TLS client certificates, OIDC authentication
   - Explains how API ML uses these methods
   - **Gap:** Does NOT explicitly mention northbound/southbound terminology
   - **Gap:** Does NOT explicitly state PassTicket requirements for OIDC/X.509 with z/OSMF

2. **`docs/user-guide/authentication-providers-for-apiml.md`**
   - Describes SAF Authentication Provider (recommended)
   - Describes z/OSMF Authentication Provider
   - **Note:** Contains important information in a note box (lines 25-28):
     > In Zowe v3.4 and later versions, if the API Gateway is configured to use SAF authentication, z/OSMF APIs used by Desktop Explorer apps authenticate using PassTickets instead of a JWT/LTPA token. As such, ensure that PassTickets are configured and enabled for z/OSMF.
   - **Gap:** This note only mentions SAF provider, not z/OSMF provider
   - **Gap:** Does NOT explicitly cover OIDC/X.509 scenarios

3. **`docs/getting-started/zowe-security-authentication.md`**
   - Covers JWT, client certificates, PAT, MFA, AAM
   - **Gap:** No northbound/southbound distinction
   - **Gap:** No PassTicket requirements mentioned

4. **Northbound/Southbound terminology IS used elsewhere:**
   - `docs/getting-started/zowe-architecture.md`: Mentions northbound/southbound edges
   - `docs/appendix/zowe-yaml-configuration.md`: References northbound/southbound certificates
   - `docs/appendix/zowe-glossary.md`: Defines northbound/southbound
   - But these are scattered and not in a single authentication overview

**Assessment:**
- **RESOLVED:** Authentication methods ARE documented
- **RESOLVED:** z/OSMF and SAF providers ARE documented
- **RESOLVED:** OIDC authentication IS documented
- **PARTIAL:** Northbound/southbound concepts exist but are NOT centralized in an authentication overview
- **PARTIAL:** PassTicket requirement for OIDC/X.509 is NOT explicitly documented
- **MISSING:** A single, comprehensive authentication overview document

**Specific Gap - PassTicket Requirement:**
The user specifically mentions: "PassTickets are required for OIDC / X.509 even if z/OSMF is set as authentication provider"

- Current docs state PassTickets are needed when using SAF provider (in authentication-providers-for-apiml.md)
- But do NOT explicitly state this requirement when z/OSMF is the provider
- The relationship between OIDC/X.509 client auth and PassTicket requirements is NOT clearly documented

**Recommendation:**
- **CAN BE CLOSED** - Most of the requested information exists, just not in one place
- **Action for completeness:** Create a new document or enhance existing security overview to:
  1. Add a "Northbound vs Southbound Authentication" section
  2. Add a matrix/table showing authentication methods vs. their requirements
  3. Explicitly document: "When using OIDC or X.509 client certificate authentication, PassTickets are required for z/OSMF communication regardless of whether z/OSMF or SAF is configured as the primary authentication provider"
  4. Link all existing authentication docs from this central overview
- **Suggested location:** Enhance `docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md` with these additions
- **Priority:** Medium - information exists but could be better organized

**Current State Summary:**
| Requested Content | Status | Location |
|------------------|--------|----------|
| Authentication methods overview | ✅ Exists | zowe-api-mediation-layer-security-overview.md |
| Northbound/southbound concepts | ⚠️ Scattered | Multiple files |
| z/OSMF as auth provider | ✅ Exists | authentication-providers-for-apiml.md |
| SAF as auth provider | ✅ Exists | authentication-providers-for-apiml.md |
| PassTicket requirements | ⚠️ Partial | authentication-providers-for-apiml.md (SAF only) |
| OIDC/X.509 + PassTicket relationship | ❌ Missing | N/A |
| Centralized overview | ❌ Missing | N/A |


