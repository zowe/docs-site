# Using the Caching service

As an API developer, you can use the Caching service as a storage solution to enable resource sharing between service instances, thereby ensuring High Availability of services. The Caching service is designed to make resource sharing possible for services that cannot be made stateless in three ways:

- Using VSAM to store key/value pairs for production
- Using InMemory
- Using additional storage support 

The Caching service makes it possible to store, retrieve, and delete data associated with keys.

**Note:** The Caching service is available only for internal Zowe applications, and is not exposed to the internet. The Caching service supports a hot-reload scenario in which a client service requests all available service data. 

- [Architecture](#architecture)
- [Storage methods](#storage-methods)
  - [VSAM](#vsam)
  - [InMemory](#inmemory)
  - [Additional Storage Support](#additional-storage-support)
- [How to start the service](#how-to-start-the-service)
- [Methods to use the Caching service API](#methods-to-use-the-caching-service-api)
- [Configuration properties](#configuration-properties)
## Architecture

A pre-condition to provide for High Availability of all components within Zowe is the requirement for components to be either stateless, or offload the state to a location accessible by all instances of the service, including those instances which just started. Some services, however, are not, and cannot be stateless. The Caching service is designed for these types of services. The current implementation of the Caching service depends on VSAM to store the key/value pairs for production, as VSAM is a native z/OS solution for storing key/value pairs.  

<img src="../../images/api-mediation/caching-service.png" alt="Caching service" width="600px"/> 

REST APIs make it possible to create, delete, and update key-value pairs in the cache. Other APIs read a specific key-value pair or all key-value pairs in the cache.

The information of cached APIs is stored as a JSON in the following format:
```yml
{
  “key”: “keyValue”, 
  “value”: “valueValue”
}
```
## Storage methods

The Caching service supports multiple storage solutions, which provide the option to add custom implementation. 
### VSAM

VSAM can be used to organize records into four types of data sets: key-sequenced, entry-sequenced, linear, or relative record. Use VSAM as the storage solution for production. VSAM is used primarily for applications, and is not used for source programs, JCL, or executable modules.
The Caching service uses the KSDS version of the dataset, which allows storage and retrieval of the keys.

For more information about the VSAM storage access method, see [Using VSAM as a storage solution through the Caching service](./api-mediation-vsam.md).
### InMemory

The InMemory storage method is a method suitable for testing and integration verification. Be sure not to use InMemory storage in production. 
The key/value pairs are stored only in the memory of a single instance of the service. As such, the key/value pairs do not persist. 

## How to start the service

By default, the Caching service starts along with the other Zowe components. To prevent the Caching service from starting, set the following parameter to `false`:

`zowe_apiml_caching_service_start` 

This parameter is defined in the ansible playbooks. 

When you set this parameter to `false`, the parameter appends to the `instance.env` configuration file, which is used at Zowe start time.

## Methods to use the Caching service API

To apply a method to the Caching service, use the following API path:
`/cachingservice/api/v1/cache/${path-params-as-needed}`

Use the following methods with the Caching service API:

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

The Caching service uses the standard `application.yml` structure for configuration. The service is built on top of the Spring enabler. As such, it is dynamically registered to the API Mediation Layer. The service appears in the API Catalog under the tile, "Zowe Applications".

**Notes:** 
- For more information about how to configure the Caching service in the application.yml, see: [Add API Onboarding Configuration](../extend-apiml/onboard-spring-boot-enabler.md).
- When using VSAM, ensure that you set the additional configuration parameters. For more information see [Using VSAM as a storage solution through the Caching service](./api-mediation-vsam.md).

