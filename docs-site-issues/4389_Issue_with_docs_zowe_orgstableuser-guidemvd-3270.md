# Issue #4389: Issue with docs.zowe.org/stable/user-guide/mvd-3270/

**URL:** https://github.com/zowe/docs-site/issues/4389

**Created:** 2025-05-06T15:57:47Z

**Updated:** 2025-05-09T07:50:31Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
There is a green icon.... and a diskette icon. Please explain what these are for... for example 

There is a on/off icon.  If it is green, it shows the current connected status.  If you select it, the session is disconnected, the icon gets a grey background, and you can change the Host, Port, Type, Model and Codepage.

Once you have made you change, select the icon.  It should go green and connect to the specified address and port.

There is an icon of a diskette.  This does nothing.


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
The documentation in `/home/balda/zowe/docs-site/docs/user-guide/mvd-3270.md` does not contain any explanation of the UI icons (green icon, diskette icon, on/off icon). The user reports:
- Green icon: shows current connected status, click to disconnect (icon gets grey background), allows changing Host, Port, Type, Model and Codepage, then click to reconnect (should go green)
- Diskette icon: does nothing (user expectation is that it should save settings)

These UI elements and their functionality should be documented.

