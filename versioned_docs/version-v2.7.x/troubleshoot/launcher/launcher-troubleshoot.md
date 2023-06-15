# Troubleshooting Zowe Launcher

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior using Zowe&trade; Launcher.

Issues and development of the Zowe Launcher is managed in GitHub. When you troubleshoot a problem, you can check whether a GitHub issue (open or closed) that covers the problem already exists. For a list of issues, see the [launcher repo](https://github.com/zowe/launcher).

[**Error Message Codes**](launcher-error-codes.md)
## Enable Zowe Launcher Debug Mode

Use debug mode to display additional debug messages for Zowe Launcher.

**Important:** We highly recommend that you enable debug mode only when you want to troubleshoot issues.
Disable debug mode when you are not troubleshooting. Running Zowe Launcher in debug mode can adversely affect its performance and consume a large amount of spool space.

**Follow these steps:**

1. Open the PROCLIB member ZWESLSTC

2. Find STDENV DD inline statements

3. Add a new line
  
  ```
  ZLDEBUG=ON
  ```
  By default debug mode is disabled, so the `ZLDEBUG` is set to `OFF`. To disable debug mode remove the line or set `ZLDEBUG` to `OFF`.
   
3. Restart ZWESLSTC Started Task.
