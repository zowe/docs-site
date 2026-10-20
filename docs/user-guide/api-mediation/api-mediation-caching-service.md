# Using the Caching Service

As an API developer, you can use the Caching Service as a storage solution to enable resource sharing between service instances, thereby ensuring High Availability of services. The Caching Service makes it possible to store, retrieve, and delete data associated with keys. The Caching Service is designed to make resource sharing possible for services that cannot be made stateless by using following backends:

- Using Infinispan that is part of Caching Service
- Using Redis running off-platform
- \{Deprecated\} Using VSAM
- \{Development Use Only\} Using InMemory

:::note
In the current implementation of the Caching Service, Infinispan is recommended for the storage of key/value pairs for production, as it has the best performance characteristics without additional services.
:::

The Caching Service is available only for internal Zowe applications, and is not exposed to the internet. The Caching service supports a hot-reload scenario in which a client service requests all available service data. 

- [Using the Caching Service](#using-the-caching-service)
  - [Architecture](#architecture)
  - [Storage methods](#storage-methods)
    - [Infinispan (recommended)](#infinispan-recommended)
    - [VSAM (deprecated)](#vsam-deprecated)
    - [Redis](#redis)
    - [InMemory](#inmemory)
  - [How to start the Service](#how-to-start-the-service)
  - [Methods to use the Caching Service API](#methods-to-use-the-caching-service-api)
  - [Configuration properties](#configuration-properties)
  - [Authentication](#authentication)
    - [Direct calls](#direct-calls)
    - [Routed calls through API Gateway](#routed-calls-through-api-gateway)

## Architecture

A precondition to provide for High Availability of all components within Zowe is the requirement that these components be either stateless, or for the resources of the service, to be offloaded to a location accessible by all instances of the service. This condition also applies to recently started instances. Some services, however, are not and cannot be stateless. The Caching Service is designed for these types of services.

REST APIs make it possible to create, delete, and update key-value pairs in the cache. Other APIs read a specific key-value pair or all key-value pairs in the cache.

Information from cached APIs is stored as a JSON in the following format:

```yml
{
  “key”: “keyValue”, 
  “value”: “valueValue”
}
```

## Storage methods

The Caching Service supports the following storage solutions, which provide the option to add custom implementation.  

For information about configuring your storage method for the Caching Service for high availability, see [Configuring the Caching Service for high availability](../../user-guide/configure-caching-service-ha.md).

### Infinispan (recommended)

Infinispan is a storage solution that can also run on the z/OS platform. It can store data structures in key-value pairs, has high-availability support, and is highly performant.

For more information about the Infinispan storage access method, see [Using Infinispan as a storage solution through the Caching service](../../extend/extend-apiml/api-mediation-infinispan.md).

### VSAM (deprecated)

VSAM can be used to organize records into four types of data sets: key-sequenced, entry-sequenced, linear, or relative record. Use VSAM as the storage solution for production. VSAM is used primarily for applications and is not used for source programs, JCL, or executable modules. ISPF cannot be used to display or edit VSAM files.

For more information about the VSAM storage access method, see [Using VSAM as a storage solution through the Caching Service](../../extend/extend-apiml/api-mediation-vsam.md)

### Redis

Redis is a common storage solution that runs outside of the z/OS platform. It can store data structures in key-value pairs, has high-availability support, and is highly performant.

For more information about the Redis storage access method, see [Using Redis as a storage solution through the Caching Service](../../extend/extend-apiml/api-mediation-redis.md).

### InMemory

The InMemory storage method is a method suitable for testing and integration verification. Be sure not to use InMemory storage in production.
The key/value pairs are stored only in the memory of a single instance of the service. As such, the key/value pairs do not persist.

## How to start the Service

By default, the Caching Service starts along with the other Zowe components. To prevent the Caching Service from starting, set
`components.caching-service.enabled` to `false` in `zowe.yaml`.

## Methods to use the Caching Service API

To apply a method to the Caching Service, use the following API path:

`/cachingservice/api/v1/cache/${path-params-as-needed}`

Use the following methods with the Caching Service API:

- **`POST /cache`**  
Creates a new key in the Cache

- **`GET /cache`**  
Returns all key/value pairs for specific service

- **`PUT /cache/{key}`**  
Updates the existing value for the given key

- **`GET /cache/{key}`**  
Returns the existing value for the given key

- **`DELETE /cache/{key}`**  
Deletes a key/value pair

## Configuration properties

The Caching Service uses the standard `application.yml` structure for configuration. The service is built on top of the Spring enabler. As such, it dynamically registers to the API Mediation Layer. The service appears in the API Catalog under the tile, "Zowe Applications".

* **`caching.storage.size`**  
This property limits the size of the Caching Service. In the VSAM and InMemory implementations, this property represents the number of records stored before the eviction strategy is initiated. The default value is `100`.  
**Note:** Different implementations may implement this property differently.

* **`caching.storage.evictionStrategy`**  
This parameter specifies service behavior when the limit of records is reached. The default value is `Reject`.

  where:
  
  * **reject**  
  rejects the new item with the HTTP status code `507` when the service reaches the configured maximum number

  * **removeOldest**  
  removes the oldest item in the cache when the service reaches the configured maximum number

:::note
- For more information about how to configure the Caching Service in the `application.yml`, see
 [Add API Onboarding Configuration](../../extend/extend-apiml/onboard-spring-boot-enabler.md).
- When using VSAM, ensure that you set the additional configuration parameters. For more information about setting these parameters, see [Using VSAM as a storage solution through the Caching Service](../../extend/extend-apiml/api-mediation-vsam.md).
:::

## Authentication

### Direct calls

The Caching Service requires TLS mutual authentication. This verifies authenticity of the client. Calls without a valid client certificate generate a `403` response code: `Forbidden`. This requirement is disabled when `VERIFY_CERTIFICATES=false` in `zowe-certificates.env` configuration file.

The call must have a header `X-Certificate-DistinguishedName` containing information about the certificate's distinguished name. This header is added by the API Gateway. For a direct call, this header needs to be added manually. Calls without this header produce a `401` response code: `Unauthorized`.

### Routed calls through API Gateway

Caching service registers with the following authentication scheme to Discovery service:

```yaml
apiml.service.authentication.scheme: x509
apiml.service.authentication.headers: X-Certificate-Public,X-Certificate-DistinguishedName,X-Certificate-CommonName
```

The result is that the Gateway attempts mutual authentication with the Client.  If authentication is succesful, the Client's certificate information is propogated to `X-Certificate-` headers. With this scheme, the Gateway uses its server/client certificate for the routed call to the Caching Service.
