# Issue #4388: Issue with docs.zowe.org/stable/user-guide/mvd-3270/

**URL:** https://github.com/zowe/docs-site/issues/4388

**Created:** 2025-05-06T15:21:47Z

**Updated:** 2025-05-09T07:50:45Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

it says

The terminal connection can be customized per user and saved for future sessions using the connection toolbar of the application. The preferences are stored within [the configuration dataservice storage](https://docs.zowe.org/stable/extend/extend-desktop/mvd-configdataservice), which can also be used to set instance-wide defaults for multiple users.


as an end user, how do I customise the keys with the 3270 session?
For example the defaults has  [hw] which prints Hello world.   I do not want this.
I want to set a) system defaults and b) user defaults.

Please explain how I do this.   The link  _within [the configuration dataservice storage](https://docs.zowe.org/stable/extend/extend-desktop/mvd-configdataservice), which c_

was not helpful.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status
**Status:** Still Valid

**Date Validated:** 2025-01-17

**Validator:** Mistral Vibe

**Notes:** 
The documentation in `/home/balda/zowe/docs-site/docs/user-guide/mvd-3270.md` mentions that "The terminal connection can be customized per user and saved for future sessions using the connection toolbar of the application" and references the configuration dataservice storage. However, it does not provide clear, step-by-step instructions for end users on how to actually customize the keys in a 3270 session. The documentation shows environment variables for system-level customization but lacks user-level customization instructions. The issue specifically mentions wanting to remove the default "hw" (Hello World) key sequence and set both system and user defaults. User guidance is needed.

