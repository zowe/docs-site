# Issue #4725: [doc]: CeaTso request failed with REST API HTTP status 500

**URL:** https://github.com/zowe/docs-site/issues/4725

**Created:** 2025-09-24T15:30:45Z

**Updated:** 2026-05-15T14:55:32Z

**Labels:** type: enhancement, area: misc, type: troubleshoot

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Similar to #4233, it would be awesome to inform people on how they can troubleshoot other Common Event Adapter (CEA) issues like with the APPTAG.

**Symptom:**
```
Rest API failure with HTTP(S) status 500
rc:       12
reason:   2
details: 
  - 
          =-=-=-=-=-=-=-=-=-=-=- CeaTsoRequest -=-=-=-=-=-=-=-=-=-=-=
      ceatso_requesttype:    1
      ceatso_userid:         U02944I
      ceatso_asid:           0x0000
      ceastso_logonproc:     IZUFPROC
      ceatso_numqueryreq:    0
      ceatso_numqueryrslt:   0
      ceatso_msgqueueid:     0x00000000
      ceatso_charset:        697
      ceatso_codepage:       1047
      ceatso_screenrows:     24
      ceatso_screencols:     80
      ceatso_account:        IZUACCT
      ceatso_group:          SYS1
      ceatso_region:         65536
      ceatso_instance:       0
      ceatso_apptag:         FS58dc8f
      ceatso_stoken:         0x0000000000000000
      ceatso_ascbaddr:       0x0
      ceatso_flags:          0x0
      ceatso_index:          0
      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      
    
category: 3
message:  CeaTso request failed
```

**Possible Solutions**
1. Identify and Free Unused Message Queues
2. Increase IPCMSGNIDS in BPXPRMxx
3. Monitor Usage

For details on each solution, please see:
- https://github.com/zowe/zowe-cli/issues/699#issuecomment-2653939445

## Page to add/update

https://docs.zowe.org/stable/troubleshoot/troubleshoot-zos-services

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

To be able to share a zowe-docs link to this page 😋 

## Additional context
<!--Add any other context about the documentation error here.-->

This came up after discussing PR:
- #4722 

For more context, please see:
- https://github.com/zowe/zowe-cli/issues/699#issuecomment-2653939445
