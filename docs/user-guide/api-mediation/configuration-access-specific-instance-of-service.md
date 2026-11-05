# Retrieving a specific service within your environment 

:::info Roles: system programmer, system administrator
:::

Clients can route requests directly to a specific instance by sending the `X-InstanceId` header with the target's `instanceId`. When the request includes it, the Gateway echoes that value in the `X-InstanceId` response header.
 
- To target a specific instance with `X-InstanceId`, send `X-InstanceId` in the request to bypass the default load balancing.
- The response echoes the request value to confirm the targeted instance.
- No header reports the load-balanced instance for requests that omit `X-InstanceId`.

## Output a routed instance header
<!-- Please suggest relevant changes for this section -->
The API Gateway can output a special header that contains the value of the instance ID of the API service that the request has been routed to. The routed instance header is useful for understanding which service instance is being called.

The header name is `X-InstanceId`, and the sample value is `discoverable-client:discoverableclient:10012`. `X-InstanceId` is only present when the client sends `X-InstanceId` in the request, and it echoes that value. The header value is identical to the `instanceId` property in the registration of the Discovery service.

## Target a specific instance with X-InstanceId

The Gateway accepts `X-InstanceId` as an incoming request header. When a client knows the exact instance ID of a service, they can use this header to bypass default load balancing (such as round-robin) and route a request directly to that specific instance. Load balancing type is set with `customMetadata.apiml.lb.type`. For more information, see [Customizing metadata](../../extend/extend-apiml/custom-metadata.md).

### Request format

To target a specific instance, include the `X-InstanceId` header in your HTTP request using the exact instance ID format:

* **Header name:** `X-InstanceId`
* **Value format:** `<hostname>:<serviceId>:<port>`

**Examples:**

**Direct GET request with `X-InstanceId`:**

```http
GET /discoverable-client/api/v1/endpoint HTTP/1.1
X-InstanceId: myhost:discoverable-client:10012
```

**cURL equivalent:**
```
curl -H "X-InstanceId: myhost:discoverable-client:10012" \
     https://gateway-host:port/discoverable-client/api/v1/endpoint
```

**Error behavior:**  
If the requested instance is not found or is unregistered, the Gateway rejects the request and returns a 404 error response:
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Service instance not found for the provided instance ID"
}
```

## Verify direct instance targeting

Use the following procedure to validate that direct instance targeting is functioning correctly in your environment:

1. Start API ML with a discoverable client registered with at least two instances.
2. Call the Gateway without the `X-InstanceId` header and confirm that requests are distributed across both instances in a round-robin fashion.

   **Note**
    The response has no `X-InstanceId` header and distribution must be confirmed from the service's own logs/response body, not from the Gateway header.

3. Call the Gateway with the header `X-InstanceId: <instance1>` and confirm the request is routed to instance 1 only.
4. Call the Gateway with the header `X-InstanceId: <instance2>` and confirm the request is routed to instance 2 only.
5. Call the Gateway with a non-existent `X-InstanceId` value and confirm the Gateway returns a `404` error response with the exact message: `"Service instance not found for the provided instance ID"`.