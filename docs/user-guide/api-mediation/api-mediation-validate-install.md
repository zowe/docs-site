# Verifying API Mediation installation

Use your preferred REST API client to review the value of the status variable of the API Catalog service that is routed through the API Gateway using the following URL:

```
https://hostName:basePort/api/v1/caapicatalog/application/state
```
The `hostName` is set during install, and `basePort` is set as the `gatewayHttpsPort` parameter.

**Example:**

The following example illustrates how to use the **curl** utility to invoke API Mediation Layer endpoint and the **grep** utility to parse out the response status variable value

```
$ curl -v -k --silent https://hostName:basePort/api/v1/caapicatalog/application/state 2>&1 | grep -Po '(?<=\"status\"\:\")[^\"]+'
UP
```
The response `UP` confirms that API Mediation Layer was installed and is running properly.