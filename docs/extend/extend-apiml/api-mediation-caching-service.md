# Using the Caching Service

As an API developer, you can use the Caching Service as a storage solution to enable resource sharing between service instances, thereby ensuring High Availability of services. The Caching Service makes it possible to store, retrieve, and delete data associated with keys. The Caching Service is designed to make resource sharing possible for services that cannot be made stateless in two ways:

- Using VSAM to store key/value pairs for production

- Using InMemory

**Note:** In the current implementation of the Caching service, VSAM is required for the storage of key/value pairs for production, as VSAM is a native z/OS solution for storing key/value pairs.

The Caching service is available only for internal Zowe applications, and is not exposed to the internet. The Caching service supports a hot-reload scenario in which a client service requests all available service data. 

- [Architecture](#architecture)
- [Storage methods](#storage-methods)
  - [VSAM](#vsam)
  - [Redis](#redis)
  - [InMemory](#inmemory)
- [How to start the service](#how-to-start-the-service)
- [Methods to use the Caching service API](#methods-to-use-the-caching-service-api)
- [Configuration properties](#configuration-properties)
- [Authentication](#authentication)
## Architecture

A precondition to provide for High Availability of all components within Zowe is the requirement for these components to be either stateless, or for the resources of the service to be offloaded to a location accessible by all instances of the service. This condition also applies to recently started instances. Some services, however, are not, and cannot be stateless. The Caching Service is designed for these types of services.

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
### VSAM

VSAM can be used to organize records into four types of data sets: key-sequenced, entry-sequenced, linear, or relative record. Use VSAM as the storage solution for production. VSAM is used primarily for applications and is not used for source programs, JCL, or executable modules. ISPF cannot be used to display or edit VSAM files.

For more information about the VSAM storage access method, see [Using VSAM as a storage solution through the Caching service](./api-mediation-vsam.md).
### Redis

Redis is a common storage solution that runs outside of the z/OS platform. It can store data structures in key-value pairs, has high-availability support, and is highly performant.

For more information about the Redis storage access method, see [Using Redis as a storage solution through the Caching service](./api-mediation-redis.md).
### InMemory
TODO (add in memory procedure)
The InMemory storage method is a method suitable for testing and integration verification. Be sure not to use InMemory storage in production. 
The key/value pairs are stored only in the memory of a single instance of the service. As such, the key/value pairs do not persist. 
## How to start the service

By default, the Caching service starts along with the other Zowe components. To prevent the Caching service from starting, set the following parameter to `false`:

`zowe_apiml_caching_service_start` 

This parameter is defined in the ansible playbooks. 

When this parameter is set to `false`, the parameter appends to the `instance.env` configuration file, which is used at Zowe start time.

## Methods to use the Caching service API

To apply a method to the Caching service, use the following API path:

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

**Notes:** 
- For more information about how to configure the Caching Service in the `application.yml`, see: [Add API Onboarding Configuration](../extend-apiml/onboard-spring-boot-enabler.md).
- When using VSAM, ensure that you set the additional configuration parameters. For more information about setting these parameters, see [Using VSAM as a storage solution through the Caching service](./api-mediation-vsam.md).

## Authentication

### Direct calls
Caching service requires TLS mutual authentication. This verifies authenticity of client. Calls without valid client certificate generate 403 response code: Forbidden. This requirement is disabled when `VERIFY_CERTIFICATES=false` in `zowe-certificates.env` configuration file.

Call must have a header `X-Certificate-DistinguishedName` containing information about certificate's distinguished name. This header is added by API Gateway. It needs to be added manually for direct call. Calls without this header produce 401 response code: Unauthorized. 

### Routed calls through API Gateway
Caching service registers with the following authentication scheme to Discovery service:

```yaml
apiml.service.authentication.scheme: x509
apiml.service.authentication.headers: X-Certificate-Public,X-Certificate-DistinguishedName,X-Certificate-CommonName
```

which makes Gateway to attempt mutual authentication with Client and if succesfull, propagate the Client's certificate information to `X-Certificate-` headers. With this scheme, Gateway will use it's server/client certificate for the routed call to caching service.
