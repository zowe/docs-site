# Customizing Java Heap sizes

:::info Role: system programmer
:::

The Zowe API Mediation Layer is a Java-based application. As such, one of the main performance considerations is the size of the Java memory heap, where all objects are stored.
The Java heap size has a direct impact on the available capacity of the applications. Aspects to consider when defining the size are, for example, how many concurrent requests the application should support, and the expected size of average requests.
As a systems programmer, you can customize the available Java memory heap size for API Mediation Layer components.

By default, all services (Gateway, Discovery, API Catalog, Caching Service) have a Java heap size of 32 MB as the initial size, and a maximum heap size of 512 MB.

To change the default settings, set `components.<component>.heap.init` and `components.<component>.heap.max` 

* `component`  
Specifies one of the following services:
  - `gateway`
  - `discovery`
  - `caching-service`
  - `api-catalog` 
  - `zaas`

**Example with Gateway Service:**

```yaml
components:
  gateway:
    heap:
      init: 1024
      max: 1024
```

The unit is megabytes and cannot be changed. The new values are 1 GB.

## Recommendation

It is recommended to have a fixed heap size in a production environment.
