# Troubleshooting Zowe Launcher

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior using Zowe&trade; Launcher.

Issues and development of the Zowe Launcher is managed in GitHub. When you troubleshoot a problem, you can check whether a GitHub issue (open or closed) that covers the problem already exists. For a list of issues, see the [launcher repo](https://github.com/zowe/launcher).

[**Error Message Codes**](launcher-error-codes.md)
## Enable Zowe Launcher Debug Mode

Use debug mode to display additional debug messages for Zowe Launcher.

**Important:** We highly recommend that you enable debug mode only when you want to troubleshoot issues.
Disable debug mode when you are not troubleshooting. Running Zowe Launcher in debug mode can adversely affect its performance and consume a large amount of spool space.

**Follow these steps:**

1. Open the PROCLIB member `ZWESLSTC`.

2. Find `STDENV DD` in-stream data.

3. Add a new line `ZLDEBUG=ON`.
  
  ```jcl
  //STDENV   DD  *
  _CEE_ENVFILE_CONTINUATION=\
  _CEE_RUNOPTS=HEAPPOOLS(OFF),HEAPPOOLS64(OFF)
  _EDC_UMASK_DFLT=0002
  CONFIG=/path/to/zowe.yaml
  ZLDEBUG=ON
  /*
  ```
  By default, debug mode is disabled, in which `ZLDEBUG` is set to `OFF`. To disable debug mode, remove this line or set `ZLDEBUG` to `OFF`.
   
4. Restart `ZWESLSTC` Started Task.

:::tip
    
[`_CEE_ENVFILE_COMMENT`](https://www.ibm.com/docs/en/zos/2.5.0?topic=library-cee-envfile-comment) sets the comment character. See the following example, in which the last two lines of in-stream data are commented (not in effect):

```jcl
//STDENV   DD  *
_CEE_ENVFILE_COMMENT=*
_CEE_ENVFILE_CONTINUATION=\
_CEE_RUNOPTS=HEAPPOOLS(OFF),HEAPPOOLS64(OFF)
_EDC_UMASK_DFLT=0002
CONFIG=/path/to/zowe.yaml
* CONFIG=/path/to/zowe-test.yaml
* ZLDEBUG=ON
/*
```
:::
