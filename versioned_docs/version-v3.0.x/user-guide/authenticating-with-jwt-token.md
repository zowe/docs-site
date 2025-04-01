# Authenticating with a JWT token

:::info Required roles: system administrator, security administrator
:::

One user authentication method available in Zowe is via JWT tokens, whereby a token can be provided by a specialized service, which can then be used to provide authentication information.  

When a client authenticates with API Mediation Layer, the client receives the JWT token which can then be used for further authentication. If z/OSMF is configured as the authentication provider and the client already received a JWT token produced by z/OSMF, it is possible to reuse this token within API ML for authentication.

This article describes how services in the Zowe API ecosystem are expected to accept and use JWT tokens so that API clients have a stadardized experience. 

:::tip
For more information about authenticating with JWT tokens, see the Medium blog post [Single-Sign-On to z/OS REST APIs with Zowe](https://medium.com/zowe/single-sign-on-to-z-os-rest-apis-with-zowe-6e35fd022a95).
:::

By default, JWT tokens are produced by z/OSMF and the API Mediation Layer only serves as a proxy. For information about how to change who and how tokens are produced, see [Authentication Providers within Enable Single Sign On for Clients](./api-mediation/configuration-jwt.md#using-saf-as-an-authentication-provider).


## JWT Token-based Login Flow and Request/Response Format

The following sequence describes how authentication through JWT tokens works:

First, The API client obtains a JWT token by using the POST method on the `/auth/login` endpoint of the API service that requires a valid user ID and password.

Secondly, the API client stores the JWT token or cookie and sends the token with every request as a cookie with the name `apimlAuthenticationToken`.

## Obtaining a JWT token

To obtain a JWT token, call the endpoint with the credentials for either basic authentication or the client certificate.


- The full path for API ML is:```/gateway/auth/login```

- The full URL is the base URL of the API service plus `/auth/login`. If the application has the base URL with `/api/v1`, the full URL could have the format: `https://hostname:port/api/v1/auth/login`.

- Credentials are provided in the JSON request:

    ```json
    {
        "username": "...",
        "password": "..."
    }
    ```

- Successful login returns RC `204`, and an empty body with the token in the `apimlAuthenticationToken` cookie.

- Failed authentication returns RC `401` without `WWW-Authenticate`.

**Example:**

```bash
curl -v -c - -X POST "https://localhost:10080/api/v1/auth/login" -d "{ \"username\": \"zowe\", \"password\": \"zowe\"}"
```
The following output describes the status of the JWT token:

```http
POST /api/v1/auth/login HTTP/1.1
Accept: application/json, */*
Content-Length: 40
Content-Type: application/json

{
    "username": "zowe",
    "password": "zowe"
}

HTTP/1.1 204
Set-Cookie: apimlAuthenticationToken=eyJhbGciOiJSUzI1NiJ9...; Path=/; Secure; HttpOnly
```

## Making an authenticated request

You can send a JWT token with a request in two ways:

* Allow the API client to pass the JWT token as a cookie header.
* Pass the JWT token in the `Authorization: Bearer` header.

:::tip
The first option (using a cookie header) is recommended for web browsers with the attributes `Secure` and `HttpOnly`.
Browsers store and send cookies automatically.
Cookies are present on all requests, including those coming from DOM elements, and are compatible with web mechanisms such as CORS, SSE, or WebSockets.

Cookies are more diffcult to support in non-web applications.
Headers, such as `Authorization: Bearer`, can be used in non-web applications. Such headers, however, are difficult to use and secure in a web browser.
The web application needs to store these headers and attach these headers to all requests where headers are required.
:::

### Allow the API client to pass the JWT token as a cookie header

One option to send a JWT token with the request is for the API client to pass the JWT token as a cookie header with the name `apimlAuthenticationToken`:

**Example:**

```http
GET /api/v1/greeting HTTP/1.1
Cookie: apimlAuthenticationToken=eyJhbGciOiJSUzI1NiJ9...

HTTP/1.1 200
...
```

### Pass the JWT token in the `Authorization: Bearer` header

A second option to send a JWT with the request is to pass the JWT token in the `Authorization: Bearer` header.

**Example:**

```http
GET /api/v1/greeting HTTP/1.1
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...

HTTP/1.1 200
...
```

## Validating JWT tokens

The API client does not need to validate tokens. API services must perform token validation themselves. If the API client receives a token from another source and needs to validate the JWT token, or needs to check details in the token, such as user ID expiration, then the client can use the `/auth/query` endpoint provided by the service.

The JSON response contains the following fields:
* `creation`
* `expiration`
* `userId` 

These fields correspond to `iss`, `exp`, and `sub` JWT token claims. The timestamps are in ISO 8601 format.

Execute the following curl command to validate the existing JWT token, and to retrieve the contents of the token: 

```bash
curl -k --cookie "apimlAuthenticationToken={token to query}" -X GET "https://localhost:10080/api/v1/auth/query"
```

The following output describes the status of the JWT token:  

```http
GET /api/v1/auth/query HTTP/1.1
Connection: keep-alive
Cookie: apimlAuthenticationToken=eyJhbGciOiJSUzI1NiJ9...

HTTP/1.1 200
Content-Type: application/json;charset=UTF-8

{
    "userId": "zowe",
    "creation": "2019-11-29T13:39:18.000+0000",
    "expiration": "2019-11-30T13:39:18.000+0000"
}
```

## Refreshing the JWT token 

API Clients can refresh the existing token to prolong the validity period. 

Use the `auth/refresh` endpoint to prolong the validity period of the token.

The `auth/refresh` endpoint generates a new token for the user based on the valid JWT token. The full path of the `auth/refresh` endpoint appears as the following URL:

```
https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/refresh
```
The new token overwrites the old cookie with a Set-Cookie header. As part of the process, the old token becomes invalidated and is no longer usable.

:::note Notes:
- The endpoint is disabled by default. For more information, see [Enable JWT token endpoint](./api-mediation/configuration-jwt.md#enabling-a-jwt-token-refresh-endpoint).
- The endpoint is protected by a client certificate.
- The refresh request requires the token in one of the following formats:
  - Cookie named `apimlAuthenticationToken`.
  - Bearer authentication
:::

For more information, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.

The following request receives a valid JWT token and returns the new valid JWT token. As such, the expiration time is reset. 

```bash
curl -v -X POST "https://localhost:10080/api/v1/auth/refresh" -d '{"username":"zowe","password":"zowe"}'
```

The following output describes the status of the JWT token: 

```http
POST /api/v1/auth/refresh HTTP/1.1
Accept: application/json, */*
Content-Length: 40
Content-Type: application/json

{
    "username": "zowe",
    "password": "zowe"
}

HTTP/1.1 204
Set-Cookie: apimlAuthenticationToken=eyJhbGciOiJSUzI1NiJ9...; Path=/; Secure; HttpOnly
```

## Token format

The JWT must contain the unencrypted claims `sub`, `iat`, `exp`, `iss`, and `jti`. Specifically, the `sub` is the z/OS user ID, and `iss` is the name of the service that issued the JWT token.

:::note
For more information about JWT token formatting, see the paragraph 4.1 [Registered Claim Names](https://tools.ietf.org/html/rfc7519#section-4.1) in the Internet Engineering Task Force (IETF) memo that describes JSON Web Tokens.
:::

The JWT must use the RS256 signature algorithm. The secret used to sign the JWT is an asymmetric key generated during installation.

**Example**:

```json
{
  "sub": "zowe",
  "iat": 1575034758,
  "exp": 1575121158,
  "iss": "Zowe Sample API Service",
  "jti": "ac2eb63e-caa6-4ccf-a527-95cb61ad1646"
}
```


