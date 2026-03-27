
# Log Signal Examples and Attribute Mapping

The following scenarios represent common log signals emitted by API ML. Each example includes the specific attributes present in the signal body and the resulting JSON payload.

## A Service registered successfully to Eureka (API ML - Discovery Service)

This signal is emitted when an onboarded service instance successfully registers its metadata with the Discovery Service registry.

* **http.request.method**  
The HTTP verb (`POST`).
* **service.id**  
The logical ID of the Discovery service.
* **service.instance.id**  
The specific host and port of the Discovery instance.
* **service.response_code**  
The status returned by the registry (`204`).
* **url.path**  
The Eureka registration endpoint.
* **url.scheme**  
The communication protocol (`https`).

```json
{
  "http.request.method": "POST",
  "service.id": "discovery",
  "service.instance.id": "localhost:discovery:10011",
  "service.response_code": "204",
  "url.path": "/eureka/apps/DISCOVERABLECLIENT",
  "url.scheme": "https"
}
```

## A Service sent a successful heartbeat

This signal indicates that an active service instance has successfully renewed its lease with the Discovery Service to maintain its availability status.

* **http.request.method**  
The HTTP verb (`PUT`).

* **service.id**  
The logical ID of the target service.

* **service.instance.id**  
The specific instance sending the heartbeat.

* **service.response_code**  
The status of the heartbeat renewal (`200`).

* **url.path**  
The specific Eureka instance lease renewal path.

* **url.scheme**  
The communication protocol (`https`).

```json
{
  "http.request.method": "PUT",
  "service.id": "discovery",
  "service.instance.id": "localhost:discovery:10011",
  "service.response_code": "200",
  "url.path": "/eureka/apps/DISCOVERABLECLIENT/localhost:discoverableclient:10012",
  "url.scheme": "https"
}
```

## A successful login attempt

This signal captures a successful authentication event initiated by a user through the API ML Gateway login endpoint.

* **http.request.method**  
The HTTP verb (`POST`).

* **service.id**  
The logical ID for the Gateway.

* **service.instance.id**  
The Gateway instance handling the authentication.

* **service.response_code**  
The status of the login request (`204`).

* **url.path**  
The authentication login endpoint.

* **url.scheme**  
The communication protocol (`https`).
```json
{
  "http.request.method": "POST",
  "service.id": "gateway",
  "service.instance.id": "localhost:gateway:10010",
  "service.response_code": "204",
  "url.path": "/gateway/api/v1/auth/login",
  "url.scheme": "https"
}
```

## A successful request to API ML (authenticated but not populating information)

This signal represents a successful, authenticated request to the API Catalog service, typically used for retrieving container or service metadata. While the status indicates a successful transaction, this signal is frequently used to troubleshoot scenarios where the request is valid but the resulting response contains an empty data set.

* **http.request.method**  
The HTTP verb (`GET`).

* **service.id**  
The logical ID of the API Catalog.

* **service.instance.id**  
The instance providing catalog data.

* **service.response_code**  
The success status (`200`).

* **url.path**  
The endpoint for retrieving containers.

* **url.scheme**  
The communication protocol (`https`).
```json
{
  "http.request.method": "GET",
  "service.id": "apicatalog",
  "service.instance.id": "localhost:apicatalog:10010",
  "service.response_code": "200",
  "url.path": "/apicatalog/api/v1/containers",
  "url.scheme": "https"
}
```

## Invalid authentication 
<!--TODO-->
This signal captures the technical context of a request utilizing x509 certificate-based authentication during the routing process.

* **auth.service.auth.method**  
The security provider method (`x509`).

* **http.request.method**  
The HTTP verb (`GET`).

* **service.id**  
The logical ID of the target client service.

* **service.instance.id**  
The instance identifier.

* **service.response_code**  
The status code returned (`200`).

* **url.path**  
The request path for the client API.

* **url.scheme**  
The communication protocol (`https`).

```json
{
  "auth.service.auth.method": "x509",
  "http.request.method": "GET",
  "service.id": "discoverableclient",
  "service.instance.id": "localhost:discoverableclient:10012",
  "service.response_code": "200",
  "url.path": "/discoverableclient/api/v1/request",
  "url.scheme": "https"
}
```

## Valid authentication when routing to an onboarded service (JWT)

This signal describes a request successfully authenticated via a Zowe JWT that has been routed to a downstream onboarded service.

* **auth.method**  
The general authentication type (`JWT`).

* **auth.service.auth.method**  
The specific Zowe provider (`zoweJwt`).

* **auth.status**  
The final result of authentication (`OK`).

* **http.request.method**  
The HTTP verb (`GET`).

* **service.id**  
The logical ID of the Zowe JWT service.

* **service.instance.id**  
The unique service instance identifier.

* **service.response_code**  
The successful status code (`200`).

* **url.path**  
The routed request endpoint.

* **url.scheme**  
The communication protocol (`https`).

* **user.id**  
The identifier of the authenticated user.

```json
{
  "auth.method": "JWT",
  "auth.service.auth.method": "zoweJwt",
  "auth.status": "OK",
  "http.request.method": "GET",
  "service.id": "zowejwt",
  "service.instance.id": "static-localhost:zowejwt:10012",
  "service.response_code": "200",
  "url.path": "/zowejwt/api/v1/request",
  "url.scheme": "https",
  "user.id": "USER"
}
```
