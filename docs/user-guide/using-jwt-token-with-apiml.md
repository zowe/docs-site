# Using JWT token with API Mediation Layer

:::info**Required roles:** system administrator, security administrator
:::

## Authentication with JWT Token

In Zowe, authentication can be performed via JWT tokens, whereby a token can be provided by a specialized service, which can then be used to provide authentication information. This service is described in more details at [Zowe Authentication and Authorization Service](https://github.com/zowe/api-layer/wiki/Zowe-Authentication-and-Authorization-Service). When a client authenticates with the API ML, the client receives the JWT token in exchange. This token can be used for further authentication. If z/OSMF is configured as the authentication provider and the client already received a JWT token produced by z/OSMF, it is possible to reuse this token within API ML for authentication.

This parent article describes how services in the Zowe API ecosystem are expected to accept and use JWT tokens so that API clients have a stadardized experience. 

The JWT tokens are by default produced by z/OSMF and the API Mediation Layer serves only as proxy. If you want to change who and how produces the tokens, read [Authentication Providers within Enable Single Sign On for Clients](../user-guide/api-mediation/configuration-jwt/#saf-as-an-authentication-provider)

TODO: https://docs.zowe.org/stable/extend/extend-apiml/authentication-for-apiml-services/#authentication-providers should move to the https://docs.zowe.org/stable/user-guide/api-mediation/configuration-jwt 

### Token-based Login Flow and Request/Response Format

The following sequence describes how authentication through JWT tokens works:

1. The API client obtains a JWT token by using the POST method on the `/auth/login` endpoint of the API service that requires a valid user ID and password.

2. The API service then calls an *authentication provider* that returns a JWT token that contains the user ID claim in the HTTP cookie named `apimlAuthenticationToken` with attributes `HttpOnly` and `Secure`.

3. The API client stores the JWT token or cookie and sends the token with every request as a cookie with the name `apimlAuthenticationToken`.

#### Obtaining the token

<!-- We should outline how to obtain a token in a sequence of numbered steps. -->

- The full URL is the base URL of the API service plus `/auth/login`. If the application has the base URL with `/api/v1`, the full URL could have the format: `https://hostname:port/api/v1/auth/login`.

- The credentials are provide in the JSON request:

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

One option <!-- One option to do what? --> is for the API client to pass the JWT token as a cookie header with the name `apimlAuthenticationToken`:

**Example:**

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
The first option (using a cookie header) is recommended for web browsers with the attributes `Secure` and `HttpOnly`.
Browsers store and send cookies automatically.
Cookies are present on all requests, including those coming from DOM elements, and are compatible with web mechanisms such as CORS, SSE, or WebSockets.

Cookies are more diffcult to support in non-web applications.
Headers, such as `Authorization: Bearer`, can be used in non-web applications. Such headers, however, are difficult to use and secure in a web browser.
The web application needs to store these headers and attach these headers to all requests where headers are required.

Note that the API service needs to support both of them <!-- What is "both of them" --> so the API clients can use what makes more sense for them.
:::


### Validating tokens

The API client does not need to validate tokens. API services must perform token validation themselves. If the API client receives a token from another source and needs to validate the JWT token, or needs to check details in the token, such as user ID expiration, then the client can use the `/auth/query` endpoint provided by the service.

The response is a JSON response with the following fields:
* `creation`
* `expiration`
* `userId` 

These fields correspond to `iss`, `exp`, and `sub` JWT token claims. The timestamps are in ISO 8601 format.

**Example:**

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

<!-- It seems that the following section is a work in progress and is not ready for the published documentation -->

### Refreshing the token 

The API Clients may want to refresh the existing token to prolong the validity time. `auth/refresh` endpoint can provide this functionality. 

The auth/refresh endpoint generates a new token for the user based on valid jwt token. The full path of the auth/refresh endpoint appears as https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/refresh. The new token overwrites the old cookie with a Set-Cookie header. As part of the process, the old token gets invalidated and is not usable anymore.

Notes:

- The endpoint is disabled by default. For more information, see Enable JWT token endpoint.
- The endpoint is protected by a client certificate.
- The refresh request requires the token in one of the following formats:
  - Cookie named apimlAuthenticationToken.
  - Bearer authentication

For more information, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.

```bash
curl -v -c - -X POST "https://localhost:10080/api/v1/auth/refresh" 
```

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

### Token format

The JWT must contain the unencrypted claims `sub`, `iat`, `exp`, `iss`, and `jti`. Specifically, the `sub` is the z/OS user ID, and `iss` is the name of the service that issued the JWT token.

:::note
For more information, see the paragraph 4.1 [Registered Claim Names](https://tools.ietf.org/html/rfc7519#section-4.1) in the Internet Engineering Task Force (IETF) memo that describes JSON Web Tokens.
:::

The JWT must use RS256 signature algorithm. The secret used to sign the JWT is an asymmetric key generated during installation.

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
### The support for token-based authentication in the Zowe REST API SDK

The Zowe REST API SDK does not support it yet but it is planned add this support exactly how it is described. The JWT tokens will be issued by configurable provider.

The JWT token provider can be:

* A  simple, standalone provider that validates the credentials via `SafPlatformUser`
* The Zowe API ML provider that uses the Zowe Authentication and Authorization Service to obtain and validate JWT tokens.

<!-- We should specify when to use each of these provider options -->

## HTTP basic authentication with PassTicket support

In order to support MFA without supporting JWT in the service, the service can accept PassTickets and the API client is
responsible for obtaining valid PassTicket (for example by using Zowe APIML that will be able to generate PassTickets
if the API client provides a valid JWT token).

The authentication scheme is same as in the HTTP Basic authentication scheme. The PassTicket is used instead of the password.

