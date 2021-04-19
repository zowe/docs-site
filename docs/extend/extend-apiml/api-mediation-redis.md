# Using Redis as a storage solution through the Caching service

As an API developer, you can configure Redis as a storage solution through the Caching service. This article describes how to configure your storage solution for Redis.
You can configure Redis for high availability as well as to replicate data to provide data durability and availability.

- [Understanding Redis](#understanding-redis)
- [Redis configuration](#redis-configuration)

## Understanding Redis

Redis is an off-Z storage solution that stores data structures in key-value pairs. The API Caching service uses hash sets, where each
service storing data via the Caching service has its own hash, and each data entry is a key-value entry within that service's Redis hash set.

For more information on Redis, see the [official Redis documentation](https://redis.io/documentation).

### Redis replica instances

Redis can be used with one standalone instance. For data durability, however, a master/replica configuration is recommended.
Redis replicas automatically connect, and re-connect when necessary, to the master Redis instance and attempt to be an exact copy of the master.

For more information on Redis replication and how to configure a replica instance, see the [official Redis Replication documentation](https://redis.io/topics/replication).

### Redis Sentinel

Redis Sentinel is a configuration that provides high availability for Redis master/replica instances.
Sentinel instances are used to monitor the master instance and use a quorum to automatically determine if a failover procedure needs to occur from a master instance to one of its replicas.

For more information on Redis Sentinel and how to configure Sentinel instances with master/replica instances, see the [official Redis Sentinel documentation](https://redis.io/topics/replication).

### Redis SSL/TLS

Redis supports SSL/TLS starting in version 6. For information on enabled SSL/TLS with Redis, see the [official Redis TLS Support documentation](https://redis.io/topics/replication).

### Redis and Lettuce

The [Lettuce](https://lettuce.io/) library is used to connect to Redis. Lettuce uses Master or Sentinel node registration information to automatically discover other instances.
The IP address used to register between nodes is therefore what Lettuce uses to connect to downstream replica instances. This means the IP address of replica instances,
or the IP address of both master and replica instances in the case of Sentinel topology, must be accessible to the Caching service. For example, in a master/replica topology running
in separate Docker containers, the replica container's IP address needs to be accessible to the Caching service, rather than only exposing a port.

## Redis configuration

Configure Redis as a storage solution through the Caching service by modifying the following configuration parameters in the Caching service `application.yml`.

* **`caching.storage.redis.host`** 

    The hostname or IP address for the Redis master instance

* **`caching.storage.redis.port`** 

    The port for the Redis master instance. Defaults to `6379`

* **`caching.storage.redis.username`** 

    The username used for authentication for the Redis master instance. Defaults to `default`. Not required if authentication is not enforced by the instances

* **`caching.storage.redis.password`** 

    The password used for authentication for the Redis master and replica instances. Not required if authentication is not enforced by the instances

* **`caching.storage.redis.timeout`** 

    The timeout duration in seconds for the Caching service when first connecting to Redis

* **`caching.storage.redis.sentinel.master`** 

    The Redis master instance ID used by the Redis Sentinel instances. Required if Redis Sentinel is being used

* **`caching.storage.redis.sentinel.nodes`** 

    An array of the Redis Sentinel nodes. Each array element must contain:
    
    * `host`
    
      the hostname or IP address of the node

    * `port`
    
      the port of the node

    If the node enforces authentication, the element must specify the `password` parameter.

* **`caching.storage.redis.ssl.enabled`** 

    A flag indicating if Redis is being used with SSL/TLS support. Defaults to `false`

* **`caching.storage.redis.ssl.keyStore`** 

    The keystore file used to store the private key

* **`caching.storage.redis.ssl.keyStorePassword`** 

    The password used to unlock the keystore

* **`caching.storage.redis.ssl.trustStore`** 

    The truststore file used to keep other parties public keys and certificates

* **`caching.storage.redis.ssl.trustStorePassword`** 

    The password used to unlock the truststore
