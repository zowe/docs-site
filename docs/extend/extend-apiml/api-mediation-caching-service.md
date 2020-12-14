# Caching service 
As an API developer, you can use the Caching service to store, retrieve, and delete data associated with keys.

To support High Availability of all components within Zowe, components need to be either stateless, or offload the state to a location accessible by all instances of the service, including those instances which just started. 
At the current time, some services are not, and cannot be stateless. The Caching service is designed for these types of services. The current implementation of the Caching service depends on VSAM to store the key/value pairs, as VSAM is a native z/OS solution for storing key/value pairs.  
 
T**Note:** The Caching service is available only for internal Zowe applications, and is not be exposed to the internet. The Caching service supports a hot-reload scenario in which a client service requests all available service data. 
## Architecture

<img src="../../images/api-mediation/caching-service.png" alt="Caching service" width="600px"/> 

REST APIs make it possible to create, delete, and update key-value pairs in the cache. Other APIs read a specific key-value pair or all key-value pairs in the cache.

The cached APIs information is stored asa JSON in the following format:
```yml
{
  “key”: “keyValue”, 
  “value”: “valueValue”
}
```

## Storage methods

The Caching service supports multiple storage solutions, which provide the option to add custom implementation. For more infomation about how to implement a custom solution, see [Additional Storage Support](#additional-storage-support).

### VSAM

For more information about the VSAM storage access method, see [VSAM](./api-mediation-vsam.md).

### In Memory

This storage is useful for testing and integration verification. Don't use it in production. 
The key/value pairs are stored only in the memory of one instance of the service and therefore 
won't persist. 

### Additional Storage Support

To add a new implementation it is necessary to provide the library with the implementation
of the Storage.class and properly configure the Spring with the used implementation. 

    @ConditionalOnProperty(
        value = "caching.storage",
        havingValue = "custom"
    )
    @Bean
    public Storage custom() {
        return new CustomStorage();
    }

The example above shows the Configuration within the library that will use different storage than the default InMemory one. 

It is possible to provide the custom implementation via the `-Dloader.path` property provided on startup of the Caching service. 

## How to start the service

By default, the Caching service is started along with the other Zowe components. You can prevent the Caching service to start by setting the `zowe_apiml_caching_service_start` defined in the ansible playbooks to `false`. 
This parameter will be then appended to the `instance.env` configuration file and used at the Zowe start.

## API

The Caching service API path is `/cachingservice/api/v1/cache/${path-params-as-needed}`.
1. `POST /cache`: Create a new key in the Cache. 
2. `GET /cache`: Returns all key/value pairs for specific service.
3. `PUT /cache/{key}`: Update the existing value for the given key.
4. `GET /cache/{key}`: Return the existing value for the given key.
5. `DELETE /cache/{key}`: Delete a key/value pair.

## Configuration properties

The Caching service uses the standard `application.yml` structure for configuration and it is built on top of the Spring enabler, which means that it is dynamically registered to the API Mediation Layer. 
It appears in the API Catalog under the tile "Zowe Applications".

**Note:** For more information about how to configure the Caching service in the application.yml, see: [Add API Onboarding Configuration](../extend-apiml/onboard-spring-boot-enabler.md).

In case VSAM is used, additional configuration parameters must be set. See [VSAM](./api-mediation-vsam.md) for more information.

