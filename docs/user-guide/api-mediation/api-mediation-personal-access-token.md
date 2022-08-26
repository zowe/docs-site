# Personal Access Token

You can use the API ML to generate, validate and invalidate a **Personal Access Token (PAT)** that can enable access to tools such as VCS without using the credentials of a specific person and storing the mainframe credentials as part of the automation configuration on the server during the development of an application on the z/OS system.
The PAT functionality also makes it possible to limit access when using a token to specific services and users, through a mechanism of token revocation.

Gateway APIs are available to both users as well as security administrators.
APIs for users can accomplish the following functions:

[User APIs](#user-apis)
   * [Generate a token](#generate-a-token)
   * [Validate a token](#validate-a-token)
   * [Invalidate a specific token](#invalidate-a-specific-token)
   * [Invalidate all tokens](#invalidate-all-tokens)

APIs for security administrators are protected by SAF resource checking and  can accomplish the following functions:

[Security Administrator APIs](#security-administrator-apis)
   * [Invalidate all tokens for a user](#invalidate-all-tokens-for-a-user)
   * [Invalidate all tokens for a service](#invalidate-all-tokens-for-a-service)
   * [Evict non-relevant tokens and rules](#evict-non-relevant-tokens-and-rules)

## User APIs

### Generate a token

A user can create the Personal Access Token by calling the following REST API endpoint through the Gateway:

`POST /auth/access-token/generate`  

The full path of the `/auth/access-token/generate` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/generate`.

The request requires the body in the following format:

```json
{
    "validity": 90,
    "scopes": ["<serviceId_1>,<serviceId_2>"]
}
```

* **validity**  
refers to the expiration time of the token. The maximum threshold is 90 days.  

* **scopes**  
 limits the access on a service level. This parameter introduces a higher level of security in some aspects. Users are required to provide a scope. If no service is specified, it is not possible to authenticate using the token.

When creation is successful, the response to the request is a body containing the PAT with a status code of `200`. When creation fails, the user receives a status code of `401`. 

### Validate a token

The user can validate the Personal Access Token by calling the following REST API endpoint through the Gateway:

`POST /auth/access-token/validate`  

The full path of the `/auth/access-token/validate` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/validate`.

The request requires the body in the following format:

```json
{
    "token": "<token>",
    "serviceId": "<serviceId>"
}
```

**Note:** The user has the option of calling this API to validate the token, however, validation is also automatically performed by the API ML.

When validation is successful, the response to the request is an empty body with a status code of `200`. When validation fails, the user receives a status code of `401`.

### Invalidate a specific token

The user can invalidate the Personal Access Token by calling the following REST API endpoint through the Gateway:

`DELETE /auth/access-token/revoke`  

The full path of the `/auth/access-token/revoke` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke`.

The request requires the body in the following format:

```json
{
  "token": "<token_value>"
}
```

When the `/auth/access-token/revoke` endpoint is called, the provided hash of the PAT is stored in the cache by the Caching Service under the `invalidTokens` key. As such, the token is invalidated.
Access to these entries is protected by the API ML client certificate.

When invalidation is successful, the response to the request is an empty body with a status code of `200`. When invalidation fails, the user receives a status code of `401`.

### Invalidate all tokens

The user can invalidate all Personal Access Tokens by calling the following REST API endpoint through the Gateway:

`DELETE /auth/access-token/revoke/tokens`  

The full path of the `/auth/access-token/revoke/tokens` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens`.

The body can be optionally provide a timestamp as part of the request. Use the following format for the body:

```json
{
   "timestamp": "<timestamp>"
}
```

If the body is not provided, the timestamp value defaults to the current date.

When the `/auth/access-token/revoke/tokens` endpoint is called, the provided user rule is stored in the cache by the Caching Service under the `invalidUsers` key. As such, all of the tokens of the user are invalidated.
Access to these entries is protected by the client certificate of the API ML.

When invalidation is successful, the response to the request is an empty body with a status code of `200`. When invalidation fails, the user receives a status code of `401`.

## Security Administrator APIs

### Invalidate all tokens for a user

If a security breech is suspected, the security administrator can invalidate all the tokens based on criteria as established by **rules**.
Such criteria define the level of access control and can restrict access in advance. Rule based access restriction can be applied by either user ID or service scopes.

**Note:** _Rules_ are entries used to revoke the tokens either by users or by services. Such rule entries for services appear in the following format:

{
   "serviceId": "<serviceId>",
   "timestamp": "<timestamp>"
}

Rule entries for users appear in the following format:

{
   "userId": "<userId>",
   "timestamp": "<timestamp>"
}

The Security Administrator that has specific access to SAF resources can invalidate all tokens bound to a specific user by calling the following REST API endpoint through the Gateway:

`DELETE /auth/access-token/revoke/tokens/users`  

The full path of the `/auth/access-token/revoke/tokens/users` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens/users`.

The request requires the body in the following format:

```json
{
   "userId": "<userId>",
   "timestamp": "<timestamp>"
}
```
* **userId**  
refers the user the revocation is applied to.

* **timestamp**  
represents the date of revocation (the default value is the current time), in milliseconds. The timestamp is
used to specify that tokens created before the date specified in the timestamp are invalidated. As such, any subsequent tokens created
after that date are not affected by the user rule.

By calling this endpoint, the user rule is stored in the cache by the Caching Service under the `invalidUsers` key.

When invalidation is successful, the response to the request is an empty body with a status code of `200`. When invalidation fails, the user receives a status code of `401`.

### Invalidate all tokens for a service

A security administrator that has specific access to SAF resources can invalidate all tokens bound to a specific service by calling the following REST API endpoint through the Gateway:

`DELETE /auth/access-token/revoke/tokens/scope`  

The full path of the `/auth/access-token/revoke/tokens/scope` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/revoke/tokens/scope`.

The request requires the body in the following format:

```json
{
   "serviceId": "<serviceId>",
   "timestamp": "<timestamp>"
}
```

Invalidation of all tokens is possible by using rules based on service scopes.

* **serviceId**  
represents the service the revocation should be applied to (e.g. APPL IDs). 

* **timestamp**  
represents the date of revocation (the default value is the current time), in milliseconds. A timestamp is
used to state that tokens created before the date specified in the timestamp are invalidated. As such, any subsequent tokens created
after that date are not affected by the service rule.

Calling this endpoint stores the service rule in the cache by the Caching Service under the `invalidScopes` key.

When invalidation is successful, the response to the request is an empty body with a status code of `200`. When invalidation fails, the user receives a status code of `401`.

### Evict non-relevant tokens and rules

The Security Administrator with specific access to SAF resources can evict  non-relevant invalidated tokens and rules from the cache by calling the following REST API endpoint through the Gateway:

`DELETE /auth/access-token/evict`  

The full path of the `/auth/access-token/evict` endpoint appears as `https://{gatewayUrl}:{gatewayPort}/gateway/api/v1/auth/access-token/evict`.

The `/auth/access-token/evict` endpoint evicts all invalidated tokens which were expired and all the rules related to the expired tokens.

The main purpose of the eviction API is to ensure that the size of the cache does not grow unbounded. The token verification process requires processing of all rules, including those which may no longer be applicable. As such, verification processing may result in needless associated costs if there are stored rules which are no longer relevant. 

When eviction is successful, the response to the request is an empty body with a status code of `204`. When eviction fails due to lack of permissions, the administrator receives a status code of `403`.
