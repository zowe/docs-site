# Issue #846: Automate the generation of release notes

**URL:** https://github.com/zowe/docs-site/issues/846

**Created:** 2019-11-21T07:59:52Z

**Updated:** 2025-03-14T14:47:54Z

**Labels:** type: enhancement, area: site-infrastructure, Size: L

---

## Is your request for enhancement related to a problem? Please describe.
<!-- A clear and concise description of what the problem is. e.g., I'm always frustrated when [I am using the search feature to search topics...] -->
The generation of release notes is an error-prone  manual process now to track changes in multiple repos and add related PR or issue number to each entry. 

## Describe the solution you'd like
<!-- A clear and concise description of what you want to happen.-->

Set up PR closing template in relevant repos as input. Then automate the generation of release notes. The output may look like this. Note that moved the PR and issue numbers to the end for there is possibility that multiple PRs fix the same issue and the following layout makes the content more readable.

```
# Features and enhancements
## API Mediation Layer
- PR description [PR#122] (Issue #101) (Docs)
- PR description [PR#123] (Issue #102) (Docs)
......
# Bug fixes
## API Mediation Layer
- PR description [PR#124] (Issue #103) (Docs)
- PR description [PR#125] (Issue #104) (Docs)

```
## Related doc pages
<!-- https://docs.zowe.org/... -->
https://docs.zowe.org/stable/getting-started/summaryofchanges.html#version-1-7-0-november-2019

## Additional context
<!-- Add any other context or screenshots about the feature request here.-->
See a sample PR closing template as follows> It's running in the `zowe-install-packaging` repo now. 
https://github.com/zowe/zowe-install-packaging/blob/master/.github/pull_request_template.md 

