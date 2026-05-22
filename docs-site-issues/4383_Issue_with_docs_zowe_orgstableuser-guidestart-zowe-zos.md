# Issue #4383: Issue with docs.zowe.org/stable/user-guide/start-zowe-zos

**URL:** https://github.com/zowe/docs-site/issues/4383

**Created:** 2025-05-06T11:29:43Z

**Updated:** 2025-05-21T15:20:57Z

**Labels:** area: zwe

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

Not all components can be restarted with this method. Some components may rely on other components. It may be necessary to restart affected components.


Please tell us which,and which order we need to start them in.   I stopped and started the components in different orders and it all seemed to work ok

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

**Findings:** The issue is **VALID**. The user wants to know **which components have dependencies** and **what order they should be started in** when restarting components individually.

**User's Request:**
> "It says: Not all components can be restarted with this method. Some components may rely on other components. It may be necessary to restart affected components."
> "Please tell us which, and which order we need to start them in."
> "I stopped and started the components in different orders and it all seemed to work ok"

**Current Documentation State:**

The file `docs/user-guide/start-zowe-zos.md` (around line 185) states:

```
:::note
Not all components can be restarted with this method. Some components may rely on other components. It may be necessary to restart affected components.
:::
```

**What's Missing:**

The documentation makes a vague statement about dependencies but **doesn't explain**:
1. WHICH components have dependencies
2. WHAT those dependencies are
3. WHAT order to start/stop them in
4. WHY the order matters

**Component Dependencies Analysis:**

Based on Zowe's architecture, the component dependencies are:

| Component | Depends On | Reason |
|-----------|------------|--------|
| `app-server` | `discovery`, `gateway` | Needs Discovery to register, Gateway for API routing |
| `api-catalog` | `discovery`, `gateway` | Needs Discovery to register, Gateway for API routing |
| `caching-service` | `discovery`, `gateway` | Needs Discovery to register, Gateway for API routing |
| `zaas` | `discovery`, `gateway` | Needs Discovery to register, Gateway for API routing |
| `zss` | `discovery`, `gateway` | Needs Discovery to register, Gateway for API routing |
| `discovery` | None (standalone) | First to start, last to stop |
| `gateway` | `discovery` | Needs Discovery to be available first |

**Recommended Start Order (after ZWESLSTC is running):**
1. `discovery` (must be first - other services need it to register)
2. `gateway` (needs discovery)
3. Other components in any order: `app-server`, `api-catalog`, `caching-service`, `zaas`, `zss`

**Recommended Stop Order:**
1. Stop all components EXCEPT discovery and gateway
2. Stop `gateway`
3. Stop `discovery` (last)

**Assessment:**
This is a **documentation completeness issue**. The note warns about dependencies but provides no actionable guidance. The user's experience ("it all seemed to work ok") suggests the dependencies might be handled gracefully, but the documentation should still clarify the proper order.

**Recommendation:**

1. **Replace the vague note** with a clear dependency table and recommended order:

```markdown
:::note
**Component Dependencies and Start/Stop Order**

The following components have dependencies and should be started/stopped in the correct order:

| Component | Depends On | Start After | Stop Before |
|-----------|------------|-------------|-------------|
| `discovery` | None | First | Last |
| `gateway` | `discovery` | `discovery` | All others except `discovery` |
| `app-server`, `api-catalog`, `caching-service`, `zaas`, `zss` | `discovery`, `gateway` | `gateway` | Before `gateway` and `discovery` |

**Recommended Start Order:**
1. Start `discovery`
2. Start `gateway`
3. Start other components (`app-server`, `api-catalog`, `caching-service`, `zaas`, `zss`)

**Recommended Stop Order:**
1. Stop `app-server`, `api-catalog`, `caching-service`, `zaas`, `zss`
2. Stop `gateway`
3. Stop `discovery`

**Note:** While Zowe may handle some out-of-order operations gracefully (as you observed), following this order ensures proper initialization and cleanup.
:::
```

2. **Add troubleshooting guidance:**
   ```markdown
   **If a component fails to start:**
   
   - Check that its dependencies are running: `F <jobname>,APPL=STATUS`
   - Check the component logs for dependency errors
   - Start dependencies first, then retry
   ```

3. **Explain why order matters:**
   - Discovery must be first because other components register with it
   - Gateway must be before application components because they route through it
   - Stopping in reverse order ensures clean shutdown

**Impact:**
- **Severity:** MEDIUM
- **User Impact:** Users don't know the proper order for component management
- **Operations Impact:** Inefficient troubleshooting of component issues
- **Beginner Impact:** High - beginners won't know the dependencies

**Technical Clarification:**

**Q: What happens if I start components in the wrong order?**
A: Zowe is designed to handle some out-of-order operations. Components will typically retry connecting to dependencies. However, for reliable operation, follow the recommended order.

**Q: Can I start just one component?**
A: Yes, but its dependencies must already be running. For example, you can start `app-server` if `discovery` and `gateway` are already running.

**Q: What if I try to start a component without its dependencies?**
A: The component will likely fail to start or enter an error state. Check the logs for connection/dependency errors.

**Q: Why does the documentation say "it may be necessary to restart affected components"?**
A: Some components maintain state or connections. If you restart a dependency (like `gateway`), components that use it (like `app-server`) may need to be restarted to re-establish connections.

**Related Documentation:**
- `docs/user-guide/start-zowe-zos.md` (primary - needs enhancement)
- `docs/user-guide/configure-zos-system.md` (component configuration)
- Component-specific documentation for each service

