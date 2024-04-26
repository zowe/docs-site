# Customizing Java Heap sizes

:::info Role: system programmer
::: 

As a systems programmer, you can customize the Java heap memory size available for the API Mediation Layer components.

By default, all services (Gateway, Discovery, API Catalog, Caching Service) have a Java heap size of 32 MB as initial size and maxes up at 512 MB.

To change the default settings, set `components.<component>.heap.init` and `components.<component>.heap.max` where `<component>` is one of `gateway`, `discovery`, `caching-service`, `api-catalog` to the new desired values.

**Example with Gateway Service**

```yaml
components:
  gateway:
    heap:
      init: 1024
      max: 1024
```

The unit is megabytes and it cannot be changed. The new values are 1 GB.

## Recommendation

It is recommended to have a fixed heap size in production environment.


