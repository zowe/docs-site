# Personal Access Token

The API ML allows generating, validating and invalidating a **Personal Access Token (PAT)** that can be used, for instance, to leverage modern tools such as Version Control Systems (VCS) during
the development of some application on the z/OS system.

To do that, the API ML offers a set of REST APIs to:

1. [Generate the token](#generate-of-the-token)
2. [Validate the token](#validate-the-token)
3. [Invalidate a specific token](#invalidate-a-specific-token)
4. [Invalidate all the tokens for a user](#invalidate-all-the-tokens-for-a-user)
5. [Invalidate all the tokens for a service](#invalidate-all-the-tokens-for-a-service)
6. [Retrieve all the tokens and rules](#retrieve-all-the-tokens-and-rules)
7. [Evict the non-relevant tokens and rules](#evict-the-non-relevant-tokens-and-rules)

The **User** is able to :
* Validate the token
* Invalidate a specific token
* Invalidate all tokens

The **Security Administrator** is able to:
* Invalidate the token for a user
* Invalidate all the tokens for a user
* Invalidate all tokens
* Evict invalidated tokens and rules which are not relevant anymore

## Generate of the token

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

The **validity** refers to the expiration time of the tokens. The maximum threshold is 90 days.
The **scopes** allows to limit the access on a service level, so it will introduce higher level of security in some aspects. Users will be forced to provide a scope and if no service is specified, it will work for none.

When creation is successful, the response to the request is a body containing the PAT. When creation fails, the user receives a 401 status code.

## Validate the token

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

When validation is successful, the response to the request is a an empty body. When validation fails, the user receives a 401 status code.

## Invalidate a specific token

The user can invalidate the Personal Access Token by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke`
The full path of the `/auth/access-token/revoke` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke`.

The request requires the body in the following format:

```json
{
  "token": "<token_value>"
}
```

When the `/auth/access-token/revoke` endpoint is called, the provided PAT's hash will be stored in the Caching Service will be storing only hashes of already invalidated tokens. Access to these entries is protected by API ML’s client certificate.

When invalidation is successful, the response to the request is an empty body.

## Invalidate all the tokens for a user

In case of possibility of breach, the Security Administrator can invalidate all the tokens based on some criteria.
Such criteria define the level of access control and can restrict the access in advance. This can be done by using
**rules**, and the access restriction can be applied by either user ID or service scopes.

The administrator can invalidate all the tokens bound to a specific user by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke/tokens/users`
The full path of the `/auth/access-token/revoke/tokens/users` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens/users`.

The request requires the body in the following format:

```json
{
   "userId": "<userId>",
   "timestamp": "<timestamp>"
}
```

The `userId` is the user the revocation should be applied to, while the timestamp represents the current date of revocation, in milliseconds. 

When invalidation is successful, the response to the request is an empty body.

## Invalidate all the tokens for a service

As we mentioned in the above section, it is possible to revoke tokens also by using rules based on service scopes.
The administrator can invalidate all the tokens bound to a specific service by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/revoke/tokens/scope`
The full path of the `/auth/access-token/revoke/tokens/scope` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens/scope`.

The request requires the body in the following format:

```json
{
   "serviceId": "<serviceId>",
   "timestamp": "<timestamp>"
}
```

The `serviceId` represents the service the revocation should be applied to (e.g. APPL IDs), while the timestamp represents the current date of revocation, in milliseconds.

When invalidation is successful, the response to the request is an empty body.

## Retrieve all the tokens and rules

The user can retrieve all the invalidated tokens and rules which were stored in the cache by calling the following REST API endpoint via Gateway:

`GET /cache-list`
The full path of the `/cache-list` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/cache-list`.

When retrieval is successful, the response to the request is a body containing all the key/value entries presents in the cache.

## Evict the non-relevant tokens and rules

The Security Administrator can evict the non-relevant invalidated tokens and rules from the cache by calling the following REST API endpoint via Gateway:

`DELETE /auth/access-token/evict`
The full path of the `/auth/access-token/evict` endpoint appear as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/evict`.

The `/auth/access-token/evict` endpoint evicts the all the invalidated tokens which were expired and all the rules related to the expired tokens.

The main purpose of the eviction API is to make sure that the size of the cache does not grow unbounded.

When eviction is successful, the response to the request is an empty body. When eviction fails due to lack of permissions, the administrator receives a 403 status code.
