# Issue #3859: Issue with docs.zowe.org/stable/appendix/zowe-yaml-configuration/

**URL:** https://github.com/zowe/docs-site/issues/3859

**Created:** 2024-09-06T15:26:09Z

**Updated:** 2025-03-14T14:09:00Z

**Labels:** area: apiml, priority-low, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

These items from `zowe.yaml` are not documented and are allowed under `components.gateway`:

```yaml
    server:
      internal:
      # gateway supports internal connector
        enabled: false
        port: 7550
        ssl:
          enabled: false
```

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The `components.gateway.server.internal` configuration is not documented.

**Current State:** 
- `docs/appendix/zowe-yaml-configuration.md` does NOT document the `components.gateway.server.internal` section
- The section contains: `enabled`, `port`, and `ssl.enabled` properties
- `docs/user-guide/upgrade-zos.md:166-167` and `docs/whats-new/zowe-v3-migration.md:228-229` both state that "The internal gateway server has been removed due to limited usage" in V3
- However, the issue reports these items are still allowed in `zowe.yaml` but not documented
- The `components.gateway` section in zowe-yaml-configuration.md documents many properties but not the `server.internal` subsection

**Recommendation:** 
- If `components.gateway.server.internal` is still valid in current versions, add documentation for it in `docs/appendix/zowe-yaml-configuration.md` under the `components.gateway` section
- If it has been removed, clarify in the documentation that it's no longer supported and remove any references
- Verify with development team whether this configuration is deprecated/removed or still valid

