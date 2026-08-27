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
No additional Gateway configuration is required to use this request header. Direct instance targeting works out of the box as long as the target service instance is registered in Eureka.
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

### Sticky sessions pattern

While direct targeting is useful for debugging, operational testing, and stateful interactions managed by the client, you can also combine this input header with the Gateway's output header to achieve complete sticky session routing.

For full details on configuring and using the sticky session pattern, see the `headerRequest` load balancing schema in [Customizing Metadata (optional)](../../extend/extend-apiml/custom-metadata.md#sticky-sessions-using-x-instanceid).