# Redirect handling by the API Gateway

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
`http://internal-service:8080/new/endpoint`.

3. The API Gateway intercepts the 302 response.

4. The Gateway rewrites the URL in the Location header to the absolute path following routing rules so that the client can access the service through the API Gateway.  
**Example location:**  
`/myservice/api/v1/new/endpoint`.

5. The client receives the response with the rewritten Location header and can successfully follow the redirect.

This rewriting of the Location header is enabled by default and requires no additional configuration in the API Gateway.

### Redirect Examples
The following scenario illustrates how the Location header is rewritten.

**Scenario Setup:**

* **API Gateway public URL**: `https://zowe.external.host:7554`

    The example service is registered with the following details:

* **serviceId**: _myservice_

* **serviceUrl (internal base URL)**: `http://internal-host:8080/my-app`

The API Gateway exposes this service at the following public path: `https://zowe.external.host:7554/myservice/api/v1/`

**Example 1: Absolute URL Redirect**  

In this example, the service provides the _full, absolute internal URL_ in the Location header. The Gateway matches this URL to the registered service and rewrites the URL.

For a Service Response Header (HTTP) at the location `http://internal-host:8080/my-app/new/endpoint?user=1`, the Gateway's rewritten header would appear as: `/myservice/api/v1/new/endpoint?user=1`.

**Explanation:**  
The Gateway recognized that `http://internal-host:8080/my-app` corresponds to the serviceUrl for _myservice_ and replaces the URL with the correct absolute Gateway URL, keeping the path and query parameters.

**Example 2: Relative URL Redirect (Passed Through)**  

For a service that returns a _relative URL_, the API Gateway does not rewrite the URL. The browser or client is responsible for resolving this path relative to the originally requested URL.

For a Service Response Header (HTTP) at the location `another/endpoint`, the Gateway's Rewritten Header would remain as `another/endpoint`.

**Explanation:**  
The Gateway does not change relative URLs.
