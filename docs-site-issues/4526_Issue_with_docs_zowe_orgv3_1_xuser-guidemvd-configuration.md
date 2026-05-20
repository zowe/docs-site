# Issue #4526: Issue with docs.zowe.org/v3.1.x/user-guide/mvd-configuration

**URL:** https://github.com/zowe/docs-site/issues/4526

**Created:** 2025-06-11T14:11:38Z

**Updated:** 2026-05-06T21:38:26Z

**Labels:** area: webui, area: Zowe App Framework

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
The doc says

_Include zowe.environments.ZLUX_NO_CLUSTER=1 in the zowe.yaml file._

This doesnt work
_zowe: 
-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  
                                                
  environments: 
    **ZLUX_NO_CLUSTER=1** 
    ZWED_SSH_PORT: 222 
    ZWED_TN3270_PORT: 223_ 


I had to use

_zowe: 
-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  
                                             
  environments: 
    ZLUX_NO_CLUSTER: 1 
    ZWED_SSH_PORT: 222 
    ZWED_TN3270_PORT: 223 
    ZWED_TN3270_SECURITY: telnet 
    ZWED_SSH_HOST: 10.1.1.3_ 

with a CLUSTER: and a blank after the ":"  - and not **=1**

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

