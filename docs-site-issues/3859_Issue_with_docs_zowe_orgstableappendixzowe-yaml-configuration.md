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

