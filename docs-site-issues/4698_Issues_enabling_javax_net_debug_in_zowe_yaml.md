# Issue #4698: Issues enabling javax.net.debug in zowe.yaml

**URL:** https://github.com/zowe/docs-site/issues/4698

**Created:** 2025-09-10T15:12:34Z

**Updated:** 2025-09-10T15:12:34Z

---

**## Description**
At the following zowe doc page:

https://docs.zowe.org/v2.18.x/troubleshoot/troubleshoot-apiml/#gather-atypical-debug-information

The suggested parameters to enable java net debug tracing (ZWE_configs_sslDebug)  does not work when trying to add this parameters to the zowe.yaml. The value of just 'sslDebug' is what ultimately works and not ZWE_configs_sslDebug. It would also be good to list the all the valid values for this parameter rather than just pointing to the spring doc about it (which also isn't very straightforward) .

**## Pages to Update** 
https://docs.zowe.org/v2.18.x/troubleshoot/troubleshoot-apiml/#gather-atypical-debug-information


**## Expected behavior**
I would expect the string yaml property ZWE_configs_sslDebug to work in zowe.yaml and it does not. You instead need to specify sslDebug

