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

