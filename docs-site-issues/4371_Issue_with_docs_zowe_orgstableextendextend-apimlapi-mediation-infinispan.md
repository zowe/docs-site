# Issue #4371: Issue with docs.zowe.org/stable/extend/extend-apiml/api-mediation-infinispan/

**URL:** https://github.com/zowe/docs-site/issues/4371

**Created:** 2025-05-05T15:20:58Z

**Updated:** 2025-12-16T10:21:24Z

**Labels:** area: apiml, priority-medium, review: sme, Size: S

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
The doc says

components.caching-service.storage.infinispan.persistence.dataLocation

The path where the service keeps its data files for the Infinispan Soft-Index Cache Store. The default value is data. To run the Caching Service in HA, ensure that you apply the following configuration conditions:

    The value should be the same for each instance.
    **The location should point to a non-shared filesystem. Each instance requires unique storage.**

but the example has 

haInstances:
  lpar1:
    components:
      caching-service:
        storage:
          mode: infinispan
          infinispan:
            jgroups.port: 7600
            initialHosts: lpar2[7600]
            persistence:
              **dataLocation: /global/zowe/workspace/caching-service/data
              indexLocation: /global/zowe/workspace/caching-service/index**


where the data locations are shared!

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

**Findings:** The issue is **VALID** and represents a **critical contradiction** in the documentation. The text says the location should point to a **non-shared** filesystem, but the example shows **shared** paths.

**User's Problem:**
> "The doc says: components.caching-service.storage.infinispan.persistence.dataLocation"
> "The path where the service keeps its data files for the Infinispan Soft-Index Cache Store. The default value is data. To run the Caching Service in HA, ensure that you apply the following configuration conditions:"
> "- The value should be the same for each instance."
> "- **The location should point to a non-shared filesystem. Each instance requires unique storage.**"
> 
> "but the example has:"
> ```yaml
> persistence:
>   dataLocation: /global/zowe/workspace/caching-service/data
>   indexLocation: /global/zowe/workspace/caching-service/index
> ```
> "where the data locations are shared!"

**Current Documentation State:**

The **versioned documentation** (v3.0.x) in `versioned_docs/version-v3.0.x/extend/extend-apiml/api-mediation-infinispan.md` contains:

**Text (lines 28-32):**
```
The path where the service keeps its data files for the Infinispan Soft-Index Cache Store. 
The default value is `data`. To run the Caching Service in HA, ensure that you apply the following configuration conditions:

   - The value should be the same for each instance.
   - The location should point to a non-shared filesystem. Each instance requires unique storage.
```

**Example (lines 76-103):**
```yaml
haInstances:
  lpar1:
    components:
      caching-service:
        storage:
          mode: infinispan
          infinispan:
            jgroups.port: 7600
            initialHosts: lpar2[7600]
            persistence:
              dataLocation: /global/zowe/workspace/caching-service/data
              indexLocation: /global/zowe/workspace/caching-service/index
  lpar2:
    components:
      caching-service:
        storage:
          mode: infinispan
          infinispan:
            jgroups.port: 7600
            initialHosts: lpar1[7600]
            persistence:
              dataLocation: /global/zowe/workspace/caching-service/data
              indexLocation: /global/zowe/workspace/caching-service/index
```

**The Contradiction:**

The text explicitly states: **"The location should point to a non-shared filesystem. Each instance requires unique storage."**

But the example shows BOTH `lpar1` and `lpar2` using the **SAME** paths:
- Both use: `/global/zowe/workspace/caching-service/data`
- Both use: `/global/zowe/workspace/caching-service/index`

This means **the example directly violates the stated requirement**.

**Assessment:**
This is a **CRITICAL documentation error**. The example is wrong and will cause problems for users trying to configure HA:
1. If both instances write to the same location, data corruption can occur
2. Infinispan Soft-Index File Store requires unique storage per instance
3. Users following the example will have a non-functional HA setup

**Recommendation:**

1. **Fix the example** in `api-mediation-infinispan.md` to show unique paths per instance:

```yaml
haInstances:
  lpar1:
    components:
      caching-service:
        storage:
          mode: infinispan
          infinispan:
            jgroups.port: 7600
            initialHosts: lpar2[7600]
            persistence:
              dataLocation: /global/zowe/workspace/caching-service/lpar1/data
              indexLocation: /global/zowe/workspace/caching-service/lpar1/index
  lpar2:
    components:
      caching-service:
        storage:
          mode: infinispan
          infinispan:
            jgroups.port: 7600
            initialHosts: lpar1[7600]
            persistence:
              dataLocation: /global/zowe/workspace/caching-service/lpar2/data
              indexLocation: /global/zowe/workspace/caching-service/lpar2/index
```

2. **Clarify the requirement** - the current text is confusing:
   - "The value should be the same for each instance" - This likely means the **path structure** or **naming pattern**, NOT the actual path
   - Rewrite to: "Use a consistent naming pattern, with each instance using a unique subdirectory"

3. **Add explanation** of WHY unique storage is required:
   > **Important:** Each Infinispan instance must have its own unique storage directory. The Soft-Index File Store does not support shared filesystems. If multiple instances write to the same location, data corruption and cache inconsistencies can occur.

4. **Check stable docs** - verify if this error exists in the latest (non-versioned) documentation

**Impact:**
- **Severity:** CRITICAL
- **User Impact:** Users following the example will have broken HA configurations
- **Data Integrity Impact:** Risk of data corruption
- **HA Functionality Impact:** HA will not work correctly with shared storage

**Technical Clarification:**

**Q: Can Infinispan Soft-Index File Store use shared storage?**
A: **NO** - According to the documentation and Infinispan's Soft-Index File Store design, each instance requires unique, non-shared storage.

**Q: What happens if I use shared storage?**
A: Data corruption, cache inconsistencies, and potential application errors. Multiple instances writing to the same files will conflict.

**Q: Can I use a shared filesystem for Infinispan?**
A: Only if using a different Infinispan cache store that supports shared storage (e.g., JDBC store). The Soft-Index File Store specifically does not support shared storage.

**Q: What about the "value should be the same" requirement?**
A: This likely means use the same **base path pattern** (e.g., `/global/zowe/workspace/caching-service/<instance>/data`), not the same literal path. Each instance should substitute its own identifier.

**Related Documentation:**
- `versioned_docs/version-v3.0.x/extend/extend-apiml/api-mediation-infinispan.md` (needs fix)
- `docs/extend/extend-apiml/api-mediation-infinispan.md` (check if same error exists)
- [Infinispan Soft-Index File Store documentation](https://infinispan.org/blog/2014/10/31/soft-index-file-store)

