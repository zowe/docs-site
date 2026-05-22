# Issue #4378: Issue with docs.zowe.org/stable/user-guide/start-zowe-zos

**URL:** https://github.com/zowe/docs-site/issues/4378

**Created:** 2025-05-06T09:11:23Z

**Updated:** 2025-05-21T15:23:08Z

**Labels:** area: zwe

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

The section on starting and stopping is very confusing

My started task is called  CCPSLSTC ( "to fit in with local standard")

This is the same as  ZWESLSTC    and I can start and stop it.

You need some words like

Starting and stopping Zowe main server

You can start and stop the main server using z/OS start and stop commands... see 
Starting and stopping Zowe main server ZWESLSTC on z/OS manually
or you can start it from Unix Servies using the zwe start --config ... command see 
Starting and stopping Zowe main server ZWESLSTC on z/OS with zwe server command


I tried using
zwe start --config /path/to/my/zowe.yaml

It needs to say 
It issues a command like


This command issue the operator command

 S ZWESLSTC,HAINST=S0W1,JOBNAME=ZWE1SV            

And the  job output is under job with name ZWE1SV in the spool.


This start command failed for me because my started task was not called  ZWESLSTC ( it is called CCPSLSTC)

_________________________

Under the topic

Starting and stopping Zowe main server ZWESLSTC on z/OS with zwe server command

The userid issuing this command needs permission to issue the start command on the console
S ZWESLSTC,HAINST=S0W1,JOBNAME=ZWE1SV            




<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user is confused about:
1. How to start/stop when their started task is NOT called `ZWESLSTC` (it's called `CCPSLSTC`)
2. What command `zwe start` actually issues (the operator command)
3. Where to find the job output (under the jobname in spool)
4. Missing clarity about permissions needed

**User's Confusion:**
> "My started task is called CCPSLSTC (to fit in with local standard)"
> "This is the same as ZWESLSTC and I can start and stop it."
> "You need some words like: Starting and stopping Zowe main server. You can start and stop the main server using z/OS start and stop commands... see Starting and stopping Zowe main server ZWESLSTC on z/OS manually"
> "I tried using: zwei start --config /path/to/my/zowe.yaml. It needs to say: It issues a command like: S ZWESLSTC,HAINST=S0W1,JOBNAME=ZWE1SV and the job output is under job with name ZWE1SV in the spool."
> "This start command failed for me because my started task was not called ZWESLSTC (it is called CCPSLSTC)"
> "Under the topic 'Starting and stopping Zowe main server ZWESLSTC on z/OS with zwe server command': The userid issuing this command needs permission to issue the start command on the console"

**Current Documentation State:**

The file `docs/user-guide/start-zowe-zos.md` has several issues:

1. **Hardcoded Started Task Name**: The documentation uses `ZWESLSTC` throughout, but users can customize this. The user's started task is `CCPSLSTC`.

2. **Missing Command Translation**: It doesn't clearly explain what operator command `zwe start` actually issues.

3. **Missing Job Output Location**: It doesn't explicitly state where to find job output (under the jobname in spool).

4. **Permissions Not Clear**: The note about permissions is in the wrong place and not comprehensive.

**What the Documentation Says:**

Section "Starting and stopping Zowe main server `ZWESLSTC` on z/OS with `zwe` server command":
```
To start Zowe, run the following command:

zwe start --config /path/to/my/zowe.yaml

 This command issues the `S` command to Zowe `ZWESLSTC`.
```

**What's Missing:**

| Missing Information | Impact | Location |
|---------------------|--------|----------|
| Custom started task name support | Users with custom names (CCPSLSTC) are confused | Throughout start-zowe-zos.md |
| Explicit operator command shown | Users don't know what S command is issued | "zwe start" section |
| Job output location | Users don't know where to look for logs | "zwe start" section |
| Permissions requirements | Users don't know what permissions are needed | "zwe start" and manual sections |

**Investigation Results:**

The started task name can be customized via:
- PROCLIB member name (the user's case: CCPSLSTC instead of ZWESLSTC)
- The `zwe start` command will issue: `S <proclib-member>,HAINST=...,JOBNAME=...`
- The job output appears under the JOBNAME in the spool

**Assessment:**
This is a **documentation clarity and completeness issue**. The documentation assumes the default started task name and doesn't explain:
1. How customization affects commands
2. What commands are actually being issued
3. Where to find output
4. What permissions are required

**Recommendation:**

1. **Add a note at the beginning** explaining customization:
   ```markdown
   :::note
   The examples in this article use the default started task names (ZWESISTC, ZWESASTC, ZWESLSTC).
   If you have customized these names (e.g., CCPSLSTC instead of ZWESLSTC), replace the
   task names in the examples with your actual started task procedure names.
   :::
   ```

2. **Show the actual operator commands** that `zwe start` and `zwe stop` issue:
   ```markdown
   **What this command does:**
   
   The `zwe start` command issues the following operator command:
   ```
   S <proclib-member>,HAINST=<instance>,JOBNAME=<jobname>
   ```
   
   Where:
   - `<proclib-member>` is your started task procedure name (default: ZWESLSTC)
   - `<instance>` is the HA instance name from your configuration
   - `<jobname>` is the job name (default: ZWE1SV, configurable via `zowe.job.name`)
   
   The job output can be found in the spool under the job name.
   ```

3. **Add explicit permissions guidance:**
   ```markdown
   **Permissions Required:**
   
   To use `zwe start` or `zwe stop`, the user ID issuing the command needs:
   - Permission to issue operator commands on the console
   - Access to the PROCLIB containing the started task procedures
   - Appropriate authorization to start/stop jobs in the JES subsystem
   
   If you lack permissions, you can:
   - Ask your system administrator to grant the necessary permissions
   - Use the manual start/stop methods (S/P commands) directly
   ```

4. **Update the manual start/stop section** to mention custom names:
   ```markdown
   To start Zowe main server, you can issue the `S <proclib-member>` command.
   If required by internal policy, customize the `JOBNAME` parameter.
   
   **Example with default name:**
   ```
   S ZWESLSTC,JOBNAME=ZWE1SV
   ```
   
   **Example with custom name:**
   ```
   S CCPSLSTC,JOBNAME=ZWE1SV
   ```
   ```

5. **Clarify the note about component restart** (mentioned in issue #4383):
   The current note says: "Not all components can be restarted with this method. Some components may rely on other components. It may be necessary to restart affected components."
   
   This should be expanded to explain WHICH components have dependencies.

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users with custom started task names cannot follow the documentation
- **Beginner Impact:** Very high - beginners won't understand the commands
- **Permissions Impact:** Users don't know what permissions they need

**Technical Clarification:**

**Q: Can I use a custom started task name like CCPSLSTC?**
A: **YES** - You can use any procedure name in your PROCLIB. The documentation uses ZWESLSTC as the default example, but you should replace it with your actual procedure name.

**Q: What command does `zwe start --config /path/to/my/zowe.yaml` actually issue?**
A: It issues: `S <proclib-member>,HAINST=<instance>,JOBNAME=<jobname>` where the values come from your configuration.

**Q: Where do I find the job output?**
A: In the spool, under the job name specified in the JOBNAME parameter (default: ZWE1SV). Use SDSF or your preferred spool browser.

**Q: What permissions do I need to run `zwe start`?**
A: You need:
- Console operator permissions to issue S (start) commands
- Access to the PROCLIB
- Authorization in your JES subsystem

**Related Documentation:**
- `docs/user-guide/start-zowe-zos.md` (primary - needs multiple fixes)
- `docs/appendix/zwe_server_command_reference/zwe/zwe-start.md` (zwe start reference)
- `docs/appendix/zwe_server_command_reference/zwe/zwe-stop.md` (zwe stop reference)

