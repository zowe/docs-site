# Using JWT token with API Mediation Layer

:::info**Required roles:** system administrator, security administrator
:::

Every REST request is required to provide valid authentication. As REST API services do not have mechanism of a long-term web session, it is necessary to have a way to establish an authenticated session outside of individual REST API services.

In Zowe and in many other applications, this is achieved using JWT tokens that can be obtained by a specialized service, which can then be used to provide authentication information. This service is described in more details at [Zowe Authentication and Authorization Service](https://github.com/zowe/api-layer/wiki/Zowe-Authentication-and-Authorization-Service).

This section focuses on the way how services in the Zowe API ecosystem are expected to accept and use these tokens so the API clients have unified experience.

### Token-based Login Flow and Request/Response Format

The following sequence describes how authentication through JWT tokens works:

1. The API client obtains JWT token by using POST method on `/auth/login` endpoint of API service that requires valid user ID and password.

2. The API service calls an *authentication provider* that returns a JWT token that contains the user ID claim in the HTTP cookie named `apimlAuthenticationToken` with attributes `HttpOnly` and `Secure`.

3. The API client remembers the JWT token or cookie and sends it with every request as the cookie with name `apimlAuthenticationToken`.

#### Obtaining the token

- The full URL is the base URL of the API service plus `/auth/login`. If the application has the base URL with `/api/v1` then the full URL can be: `https://hostname:port/api/v1/auth/login`.

- The credentials are provide in JSON request:

    ```json
    {
        "username": "...",
        "password": "..."
    }
    ```

- Successful login returns `204` and empty body with the token in the `apimlAuthenticationToken` cookie.

- Failed authentication returns `401` without `WWW-Authenticate`

**Example**:

```bash
curl -v -c - -X POST "https://localhost:10080/api/v1/auth/login" -d "{ \"username\": \"zowe\", \"password\": \"zowe\"}"
```

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

#### Authenticated request

One option is for the API client to pass the JWT token as a Cookie header with the name `apimlAuthenticationToken`:

```http
GET /api/v1/greeting HTTP/1.1
Cookie: apimlAuthenticationToken=eyJhbGciOiJSUzI1NiJ9...

HTTP/1.1 200
...
```

The second option is to pass the JWT token in the `Authorization: Bearer` header:

```http
GET /api/v1/greeting HTTP/1.1
Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...

HTTP/1.1 200
...
```
:::tip
The first option (cookies) is preferred for web browsers with attributes `Secure` and `HttpOnly`.
Browsers store and send cookies automatically.
Cookies are present on all requests, including those coming from DOM elements.
They are compatible with web mechanisms such as CORS, SSE, or WebSockets.

Cookies are more diffcult to support in non-web applications.
Headers, such as `Authorization: Bearer`, are easier to be used in non-web applications.
But such headers are difficult to use and secure in a web browser.
The web application needs to store these headers and attach them to all requests where headers are required.

Note that the API service needs to support both of them <!-- What is "both of them" --> so the API clients can use what makes more sense for them.
:::

### Token format

The JWT must contain unencrypted claims `sub`, `iat`, `exp`, `iss`, and `jti` in the meaning defined by <https://tools.ietf.org/html/rfc7519#section-4.1>. Specifically, the `sub` is the z/OS user ID and `iss` is the name of the service that issued the JWT token.

The JWT must use RS256 signature algorithm and the secret used to sign the JWT is an asymmetric key generated during installation.

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

### Validating tokens

API client does not need to validate the tokens, the API services must do it themselves. If the API client receives the token from another source and needs to validate such JWT token or needs to check details in it (like user ID, expiration) then it can use `/auth/query` endpoint
that is provided by the service.

The response is a JSON response with fields `creation`, `expiration`, `userId` that correspond to `iss`, `exp`, and `sub` JWT token claims. The timestamps are in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.

```bash
curl -k --cookie "apimlAuthenticationToken=eyJhbGciOiJSUzI1NiJ9..." -X GET "https://localhost:10080/api/v1/auth/query"
```

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

### The support for token-based authentication in the Zowe REST API SDK

The Zowe REST API SDK does not support it yet but it is planned add this support exactly how it is described. The JWT tokens will be issued by configurable provider.

The JWT token provider can be:

1. Simple standalone provider that validates the credentials via `SafPlatformUser`
2. Zowe APIML provider that uses the Zowe Authentication and Authorization Service to obtain and validate JWT tokens

## HTTP basic authentication with PassTicket support

In order to support MFA without supporting JWT in the service, the service can accept PassTickets and the API client is
responsible for obtaining valid PassTicket (for example by using Zowe APIML that will be able to generate PassTickets
if the API client provides a valid JWT token).

The authentication scheme is same as in the HTTP Basic authentication scheme. The PassTicket is used instead of the password.