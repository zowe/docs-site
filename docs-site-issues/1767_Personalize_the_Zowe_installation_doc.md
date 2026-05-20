# Issue #1767: Personalize the Zowe installation doc

**URL:** https://github.com/zowe/docs-site/issues/1767

**Created:** 2021-07-22T14:12:57Z

**Updated:** 2025-03-14T15:10:39Z

**Labels:** area: site-infrastructure, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The documentation does not currently have a tagging and filtering system to personalize the installation docs based on user selections (components, security managers, optional features, etc.).

**Current State:**
- No tagging system in documentation frontmatter
- No filtering mechanism in the Docusaurus theme
- Documentation is presented as-is without personalization
- Users must manually navigate through all sections regardless of their specific configuration

**Technical Context:** The issue mentions that Docusaurus (the site generator) could support this through custom React components and frontmatter tags. The `DocItem` component was mentioned as a potential customization point. However, no implementation has been done.

**Impact:** Users installing Zowe with specific configurations (e.g., only API ML, with RACF, without HA) still see all documentation sections, which may include irrelevant or confusing information for their use case.

**Recommendation:** This issue remains valid. Implementing this feature would significantly improve the user experience for Zowe installation documentation.

---

Proposal from Sean @1000TurquoisePogs : 

- Allow users to filter content by some sort of tagging we can apply to the docs. 
- i'd like to see a system where i can by some menu set what i'm trying to use (explorer, apiml, desktop, etc) and what i have (racf, top secret, acf2, etc) and all of the doc that is 100% irrelevant to those tags will disappear so the user can see a small and organized set of docs
- So, my idea is that the user chooses in some menu what type of install they want and what dependencies they have, and what optional features they want like SSO, HA, etc. Then the sections of doc that dont have the same tags as the chosen options are either removed from the page with react disabling the HTML sections, or making the text grey-out with react adjusting the CSS.  This way users can still read the documentation in the same layout as today, but they will not be bothered by irrelevant sections that if they accidentally read would confuse them and maybe cause them to install things they didnt need

![image (27)](https://user-images.githubusercontent.com/14340789/126653052-37b49681-0899-4e28-90c5-2a26f43d10ef.png)

![image (28)](https://user-images.githubusercontent.com/14340789/126653116-8b5e5e2e-549d-4b4c-8908-e60a2b67c3d8.png)


**Information that might be useful for this work (by Arijit @covalentbond )**
> we are using Docusaurus as the site generator. It's built on top of ReactJS.
Docusaurus by default gives us a template of all set of components - you can find on the site. Though it also gives us the option to customize any component accordingly, which can be useful here.
[Here](https://github.com/facebook/docusaurus/tree/master/packages/docusaurus-theme-classic/src/theme) are the default components used by the Docusaurus theme. We tweaked the `DocItem` component to include Doc Sharing, PDF & other option like Ratings.
`DocItem` is the main Doc component in which the doc is being shown. You can find it in the [src/theme](https://github.com/zowe/docs-site/tree/docs-staging/src/theme) directory.
For tagging purposes, I think we can add tags in the Frontmatter of every markdown file of doc. I'm not having a clear idea of the functionality needed & the implementation.
But we can do anything in the site, what we can do with ReactJS.


