# Configuring AT-TLS

The communication server on z/OS provides functionality to encrypt HTTP communication for on-platform jobs. This functionality is referred to as Application Transparent Transport Layer Security (AT-TLS).

## Configuration Parameters

To enable AT-TLS for Zowe components, configure the following parameters:
```yaml
zowe:
    network:
        server:
            attls: true
```

### High Availability Setup

In a high availability setup where one LPAR (e.g., lpar1) is using AT-TLS and the second (e.g., lpar2) is  not using AT-TLS, configure as follows:

```yaml
zowe:
    haInstances:
        lpar1:
            attls: true
        lpar2:
            attls: false
```

## Component-Specific Configuration

For detailed configuration instructions specific to each component, refer to the following guides:
- [Configuring AT-TLS for API Mediation Layer](../user-guide/api-mediation/configuration-at-tls.md)
- [Using AT-TLS in the App Framework](../user-guide/mvd-configuration#using-at-tls-in-the-app-framework)