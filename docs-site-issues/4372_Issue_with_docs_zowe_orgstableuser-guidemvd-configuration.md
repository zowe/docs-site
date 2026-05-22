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

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. There is a **path discrepancy** and **unclear guidance** about where the default terminal configuration files are located and how they should be customized in HA/multi-instance environments.

**User's Problem:**
> "It says: The file _defaultTN3270.json within the tn3270-ng2 app folder /config/storageDefaults/sessions/ is deployed to the [configuration dataservice] when the app-server runs for the first time."
> 
> "The only copy I can find is in components/app-server/share/vt-ng2/config/storageDefaults/"
> "which I have mounted read only (to prevent people changing it - and to share it between systems.)"
> 
> "If I have two zowe instances - they would both use the same file - so I think the doc is wrong (or there is a bug, and it needs to go in my instance directory)"

**Current Documentation State:**

The file `docs/user-guide/mvd-configuration.md` (lines 38-45) states:

```
The file _defaultTN3270.json within the tn3270-ng2 app folder /config/storageDefaults/sessions/ is deployed to the [configuration dataservice] when the app-server runs for the first time. This file is used to tell the terminal what host to connect to by default. If you'd like to customize this default, you can edit the file directly within the configuration dataservice `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`.
```

**The Problems:**

1. **Wrong Source Path**: The documentation says the file is in `tn3270-ng2 app folder /config/storageDefaults/sessions/` but the user found it in `components/app-server/share/vt-ng2/config/storageDefaults/`

2. **Unclear Deployment Location**: It says files are deployed to `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/` but doesn't explain:
   - What `instanceDir` is
   - Where it's configured
   - How it differs from the source location

3. **No HA Guidance**: The documentation doesn't address:
   - Whether the default file should be shared or instance-specific
   - How to handle the file when mounted read-only
   - How to customize for multiple Zowe instances

**Investigation Results:**

The user is correct - there IS confusion:
- The **source file** is typically in: `components/app-server/share/vt-ng2/config/storageDefaults/sessions/_defaultTN3270.json`
- The **deployed copy** (after first run) is in: `<instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`
- The `instanceDir` is configured in `zowe.yaml` as `components.app-server.instanceDir`

For HA/multi-instance:
- The **source file** in `share/` can be shared (read-only is fine)
- The **deployed copies** in each instance's `instanceDir` should be unique per instance
- Users should customize the deployed copy, not the source

**Assessment:**
This is a **documentation clarity and accuracy issue**. The documentation:
1. Has the wrong path for the source file
2. Doesn't explain the deployment process clearly
3. Doesn't address multi-instance/HA scenarios
4. Doesn't clarify the difference between source vs. deployed files

**Recommendation:**

1. **Correct the source path** in `mvd-configuration.md`:
   - Change from: `/config/storageDefaults/sessions/`
   - Change to: `components/app-server/share/vt-ng2/config/storageDefaults/sessions/`

2. **Clarify the deployment process:**
   ```markdown
   When the app-server runs for the first time, it copies the default configuration
   from `components/app-server/share/vt-ng2/config/storageDefaults/sessions/_defaultTN3270.json`
   to the configuration dataservice at `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`.
   
   The `instanceDir` is the directory configured in `zowe.yaml` under `components.app-server.instanceDir`.
   ```

3. **Add HA/multi-instance guidance:**
   ```markdown
   **For multi-instance or HA configurations:**
   
   - The source file in `components/app-server/share/` can be shared across instances (read-only mounting is supported)
   - Each Zowe instance deploys its own copy to its own `instanceDir`
   - Customize the deployed copy in each instance's `instanceDir`, not the shared source file
   - If you want all instances to use the same default, customize the source file before first startup
   ```

4. **Clarify customization process:**
   - Explain the two methods mentioned (edit deployed file directly, or customize via UI and copy)
   - Recommend the best practice for each scenario

5. **Add example of instanceDir configuration:**
   ```yaml
   components:
     app-server:
       instanceDir: /path/to/your/instance/directory
   ```

**Impact:**
- **Severity:** MEDIUM-HIGH
- **User Impact:** Users can't find the files or don't know how to customize them
- **HA Impact:** Multi-instance configurations are unclear
- **Beginner Impact:** High - beginners will be confused by the wrong paths

**Technical Clarification:**

**Q: Where is the actual _defaultTN3270.json file located?**
A: In a standard Zowe installation, it's at: `components/app-server/share/vt-ng2/config/storageDefaults/sessions/_defaultTN3270.json`

**Q: What is instanceDir?**
A: It's the directory where the app-server stores instance-specific data. Configured in `zowe.yaml` as `components.app-server.instanceDir`. Default varies by installation method.

**Q: Can I share the source file between multiple Zowe instances?**
A: **YES** - The source file in `share/` can be shared and mounted read-only. Each instance will create its own copy in its `instanceDir`.

**Q: Should I customize the source file or the deployed copy?**
A: 
- If you want all new instances to have the same defaults: Customize the source file
- If you want to customize an existing instance: Edit the deployed copy in that instance's `instanceDir`

**Q: How do I find my instanceDir?**
A: Check your `zowe.yaml` for `components.app-server.instanceDir`, or check the running app-server process to see where it's writing files.

**Related Documentation:**
- `docs/user-guide/mvd-configuration.md` (primary - needs fix)
- `docs/user-guide/configure-zos-system.md` (zowe.yaml configuration reference)
- `docs/extend/extend-desktop/mvd-configdataservice.md` (configuration dataservice documentation)

