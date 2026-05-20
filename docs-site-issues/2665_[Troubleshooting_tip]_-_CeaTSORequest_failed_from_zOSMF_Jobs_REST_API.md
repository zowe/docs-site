# Issue #2665: [Troubleshooting tip] - CeaTSORequest failed from z/OSMF Jobs REST API

**URL:** https://github.com/zowe/docs-site/issues/2665

**Created:** 2023-02-21T12:46:44Z

**Updated:** 2025-03-14T15:04:23Z

**Labels:** area: docs, area: install and config, release: V3, Size: M

---

### 2. Choose a title

Fixing a REST API request (from Zowe CLI or Zowe Explorer) with CeaTSORequest failure

### 3. Symptom

Use Zowe CLI file request (or Zowe Explorer USS or data sets) and get error:

```
Rest API failure with HTTP(S) status 500
rc:       12
reason:   2
details: 
  - 
          =-=-=-=-=-=-=-=-=-=-=- CeaTsoRequest -=-=-=-=-=-=-=-=-=-=-=
      ceatso_requesttype:    1
      ceatso_userid:         WINCHJ
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
      ceatso_apptag:         FSfcf15d
      ceatso_stoken:         0x0000000000000000
      ceatso_ascbaddr:       0x0
      ceatso_flags:          0x0
      ceatso_index:          0
      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      
    
category: 3
message:  CeaTso request failed
```

### 4. Solution

Run the command `ipcs -x`.  If there is a long list then recycle the Zowe ZWESLSTC started task.
Permanent fix to add `zowe.environments.ZWE_PRIVATE_CLEANUP: true` e,g.

```
  environments:
    ZWED_SSH_PORT: 22
    ZWED_TN3270_PORT: 992
    ZWE_PRIVATE_CLEANUP_IPC_MQ: true
```


