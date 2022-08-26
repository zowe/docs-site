# Personal Access Token

The API ML allows generating, validating and invalidating a **Personal Access Token (PAT)** that could help - during the development of some application on the z/OS system - to access the tools such as VCS without using the credentials of the specific person and storing the credentials in the automation.
The PAT functionality also allows to limit the access using the token to specific services and users, through a mechanism of token revocation.

To do that, the API ML offers a set of REST APIs to:

1. [User APIs](#user-apis)
   * [Generate the token](#generate-the-token)
   * [Validate the token](#validate-the-token)
   * [Invalidate a specific token](#invalidate-a-specific-token)
   * [Invalidate all his tokens](#invalidate-all-his-tokens)
2. [Security Administrator APIs](#security-administrator-apis)
   * [Invalidate all the tokens for a user](#invalidate-all-the-tokens-for-a-user)
   * [Invalidate all the tokens for a service](#invalidate-all-the-tokens-for-a-service)
   * [Evict the non-relevant tokens and rules](#evict-the-non-relevant-tokens-and-rules)

As you can see from the list above, some of these APIs are only meant for the administrator, and are protected by the SAF resource checking.

## User APIs

### Generate the token

The user can create the Personal Access Token by calling the following REST API endpoint via Gateway:

`POST /auth/access-token/generate`
The full path of the `/auth/access-token/generate` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/generate`.

The request requires the body in the following format:

```json
{
    "validity": 90,
    "scopes": ["<serviceId_1>,<serviceId_2>"]
}
```

The **validity** refers to the expiration time of the token. The maximum threshold is 90 days.
The **scopes** allows to limit the access on a service level, so it will introduce higher level of security in some aspects. Users will be forced to provide a scope and if no service is specified, it will work for none.

When creation is successful, the response to the request is a body containing the PAT. When creation fails, the user receives a 401 status code.

### Validate the token

The user can validate the Personal Access Token by calling the following REST API endpoint via Gateway:

`POST /auth/access-token/validate`
The full path of the `/auth/access-token/validate` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/validate`.

The request requires the body in the following format:

```json
{
    "tokens": "<token>",
    "serviceId": "<serviceId>"
}
```

However, this is usually not needed as the API ML does the validation when it receives the token in the request.

When validation is successful, the response to the request is an empty body with a 200 status code. When validation fails, the user receives a 401 status code.

### Invalidate a specific token

The user can invalidate the Personal Access Token by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke`
The full path of the `/auth/access-token/revoke` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke`.

The request requires the body in the following format:

```json
{
  "token": "<token_value>"
}
```

When the `/auth/access-token/revoke` endpoint is called, the provided PAT's hash will be stored in the cache by the Caching Service under the `invalidTokens` key and this will mean that the token has been invalidated.
Access to these entries is protected by API ML’s client certificate.

When invalidation is successful, the response to the request is an empty body with a 200 status code. When invalidation fails, the user receives a 401 status code.

### Invalidate all his tokens

The user can invalidate all his Personal Access Tokens by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke/tokens`
The full path of the `/auth/access-token/revoke/tokens` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens`.

The request requires the body in the following format:

```json
{
  "token": "<token_value>"
}
```

When the `/auth/access-token/revoke/tokens` endpoint is called, the provided PAT's hash will be stored in the cache by the Caching Service under the `invalidTokens` key and this will mean that the token has been invalidated.
Access to these entries is protected by API ML’s client certificate.

When invalidation is successful, the response to the request is an empty body with a 200 status code. When invalidation fails, the user receives a 401 status code.

## Security Administrator APIs

### Invalidate all the tokens for a user

When there is a suspicion on breach, the Security Administrator can invalidate all the tokens based on some criteria.
Such criteria define the level of access control and can restrict the access in advance. This can be done by using
**rules**, and the access restriction can be applied by either user ID or service scopes.

The Security Administrator that has specific SAF resources access can invalidate all the tokens bound to a specific user by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke/tokens/users`
The full path of the `/auth/access-token/revoke/tokens/users` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens/users`.

The request requires the body in the following format:

```json
{
   "userId": "<userId>",
   "timestamp": "<timestamp>"
}
```

The `userId` refers the user the revocation should be applied to, while the timestamp represents the date of revocation (the default value is the current time), in milliseconds, and it is
used to state that the tokens created before the date specified in the timestamp are invalidated. Therefore, any other tokens created
after that date will not be affected by the user rule.

By calling this endpoint, the user rule will be stored in the cache by the Caching Service under the `invalidUsers` key.

When invalidation is successful, the response to the request is an empty body with a 200 status code. When invalidation fails, the user receives a 401 status code.

### Invalidate all the tokens for a service

The Security Administrator that has specific SAF resources access can invalidate all the tokens bound to a specific service by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke/tokens/scope`
The full path of the `/auth/access-token/revoke/tokens/scope` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens/scope`.

The request requires the body in the following format:

```json
{
   "serviceId": "<serviceId>",
   "timestamp": "<timestamp>"
}
```

This is possible by using rules based on service scopes.

The `serviceId` represents the service the revocation should be applied to (e.g. APPL IDs), while the timestamp represents the date of revocation (the default value is the current time), in milliseconds, and it is
used to state that the tokens created before the date specified in the timestamp are invalidated. Therefore, any other tokens created
after that date will not be affected by the service rule.

By calling this endpoint, the service rule will be stored in the cache by the Caching Service under the `invalidScopes` key.

When invalidation is successful, the response to the request is an empty body with a 200 status code. When invalidation fails, the user receives a 401 status code.

### Evict the non-relevant tokens and rules

The Security Administrator that has specific SAF resources access can evict the non-relevant invalidated tokens and rules from the cache by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/evict`
The full path of the `/auth/access-token/evict` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/evict`.

The `/auth/access-token/evict` endpoint evicts all the invalidated tokens which were expired and all the rules related to the expired tokens.

The main purpose of the eviction API is to make sure that the size of the cache does not grow unbounded, not for a matter of the actual size on disk,
but rather due to the fact that for the tokens' verification it is necessary to consult all the rules, making this 
action expensive if there are stored rules which are not relevant anymore.

When eviction is successful, the response to the request is an empty body. When eviction fails due to lack of permissions, the administrator receives a 403 status code.
