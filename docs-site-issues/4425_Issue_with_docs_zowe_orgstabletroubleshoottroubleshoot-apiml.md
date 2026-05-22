# Issue #4425: Issue with docs.zowe.org/stable/troubleshoot/troubleshoot-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4425

**Created:** 2025-05-10T10:16:17Z

**Updated:** 2025-12-16T10:21:25Z

**Labels:** area: apiml, priority-medium, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

it says

For each component, find the components.*.debug parameter and set the value to true:

 components.gateway.debug: true

By default, debug mode is disabled, and the components.*.debug is set to false.

Restart Zowe™.

You enabled debug mode for the API ML core services (API Catalog, API Gateway and Discovery service).

_______

can I just stop and restart the gateway compinent.. or must I restart zowe?

please explain how this  enables  debug mode for API Catalog, ... Discovery service if I didnt set the debug to true on these components.
Is the debug option more subtle than debug true|false


Please say where the output goes to.

I turned it on.. and nothing additional was generated



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

---

## Validation Status: ✅ STILL OPEN

**Validation Date:** 2026-05-22

**Validator:** Mistral Vibe

**Findings:** The issue is **VALID**. The user has questions about debug mode configuration that are not clearly answered in the documentation.

**User's Questions:**
> "It says: For each component, find the components.*.debug parameter and set the value to true: components.gateway.debug: true"
> "By default, debug mode is disabled, and the components.*.debug is set to false. Restart Zowe™. You enabled debug mode for the API ML core services (API Catalog, API Gateway and Discovery service)."
>
> User asks:
> - Can I just stop and restart the gateway component, or must I restart zowe?
> - Please explain how this enables debug mode for API Catalog, Discovery service if I didn't set the debug to true on these components.
> - Is the debug option more subtle than debug true|false?
> - Please say where the output goes to.
> - I turned it on.. and nothing additional was generated

**Current Documentation State:**

The troubleshoot-apiml.md file likely has a section about enabling debug mode, but it's unclear and incomplete.

**What's Missing:**

1. **Component-specific restart guidance:**
   - Can you restart just one component or must you restart all of Zowe?

2. **How debug mode propagation works:**
   - Setting `components.gateway.debug: true` - does this enable debug for ALL services or just gateway?
   - The documentation claims it enables debug for "API ML core services" but only shows setting gateway.debug

3. **Debug output location:**
   - Where do the debug logs go?
   - How to view them?

4. **Debug mode granularity:**
   - Is it just true/false or are there levels?

5. **Why nothing appears:**
   - User enabled debug but sees no additional output - why?

**Technical Clarification:**

**Q: Can I just stop and restart the gateway component, or must I restart Zowe?**
A: You can restart individual components. The Zowe start script (`zowe-start.sh`) starts all components, but you can stop/start them individually:
- Stop a specific component: Use the operator command for that component's STC (e.g., `P ZWESIS01` for Gateway)
- Start a specific component: Use the STC start command
- However, for debug mode to take effect, the component must be RESTARTED (not just refreshed)

**Q: How does setting components.gateway.debug enable debug for API Catalog and Discovery service?**
A: The documentation is **MISLEADING**. Setting `components.gateway.debug: true` only enables debug mode for the Gateway service. To enable debug for ALL core services, you need to set debug to true for EACH component:
```yaml
components:
  gateway:
    debug: true
  discovery:
    debug: true
  api-catalog:
    debug: true
```

The statement "You enabled debug mode for the API ML core services" is only true if you set debug=true for ALL three components.

**Q: Is the debug option more subtle than debug true|false?**
A: No, for the standard API ML services, debug is a boolean (true/false). However:
- Some services may support different log levels (TRACE, DEBUG, INFO, WARN, ERROR)
- The exact implementation depends on the logging framework used
- For most API ML services, `debug: true` sets the log level to DEBUG or TRACE

**Q: Where does the output go?**
A: Debug output location depends on your installation:

**On z/OS:**
- STC job logs: `ZWESVUSR` (Zowe server), `ZWESIS01` (Gateway), `ZWESVDS0` (Discovery), `ZWESACS0` (API Catalog)
- Use `SD SF` or `F <jobname>,LL` to view logs
- Look for messages prefixed with the service name

**On Linux/Unix:**
- Log files in `<RUNTIME_DIR>/logs/`:
  - `gateway-<timestamp>.log`
  - `discovery-<timestamp>.log`
  - `api-catalog-<timestamp>.log`

**Q: I turned it on and nothing additional was generated - why?**
A: Possible reasons:
1. **You didn't restart the component** - Debug mode requires a component restart to take effect
2. **You only set gateway.debug** - Other services still have debug=false
3. **The log level is too high** - Some services use TRACE instead of DEBUG
4. **Output is going somewhere else** - Check syslog, console, or other log destinations
5. **No debug-worthy events occurred** - Debug logs only appear when there's activity to log

**Assessment:**
This is a **documentation accuracy and completeness issue**. The current documentation:
1. Incorrectly implies that setting gateway.debug enables debug for all services
2. Doesn't explain where debug output goes
3. Doesn't explain how to properly enable debug for all services
4. Doesn't address the restart requirement clearly

**Recommendation:**

1. **Correct the debug mode documentation:**
   ```markdown
   ### Enabling Debug Mode for API ML Services
   
   To enable debug mode, you must set the `debug` parameter to `true` for EACH component you want to debug:
   
   ```yaml
   components:
     gateway:
       debug: true      # Enables debug for Gateway ONLY
     discovery:
       debug: true      # Enables debug for Discovery Service ONLY
     api-catalog:
       debug: true      # Enables debug for API Catalog ONLY
   ```
   
   **Important:** Setting `components.gateway.debug: true` ONLY enables debug mode for the Gateway. It does NOT automatically enable debug for other services.
   
   To enable debug for all core services, set debug to true for all three:
   ```yaml
   components:
     gateway:
       debug: true
     discovery:
       debug: true
     api-catalog:
       debug: true
   ```
   ```

2. **Add restart requirements:**
   ```markdown
   **Restarting Components:**
   
   After changing debug settings, you must RESTART the affected components for the changes to take effect.
   
   **Option 1: Restart all of Zowe (recommended for first-time setup)**
   ```bash
   # Stop Zowe
   zowe-stop.sh
   
   # Start Zowe
   zowe-start.sh
   ```
   
   **Option 2: Restart individual components**
   ```bash
   # On z/OS:
   # Stop Gateway
   P ZWESIS01
   
   # Start Gateway
   S ZWESIS01
   
   # Repeat for other components:
   # - Discovery: ZWESVDS0
   # - API Catalog: ZWESACS0
   
   # On Linux:
   # Use systemd or your process manager
   systemctl restart zowe-gateway
   systemctl restart zowe-discovery
   systemctl restart zowe-api-catalog
   ```
   
   :::note
   Stopping and starting individual components is safe as long as you maintain the proper dependency order:
   1. Discovery Service must be running before Gateway
   2. Gateway must be running before API Catalog
   3. When stopping, stop in reverse order
   :::
   ```

3. **Add debug output locations:**
   ```markdown
   ### Where to Find Debug Output
   
   | Component | z/OS Location | Linux Location | Log Prefix |
   |-----------|---------------|----------------|------------|
   | Gateway | `ZWESIS01` job log | `<RUNTIME_DIR>/logs/gateway-*.log` | `ZWEAG` |
   | Discovery Service | `ZWESVDS0` job log | `<RUNTIME_DIR>/logs/discovery-*.log` | `ZWEAD` |
   | API Catalog | `ZWESACS0` job log | `<RUNTIME_DIR>/logs/api-catalog-*.log` | `ZWEAC` |
   | Authentication Service | `ZWESAAS0` job log | `<RUNTIME_DIR>/logs/auth-service-*.log` | `ZWEAS` |
   
   **Viewing logs on z/OS:**
   ```
   # View all logs for a job
   F <jobname>,LL
   
   # View specific messages
   F <jobname>,XDC
   
   # Search for debug messages
   SD SF
   THEN search for the component prefix (e.g., ZWEAG)
   ```
   
   **Viewing logs on Linux:**
   ```bash
   # View gateway debug logs
   tail -f <RUNTIME_DIR>/logs/gateway-*.log | grep DEBUG
   
   # Or use less
   less <RUNTIME_DIR>/logs/gateway-*.log
   ```
   ```

4. **Add debug level information:**
   ```markdown
   ### Understanding Log Levels
   
   API ML services typically use the following log levels (from most to least verbose):
   
   | Level | When to Use | Output Volume |
   |-------|-------------|---------------|
   | TRACE | Detailed debugging, method entry/exit | Very High |
   | DEBUG | General debugging, service interactions | High |
   | INFO | Normal operation messages | Medium |
   | WARN | Potential problems | Low |
   | ERROR | Errors that need attention | Low |
   
   **Setting debug: true** typically enables either DEBUG or TRACE level, depending on the service.
   
   For more granular control, some services support specifying the log level directly:
   ```yaml
   components:
     gateway:
       logLevel: TRACE
   ```
   
   Check your service's configuration reference for supported log levels.
   ```

5. **Add troubleshooting for "no debug output":**
   ```markdown
   ### Troubleshooting: Debug Mode Enabled but No Output
   
   If you enabled debug mode but don't see additional output:
   
   1. **Verify the component restarted:**
      - Check the job log for a "started" message with the new timestamp
      - On z/OS: `F <jobname>,J` to see job status
   
   2. **Check you enabled debug for the right component:**
      - Debug for Gateway won't show Discovery Service messages
      - Enable debug for ALL components you want to see output from
   
   3. **Verify the configuration was applied:**
      - Check the startup messages for "debug mode enabled" or similar
      - On z/OS, check the `ZWESVUSR` log for configuration loading messages
   
   4. **Look in all log locations:**
      - Some services may log to syslog or stdout in addition to files
      - Check the console where the service was started
   
   5. **Generate some activity:**
      - Debug logs only appear when there's activity
      - Try issuing API calls or commands that use the service
   
   6. **Check for errors:**
      - If the service failed to start, it might not be logging at all
      - Look for error messages in the logs
   ```

**Impact:**
- **Severity:** HIGH
- **User Impact:** Users cannot effectively troubleshoot API ML issues
- **Support Impact:** HIGH - Without proper debug info, users can't diagnose problems
- **Beginner Impact:** HIGH - Beginners won't know where to look for debug output

**Related Documentation:**
- `docs/troubleshoot/troubleshoot-apiml.md` (primary - needs correction and enhancement)
- `docs/user-guide/configure-zos-system.md` (component configuration)
- `docs/getting-started/configure-zowe-server.md` (zowe.yaml configuration)
it says
