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

Configure Redis as a storage solution through the Caching service by setting the following environment variables. Environment variables can be set by adding them to `instance.env`.

* **`CACHING_STORAGE_REDIS_MASTERNODEURI`**

    The URI used to connect to the Redis master instance in the form `username:password@host:port`.

    * The host section of the URI is mandatory
    * The port section is optional and if not included defaults to `6379`.
    * The username section is optional and if not included defaults to the Redis default username `default`.
    * The password section is optional, but must be included if a username is included. If the password is not set a username cannot be set.

* **`CACHING_STORAGE_REDIS_TIMEOUT`** 

    The timeout duration in seconds for the Caching service when first connecting to Redis. Defaults to 60 seconds.

* **`CACHING_STORAGE_REDIS_SENTINEL_MASTERINSTANCE`** 

    The Redis master instance ID used by the Redis Sentinel instances. Required if Redis Sentinel is being used.

* **`CACHING_STORAGE_REDIS_SENTINEL_NODES`** 

    The URI used to connect to a Redis Sentinel instance in the form `username:password@host:port`.

    * The host section of the URI is mandatory
    * The port section is optional and if not included defaults to `6379`.
    * The password section is optional and defaults to no password.

    To supply multiple Redis Sentinel URIs, concatenate the URIs with a comma `,`.

* **`CACHING_STORAGE_REDIS_SSL_ENABLED`** 

    A flag indicating if Redis is being used with SSL/TLS support. Defaults to `true`.

* **`CACHING_STORAGE_REDIS_SSL_KEYSTORE`** 

    The keystore file used to store the private key. Defaults to the Caching Service's keystore.

* **`CACHING_STORAGE_REDIS_SSL_KEYSTOREPASSWORD`** 

    The password used to unlock the keystore. Defaults to the Caching Service's keystore password.

* **`CACHING_STORAGE_REDIS_SSL_TRUSTSTORE`** 

    The truststore file used to keep other parties public keys and certificates. Defaults to the Caching Service's truststore.

* **`CACHING_STORAGE_REDIS_SSL_TRUSTSTOREPASSWORD`** 

    The password used to unlock the truststore. Defaults to the Caching Service's truststore password.
