# Issue #4274: Create new content Re: API versioning

**URL:** https://github.com/zowe/docs-site/issues/4274

**Created:** 2025-04-02T08:22:10Z

**Updated:** 2025-12-16T10:21:21Z

**Labels:** area: docs, area: apiml, priority-medium, Size: L

---

The previous topic Re: API versioning has been deprecated and removed from Zowe Docs due to inaccuracies.

It would be useful to have a new article that details versioning as it works in v3.

Previous API versioning article: [API versioning](https://github.com/zowe/docs-site/blob/master/docs/extend/extend-apiml/api-mediation-versioning.md)

The new article should address the following:

- Showcase how the API ML routes to the correct versions.

- Explain that for API ML only major version matters.

- Point to the right place in documentation with respect to metadata when onboarding service, that handles this area.

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-21

**Validator:** Mistral Vibe

**Findings:** The issue is **PARTIALLY VALID**. The old article was deprecated but versioning information exists in multiple places. A centralized v3-specific article would be beneficial.

**User's Request:**
Create a new API versioning article for Zowe v3 that:
1. Showcases how API ML routes to the correct versions
2. Explains that for API ML only major version matters
3. Points to the right documentation for metadata when onboarding services

**Current Documentation State:**

1. **Old article still exists (but deprecated):**
   - File: `docs/extend/extend-apiml/api-mediation-versioning.md`
   - Status: Removed from sidebar in commit 9f27e328a (April 1, 2025) due to inaccuracies
   - Contains: Versioning terminology, API versioning concepts, major/minor/patch versions
   - **Issue:** May contain outdated information for v3

2. **Routing information (addresses point #1):**
   - File: `docs/extend/extend-apiml/api-mediation-routing.md`
   - **DOES document:** "API Mediation Layer supports distinction on the major version boundary" (line ~30)
   - Contains diagrams showing routing for:
     - Single version on single instance
     - Multiple versions on single instance
     - Multiple instances with versioned APIs
   - **Status:** ✅ Current and accurate for v3

3. **Major version focus (addresses point #2):**
   - Confirmed in routing docs: "supports distinction on the major version boundary"
   - Confirmed in onboard-static-definition.md (lines 47-50):
     > "The API Gateway differentiates major versions of an API... then the default API becomes the API with the highest major version"
   - **Status:** ✅ Documented in multiple places

4. **Metadata for onboarding (addresses point #3):**
   - File: `docs/extend/extend-apiml/custom-metadata.md`
   - Contains: Custom metadata parameters for onboarding
   - File: `docs/extend/extend-apiml/onboard-static-definition.md`
   - Contains: Version-related metadata in YAML definitions (apiInfo.version)
   - **Status:** ✅ Documented but scattered

5. **Onboarding version specification:**
   - In `onboard-static-definition.md` (line 47):
     ```yaml
     gatewayUrl: api/v2  # Major version in the URL
     ```
   - In same file (lines 65-70): The `apiInfo.version` field in YAML
   - **Status:** ✅ Documented

**Assessment:**
- **✅ RESOLVED:** Information about routing to correct versions exists
- **✅ RESOLVED:** Information that only major version matters exists
- **✅ RESOLVED:** Metadata for onboarding exists
- **❌ MISSING:** Centralized, v3-specific article that ties all this together
- **❌ MISSING:** Clear article in the sidebar (old one was removed)

**Specific Gaps:**

| Requested Content | Status | Location | Quality |
|------------------|--------|----------|---------|
| How API ML routes to correct versions | ✅ Exists | api-mediation-routing.md | Good |
| Only major version matters | ✅ Exists | Multiple files | Good |
| Metadata for onboarding | ✅ Exists | custom-metadata.md, onboard-static-definition.md | Good |
| Centralized v3 article | ❌ Missing | N/A | N/A |
| Article in sidebar | ❌ Missing | Removed from sidebar | N/A |

**Recommendation:**
- **KEEP OPEN** - A centralized article would improve discoverability
- **Action 1:** Create new `docs/extend/extend-apiml/api-versioning-v3.md` (or update existing file)
- **Action 2:** Include the following sections:
  1. **Introduction**: Brief overview of API versioning in Zowe v3
  2. **Major Version Only**: Explicitly state "API ML only uses major version for routing"
  3. **Routing to Versions**: Reference and summarize routing information from api-mediation-routing.md
  4. **Onboarding Metadata**: Reference custom-metadata.md and onboard-static-definition.md
  5. **Examples**: Show YAML snippets with version fields
  6. **Best Practices**: Versioning guidelines
- **Action 3:** Add the new article to the sidebar in `sidebars.js`
- **Action 4:** Either:
  - Delete the old `api-mediation-versioning.md` file, OR
  - Update it with v3 information and add back to sidebar
- **Action 5:** Review the old article for v3 accuracy and update as needed

**Quality of Existing Content:**
The existing content in routing and onboarding docs is good and accurate for v3. The main issue is:
- No single entry point for versioning information
- Users must search across multiple documents
- Old article was removed but not replaced

**Impact:**
- **Medium** - Information exists but is not easily discoverable
- **Low** - Technical accuracy is good in existing docs
- **User Experience:** Confusing - old article link may be broken, new users won't find versioning info easily

**Suggested Structure for New Article:**
```markdown
# API Versioning in Zowe v3

## Overview
API Mediation Layer uses major version for routing and differentiation.

## How Versioning Works
- Only major version (v1, v2, etc.) is used in URLs
- Minor and patch versions are for documentation only
- Gateway routes based on major version

## Routing to Correct Versions
[Link to or inline diagrams from api-mediation-routing.md]

## Onboarding and Metadata
- apiInfo.version field
- customMetadata for version-specific configuration
[Link to custom-metadata.md and onboard-static-definition.md]

## Examples
YAML snippets showing version configuration
```
```

## Migration from v2
[If applicable]
```

