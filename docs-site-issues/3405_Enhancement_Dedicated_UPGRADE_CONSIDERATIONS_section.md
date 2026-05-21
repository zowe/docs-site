# Issue #3405: Enhancement:  Dedicated UPGRADE CONSIDERATIONS section

**URL:** https://github.com/zowe/docs-site/issues/3405

**Created:** 2024-01-26T13:54:41Z

**Updated:** 2025-03-14T14:21:12Z

**Labels:** area: install and config, release: V3, Size: L

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Is your request for enhancement related to a problem? Please describe.
<!-- A clear and concise description of what the problem is. e.g., I'm always frustrated when [I am using the search feature to search topics...] -->  Enhancement:  During recent presentations, while making them aware of v1 EOS and v3 introduction, Customers have asked about UPGRADE CONSIDERATIONS and if they were available in the documentation.  (Both for V1 to V2 , V1 to V3, and V2 to V3) It would be helpful if there was a section dedicated to this topic.

## Describe the solution you'd like
<!-- A clear and concise description of what you want to happen.-->  Consider introducing a sub-category / section? dedicated to providing upgrade information.  This section should include the same information for each Zowe component including:

1. Dependent technology requirements / releases (i.e. node version x)
2. Conversion requirements or recommendations (does the user / installer need to run a conversion?)
3. Deprecated features (or technologies), potential impact, recommended mitigation
4. Interoperability statement (will the release function with prior release extensions?)

## Related doc pages
<!-- https://docs.zowe.org/... -->  Consider adding this section beneath Zowe announcements?   (Maybe a good topic for TSC consideration) 

## Additional context
<!-- Add any other context or screenshots about the feature request here.-->  We will want to validate we have all of the relevant information with a few customers.

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. There is no dedicated UPGRADE CONSIDERATIONS section in the documentation.

**Current State:** Upgrade-related information exists but is spread across various documentation files:
- `docs/whats-new/breaking-changes-v3.md` - Contains breaking changes for V3 but not organized as a dedicated UPGRADE CONSIDERATIONS section
- `docs/whats-new/zowe-v3-migration.md` - V3 migration guide with upgrade paths from various versions
- `docs/user-guide/upgrade-zos.md` - Main upgrade guide with version-specific migration instructions
- `docs/whats-new/upgrade-from-convenience-build-to-pswi-smpe.md` - Specific upgrade path documentation
- Various component-specific upgrade notes in release notes

The information requested in the issue (dependent technology requirements, conversion requirements, deprecated features, interoperability statements) exists but is not consolidated into a single dedicated UPGRADE CONSIDERATIONS section/category as requested.

**Recommendation:** Create a dedicated UPGRADE CONSIDERATIONS section (possibly under `docs/whats-new/` or as a new category in the sidebar) that consolidates:
1. Dependent technology requirements for each version transition (v1→v2, v1→v3, v2→v3)
2. Conversion requirements/recommendations
3. Deprecated features with impact and mitigation
4. Interoperability statements

Consider placing this beneath Zowe announcements as suggested in the issue.

