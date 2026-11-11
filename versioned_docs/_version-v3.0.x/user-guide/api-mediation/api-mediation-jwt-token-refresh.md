# JWT token refresh endpoint

The API Gateway allows for the generation of a new token for a user based on a valid JWT token, made possible through the `auth/refresh` REST endpoint. The full path of the `auth/refresh` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/refresh`. The new token overwrites the old cookie with a `Set-Cookie` header. As part of the process, the old token is invalidated and is no longer usable.

The refresh request requires the token in one of the following formats:

- A cookie named `apimlAuthenticationToken`.
- Bearer authentication

:::note Notes:
- The endpoint is disabled by default. For more information, see [Enabling a JWT token refresh endpoint](configuration-jwt.md#enabling-a-jwt-token-refresh-endpoint).
- The endpoint is protected by a client certificate.
  For more information, see the OpenAPI documentation of the API Mediation Layer in the API Catalog.
:::