#Gateway retry policy
<!-- Are users allowed to configure the retry policy in v3? If not, should this page be removed completely? -->
The API Gateway uses a fixed retry policy. It retries `GET` requests that end with status `503` up to 5 times. 

:::note
The v2 parameter `apiml.okToRetryOnAllOperations` is no longer supported, so a service cannot change which operations are retried.
:::