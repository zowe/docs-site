# JWT token refresh endpoint

The API Gateway allows to generate a new token for the user based on valid JWT token. This is possible through the `auth/refresh` REST endpoint. The full path of the `auth/refresh` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/refresh`. The new token overwrites the old cookie with a `Set-Cookie` header. As part of the process, the old token gets invalidated and is not usable anymore.

The refresh request requires the token in one of the following formats:

- Cookie named `apimlAuthenticationToken`.
- Bearer authentication

**Notes:**

- The endpoint is disabled by default. For more information, see [Enable JWT token endpoint](api-gateway-configuration.md#enable-jwt-token-refresh-endpoint).
- The endpoint is protected by a client certificate.

  For more information, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.
