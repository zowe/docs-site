# Components of URL

This page provides definitions and a diagram to make sure everyone is using the same terms. These terms are often overloaded. This page tries to follow the terms used in Swagger documentation.

## Definitions

REST APIs have a _baseUrl_ to which the endpoint paths are appended. The base URL is defined by _scheme_, _host_, _port_ and _basePath_

where:

- **`baseUrl`** is an absolute URL prefix that is different for each instance of the service, or when the service is accessed via the API Gateway.

  The endpoint paths are relative paths that follow the documentation of the REST API.

- **`scheme`** is the transfer protocols used by the API. APIML supports the `http`, `https`, and WebSocket schemes - `ws` and `wss`.

- **`host`** is the domain name or IP address (IPv4) of the host that serves the API. It may include the port number if it is different from the scheme's default port (80 for HTTP and 443 for HTTPS). Note that this must be the host only, without a scheme or sub-paths.

- **`basePath`** is the URL prefix for all API paths, relative to the host root. It must start with a leading slash `/`. If basePath is not specified then all endpoint paths start at the host root.

When a service is accessed without the API Gateway then the format the `basePath` depends on the service. It can be empty or have several parts (e.g. `/fileMasterPlus/api/v1`).

When a service is accessed via the API Gateway then the format of the URL is standardized in one of the following formats:

- Using `serviceId`, service type (`t`) and major version (`v`)
- Using `serviceId` and service type (`t`)

where:

- **`serviceId`** is a unique name of the service that is set during the installation of the service.

- **`t`** is the type of the service. It can be `api`, `ui`, or `ws`

- **`v`** is the major version the REST API.

  **Example:** `v1`, `v2`. It is optional since some existing services can have versioning in the endpoint path.

The fundamental principle is that by changing the base URL you can access different services with the same API because the structure after the base URL is the same.

The base URL is the parameter the can be set in Zowe CLI in order to access the service. The endpoint path is prepared by the Zowe CLI plug-in but the base URL needs to be provided by the user based on installation of the REST API service.

## Examples

### URL to a service endpoint without API gateway

```markup
http://ca11.ca.com:19876/fileMasterPlus/api/v1/mvs/dataSets/test/ping
\_____/\_______________/\____________________/\_____________________/
scheme       host             basePath             endpointPath
\____________________________________________/
                 baseUrl
```

### URL with empty basePath

```markup
https://ca32.ca.com:1443/zosmf/info
\_____/\_______________/\_________/
scheme       host        endpointPath
\______________________/
        baseUrl
```

### URL to a service endpoint via API gateway

```markup
https://ca3x.ca.com:10310/cafilemasterplus/api/v1/mvs/dataSets/test/ping
\______/\_______________/\______________________/\_____________________/
scheme       host             basePath                  endpointPath
                          \______________/\__/\/
                            serviceId      t  v

\_______________________________________________/
                 baseUrl

```

### URL to a service endpoint via API gateway without version

```markup
https://ca3x.ca.com:10310/zosmfca32/api/zosmf/info
\_____/\________________/\____________/\_________/
scheme        host          basePath    endpointPath
                          \________/\_/
                           serviceId t

\______________________/
        baseUrl
```

### Resources

- <https://swagger.io/docs/specification/2-0/api-host-and-base-path/>
