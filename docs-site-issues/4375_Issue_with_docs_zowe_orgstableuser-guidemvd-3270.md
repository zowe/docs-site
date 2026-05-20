# Issue #4375: Issue with docs.zowe.org/stable/user-guide/mvd-3270/

**URL:** https://github.com/zowe/docs-site/issues/4375

**Created:** 2025-05-06T08:00:05Z

**Updated:** 2025-05-09T07:52:20Z

**Labels:** area: webui

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I see in /appServer-2025-05-06-07-42.log

"zowe": { 
  "workspaceDirectory": "/u/tmp/zowec/workspace", 
  "externalDomains": [ 
    "10.1.1.2" 
  ], 
  "environments": { 
    "ZWED_SSH_PORT": 22, 
    "ZWED_TN3270_PORT": 23, 
    "ZWED_TN3270_SECURITY": "telnet", 
    "ZWED_SSH_HOST": "10.1.1.2", 
    "ZWED_TN3270_HOST": "10.1.1.2", 
    "ZWED_TN3270_ROW": 24, 
    "ZWED_TN3270_COL": 80, 
    "ZWED_TN3270_MOD": "5" 
  }, 

But I cannot find these mentioned in the doc ( I searched for ZWED_TN3270_MOD) 
Are these user specifiable? If so please document them.


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

