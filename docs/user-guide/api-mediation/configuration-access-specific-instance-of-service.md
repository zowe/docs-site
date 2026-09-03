# Retrieving a specific service within your environment 

:::info Roles: system programmer, system administrator
:::

When working with multiple instances of a service behind the API Gateway, you can identify which specific instance handles a request or direct a client request to a particular instance. Review this article for details about how to use the `X-InstanceId` HTTP header to interact with specific service instances to enable the following functions:  

* **Output a routed instance header**  
Configure the Gateway to output the `X-InstanceId` HTTP header in responses for visibility.
* **Target a specific instance with X-InstanceId**  
Provide the `X-InstanceId` HTTP header in client requests to bypass default load balancing for direct instance targeting.

## Output a routed instance header

The API Gateway can output a special header that contains the value of the instance ID of the API service that the request has been routed to. The routed instance header is useful for understanding which service instance is being called.

The header name is `X-InstanceId`, and the sample value is `discoverable-client:discoverableclient:10012`. The header value is identical to the `instanceId` property in the registration of the Discovery service.

Use the following procedure to output a special header that contains the value of the instance ID of the API service.

1. Open the file `zowe.yaml`.
2. Find or add the property with value `components.gateway.apiml.routing.instanceIdHeader:true`.
3. Restart Zowe.

## Target a specific instance with X-InstanceId

In addition to returning the `X-InstanceId` in responses, the API Gateway also accepts `X-InstanceId` as an incoming request header. When a client knows the exact Eureka instance ID of a service, they can use this header to bypass default load balancing (such as round-robin) and route a request directly to that specific instance. 

:::note
To use direct instance targeting, the target service must have the Authentication load balancing schema enabled (`customMetadata.apiml.lb.type: authentication`). As long as this schema is applied and the instance is registered in Eureka, no additional Gateway configuration is required.
:::

### Request format

To target a specific instance, include the `X-InstanceId` header in your HTTP request using the exact Eureka instance ID format:

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
3. Call the Gateway with the header `X-InstanceId: <instance1>` and confirm the request is routed to instance 1 only.
4. Call the Gateway with the header `X-InstanceId: <instance2>` and confirm the request is routed to instance 2 only.
5. Call the Gateway with a non-existent `X-InstanceId` value and confirm the Gateway returns a `404` error response with the exact message: `"Service instance not found for the provided instance ID"`.