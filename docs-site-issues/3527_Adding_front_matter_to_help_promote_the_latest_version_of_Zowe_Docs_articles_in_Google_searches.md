# Issue #3527: Adding front matter to help promote the latest version of Zowe Docs articles in Google searches

**URL:** https://github.com/zowe/docs-site/issues/3527

**Created:** 2024-03-12T19:38:46Z

**Updated:** 2026-05-15T19:52:41Z

**Labels:** type: enhancement, help wanted, area: docs, Size: L

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Is your request for enhancement related to a problem? Please describe.
Currently, Google is indexing older versions of Zowe Docs articles, which means that the latest version of articles are not included in search results. This can lead to Zower users getting outdated information if they're not aware that they've landed on an older version of Zowe Docs.

## Describe the solution you'd like
Apply annotations to help alert Google that older versions of Zowe Docs articles should be ignored when a latest version is available.

## Related doc pages
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## Additional context
<img width="734" alt="image" src="https://github.com/zowe/docs-site/assets/109533923/f025df82-b21e-4f24-9f08-b656b6138106">

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. No front matter or SEO annotations have been added to help Google prioritize latest versions.

**Current State:** 
- Multiple versioned documentation exists in `versioned_docs/` (v1.27.x, v1.28.x, v2.13.x, v2.14.x, v2.18.x, v3.0.x, v3.1.x, v3.2.x, v3.3.x)
- Latest/stable docs are in `docs/` directory
- No front matter annotations exist in markdown files to indicate canonical URLs or deprecation of older versions
- No `canonical`, `noindex`, or other SEO-related front matter is present in any documentation files
- Google is still indexing older versioned docs, potentially leading users to outdated information

**Recommendation:** Add front matter to versioned documentation files with:
- `canonical` URLs pointing to the latest/stable version
- `noindex` meta tags for older versions when a newer version exists
- Consider implementing rel=canonical HTTP headers via Docusaurus configuration
- Reference: [Google's guide on consolidating duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

