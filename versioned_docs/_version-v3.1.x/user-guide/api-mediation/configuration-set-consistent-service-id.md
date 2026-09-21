# Setting a consistent service ID

:::info Role: API service extender
:::

As an API service extender you can modify the service ID to ensure compatibility of services that use a non-conformant organization prefix.

For more information, see the following parameter in the article Discovery Service configuration parameters:

* **components.discovery.apiml.discovery.serviceIdPrefixReplacer**  
    This parameter is used to modify the service ID of a service instance, before it registers to API ML. Using this parameter ensures compatibility of services that use a non-conformant organization prefix with.