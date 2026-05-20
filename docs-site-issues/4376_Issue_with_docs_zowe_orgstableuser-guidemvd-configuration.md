# Issue #4376: Issue with docs.zowe.org/stable/user-guide/mvd-configuration/

**URL:** https://github.com/zowe/docs-site/issues/4376

**Created:** 2025-05-06T08:19:16Z

**Updated:** 2025-05-09T13:50:17Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
Customizing ZSS session duration

I can edit this file.   Please describe when changes are picked up.   Do I need to restart Zowe, or is the file read during the logon process.

If I need to restart zowe - it might be better to say specify groups rather than userids.

Can I specify a system wide default time (not 1 hour)?
_________________

If I change components.app-server.logLevels or components.zss.logLevels   how do I pick the changes - is this a restart or is it picked up in real time ( or every n seconds) 

___________________________________


it says

You control access by editing JSON files that list the apps. 
please describe where these files are stored   it is instance directory--- or a global directory?  If I change them - when are the changes picked up?  ( or should it say "see RBAC below")

Please give examples eg for provided applications such as 3270. 


____________________________________________________________________



Copy the allowedPlugins.json file and paste it in the following location:

<zowe.workspaceDirectory>/app-server/ZLUX/pluginStorage/org.zowe.zlux.bootstrap/plugins

I do not have a bootstrap directory, so  something needs to be updated ( or the directory created as part of install)

IBMUSER:/u/tmp/zowec/workspace/app-server/ZLUX/pluginStorage: >ls -ltr                         
total 80                                                                                       
drwxrwx---   4 ZWESVUSR SYS1        8192 Jan 25 18:18 org.zowe.zlux.ng2desktop                 
drwxrwxr-x   3 ZWESVUSR SYS1        8192 Jan 25 18:18 org.zowe.terminal.vt                     
drwxrwxr-x   3 ZWESVUSR SYS1        8192 Jan 25 18:18 org.zowe.terminal.tn3270                 
drwxr-x---   6 ZWESVUSR SYS1        8192 Jan 28 14:40 org.zowe.zlux.ivydesktop                 
drwxr-x---   3 ZWESVUSR SYS1        8192 May  5 15:07 org.zowe.explorer-ip                     




## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

