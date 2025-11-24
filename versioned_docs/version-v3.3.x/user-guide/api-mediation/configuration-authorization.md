# Configuring authorization for API ML

:::info Role: system administrator
:::

In Zowe's API Mediation Layer, system administrators can limit access to services and information in the API Catalog by hiding sensitive data like service instance URLs, configurable via the apiml.catalog.hide.serviceInfo property in zowe.yaml. Additionally, SAF resource checking for user authorization on specific endpoints is facilitated through various providers, such as Endpoint, Native, and Dummy. These configurations, modifiable in the zowe.yaml file, enhance security by controlling service exposure and ensuring proper authorization checks within the Zowe ecosystem.

- [Limiting access to information or services in the API Catalog](./configuration-limiting-access-to-info-or-services-in-api-catalog.md)
- [Configuring SAF resource checking](./configuration-saf-resource-checking.md)
- [Configurint Health Endpoint Protection](./configuration-health-endpoint-protection.md)