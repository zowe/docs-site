# Issue #988: question: started task ID must be Zowe Admin ?

**URL:** https://github.com/zowe/docs-site/issues/988

**Created:** 2020-02-17T01:24:45Z

**Updated:** 2025-03-14T14:43:39Z

**Labels:** area: zos-install-upgrade, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
install instruction state
Zowe requires a group `ZWEADMIN` that both `ZWESVUSR` and `ZWESIUSR` should belong to.

I think this is false. The started task userids are part of group STCGROUP, which by default is the same as ADMINGRP, but not necessarily. The started tasks must be able to read everything, but not administer Zowe, that is a task for userids assigned to actual people. 

## Pages to Update
<!--https://docs.zowe.org/...-->
https://docs.zowe.org/stable/user-guide/configure-zos-system.html#user-ids-and-groups-for-the-zowe-started-tasks

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

Using the final names instead of the variable names results in confusing documentation due to the reuse of the group name. A simple solution would be to use a unique value for STCGROUP by default instead of STCGROUP=&ADMINGRP.

## Additional context
<!--Add any other context about the documentation error here.-->

