# Issue #4372: Issue with docs.zowe.org/stable/user-guide/mvd-configuration/

**URL:** https://github.com/zowe/docs-site/issues/4372

**Created:** 2025-05-05T16:02:25Z

**Updated:** 2025-06-27T08:53:12Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

The file _defaultTN3270.json within the tn3270-ng2 app folder /config/storageDefaults/sessions/ is deployed to the [configuration dataservice](https://docs.zowe.org/stable/extend/extend-desktop/mvd-configdataservice) when the app-server runs for the first time. This file is used to tell the terminal what host to connect to by default. If you'd like to customize this default, you can edit the file directly within the configuration dataservice


The only copy I can find is in  components/app-server/share/vt-ng2/config/storageDefaults/  
which I have mounted read only ( to prevent people changing it - and to sharie it between systems.)

If I have two zowe instances - they would both use the same file - so  I think the  doc is wrong ( or there is a bug, and it needs to go in my instance directory)


Same with Setting up the TN3270 mainframe terminal app plugin

and perhaps others





## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

