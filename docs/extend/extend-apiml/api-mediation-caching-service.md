# Using the Caching service 
As an API developer, you can use the Caching service to store, retrieve, and delete data associated with keys.
To support High Availability of all components within Zowe, components need to be either stateless, or offload the state to a location accessible by all instances of the service, including those instances which just started. Some services, howevre, are not, and cannot be stateless. The Caching service is designed for these types of services. The current implementation of the Caching service depends on VSAM to store the key/value pairs for production, as VSAM is a native z/OS solution for storing key/value pairs.  
 
**Note:** The Caching service is available only for internal Zowe applications, and is not be exposed to the internet. The Caching service supports a hot-reload scenario in which a client service requests all available service data. 

- [Architecture](#architecture)
- [Storage methods](#storage-methods)
  - [VSAM](#vsam)
  - [In Memory](#in-memory)
  - [Additional Storage Support](#additional-storage-support)
- [How to start the service](#how-to-start-the-service)
- [Methods to use the Caching service API](#methods-to-use-the-caching-service-api)
- [Configuration properties](#configuration-properties)
## Architecture

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

The Caching service supports multiple storage solutions, which provide the option to add custom implementation. For more infomation about how to implement a custom solution, see [Additional Storage Support](#additional-storage-support).

### VSAM

For information about the VSAM storage access method, see [Using VSAM as a storage solution through the Caching service](./api-mediation-vsam.md).

### Inmemory

The inmemory storage method is useful for testing and integration verification. Be sure that you do not use inmemory storage in production. 
The key/value pairs are stored only in the memory of a single instance of the service. As such, the key/value pairs do not persist. 

### Additional Storage Support

To add a new implementation it is necessary to provide the library with the implementation
of the `Storage.class`, and properly configure Spring with the additional implementation. 

**Example:**

    @ConditionalOnProperty(
        value = "caching.storage",
        havingValue = "custom"
    )
    @Bean
    public Storage custom() {
        return new CustomStorage();
    }

The previous example shows the configuration within a library that uses a different storage method than the default (inmemory). 

It is possible to provide the custom implementation through the `-Dloader.path` property provided on startup of the Caching service. 

## How to start the service

By default, the Caching service starts along with the other Zowe components. To prevent the Caching service from starting, set the following parameter to `false`:

`zowe_apiml_caching_service_start` 

This parameter is defined in the ansible playbooks. 

When you set this parameter to `false`, the parameter appends to the `instance.env` configuration file, which is used at Zowe start time.

## Methods to use the Caching service API

To apply a method to the Caching service, use the following API path:
`/cachingservice/api/v1/cache/${path-params-as-needed}`

Use the following methods with the Caching service API:
- `POST /cache`:
   Creates a new key in the Cache
- `GET /cache`
   Returns all key/value pairs for specific service
- `PUT /cache/{key}`
   Updates the existing value for the given key
- `GET /cache/{key}`
   Returns the existing value for the given key
- `DELETE /cache/{key}`
   Deletes a key/value pair

## Configuration properties

The Caching service uses the standard `application.yml` structure for configuration. The service is built on top of the Spring enabler. As such, it is dynamically registered to the API Mediation Layer. The service appears in the API Catalog under the tile, "Zowe Applications".

**Notes:** 
- For more information about how to configure the Caching service in the application.yml, see: [Add API Onboarding Configuration](../extend-apiml/onboard-spring-boot-enabler.md).
- When using VSAM, ensure that you set the additional configuration parameters. For more information see [Using VSAM as a storage solution through the Caching service](./api-mediation-vsam.md).

