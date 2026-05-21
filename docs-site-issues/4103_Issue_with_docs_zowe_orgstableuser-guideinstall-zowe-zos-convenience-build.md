# Issue #4103: Issue with docs.zowe.org/stable/user-guide/install-zowe-zos-convenience-build/

**URL:** https://github.com/zowe/docs-site/issues/4103

**Created:** 2025-01-31T07:51:34Z

**Updated:** 2025-03-14T12:44:17Z

**Labels:** type: bug, area: install and config, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says
Expand the PAX file by issuing the following command in the USS shell.


You need to add before this line
create the directory for the product libraries ( where there is enough space)
md /usr/lpp/zowe31

change to this directory
cd  /usr/lpp/.zowe31
....

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->


## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The documentation doesn't mention creating the directory before expanding the PAX file.

**Current State:** 
- `docs/user-guide/install-zowe-zos-convenience-build.md:80` states: "Expand the PAX file by issuing the following command in the USS shell" with command `pax -ppx -rf <zowe-V.v.p>.pax`
- There is NO mention of:
  - Creating a directory for the product libraries (e.g., `mkdir /usr/lpp/zowe31`)
  - Changing to that directory before expanding (e.g., `cd /usr/lpp/zowe31`)
  - Ensuring there is enough space in the target directory
- The documentation assumes users know to create an appropriate directory and navigate to it before expanding

**Recommendation:** Add steps before the PAX expansion:
1. Create a directory with sufficient space: `mkdir /usr/lpp/zowe31` (or similar)
2. Navigate to that directory: `cd /usr/lpp/zowe31`
3. Then expand the PAX file: `pax -ppx -rf <zowe-V.v.p>.pax`

This ensures users don't accidentally expand the PAX file in an inappropriate location or run out of space.
