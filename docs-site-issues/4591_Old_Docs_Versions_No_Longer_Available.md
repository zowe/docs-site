# Issue #4591: Old Docs Versions No Longer Available

**URL:** https://github.com/zowe/docs-site/issues/4591

**Created:** 2025-07-14T15:11:21Z

**Updated:** 2025-07-16T09:45:28Z

**Labels:** area: site-infrastructure

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
When attempting to view all documentation, the docs prior to 2.15.0 are no longer available. This is because Netlify now only stores sites for 90 days before deleting them. Therefore all docs pages that are not on the docs site and refer to an old Netlify deployment ( <=2.14.0 at the time of this issue ) are no longer available.

## Pages to Update
<!--https://docs.zowe.org/...-->
https://docs.zowe.org/versions

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->
<img width="2054" height="908" alt="Image" src="https://github.com/user-attachments/assets/f2360d76-3c4c-4b39-90ae-dc5d82e069cc" />

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->
Previous sites would be accessible, or references would not be present

## Additional context
<!--Add any other context about the documentation error here.-->
Available options include providing the PDFs of older versions of the Docs Site, or removing all documentation that is not included in the live site.

