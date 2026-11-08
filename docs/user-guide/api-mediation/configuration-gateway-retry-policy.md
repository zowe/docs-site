# Gateway retry policy

The API Gateway uses a fixed retry policy. It retries `GET` requests that end with status `503` up to 5 times. 

The Ribbon-based retry controls from v2 (`ribbon.MaxAutoRetries`, `ribbon.MaxAutoRetriesNextServer`, `ribbon.OkToRetryOnAllOperations`, `apiml.okToRetryOnAllOperations`) are not supported. Setting them has no effect.

Timeouts are configured separately with `apiml.connectTimeout` and `apiml.responseTimeout`. For more information, see [Customizing metadata](../../extend/extend-apiml/custom-metadata.md).

:::note
The v2 parameter `apiml.okToRetryOnAllOperations` is no longer supported, so a service cannot change which operations are retried.
:::