# Handling redirect by the API Gateway

When a service routed through the API Gateway responds with a redirect status code (3xx) and a URL in the Location header, the API Gateway modifies the header to ensure that the client can properly access the new URL.

:::note  
No steps are required from the API service developer as the Location header is automatically handled by the API Gateway.  
:::

## How Location Header is handled by the API Gateway
The API Gateway is designed to proxy requests from a client to a backend service. A service may respond with a 3xx status code to redirect the client to a different URL. The URL that is provided in the Location header of the service response, however, is often an internal address that is not accessible to the client.

To solve this issue, the API Gateway intercepts the 3xx response from the service and applies the following logic to determine how to handle the Location header:

First, the Gateway attempts to match the base of the absolute URL in the Location header with the registered URL of the service that sent the response. If the absolute URL and regestered URL  match, the Gateway rewrites the header by replacing the internal service URL with the public-facing Gateway route for that service.

If the URL in the Location header does not match the current service's registered URL, the Gateway then attempts to find a service in the Gateway's registry that matches the host and port from the Location header. If another service is found, the Location header is rewritten to point to the correct public Gateway route for that second service.

If no registered service can be matched by either of these methods, the original Location header is returned to the client without modification.

Additionally, relative URLs (e.g., Location: new/resource) in the Location header are not changed and are passed through to the client as-is.

The following steps illustrate the redirect request workflow performed by the API Gateway:

1. A client makes a request to a service through the API Gateway.

2. The backend service responds with a 302 redirect to an internal URL.   
**Example location:**  
http://internal-service:8080/new/endpoint.

3. The API Gateway intercepts the 302 response.

4. The Gateway rewrites the URL in the Location header to the absolute path following routing rules so that the client can access the service through the API Gateway.  
**Example location:**  
`/myservice/api/v1/new/endpoint`.

5. The client receives the response with the rewritten Location header and can successfully follow the redirect.

This rewriting of the Location header is enabled by default and requires no additional configuration in the API Gateway.