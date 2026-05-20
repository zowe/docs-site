# Issue #1893: Zowe demo video strategy

**URL:** https://github.com/zowe/docs-site/issues/1893

**Created:** 2021-11-11T10:37:41Z

**Updated:** 2025-03-14T14:38:31Z

**Labels:** type: enhancement, area: docs, release: V3, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. While there are many demo videos embedded throughout the documentation (50+ YouTube embeds found), there is no documented strategy for:

- Where to host demo videos (currently using YouTube, including Open Mainframe Project's channel)
- How to maintain and update demo videos
- Process for squads to upload new videos
- Consistent look and feel guidelines
- Video searchability and versioning

**Current State:**
- Videos are hosted on YouTube and embedded using iframe tags
- Videos appear in release notes, getting started guides, and other documentation
- No centralized video repository or index
- No documented process for video creation, review, or updates

**Recommendation:** This issue remains valid. A demo video strategy would help ensure consistency and maintainability of video content across the Zowe documentation.

---

We have many great demo videos for different components and they would be very helpful for users to learn about features and functions. To embed the demo videos in docs or link to them in docs, a strategy needs to be defined. For example: 

- where to host the demo videos. OMP's Youtube channel is now used for Zowe videos (system demos, overview videos, webinars, etc.) but for short demo videos that will be frequently uploaded, the location for these videos need to be considered. 
- how to maintain these demo videos. Some demo videos might change per release. Need a process to allow squads to maintain them and upload new ones, for example, via a PR, or allow squad leads to upload directly. 
- how to ensure consistent look and feel. for example, use the same starting and ending screen. 
- some other considerations: 
  - the demo videos should also be searchable in search engines
  - how to version videos
