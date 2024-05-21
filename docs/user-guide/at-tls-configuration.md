# Configuring AT-TLS

The communication server on z/OS provides functionality to encrypt HTTP communication for on-platform jobs. This functionality is referred to as Application Transparent Transport Layer Security (AT-TLS).

:::info Required roles: security administrator
:::

## Configuration Parameters

To enable AT-TLS for Zowe components, configure the following parameters:
```yaml
zowe:
    network:
        server:
            tls:
                attls: true
```

## Component-Specific Configuration

For detailed configuration instructions specific to each component, refer to the following guides:
- [Configuring AT-TLS for API Mediation Layer](../user-guide/api-mediation/configuration-at-tls.md)
- [Using AT-TLS in the App Framework](../user-guide/mvd-configuration#using-at-tls-in-the-app-framework)