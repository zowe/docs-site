# Customizing Gateway timeouts

:::info Role: system programmer
:::

Use the following procedure to change the global timeout value for an API Mediation Layer instance.

1. Open the file `zowe.yaml`.
2. Configure the following properties:

  * **components.gateway.apiml.connectTimeout**  
  Specifies the value in milliseconds which corresponds to the period in which API ML should establish a single, non-managed connection with the service. If omitted, the default value specified in the API ML Gateway service configuration is used.
  * **components.gateway.apiml.connection.idleConnectionTimeoutSeconds**

  * **components.gateway.apiml.connection.timeToLive**

**Example:**

```yaml
components:
    gateway:
       apiml:
           connectTimeout: 30000
           connection:
              idleConnectionTimeoutSeconds:
              timeToLive: 
```

3. Restart Zowe.

You completed customization of Gateway timeouts.